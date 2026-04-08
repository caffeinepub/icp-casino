import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Trophy, XCircle } from "lucide-react";
import type { Match, WagerAmount } from "../../backend";
import { MatchStatus } from "../../backend";
import { useAuth } from "../../hooks/use-auth";
import { useAcceptWager } from "../../hooks/use-versus";
import { wagerToICP } from "../../types/versus";

interface MatchStatusCardProps {
  match: Match;
  onLeave?: () => void;
}

function WagerLabel({ wager }: { wager: WagerAmount }) {
  return (
    <span
      className="font-mono font-bold"
      style={{ color: "oklch(0.82 0.18 65)" }}
    >
      {wagerToICP(wager)} ICP
    </span>
  );
}

export function MatchStatusCard({ match, onLeave }: MatchStatusCardProps) {
  const { principalText } = useAuth();
  const { mutate: acceptWager, isPending: isAccepting } = useAcceptWager();

  const myId = principalText;
  const myPlayer =
    match.player1.id.toText() === myId
      ? match.player1
      : match.player2?.id.toText() === myId
        ? match.player2
        : null;

  const isWinner = match.winnerId?.toText() === myId;
  const isLoser =
    match.status === MatchStatus.Completed &&
    match.winnerId !== undefined &&
    match.winnerId.toText() !== myId;

  if (match.status === MatchStatus.Completed) {
    return (
      <div className="space-y-4" data-ocid="match-result">
        {isWinner ? (
          <div
            className="versus-winner-card text-center"
            data-ocid="winner-card"
          >
            <Trophy
              className="w-10 h-10 mx-auto mb-3"
              style={{ color: "oklch(0.72 0.18 65)" }}
            />
            <p
              className="font-display text-3xl font-bold"
              style={{ color: "oklch(0.82 0.18 65)" }}
            >
              Winner!
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: "oklch(0.60 0.05 65)" }}
            >
              You won <WagerLabel wager={match.wager} /> × 2
            </p>
          </div>
        ) : isLoser ? (
          <div className="versus-loser-card text-center" data-ocid="loser-card">
            <XCircle
              className="w-10 h-10 mx-auto mb-3"
              style={{ color: "oklch(0.55 0.12 300)" }}
            />
            <p
              className="font-display text-3xl font-bold"
              style={{ color: "oklch(0.55 0.12 300)" }}
            >
              Defeated
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: "oklch(0.45 0.05 300)" }}
            >
              Better luck next time
            </p>
          </div>
        ) : (
          <div
            className="rounded-lg p-6 border text-center"
            style={{
              background: "oklch(0.13 0.01 45)",
              borderColor: "oklch(0.25 0.05 65 / 0.4)",
            }}
          >
            <p className="font-display text-xl font-semibold text-foreground">
              Match Ended
            </p>
          </div>
        )}
        {onLeave && (
          <Button
            onClick={onLeave}
            variant="outline"
            className="w-full transition-smooth"
            style={{
              borderColor: "oklch(0.72 0.18 65 / 0.5)",
              color: "oklch(0.82 0.18 65)",
            }}
            data-ocid="leave-match-btn"
          >
            Back to Lobby
          </Button>
        )}
      </div>
    );
  }

  if (match.status === MatchStatus.WaitingForOpponent) {
    return (
      <div className="space-y-4" data-ocid="waiting-state">
        <div
          className="rounded-lg p-6 border text-center space-y-4"
          style={{
            background: "oklch(0.11 0.01 45)",
            borderColor: "oklch(0.25 0.05 65 / 0.35)",
          }}
        >
          <div className="versus-spinner mx-auto" />
          <p
            className="font-display text-lg font-semibold"
            style={{ color: "oklch(0.78 0.03 65)" }}
          >
            Searching for Opponent…
          </p>
          <p className="text-sm" style={{ color: "oklch(0.50 0.03 65)" }}>
            Wager: <WagerLabel wager={match.wager} />
          </p>
        </div>
        {onLeave && (
          <Button
            onClick={onLeave}
            variant="outline"
            className="w-full transition-smooth"
            style={{
              borderColor: "oklch(0.25 0.05 65 / 0.5)",
              color: "oklch(0.60 0.03 65)",
            }}
            data-ocid="cancel-match-btn"
          >
            Cancel
          </Button>
        )}
      </div>
    );
  }

  if (match.status === MatchStatus.WagerPending) {
    const hasAccepted = myPlayer?.wagerAccepted ?? false;
    return (
      <div className="space-y-4" data-ocid="wager-pending-state">
        <div
          className="rounded-lg p-5 border space-y-3"
          style={{
            background: "oklch(0.11 0.01 45)",
            borderColor: "oklch(0.72 0.18 65 / 0.3)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.18 65)" }}
            />
            <span
              className="text-sm font-display font-semibold uppercase tracking-wide"
              style={{ color: "oklch(0.72 0.18 65)" }}
            >
              Wager Agreement
            </span>
          </div>
          <p className="text-sm" style={{ color: "oklch(0.68 0.03 65)" }}>
            Both players must agree to wager <WagerLabel wager={match.wager} />{" "}
            each. Winner takes{" "}
            <span
              className="font-mono font-bold"
              style={{ color: "oklch(0.82 0.18 65)" }}
            >
              {wagerToICP(match.wager) * 2} ICP
            </span>
            .
          </p>
          <div
            className="flex items-center gap-3 text-xs"
            style={{ color: "oklch(0.55 0.03 65)" }}
          >
            <span className="flex items-center gap-1">
              <CheckCircle
                className="w-3.5 h-3.5"
                style={{
                  color: match.player1.wagerAccepted
                    ? "oklch(0.72 0.18 65)"
                    : "oklch(0.30 0.02 65)",
                }}
              />
              Player 1
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle
                className="w-3.5 h-3.5"
                style={{
                  color: match.player2?.wagerAccepted
                    ? "oklch(0.72 0.18 65)"
                    : "oklch(0.30 0.02 65)",
                }}
              />
              Player 2
            </span>
          </div>
        </div>
        {!hasAccepted && (
          <Button
            onClick={() => acceptWager(match.id)}
            disabled={isAccepting}
            className="w-full font-semibold transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
              color: "oklch(0.97 0 0)",
              border: "none",
            }}
            data-ocid="accept-wager-btn"
          >
            {isAccepting
              ? "Accepting…"
              : `Accept — ${wagerToICP(match.wager)} ICP`}
          </Button>
        )}
        {hasAccepted && (
          <p
            className="text-sm text-center"
            style={{ color: "oklch(0.55 0.03 65)" }}
          >
            Waiting for opponent to accept…
          </p>
        )}
      </div>
    );
  }

  // Active
  return (
    <div
      className="rounded-lg px-5 py-4 border flex items-center gap-3"
      style={{
        background: "oklch(0.11 0.01 45)",
        borderColor: "oklch(0.72 0.18 65 / 0.35)",
      }}
      data-ocid="active-match-state"
    >
      <div
        className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
        style={{ background: "oklch(0.72 0.18 65)" }}
      />
      <div>
        <p
          className="text-sm font-semibold"
          style={{ color: "oklch(0.82 0.18 65)" }}
        >
          Match Active
        </p>
        <p className="text-xs" style={{ color: "oklch(0.50 0.03 65)" }}>
          Pot: <WagerLabel wager={match.wager} /> × 2
        </p>
      </div>
    </div>
  );
}
