import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import { GameCategory } from "../backend";
import type { Game } from "../backend";
import { getGameImage, isPicsumUrl } from "../utils/gameImages";

export const CATEGORY_BADGE: Record<GameCategory, string> = {
  [GameCategory.Slots]: "badge-cyan",
  [GameCategory.TableGames]: "badge-magenta",
  [GameCategory.CardGames]: "badge-lime",
};

export const CATEGORY_LABEL: Record<GameCategory, string> = {
  [GameCategory.Slots]: "Slots",
  [GameCategory.TableGames]: "Table",
  [GameCategory.CardGames]: "Cards",
};

interface GameCardProps {
  game: Game;
  onPlay?: (game: Game) => void;
}

function GameImage({ game, className }: { game: Game; className?: string }) {
  const svgImage = getGameImage(Number(game.id));
  const useSvg = svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
  const src = useSvg ? svgImage : game.imageUrl;

  if (src) {
    return (
      <img src={src} alt={game.name} className={className} loading="lazy" />
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
      <Play className="w-8 h-8 text-muted-foreground" />
    </div>
  );
}

export function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <div
      className="rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 shadow-card shadow-hover cursor-pointer transition-smooth group"
      data-ocid="game-card"
    >
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onPlay?.(game)}
        aria-label={`Play ${game.name}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-muted block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <GameImage
          game={game}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className={CATEGORY_BADGE[game.category]}>
            {CATEGORY_LABEL[game.category]}
          </span>
        </div>
        {/* Player count overlay */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-background/70 backdrop-blur-sm rounded-full px-2 py-0.5">
          <Users className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">
            {Number(game.playerCount).toLocaleString()}
          </span>
        </div>
      </button>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground truncate mb-0.5 min-w-0">
          {game.name}
        </h3>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-muted-foreground">
            {Number(game.playerCount).toLocaleString()} playing
          </span>
          <span className="text-xs font-semibold text-primary">
            {(game.rtp * 100).toFixed(1)}% RTP
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full text-xs gap-1.5 hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-smooth"
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
