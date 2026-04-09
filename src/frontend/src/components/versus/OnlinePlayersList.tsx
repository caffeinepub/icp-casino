import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import type { OnlinePlayer } from "../../backend";
import { PlayerStatus } from "../../backend";
import { formatICP } from "../../hooks/use-wallet";
import { shortPrincipal } from "../../types/versus";

/** Extended type to carry optional profile fields returned from enriched backend */
type OnlinePlayerWithProfile = OnlinePlayer;

function resolveUsername(player: OnlinePlayerWithProfile): string {
  if (player.username) return player.username;
  return `Player_${player.id.toText().replace(/-/g, "").slice(-6).toUpperCase()}`;
}

function resolveAvatarUrl(player: OnlinePlayerWithProfile): string | null {
  return player.avatarUrl ?? null;
}

interface OnlinePlayersListProps {
  players: OnlinePlayer[];
  isLoading?: boolean;
  onChallenge?: (player: OnlinePlayer) => void;
}

function StatusDot({ status }: { status: PlayerStatus }) {
  if (status === PlayerStatus.Online) {
    return (
      <span
        className="shrink-0 w-2 h-2 rounded-full inline-block"
        style={{
          background: "oklch(0.70 0.25 200)",
          boxShadow: "0 0 6px oklch(0.70 0.25 200 / 0.9)",
          marginRight: "6px",
        }}
        title="Online"
        aria-label="Online"
      />
    );
  }
  if (status === PlayerStatus.Playing) {
    return (
      <span
        className="shrink-0 w-2 h-2 rounded-full inline-block"
        style={{
          background: "oklch(0.65 0.25 265)",
          boxShadow: "0 0 6px oklch(0.65 0.25 265 / 0.8)",
          marginRight: "6px",
        }}
        title="Playing"
        aria-label="Playing"
      />
    );
  }
  return (
    <span
      className="shrink-0 w-2 h-2 rounded-full inline-block"
      style={{
        background: "oklch(0.25 0.03 280)",
        marginRight: "6px",
      }}
      title="Offline"
      aria-label="Offline"
    />
  );
}

/** Mini circular avatar shown in the player card */
function PlayerAvatar({
  username,
  avatarUrl,
}: {
  username: string;
  avatarUrl: string | null;
}) {
  const initial = username.slice(0, 1).toUpperCase();
  const hue = (username.charCodeAt(0) * 137) % 360;
  const glowColor = `oklch(0.65 0.22 ${hue})`;

  return (
    <div
      className="profile-avatar-thumbnail shrink-0"
      style={{
        width: 36,
        height: 36,
        border: `1.5px solid ${glowColor}`,
        boxShadow: `0 0 8px ${glowColor}40`,
        fontSize: 14,
        transition: "box-shadow 0.2s ease",
      }}
      aria-hidden="true"
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={username} />
      ) : (
        <span style={{ color: glowColor }}>{initial}</span>
      )}
    </div>
  );
}

export function OnlinePlayersList({
  players,
  isLoading,
  onChallenge,
}: OnlinePlayersListProps) {
  const typedPlayers = players as OnlinePlayerWithProfile[];
  const onlineCount = typedPlayers.filter(
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
          <Users
            className="w-4 h-4 neon-glow-cyan"
            style={{ color: "oklch(0.70 0.25 200)" }}
          />
          <span
            className="tech-text text-xs font-bold"
            style={{ color: "oklch(0.70 0.25 200)" }}
          >
            ONLINE PLAYERS
          </span>
        </div>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.65 0.25 265 / 0.15)",
            color: "oklch(0.75 0.20 265)",
            border: "1px solid oklch(0.65 0.25 265 / 0.3)",
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

        {!isLoading && typedPlayers.length === 0 && (
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
          typedPlayers.map((player) => {
            const username = resolveUsername(player);
            const avatarUrl = resolveAvatarUrl(player);
            const isAvailable =
              player.status === PlayerStatus.Online && !!onChallenge;

            return (
              <button
                key={player.id.toText()}
                type="button"
                onClick={() => onChallenge?.(player)}
                disabled={
                  player.status === PlayerStatus.Offline || !onChallenge
                }
                className="versus-player-card w-full text-left transition-smooth mb-3 last:mb-0 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary group"
                style={{
                  borderColor: "oklch(0.4 0.1 265 / 0.30)",
                }}
                onMouseEnter={(e) => {
                  if (!isAvailable) return;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.65 0.25 265 / 0.70)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 16px oklch(0.65 0.25 265 / 0.20), 0 0 4px oklch(0.70 0.25 200 / 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.4 0.1 265 / 0.30)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                data-ocid="player-card"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Avatar */}
                  <PlayerAvatar username={username} avatarUrl={avatarUrl} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 mb-0.5">
                      <StatusDot status={player.status} />
                      <span
                        className="profile-username-display text-xs truncate"
                        style={{ color: "oklch(0.92 0 0)" }}
                      >
                        {username}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-mono block truncate"
                      style={{ color: "oklch(0.38 0.04 280)" }}
                    >
                      {shortPrincipal(player.id)}
                    </span>
                    <span className="versus-player-balance block mt-0.5">
                      {formatICP(player.balanceE8s)} ICP
                    </span>
                  </div>
                </div>

                {isAvailable && (
                  <div
                    className="text-xs font-semibold shrink-0 ml-2 mt-0.5 tech-text"
                    style={{
                      color: "oklch(0.70 0.25 200)",
                      fontSize: "0.65rem",
                    }}
                  >
                    CHALLENGE
                  </div>
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
