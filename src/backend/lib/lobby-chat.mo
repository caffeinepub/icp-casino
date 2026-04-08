import Types "../types/lobby-chat";
import CommonTypes "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  let MAX_MESSAGES : Nat = 100;

  /// Add a new message to the lobby chat list, trimming to the most recent MAX_MESSAGES.
  /// Resolves senderName from profiles map when available; falls back to provided senderName.
  public func addMessage(
    lobbyChat : List.List<Types.LobbyChatMessage>,
    profiles : Map.Map<CommonTypes.UserId, CommonTypes.UserProfile>,
    senderId : Types.UserId,
    senderName : Text,
    message : Text,
  ) : Types.LobbyChatMessage {
    let now = Time.now();
    let id = senderId.toText() # "-" # now.toText();

    // Prefer username from profile; fall back to provided senderName
    let resolvedName = switch (profiles.get(senderId)) {
      case (?p) p.username;
      case null senderName;
    };

    let msg : Types.LobbyChatMessage = {
      id;
      senderId;
      senderName = resolvedName;
      message;
      timestamp = now;
    };
    lobbyChat.add(msg);

    // Trim oldest messages if over the cap
    let size = lobbyChat.size();
    if (size > MAX_MESSAGES) {
      let excess = size - MAX_MESSAGES;
      // Collect the messages we want to keep (newest MAX_MESSAGES)
      let kept = lobbyChat.sliceToArray(excess, size);
      lobbyChat.clear();
      lobbyChat.addAll(kept.values());
    };

    msg;
  };

  /// Return all lobby chat messages as an immutable array.
  public func getMessages(
    lobbyChat : List.List<Types.LobbyChatMessage>
  ) : [Types.LobbyChatMessage] {
    lobbyChat.toArray();
  };
};
