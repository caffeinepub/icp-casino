import Types "../types/versus";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

module {
  public type UserId = CommonTypes.UserId;

  // ---------------------------------------------------------------------------
  // Wager helpers
  // ---------------------------------------------------------------------------

  // 1 ICP = 100_000_000 e8s
  // 10 ICP = 1_000_000_000 e8s
  // 30 ICP = 3_000_000_000 e8s
  // 100 ICP = 10_000_000_000 e8s
  public func wagerToE8s(wager : Types.WagerAmount) : Types.E8s {
    switch (wager) {
      case (#Ten)        { 1_000_000_000 };
      case (#Thirty)     { 3_000_000_000 };
      case (#OneHundred) { 10_000_000_000 };
    }
  };

  // ---------------------------------------------------------------------------
  // Match ID generation
  // ---------------------------------------------------------------------------

  public func generateMatchId(
    counter : List.List<Nat>,
  ) : Text {
    let count = switch (counter.first()) {
      case (?n) n;
      case null { 0 };
    };
    let timeNow = Time.now();
    let t : Nat = if (timeNow >= 0) { timeNow.toNat() } else { ((-timeNow).toNat()) };
    let newCount = count + 1;
    // Update counter in-place
    if (counter.isEmpty()) {
      counter.add(newCount);
    } else {
      counter.put(0, newCount);
    };
    "match-" # newCount.toText() # "-" # t.toText()
  };

  // ---------------------------------------------------------------------------
  // Default chess board (initial FEN position)
  // ---------------------------------------------------------------------------

  let INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  // ---------------------------------------------------------------------------
  // Initial game state per game type
  // ---------------------------------------------------------------------------

  func initialGameState(gameType : Types.VersusGameType, player1 : UserId) : Types.GameState {
    switch (gameType) {
      case (#Chess) {
        #Chess {
          board = INITIAL_FEN;
          moves = [];
          currentTurn = player1;
        };
      };
      case (#DiceRoll) {
        #DiceRoll {
          player1Roll = null;
          player2Roll = null;
        };
      };
      case (#RockPaperScissors) {
        #RPS {
          player1Choice = null;
          player2Choice = null;
        };
      };
    }
  };

  // ---------------------------------------------------------------------------
  // Create match
  // ---------------------------------------------------------------------------

  public func createMatch(
    matches : Map.Map<Text, Types.Match>,
    playerMatches : Map.Map<UserId, Text>,
    counter : List.List<Nat>,
    wallets : Map.Map<UserId, Types.E8s>,
    caller : UserId,
    req : Types.CreateMatchRequest,
    now : Types.Timestamp,
  ) : Types.Match {
    // Reject if caller is already in an active match
    switch (playerMatches.get(caller)) {
      case (?existingMatchId) {
        switch (matches.get(existingMatchId)) {
          case (?m) {
            switch (m.status) {
              case (#Completed) {};
              case (#Cancelled) {};
              case (_) { Runtime.trap("You are already in an active match") };
            };
          };
          case null {};
        };
      };
      case null {};
    };

    // Validate sufficient balance
    let wagerE8s = wagerToE8s(req.wager);
    let balance = switch (wallets.get(caller)) {
      case (?b) b;
      case null { 0 };
    };
    if (balance < wagerE8s) {
      Runtime.trap("Insufficient balance for wager");
    };

    let matchId = generateMatchId(counter);
    let player1 : Types.MatchPlayer = {
      id = caller;
      wagerAccepted = false;
    };

    let newMatch : Types.Match = {
      id = matchId;
      gameType = req.gameType;
      wager = req.wager;
      player1;
      player2 = null;
      status = #WaitingForOpponent;
      gameState = initialGameState(req.gameType, caller);
      createdAt = now;
      updatedAt = now;
      winnerId = null;
    };

    matches.add(matchId, newMatch);
    playerMatches.add(caller, matchId);
    newMatch
  };

  // ---------------------------------------------------------------------------
  // Join match
  // ---------------------------------------------------------------------------

  public func joinMatch(
    matches : Map.Map<Text, Types.Match>,
    playerMatches : Map.Map<UserId, Text>,
    wallets : Map.Map<UserId, Types.E8s>,
    caller : UserId,
    matchId : Text,
    now : Types.Timestamp,
  ) : Types.JoinMatchResult {
    // Check caller is not in another active match
    switch (playerMatches.get(caller)) {
      case (?existingMatchId) {
        if (existingMatchId != matchId) {
          switch (matches.get(existingMatchId)) {
            case (?m) {
              switch (m.status) {
                case (#Completed) {};
                case (#Cancelled) {};
                case (_) { return #AlreadyInMatch };
              };
            };
            case null {};
          };
        };
      };
      case null {};
    };

    let match = switch (matches.get(matchId)) {
      case (?m) m;
      case null { return #NotFound };
    };

    // Cannot join own match or completed/cancelled matches
    switch (match.status) {
      case (#WaitingForOpponent) {};
      case (_) { return #AlreadyFull };
    };

    if (Principal.equal(match.player1.id, caller)) {
      return #AlreadyInMatch;
    };

    // Validate balance
    let wagerE8s = wagerToE8s(match.wager);
    let balance = switch (wallets.get(caller)) {
      case (?b) b;
      case null { 0 };
    };
    if (balance < wagerE8s) {
      return #InsufficientBalance;
    };

    let player2 : Types.MatchPlayer = {
      id = caller;
      wagerAccepted = false;
    };

    let updated : Types.Match = {
      match with
      player2 = ?player2;
      status = #WagerPending;
      updatedAt = now;
    };

    matches.add(matchId, updated);
    playerMatches.add(caller, matchId);
    #Success(updated)
  };

  // ---------------------------------------------------------------------------
  // Accept wager
  // ---------------------------------------------------------------------------

  public func acceptWager(
    matches : Map.Map<Text, Types.Match>,
    wallets : Map.Map<UserId, Types.E8s>,
    escrow : Map.Map<Text, Types.E8s>,
    caller : UserId,
    matchId : Text,
    now : Types.Timestamp,
  ) : Types.JoinMatchResult {
    let match = switch (matches.get(matchId)) {
      case (?m) m;
      case null { return #NotFound };
    };

    switch (match.status) {
      case (#WagerPending) {};
      case (_) { return #AlreadyFull };
    };

    let player2 = switch (match.player2) {
      case (?p) p;
      case null { return #NotFound };
    };

    let isPlayer1 = Principal.equal(match.player1.id, caller);
    let isPlayer2 = Principal.equal(player2.id, caller);

    if (not isPlayer1 and not isPlayer2) {
      return #NotFound;
    };

    let wagerE8s = wagerToE8s(match.wager);

    // Validate balance for the caller accepting
    let balance = switch (wallets.get(caller)) {
      case (?b) b;
      case null { 0 };
    };
    if (balance < wagerE8s) {
      return #InsufficientBalance;
    };

    // Update the accepting player's flag
    let newPlayer1 = if (isPlayer1) {
      { match.player1 with wagerAccepted = true }
    } else {
      match.player1
    };

    let newPlayer2 = if (isPlayer2) {
      ?{ player2 with wagerAccepted = true }
    } else {
      ?player2
    };

    let bothAccepted = newPlayer1.wagerAccepted and (
      switch (newPlayer2) {
        case (?p2) p2.wagerAccepted;
        case null false;
      }
    );

    let (newStatus, updatedMatch) = if (bothAccepted) {
      // Deduct wager from both wallets into escrow
      let bal1 = switch (wallets.get(newPlayer1.id)) {
        case (?b) b;
        case null { 0 };
      };
      let bal2 = switch (newPlayer2) {
        case (?p2) {
          switch (wallets.get(p2.id)) {
            case (?b) b;
            case null { 0 };
          }
        };
        case null { 0 };
      };

      if (bal1 < wagerE8s or bal2 < wagerE8s) {
        return #InsufficientBalance;
      };

      wallets.add(newPlayer1.id, bal1 - wagerE8s);
      switch (newPlayer2) {
        case (?p2) { wallets.add(p2.id, bal2 - wagerE8s) };
        case null {};
      };

      // Total escrowed = 2x wager
      escrow.add(matchId, wagerE8s * 2);

      let m : Types.Match = {
        match with
        player1 = newPlayer1;
        player2 = newPlayer2;
        status = #Active;
        updatedAt = now;
      };
      (#Active, m)
    } else {
      let m : Types.Match = {
        match with
        player1 = newPlayer1;
        player2 = newPlayer2;
        updatedAt = now;
      };
      (#WagerPending, m)
    };

    matches.add(matchId, updatedMatch);
    ignore newStatus;
    #Success(updatedMatch)
  };

  // ---------------------------------------------------------------------------
  // Chess helpers
  // ---------------------------------------------------------------------------

  // Validate square notation (a-h)(1-8)
  func isValidSquare(sq : Text) : Bool {
    if (sq.size() < 2) { return false };
    let chars = sq.toArray();
    let file = chars[0];
    let rank = chars[1];
    (file >= 'a' and file <= 'h') and (rank >= '1' and rank <= '8')
  };

  // ---------------------------------------------------------------------------
  // Make chess move
  // ---------------------------------------------------------------------------

  public func makeChessMove(
    matches : Map.Map<Text, Types.Match>,
    wallets : Map.Map<UserId, Types.E8s>,
    escrow : Map.Map<Text, Types.E8s>,
    caller : UserId,
    matchId : Text,
    fromSquare : Text,
    toSquare : Text,
    promotion : ?Text,
    now : Types.Timestamp,
  ) : Types.MakeMoveResult {
    let match = switch (matches.get(matchId)) {
      case (?m) m;
      case null { return #NotFound };
    };

    switch (match.status) {
      case (#Active) {};
      case (_) { return #MatchNotActive };
    };

    let chessState = switch (match.gameState) {
      case (#Chess(s)) s;
      case (_) { return #InvalidMove };
    };

    // Validate it's the caller's turn
    if (not Principal.equal(chessState.currentTurn, caller)) {
      return #NotYourTurn;
    };

    // Validate squares
    if (not isValidSquare(fromSquare) or not isValidSquare(toSquare)) {
      return #InvalidMove;
    };

    let move : Types.ChessMove = {
      fromSquare;
      toSquare;
      promotion;
      timestamp = now;
    };

    // Append move to history
    let allMoves = chessState.moves.concat([move]);

    // Determine next turn: the other player
    let player2 = switch (match.player2) {
      case (?p) p;
      case null { return #MatchNotActive };
    };

    let nextTurn = if (Principal.equal(chessState.currentTurn, match.player1.id)) {
      player2.id
    } else {
      match.player1.id
    };

    // Check for checkmate flag in move notation (promotion field contains "#" signal)
    let isCheckmate = switch (promotion) {
      case (?p) { p == "#" };
      case null { false };
    };

    let newGameState : Types.GameState = #Chess {
      board = chessState.board;
      moves = allMoves;
      currentTurn = nextTurn;
    };

    if (isCheckmate) {
      // Settle match — caller (who delivered checkmate) is the winner
      let settled : Types.Match = {
        match with
        gameState = newGameState;
        status = #Completed;
        winnerId = ?caller;
        updatedAt = now;
      };
      matches.add(matchId, settled);
      settleMatch(matches, wallets, escrow, matchId, caller, now);
      let final = switch (matches.get(matchId)) {
        case (?m) m;
        case null { settled };
      };
      return #Success(final);
    };

    let updated : Types.Match = {
      match with
      gameState = newGameState;
      updatedAt = now;
    };
    matches.add(matchId, updated);
    #Success(updated)
  };

  // ---------------------------------------------------------------------------
  // Pseudo-RNG dice roll (1-6)
  // ---------------------------------------------------------------------------

  func rollDice(caller : UserId, salt : Nat) : Nat {
    let timeNow = Time.now();
    let t : Nat = if (timeNow >= 0) { timeNow.toNat() } else { ((-timeNow).toNat()) };
    let principalSize = caller.toBlob().size();
    let raw = (t + principalSize + salt) % 6;
    raw + 1  // 1-6
  };

  // ---------------------------------------------------------------------------
  // Make dice roll
  // ---------------------------------------------------------------------------

  public func makeDiceRoll(
    matches : Map.Map<Text, Types.Match>,
    wallets : Map.Map<UserId, Types.E8s>,
    escrow : Map.Map<Text, Types.E8s>,
    caller : UserId,
    matchId : Text,
    now : Types.Timestamp,
  ) : Types.MakeMoveResult {
    let match = switch (matches.get(matchId)) {
      case (?m) m;
      case null { return #NotFound };
    };

    switch (match.status) {
      case (#Active) {};
      case (_) { return #MatchNotActive };
    };

    let diceState = switch (match.gameState) {
      case (#DiceRoll(s)) s;
      case (_) { return #InvalidMove };
    };

    let player2 = switch (match.player2) {
      case (?p) p;
      case null { return #MatchNotActive };
    };

    let isPlayer1 = Principal.equal(match.player1.id, caller);
    let isPlayer2 = Principal.equal(player2.id, caller);

    if (not isPlayer1 and not isPlayer2) {
      return #NotYourTurn;
    };

    // Each player can only roll once
    if (isPlayer1) {
      switch (diceState.player1Roll) {
        case (?_) { return #InvalidMove }; // Already rolled
        case null {};
      };
    } else {
      switch (diceState.player2Roll) {
        case (?_) { return #InvalidMove }; // Already rolled
        case null {};
      };
    };

    let roll = rollDice(caller, if (isPlayer1) { 1 } else { 2 });

    let newDiceState = if (isPlayer1) {
      #DiceRoll {
        player1Roll = ?roll;
        player2Roll = diceState.player2Roll;
      }
    } else {
      #DiceRoll {
        player1Roll = diceState.player1Roll;
        player2Roll = ?roll;
      }
    };

    // Check if both have rolled
    let (p1Roll, p2Roll) = switch (newDiceState) {
      case (#DiceRoll(s)) {
        (s.player1Roll, s.player2Roll)
      };
      case (_) { (null, null) };
    };

    let updatedMatch : Types.Match = {
      match with
      gameState = newDiceState;
      updatedAt = now;
    };

    switch (p1Roll, p2Roll) {
      case (?r1, ?r2) {
        if (r1 == r2) {
          // Tie — reset both rolls
          let resetState : Types.GameState = #DiceRoll {
            player1Roll = null;
            player2Roll = null;
          };
          let reset : Types.Match = { updatedMatch with gameState = resetState };
          matches.add(matchId, reset);
          return #Success(reset);
        };

        let winnerId = if (r1 > r2) { match.player1.id } else { player2.id };
        let settled : Types.Match = {
          updatedMatch with
          status = #Completed;
          winnerId = ?winnerId;
        };
        matches.add(matchId, settled);
        settleMatch(matches, wallets, escrow, matchId, winnerId, now);
        let final = switch (matches.get(matchId)) {
          case (?m) m;
          case null { settled };
        };
        #Success(final)
      };
      case (_) {
        // Not both rolled yet
        matches.add(matchId, updatedMatch);
        #Success(updatedMatch)
      };
    }
  };

  // ---------------------------------------------------------------------------
  // RPS logic
  // ---------------------------------------------------------------------------

  // Returns: #win if choice1 beats choice2, #loss if choice2 beats choice1, #tie
  func rpsOutcome(choice1 : Text, choice2 : Text) : { #win; #loss; #tie } {
    if (choice1 == choice2) { return #tie };
    let c1wins =
      (choice1 == "rock"     and choice2 == "scissors") or
      (choice1 == "scissors" and choice2 == "paper")    or
      (choice1 == "paper"    and choice2 == "rock");
    if (c1wins) { #win } else { #loss }
  };

  // ---------------------------------------------------------------------------
  // Make RPS choice
  // ---------------------------------------------------------------------------

  public func makeRPSChoice(
    matches : Map.Map<Text, Types.Match>,
    wallets : Map.Map<UserId, Types.E8s>,
    escrow : Map.Map<Text, Types.E8s>,
    caller : UserId,
    matchId : Text,
    choice : Text,
    now : Types.Timestamp,
  ) : Types.MakeMoveResult {
    let match = switch (matches.get(matchId)) {
      case (?m) m;
      case null { return #NotFound };
    };

    switch (match.status) {
      case (#Active) {};
      case (_) { return #MatchNotActive };
    };

    let rpsState = switch (match.gameState) {
      case (#RPS(s)) s;
      case (_) { return #InvalidMove };
    };

    // Validate choice
    if (choice != "rock" and choice != "paper" and choice != "scissors") {
      return #InvalidMove;
    };

    let player2 = switch (match.player2) {
      case (?p) p;
      case null { return #MatchNotActive };
    };

    let isPlayer1 = Principal.equal(match.player1.id, caller);
    let isPlayer2 = Principal.equal(player2.id, caller);

    if (not isPlayer1 and not isPlayer2) {
      return #NotYourTurn;
    };

    // Each player can only submit once per round
    if (isPlayer1) {
      switch (rpsState.player1Choice) {
        case (?_) { return #InvalidMove };
        case null {};
      };
    } else {
      switch (rpsState.player2Choice) {
        case (?_) { return #InvalidMove };
        case null {};
      };
    };

    let newRPSState : Types.GameState = if (isPlayer1) {
      #RPS {
        player1Choice = ?choice;
        player2Choice = rpsState.player2Choice;
      }
    } else {
      #RPS {
        player1Choice = rpsState.player1Choice;
        player2Choice = ?choice;
      }
    };

    let updatedMatch : Types.Match = {
      match with
      gameState = newRPSState;
      updatedAt = now;
    };

    // Check if both submitted
    let (c1, c2) = switch (newRPSState) {
      case (#RPS(s)) (s.player1Choice, s.player2Choice);
      case (_) { (null, null) };
    };

    switch (c1, c2) {
      case (?ch1, ?ch2) {
        let outcome = rpsOutcome(ch1, ch2);
        switch (outcome) {
          case (#tie) {
            // Reset choices for a rematch round
            let resetState : Types.GameState = #RPS {
              player1Choice = null;
              player2Choice = null;
            };
            let reset : Types.Match = { updatedMatch with gameState = resetState };
            matches.add(matchId, reset);
            return #Success(reset);
          };
          case (#win) {
            // Player1 wins
            let settled : Types.Match = {
              updatedMatch with
              status = #Completed;
              winnerId = ?match.player1.id;
            };
            matches.add(matchId, settled);
            settleMatch(matches, wallets, escrow, matchId, match.player1.id, now);
            let final = switch (matches.get(matchId)) {
              case (?m) m;
              case null { settled };
            };
            return #Success(final);
          };
          case (#loss) {
            // Player2 wins
            let settled : Types.Match = {
              updatedMatch with
              status = #Completed;
              winnerId = ?player2.id;
            };
            matches.add(matchId, settled);
            settleMatch(matches, wallets, escrow, matchId, player2.id, now);
            let final = switch (matches.get(matchId)) {
              case (?m) m;
              case null { settled };
            };
            return #Success(final);
          };
        };
      };
      case (_) {
        matches.add(matchId, updatedMatch);
        #Success(updatedMatch)
      };
    }
  };

  // ---------------------------------------------------------------------------
  // Settle match — transfer escrowed funds to winner
  // ---------------------------------------------------------------------------

  public func settleMatch(
    matches : Map.Map<Text, Types.Match>,
    wallets : Map.Map<UserId, Types.E8s>,
    escrow : Map.Map<Text, Types.E8s>,
    matchId : Text,
    winnerId : UserId,
    now : Types.Timestamp,
  ) {
    let escrowed = switch (escrow.get(matchId)) {
      case (?e) e;
      case null { return };
    };

    // Transfer all escrowed funds to winner
    let winnerBalance = switch (wallets.get(winnerId)) {
      case (?b) b;
      case null { 0 };
    };
    wallets.add(winnerId, winnerBalance + escrowed);

    // Clear escrow
    escrow.remove(matchId);

    // Update match status to Completed with winnerId
    switch (matches.get(matchId)) {
      case (?m) {
        let completed : Types.Match = {
          m with
          status = #Completed;
          winnerId = ?winnerId;
          updatedAt = now;
        };
        matches.add(matchId, completed);
      };
      case null {};
    };
  };

  // ---------------------------------------------------------------------------
  // Cancel match
  // ---------------------------------------------------------------------------

  public func cancelMatch(
    matches : Map.Map<Text, Types.Match>,
    playerMatches : Map.Map<UserId, Text>,
    wallets : Map.Map<UserId, Types.E8s>,
    escrow : Map.Map<Text, Types.E8s>,
    caller : UserId,
    matchId : Text,
    now : Types.Timestamp,
  ) : ?Types.Match {
    let match = switch (matches.get(matchId)) {
      case (?m) m;
      case null { return null };
    };

    // Only allowed for WaitingForOpponent or WagerPending
    switch (match.status) {
      case (#WaitingForOpponent) {};
      case (#WagerPending) {};
      case (_) { return null };
    };

    // Only player1 or player2 can cancel
    let isPlayer1 = Principal.equal(match.player1.id, caller);
    let isPlayer2 = switch (match.player2) {
      case (?p) Principal.equal(p.id, caller);
      case null false;
    };

    if (not isPlayer1 and not isPlayer2) {
      return null;
    };

    // Refund if escrow was locked (WagerPending with both accepted scenario handled below)
    switch (escrow.get(matchId)) {
      case (?escrowed) {
        let half = escrowed / 2;
        let bal1 = switch (wallets.get(match.player1.id)) {
          case (?b) b;
          case null { 0 };
        };
        wallets.add(match.player1.id, bal1 + half);
        switch (match.player2) {
          case (?p2) {
            let bal2 = switch (wallets.get(p2.id)) {
              case (?b) b;
              case null { 0 };
            };
            wallets.add(p2.id, bal2 + half);
          };
          case null {};
        };
        escrow.remove(matchId);
      };
      case null {};
    };

    let cancelled : Types.Match = {
      match with
      status = #Cancelled;
      updatedAt = now;
    };
    matches.add(matchId, cancelled);

    // Remove from playerMatches
    playerMatches.remove(match.player1.id);
    switch (match.player2) {
      case (?p2) { playerMatches.remove(p2.id) };
      case null {};
    };

    ?cancelled
  };

  // ---------------------------------------------------------------------------
  // Chat
  // ---------------------------------------------------------------------------

  public func sendChatMessage(
    matchChats : Map.Map<Text, List.List<Types.ChatMessage>>,
    caller : UserId,
    matchId : Text,
    message : Text,
    now : Types.Timestamp,
  ) : Types.ChatMessage {
    let chatMsg : Types.ChatMessage = {
      matchId;
      senderId = caller;
      message;
      timestamp = now;
    };

    let chatList = switch (matchChats.get(matchId)) {
      case (?list) list;
      case null {
        let newList = List.empty<Types.ChatMessage>();
        matchChats.add(matchId, newList);
        newList;
      };
    };

    chatList.add(chatMsg);
    chatMsg
  };

  public func getMatchChat(
    matchChats : Map.Map<Text, List.List<Types.ChatMessage>>,
    matchId : Text,
  ) : [Types.ChatMessage] {
    switch (matchChats.get(matchId)) {
      case (?list) list.toArray();
      case null { [] };
    }
  };

  // ---------------------------------------------------------------------------
  // Lobby
  // ---------------------------------------------------------------------------

  public func listOpenMatches(matches : Map.Map<Text, Types.Match>) : [Types.Match] {
    matches.values()
      .filter(func(m) {
        switch (m.status) {
          case (#WaitingForOpponent) true;
          case (_) false;
        }
      })
      .toArray()
  };

  // ---------------------------------------------------------------------------
  // Online presence
  // ---------------------------------------------------------------------------

  // 30 seconds in nanoseconds
  let ONLINE_THRESHOLD_NS : Int = 30_000_000_000;

  public func heartbeat(
    onlinePlayers : Map.Map<UserId, Types.OnlinePlayer>,
    wallets : Map.Map<UserId, Types.E8s>,
    playerMatches : Map.Map<UserId, Text>,
    matches : Map.Map<Text, Types.Match>,
    caller : UserId,
    now : Types.Timestamp,
  ) : Types.OnlinePlayer {
    let balanceE8s = switch (wallets.get(caller)) {
      case (?b) b;
      case null { 0 };
    };

    // Determine status based on whether caller has active match
    let status : Types.PlayerStatus = switch (playerMatches.get(caller)) {
      case (?matchId) {
        switch (matches.get(matchId)) {
          case (?m) {
            switch (m.status) {
              case (#Active) #Playing;
              case (#WagerPending) #Playing;
              case (_) #Online;
            };
          };
          case null { #Online };
        };
      };
      case null { #Online };
    };

    let player : Types.OnlinePlayer = {
      id = caller;
      balanceE8s;
      status;
      lastSeen = now;
    };

    onlinePlayers.add(caller, player);
    player
  };

  public func getOnlinePlayers(
    onlinePlayers : Map.Map<UserId, Types.OnlinePlayer>,
    now : Types.Timestamp,
  ) : [Types.OnlinePlayer] {
    onlinePlayers.values()
      .filter(func(p) {
        (now - p.lastSeen) <= ONLINE_THRESHOLD_NS
      })
      .toArray()
  };
};
