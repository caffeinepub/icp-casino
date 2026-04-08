import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Wallet } from "lucide-react";
import { useState } from "react";
import type { GameState } from "../backend";
import { MatchStatus, VersusGameType } from "../backend";
import type { WagerAmount } from "../backend";
import { LiveChat } from "../components/versus/LiveChat";
import { MatchStatusCard } from "../components/versus/MatchStatusCard";
import { OnlinePlayersList } from "../components/versus/OnlinePlayersList";
import { WagerSelector } from "../components/versus/WagerSelector";
import { useAuth } from "../hooks/use-auth";
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

function wagerToICP(wager: string): number {
  if (wager === "Ten") return 10;
  if (wager === "Thirty") return 30;
  return 100;
}

// --- Plug Wallet Notice ---
function PlugWalletBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
        style={{
          background: "oklch(0.45 0.15 300 / 0.15)",
          border: "1px solid oklch(0.45 0.15 300 / 0.4)",
          color: "oklch(0.72 0.15 300)",
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
      className="flex items-center gap-3 px-4 py-3 rounded-xl border"
      style={{
        background: "oklch(0.13 0.03 300 / 0.2)",
        borderColor: "oklch(0.72 0.18 65 / 0.5)",
      }}
      data-ocid="plug-wallet-notice"
    >
      <Wallet
        className="w-5 h-5 shrink-0"
        style={{ color: "oklch(0.82 0.18 65)" }}
      />
      <p
        className="text-sm font-semibold"
        style={{ color: "oklch(0.82 0.18 65)" }}
      >
        Please use{" "}
        <span style={{ color: "oklch(0.72 0.15 300)" }}>Plug Wallet</span> to
        connect and play Versus Mode.{" "}
        <span style={{ color: "oklch(0.60 0.03 65)" }}>
          Plug Wallet is required for real ICP betting.
        </span>
      </p>
    </div>
  );
}

// --- Wager Display Panel ---
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
      className={`rounded-2xl border-2 p-5 flex flex-col gap-4${!pending ? " versus-wager-panel-active" : ""}`}
      style={{
        background: "oklch(0.10 0.02 300 / 0.3)",
        borderColor: "oklch(0.72 0.18 65 / 0.65)",
        boxShadow:
          "0 0 28px oklch(0.72 0.18 65 / 0.18), 0 0 8px oklch(0.72 0.18 65 / 0.1)",
      }}
      data-ocid="wager-panel"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.50 0.03 65)" }}
        >
          {pending ? "Proposed Wager" : "Active Wager"}
        </span>
        <PlugWalletBanner compact />
      </div>

      {/* Amounts row */}
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex flex-col items-center">
          <span
            className="font-mono text-3xl font-bold leading-none"
            style={{ color: "oklch(0.88 0.18 65)" }}
          >
            {wagerICP}
          </span>
          <span
            className="text-xs font-semibold mt-1"
            style={{ color: "oklch(0.55 0.03 65)" }}
          >
            ICP each
          </span>
        </div>
        <div
          className="text-xl font-bold"
          style={{ color: "oklch(0.45 0.15 300 / 0.7)" }}
        >
          ×2
        </div>
        <div className="flex flex-col items-center">
          <span
            className="font-mono text-3xl font-bold leading-none"
            style={{ color: "oklch(0.82 0.18 65)" }}
          >
            {potICP}
          </span>
          <span
            className="text-xs font-semibold mt-1"
            style={{ color: "oklch(0.72 0.15 300)" }}
          >
            Total Pot
          </span>
        </div>
      </div>

      {/* Wager selector (shown when wager is still pending) */}
      {pending && (
        <div
          className="space-y-3 border-t pt-4"
          style={{ borderColor: "oklch(0.25 0.05 65 / 0.3)" }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: "oklch(0.72 0.18 65)" }}
          >
            Wager proposed by opponent — confirm amount to start:
          </p>
          <WagerSelector selected={pendingWager} onChange={() => {}} disabled />
          {isPlayer2 && (
            <Button
              onClick={() => acceptWager(matchId)}
              disabled={isAccepting}
              className="w-full font-semibold transition-smooth"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
                color: "oklch(0.07 0 0)",
                border: "none",
              }}
              data-ocid="accept-wager-btn"
            >
              {isAccepting ? "Confirming…" : `Accept ${wagerICP} ICP Wager`}
            </Button>
          )}
          {!isPlayer2 && (
            <p
              className="text-xs text-center"
              style={{ color: "oklch(0.50 0.03 65)" }}
            >
              Waiting for opponent to accept this wager…
            </p>
          )}
        </div>
      )}

      {/* Active indicator */}
      {!pending && (
        <div
          className="flex items-center gap-2 text-xs font-semibold"
          style={{ color: "oklch(0.72 0.18 65)" }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              background: "oklch(0.72 0.18 65)",
              boxShadow: "0 0 6px oklch(0.72 0.18 65 / 0.8)",
            }}
          />
          Wager locked — winner takes {potICP} ICP
        </div>
      )}
    </div>
  );
}

// --- Chess Board ---
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
      className="w-full max-w-lg mx-auto select-none"
      data-ocid="chess-board"
    >
      {/* Files labels */}
      <div className="flex pl-6 mb-1">
        {FILES.map((f) => (
          <div
            key={f}
            className="flex-1 text-center text-xs"
            style={{ color: "oklch(0.50 0.03 65)" }}
          >
            {f}
          </div>
        ))}
      </div>
      <div className="flex">
        {/* Ranks */}
        <div className="flex flex-col justify-around pr-2">
          {RANKS.map((r) => (
            <div
              key={r}
              className="h-12 flex items-center text-xs"
              style={{ color: "oklch(0.50 0.03 65)" }}
            >
              {r}
            </div>
          ))}
        </div>
        {/* Board */}
        <div
          className="grid grid-cols-8 flex-1 rounded-lg overflow-hidden border"
          style={{ borderColor: "oklch(0.25 0.05 65 / 0.4)" }}
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
                      ? "oklch(0.72 0.18 65 / 0.45)"
                      : isLight
                        ? "oklch(0.22 0.03 65 / 0.6)"
                        : "oklch(0.12 0.01 45)",
                    cursor: myTurn ? "pointer" : "default",
                  }}
                  aria-label={`${sq}${piece ? ` ${PIECE_SYMBOLS[piece] ?? piece}` : ""}`}
                >
                  {piece ? (
                    <span
                      style={{
                        color:
                          piece === piece.toUpperCase()
                            ? "oklch(0.82 0.18 65)"
                            : "oklch(0.45 0.15 300)",
                        textShadow:
                          piece === piece.toUpperCase()
                            ? "0 1px 4px oklch(0 0 0 / 0.6)"
                            : "0 1px 4px oklch(0 0 0 / 0.6)",
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
          style={{ color: "oklch(0.55 0.03 65)" }}
        >
          Waiting for opponent's move…
        </p>
      )}
    </div>
  );
}

// --- Dice Roll ---
function DiceGame({
  state,
  matchId,
  canRoll,
}: {
  state: GameState;
  matchId: string;
  canRoll: boolean;
}) {
  const { mutate: roll, isPending } = useMakeDiceRoll();
  const diceState = state.__kind__ === "DiceRoll" ? state.DiceRoll : null;

  return (
    <div
      className="flex flex-col items-center justify-center gap-8 py-8"
      data-ocid="dice-game"
    >
      <div className="flex gap-8">
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl font-mono font-bold border-2"
            style={{
              background: "oklch(0.13 0.01 45)",
              borderColor: "oklch(0.72 0.18 65 / 0.5)",
              color: "oklch(0.82 0.18 65)",
            }}
          >
            {diceState?.player1Roll != null
              ? String(diceState.player1Roll)
              : "?"}
          </div>
          <p className="text-xs mt-2" style={{ color: "oklch(0.50 0.03 65)" }}>
            Player 1
          </p>
        </div>
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl font-mono font-bold border-2"
            style={{
              background: "oklch(0.13 0.01 45)",
              borderColor: "oklch(0.45 0.15 300 / 0.5)",
              color: "oklch(0.72 0.15 300)",
            }}
          >
            {diceState?.player2Roll != null
              ? String(diceState.player2Roll)
              : "?"}
          </div>
          <p className="text-xs mt-2" style={{ color: "oklch(0.50 0.03 65)" }}>
            Player 2
          </p>
        </div>
      </div>
      {canRoll && (
        <Button
          onClick={() => roll(matchId)}
          disabled={isPending}
          className="font-semibold transition-smooth px-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
            color: "oklch(0.07 0 0)",
            border: "none",
          }}
          data-ocid="roll-dice-btn"
        >
          {isPending ? "Rolling…" : "🎲 Roll Dice"}
        </Button>
      )}
    </div>
  );
}

// --- RPS Game ---
const RPS_CHOICES = [
  { value: "Rock", emoji: "✊" },
  { value: "Paper", emoji: "✋" },
  { value: "Scissors", emoji: "✌️" },
];

function RPSGame({
  state,
  matchId,
  canPlay,
}: {
  state: GameState;
  matchId: string;
  canPlay: boolean;
}) {
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
          <div className="text-center">
            <div>
              {RPS_CHOICES.find((c) => c.value === rpsState.player1Choice)
                ?.emoji ?? "🤔"}
            </div>
            <p
              className="text-xs mt-2"
              style={{ color: "oklch(0.50 0.03 65)" }}
            >
              {rpsState.player1Choice ?? "Choosing…"}
            </p>
          </div>
          <div
            className="text-4xl self-center font-bold"
            style={{ color: "oklch(0.72 0.18 65)" }}
          >
            VS
          </div>
          <div className="text-center">
            <div>
              {RPS_CHOICES.find((c) => c.value === rpsState.player2Choice)
                ?.emoji ?? "🤔"}
            </div>
            <p
              className="text-xs mt-2"
              style={{ color: "oklch(0.50 0.03 65)" }}
            >
              {rpsState.player2Choice ?? "Choosing…"}
            </p>
          </div>
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
              className="w-20 h-20 rounded-xl text-4xl flex items-center justify-center border-2 transition-smooth hover:scale-105"
              style={{
                background: "oklch(0.13 0.01 45)",
                borderColor: "oklch(0.72 0.18 65 / 0.4)",
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
        <p className="text-sm" style={{ color: "oklch(0.55 0.03 65)" }}>
          You chose {myChoice}. Waiting for opponent…
        </p>
      )}
    </div>
  );
}

// --- Main Match Screen ---
export default function VersusMatch({ matchId, onBack }: VersusMatchProps) {
  const { principalText, isAuthenticated } = useAuth();
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

  // Unauthenticated state
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
        <p style={{ color: "oklch(0.55 0.03 65)" }}>Match not found.</p>
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

  const opponentName = opponentPlayer
    ? `${opponentPlayer.id.toText().slice(0, 8)}…`
    : "Opponent";

  const wagerICP = wagerToICP(match.wager);
  const isWagerPending = match.status === MatchStatus.WagerPending;

  return (
    <div
      className="flex h-[calc(100vh-4rem)] overflow-hidden"
      data-ocid="versus-match"
    >
      {/* Left: game board (70%) */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ background: "oklch(var(--versus-board-bg))" }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{ borderColor: "oklch(0.25 0.05 65 / 0.4)" }}
        >
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm transition-smooth hover:text-primary"
            style={{ color: "oklch(0.60 0.03 65)" }}
            data-ocid="back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Lobby
          </button>
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-display"
              style={{ color: "oklch(0.78 0.03 65)" }}
            >
              {match.gameType === VersusGameType.Chess
                ? "Chess"
                : match.gameType === VersusGameType.DiceRoll
                  ? "Dice Roll"
                  : "Rock Paper Scissors"}
            </span>
          </div>
          {/* Players */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span style={{ color: "oklch(0.72 0.18 65)" }}>You</span>
            <span style={{ color: "oklch(0.40 0.02 65)" }}>vs</span>
            <span style={{ color: "oklch(0.72 0.15 300)" }}>
              {opponentName}
            </span>
          </div>
        </div>

        {/* Game area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Wager Panel — always visible in game screen */}
          <WagerPanel
            wagerICP={wagerICP}
            pending={isWagerPending}
            matchId={matchId}
            myId={myId}
            player1Id={match.player1.id.toText()}
            pendingWager={match.wager as WagerAmount}
          />

          {/* Match Status / Game Content */}
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

          {/* Completed overlay */}
          {match.status === MatchStatus.Completed && (
            <div className="max-w-sm mx-auto w-full">
              <MatchStatusCard match={match} onLeave={handleLeave} />
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Chat (30%) */}
      <div
        className="w-80 flex flex-col border-l"
        style={{ borderColor: "oklch(0.25 0.05 65 / 0.4)" }}
      >
        <LiveChat
          matchId={matchId}
          messages={chatMessages}
          opponentName={opponentName}
        />
        {/* Online players mini list */}
        <div
          className="border-t shrink-0 max-h-64 overflow-y-auto"
          style={{ borderColor: "oklch(0.25 0.05 65 / 0.4)" }}
        >
          <OnlinePlayersList
            players={onlinePlayers.slice(0, 5)}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
