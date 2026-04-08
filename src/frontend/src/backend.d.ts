import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type JoinMatchResult = {
    __kind__: "InsufficientBalance";
    InsufficientBalance: null;
} | {
    __kind__: "NotFound";
    NotFound: null;
} | {
    __kind__: "Success";
    Success: Match;
} | {
    __kind__: "AlreadyInMatch";
    AlreadyInMatch: null;
} | {
    __kind__: "AlreadyFull";
    AlreadyFull: null;
};
export interface LobbyChatMessage {
    id: string;
    message: string;
    timestamp: Timestamp;
    senderName: string;
    senderId: UserId;
}
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
export interface CreateMatchRequest {
    gameType: VersusGameType;
    wager: WagerAmount;
}
export type DepositResult = {
    __kind__: "ok";
    ok: E8s;
} | {
    __kind__: "err";
    err: string;
};
export type GameState = {
    __kind__: "RPS";
    RPS: {
        player1Choice?: string;
        player2Choice?: string;
    };
} | {
    __kind__: "DiceRoll";
    DiceRoll: {
        player2Roll?: bigint;
        player1Roll?: bigint;
    };
} | {
    __kind__: "Chess";
    Chess: {
        moves: Array<ChessMove>;
        currentTurn: UserId;
        board: string;
    };
};
export interface Match {
    id: string;
    status: MatchStatus;
    winnerId?: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    player1: MatchPlayer;
    player2?: MatchPlayer;
    gameState: GameState;
    gameType: VersusGameType;
    wager: WagerAmount;
}
export interface OnlinePlayer {
    id: UserId;
    status: PlayerStatus;
    balanceE8s: E8s;
    lastSeen: Timestamp;
}
export type PlaceBetResult = {
    __kind__: "ok";
    ok: {
        transaction: Transaction;
        newBalance: E8s;
    };
} | {
    __kind__: "err";
    err: string;
};
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
export type UserId = Principal;
export interface ChessMove {
    toSquare: string;
    promotion?: string;
    fromSquare: string;
    timestamp: Timestamp;
}
export interface MatchPlayer {
    id: UserId;
    wagerAccepted: boolean;
}
export type E8s = bigint;
export type MakeMoveResult = {
    __kind__: "NotFound";
    NotFound: null;
} | {
    __kind__: "Success";
    Success: Match;
} | {
    __kind__: "InvalidMove";
    InvalidMove: null;
} | {
    __kind__: "NotYourTurn";
    NotYourTurn: null;
} | {
    __kind__: "MatchNotActive";
    MatchNotActive: null;
};
export interface ChatMessage {
    matchId: string;
    message: string;
    timestamp: Timestamp;
    senderId: UserId;
}
export interface PlaceBetRequest {
    betAmount: E8s;
    gameId: bigint;
}
export enum GameCategory {
    Slots = "Slots",
    CardGames = "CardGames",
    TableGames = "TableGames"
}
export enum MatchStatus {
    WagerPending = "WagerPending",
    Active = "Active",
    WaitingForOpponent = "WaitingForOpponent",
    Cancelled = "Cancelled",
    Completed = "Completed"
}
export enum PlayerStatus {
    Online = "Online",
    Playing = "Playing",
    Offline = "Offline"
}
export enum TransactionType {
    Bet = "Bet",
    Deposit = "Deposit",
    Winning = "Winning"
}
export enum VersusGameType {
    DiceRoll = "DiceRoll",
    RockPaperScissors = "RockPaperScissors",
    Chess = "Chess"
}
export enum WagerAmount {
    Ten = "Ten",
    OneHundred = "OneHundred",
    Thirty = "Thirty"
}
export interface backendInterface {
    acceptWager(matchId: string): Promise<JoinMatchResult>;
    createMatch(req: CreateMatchRequest): Promise<Match>;
    deposit(amount: E8s): Promise<DepositResult>;
    getBalance(): Promise<E8s>;
    getGame(gameId: bigint): Promise<Game | null>;
    getLobbyChatMessages(): Promise<Array<LobbyChatMessage>>;
    getMatch(matchId: string): Promise<Match | null>;
    getMatchChat(matchId: string): Promise<Array<ChatMessage>>;
    getOnlinePlayers(): Promise<Array<OnlinePlayer>>;
    getTransactions(typeFilter: TransactionType | null): Promise<Array<Transaction>>;
    heartbeat(): Promise<OnlinePlayer>;
    joinMatch(matchId: string): Promise<JoinMatchResult>;
    leaveMatch(matchId: string): Promise<Match | null>;
    listFeaturedGames(): Promise<Array<Game>>;
    listGames(): Promise<Array<Game>>;
    listGamesByCategory(category: GameCategory): Promise<Array<Game>>;
    listOpenMatches(): Promise<Array<Match>>;
    makeChessMove(matchId: string, fromSquare: string, toSquare: string, promotion: string | null): Promise<MakeMoveResult>;
    makeDiceRoll(matchId: string): Promise<MakeMoveResult>;
    makeRPSChoice(matchId: string, choice: string): Promise<MakeMoveResult>;
    placeBet(req: PlaceBetRequest): Promise<PlaceBetResult>;
    placeLuckySevensBet(betAmount: E8s): Promise<PlaceBetResult>;
    placeMidnightDragonsBet(betAmount: E8s): Promise<PlaceBetResult>;
    sendChatMessage(matchId: string, message: string): Promise<ChatMessage>;
    sendLobbyChatMessage(message: string, senderName: string): Promise<LobbyChatMessage>;
}
