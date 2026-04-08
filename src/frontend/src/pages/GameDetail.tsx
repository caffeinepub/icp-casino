import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Coins,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { createActor } from "../backend";
import type { Game, PlaceBetRequest, Transaction } from "../backend";
import { GameCategory } from "../backend";
import { formatICP, useWallet } from "../hooks/use-wallet";
import { getGameImage, isPicsumUrl } from "../utils/gameImages";

// ── constants ─────────────────────────────────────────────────────────────────

const E8S_PER_ICP = 100_000_000n;

const PRESET_BETS: { label: string; value: bigint }[] = [
  { label: "1 ICP", value: 1n * E8S_PER_ICP },
  { label: "5 ICP", value: 5n * E8S_PER_ICP },
  { label: "10 ICP", value: 10n * E8S_PER_ICP },
  { label: "25 ICP", value: 25n * E8S_PER_ICP },
  { label: "100 ICP", value: 100n * E8S_PER_ICP },
];

const MIN_BET_E8S = 1_000_000n; // 0.01 ICP

const CATEGORY_BADGE: Record<GameCategory, string> = {
  [GameCategory.Slots]: "badge-cyan",
  [GameCategory.TableGames]: "badge-magenta",
  [GameCategory.CardGames]: "badge-lime",
};

const CATEGORY_LABEL: Record<GameCategory, string> = {
  [GameCategory.Slots]: "Slots",
  [GameCategory.TableGames]: "Table Games",
  [GameCategory.CardGames]: "Card Games",
};

// ── helpers ──────────────────────────────────────────────────────────────────

function icpToE8s(icp: string): bigint | null {
  const n = Number.parseFloat(icp);
  if (Number.isNaN(n) || n <= 0) return null;
  return BigInt(Math.round(n * 100_000_000));
}

function e8sToIcpStr(e8s: bigint): string {
  return (Number(e8s) / 100_000_000).toString();
}

// ── sub-components ────────────────────────────────────────────────────────────

function GameHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[21/9] w-full rounded-xl" />
      <div className="flex gap-4">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-5 w-28 rounded" />
      </div>
    </div>
  );
}

function StatBadge({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${highlight ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border text-muted-foreground"}`}
    >
      <span className="shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide opacity-70">
          {label}
        </p>
        <p
          className={`text-sm font-bold font-mono ${highlight ? "text-primary" : "text-foreground"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

type OutcomeState =
  | { status: "idle" }
  | { status: "spinning" }
  | { status: "won"; tx: Transaction }
  | { status: "lost"; tx: Transaction };

function GameCanvas({ outcome }: { outcome: OutcomeState }) {
  if (outcome.status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 select-none">
        <div className="text-5xl animate-bounce">🎰</div>
        <p className="text-muted-foreground text-sm font-medium">
          Select a bet amount and press Launch Game
        </p>
      </div>
    );
  }

  if (outcome.status === "spinning") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex gap-3">
          {["🍋", "🔔", "⭐", "💎", "🎰"].map((emoji) => (
            <div
              key={emoji}
              className="w-14 h-14 bg-card border border-border rounded-lg flex items-center justify-center text-2xl animate-pulse"
              style={{
                animationDelay: `${Math.random() * 0.4}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <p className="text-primary font-semibold animate-pulse">
          Spinning the reels…
        </p>
      </div>
    );
  }

  const isWin = outcome.status === "won";
  const tx = outcome.tx;
  const amountStr = `${formatICP(tx.netAmount < 0n ? -tx.netAmount : tx.netAmount)} ICP`;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <div className={`text-6xl ${isWin ? "animate-bounce" : ""}`}>
        {isWin ? "🎉" : "😔"}
      </div>
      <div>
        <h3
          className={`font-display text-2xl font-bold mb-1 ${isWin ? "text-win" : "text-loss"}`}
        >
          {isWin ? "You Won!" : "Better luck next time!"}
        </h3>
        <p className="text-muted-foreground text-sm">
          {isWin ? (
            <>
              <span className="text-win font-semibold">+{amountStr}</span> added
              to your wallet
            </>
          ) : (
            <>
              <span className="text-loss font-semibold">-{amountStr}</span>{" "}
              deducted from your wallet
            </>
          )}
        </p>
      </div>
      {isWin && (
        <div className="flex gap-1 text-primary text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Jackpot winner
        </div>
      )}
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

interface GameDetailProps {
  gameId: bigint;
  onBack: () => void;
}

export default function GameDetail({ gameId, onBack }: GameDetailProps) {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { balance, isLoading: walletLoading } = useWallet();

  const [selectedBet, setSelectedBet] = useState<bigint>(PRESET_BETS[0].value);
  const [customInput, setCustomInput] = useState<string>("");
  const [customError, setCustomError] = useState<string>("");
  const [outcome, setOutcome] = useState<OutcomeState>({ status: "idle" });

  // ── data fetching ─────────────────────────────────────────────────────────

  const { data: game, isLoading: gameLoading } = useQuery<Game | null>({
    queryKey: ["game", gameId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGame(gameId);
    },
    enabled: !!actor && !isFetching,
  });

  // ── bet mutation ──────────────────────────────────────────────────────────

  const betMutation = useMutation({
    mutationFn: async (req: PlaceBetRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeBet(req);
    },
    onMutate: () => {
      setOutcome({ status: "spinning" });
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        const tx = result.ok;
        const isWin = tx.netAmount >= 0n;
        setOutcome({ status: isWin ? "won" : "lost", tx });
        queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      } else {
        setOutcome({ status: "idle" });
      }
    },
    onError: () => {
      setOutcome({ status: "idle" });
    },
  });

  // ── bet selection helpers ─────────────────────────────────────────────────

  const activeBet = customInput
    ? (icpToE8s(customInput) ?? selectedBet)
    : selectedBet;

  function handlePresetBet(value: bigint) {
    setSelectedBet(value);
    setCustomInput("");
    setCustomError("");
  }

  function handleCustomChange(val: string) {
    setCustomInput(val);
    setCustomError("");
    const e8s = icpToE8s(val);
    if (val && !e8s) {
      setCustomError("Enter a valid ICP amount");
    } else if (e8s && e8s < MIN_BET_E8S) {
      setCustomError("Minimum bet is 0.01 ICP");
    } else if (e8s && e8s > balance) {
      setCustomError("Exceeds your wallet balance");
    }
  }

  function handleLaunch() {
    const betAmount = activeBet;
    if (betAmount < MIN_BET_E8S) {
      setCustomError("Minimum bet is 0.01 ICP");
      return;
    }
    if (betAmount > balance) {
      setCustomError("Exceeds your wallet balance");
      return;
    }
    betMutation.mutate({ gameId, betAmount });
  }

  const isLaunching = betMutation.isPending || outcome.status === "spinning";
  const betError =
    customError ||
    (activeBet > balance && balance > 0n ? "Exceeds your wallet balance" : "");

  // ── loading state ─────────────────────────────────────────────────────────

  if (gameLoading || isFetching) {
    return (
      <div
        className="container mx-auto px-4 py-8 max-w-5xl"
        data-ocid="game-detail-loading"
      >
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 mb-6 text-muted-foreground hover:text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Lobby
        </Button>
        <GameHeaderSkeleton />
        <div className="mt-8 grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="md:col-span-2 space-y-3">
            {Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => (
              <Skeleton key={k} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div
        className="container mx-auto px-4 py-20 max-w-5xl text-center"
        data-ocid="game-not-found"
      >
        <p className="text-muted-foreground text-lg mb-4">Game not found.</p>
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Lobby
        </Button>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-5xl"
      data-ocid="game-detail-page"
    >
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 mb-6 text-muted-foreground hover:text-foreground transition-smooth"
        onClick={onBack}
        data-ocid="back-btn"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Lobby
      </Button>

      {/* Hero image */}
      <div className="relative rounded-xl overflow-hidden bg-card border border-border mb-6">
        <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          {(() => {
            const svgImage = getGameImage(Number(game.id));
            const useSvg =
              svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
            const src = useSvg ? svgImage : game.imageUrl;
            return src ? (
              <img
                src={src}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted via-secondary to-card flex items-center justify-center">
                <Zap className="w-16 h-16 text-primary/40" />
              </div>
            );
          })()}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <span className={CATEGORY_BADGE[game.category]}>
            {CATEGORY_LABEL[game.category]}
          </span>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-2">
            {game.name}
          </h1>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <StatBadge
          icon={<TrendingUp className="w-4 h-4" />}
          label="RTP"
          value={`${(game.rtp * 100).toFixed(1)}%`}
          highlight
        />
        <StatBadge
          icon={<TrendingDown className="w-4 h-4" />}
          label="House Edge"
          value={`${(game.houseEdge * 100).toFixed(1)}%`}
        />
        <StatBadge
          icon={<Users className="w-4 h-4" />}
          label="Players"
          value={Number(game.playerCount).toLocaleString()}
        />
      </div>

      {/* Main content: canvas + bet panel */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Game canvas */}
        <div
          className="md:col-span-3 bg-card border border-border rounded-xl overflow-hidden"
          data-ocid="game-canvas"
        >
          <div className="border-b border-border px-4 py-2.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Game Screen
            </span>
          </div>
          <div className="h-64 md:h-80">
            <GameCanvas outcome={outcome} />
          </div>
        </div>

        {/* Bet panel */}
        <div
          className="md:col-span-2 bg-card border border-border rounded-xl p-5 space-y-5"
          data-ocid="bet-panel"
        >
          {/* Wallet balance */}
          <div className="bg-muted/40 border border-border rounded-lg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Coins className="w-4 h-4" />
              <span>Wallet Balance</span>
            </div>
            {walletLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <span
                className="font-mono font-semibold text-foreground text-sm"
                data-ocid="wallet-balance"
              >
                {formatICP(balance)} ICP
              </span>
            )}
          </div>

          {/* Preset bets */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">
              Select Bet Amount
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_BETS.map((preset) => {
                const isActive = !customInput && selectedBet === preset.value;
                const isDisabled = preset.value > balance && balance > 0n;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetBet(preset.value)}
                    disabled={isDisabled}
                    data-ocid={`bet-preset-${preset.label.replace(" ", "-").toLowerCase()}`}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-smooth ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : isDisabled
                          ? "bg-muted/20 border-border text-muted-foreground/40 cursor-not-allowed"
                          : "bg-muted/40 border-border text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom input */}
          <div>
            <label
              htmlFor="custom-bet"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2"
            >
              Custom Amount (ICP)
            </label>
            <Input
              id="custom-bet"
              type="number"
              min="0.01"
              step="0.01"
              placeholder={`e.g. ${e8sToIcpStr(selectedBet)}`}
              value={customInput}
              onChange={(e) => handleCustomChange(e.target.value)}
              className="bg-input border-border font-mono text-sm"
              data-ocid="custom-bet-input"
            />
            {betError && (
              <p className="text-xs text-destructive mt-1.5 font-medium">
                {betError}
              </p>
            )}
          </div>

          {/* Active bet summary */}
          <div className="flex items-center justify-between text-sm border-t border-border pt-4">
            <span className="text-muted-foreground">Placing bet</span>
            <span className="font-mono font-bold text-primary text-base">
              {formatICP(activeBet)} ICP
            </span>
          </div>

          {/* Launch button */}
          <Button
            size="lg"
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md transition-smooth"
            onClick={handleLaunch}
            disabled={
              isLaunching ||
              !!betError ||
              activeBet < MIN_BET_E8S ||
              activeBet > balance
            }
            data-ocid="launch-game-btn"
          >
            {isLaunching ? (
              <>
                <Zap className="w-4 h-4 animate-spin" /> Spinning…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Launch Game
              </>
            )}
          </Button>

          {/* Outcome result card */}
          {(outcome.status === "won" || outcome.status === "lost") && (
            <div
              className={`rounded-lg border p-4 text-center ${
                outcome.status === "won"
                  ? "bg-win-muted border-win"
                  : "bg-loss-muted border-loss"
              }`}
              data-ocid="outcome-result"
            >
              <p
                className={`font-display font-bold text-lg ${outcome.status === "won" ? "text-win" : "text-loss"}`}
              >
                {outcome.status === "won" ? "🎉 You Won!" : "😔 You Lost"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Net:{" "}
                <span
                  className={`font-mono font-semibold ${outcome.status === "won" ? "text-win" : "text-loss"}`}
                >
                  {outcome.tx.netAmount >= 0n ? "+" : ""}
                  {formatICP(outcome.tx.netAmount)} ICP
                </span>
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setOutcome({ status: "idle" })}
                data-ocid="play-again-btn"
              >
                Play again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
