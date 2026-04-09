import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Wallet } from "lucide-react";
import { useState } from "react";
import type { GameState, OnlinePlayer } from "../backend";
import { MatchStatus, VersusGameType } from "../backend";
import type { WagerAmount } from "../backend";
import { FlagIcon, isFlagAvatar } from "../components/FlagIcons";
import { LiveChat } from "../components/versus/LiveChat";
import { MatchStatusCard } from "../components/versus/MatchStatusCard";
import { OnlinePlayersList } from "../components/versus/OnlinePlayersList";
import { WagerSelector } from "../components/versus/WagerSelector";
import { useAuth } from "../hooks/use-auth";
import {
  getAvatarUrl,
  getDisplayName,
  isEmojiAvatar,
  useMyProfile,
} from "../hooks/use-profile";
import {
  useAcceptWager,
  useHeartbeat,
  useLeaveMatch,
  useMakeChessMove,
  useMakeDiceRoll,
  useMakeRPSChoice,
  useMatch,
  useMatchChat,
  useOnlinePlayers,
} from "../hooks/use-versus";

interface VersusMatchProps {
  matchId: string;
  onBack: () => void;
}

/** Extended OnlinePlayer with optional profile fields */
type OnlinePlayerWithProfile = OnlinePlayer;

function resolveOnlinePlayerName(player: OnlinePlayerWithProfile): string {
  if (player.username) return player.username;
  return `Player_${player.id.toText().replace(/-/g, "").slice(-6).toUpperCase()}`;
}

function resolveOnlinePlayerAvatar(
  player: OnlinePlayerWithProfile,
): string | null {
  return player.avatarUrl ?? null;
}

function wagerToICP(wager: string): number {
  if (wager === "Ten") return 10;
  if (wager === "Thirty") return 30;
  return 100;
}

function PlugWalletBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold"
        style={{
          background: "oklch(0.45 0.15 300 / 0.20)",
          border: "1px solid oklch(0.45 0.15 300 / 0.45)",
          color: "oklch(0.78 0.15 300)",
        }}
        data-ocid="plug-wallet-badge"
      >
        <Wallet className="w-3 h-3" />
        Playing with Plug Wallet
      </div>
    );
  }
  return (
    <div
      className="glass-card flex items-center gap-3 px-4 py-3 rounded-xl border"
      style={{
        borderColor: "oklch(0.72 0.18 65 / 0.50)",
        boxShadow: "0 0 20px oklch(0.72 0.18 65 / 0.12)",
      }}
      data-ocid="plug-wallet-notice"
    >
      <Wallet
        className="w-5 h-5 shrink-0"
        style={{ color: "oklch(0.82 0.14 65)" }}
      />
      <p
        className="text-sm font-semibold"
        style={{ color: "oklch(0.82 0.14 65)" }}
      >
        Please use{" "}
        <span style={{ color: "oklch(0.72 0.15 300)" }}>Plug Wallet</span> to
        connect and play Versus Mode.{" "}
        <span style={{ color: "oklch(0.65 0.04 280)" }}>
          Plug Wallet is required for real ICP betting.
        </span>
      </p>
    </div>
  );
}

function WagerPanel({
  wagerICP,
  pending,
  matchId,
  myId,
  player1Id,
  pendingWager,
}: {
  wagerICP: number;
  pending: boolean;
  matchId: string;
  myId: string | null;
  player1Id: string;
  pendingWager: WagerAmount;
}) {
  const { mutate: acceptWager, isPending: isAccepting } = useAcceptWager();
  const potICP = wagerICP * 2;
  const isPlayer2 = myId !== null && myId !== player1Id;

  return (
    <div
      className={`rounded-2xl border-2 p-6 flex flex-col gap-5${!pending ? " versus-wager-panel-active" : ""}`}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.04 300 / 0.50), oklch(0.10 0.02 65 / 0.40))",
        borderColor: "oklch(0.72 0.18 65 / 0.65)",
        boxShadow:
          "0 0 32px oklch(0.72 0.18 65 / 0.20), 0 0 10px oklch(0.72 0.18 65 / 0.12), var(--shadow-xl)",
      }}
      data-ocid="wager-panel"
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "oklch(0.58 0.03 280)" }}
        >
          {pending ? "Proposed Wager" : "Active Wager"}
        </span>
        <PlugWalletBanner compact />
      </div>

      <div className="flex items-center gap-8 flex-wrap">
        <div className="flex flex-col items-center">
          <span
            className="font-mono text-4xl font-bold leading-none icp-value"
            style={{
              color: "oklch(0.87 0.14 65)",
              textShadow:
                "0 0 20px oklch(0.72 0.18 65 / 0.50), 0 2px 4px oklch(0 0 0 / 0.60)",
            }}
          >
            {wagerICP}
          </span>
          <span
            className="text-xs font-semibold mt-1.5"
            style={{ color: "oklch(0.58 0.03 280)" }}
          >
            ICP each
          </span>
        </div>
        <div
          className="text-2xl font-black"
          style={{
            color: "oklch(0.45 0.15 300 / 0.80)",
            textShadow: "0 0 12px oklch(0.45 0.15 300 / 0.40)",
          }}
        >
          ×2
        </div>
        <div className="flex flex-col items-center">
          <span
            className="font-mono text-4xl font-bold leading-none icp-value"
            style={{
              color: "oklch(0.85 0.14 65)",
              textShadow:
                "0 0 24px oklch(0.72 0.18 65 / 0.55), 0 2px 4px oklch(0 0 0 / 0.60)",
            }}
          >
            {potICP}
          </span>
          <span
            className="text-xs font-bold mt-1.5"
            style={{ color: "oklch(0.72 0.15 300)" }}
          >
            Total Pot
          </span>
        </div>
      </div>

      {pending && (
        <div
          className="space-y-3 border-t pt-4"
          style={{ borderColor: "oklch(0.72 0.18 65 / 0.20)" }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: "oklch(0.78 0.14 65)" }}
          >
            Wager proposed by opponent — confirm amount to start:
          </p>
          <WagerSelector selected={pendingWager} onChange={() => {}} disabled />
          {isPlayer2 && (
            <Button
              onClick={() => acceptWager(matchId)}
              disabled={isAccepting}
              className="w-full font-bold btn-premium"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                color: "oklch(0.97 0 0)",
                border: "none",
                boxShadow: "0 4px 20px oklch(0.55 0.22 265 / 0.40)",
              }}
              data-ocid="accept-wager-btn"
            >
              {isAccepting ? "Confirming…" : `Accept ${wagerICP} ICP Wager`}
            </Button>
          )}
          {!isPlayer2 && (
            <p
              className="text-xs text-center"
              style={{ color: "oklch(0.54 0.03 280)" }}
            >
              Waiting for opponent to accept this wager…
            </p>
          )}
        </div>
      )}

      {!pending && (
        <div
          className="flex items-center gap-2 text-xs font-bold"
          style={{ color: "oklch(0.78 0.14 65)" }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
            style={{
              background: "oklch(0.78 0.14 65)",
              boxShadow:
                "0 0 8px oklch(0.72 0.18 65 / 0.90), 0 0 16px oklch(0.72 0.18 65 / 0.45)",
            }}
          />
          Wager locked — winner takes {potICP} ICP
        </div>
      )}
    </div>
  );
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

const PIECE_SYMBOLS: Record<string, string> = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟",
};

function parseBoard(fen: string): Record<string, string> {
  const board: Record<string, string> = {};
  const rows = fen.split("/");
  rows.forEach((row, ri) => {
    const rank = 8 - ri;
    let file = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        file += Number.parseInt(ch, 10);
      } else {
        board[`${FILES[file]}${rank}`] = ch;
        file++;
      }
    }
  });
  return board;
}

function ChessBoard({
  fen,
  myTurn,
  onMove,
}: {
  fen: string;
  myTurn: boolean;
  onMove: (from: string, to: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const board = parseBoard(fen.split(" ")[0]);

  function handleSquare(sq: string) {
    if (!myTurn) return;
    if (selected) {
      if (selected === sq) {
        setSelected(null);
      } else {
        onMove(selected, sq);
        setSelected(null);
      }
    } else if (board[sq]) {
      setSelected(sq);
    }
  }

  return (
    <div
      className="glass-card w-full max-w-lg mx-auto select-none rounded-2xl p-4"
      style={{
        borderColor: "oklch(0.72 0.18 65 / 0.30)",
        boxShadow: "var(--shadow-xl), 0 0 40px oklch(0.72 0.18 65 / 0.10)",
      }}
      data-ocid="chess-board"
    >
      <div className="flex pl-6 mb-1">
        {FILES.map((f) => (
          <div
            key={f}
            className="flex-1 text-center text-xs"
            style={{ color: "oklch(0.54 0.03 280)" }}
          >
            {f}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="flex flex-col justify-around pr-2">
          {RANKS.map((r) => (
            <div
              key={r}
              className="h-12 flex items-center text-xs"
              style={{ color: "oklch(0.54 0.03 280)" }}
            >
              {r}
            </div>
          ))}
        </div>
        <div
          className="grid grid-cols-8 flex-1 rounded-lg overflow-hidden border"
          style={{
            borderColor: "oklch(0.72 0.18 65 / 0.25)",
            boxShadow: "0 0 0 1px oklch(0.72 0.18 65 / 0.10)",
          }}
        >
          {RANKS.flatMap((rank) =>
            FILES.map((file) => {
              const sq = `${file}${rank}`;
              const isLight = (FILES.indexOf(file) + rank) % 2 === 1;
              const piece = board[sq];
              const isSelected = selected === sq;
              return (
                <button
                  key={sq}
                  type="button"
                  onClick={() => handleSquare(sq)}
                  className="h-12 flex items-center justify-center text-2xl transition-smooth focus-visible:ring-2 focus-visible:ring-primary"
                  style={{
                    background: isSelected
                      ? "oklch(0.72 0.18 65 / 0.50)"
                      : isLight
                        ? "oklch(0.24 0.04 300 / 0.70)"
                        : "oklch(0.12 0.02 300 / 0.60)",
                    cursor: myTurn ? "pointer" : "default",
                    boxShadow: isSelected
                      ? "inset 0 0 12px oklch(0.72 0.18 65 / 0.30)"
                      : undefined,
                  }}
                  aria-label={`${sq}${piece ? ` ${PIECE_SYMBOLS[piece] ?? piece}` : ""}`}
                >
                  {piece ? (
                    <span
                      style={{
                        color:
                          piece === piece.toUpperCase()
                            ? "oklch(0.85 0.14 65)"
                            : "oklch(0.50 0.18 300)",
                        textShadow:
                          piece === piece.toUpperCase()
                            ? "0 1px 6px oklch(0 0 0 / 0.70), 0 0 10px oklch(0.72 0.18 65 / 0.30)"
                            : "0 1px 6px oklch(0 0 0 / 0.70)",
                        lineHeight: 1,
                      }}
                    >
                      {PIECE_SYMBOLS[piece] ?? piece}
                    </span>
                  ) : null}
                </button>
              );
            }),
          )}
        </div>
      </div>
      {!myTurn && (
        <p
          className="text-center text-sm mt-3"
          style={{ color: "oklch(0.58 0.03 280)" }}
        >
          Waiting for opponent's move…
        </p>
      )}
    </div>
  );
}

function DiceGame({
  state,
  matchId,
  canRoll,
}: { state: GameState; matchId: string; canRoll: boolean }) {
  const { mutate: roll, isPending } = useMakeDiceRoll();
  const diceState = state.__kind__ === "DiceRoll" ? state.DiceRoll : null;

  return (
    <div
      className="flex flex-col items-center justify-center gap-8 py-8"
      data-ocid="dice-game"
    >
      <div className="flex gap-10">
        {[
          { roll: diceState?.player1Roll, label: "Player 1", isGold: true },
          { roll: diceState?.player2Roll, label: "Player 2", isGold: false },
        ].map(({ roll, label, isGold }) => (
          <div key={label} className="text-center">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-mono font-black border-2 card-shimmer"
              style={{
                background: isGold
                  ? "linear-gradient(135deg, oklch(0.14 0.04 290 / 0.80), oklch(0.10 0.03 290))"
                  : "linear-gradient(135deg, oklch(0.14 0.04 300 / 0.60), oklch(0.10 0.02 300 / 0.50))",
                borderColor: isGold
                  ? "oklch(0.72 0.18 65 / 0.55)"
                  : "oklch(0.45 0.15 300 / 0.55)",
                color: isGold ? "oklch(0.85 0.14 65)" : "oklch(0.78 0.15 300)",
                boxShadow: isGold
                  ? "0 0 20px oklch(0.72 0.18 65 / 0.20), var(--shadow-md)"
                  : "0 0 20px oklch(0.45 0.15 300 / 0.20), var(--shadow-md)",
                textShadow: isGold
                  ? "0 0 12px oklch(0.72 0.18 65 / 0.50)"
                  : undefined,
              }}
            >
              {roll != null ? String(roll) : "?"}
            </div>
            <p
              className="text-xs font-semibold mt-2"
              style={{ color: "oklch(0.58 0.03 280)" }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
      {canRoll && (
        <Button
          onClick={() => roll(matchId)}
          disabled={isPending}
          className="font-bold btn-premium px-10 py-3 text-base"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
            color: "oklch(0.97 0 0)",
            border: "none",
            boxShadow: "0 4px 20px oklch(0.55 0.22 265 / 0.40)",
          }}
          data-ocid="roll-dice-btn"
        >
          {isPending ? "Rolling…" : "🎲 Roll Dice"}
        </Button>
      )}
    </div>
  );
}

const RPS_CHOICES = [
  { value: "Rock", emoji: "✊" },
  { value: "Paper", emoji: "✋" },
  { value: "Scissors", emoji: "✌️" },
];

function RPSGame({
  state,
  matchId,
  canPlay,
}: { state: GameState; matchId: string; canPlay: boolean }) {
  const { mutate: choose, isPending } = useMakeRPSChoice();
  const [myChoice, setMyChoice] = useState<string | null>(null);
  const rpsState = state.__kind__ === "RPS" ? state.RPS : null;

  function handleChoice(choice: string) {
    if (!canPlay || isPending) return;
    setMyChoice(choice);
    choose({ matchId, choice });
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-8 py-8"
      data-ocid="rps-game"
    >
      {rpsState?.player1Choice || rpsState?.player2Choice ? (
        <div className="flex gap-8 text-5xl">
          {[
            { choice: rpsState.player1Choice, label: "Player 1" },
            { choice: rpsState.player2Choice, label: "Player 2" },
          ].map(({ choice, label }) => (
            <div key={label} className="text-center">
              <div>
                {RPS_CHOICES.find((c) => c.value === choice)?.emoji ?? "🤔"}
              </div>
              <p
                className="text-xs mt-2 font-semibold"
                style={{ color: "oklch(0.58 0.03 280)" }}
              >
                {choice ?? "Choosing…"}
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ color: "oklch(0.45 0.03 280)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {canPlay && !myChoice && (
        <div className="flex gap-4">
          {RPS_CHOICES.map(({ value, emoji }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleChoice(value)}
              disabled={isPending}
              className="w-24 h-24 rounded-2xl text-4xl flex items-center justify-center border-2 transition-smooth hover:scale-110 card-shimmer"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.14 0.04 290 / 0.70), oklch(0.10 0.03 290))",
                borderColor: "oklch(0.72 0.18 65 / 0.45)",
                boxShadow: "0 4px 16px oklch(0 0 0 / 0.50)",
              }}
              data-ocid={`rps-choice-${value.toLowerCase()}`}
              aria-label={value}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      {myChoice && (
        <p
          className="text-sm text-premium"
          style={{ color: "oklch(0.58 0.03 280)" }}
        >
          You chose {myChoice}. Waiting for opponent…
        </p>
      )}
    </div>
  );
}

/** Opponent identity display in match header */
function OpponentCard({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string | null;
}) {
  const initial = name.slice(0, 1).toUpperCase();
  const hue = (name.charCodeAt(0) * 137) % 360;
  const color = `oklch(0.65 0.22 ${hue})`;

  return (
    <div
      className="glass-card flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs"
      style={{ borderColor: "oklch(0.72 0.18 65 / 0.25)" }}
    >
      <span
        className="profile-avatar-thumbnail shrink-0"
        style={{
          width: 28,
          height: 28,
          fontSize: 11,
          border: `1px solid ${color}60`,
          boxShadow: `0 0 6px ${color}40`,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        {avatarUrl && isFlagAvatar(avatarUrl) ? (
          <FlagIcon code={avatarUrl} size={42} />
        ) : avatarUrl && isEmojiAvatar(avatarUrl) ? (
          <span style={{ fontSize: 17, lineHeight: 1 }}>{avatarUrl}</span>
        ) : avatarUrl ? (
          <img src={avatarUrl} alt={name} />
        ) : (
          <span style={{ color }}>{initial}</span>
        )}
      </span>
      <span
        className="font-bold text-gold-glow"
        style={{ color: "oklch(0.82 0.14 65)" }}
      >
        You
      </span>
      <span
        className="font-black text-sm"
        style={{ color: "oklch(0.45 0.15 300 / 0.80)" }}
      >
        ⚔
      </span>
      <span
        className="profile-username-display"
        style={{ color: "oklch(0.72 0.15 300)" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function VersusMatch({ matchId, onBack }: VersusMatchProps) {
  const { principalText, isAuthenticated } = useAuth();
  const { data: myProfile } = useMyProfile();
  const myDisplayName = getDisplayName(myProfile, principalText);
  const myAvatarUrl = getAvatarUrl(myProfile);

  const { data: match, isLoading } = useMatch(matchId);
  const { data: chatMessages = [] } = useMatchChat(matchId);
  const { data: onlinePlayers = [] } = useOnlinePlayers();
  const { mutate: leaveMatch } = useLeaveMatch();
  const { mutate: makeMove } = useMakeChessMove();

  useHeartbeat();

  function handleLeave() {
    leaveMatch(matchId);
    onBack();
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-6 px-6">
        <PlugWalletBanner />
        <Button onClick={onBack} variant="outline" data-ocid="back-btn">
          Back to Lobby
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 flex items-center justify-center">
          <div className="versus-spinner" />
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <p style={{ color: "oklch(0.58 0.03 280)" }}>Match not found.</p>
        <Button onClick={onBack} variant="outline" data-ocid="back-btn">
          Back to Lobby
        </Button>
      </div>
    );
  }

  const myId = principalText;
  const isMyTurn =
    match.gameState.__kind__ === "Chess"
      ? match.gameState.Chess.currentTurn.toText() === myId
      : true;

  const opponentPlayer =
    match.player1.id.toText() === myId ? match.player2 : match.player1;

  // Try to find opponent in online players list to get profile data
  const opponentOnlineEntry = opponentPlayer
    ? (onlinePlayers as OnlinePlayerWithProfile[]).find(
        (p) => p.id.toText() === opponentPlayer.id.toText(),
      )
    : undefined;

  const opponentName = opponentOnlineEntry
    ? resolveOnlinePlayerName(opponentOnlineEntry)
    : opponentPlayer
      ? `Player_${opponentPlayer.id.toText().replace(/-/g, "").slice(-6).toUpperCase()}`
      : "Opponent";

  const opponentAvatarUrl = opponentOnlineEntry
    ? resolveOnlinePlayerAvatar(opponentOnlineEntry)
    : null;

  const wagerICP = wagerToICP(match.wager);
  const isWagerPending = match.status === MatchStatus.WagerPending;

  return (
    <div
      className="flex h-[calc(100vh-4rem)] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, oklch(0.13 0.03 300 / 0.45) 0%, oklch(0.07 0 0) 65%)",
      }}
      data-ocid="versus-match"
    >
      {/* Left: game board (~70%) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div
          className="glass-dark flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{ borderColor: "oklch(0.72 0.18 65 / 0.18)" }}
        >
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm transition-smooth btn-premium px-3 py-1.5 rounded-lg"
            style={{
              color: "oklch(0.66 0.04 280)",
              border: "1px solid oklch(0.25 0.05 65 / 0.40)",
            }}
            data-ocid="back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Lobby
          </button>
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-display font-bold heading-cinematic"
              style={{ color: "oklch(0.82 0.03 65)" }}
            >
              {match.gameType === VersusGameType.Chess
                ? "Chess"
                : match.gameType === VersusGameType.DiceRoll
                  ? "Dice Roll"
                  : "Rock Paper Scissors"}
            </span>
          </div>
          {/* My name vs Opponent name */}
          <OpponentCard name={opponentName} avatarUrl={opponentAvatarUrl} />
        </div>

        {/* My identity strip */}
        <div
          className="flex items-center gap-2 px-4 py-2 border-b"
          style={{
            borderColor: "oklch(0.65 0.25 265 / 0.15)",
            background: "oklch(0.12 0.02 290 / 0.4)",
          }}
        >
          <span
            className="profile-avatar-thumbnail shrink-0"
            style={{
              width: 20,
              height: 20,
              fontSize: 9,
              border: "1px solid oklch(0.65 0.25 265 / 0.4)",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            {myAvatarUrl && isFlagAvatar(myAvatarUrl) ? (
              <FlagIcon code={myAvatarUrl} size={30} />
            ) : myAvatarUrl && isEmojiAvatar(myAvatarUrl) ? (
              <span style={{ fontSize: 13, lineHeight: 1 }}>{myAvatarUrl}</span>
            ) : myAvatarUrl ? (
              <img src={myAvatarUrl} alt={myDisplayName} />
            ) : (
              <span style={{ color: "oklch(0.65 0.25 265)" }}>
                {myDisplayName.slice(0, 1).toUpperCase()}
              </span>
            )}
          </span>
          <span
            className="profile-username-display text-xs"
            style={{ color: "oklch(0.75 0.15 265)", fontSize: "0.68rem" }}
          >
            Playing as {myDisplayName}
          </span>
        </div>

        {/* Game area */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          <WagerPanel
            wagerICP={wagerICP}
            pending={isWagerPending}
            matchId={matchId}
            myId={myId}
            player1Id={match.player1.id.toText()}
            pendingWager={match.wager as WagerAmount}
          />

          {match.status !== MatchStatus.Active ? (
            <div className="max-w-sm mx-auto mt-4">
              <MatchStatusCard match={match} onLeave={handleLeave} />
            </div>
          ) : match.gameType === VersusGameType.Chess &&
            match.gameState.__kind__ === "Chess" ? (
            <ChessBoard
              fen={match.gameState.Chess.board}
              myTurn={isMyTurn}
              onMove={(from, to) => makeMove({ matchId, from, to })}
            />
          ) : match.gameType === VersusGameType.DiceRoll ? (
            <DiceGame
              state={match.gameState}
              matchId={matchId}
              canRoll={isMyTurn}
            />
          ) : match.gameType === VersusGameType.RockPaperScissors ? (
            <RPSGame
              state={match.gameState}
              matchId={matchId}
              canPlay={isMyTurn}
            />
          ) : (
            <div className="flex items-center justify-center min-h-48">
              <Skeleton className="h-64 w-full max-w-lg rounded-xl" />
            </div>
          )}

          {match.status === MatchStatus.Completed && (
            <div className="max-w-sm mx-auto w-full">
              <MatchStatusCard match={match} onLeave={handleLeave} />
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Chat (~30%) */}
      <div
        className="w-80 glass-dark flex flex-col border-l"
        style={{ borderColor: "oklch(0.72 0.18 65 / 0.18)" }}
      >
        <LiveChat
          matchId={matchId}
          messages={chatMessages}
          opponentName={opponentName}
          opponentAvatarUrl={opponentAvatarUrl}
        />
        {/* Online players mini list */}
        <div
          className="border-t shrink-0 max-h-64 overflow-y-auto"
          style={{ borderColor: "oklch(0.72 0.18 65 / 0.15)" }}
        >
          <OnlinePlayersList
            players={(onlinePlayers as OnlinePlayer[]).slice(0, 5)}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
