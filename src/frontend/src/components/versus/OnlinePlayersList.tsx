import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import type { OnlinePlayer } from "../../backend";
import { PlayerStatus } from "../../backend";
import { formatICP } from "../../hooks/use-wallet";
import { shortPrincipal } from "../../types/versus";

interface OnlinePlayersListProps {
  players: OnlinePlayer[];
  isLoading?: boolean;
  onChallenge?: (player: OnlinePlayer) => void;
}

function StatusDot({ status }: { status: PlayerStatus }) {
  if (status === PlayerStatus.Online) {
    return (
      <span
        className="versus-player-status-online shrink-0"
        title="Online"
        aria-label="Online"
      />
    );
  }
  if (status === PlayerStatus.Playing) {
    return (
      <span
        className="shrink-0 w-2 h-2 rounded-full inline-block mr-2"
        style={{ background: "oklch(0.45 0.15 300)" }}
        title="Playing"
        aria-label="Playing"
      />
    );
  }
  return (
    <span
      className="versus-player-status-offline shrink-0"
      title="Offline"
      aria-label="Offline"
    />
  );
}

export function OnlinePlayersList({
  players,
  isLoading,
  onChallenge,
}: OnlinePlayersListProps) {
  const onlineCount = players.filter(
    (p) => p.status !== PlayerStatus.Offline,
  ).length;

  return (
    <div className="flex flex-col h-full" data-ocid="online-players-panel">
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex items-center justify-between shrink-0"
        style={{ borderColor: "oklch(0.25 0.05 65 / 0.5)" }}
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" style={{ color: "oklch(0.72 0.18 65)" }} />
          <span
            className="text-sm font-display font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.72 0.18 65)" }}
          >
            Online Players
          </span>
        </div>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.72 0.18 65 / 0.15)",
            color: "oklch(0.82 0.14 65)",
          }}
          data-ocid="online-count"
        >
          {onlineCount} online
        </span>
      </div>

      {/* Player List */}
      <div className="versus-players-panel flex-1 overflow-y-auto">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        )}

        {!isLoading && players.length === 0 && (
          <div
            className="text-center py-12 space-y-2"
            data-ocid="no-players-state"
          >
            <Users
              className="w-8 h-8 mx-auto"
              style={{ color: "oklch(0.35 0.05 65)" }}
            />
            <p className="text-sm" style={{ color: "oklch(0.45 0.03 65)" }}>
              No players online
            </p>
          </div>
        )}

        {!isLoading &&
          players.map((player) => (
            <button
              key={player.id.toText()}
              type="button"
              onClick={() => onChallenge?.(player)}
              disabled={player.status === PlayerStatus.Offline || !onChallenge}
              className="versus-player-card w-full text-left transition-smooth mb-3 last:mb-0 disabled:opacity-50 hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary"
              data-ocid="player-card"
            >
              <div className="flex items-start gap-2 min-w-0">
                {/* Avatar placeholder */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.18 65 / 0.25), oklch(0.45 0.15 300 / 0.25))",
                    color: "oklch(0.82 0.14 65)",
                    border: "1px solid oklch(0.72 0.18 65 / 0.3)",
                  }}
                >
                  {player.id.toText().slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <StatusDot status={player.status} />
                    <span
                      className="text-xs font-mono truncate"
                      style={{ color: "oklch(0.70 0 0)" }}
                    >
                      {shortPrincipal(player.id)}
                    </span>
                  </div>
                  <span className="versus-player-balance block">
                    {formatICP(player.balanceE8s)} ICP
                  </span>
                </div>
              </div>
              {player.status === PlayerStatus.Online && onChallenge && (
                <div
                  className="text-xs font-semibold shrink-0 ml-2 mt-0.5"
                  style={{ color: "oklch(0.72 0.18 65)" }}
                >
                  Challenge
                </div>
              )}
            </button>
          ))}
      </div>
    </div>
  );
}
