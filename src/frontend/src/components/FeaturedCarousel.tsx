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
      className="relative rounded-xl overflow-hidden bg-card border border-border group select-none transition-all duration-500 futuristic-panel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-ocid="featured-carousel"
    >
      {/* Slide image — needs z-10 to sit above futuristic-panel pseudo-elements */}
      <div
        className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {imageSrc ? (
          <img
            key={game.id.toString()}
            src={imageSrc}
            alt={game.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted" />
        )}

        {/* Cinematic vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, oklch(0.07 0 0 / 0.65) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom dark-purple gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.07 0.01 300 / 0.92) 0%, oklch(0.07 0.01 300 / 0.5) 50%, transparent 100%)",
          }}
        />
        {/* Top-edge subtle gold accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.72 0.18 65 / 0.06) 0%, transparent 20%, oklch(0.07 0 0 / 0.5) 100%)",
          }}
        />
      </div>

      {/* Content overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 md:p-10"
        style={{ zIndex: 3 }}
      >
        <span
          className={`${CATEGORY_BADGE[game.category]} mb-2 w-fit backdrop-blur-sm`}
          style={{ border: "1px solid oklch(0.72 0.18 65 / 0.35)" }}
        >
          {CATEGORY_LABEL[game.category]}
        </span>
        <h2 className="heading-cinematic glitch-text tech-text text-2xl md:text-4xl lg:text-5xl mb-2 leading-tight max-w-lg">
          {game.name}
        </h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
          <span className="flex items-center gap-1.5 font-mono">
            <Users className="w-3.5 h-3.5" />
            {Number(game.playerCount).toLocaleString()} playing
          </span>
          <span className="flex items-center gap-1.5 text-primary font-semibold font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            {(game.rtp * 100).toFixed(1)}% RTP
          </span>
        </div>
        <Button
          size="lg"
          className="btn-premium w-fit gap-2 cyber-border"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
            color: "oklch(0.97 0 0)",
            boxShadow: "0 4px 16px oklch(0.55 0.22 265 / 0.40)",
          }}
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
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark plasma-button flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              border: "1px solid oklch(0.65 0.25 265 / 0.45)",
              zIndex: 4,
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next game"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-dark plasma-button flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              border: "1px solid oklch(0.65 0.25 265 / 0.45)",
              zIndex: 4,
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide indicator dots */}
          <div
            className="absolute bottom-4 right-6 flex items-center gap-1.5"
            style={{ zIndex: 4 }}
          >
            {games.map((g, i) => (
              <button
                key={g.id.toString()}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                  i === current
                    ? "w-5 neon-glow"
                    : "w-2 hover:opacity-80 neon-glow-cyan"
                }`}
                style={{
                  background:
                    i === current
                      ? "oklch(0.72 0.18 65)"
                      : "oklch(0.4 0.05 300 / 0.5)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
