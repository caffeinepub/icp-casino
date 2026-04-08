import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Game } from "../backend";
import { getGameImage, isPicsumUrl } from "../utils/gameImages";
import { CATEGORY_BADGE, CATEGORY_LABEL } from "./GameCard";
import { SkeletonCard } from "./SkeletonCard";

const AUTO_ADVANCE_MS = 5000;

interface FeaturedCarouselProps {
  games: Game[];
  isLoading: boolean;
  onPlay?: (game: Game) => void;
}

export function FeaturedCarousel({
  games,
  isLoading,
  onPlay,
}: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = games.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % count),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(timer);
  }, [count, paused]);

  // Reset index when games list length changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset only on length change
  useEffect(() => {
    setCurrent(0);
  }, [count]);

  if (isLoading) return <SkeletonCard variant="carousel" />;
  if (!count) return null;

  const game = games[current];
  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);

  const svgImage = getGameImage(Number(game.id));
  const useSvg = svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
  const imageSrc = useSvg ? svgImage : game.imageUrl;

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-card border border-border group select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-ocid="featured-carousel"
    >
      {/* Slide image */}
      <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
        {imageSrc ? (
          <img
            key={game.id.toString()}
            src={imageSrc}
            alt={game.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <span className={`${CATEGORY_BADGE[game.category]} mb-2 w-fit`}>
          {CATEGORY_LABEL[game.category]}
        </span>
        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-tight max-w-lg">
          {game.name}
        </h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {Number(game.playerCount).toLocaleString()} playing
          </span>
          <span className="flex items-center gap-1.5 text-primary font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            {(game.rtp * 100).toFixed(1)}% RTP
          </span>
        </div>
        <Button
          size="lg"
          className="w-fit gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-smooth"
          onClick={() => onPlay?.(game)}
          data-ocid="carousel-play-btn"
        >
          <Play className="w-4 h-4 fill-current" />
          Play Now
        </Button>
      </div>

      {/* Navigation arrows */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous game"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-card transition-smooth focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next game"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-card transition-smooth focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide indicator dots */}
          <div className="absolute bottom-4 right-6 flex items-center gap-1.5">
            {games.map((g, i) => (
              <button
                key={g.id.toString()}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                  i === current
                    ? "bg-primary w-5"
                    : "bg-foreground/30 w-2 hover:bg-foreground/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
