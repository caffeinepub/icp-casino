import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;
  public type E8s = CommonTypes.E8s;

  // Wager amounts — fixed at 10, 30, or 100 ICP in e8s
  public type WagerAmount = {
    #Ten;       // 1_000_000_000 e8s
    #Thirty;    // 3_000_000_000 e8s
    #OneHundred; // 10_000_000_000 e8s
  };

  // PvP game types
  public type VersusGameType = {
    #Chess;
    #DiceRoll;
    #RockPaperScissors;
  };

  // Match lifecycle status
  public type MatchStatus = {
    #WaitingForOpponent;
    #WagerPending;   // Both players must accept wager before match starts
    #Active;
    #Completed;
    #Cancelled;
  };

  // Online player presence status
  public type PlayerStatus = {
    #Online;
    #Playing;
    #Offline;
  };

  // Online player shown in the lobby player list
  public type OnlinePlayer = {
    id : UserId;
    balanceE8s : E8s;
    status : PlayerStatus;
    lastSeen : Timestamp;
  };

  // Per-player slot inside a Match
  public type MatchPlayer = {
    id : UserId;
    wagerAccepted : Bool;
  };

  // A single chess move
  public type ChessMove = {
    fromSquare : Text;
    toSquare : Text;
    promotion : ?Text;
    timestamp : Timestamp;
  };

  // Per-game-type state union
  public type GameState = {
    #Chess : {
      board : Text;          // FEN string
      moves : [ChessMove];
      currentTurn : UserId;
    };
    #DiceRoll : {
      player1Roll : ?Nat;
      player2Roll : ?Nat;
    };
    #RPS : {
      player1Choice : ?Text;
      player2Choice : ?Text;
    };
  };

  // A full versus match record
  public type Match = {
    id : Text;
    gameType : VersusGameType;
    wager : WagerAmount;
    player1 : MatchPlayer;
    player2 : ?MatchPlayer;
    status : MatchStatus;
    gameState : GameState;
    createdAt : Timestamp;
    updatedAt : Timestamp;
    winnerId : ?UserId;
  };

  // In-match chat message
  public type ChatMessage = {
    matchId : Text;
    senderId : UserId;
    message : Text;
    timestamp : Timestamp;
  };

  // Request to create a new open match
  public type CreateMatchRequest = {
    gameType : VersusGameType;
    wager : WagerAmount;
  };

  // Result of joining an existing match
  public type JoinMatchResult = {
    #Success : Match;
    #NotFound;
    #AlreadyFull;
    #InsufficientBalance;
    #AlreadyInMatch;
  };

  // Result of making a game move
  public type MakeMoveResult = {
    #Success : Match;
    #NotYourTurn;
    #InvalidMove;
    #MatchNotActive;
    #NotFound;
  };
};
