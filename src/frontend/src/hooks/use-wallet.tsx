import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createActor } from "../backend";
import type { LobbyChatMessage } from "../backend";
import { useAuth } from "./use-auth";

const E8S_PER_ICP = 100_000_000n;

export function formatICP(e8s: bigint): string {
  const icp = Number(e8s) / Number(E8S_PER_ICP);
  return icp.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

// ---------------------------------------------------------------------------
// Real on-chain wallet balance
// Attempts to read from connected Plug wallet first (real balance on the IC
// ledger), falls back to canister-tracked balance otherwise.
// ---------------------------------------------------------------------------
export function useWallet() {
  const { isFetching } = useActor(createActor);

  const { data: balanceData, isLoading } = useQuery<bigint | null>({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      // Only return a balance if Plug wallet is actually connected.
      // Never fall back to the canister — it auto-initialises every user
      // with 10,000 ICP which would be shown even without a real wallet.
      if (typeof window === "undefined" || !window.ic?.plug) {
        return null;
      }

      const plugConnected = await window.ic.plug
        .isConnected()
        .catch(() => false);
      if (!plugConnected) return null;

      try {
        const balanceRes = await window.ic.plug.requestBalance();
        if (Array.isArray(balanceRes) && balanceRes.length > 0) {
          const icpEntry = balanceRes.find(
            (b: { symbol?: string }) => b.symbol === "ICP",
          );
          if (icpEntry && typeof icpEntry.amount === "number") {
            // Plug returns ICP as a float (not e8s), convert to e8s bigint
            return BigInt(Math.round(icpEntry.amount * Number(E8S_PER_ICP)));
          }
        }
      } catch {
        // If requestBalance fails for a connected wallet, return null (no display)
      }

      return null;
    },
    // Always poll — the connection state can change at any time
    refetchInterval: 15_000,
    staleTime: 10_000,
  });

  // null means "Plug not connected / balance unknown" — distinct from 0n (zero balance)
  const isPlugConnected = balanceData !== null && balanceData !== undefined;
  const balance = balanceData ?? 0n;

  return {
    balance,
    balanceFormatted: formatICP(balance),
    isLoading: isFetching || isLoading,
    isPlugConnected,
  };
}

// ---------------------------------------------------------------------------
// Lobby chat hooks
// ---------------------------------------------------------------------------
const LOBBY_POLL = 5_000;

function useLobbyActor() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, ready: !!actor && !isFetching };
}

export function useLobbyChatMessages() {
  const { actor, ready } = useLobbyActor();
  return useQuery<LobbyChatMessage[]>({
    queryKey: ["lobby-chat"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLobbyChatMessages();
    },
    enabled: ready,
    refetchInterval: LOBBY_POLL,
    staleTime: 3_000,
  });
}

export function useSendLobbyChatMessage() {
  const { actor } = useLobbyActor();
  const qc = useQueryClient();
  return useMutation<
    LobbyChatMessage,
    Error,
    { message: string; senderName: string }
  >({
    mutationFn: async ({ message, senderName }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendLobbyChatMessage(message, senderName);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lobby-chat"] });
    },
  });
}

// ---------------------------------------------------------------------------
// Derive a display name from a principal string
// ---------------------------------------------------------------------------
export function usePlayerDisplayName(): string {
  const { principalText } = useAuth();
  const { isAuthenticated } = useAuth();
  return useCallback(() => {
    if (!isAuthenticated || !principalText) return "Guest";
    // Use last 6 chars of principal as a short handle
    const suffix = principalText.replace(/-/g, "").slice(-6).toUpperCase();
    return `Player_${suffix}`;
  }, [isAuthenticated, principalText])();
}
