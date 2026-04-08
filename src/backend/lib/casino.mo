import Types "../types/casino";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  let DEFAULT_BALANCE : Types.E8s = 1_000_000_000_000; // 10_000 ICP in e8s

  // --- Game Catalog ---

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

  // --- Wallet ---

  public func getBalance(wallets : Map.Map<Types.UserId, Types.E8s>, owner : Types.UserId) : Types.E8s {
    switch (wallets.get(owner)) {
      case (?bal) bal;
      case null {
        wallets.add(owner, DEFAULT_BALANCE);
        DEFAULT_BALANCE;
      };
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

  // --- Transactions ---

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

    // Simulate win/loss — use time-based pseudo-random (50% chance)
    let timeNow = Time.now();
    let isWin = (timeNow % 2) == 0;

    let (netAmount, result, txType, newBalance) = if (isWin) {
      let winnings : Nat = req.betAmount * 2;
      let net : Int = req.betAmount.toInt();
      (net, "win", #Winning, balance - req.betAmount + winnings)
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

    let txList = switch (transactions.get(caller)) {
      case (?list) list;
      case null {
        let newList = List.empty<Types.Transaction>();
        transactions.add(caller, newList);
        newList;
      };
    };
    txList.add(tx);

    (#ok(tx), nextTxId + 1)
  };

  // --- Seed data ---

  public func seedGames(games : List.List<Types.Game>) {
    if (not games.isEmpty()) { return };

    let catalog : [Types.Game] = [
      // Slots (6 games)
      { id = 1; name = "Lucky Sevens"; category = #Slots; rtp = 96.5; houseEdge = 3.5; imageUrl = "https://picsum.photos/seed/lucky7/400/300"; playerCount = 1240; featured = true },
      { id = 2; name = "Golden Fortune"; category = #Slots; rtp = 95.8; houseEdge = 4.2; imageUrl = "https://picsum.photos/seed/goldfort/400/300"; playerCount = 987; featured = true },
      { id = 3; name = "Neon Nights"; category = #Slots; rtp = 97.1; houseEdge = 2.9; imageUrl = "https://picsum.photos/seed/neonnights/400/300"; playerCount = 756; featured = false },
      { id = 4; name = "Diamond Rush"; category = #Slots; rtp = 96.0; houseEdge = 4.0; imageUrl = "https://picsum.photos/seed/diamondrush/400/300"; playerCount = 1102; featured = false },
      { id = 5; name = "Wild Safari"; category = #Slots; rtp = 95.5; houseEdge = 4.5; imageUrl = "https://picsum.photos/seed/wildsafari/400/300"; playerCount = 642; featured = false },
      { id = 6; name = "Space Odyssey"; category = #Slots; rtp = 97.3; houseEdge = 2.7; imageUrl = "https://picsum.photos/seed/spaceodyssey/400/300"; playerCount = 889; featured = true },
      // Table Games (3 games)
      { id = 7; name = "Roulette Royale"; category = #TableGames; rtp = 97.3; houseEdge = 2.7; imageUrl = "https://picsum.photos/seed/roulette/400/300"; playerCount = 520; featured = true },
      { id = 8; name = "Baccarat Classic"; category = #TableGames; rtp = 98.9; houseEdge = 1.1; imageUrl = "https://picsum.photos/seed/baccarat/400/300"; playerCount = 315; featured = false },
      { id = 9; name = "Craps Deluxe"; category = #TableGames; rtp = 98.6; houseEdge = 1.4; imageUrl = "https://picsum.photos/seed/crapsdeluxe/400/300"; playerCount = 278; featured = false },
      // Card Games (3 games)
      { id = 10; name = "Blackjack Pro"; category = #CardGames; rtp = 99.5; houseEdge = 0.5; imageUrl = "https://picsum.photos/seed/blackjackpro/400/300"; playerCount = 1875; featured = true },
      { id = 11; name = "Texas Hold'em"; category = #CardGames; rtp = 98.0; houseEdge = 2.0; imageUrl = "https://picsum.photos/seed/texasholdem/400/300"; playerCount = 1430; featured = false },
      { id = 12; name = "Three Card Poker"; category = #CardGames; rtp = 96.7; houseEdge = 3.3; imageUrl = "https://picsum.photos/seed/threecardpoker/400/300"; playerCount = 563; featured = false },
    ];

    for (game in catalog.values()) {
      games.add(game);
    };
  };
};
