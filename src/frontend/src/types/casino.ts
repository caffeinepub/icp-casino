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

// Shared wallet gate props used across game screens
export interface WalletGateProps {
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => Promise<void>;
  connectError: string | null;
}
