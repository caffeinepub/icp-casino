import Types "../types/casino";
import CasinoLib "../lib/casino";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  games : List.List<Types.Game>,
  wallets : Map.Map<Types.UserId, Types.E8s>,
  transactions : Map.Map<Types.UserId, List.List<Types.Transaction>>,
  nextTxIdHolder : List.List<Nat>,
) {

  // --- Game Lobby ---

  public query func listGames() : async [Types.Game] {
    CasinoLib.listGames(games)
  };

  public query func listFeaturedGames() : async [Types.Game] {
    CasinoLib.listFeaturedGames(games)
  };

  public query func listGamesByCategory(category : Types.GameCategory) : async [Types.Game] {
    CasinoLib.listGamesByCategory(games, category)
  };

  public query func getGame(gameId : Nat) : async ?Types.Game {
    CasinoLib.getGame(games, gameId)
  };

  // --- Wallet ---

  public shared ({ caller }) func getBalance() : async Types.E8s {
    CasinoLib.getBalance(wallets, caller)
  };

  public shared ({ caller }) func deposit(amount : Types.E8s) : async Types.DepositResult {
    if (amount == 0) {
      return #err("Deposit amount must be greater than 0");
    };
    let newBalance = CasinoLib.deposit(wallets, caller, amount);
    let txId = nextTxIdHolder.size();
    nextTxIdHolder.add(txId);
    let tx : Types.Transaction = {
      id = txId;
      gameId = null;
      gameName = null;
      betAmount = amount;
      result = null;
      netAmount = amount.toInt();
      timestamp = Time.now();
      transactionType = #Deposit;
    };
    let txList = switch (transactions.get(caller)) {
      case (?list) list;
      case null {
        let newList = List.empty<Types.Transaction>();
        transactions.add(caller, newList);
        newList;
      };
    };
    txList.add(tx);
    #ok(newBalance)
  };

  // --- Transactions ---

  public shared ({ caller }) func getTransactions(typeFilter : ?Types.TransactionType) : async [Types.Transaction] {
    CasinoLib.getTransactions(transactions, caller, typeFilter)
  };

  // --- Game Play ---

  public shared ({ caller }) func placeBet(req : Types.PlaceBetRequest) : async Types.PlaceBetResult {
    let txId = nextTxIdHolder.size();
    let (result, newTxId) = CasinoLib.placeBet(games, wallets, transactions, txId, caller, req);
    if (newTxId > txId) {
      nextTxIdHolder.add(newTxId);
    };
    result
  };

  // --- Lucky Sevens ---

  public shared ({ caller }) func placeLuckySevensBet(betAmount : Types.E8s) : async Types.PlaceBetResult {
    let txId = nextTxIdHolder.size();
    let (result, newTxId) = CasinoLib.placeLuckySevensBet(games, wallets, transactions, txId, caller, betAmount);
    if (newTxId > txId) {
      nextTxIdHolder.add(newTxId);
    };
    result
  };

  // --- Midnight Dragons ---

  public shared ({ caller }) func placeMidnightDragonsBet(betAmount : Types.E8s) : async Types.PlaceBetResult {
    let txId = nextTxIdHolder.size();
    let (result, newTxId) = CasinoLib.placeMidnightDragonsBet(games, wallets, transactions, txId, caller, betAmount);
    if (newTxId > txId) {
      nextTxIdHolder.add(newTxId);
    };
    result
  };
};
