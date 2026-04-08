import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "7️⃣", "🔔"];
const REEL_SYMBOL_COUNT = 24; // repeated symbols for smooth infinite scroll feel

type Outcome = "win" | "near-miss" | "loss" | "idle";

interface ReelProps {
  result: string;
  spinning: boolean;
  delay: number;
  duration: number;
}

// Build a long strip of random symbols ending with the given result
function buildStrip(result: string): string[] {
  const strip: string[] = [];
  for (let i = 0; i < REEL_SYMBOL_COUNT - 1; i++) {
    strip.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }
  strip.push(result);
  return strip;
}

function Reel({ result, spinning, delay, duration }: ReelProps) {
  const strip = buildStrip(result);
  const symbolHeight = 80; // px — must match the cell height below

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 88,
        height: symbolHeight,
        borderRadius: "0.5rem",
        background: "oklch(0.07 0 0)",
        border: "2px solid oklch(0.72 0.18 65 / 0.55)",
        boxShadow:
          "inset 0 0 20px oklch(0 0 0 / 0.7), 0 0 8px oklch(0.72 0.18 65 / 0.12)",
      }}
      aria-hidden="true"
    >
      {/* Top / bottom fade masks */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{
          height: 28,
          background:
            "linear-gradient(to bottom, oklch(0.07 0 0), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: 28,
          background: "linear-gradient(to top, oklch(0.07 0 0), transparent)",
        }}
      />

      {/* Center highlight line — gold */}
      <div
        className="absolute inset-x-0 z-10 pointer-events-none"
        style={{
          top: symbolHeight / 2 - 1,
          height: 2,
          background: "oklch(0.72 0.18 65 / 0.70)",
          boxShadow: "0 0 6px oklch(0.72 0.18 65 / 0.50)",
        }}
      />

      {/* Strip */}
      <div
        style={
          spinning
            ? {
                animation: `slotSpin ${duration}ms ease-out ${delay}ms 1 forwards`,
                transform: "translateY(0)",
              }
            : {
                transform: `translateY(-${(REEL_SYMBOL_COUNT - 1) * symbolHeight}px)`,
              }
        }
      >
        {strip.map((sym, i) => (
          <div
            key={`strip-${i}-${sym}`}
            style={{
              height: symbolHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              userSelect: "none",
            }}
          >
            {sym}
          </div>
        ))}
      </div>
    </div>
  );
}

const REEL_NAMES = ["left", "center", "right"] as const;

const BET_OPTIONS = [
  { label: "0.1 ICP", value: 0.1 },
  { label: "0.5 ICP", value: 0.5 },
  { label: "1 ICP", value: 1.0 },
];

interface SlotMachineProps {
  title: string;
}

export function SlotMachine({ title }: SlotMachineProps) {
  const [bet, setBet] = useState(0.1);
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState<string[]>(["🍒", "🍒", "🍒"]);
  const [outcome, setOutcome] = useState<Outcome>("idle");
  const [durations] = useState([1500, 1750, 2000]);
  const [delays] = useState([0, 120, 240]);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);

  const spin = useCallback(() => {
    if (spinning) return;

    const newResults = Array.from(
      { length: 3 },
      () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    );

    setResults(newResults);
    setOutcome("idle");
    setSpinning(true);

    const maxDuration = Math.max(...durations) + Math.max(...delays);
    spinTimeoutRef.current = setTimeout(() => {
      setSpinning(false);
      const [a, b, c] = newResults;
      if (a === b && b === c) {
        setOutcome("win");
      } else if (a === b || b === c || a === c) {
        setOutcome("near-miss");
      } else {
        setOutcome("loss");
      }
    }, maxDuration + 100);
  }, [spinning, durations, delays]);

  const outcomeLabel =
    outcome === "win"
      ? "🎉 JACKPOT!"
      : outcome === "near-miss"
        ? "✨ NEAR MISS"
        : outcome === "loss"
          ? "Try again!"
          : null;

  const outcomeClass =
    outcome === "win"
      ? "text-win"
      : outcome === "near-miss"
        ? "text-deposit"
        : outcome === "loss"
          ? "text-loss"
          : "";

  const isWin = outcome === "win";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 p-5 rounded-2xl border-2 transition-smooth",
      )}
      style={{
        background:
          "linear-gradient(160deg, oklch(0.11 0.02 45), oklch(0.08 0.01 45))",
        borderColor: isWin
          ? "oklch(0.72 0.18 65 / 0.80)"
          : outcome === "loss"
            ? "oklch(0.40 0.15 300 / 0.55)"
            : "oklch(0.72 0.18 65 / 0.35)",
        boxShadow: isWin
          ? "0 0 28px oklch(0.72 0.18 65 / 0.45), 0 0 8px oklch(0.72 0.18 65 / 0.25)"
          : "0 4px 24px oklch(0 0 0 / 0.5)",
      }}
      data-ocid="slot-machine"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "oklch(0.80 0.18 65)" }}
        >
          {title}
        </span>
      </div>

      {/* Reels */}
      <div
        className="flex items-center gap-3"
        role="img"
        aria-label={`Slot reels showing ${results.join(", ")}`}
      >
        {results.map((sym, i) => (
          <Reel
            key={REEL_NAMES[i]}
            result={sym}
            spinning={spinning}
            delay={delays[i]}
            duration={durations[i]}
          />
        ))}
      </div>

      {/* Outcome banner */}
      <div className="h-6 flex items-center justify-center">
        {outcomeLabel && !spinning && (
          <span className={cn("text-sm font-bold tracking-wide", outcomeClass)}>
            {outcomeLabel}
          </span>
        )}
      </div>

      {/* Bet selector */}
      <fieldset
        className="flex items-center gap-2 border-none p-0 m-0"
        aria-label="Bet amount"
      >
        <legend className="sr-only">Bet amount</legend>
        {BET_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setBet(opt.value)}
            disabled={spinning}
            className="px-3 py-1 rounded-md text-xs font-semibold transition-smooth"
            style={
              bet === opt.value
                ? {
                    border: "1px solid oklch(0.72 0.18 65 / 0.80)",
                    background: "oklch(0.72 0.18 65 / 0.20)",
                    color: "oklch(0.90 0.18 65)",
                  }
                : {
                    border: "1px solid oklch(0.25 0.05 65 / 0.50)",
                    background: "oklch(0.14 0.02 45)",
                    color: "oklch(0.70 0.03 65)",
                  }
            }
            data-ocid={`bet-option-${opt.value}`}
            aria-pressed={bet === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </fieldset>

      {/* Spin button */}
      <Button
        onClick={spin}
        disabled={spinning}
        className="w-full font-bold tracking-wide transition-smooth"
        style={{
          background: spinning
            ? "oklch(0.18 0.02 45)"
            : "linear-gradient(135deg, oklch(0.58 0.22 265) 0%, oklch(0.48 0.22 265) 50%, oklch(0.58 0.22 265) 100%)",
          backgroundSize: spinning ? undefined : "200% 100%",
          color: spinning ? "oklch(0.50 0.03 65)" : "oklch(0.97 0 0)",
          border: "none",
          fontWeight: 700,
        }}
        data-ocid="spin-btn"
        aria-label={spinning ? "Spinning…" : `Spin for ${bet} ICP`}
      >
        {spinning ? "Spinning…" : `Spin · ${bet} ICP`}
      </Button>
    </div>
  );
}
