import Types "../types/casino";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  // ---------------------------------------------------------------------------
  // Game Catalog
  // ---------------------------------------------------------------------------

  public func listGames(games : List.List<Types.Game>) : [Types.Game] {
    games.toArray()
  };

  public func listFeaturedGames(games : List.List<Types.Game>) : [Types.Game] {
    games.filter(func(g) { g.featured }).toArray()
  };

  public func getGame(games : List.List<Types.Game>, gameId : Nat) : ?Types.Game {
    games.find(func(g) { g.id == gameId })
  };

  public func listGamesByCategory(games : List.List<Types.Game>, category : Types.GameCategory) : [Types.Game] {
    games.filter(func(g) { g.category == category }).toArray()
  };

  // ---------------------------------------------------------------------------
  // Wallet
  // ---------------------------------------------------------------------------

  public func getBalance(wallets : Map.Map<Types.UserId, Types.E8s>, owner : Types.UserId) : Types.E8s {
    switch (wallets.get(owner)) {
      case (?bal) bal;
      case null { 0 };
    }
  };

  public func deposit(
    wallets : Map.Map<Types.UserId, Types.E8s>,
    owner : Types.UserId,
    amount : Types.E8s,
  ) : Types.E8s {
    let current = getBalance(wallets, owner);
    let newBalance = current + amount;
    wallets.add(owner, newBalance);
    newBalance
  };

  // ---------------------------------------------------------------------------
  // Transactions
  // ---------------------------------------------------------------------------

  public func getTransactions(
    transactions : Map.Map<Types.UserId, List.List<Types.Transaction>>,
    owner : Types.UserId,
    typeFilter : ?Types.TransactionType,
  ) : [Types.Transaction] {
    let txList = switch (transactions.get(owner)) {
      case (?list) list;
      case null { return [] };
    };
    switch (typeFilter) {
      case null { txList.toArray() };
      case (?filter) {
        txList.filter(func(tx) { tx.transactionType == filter }).toArray()
      };
    }
  };

  // ---------------------------------------------------------------------------
  // RNG helpers
  // ---------------------------------------------------------------------------

  // Pseudo-random seed from timestamp + principal blob size + betAmount.
  // Returns a value in [0, 99].
  func rngValue(caller : Types.UserId, betAmount : Types.E8s) : Nat {
    let timeNow = Time.now();
    let principalSize = caller.toBlob().size();
    // timeNow is Int (nanoseconds); take absolute value mod a large prime then add deterministic parts
    let t : Nat = if (timeNow >= 0) { timeNow.toNat() } else { ((-timeNow).toNat()) };
    (t + principalSize + betAmount) % 100
  };

  // Win threshold per category (out of 100).
  // Slots: 35%, TableGames: 45%, CardGames: 40%
  func winThreshold(category : Types.GameCategory) : Nat {
    switch (category) {
      case (#Slots)      { 35 };
      case (#TableGames) { 45 };
      case (#CardGames)  { 40 };
    }
  };

  // Payout multiplier (scaled by 100 to keep Nat math).
  // Slots 2.63x → 263; TableGames 2.04x → 204; CardGames 2.30x → 230
  func payoutMultiplier100(category : Types.GameCategory) : Nat {
    switch (category) {
      case (#Slots)      { 263 };
      case (#TableGames) { 204 };
      case (#CardGames)  { 230 };
    }
  };

  // ---------------------------------------------------------------------------
  // Transaction recording helper
  // ---------------------------------------------------------------------------

  func recordTx(
    transactions : Map.Map<Types.UserId, List.List<Types.Transaction>>,
    caller : Types.UserId,
    tx : Types.Transaction,
  ) {
    let txList = switch (transactions.get(caller)) {
      case (?list) list;
      case null {
        let newList = List.empty<Types.Transaction>();
        transactions.add(caller, newList);
        newList;
      };
    };
    txList.add(tx);
  };

  // ---------------------------------------------------------------------------
  // Generic placeBet — game-type-based win rates & payouts with ~8% house edge
  // ---------------------------------------------------------------------------

  public func placeBet(
    games : List.List<Types.Game>,
    wallets : Map.Map<Types.UserId, Types.E8s>,
    transactions : Map.Map<Types.UserId, List.List<Types.Transaction>>,
    nextTxId : Nat,
    caller : Types.UserId,
    req : Types.PlaceBetRequest,
  ) : (Types.PlaceBetResult, Nat) {
    // Validate game exists
    let game = switch (games.find(func(g) { g.id == req.gameId })) {
      case (?g) g;
      case null { return (#err("Game not found"), nextTxId) };
    };

    // Validate bet amount
    if (req.betAmount == 0) {
      return (#err("Bet amount must be greater than 0"), nextTxId);
    };

    // Check balance
    let balance = getBalance(wallets, caller);
    if (balance < req.betAmount) {
      return (#err("Insufficient balance"), nextTxId);
    };

    let rng = rngValue(caller, req.betAmount);
    let threshold = winThreshold(game.category);
    let isWin = rng < threshold;

    let timeNow = Time.now();

    let (netAmount, result, txType, newBalance) = if (isWin) {
      let mult = payoutMultiplier100(game.category);
      let payout : Nat = (req.betAmount * mult) / 100;
      let net : Int = (payout - req.betAmount).toInt();
      (net, "win", #Winning, balance - req.betAmount + payout)
    } else {
      let net : Int = -(req.betAmount.toInt());
      (net, "loss", #Bet, balance - req.betAmount)
    };

    wallets.add(caller, newBalance);

    let tx : Types.Transaction = {
      id = nextTxId;
      gameId = ?game.id;
      gameName = ?game.name;
      betAmount = req.betAmount;
      result = ?result;
      netAmount;
      timestamp = timeNow;
      transactionType = txType;
    };

    recordTx(transactions, caller, tx);

    (#ok({ transaction = tx; newBalance }), nextTxId + 1)
  };

  // ---------------------------------------------------------------------------
  // Lucky Sevens — Game ID 1, Slots, 35% win rate, ~8% house edge
  // Payouts: 1 ICP → 2.63 ICP, 3 ICP → 7.89 ICP, 5 ICP → 13.15 ICP
  // ---------------------------------------------------------------------------

  let LUCKY_SEVENS_GAME_ID : Nat = 1;
  let ICP_1 : Types.E8s = 100_000_000;
  let ICP_3 : Types.E8s = 300_000_000;
  let ICP_5 : Types.E8s = 500_000_000;

  // Win payouts in e8s (≈ betAmount × 2.63)
  func luckySevensPayout(betAmount : Types.E8s) : Types.E8s {
    if (betAmount == ICP_1)      { 263_000_000 }   // 2.63 ICP
    else if (betAmount == ICP_3) { 789_000_000 }   // 7.89 ICP
    else                         { 1_315_000_000 } // 13.15 ICP (5 ICP bet)
  };

  public func placeLuckySevensBet(
    games : List.List<Types.Game>,
    wallets : Map.Map<Types.UserId, Types.E8s>,
    transactions : Map.Map<Types.UserId, List.List<Types.Transaction>>,
    nextTxId : Nat,
    caller : Types.UserId,
    betAmount : Types.E8s,
  ) : (Types.PlaceBetResult, Nat) {
    // Only 1, 3, or 5 ICP allowed
    if (betAmount != ICP_1 and betAmount != ICP_3 and betAmount != ICP_5) {
      return (#err("Invalid bet amount. Lucky Sevens only accepts 1, 3, or 5 ICP bets"), nextTxId);
    };

    let game = switch (games.find(func(g) { g.id == LUCKY_SEVENS_GAME_ID })) {
      case (?g) g;
      case null { return (#err("Lucky Sevens game not found"), nextTxId) };
    };

    let balance = getBalance(wallets, caller);
    if (balance < betAmount) {
      return (#err("Insufficient balance"), nextTxId);
    };

    // 35% win rate (Slots threshold)
    let rng = rngValue(caller, betAmount);
    let isWin = rng < 35;

    let timeNow = Time.now();

    let (netAmount, result, txType, newBalance) = if (isWin) {
      let payout = luckySevensPayout(betAmount);
      let net : Int = (payout - betAmount).toInt();
      (net, "win", #Winning, balance - betAmount + payout)
    } else {
      let net : Int = -(betAmount.toInt());
      (net, "loss", #Bet, balance - betAmount)
    };

    wallets.add(caller, newBalance);

    let tx : Types.Transaction = {
      id = nextTxId;
      gameId = ?game.id;
      gameName = ?game.name;
      betAmount;
      result = ?result;
      netAmount;
      timestamp = timeNow;
      transactionType = txType;
    };

    recordTx(transactions, caller, tx);

    (#ok({ transaction = tx; newBalance }), nextTxId + 1)
  };

  // ---------------------------------------------------------------------------
  // Midnight Dragons — Game ID 13, Slots, 35% win rate, 2.63x payout (~8% edge)
  // ---------------------------------------------------------------------------

  let MIDNIGHT_DRAGONS_GAME_ID : Nat = 13;

  public func placeMidnightDragonsBet(
    games : List.List<Types.Game>,
    wallets : Map.Map<Types.UserId, Types.E8s>,
    transactions : Map.Map<Types.UserId, List.List<Types.Transaction>>,
    nextTxId : Nat,
    caller : Types.UserId,
    betAmount : Types.E8s,
  ) : (Types.PlaceBetResult, Nat) {
    if (betAmount == 0) {
      return (#err("Bet amount must be greater than 0"), nextTxId);
    };

    let game = switch (games.find(func(g) { g.id == MIDNIGHT_DRAGONS_GAME_ID })) {
      case (?g) g;
      case null { return (#err("Midnight Dragons game not found"), nextTxId) };
    };

    let balance = getBalance(wallets, caller);
    if (balance < betAmount) {
      return (#err("Insufficient balance"), nextTxId);
    };

    // 35% win rate with 2.63x payout → ~92% RTP / ~8% house edge
    let rng = rngValue(caller, betAmount);
    let isWin = rng < 35;

    let timeNow = Time.now();

    let (netAmount, result, txType, newBalance) = if (isWin) {
      let payout : Nat = (betAmount * 263) / 100;
      let net : Int = (payout - betAmount).toInt();
      (net, "win", #Winning, balance - betAmount + payout)
    } else {
      let net : Int = -(betAmount.toInt());
      (net, "loss", #Bet, balance - betAmount)
    };

    wallets.add(caller, newBalance);

    let tx : Types.Transaction = {
      id = nextTxId;
      gameId = ?game.id;
      gameName = ?game.name;
      betAmount;
      result = ?result;
      netAmount;
      timestamp = timeNow;
      transactionType = txType;
    };

    recordTx(transactions, caller, tx);

    (#ok({ transaction = tx; newBalance }), nextTxId + 1)
  };

  // ---------------------------------------------------------------------------
  // Seed data — all games set to houseEdge=8.0, rtp=92.0
  // ---------------------------------------------------------------------------

  public func seedGames(games : List.List<Types.Game>) {
    if (not games.isEmpty()) { return };

    let catalog : [Types.Game] = [
      // Slots — 35% win rate, 2.63x payout, ~8% house edge
      { id = 1;  name = "Lucky Sevens";      category = #Slots;      rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/lucky7/400/300";         playerCount = 1240; featured = true  },
      { id = 2;  name = "Golden Fortune";    category = #Slots;      rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/goldfort/400/300";       playerCount = 987;  featured = true  },
      { id = 3;  name = "Neon Nights";       category = #Slots;      rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/neonnights/400/300";     playerCount = 756;  featured = false },
      { id = 4;  name = "Diamond Rush";      category = #Slots;      rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/diamondrush/400/300";    playerCount = 1102; featured = false },
      { id = 5;  name = "Wild Safari";       category = #Slots;      rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/wildsafari/400/300";     playerCount = 642;  featured = false },
      { id = 6;  name = "Space Odyssey";     category = #Slots;      rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/spaceodyssey/400/300";   playerCount = 889;  featured = true  },
      // Table Games — 45% win rate, 2.04x payout, ~8% house edge
      { id = 7;  name = "Roulette Royale";   category = #TableGames; rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/roulette/400/300";       playerCount = 520;  featured = true  },
      { id = 8;  name = "Baccarat Classic";  category = #TableGames; rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/baccarat/400/300";       playerCount = 315;  featured = false },
      { id = 9;  name = "Craps Deluxe";      category = #TableGames; rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/crapsdeluxe/400/300";    playerCount = 278;  featured = false },
      // Card Games — 40% win rate, 2.30x payout, ~8% house edge
      { id = 10; name = "Blackjack Pro";     category = #CardGames;  rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/blackjackpro/400/300";   playerCount = 1875; featured = true  },
      { id = 11; name = "Texas Hold'em";     category = #CardGames;  rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/texasholdem/400/300";    playerCount = 1430; featured = false },
      { id = 12; name = "Three Card Poker";  category = #CardGames;  rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/threecardpoker/400/300"; playerCount = 563;  featured = false },
      // Midnight Dragons — Slots, 35% win rate, 2.63x payout, ~8% house edge
      { id = 13; name = "Midnight Dragons";  category = #Slots;      rtp = 92.0; houseEdge = 8.0; imageUrl = "https://picsum.photos/seed/midnightdragons/400/300"; playerCount = 734; featured = true  },
    ];

    for (game in catalog.values()) {
      games.add(game);
    };
  };
};
