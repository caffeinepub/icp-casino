import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Receipt } from "lucide-react";
import { useMemo, useState } from "react";
import { createActor } from "../backend";
import { TransactionType } from "../backend";
import { TransactionModal } from "../components/TransactionModal";
import { TransactionRow } from "../components/TransactionRow";
import { useAuth } from "../hooks/use-auth";
import type { Transaction } from "../types/casino";

const PAGE_SIZE = 20;

type FilterTab = "All" | "Bets" | "Winnings" | "Deposits";

const FILTER_TABS: {
  id: FilterTab;
  label: string;
  type: TransactionType | null;
}[] = [
  { id: "All", label: "All", type: null },
  { id: "Bets", label: "Bets", type: TransactionType.Bet },
  { id: "Winnings", label: "Winnings", type: TransactionType.Winning },
  { id: "Deposits", label: "Deposits", type: TransactionType.Deposit },
];

function useTransactions(typeFilter: TransactionType | null) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<Transaction[]>({
    queryKey: ["transactions", typeFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTransactions(typeFilter);
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

function TableSkeleton() {
  return (
    <div data-ocid="transactions-skeleton" className="space-y-2 px-4 py-2">
      {Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((key) => (
        <Skeleton key={key} className="h-12 w-full rounded-md" />
      ))}
    </div>
  );
}

function EmptyState({ filter }: { filter: FilterTab }) {
  return (
    <div
      data-ocid="transactions-empty"
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center">
        <Receipt className="w-7 h-7 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-foreground font-semibold text-base">
          No transactions found
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          {filter === "All"
            ? "Your transaction history will appear here once you start playing."
            : `No ${filter.toLowerCase()} found. Try a different filter.`}
        </p>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const activeFilter = FILTER_TABS.find((t) => t.id === activeTab)!;
  const { data: allTransactions = [], isLoading } = useTransactions(
    activeFilter.type,
  );

  // Sort newest first
  const sorted = useMemo(
    () =>
      [...allTransactions].sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1)),
    [allTransactions],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Count per tab for badges — use all transactions from "All" query
  const { data: allForCount = [] } = useTransactions(null);
  const countsByType: Record<FilterTab, number> = useMemo(() => {
    return {
      All: allForCount.length,
      Bets: allForCount.filter((t) => t.transactionType === TransactionType.Bet)
        .length,
      Winnings: allForCount.filter(
        (t) => t.transactionType === TransactionType.Winning,
      ).length,
      Deposits: allForCount.filter(
        (t) => t.transactionType === TransactionType.Deposit,
      ).length,
    };
  }, [allForCount]);

  function handleTabChange(tab: FilterTab) {
    setActiveTab(tab);
    setPage(1);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-foreground tracking-tight">
          Transaction History
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Review all your bets, winnings, and deposits
        </p>
        <div className="accent-bar w-16 mt-3 rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div
        data-ocid="transaction-filter-tabs"
        className="flex gap-2 flex-wrap mb-6 p-1 bg-muted/20 rounded-lg border border-border/40 w-fit"
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-ocid={`filter-tab-${tab.id.toLowerCase()}`}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }
              `}
            >
              {tab.label}
              <Badge
                variant="secondary"
                className={`text-xs px-1.5 py-0.5 min-w-[1.5rem] justify-center ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground"
                }`}
              >
                {countsByType[tab.id]}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        {isLoading ? (
          <TableSkeleton />
        ) : pageItems.length === 0 ? (
          <EmptyState filter={activeTab} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Game
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Bet
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Net
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((tx) => (
                    <TransactionRow
                      key={tx.id.toString()}
                      transaction={tx}
                      onClick={setSelected}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                data-ocid="transactions-pagination"
                className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/10"
              >
                <span className="text-xs text-muted-foreground">
                  Page {page} of {totalPages} — {sorted.length} total
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    data-ocid="pagination-prev"
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const start = Math.max(
                      1,
                      Math.min(page - 2, totalPages - 4),
                    );
                    const p = start + i;
                    return (
                      <Button
                        key={p}
                        variant={p === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(p)}
                        data-ocid={`pagination-page-${p}`}
                        className="h-8 w-8 p-0 text-xs"
                      >
                        {p}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    data-ocid="pagination-next"
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      <TransactionModal
        transaction={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
