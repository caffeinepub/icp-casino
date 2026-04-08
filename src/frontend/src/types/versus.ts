// Re-export versus types from backend.d.ts
export type {
  WagerAmount,
  VersusGameType,
  MatchStatus,
  PlayerStatus,
  OnlinePlayer,
  MatchPlayer,
  ChessMove,
  GameState,
  Match,
  ChatMessage,
  CreateMatchRequest,
  JoinMatchResult,
  MakeMoveResult,
  UserId,
} from "../backend";

// Helper to convert WagerAmount enum to ICP number
export function wagerToICP(wager: import("../backend").WagerAmount): number {
  switch (wager) {
    case "Ten":
      return 10;
    case "Thirty":
      return 30;
    case "OneHundred":
      return 100;
    default:
      return 0;
  }
}

// Helper to get short principal display
export function shortPrincipal(
  principal: import("@icp-sdk/core/principal").Principal,
): string {
  const text = principal.toText();
  return `${text.slice(0, 6)}…${text.slice(-4)}`;
}

// Helper to format timestamp
export function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
