import type { backendInterface, Game, LobbyChatMessage, Match, OnlinePlayer, Transaction, ChatMessage, UserProfile } from "../backend";
import { GameCategory, MatchStatus, PlayerStatus, TransactionType, VersusGameType, WagerAmount } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal1 = { toString: () => "aaaaa-aa" } as unknown as Principal;
const mockPrincipal2 = { toString: () => "bbbbb-bb" } as unknown as Principal;

const mockGames: Game[] = [
  {
    id: BigInt(1),
    rtp: 0.92,
    featured: true,
    name: "Lucky Sevens",
    playerCount: BigInt(42),
    imageUrl: "",
    category: GameCategory.Slots,
    houseEdge: 0.08,
  },
  {
    id: BigInt(2),
    rtp: 0.92,
    featured: true,
    name: "Midnight Dragons",
    playerCount: BigInt(18),
    imageUrl: "",
    category: GameCategory.Slots,
    houseEdge: 0.08,
  },
  {
    id: BigInt(3),
    rtp: 0.92,
    featured: false,
    name: "Royal Poker",
    playerCount: BigInt(27),
    imageUrl: "",
    category: GameCategory.CardGames,
    houseEdge: 0.08,
  },
];

const mockMatch: Match = {
  id: "match-001",
  status: MatchStatus.WaitingForOpponent,
  createdAt: BigInt(Date.now() * 1000000),
  updatedAt: BigInt(Date.now() * 1000000),
  player1: { id: mockPrincipal1, wagerAccepted: true },
  gameState: { __kind__: "Chess", Chess: { moves: [], currentTurn: mockPrincipal1, board: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" } },
  gameType: VersusGameType.Chess,
  wager: WagerAmount.Ten,
};

const mockOnlinePlayers: OnlinePlayer[] = [
  { id: mockPrincipal1, status: PlayerStatus.Online, balanceE8s: BigInt(1500000000), lastSeen: BigInt(Date.now() * 1000000) },
  { id: mockPrincipal2, status: PlayerStatus.Playing, balanceE8s: BigInt(3200000000), lastSeen: BigInt(Date.now() * 1000000) },
];

const mockTransactions: Transaction[] = [
  {
    id: BigInt(1),
    netAmount: BigInt(-100000000),
    transactionType: TransactionType.Bet,
    betAmount: BigInt(100000000),
    timestamp: BigInt(Date.now() * 1000000),
    gameId: BigInt(1),
    gameName: "Lucky Sevens",
  },
  {
    id: BigInt(2),
    netAmount: BigInt(200000000),
    transactionType: TransactionType.Winning,
    betAmount: BigInt(100000000),
    timestamp: BigInt(Date.now() * 1000000),
    gameId: BigInt(1),
    gameName: "Lucky Sevens",
  },
];

const mockChatMessages: ChatMessage[] = [
  { matchId: "match-001", message: "Good luck!", timestamp: BigInt(Date.now() * 1000000), senderId: mockPrincipal1 },
  { matchId: "match-001", message: "You too!", timestamp: BigInt(Date.now() * 1000000), senderId: mockPrincipal2 },
];

const mockLobbyChatMessages: LobbyChatMessage[] = [];

export const mockBackend: backendInterface = {
  acceptWager: async () => ({ __kind__: "Success", Success: mockMatch }),
  createMatch: async () => mockMatch,
  deposit: async () => ({ __kind__: "ok", ok: BigInt(1000000000) }),
  getBalance: async () => BigInt(1000000000),
  getGame: async () => mockGames[0],
  getMatch: async () => mockMatch,
  getMatchChat: async () => mockChatMessages,
  getOnlinePlayers: async () => mockOnlinePlayers,
  getTransactions: async () => mockTransactions,
  heartbeat: async () => mockOnlinePlayers[0],
  joinMatch: async () => ({ __kind__: "Success", Success: mockMatch }),
  leaveMatch: async () => mockMatch,
  listFeaturedGames: async () => mockGames.filter((g) => g.featured),
  listGames: async () => mockGames,
  listGamesByCategory: async (category) => mockGames.filter((g) => g.category === category),
  listOpenMatches: async () => [mockMatch],
  makeChessMove: async () => ({ __kind__: "Success", Success: mockMatch }),
  makeDiceRoll: async () => ({ __kind__: "Success", Success: mockMatch }),
  makeRPSChoice: async () => ({ __kind__: "Success", Success: mockMatch }),
  placeBet: async (req) => ({
    __kind__: "ok",
    ok: {
      transaction: { ...mockTransactions[0], betAmount: req.betAmount },
      newBalance: BigInt(900000000),
    },
  }),
  placeLuckySevensBet: async (betAmount) => ({
    __kind__: "ok",
    ok: {
      transaction: { ...mockTransactions[0], betAmount },
      newBalance: BigInt(900000000),
    },
  }),
  placeMidnightDragonsBet: async (betAmount) => ({
    __kind__: "ok",
    ok: {
      transaction: { ...mockTransactions[0], betAmount },
      newBalance: BigInt(900000000),
    },
  }),
  sendChatMessage: async (matchId, message) => ({
    matchId,
    message,
    timestamp: BigInt(Date.now() * 1000000),
    senderId: mockPrincipal1,
  }),
  getLobbyChatMessages: async () => mockLobbyChatMessages,
  getMyProfile: async (): Promise<UserProfile | null> => null,
  getProfile: async (_userId): Promise<UserProfile | null> => null,
  hasProfile: async (): Promise<boolean> => false,
  setProfile: async (_username, _avatarUrl) => ({ __kind__: "ok", ok: null }),
  sendLobbyChatMessage: async (message, senderName) => {
    const msg: LobbyChatMessage = {
      id: `${Date.now()}`,
      senderId: mockPrincipal1,
      senderName,
      message,
      timestamp: BigInt(Date.now() * 1000000),
    };
    mockLobbyChatMessages.push(msg);
    return msg;
  },
};
