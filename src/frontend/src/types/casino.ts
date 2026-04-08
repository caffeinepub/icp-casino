export { GameCategory, TransactionType } from "../backend";
export type {
  Game,
  Transaction,
  E8s,
  Timestamp,
  PlaceBetRequest,
  PlaceBetResult,
  DepositResult,
} from "../backend";

import type { GameCategory } from "../backend";

export type CategoryFilter = GameCategory | "All";

export interface WalletState {
  balance: bigint;
  isLoading: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
