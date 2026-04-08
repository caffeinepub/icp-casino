import Types "../types/versus";
import CommonTypes "../types/common";
import VersusLib "../lib/versus";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  matches : Map.Map<Text, Types.Match>,
  playerMatches : Map.Map<CommonTypes.UserId, Text>,
  matchChats : Map.Map<Text, List.List<Types.ChatMessage>>,
  onlinePlayers : Map.Map<CommonTypes.UserId, Types.OnlinePlayer>,
  wallets : Map.Map<CommonTypes.UserId, CommonTypes.E8s>,
  escrow : Map.Map<Text, CommonTypes.E8s>,
  matchCounter : List.List<Nat>,
  profiles : Map.Map<CommonTypes.UserId, CommonTypes.UserProfile>,
) {

  // Create a new open match; caller is player1
  public shared ({ caller }) func createMatch(
    req : Types.CreateMatchRequest
  ) : async Types.Match {
    let now = Time.now();
    VersusLib.createMatch(matches, playerMatches, matchCounter, wallets, caller, req, now)
  };

  // Join an existing open match as player2
  public shared ({ caller }) func joinMatch(
    matchId : Text
  ) : async Types.JoinMatchResult {
    let now = Time.now();
    VersusLib.joinMatch(matches, playerMatches, wallets, caller, matchId, now)
  };

  // Accept the wager for a pending match; activates when both players accept
  public shared ({ caller }) func acceptWager(
    matchId : Text
  ) : async Types.JoinMatchResult {
    let now = Time.now();
    VersusLib.acceptWager(matches, wallets, escrow, caller, matchId, now)
  };

  // Submit a chess move (fromSquare, toSquare, optional promotion piece)
  public shared ({ caller }) func makeChessMove(
    matchId : Text,
    fromSquare : Text,
    toSquare : Text,
    promotion : ?Text,
  ) : async Types.MakeMoveResult {
    let now = Time.now();
    VersusLib.makeChessMove(matches, wallets, escrow, caller, matchId, fromSquare, toSquare, promotion, now)
  };

  // Submit a dice roll (server-side RNG determines value)
  public shared ({ caller }) func makeDiceRoll(
    matchId : Text
  ) : async Types.MakeMoveResult {
    let now = Time.now();
    VersusLib.makeDiceRoll(matches, wallets, escrow, caller, matchId, now)
  };

  // Submit a Rock-Paper-Scissors choice ("rock" | "paper" | "scissors")
  public shared ({ caller }) func makeRPSChoice(
    matchId : Text,
    choice : Text,
  ) : async Types.MakeMoveResult {
    let now = Time.now();
    VersusLib.makeRPSChoice(matches, wallets, escrow, caller, matchId, choice, now)
  };

  // Send an in-match chat message
  public shared ({ caller }) func sendChatMessage(
    matchId : Text,
    message : Text,
  ) : async Types.ChatMessage {
    let now = Time.now();
    VersusLib.sendChatMessage(matchChats, caller, matchId, message, now)
  };

  // Fetch a single match by ID
  public query func getMatch(matchId : Text) : async ?Types.Match {
    matches.get(matchId)
  };

  // List all matches in WaitingForOpponent status
  public query func listOpenMatches() : async [Types.Match] {
    VersusLib.listOpenMatches(matches)
  };

  // List all currently online / recently seen players with balances
  public query func getOnlinePlayers() : async [Types.OnlinePlayer] {
    let now = Time.now();
    VersusLib.getOnlinePlayers(onlinePlayers, now)
  };

  // Update the caller's last-seen timestamp and online status (polling heartbeat)
  public shared ({ caller }) func heartbeat() : async Types.OnlinePlayer {
    let now = Time.now();
    VersusLib.heartbeat(onlinePlayers, wallets, playerMatches, matches, profiles, caller, now)
  };

  // Retrieve all chat messages for a given match
  public query func getMatchChat(matchId : Text) : async [Types.ChatMessage] {
    VersusLib.getMatchChat(matchChats, matchId)
  };

  // Leave / cancel a match the caller is in
  public shared ({ caller }) func leaveMatch(matchId : Text) : async ?Types.Match {
    let now = Time.now();
    VersusLib.cancelMatch(matches, playerMatches, wallets, escrow, caller, matchId, now)
  };
};
