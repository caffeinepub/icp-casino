import Types "types/casino";
import CasinoMixin "mixins/casino-api";
import CasinoLib "lib/casino";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  let games = List.empty<Types.Game>();
  let wallets = Map.empty<Types.UserId, Types.E8s>();
  let transactions = Map.empty<Types.UserId, List.List<Types.Transaction>>();
  let nextTxIdHolder = List.empty<Nat>();

  // Seed game catalog on first initialization
  CasinoLib.seedGames(games);

  include CasinoMixin(games, wallets, transactions, nextTxIdHolder);
};
