import Types "../types/lobby-chat";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  let MAX_MESSAGES : Nat = 100;

  /// Add a new message to the lobby chat list, trimming to the most recent MAX_MESSAGES.
  public func addMessage(
    lobbyChat : List.List<Types.LobbyChatMessage>,
    senderId : Types.UserId,
    senderName : Text,
    message : Text,
  ) : Types.LobbyChatMessage {
    let now = Time.now();
    let id = senderId.toText() # "-" # now.toText();
    let msg : Types.LobbyChatMessage = {
      id;
      senderId;
      senderName;
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
