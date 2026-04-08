import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { createActor } from "../backend";
import { GameCategory, TransactionType } from "../backend";
import type { Game, Transaction } from "../backend";
import { SkeletonCard } from "../components/SkeletonCard";
import type { CategoryFilter } from "../types/casino";

const CATEGORY_FILTERS: { label: string; value: CategoryFilter }[] = [
  { label: "All Games", value: "All" },
  { label: "Slots", value: GameCategory.Slots },
  { label: "Table Games", value: GameCategory.TableGames },
  { label: "Card Games", value: GameCategory.CardGames },
];

const CATEGORY_BADGE: Record<GameCategory, string> = {
  [GameCategory.Slots]: "badge-cyan",
  [GameCategory.TableGames]: "badge-magenta",
  [GameCategory.CardGames]: "badge-lime",
};

const CATEGORY_LABEL: Record<GameCategory, string> = {
  [GameCategory.Slots]: "Slots",
  [GameCategory.TableGames]: "Table",
  [GameCategory.CardGames]: "Cards",
};

const TRANSACTION_TYPE_LABEL: Record<TransactionType, string> = {
  [TransactionType.Bet]: "Bet",
  [TransactionType.Deposit]: "Deposit",
  [TransactionType.Winning]: "Winning",
};

function formatICP(e8s: bigint): string {
  const icp = Number(e8s) / 100_000_000;
  return icp.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Carousel with featured games
function FeaturedCarousel({
  games,
  isLoading,
}: { games: Game[]; isLoading: boolean }) {
  const [current, setCurrent] = useState(0);

  if (isLoading) return <SkeletonCard variant="carousel" />;
  if (!games.length) return null;

  const game = games[current];
  const prev = () => setCurrent((c) => (c - 1 + games.length) % games.length);
  const next = () => setCurrent((c) => (c + 1) % games.length);

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-card border border-border group"
      data-ocid="featured-carousel"
    >
      {/* Background image */}
      <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={game.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <span className={CATEGORY_BADGE[game.category]}>
          {CATEGORY_LABEL[game.category]}
        </span>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-2 mb-1">
          {game.name}
        </h2>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />{" "}
            {Number(game.playerCount).toLocaleString()} playing
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {(game.rtp * 100).toFixed(1)}
            % RTP
          </span>
        </div>
        <Button
          size="lg"
          className="w-fit gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          data-ocid="carousel-play-btn"
        >
          <Play className="w-4 h-4 fill-current" /> Play Now
        </Button>
      </div>

      {/* Nav arrows */}
      {games.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous game"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-card transition-smooth"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next game"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-card transition-smooth"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 right-6 flex items-center gap-1.5">
            {games.map((_, i) => (
              <button
                key={games[i].id.toString()}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-smooth ${i === current ? "bg-primary w-5" : "bg-foreground/30 hover:bg-foreground/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Single game card
function GameCard({ game }: { game: Game }) {
  return (
    <div
      className="rounded-lg overflow-hidden bg-card border border-border hover:border-primary/40 shadow-card hover:shadow-hover cursor-pointer transition-smooth group"
      data-ocid="game-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={game.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
            <Play className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className={CATEGORY_BADGE[game.category]}>
            {CATEGORY_LABEL[game.category]}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground truncate mb-0.5">
          {game.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{Number(game.playerCount).toLocaleString()} playing</span>
          <span className="text-primary font-medium">
            {(game.rtp * 100).toFixed(1)}% RTP
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full text-xs gap-1 hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-smooth"
          data-ocid="play-btn"
        >
          <Play className="w-3 h-3 fill-current" /> Play
        </Button>
      </div>
    </div>
  );
}

// Transaction row
function TransactionRow({ tx }: { tx: Transaction }) {
  const isPositive = tx.netAmount >= 0n;
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-smooth"
      data-ocid="transaction-row"
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isPositive ? "bg-win-muted" : "bg-loss-muted"}`}
      >
        <TrendingUp
          className={`w-4 h-4 ${isPositive ? "text-win" : "text-loss rotate-180"}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {tx.gameName ?? "Wallet"}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatTimestamp(tx.timestamp)}
        </p>
      </div>
      <span
        className={`text-sm font-mono font-semibold ${isPositive ? "text-win" : "text-loss"}`}
      >
        {isPositive ? "+" : ""}
        {formatICP(tx.netAmount)} ICP
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          tx.transactionType === TransactionType.Deposit
            ? "bg-deposit-muted text-deposit"
            : tx.transactionType === TransactionType.Winning
              ? "bg-win-muted text-win"
              : "bg-loss-muted text-loss"
        }`}
      >
        {TRANSACTION_TYPE_LABEL[tx.transactionType]}
      </span>
    </div>
  );
}

export default function HomePage() {
  const { actor, isFetching } = useActor(createActor);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [txFilter, setTxFilter] = useState<TransactionType | null>(null);

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

  const { data: transactions = [], isLoading: txLoading } = useQuery<
    Transaction[]
  >({
    queryKey: ["transactions", txFilter],
    queryFn: async () => (actor ? actor.getTransactions(txFilter) : []),
    enabled: !!actor && !isFetching,
  });

  const TX_FILTERS: { label: string; value: TransactionType | null }[] = [
    { label: "All", value: null },
    { label: "Bets", value: TransactionType.Bet },
    { label: "Winnings", value: TransactionType.Winning },
    { label: "Deposits", value: TransactionType.Deposit },
  ];

  return (
    <div
      className="container mx-auto px-4 py-8 space-y-12"
      data-ocid="home-page"
    >
      {/* Featured Carousel */}
      <section>
        <FeaturedCarousel
          games={featuredGames}
          isLoading={featuredLoading || isFetching}
        />
      </section>

      {/* Game Lobby */}
      <section id="games">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Game Lobby
          </h2>
          <div
            className="flex items-center gap-2 flex-wrap"
            data-ocid="category-filters"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setCategoryFilter(f.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
                  categoryFilter === f.value
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
                data-ocid={`filter-${f.value}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {gamesLoading || isFetching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }, (_, i) => `skel-${i}`).map((key) => (
              <SkeletonCard key={key} variant="game" />
            ))}
          </div>
        ) : allGames.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-lg"
            data-ocid="games-empty-state"
          >
            <Play className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">
              No games available in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allGames.map((game) => (
              <GameCard key={game.id.toString()} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* Transaction History */}
      <section
        id="transactions"
        className="bg-muted/30 rounded-xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Transaction History
          </h2>
          <div
            className="flex items-center gap-2 flex-wrap"
            data-ocid="tx-filters"
          >
            {TX_FILTERS.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setTxFilter(f.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
                  txFilter === f.value
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
                data-ocid={`tx-filter-${f.label.toLowerCase()}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {txLoading || isFetching ? (
            Array.from({ length: 5 }, (_, i) => `tx-skel-${i}`).map((key) => (
              <SkeletonCard key={key} variant="transaction" />
            ))
          ) : transactions.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16"
              data-ocid="transactions-empty-state"
            >
              <TrendingUp className="w-10 h-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">
                No transactions yet. Start playing to see your history.
              </p>
            </div>
          ) : (
            transactions.map((tx) => (
              <TransactionRow key={tx.id.toString()} tx={tx} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
