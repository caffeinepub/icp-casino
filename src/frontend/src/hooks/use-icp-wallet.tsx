import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { createActor } from "../backend";

// ---------------------------------------------------------------------------
// Window type augmentation for Plug wallet
// ---------------------------------------------------------------------------
export interface PlugTokenBalance {
  amount: number;
  canisterId: string;
  image: string;
  name: string;
  symbol: string;
}

declare global {
  interface Window {
    ic?: {
      plug?: {
        isConnected: () => Promise<boolean>;
        requestConnect: (opts: {
          whitelist?: string[];
          host?: string;
        }) => Promise<boolean>;
        getPrincipal: () => Promise<{ toText: () => string }>;
        requestBalance: () => Promise<PlugTokenBalance[]>;
        requestTransfer: (opts: {
          to: string;
          amount: number; // e8s as number for Plug API
          memo?: number;
        }) => Promise<{ height: { value: number } }>;
        agent?: { getPrincipal: () => Promise<{ toText: () => string }> };
        disconnect: () => Promise<void>;
      };
    };
  }
}

export type WalletType = "plug" | "stoic" | null;

export interface IcpWalletState {
  walletType: WalletType;
  isConnected: boolean;
  walletPrincipal: string | null;
  isConnecting: boolean;
  connectError: string | null;
  connect: (type: "plug" | "stoic") => Promise<void>;
  disconnect: () => void;
  requestTransfer: (amountE8s: bigint, toPrincipal: string) => Promise<void>;
  isTransferring: boolean;
  transferError: string | null;
  lastTransferAmount: bigint | null;
  resetTransfer: () => void;
}

// The canister ID is injected at build time via the DFX env var.
// Falls back to a placeholder so the hook remains functional in dev.
const CANISTER_ID: string =
  (typeof process !== "undefined" &&
    (process.env as Record<string, string>).CANISTER_ID_BACKEND) ||
  "rrkah-fqaaa-aaaaa-aaaaq-cai";

const IC_HOST = "https://ic0.app";

export function useIcpWallet(): IcpWalletState {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [walletType, setWalletType] = useState<WalletType>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletPrincipal, setWalletPrincipal] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [lastTransferAmount, setLastTransferAmount] = useState<bigint | null>(
    null,
  );

  // -------------------------------------------------------------------------
  // Connect
  // -------------------------------------------------------------------------
  const connect = useCallback(async (type: "plug" | "stoic") => {
    setConnectError(null);
    setIsConnecting(true);

    try {
      if (type === "plug") {
        if (!window.ic?.plug) {
          throw new Error(
            "Plug wallet extension not found. Please install it from plugwallet.ooo",
          );
        }

        const connected = await window.ic.plug.requestConnect({
          whitelist: [CANISTER_ID],
          host: IC_HOST,
        });

        if (!connected) {
          throw new Error("User rejected the Plug wallet connection.");
        }

        const principalObj = await window.ic.plug.getPrincipal();
        const principal = principalObj.toText();

        setWalletType("plug");
        setIsConnected(true);
        setWalletPrincipal(principal);
      } else {
        // Stoic — stub for now; can be expanded with @psychedelic/stoic-identity
        throw new Error(
          "Stoic wallet integration is coming soon. Please use Plug in the meantime.",
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Connection failed.";
      setConnectError(msg);
      setIsConnected(false);
      setWalletPrincipal(null);
      setWalletType(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // -------------------------------------------------------------------------
  // Disconnect
  // -------------------------------------------------------------------------
  const disconnect = useCallback(() => {
    if (walletType === "plug" && window.ic?.plug) {
      window.ic.plug.disconnect().catch(() => {
        // silently ignore disconnect errors
      });
    }
    setWalletType(null);
    setIsConnected(false);
    setWalletPrincipal(null);
    setConnectError(null);
    setTransferError(null);
    setLastTransferAmount(null);
  }, [walletType]);

  // -------------------------------------------------------------------------
  // Request transfer and record deposit on-chain
  // -------------------------------------------------------------------------
  const requestTransfer = useCallback(
    async (amountE8s: bigint, toPrincipal: string) => {
      setTransferError(null);
      setLastTransferAmount(null);
      setIsTransferring(true);

      try {
        if (!isConnected || walletType !== "plug") {
          throw new Error("No wallet connected. Please connect Plug first.");
        }
        if (!window.ic?.plug) {
          throw new Error("Plug wallet extension is unavailable.");
        }
        if (!actor) {
          throw new Error("Backend actor not ready. Please try again shortly.");
        }

        // Execute the on-chain transfer via Plug
        await window.ic.plug.requestTransfer({
          to: toPrincipal,
          amount: Number(amountE8s), // Plug expects e8s as a number
        });

        // Record the deposit in our canister
        const result = await actor.deposit(amountE8s);

        if (result.__kind__ === "err") {
          throw new Error(`Deposit recording failed: ${result.err}`);
        }

        setLastTransferAmount(amountE8s);

        // Refresh the wallet balance displayed in the navbar
        await queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Transfer failed.";
        setTransferError(msg);
      } finally {
        setIsTransferring(false);
      }
    },
    [isConnected, walletType, actor, queryClient],
  );

  // -------------------------------------------------------------------------
  // Reset transfer state (call when modal reopens)
  // -------------------------------------------------------------------------
  const resetTransfer = useCallback(() => {
    setLastTransferAmount(null);
    setTransferError(null);
  }, []);

  return {
    walletType,
    isConnected,
    walletPrincipal,
    isConnecting,
    connectError,
    connect,
    disconnect,
    requestTransfer,
    isTransferring,
    transferError,
    lastTransferAmount,
    resetTransfer,
  };
}
