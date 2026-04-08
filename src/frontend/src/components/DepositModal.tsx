import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useIcpWallet } from "../hooks/use-icp-wallet";

const E8S_PER_ICP = 100_000_000n;
const PRESET_AMOUNTS = [1, 5, 10, 25] as const;

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function shortAddress(principal: string): string {
  return `${principal.slice(0, 8)}…${principal.slice(-6)}`;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { principalText } = useAuth();
  const {
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
  } = useIcpWallet();

  const [amountIcp, setAmountIcp] = useState("");
  const overlayRef = useRef<HTMLDialogElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Reset amount and transfer state on open
  useEffect(() => {
    if (isOpen) {
      setAmountIcp("");
      resetTransfer();
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    }
  }, [isOpen, resetTransfer]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const parsedAmount = Number.parseFloat(amountIcp);
  const isValidAmount = !Number.isNaN(parsedAmount) && parsedAmount > 0;
  const amountE8s = isValidAmount
    ? BigInt(Math.round(parsedAmount * Number(E8S_PER_ICP)))
    : 0n;

  const handleDeposit = async () => {
    if (!isValidAmount || !principalText) return;
    await requestTransfer(amountE8s, principalText);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const depositSuccess = lastTransferAmount !== null && !transferError;

  return (
    <dialog
      ref={overlayRef}
      onClick={handleOverlayClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          handleOverlayClick(e as unknown as React.MouseEvent);
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-0 border-0 open:flex"
      style={{
        background: "oklch(0.04 0 0 / 0.88)",
      }}
      aria-label="Deposit ICP"
      open
      data-ocid="deposit-modal"
    >
      <div
        className="relative w-full max-w-md mx-4 rounded-xl shadow-2xl overflow-hidden"
        style={{
          background: "oklch(0.10 0.03 290)",
          border: "1px solid oklch(0.72 0.18 65 / 0.35)",
          boxShadow:
            "0 24px 60px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.72 0.18 65 / 0.10)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            borderBottom: "1px solid oklch(0.72 0.18 65 / 0.25)",
            background:
              "linear-gradient(to right, oklch(0.12 0.02 45), oklch(0.10 0.01 45))",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.18 65 / 0.18)",
                border: "1px solid oklch(0.72 0.18 65 / 0.40)",
              }}
            >
              <WalletCards
                className="w-4 h-4"
                style={{ color: "oklch(0.82 0.14 65)" }}
              />
            </div>
            <h2
              className="font-display text-lg font-bold"
              style={{ color: "oklch(0.92 0 0)" }}
            >
              Deposit ICP
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md transition-smooth"
            style={{ color: "oklch(0.65 0.04 280)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.90 0.06 65)";
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(0.16 0.02 45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.70 0.03 65)";
              (e.currentTarget as HTMLButtonElement).style.background = "";
            }}
            aria-label="Close deposit modal"
            data-ocid="deposit-modal-close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* STEP 1 — Wallet connection */}
          <section aria-label="Wallet connection">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.65 0.04 280)" }}
            >
              Step 1 — Connect Wallet
            </p>

            {!isConnected ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* Plug */}
                  <button
                    ref={firstFocusRef}
                    type="button"
                    onClick={() => connect("plug")}
                    disabled={isConnecting}
                    className="flex flex-col items-center gap-2 px-4 py-4 rounded-lg transition-smooth disabled:opacity-60 disabled:cursor-not-allowed group"
                    style={{
                      background: "oklch(0.13 0.03 290)",
                      border: "1px solid oklch(0.25 0.05 65 / 0.50)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isConnecting) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = "oklch(0.72 0.18 65 / 0.65)";
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "oklch(0.72 0.18 65 / 0.07)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "oklch(0.25 0.05 65 / 0.50)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "oklch(0.13 0.01 45)";
                    }}
                    data-ocid="connect-plug-btn"
                  >
                    {isConnecting ? (
                      <Loader2
                        className="w-6 h-6 animate-spin"
                        style={{ color: "oklch(0.72 0.18 65)" }}
                      />
                    ) : (
                      <Zap
                        className="w-6 h-6 group-hover:scale-110 transition-smooth"
                        style={{ color: "oklch(0.72 0.18 65)" }}
                      />
                    )}
                    <span className="text-sm font-semibold text-foreground">
                      {isConnecting ? "Connecting…" : "Connect Plug"}
                    </span>
                  </button>

                  {/* Stoic — coming soon */}
                  <button
                    type="button"
                    disabled
                    className="flex flex-col items-center gap-2 px-4 py-4 rounded-lg opacity-40 cursor-not-allowed"
                    style={{
                      background: "oklch(0.13 0.03 290)",
                      border: "1px solid oklch(0.25 0.05 65 / 0.30)",
                    }}
                    title="Coming soon"
                    data-ocid="connect-stoic-btn"
                  >
                    <WalletCards className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm font-semibold text-muted-foreground">
                      Stoic
                      <span className="block text-xs font-normal mt-0.5">
                        Coming soon
                      </span>
                    </span>
                  </button>
                </div>

                {/* "Install Plug" hint */}
                {connectError?.includes("not found") && (
                  <a
                    href="https://plugwallet.ooo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs hover:underline"
                    style={{ color: "oklch(0.82 0.14 65)" }}
                    data-ocid="install-plug-link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Install the Plug extension
                  </a>
                )}

                {connectError && (
                  <div
                    className="flex items-start gap-2 p-3 rounded-lg"
                    style={{
                      background: "oklch(0.40 0.15 300 / 0.12)",
                      border: "1px solid oklch(0.40 0.15 300 / 0.35)",
                    }}
                    role="alert"
                    data-ocid="connect-error"
                  >
                    <AlertCircle
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "oklch(var(--loss))" }}
                    />
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(var(--loss))" }}
                    >
                      {connectError}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  background: "oklch(0.72 0.18 65 / 0.10)",
                  border: "1px solid oklch(0.72 0.18 65 / 0.40)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "oklch(0.72 0.18 65)" }}
                  />
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "oklch(0.82 0.14 65)" }}
                    >
                      {walletType === "plug" ? "Plug" : "Stoic"} connected
                    </p>
                    {walletPrincipal && (
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        {shortAddress(walletPrincipal)}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={disconnect}
                  className="text-muted-foreground hover:text-foreground h-7 px-2 text-xs"
                  data-ocid="disconnect-wallet-btn"
                >
                  Disconnect
                </Button>
              </div>
            )}
          </section>

          {/* Divider */}
          <div style={{ borderTop: "1px solid oklch(0.25 0.05 65 / 0.40)" }} />

          {/* STEP 2 — Deposit amount */}
          <section
            aria-label="Deposit amount"
            className={
              !isConnected ? "opacity-40 pointer-events-none select-none" : ""
            }
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.65 0.04 280)" }}
            >
              Step 2 — Enter Amount
            </p>

            {/* Preset buttons */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountIcp(String(amt))}
                  className="py-2 rounded-md text-xs font-bold transition-smooth"
                  style={
                    amountIcp === String(amt)
                      ? {
                          border: "1px solid oklch(0.72 0.18 65 / 0.80)",
                          background: "oklch(0.72 0.18 65 / 0.18)",
                          color: "oklch(0.85 0.14 65)",
                        }
                      : {
                          border: "1px solid oklch(0.25 0.05 65 / 0.50)",
                          background: "oklch(0.14 0.02 45)",
                          color: "oklch(0.58 0.04 280)",
                        }
                  }
                  data-ocid={`preset-${amt}-icp`}
                >
                  {amt} ICP
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="space-y-1.5">
              <Label
                htmlFor="deposit-amount"
                className="text-xs text-muted-foreground"
              >
                Custom amount (ICP)
              </Label>
              <div className="relative">
                <Input
                  id="deposit-amount"
                  type="number"
                  min="0.0001"
                  step="0.1"
                  placeholder="0.00"
                  value={amountIcp}
                  onChange={(e) => setAmountIcp(e.target.value)}
                  className="pr-14 font-mono"
                  style={{
                    background: "oklch(0.13 0.03 290)",
                    borderColor: "oklch(0.25 0.05 65 / 0.50)",
                  }}
                  data-ocid="deposit-amount-input"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                  ICP
                </span>
              </div>
              {isValidAmount && (
                <p className="text-xs text-muted-foreground">
                  ≈ {amountE8s.toLocaleString()} e8s
                </p>
              )}
            </div>
          </section>

          {/* Transfer error */}
          {transferError && (
            <div
              className="flex items-start gap-2 p-3 rounded-lg"
              style={{
                background: "oklch(0.40 0.15 300 / 0.12)",
                border: "1px solid oklch(0.40 0.15 300 / 0.35)",
              }}
              role="alert"
              data-ocid="transfer-error"
            >
              <AlertCircle
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: "oklch(var(--loss))" }}
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(var(--loss))" }}
              >
                {transferError}
              </p>
            </div>
          )}

          {/* Success state */}
          {depositSuccess && (
            <output
              className="flex items-start gap-2.5 p-4 rounded-lg"
              style={{
                background: "oklch(0.72 0.18 65 / 0.12)",
                border: "1px solid oklch(0.72 0.18 65 / 0.45)",
              }}
              data-ocid="deposit-success"
            >
              <CheckCircle2
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: "oklch(0.82 0.14 65)" }}
              />
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.85 0.14 65)" }}
                >
                  Deposit successful!
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {(Number(lastTransferAmount) / 100_000_000).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4,
                    },
                  )}{" "}
                  ICP has been added to your casino balance.
                </p>
              </div>
            </output>
          )}

          {/* Action button */}
          {!depositSuccess ? (
            <Button
              onClick={handleDeposit}
              disabled={!isConnected || !isValidAmount || isTransferring}
              className="w-full font-semibold gap-2 transition-smooth"
              style={{
                background:
                  !isConnected || !isValidAmount || isTransferring
                    ? "oklch(0.18 0.02 45)"
                    : "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                color:
                  !isConnected || !isValidAmount || isTransferring
                    ? "oklch(0.45 0.03 65)"
                    : "oklch(0.97 0 0)",
                border: "none",
              }}
              data-ocid="deposit-submit-btn"
            >
              {isTransferring ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Deposit{isValidAmount ? ` ${parsedAmount} ICP` : ""}
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onClose}
              className="w-full font-semibold transition-smooth"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                color: "oklch(0.97 0 0)",
                border: "none",
              }}
              data-ocid="deposit-close-btn"
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
}
