import { Badge } from "@/components/ui/badge";
import { TransactionType } from "../backend";
import { formatICP } from "../hooks/use-wallet";
import type { Transaction } from "../types/casino";

interface TransactionRowProps {
  transaction: Transaction;
  onClick: (tx: Transaction) => void;
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function typeLabel(type: TransactionType): string {
  switch (type) {
    case TransactionType.Bet:
      return "Bet";
    case TransactionType.Winning:
      return "Winning";
    case TransactionType.Deposit:
      return "Deposit";
  }
}

function typeBadgeClass(type: TransactionType): string {
  switch (type) {
    case TransactionType.Bet:
      return "bg-primary/20 text-primary border-primary/30";
    case TransactionType.Winning:
      return "bg-win-muted text-win border-win";
    case TransactionType.Deposit:
      return "bg-deposit-muted text-deposit border-deposit";
  }
}

export function TransactionRow({ transaction, onClick }: TransactionRowProps) {
  const isWin = transaction.netAmount > 0n;
  const isNeutral = transaction.netAmount === 0n;
  const amountClass = isNeutral
    ? "text-muted-foreground"
    : isWin
      ? "text-win font-semibold"
      : "text-loss font-semibold";

  const sign = isWin ? "+" : isNeutral ? "" : "-";
  const absAmount =
    transaction.netAmount < 0n ? -transaction.netAmount : transaction.netAmount;

  return (
    <tr
      data-ocid="transaction-row"
      className="border-b border-border/50 hover:bg-muted/30 transition-smooth cursor-pointer group"
      onClick={() => onClick(transaction)}
      onKeyUp={(e) => e.key === "Enter" && onClick(transaction)}
      tabIndex={0}
    >
      <td className="px-4 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
        {formatTimestamp(transaction.timestamp)}
      </td>
      <td className="px-4 py-3.5">
        <span className="text-foreground font-medium text-sm truncate max-w-[140px] block">
          {transaction.gameName ?? "—"}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <Badge
          variant="outline"
          className={`text-xs font-semibold uppercase tracking-wide border ${typeBadgeClass(transaction.transactionType)}`}
        >
          {typeLabel(transaction.transactionType)}
        </Badge>
      </td>
      <td className="px-4 py-3.5 text-right text-sm text-muted-foreground">
        {formatICP(transaction.betAmount)} ICP
      </td>
      <td className="px-4 py-3.5 text-right">
        <span className={`text-sm tabular-nums ${amountClass}`}>
          {sign}
          {formatICP(absAmount)} ICP
        </span>
      </td>
      <td className="px-4 py-3.5 text-right">
        <span className="text-xs text-muted-foreground/70 truncate max-w-[100px] block text-right group-hover:text-muted-foreground transition-smooth">
          {transaction.result ?? "—"}
        </span>
      </td>
    </tr>
  );
}
