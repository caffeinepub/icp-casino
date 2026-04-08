import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Match, OnlinePlayer } from "../backend";
import { VersusGameType, WagerAmount } from "../backend";
import { OnlinePlayersList } from "../components/versus/OnlinePlayersList";
import { WagerSelector } from "../components/versus/WagerSelector";
import { useAuth } from "../hooks/use-auth";
import {
  useCreateMatch,
  useHeartbeat,
  useJoinMatch,
  useOnlinePlayers,
  useOpenMatches,
} from "../hooks/use-versus";

interface VersusLobbyProps {
  onMatchStart: (matchId: string) => void;
}

const GAME_OPTIONS = [
  {
    type: VersusGameType.Chess,
    label: "Chess",
    emoji: "♟️",
    desc: "Classic strategy. Checkmate your opponent to win.",
  },
  {
    type: VersusGameType.DiceRoll,
    label: "Dice Roll",
    emoji: "🎲",
    desc: "Roll the dice. Highest roll wins the pot.",
  },
  {
    type: VersusGameType.RockPaperScissors,
    label: "Rock Paper Scissors",
    emoji: "✊",
    desc: "Best of one. Pure instinct and psychology.",
  },
];

function GameCard({
  type,
  label,
  emoji,
  desc,
  selected,
  onSelect,
}: {
  type: VersusGameType;
  label: string;
  emoji: string;
  desc: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-xl p-5 border transition-smooth focus-visible:ring-2 focus-visible:ring-primary card-shimmer ${selected ? "glass-card border-gold-pulse" : "glass-dark"}`}
      style={{
        borderColor: selected
          ? "oklch(0.72 0.18 65 / 0.70)"
          : "oklch(0.4 0.15 300 / 0.30)",
        boxShadow: selected
          ? "0 0 28px oklch(0.72 0.18 65 / 0.25), var(--shadow-md)"
          : "none",
        transform: selected ? "translateY(-2px)" : undefined,
      }}
      data-ocid={`game-select-${type.toLowerCase()}`}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <p
        className="font-display font-semibold text-base mb-1"
        style={{
          color: selected ? "oklch(0.88 0.18 65)" : "oklch(0.82 0.02 65)",
        }}
      >
        {label}
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "oklch(0.52 0.03 65)" }}
      >
        {desc}
      </p>
      {selected && (
        <div
          className="mt-3 text-xs font-bold flex items-center gap-1.5"
          style={{ color: "oklch(0.82 0.18 65)" }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              background: "oklch(0.82 0.18 65)",
              boxShadow: "0 0 6px oklch(0.72 0.18 65 / 0.80)",
            }}
          />
          Selected
        </div>
      )}
    </button>
  );
}

function wagerToICP(wager: WagerAmount): number {
  if (wager === WagerAmount.Ten) return 10;
  if (wager === WagerAmount.Thirty) return 30;
  return 100;
}

function OpenMatchRow({
  match,
  onJoin,
  isJoining,
}: {
  match: Match;
  onJoin: (id: string) => void;
  isJoining: boolean;
}) {
  const gameLabel =
    GAME_OPTIONS.find((g) => g.type === match.gameType)?.label ??
    match.gameType;

  return (
    <div
      className="glass-card flex items-center justify-between px-4 py-3 rounded-xl border transition-smooth hover:border-primary/50"
      style={{
        borderColor: "oklch(0.72 0.18 65 / 0.25)",
      }}
      data-ocid="open-match-row"
    >
      <div className="min-w-0">
        <p
          className="font-semibold text-sm"
          style={{ color: "oklch(0.88 0.02 65)" }}
        >
          {gameLabel}
        </p>
        <p
          className="text-xs font-mono"
          style={{ color: "oklch(0.50 0.03 65)" }}
        >
          {match.player1.id.toText().slice(0, 12)}…
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span
          className="font-mono text-sm font-bold icp-value"
          style={{ color: "oklch(0.82 0.18 65)" }}
        >
          {wagerToICP(match.wager)} ICP
        </span>
        <Button
          size="sm"
          onClick={() => onJoin(match.id)}
          disabled={isJoining}
          className="font-bold btn-premium"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
            color: "oklch(0.97 0 0)",
            border: "none",
            boxShadow: "0 2px 10px oklch(0.55 0.22 265 / 0.35)",
          }}
          data-ocid="join-match-btn"
        >
          Join
        </Button>
      </div>
    </div>
  );
}

// Plug Wallet required — full banner (unauthenticated)
function PlugWalletFullBanner() {
  return (
    <div
      className="glass-card flex items-start gap-4 px-5 py-4 rounded-2xl border-2"
      style={{
        borderColor: "oklch(0.72 0.18 65 / 0.65)",
        boxShadow: "0 0 36px oklch(0.72 0.18 65 / 0.15), var(--shadow-md)",
      }}
      data-ocid="plug-wallet-full-banner"
    >
      <Wallet
        className="w-6 h-6 mt-0.5 shrink-0"
        style={{ color: "oklch(0.82 0.18 65)" }}
      />
      <div className="space-y-1">
        <p
          className="font-display font-bold text-base"
          style={{ color: "oklch(0.88 0.18 65)" }}
        >
          Plug Wallet Required
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.65 0.03 65)" }}
        >
          Please use{" "}
          <span
            className="font-semibold"
            style={{ color: "oklch(0.72 0.15 300)" }}
          >
            Plug Wallet
          </span>{" "}
          to connect and play Versus Mode. Plug Wallet is required for real ICP
          betting.
        </p>
      </div>
    </div>
  );
}

// Plug Wallet info strip — compact, always visible when authenticated
function PlugWalletInfoStrip() {
  return (
    <div
      className="glass-dark flex items-center gap-2 px-4 py-2.5 rounded-xl border"
      style={{
        borderColor: "oklch(0.45 0.15 300 / 0.40)",
      }}
      data-ocid="plug-wallet-strip"
    >
      <Wallet
        className="w-3.5 h-3.5 shrink-0"
        style={{ color: "oklch(0.72 0.15 300)" }}
      />
      <span
        className="text-xs font-bold"
        style={{ color: "oklch(0.78 0.15 300)" }}
      >
        Plug Wallet required
      </span>
      <span className="text-xs" style={{ color: "oklch(0.50 0.03 65)" }}>
        — real ICP bets only
      </span>
    </div>
  );
}

export default function VersusLobby({ onMatchStart }: VersusLobbyProps) {
  const { isAuthenticated } = useAuth();
  const [gameType, setGameType] = useState<VersusGameType>(
    VersusGameType.Chess,
  );
  const [wager, setWager] = useState<WagerAmount>(WagerAmount.Ten);

  const { data: onlinePlayers = [], isLoading: playersLoading } =
    useOnlinePlayers();
  const { data: openMatches = [], isLoading: matchesLoading } =
    useOpenMatches();
  const { mutate: createMatch, isPending: isCreating } = useCreateMatch();
  const { mutate: joinMatchMutate, isPending: isJoining } = useJoinMatch();

  useHeartbeat();

  function handleCreate() {
    createMatch(
      { gameType, wager },
      { onSuccess: (match) => onMatchStart(match.id) },
    );
  }

  function handleJoin(matchId: string) {
    joinMatchMutate(matchId, {
      onSuccess: (result) => {
        if (result.__kind__ === "Success") {
          onMatchStart(result.Success.id);
        }
      },
    });
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-96 gap-6 px-6 max-w-lg mx-auto"
        data-ocid="versus-unauthenticated"
      >
        <PlugWalletFullBanner />
        <p
          className="text-sm text-center"
          style={{ color: "oklch(0.45 0.03 65)" }}
        >
          Connect your wallet above to access Versus Mode and start competing
          for real ICP.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex h-[calc(100vh-4rem)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, oklch(0.13 0.03 300 / 0.45) 0%, oklch(0.07 0 0) 65%)",
      }}
      data-ocid="versus-lobby"
    >
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4 mb-1">
            {/* Crown decorative SVG */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 18h18M4 18L2 7l5 4 5-7 5 7 5-4-2 11H4z"
                stroke="oklch(0.72 0.18 65)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="oklch(0.72 0.18 65 / 0.15)"
              />
            </svg>
            <h1
              className="heading-cinematic text-gold-glow font-display text-3xl font-bold"
              style={{ color: "oklch(0.88 0.18 65)" }}
            >
              Versus Mode
            </h1>
            <Badge
              className="text-xs font-mono font-bold"
              style={{
                background: "oklch(0.45 0.15 300 / 0.25)",
                color: "oklch(0.78 0.15 300)",
                border: "1px solid oklch(0.45 0.15 300 / 0.45)",
              }}
            >
              PvP
            </Badge>
          </div>
          <p
            className="text-premium text-sm"
            style={{ color: "oklch(0.55 0.03 65)" }}
          >
            Challenge real players. Agree on a wager. Winner takes all.
          </p>
          {/* Always-visible Plug Wallet info strip */}
          <PlugWalletInfoStrip />
        </motion.div>

        {/* Create Match */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 border space-y-6 relative overflow-hidden"
          style={{
            borderColor: "oklch(0.72 0.18 65 / 0.25)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="cinematic-top-light" aria-hidden="true" />
          <h2
            className="font-display text-lg font-semibold"
            style={{ color: "oklch(0.82 0.03 65)" }}
          >
            Create a Match
          </h2>

          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.50 0.03 65)" }}
            >
              Choose Game
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {GAME_OPTIONS.map(({ type, label, emoji, desc }) => (
                <GameCard
                  key={type}
                  type={type}
                  label={label}
                  emoji={emoji}
                  desc={desc}
                  selected={gameType === type}
                  onSelect={() => setGameType(type)}
                />
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.50 0.03 65)" }}
            >
              Wager Amount
            </p>
            <WagerSelector selected={wager} onChange={setWager} />
            <p
              className="text-xs mt-2"
              style={{ color: "oklch(0.45 0.03 65)" }}
            >
              Real ICP deducted from your Plug Wallet — winner takes both
              wagers.
            </p>
          </div>

          <Button
            onClick={handleCreate}
            disabled={isCreating}
            className="w-full sm:w-auto font-bold btn-premium px-8"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
              color: "oklch(0.97 0 0)",
              border: "none",
              boxShadow: "0 4px 20px oklch(0.55 0.22 265 / 0.40)",
            }}
            data-ocid="create-match-btn"
          >
            {isCreating
              ? "Creating Match…"
              : "Create Match & Wait for Opponent"}
          </Button>
        </motion.section>

        {/* Open Matches */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2
            className="font-display text-lg font-semibold mb-4"
            style={{ color: "oklch(0.78 0.03 65)" }}
          >
            Open Matches
          </h2>
          {matchesLoading ? (
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <Skeleton key={n} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : openMatches.length === 0 ? (
            <div
              className="glass-dark rounded-xl p-8 border text-center"
              style={{
                borderColor: "oklch(0.4 0.15 300 / 0.25)",
              }}
              data-ocid="no-open-matches"
            >
              <p className="text-sm" style={{ color: "oklch(0.45 0.03 65)" }}>
                No open matches. Create one and wait for a challenger!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {openMatches.map((m) => (
                <OpenMatchRow
                  key={m.id}
                  match={m}
                  onJoin={handleJoin}
                  isJoining={isJoining}
                />
              ))}
            </div>
          )}
        </motion.section>
      </div>

      {/* Right sidebar: Online Players */}
      <div
        className="w-72 glass-dark border-l flex flex-col overflow-y-auto shrink-0"
        style={{
          borderColor: "oklch(0.72 0.18 65 / 0.20)",
        }}
      >
        <OnlinePlayersList
          players={onlinePlayers as OnlinePlayer[]}
          isLoading={playersLoading}
        />
      </div>
    </div>
  );
}
