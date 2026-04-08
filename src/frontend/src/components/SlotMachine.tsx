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
        background: "oklch(0.10 0 0)",
        border: "2px solid oklch(var(--primary) / 0.4)",
        boxShadow: "inset 0 0 16px oklch(0 0 0 / 0.6)",
      }}
      aria-hidden="true"
    >
      {/* Top / bottom fade masks */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{
          height: 28,
          background:
            "linear-gradient(to bottom, oklch(0.10 0 0), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: 28,
          background: "linear-gradient(to top, oklch(0.10 0 0), transparent)",
        }}
      />

      {/* Center highlight line */}
      <div
        className="absolute inset-x-0 z-10 pointer-events-none"
        style={{
          top: symbolHeight / 2 - 1,
          height: 2,
          background: "oklch(var(--primary) / 0.5)",
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

  const machineBorderClass =
    outcome === "win"
      ? "border-win shadow-win-glow"
      : outcome === "loss"
        ? "border-loss"
        : "border-primary/30";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 p-5 rounded-2xl bg-card border-2 transition-smooth",
        machineBorderClass,
      )}
      style={
        outcome === "win"
          ? {
              boxShadow:
                "0 0 24px oklch(var(--win) / 0.35), 0 0 6px oklch(var(--win) / 0.2)",
            }
          : undefined
      }
      data-ocid="slot-machine"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "oklch(var(--primary))" }}
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
            className={cn(
              "px-3 py-1 rounded-md text-xs font-semibold border transition-smooth",
              bet === opt.value
                ? "border-primary bg-primary/20 text-foreground"
                : "border-border bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
            style={
              bet === opt.value
                ? { borderColor: "oklch(var(--primary))" }
                : undefined
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
        className="w-full font-bold tracking-wide"
        style={{
          background: spinning
            ? undefined
            : "linear-gradient(135deg, oklch(var(--primary)) 0%, oklch(0.55 0.28 280) 100%)",
          color: "oklch(var(--primary-foreground))",
        }}
        data-ocid="spin-btn"
        aria-label={spinning ? "Spinning…" : `Spin for ${bet} ICP`}
      >
        {spinning ? "Spinning…" : `Spin · ${bet} ICP`}
      </Button>
    </div>
  );
}
