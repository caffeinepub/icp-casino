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
import { SkeletonCard } from "../components/SkeletonCard";
import { SlotMachineSection } from "../components/SlotMachineSection";
import type { CategoryFilter as CategoryFilterType } from "../types/casino";

interface LobbyPageProps {
  onPlay: (gameId: bigint) => void;
  onTransactions?: () => void;
}

export default function LobbyPage({ onPlay }: LobbyPageProps) {
  const { actor, isFetching } = useActor(createActor);
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterType>("All");
  const [search, setSearch] = useState("");

  // Featured games
  const { data: featuredGames = [], isLoading: featuredLoading } = useQuery<
    Game[]
  >({
    queryKey: ["featured-games"],
    queryFn: async () => (actor ? actor.listFeaturedGames() : []),
    enabled: !!actor && !isFetching,
  });

  // All games (category filtered via API)
  const { data: allGames = [], isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ["games", categoryFilter],
    queryFn: async () => {
      if (!actor) return [];
      if (categoryFilter === "All") return actor.listGames();
      return actor.listGamesByCategory(categoryFilter as GameCategory);
    },
    enabled: !!actor && !isFetching,
  });

  // Client-side search filter
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
      className="container mx-auto px-4 py-8 space-y-12"
      data-ocid="lobby-page"
    >
      {/* Featured Carousel */}
      <section aria-label="Featured games">
        <FeaturedCarousel
          games={featuredGames}
          isLoading={isCarouselLoading}
          onPlay={handlePlay}
        />
      </section>

      {/* Game Grid */}
      <section id="games" aria-label="Game lobby">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
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
        <div className="relative mb-6 max-w-sm" data-ocid="game-search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search games…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border focus-visible:ring-ring"
            aria-label="Search games by name"
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }, (_, i) => `skel-${i}`).map((key) => (
              <SkeletonCard key={key} variant="game" />
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 bg-card border border-border rounded-xl"
            data-ocid="games-empty-state"
          >
            <Dices className="w-14 h-14 text-muted-foreground mb-4 opacity-60" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
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
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
              data-ocid="clear-filters-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Result count */}
            {search && (
              <p className="text-xs text-muted-foreground mb-4">
                {filteredGames.length}{" "}
                {filteredGames.length === 1 ? "game" : "games"} found
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id.toString()}
                  game={game}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Slot Machines */}
      <SlotMachineSection />
    </div>
  );
}
