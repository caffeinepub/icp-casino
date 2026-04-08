import { Input } from "@/components/ui/input";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Dices, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { type GameCategory, createActor } from "../backend";
import type { Game } from "../backend";
import { CategoryFilter } from "../components/CategoryFilter";
import { FeaturedCarousel } from "../components/FeaturedCarousel";
import { GameCard } from "../components/GameCard";
import { MidnightDragons } from "../components/MidnightDragons";
import { SkeletonCard } from "../components/SkeletonCard";
import type { CategoryFilter as CategoryFilterType } from "../types/casino";

interface LobbyPageProps {
  onPlay: (gameId: bigint) => void;
  onTransactions?: () => void;
  onVersusMode?: () => void;
}

export default function LobbyPage({ onPlay, onVersusMode }: LobbyPageProps) {
  const { actor, isFetching } = useActor(createActor);
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterType>("All");
  const [search, setSearch] = useState("");

  const { data: featuredGames = [], isLoading: featuredLoading } = useQuery<
    Game[]
  >({
    queryKey: ["featured-games"],
    queryFn: async () => (actor ? actor.listFeaturedGames() : []),
    enabled: !!actor && !isFetching,
  });

  const { data: allGames = [], isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ["games", categoryFilter],
    queryFn: async () => {
      if (!actor) return [];
      if (categoryFilter === "All") return actor.listGames();
      return actor.listGamesByCategory(categoryFilter as GameCategory);
    },
    enabled: !!actor && !isFetching,
  });

  const filteredGames = useMemo(() => {
    if (!search.trim()) return allGames;
    const q = search.toLowerCase();
    return allGames.filter((g) => g.name.toLowerCase().includes(q));
  }, [allGames, search]);

  const isLoading = gamesLoading || isFetching;
  const isCarouselLoading = featuredLoading || isFetching;

  function handleCategoryChange(value: CategoryFilterType) {
    setCategoryFilter(value);
    setSearch("");
  }

  function clearFilters() {
    setCategoryFilter("All");
    setSearch("");
  }

  function handlePlay(game: Game) {
    onPlay(game.id);
  }

  return (
    <div
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, oklch(0.13 0.03 300 / 0.55) 0%, oklch(0.07 0 0) 60%)",
      }}
      data-ocid="lobby-page"
    >
      {/* Subtle vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, oklch(0 0 0 / 0.55) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 py-10 space-y-16">
        {/* Featured Carousel */}
        <section aria-label="Featured games">
          <FeaturedCarousel
            games={featuredGames}
            isLoading={isCarouselLoading}
            onPlay={handlePlay}
          />
        </section>

        {/* Gold divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.18 65 / 0.35) 30%, oklch(0.82 0.18 65 / 0.55) 50%, oklch(0.72 0.18 65 / 0.35) 70%, transparent)",
          }}
          aria-hidden="true"
        />

        {/* Game Grid */}
        <section id="games" aria-label="Game lobby">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="heading-cinematic font-display text-3xl font-bold text-foreground">
              Game Lobby
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <CategoryFilter
                active={categoryFilter}
                onChange={handleCategoryChange}
              />
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-sm" data-ocid="game-search">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "oklch(0.72 0.18 65 / 0.65)" }}
            />
            <Input
              type="search"
              placeholder="Search games…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 glass-dark transition-smooth focus-visible:ring-1"
              style={{
                borderColor: "oklch(0.4 0.15 300 / 0.30)",
                color: "oklch(0.94 0 0)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "oklch(0.72 0.18 65 / 0.70)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px oklch(0.72 0.18 65 / 0.25)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  "oklch(0.4 0.15 300 / 0.30)";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label="Search games by name"
            />
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {Array.from({ length: 10 }, (_, i) => `skel-${i}`).map((key) => (
                <SkeletonCard key={key} variant="game" />
              ))}
            </div>
          ) : filteredGames.length === 0 ? (
            <div
              className="glass-card flex flex-col items-center justify-center py-24 rounded-2xl"
              data-ocid="games-empty-state"
            >
              <Dices
                className="w-14 h-14 mb-4 opacity-50"
                style={{ color: "oklch(0.72 0.18 65)" }}
              />
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: "oklch(0.97 0 0)" }}
              >
                {search ? "No games match your search" : "No games available"}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 text-center max-w-xs">
                {search
                  ? `We couldn't find any games matching "${search}". Try a different term or clear your filters.`
                  : "No games are available in this category yet. Check back soon!"}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm font-medium transition-smooth btn-premium px-4 py-2 rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.22 265 / 0.18), oklch(0.45 0.22 265 / 0.10))",
                  color: "oklch(0.80 0.18 280)",
                  border: "1px solid oklch(0.55 0.22 265 / 0.35)",
                }}
                data-ocid="clear-filters-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {search && (
                <p className="text-xs text-muted-foreground mb-4">
                  {filteredGames.length}{" "}
                  {filteredGames.length === 1 ? "game" : "games"} found
                </p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 game-grid">
                {filteredGames.map((game, index) => (
                  <GameCard
                    key={game.id.toString()}
                    game={game}
                    onPlay={handlePlay}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Gold divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.18 65 / 0.35) 30%, oklch(0.82 0.18 65 / 0.55) 50%, oklch(0.72 0.18 65 / 0.35) 70%, transparent)",
          }}
          aria-hidden="true"
        />

        {/* Versus Mode Banner */}
        {onVersusMode && (
          <section id="versus-mode" aria-label="Versus Mode">
            <button
              type="button"
              onClick={onVersusMode}
              className="w-full glass-card card-shimmer rounded-2xl p-8 text-left transition-smooth hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.13 0.03 300 / 0.55), oklch(0.10 0.02 300 / 0.35))",
                borderColor: "oklch(0.45 0.15 300 / 0.55)",
                boxShadow:
                  "0 0 48px oklch(0.45 0.15 300 / 0.20), var(--shadow-lg)",
              }}
              data-ocid="versus-mode-banner"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {/* Gold cross-swords SVG */}
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 21l7-7M14 4l6 6-9 9-6-6 9-9zM21 3l-7 7"
                        stroke="oklch(0.82 0.18 65)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="5"
                        cy="19"
                        r="1.5"
                        fill="oklch(0.72 0.18 65)"
                      />
                      <circle
                        cx="19"
                        cy="5"
                        r="1.5"
                        fill="oklch(0.72 0.18 65)"
                      />
                    </svg>
                    <h2
                      className="heading-cinematic font-display text-2xl font-bold text-gold-glow"
                      style={{ color: "oklch(0.85 0.16 65)" }}
                    >
                      Versus Mode
                    </h2>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: "oklch(0.45 0.15 300 / 0.25)",
                        color: "oklch(0.78 0.15 300)",
                        border: "1px solid oklch(0.45 0.15 300 / 0.45)",
                      }}
                    >
                      PvP
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.03 280)" }}
                  >
                    Challenge real players in Chess, Dice Roll, and Rock Paper
                    Scissors. Wager 10, 30, or 100 ICP — winner takes all.
                  </p>
                </div>
                <div
                  className="shrink-0 ml-4 px-6 py-3 rounded-xl font-semibold text-sm btn-premium"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                    color: "oklch(0.97 0 0)",
                    boxShadow: "0 4px 16px oklch(0.55 0.22 265 / 0.35)",
                  }}
                >
                  Play Now →
                </div>
              </div>
            </button>
          </section>
        )}

        {/* Gold divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.18 65 / 0.35) 30%, oklch(0.82 0.18 65 / 0.55) 50%, oklch(0.72 0.18 65 / 0.35) 70%, transparent)",
          }}
          aria-hidden="true"
        />

        {/* Midnight Dragons — 8×8 Slot Machine */}
        <section
          id="midnight-dragons"
          aria-label="Midnight Dragons slot machine"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="heading-cinematic font-display text-2xl font-bold text-foreground">
              Midnight Dragons
            </h2>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{
                background: "oklch(0.72 0.18 65 / 0.15)",
                color: "oklch(0.82 0.14 65)",
                border: "1px solid oklch(0.72 0.18 65 / 0.35)",
              }}
            >
              8×8 Slots
            </span>
          </div>
          <MidnightDragons />
        </section>
      </div>
    </div>
  );
}
