import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Transaction {
    id: bigint;
    result?: string;
    netAmount: bigint;
    transactionType: TransactionType;
    betAmount: E8s;
    gameId?: bigint;
    timestamp: Timestamp;
    gameName?: string;
}
export type Timestamp = bigint;
export interface Game {
    id: bigint;
    rtp: number;
    featured: boolean;
    name: string;
    playerCount: bigint;
    imageUrl: string;
    category: GameCategory;
    houseEdge: number;
}
export type E8s = bigint;
export type DepositResult = {
    __kind__: "ok";
    ok: E8s;
} | {
    __kind__: "err";
    err: string;
};
export interface PlaceBetRequest {
    betAmount: E8s;
    gameId: bigint;
}
export type PlaceBetResult = {
    __kind__: "ok";
    ok: Transaction;
} | {
    __kind__: "err";
    err: string;
};
export enum GameCategory {
    Slots = "Slots",
    CardGames = "CardGames",
    TableGames = "TableGames"
}
export enum TransactionType {
    Bet = "Bet",
    Deposit = "Deposit",
    Winning = "Winning"
}
export interface backendInterface {
    deposit(amount: E8s): Promise<DepositResult>;
    getBalance(): Promise<E8s>;
    getGame(gameId: bigint): Promise<Game | null>;
    getTransactions(typeFilter: TransactionType | null): Promise<Array<Transaction>>;
    listFeaturedGames(): Promise<Array<Game>>;
    listGames(): Promise<Array<Game>>;
    listGamesByCategory(category: GameCategory): Promise<Array<Game>>;
    placeBet(req: PlaceBetRequest): Promise<PlaceBetResult>;
}
