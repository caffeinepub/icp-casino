import Types "../types/lobby-chat";
import LobbyChatLib "../lib/lobby-chat";
import List "mo:core/List";

mixin (lobbyChat : List.List<Types.LobbyChatMessage>) {

  /// Store a new message in the global lobby chat.
  public shared ({ caller }) func sendLobbyChatMessage(
    message : Text,
    senderName : Text,
  ) : async Types.LobbyChatMessage {
    LobbyChatLib.addMessage(lobbyChat, caller, senderName, message);
  };

  /// Return all stored lobby chat messages.
  public query func getLobbyChatMessages() : async [Types.LobbyChatMessage] {
    LobbyChatLib.getMessages(lobbyChat);
  };
};
