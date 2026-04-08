import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type E8s = Common.E8s;

  public type GameCategory = {
    #Slots;
    #TableGames;
    #CardGames;
  };

  public type Game = {
    id : Nat;
    name : Text;
    category : GameCategory;
    rtp : Float;        // Return to player percentage (e.g. 96.5)
    houseEdge : Float;  // House edge percentage (e.g. 3.5)
    imageUrl : Text;
    playerCount : Nat;
    featured : Bool;
  };

  public type TransactionType = {
    #Bet;
    #Winning;
    #Deposit;
  };

  public type Transaction = {
    id : Nat;
    gameId : ?Nat;
    gameName : ?Text;
    betAmount : E8s;
    result : ?Text;     // "win" | "loss" | null for deposits
    netAmount : Int;    // positive for winnings/deposits, negative for losses
    timestamp : Timestamp;
    transactionType : TransactionType;
  };

  public type WalletBalance = {
    owner : UserId;
    balance : E8s;
  };

  public type PlaceBetRequest = {
    gameId : Nat;
    betAmount : E8s;
  };

  public type PlaceBetResult = {
    #ok : Transaction;
    #err : Text;
  };

  public type DepositResult = {
    #ok : E8s;  // new balance
    #err : Text;
  };
};
