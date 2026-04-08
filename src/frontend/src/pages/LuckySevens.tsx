import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Coins, Sparkles, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { Transaction } from "../backend";
import { useIcpWallet } from "../hooks/use-icp-wallet";
import { formatICP, useWallet } from "../hooks/use-wallet";

// ── constants ─────────────────────────────────────────────────────────────────

const E8S_PER_ICP = 100_000_000n;

const BET_OPTIONS: { label: string; value: bigint; win: string }[] = [
  { label: "1 ICP", value: 1n * E8S_PER_ICP, win: "2.63 ICP" },
  { label: "3 ICP", value: 3n * E8S_PER_ICP, win: "7.89 ICP" },
  { label: "5 ICP", value: 5n * E8S_PER_ICP, win: "13.15 ICP" },
];

const SYMBOLS = ["7", "BAR", "🔔", "🍒", "🍋"] as const;
const WIN_SYMBOL = "7";

type ReelSymbol = (typeof SYMBOLS)[number];

type OutcomeState =
  | { status: "idle" }
  | { status: "spinning" }
  | { status: "won"; tx: Transaction; newBalance: bigint }
  | { status: "lost"; tx: Transaction; newBalance: bigint };

// ── reel component ────────────────────────────────────────────────────────────

function Reel({
  symbol,
  spinning,
  delay,
  isWin,
}: {
  symbol: ReelSymbol;
  spinning: boolean;
  delay: number;
  isWin: boolean;
}) {
  return (
    <div
      className="relative w-24 h-28 rounded-xl overflow-hidden border-2 flex items-center justify-center"
      style={{
        borderColor: isWin ? "#D4AF37" : spinning ? "#7B2FBE" : "#4B0082",
        background: "linear-gradient(180deg, #1a0d3a 0%, #0f0620 100%)",
        boxShadow: isWin
          ? "0 0 24px 6px rgba(212,175,55,0.55), inset 0 0 12px rgba(212,175,55,0.15)"
          : spinning
            ? "0 0 12px 2px rgba(123,47,190,0.5)"
            : "inset 0 0 8px rgba(0,0,0,0.4)",
      }}
    >
      {/* Shimmer strip at top/bottom */}
      <div
        className="absolute inset-x-0 top-0 h-6 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,13,58,0.9) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-6 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(0deg, rgba(26,13,58,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Symbol */}
      <span
        className={`relative z-20 font-display font-black select-none transition-all duration-300 ${
          spinning ? "reel-spinning" : ""
        }`}
        style={{
          fontSize: symbol === "BAR" ? "1.4rem" : "2.4rem",
          color: isWin ? "#D4AF37" : spinning ? "#A78BFA" : "#C4B5FD",
          textShadow: isWin
            ? "0 0 12px rgba(212,175,55,0.9), 0 0 24px rgba(212,175,55,0.55)"
            : "0 0 8px rgba(167,139,250,0.4)",
          animationDelay: `${delay}ms`,
        }}
      >
        {spinning
          ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
          : symbol}
      </span>
    </div>
  );
}

// ── Wallet gate overlay ───────────────────────────────────────────────────────

function WalletGateOverlay({
  isConnecting,
  onConnect,
  connectError,
}: {
  isConnecting: boolean;
  onConnect: () => Promise<void>;
  connectError: string | null;
}) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 rounded-3xl"
      style={{
        background:
          "linear-gradient(160deg, rgba(26,7,64,0.97) 0%, rgba(15,6,32,0.98) 100%)",
        backdropFilter: "blur(6px)",
        border: "2px solid rgba(212,175,55,0.3)",
      }}
    >
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full"
        style={{
          background: "rgba(212,175,55,0.1)",
          border: "2px solid rgba(212,175,55,0.5)",
        }}
      >
        <Wallet className="w-8 h-8" style={{ color: "#D4AF37" }} />
      </div>
      <div className="text-center px-8">
        <p
          className="font-display font-black text-xl mb-1"
          style={{
            color: "#D4AF37",
            textShadow: "0 0 16px rgba(212,175,55,0.6)",
          }}
        >
          Connect Your Plug Wallet to Play
        </p>
        <p className="text-sm" style={{ color: "#C4B5FD" }}>
          Real ICP bets only — no demo play
        </p>
      </div>
      {connectError && (
        <p
          className="text-xs text-center px-6 max-w-xs"
          style={{ color: "#9333EA" }}
        >
          {connectError}
        </p>
      )}
      <button
        type="button"
        onClick={onConnect}
        disabled={isConnecting}
        data-ocid="wallet-gate-connect-btn"
        className="px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: isConnecting
            ? "rgba(212,175,55,0.4)"
            : "linear-gradient(135deg, #D4AF37 0%, #a07830 100%)",
          color: "#1a0740",
          boxShadow: isConnecting ? "none" : "0 4px 20px rgba(212,175,55,0.5)",
        }}
      >
        {isConnecting ? "Connecting…" : "Connect Wallet"}
      </button>
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

interface LuckySevensProps {
  onBack: () => void;
}

export default function LuckySevens({ onBack }: LuckySevensProps) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const { balance: rawBalance, isLoading: walletLoading } = useWallet();
  const { isConnected, isConnecting, connectError, connect } = useIcpWallet();

  const [selectedBet, setSelectedBet] = useState<bigint>(BET_OPTIONS[0].value);
  const [outcome, setOutcome] = useState<OutcomeState>({ status: "idle" });
  const [reels, setReels] = useState<[ReelSymbol, ReelSymbol, ReelSymbol]>([
    "7",
    "BAR",
    "🍋",
  ]);
  const [spinningReels, setSpinningReels] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]);
  const [error, setError] = useState<string>("");
  const [localBalance, setLocalBalance] = useState<bigint | null>(null);
  const stopTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const balance = localBalance ?? rawBalance;

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      for (const t of stopTimers.current) clearTimeout(t);
    };
  }, []);

  // ── bet mutation ──────────────────────────────────────────────────────────

  const betMutation = useMutation({
    mutationFn: async (betAmount: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeLuckySevensBet(betAmount);
    },
    onMutate: () => {
      setError("");
      setOutcome({ status: "spinning" });
      setSpinningReels([true, true, true]);
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        const { transaction: tx, newBalance } = result.ok;
        const isWin = tx.netAmount >= 0n;
        const finalSymbols: [ReelSymbol, ReelSymbol, ReelSymbol] = isWin
          ? [WIN_SYMBOL, WIN_SYMBOL, WIN_SYMBOL]
          : [SYMBOLS[1], SYMBOLS[2], SYMBOLS[4]];

        // Stop reels one by one
        for (const t of stopTimers.current) clearTimeout(t);
        stopTimers.current = [];

        stopTimers.current.push(
          setTimeout(() => {
            setSpinningReels([false, true, true]);
            setReels((prev) => [finalSymbols[0], prev[1], prev[2]]);
          }, 600),
        );
        stopTimers.current.push(
          setTimeout(() => {
            setSpinningReels([false, false, true]);
            setReels((prev) => [prev[0], finalSymbols[1], prev[2]]);
          }, 1100),
        );
        stopTimers.current.push(
          setTimeout(() => {
            setSpinningReels([false, false, false]);
            setReels(finalSymbols);
            setLocalBalance(newBalance);
            setOutcome({ status: isWin ? "won" : "lost", tx, newBalance });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
          }, 1700),
        );
      } else {
        setSpinningReels([false, false, false]);
        setOutcome({ status: "idle" });
        setError(result.err ?? "Bet failed. Please try again.");
      }
    },
    onError: (err: Error) => {
      setSpinningReels([false, false, false]);
      setOutcome({ status: "idle" });
      setError(err.message ?? "An error occurred. Please try again.");
    },
  });

  function handleSpin() {
    if (!isConnected) return;
    if (selectedBet > balance) {
      setError("Insufficient balance for this bet.");
      return;
    }
    betMutation.mutate(selectedBet);
  }

  function handlePlayAgain() {
    setOutcome({ status: "idle" });
    setReels(["7", "BAR", "🍋"]);
    setError("");
  }

  const isSpinning = outcome.status === "spinning" || betMutation.isPending;
  const isWinState = outcome.status === "won";
  const isLostState = outcome.status === "lost";

  const activeBetOption = BET_OPTIONS.find((o) => o.value === selectedBet);

  return (
    <div
      className="min-h-screen flex flex-col items-center pb-16"
      style={{
        background:
          "linear-gradient(160deg, #1a0740 0%, #2d1b69 50%, #0f0620 100%)",
      }}
      data-ocid="lucky-sevens-page"
    >
      {/* Back nav */}
      <div className="w-full max-w-2xl px-4 pt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          style={{ color: "#A78BFA" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#D4AF37";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#A78BFA";
          }}
          data-ocid="back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lobby
        </button>
      </div>

      {/* Title */}
      <div className="mt-8 mb-6 text-center">
        <h1
          className="font-display font-black tracking-tight"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            color: "#D4AF37",
            textShadow:
              "0 0 20px rgba(212,175,55,0.7), 0 0 40px rgba(212,175,55,0.35)",
          }}
        >
          🎰 Lucky Sevens
        </h1>
        <p className="mt-2 text-sm font-medium" style={{ color: "#A78BFA" }}>
          Match three 7s to win big · 2.63x payout
        </p>
      </div>

      {/* Balance */}
      <div
        className="flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border"
        style={{
          background: "rgba(212,175,55,0.08)",
          borderColor: "rgba(212,175,55,0.3)",
        }}
      >
        <Coins className="w-4 h-4" style={{ color: "#D4AF37" }} />
        {walletLoading ? (
          <Skeleton className="h-4 w-28" />
        ) : (
          <span
            className="font-mono font-semibold text-sm"
            style={{ color: "#D4AF37" }}
            data-ocid="wallet-balance"
          >
            {formatICP(balance)} ICP
          </span>
        )}
      </div>

      {/* Slot machine cabinet */}
      <div
        className="relative rounded-3xl p-8 w-full max-w-lg"
        style={{
          background:
            "linear-gradient(180deg, rgba(74,45,138,0.6) 0%, rgba(26,7,64,0.9) 100%)",
          border: "2px solid rgba(212,175,55,0.3)",
          boxShadow:
            "0 0 40px rgba(123,47,190,0.25), inset 0 1px 0 rgba(212,175,55,0.2)",
        }}
      >
        {/* Decorative top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />

        {/* Reels */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {(["left", "center", "right"] as const).map((pos, i) => (
            <Reel
              key={pos}
              symbol={reels[i]}
              spinning={spinningReels[i]}
              delay={i * 80}
              isWin={isWinState}
            />
          ))}
        </div>

        {/* Outcome display */}
        <div className="h-16 flex items-center justify-center mb-6">
          {isWinState && outcome.status === "won" && (
            <div className="text-center animate-bounce">
              <p
                className="font-display font-black text-2xl"
                style={{
                  color: "#D4AF37",
                  textShadow:
                    "0 0 16px rgba(212,175,55,0.9), 0 0 32px rgba(212,175,55,0.5)",
                }}
                data-ocid="win-message"
              >
                <Sparkles className="inline w-5 h-5 mr-1" />
                YOU WIN! +{formatICP(outcome.tx.netAmount)} ICP
                <Sparkles className="inline w-5 h-5 ml-1" />
              </p>
              <p className="text-xs mt-1" style={{ color: "#A78BFA" }}>
                2.63x payout · Balance: {formatICP(outcome.newBalance)} ICP
              </p>
            </div>
          )}
          {isLostState && outcome.status === "lost" && (
            <div className="text-center">
              <p
                className="font-medium text-base"
                style={{ color: "#A78BFA" }}
                data-ocid="loss-message"
              >
                Better luck next time! −
                {formatICP(
                  outcome.tx.netAmount < 0n
                    ? -outcome.tx.netAmount
                    : outcome.tx.betAmount,
                )}{" "}
                ICP
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(212,175,55,0.5)" }}
              >
                Balance: {formatICP(outcome.newBalance)} ICP
              </p>
            </div>
          )}
          {isSpinning && (
            <p
              className="font-semibold text-base animate-pulse"
              style={{ color: "#A78BFA" }}
            >
              Spinning the reels…
            </p>
          )}
          {error && !isSpinning && (
            <p className="text-sm font-medium" style={{ color: "#9333EA" }}>
              {error}
            </p>
          )}
        </div>

        {/* Bet selection */}
        <div className="mb-5">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-center mb-3"
            style={{ color: "#A78BFA" }}
          >
            Select Bet Amount
          </p>
          <div className="grid grid-cols-3 gap-3">
            {BET_OPTIONS.map((opt) => {
              const isActive = selectedBet === opt.value;
              const isDisabled =
                !isConnected || (opt.value > balance && balance > 0n);
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => {
                    setSelectedBet(opt.value);
                    setError("");
                  }}
                  disabled={isDisabled || isSpinning}
                  data-ocid={`bet-option-${opt.label.replace(" ", "-").toLowerCase()}`}
                  className="py-3 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: isActive ? "#D4AF37" : "rgba(74, 45, 138, 0.4)",
                    color: isActive
                      ? "#1a0740"
                      : isDisabled
                        ? "#6B21A8"
                        : "#C4B5FD",
                    border: isActive
                      ? "2px solid #D4AF37"
                      : "2px solid rgba(123,47,190,0.5)",
                    boxShadow: isActive
                      ? "0 0 14px rgba(212,175,55,0.45)"
                      : "none",
                    cursor:
                      isDisabled || isSpinning ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  <span className="block">{opt.label}</span>
                  <span
                    className="block text-xs mt-0.5"
                    style={{
                      color: isActive
                        ? "rgba(26,7,64,0.7)"
                        : "rgba(196,181,253,0.6)",
                      fontSize: "0.65rem",
                    }}
                  >
                    Win: {opt.win}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Spin / Play Again button */}
        {outcome.status === "idle" || isSpinning ? (
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning || !isConnected || selectedBet > balance}
            data-ocid="spin-btn"
            className="w-full py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-200"
            style={{
              background: isSpinning
                ? "rgba(212,175,55,0.4)"
                : "linear-gradient(135deg, #D4AF37 0%, #a07830 50%, #D4AF37 100%)",
              color: "#1a0740",
              boxShadow: isSpinning
                ? "none"
                : "0 4px 20px rgba(212,175,55,0.45), 0 0 40px rgba(212,175,55,0.2)",
              cursor:
                isSpinning || !isConnected || selectedBet > balance
                  ? "not-allowed"
                  : "pointer",
              opacity:
                isSpinning || !isConnected || selectedBet > balance ? 0.7 : 1,
              border: "none",
            }}
          >
            {isSpinning ? "Spinning…" : "🎰 SPIN"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePlayAgain}
            data-ocid="play-again-btn"
            className="w-full py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-200"
            style={{
              background: "transparent",
              color: "#D4AF37",
              border: "2px solid #D4AF37",
              boxShadow: "0 0 14px rgba(212,175,55,0.3)",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        )}

        {/* Wallet gate overlay */}
        {!isConnected && (
          <WalletGateOverlay
            isConnecting={isConnecting}
            onConnect={() => connect("plug")}
            connectError={connectError}
          />
        )}

        {/* Decorative bottom bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(123,47,190,0.8), transparent)",
          }}
        />
      </div>

      {/* Payout info */}
      <div
        className="mt-6 text-xs text-center space-y-1 px-4"
        style={{ color: "#7B2FBE" }}
      >
        <p>
          1 ICP → 2.63 ICP win &nbsp;·&nbsp; 3 ICP → 7.89 ICP win &nbsp;·&nbsp;
          5 ICP → 13.15 ICP win
        </p>
        {activeBetOption && (
          <p style={{ color: "rgba(212,175,55,0.45)" }}>
            Current bet: {activeBetOption.label} · Jackpot:{" "}
            {activeBetOption.win}
          </p>
        )}
      </div>

      {/* House edge fine print */}
      <p
        className="mt-3 text-xs text-center"
        style={{ color: "rgba(212,175,55,0.4)" }}
        data-ocid="house-edge-note"
      >
        House edge: ~8% · RTP 92%
      </p>

      {/* CSS for reel spin animation */}
      <style>{`
        @keyframes reelSpin {
          0%   { transform: translateY(0px) scaleY(1); opacity: 1; }
          25%  { transform: translateY(-8px) scaleY(0.85); opacity: 0.6; }
          50%  { transform: translateY(0px) scaleY(1.1); opacity: 0.8; }
          75%  { transform: translateY(6px) scaleY(0.9); opacity: 0.7; }
          100% { transform: translateY(0px) scaleY(1); opacity: 1; }
        }
        .reel-spinning {
          animation: reelSpin 0.22s linear infinite;
        }
      `}</style>
    </div>
  );
}
