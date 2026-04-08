import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type React from "react";
import { TransactionType } from "../backend";
import { useAuth } from "../hooks/use-auth";
import { formatICP } from "../hooks/use-wallet";
import type { Transaction } from "../types/casino";

interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
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

function typeBadgeStyle(type: TransactionType): React.CSSProperties {
  switch (type) {
    case TransactionType.Bet:
      return {
        background: "oklch(0.72 0.18 65 / 0.15)",
        color: "oklch(0.82 0.14 65)",
        borderColor: "oklch(0.72 0.18 65 / 0.35)",
      };
    case TransactionType.Winning:
      return {
        background: "oklch(0.72 0.18 65 / 0.18)",
        color: "oklch(0.82 0.14 65)",
        borderColor: "oklch(0.72 0.18 65 / 0.45)",
      };
    case TransactionType.Deposit:
      return {
        background: "oklch(0.55 0.18 300 / 0.18)",
        color: "oklch(0.78 0.15 300)",
        borderColor: "oklch(0.55 0.18 300 / 0.40)",
      };
  }
}

interface ReceiptRowProps {
  label: string;
  value: string;
  valueStyle?: React.CSSProperties;
  mono?: boolean;
}

function ReceiptRow({ label, value, valueStyle, mono }: ReceiptRowProps) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span
        className={`text-sm text-right break-all ${mono ? "font-mono" : ""}`}
        style={valueStyle}
      >
        {value}
      </span>
    </div>
  );
}

// Deterministic hash derived from transaction id — purely cosmetic
function confirmationHash(id: bigint): string {
  const hex = id.toString(16).padStart(8, "0");
  return `0x${hex}abcf${((id * 31n) % 0xffffn).toString(16).padStart(4, "0")}`;
}

export function TransactionModal({
  transaction,
  onClose,
}: TransactionModalProps) {
  const { principalText } = useAuth();
  const principal = principalText ?? "—";

  if (!transaction) return null;

  const isWin = transaction.netAmount > 0n;
  const isNeutral = transaction.netAmount === 0n;
  const amountStyle: React.CSSProperties = isNeutral
    ? {}
    : isWin
      ? { color: "oklch(0.82 0.14 65)", fontWeight: 600 }
      : { color: "oklch(0.55 0.18 300)", fontWeight: 600 };
  const sign = isWin ? "+" : isNeutral ? "" : "-";
  const absAmount =
    transaction.netAmount < 0n ? -transaction.netAmount : transaction.netAmount;

  return (
    <Dialog open={!!transaction} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="transaction-modal"
        className="bg-card border-border max-w-md w-full"
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="font-display text-lg text-foreground">
              Transaction Receipt
            </DialogTitle>
            <Badge
              variant="outline"
              className="text-xs font-semibold uppercase tracking-wide border"
              style={typeBadgeStyle(transaction.transactionType)}
            >
              {typeLabel(transaction.transactionType)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="mt-2 space-y-0.5">
          <ReceiptRow
            label="Date"
            value={formatTimestamp(transaction.timestamp)}
          />
          <ReceiptRow label="Game" value={transaction.gameName ?? "—"} />
          <ReceiptRow label="Result" value={transaction.result ?? "—"} />
          <Separator className="bg-border/60 my-1" />
          <ReceiptRow
            label="Bet Amount"
            value={`${formatICP(transaction.betAmount)} ICP`}
          />
          <ReceiptRow
            label="Net Amount"
            value={`${sign}${formatICP(absAmount)} ICP`}
            valueStyle={amountStyle}
          />
          <Separator className="bg-border/60 my-1" />
          <ReceiptRow
            label="Transaction ID"
            value={`#${transaction.id.toString()}`}
            mono
          />
          {transaction.gameId != null && (
            <ReceiptRow
              label="Game ID"
              value={`#${transaction.gameId.toString()}`}
              mono
            />
          )}
          <ReceiptRow
            label="Principal"
            value={principal}
            valueStyle={{ fontSize: "0.75rem", color: "oklch(0.60 0.04 280)" }}
            mono
          />
          <ReceiptRow
            label="Confirmation"
            value={confirmationHash(transaction.id)}
            valueStyle={{ fontSize: "0.75rem", color: "oklch(0.60 0.04 280)" }}
            mono
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
