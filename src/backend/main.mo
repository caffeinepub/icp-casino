import Types "types/casino";
import VersusTypes "types/versus";
import LobbyChatTypes "types/lobby-chat";
import CasinoMixin "mixins/casino-api";
import VersusMixin "mixins/versus-api";
import LobbyChatMixin "mixins/lobby-chat-api";
import CasinoLib "lib/casino";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  // Casino state
  let games = List.empty<Types.Game>();
  let wallets = Map.empty<Types.UserId, Types.E8s>();
  let transactions = Map.empty<Types.UserId, List.List<Types.Transaction>>();
  let nextTxIdHolder = List.empty<Nat>();

  // Versus state
  let matches = Map.empty<Text, VersusTypes.Match>();
  let playerMatches = Map.empty<Types.UserId, Text>();
  let matchChats = Map.empty<Text, List.List<VersusTypes.ChatMessage>>();
  let onlinePlayers = Map.empty<Types.UserId, VersusTypes.OnlinePlayer>();
  let escrow = Map.empty<Text, Types.E8s>();
  let matchCounter = List.empty<Nat>();

  // Lobby chat state
  let lobbyChat = List.empty<LobbyChatTypes.LobbyChatMessage>();

  // Seed game catalog on first initialization
  CasinoLib.seedGames(games);

  include CasinoMixin(games, wallets, transactions, nextTxIdHolder);
  include VersusMixin(matches, playerMatches, matchChats, onlinePlayers, wallets, escrow, matchCounter);
  include LobbyChatMixin(lobbyChat);
};
