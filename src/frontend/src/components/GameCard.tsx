import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import type React from "react";
import { GameCategory } from "../backend";
import type { Game } from "../backend";
import { getGameImage, isPicsumUrl } from "../utils/gameImages";

export const CATEGORY_BADGE: Record<GameCategory, string> = {
  [GameCategory.Slots]: "badge-cyan",
  [GameCategory.TableGames]: "badge-magenta",
  [GameCategory.CardGames]: "badge-lime",
};

export const CATEGORY_BADGE_GLOW: Record<GameCategory, string> = {
  [GameCategory.Slots]: "neon-glow-cyan",
  [GameCategory.TableGames]: "neon-glow",
  [GameCategory.CardGames]: "neon-glow",
};

export const CATEGORY_LABEL: Record<GameCategory, string> = {
  [GameCategory.Slots]: "Slots",
  [GameCategory.TableGames]: "Table",
  [GameCategory.CardGames]: "Cards",
};

interface GameCardProps {
  game: Game;
  onPlay?: (game: Game) => void;
  index?: number;
}

function GameImage({
  game,
  className,
  style,
}: { game: Game; className?: string; style?: React.CSSProperties }) {
  const svgImage = getGameImage(Number(game.id));
  const useSvg = svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
  const src = useSvg ? svgImage : game.imageUrl;

  if (src) {
    return (
      <img
        src={src}
        alt={game.name}
        className={className}
        style={style}
        loading="lazy"
      />
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
      <Play className="w-8 h-8 text-muted-foreground" />
    </div>
  );
}

export function GameCard({ game, onPlay, index }: GameCardProps) {
  return (
    <div
      className="glass-card card-shimmer holographic-card holo-shimmer cyber-border game-grid-item rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-plasma-ring group relative"
      style={{
        animationDelay: `${(index ?? 0) * 50}ms`,
        transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
      }}
      data-ocid="game-card"
    >
      {/* Cinematic top-light highlight */}
      <div className="cinematic-top-light" aria-hidden="true" />

      {/* Futuristic "PLAY NOW //" overlay — revealed on group-hover */}
      <div
        className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="tech-text text-[10px] px-2 py-0.5 rounded-sm"
          style={{
            background: "oklch(0.65 0.25 265 / 0.18)",
            border: "1px solid oklch(0.65 0.25 265 / 0.55)",
            color: "oklch(0.82 0.22 265)",
            boxShadow: "0 0 8px oklch(0.65 0.25 265 / 0.35)",
          }}
        >
          PLAY NOW {"//"}
        </span>
      </div>

      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onPlay?.(game)}
        aria-label={`Play ${game.name}`}
        className="scanline-overlay relative aspect-[4/3] w-full overflow-hidden bg-muted block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Image wrapper: z-0 so scanline ::after sits above it */}
        <div className="relative w-full h-full z-0">
          <GameImage
            game={game}
            className="w-full h-full object-cover group-hover:scale-110"
            style={{ transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2 z-10">
          <span
            className={`${CATEGORY_BADGE[game.category]} ${CATEGORY_BADGE_GLOW[game.category]} backdrop-blur-sm`}
            style={{ border: "1px solid oklch(0.72 0.18 65 / 0.35)" }}
          >
            {CATEGORY_LABEL[game.category]}
          </span>
        </div>

        {/* Player count overlay — futuristic mono */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5 border border-border">
          <Users className="w-3 h-3 text-muted-foreground" />
          <span
            className="tech-text text-xs text-muted-foreground"
            style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}
          >
            {Number(game.playerCount).toLocaleString()}
          </span>
        </div>
      </button>

      {/* Info */}
      <div className="p-3 relative z-10">
        <h3 className="heading-cinematic tech-text text-sm truncate mb-0.5 min-w-0">
          {game.name}
        </h3>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-muted-foreground font-mono">
            {Number(game.playerCount).toLocaleString()} playing
          </span>
          <span className="text-xs font-semibold font-mono text-primary">
            {(game.rtp * 100).toFixed(1)}% RTP
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="btn-premium w-full text-xs gap-1.5"
          style={{
            borderColor: "oklch(0.55 0.22 265 / 0.45)",
            color: "oklch(0.70 0.22 265)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.55 0.22 265 / 0.15)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "oklch(0.55 0.22 265 / 0.80)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 8px oklch(0.65 0.25 265 / 0.8), 0 0 20px oklch(0.65 0.25 265 / 0.4), 0 0 40px oklch(0.65 0.25 265 / 0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "oklch(0.55 0.22 265 / 0.45)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
          }}
          data-ocid="play-btn"
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.(game);
          }}
        >
          <Play className="w-3 h-3 fill-current" />
          Play Now
        </Button>
      </div>
    </div>
  );
}
