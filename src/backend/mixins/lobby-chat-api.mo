import Types "../types/lobby-chat";
import CommonTypes "../types/common";
import LobbyChatLib "../lib/lobby-chat";
import List "mo:core/List";
import Map "mo:core/Map";

mixin (
  lobbyChat : List.List<Types.LobbyChatMessage>,
  profiles : Map.Map<CommonTypes.UserId, CommonTypes.UserProfile>,
) {

  /// Store a new message in the global lobby chat.
  /// Username is resolved automatically from the profiles map.
  public shared ({ caller }) func sendLobbyChatMessage(
    message : Text,
    senderName : Text,
  ) : async Types.LobbyChatMessage {
    LobbyChatLib.addMessage(lobbyChat, profiles, caller, senderName, message);
  };

  /// Return all stored lobby chat messages.
  public query func getLobbyChatMessages() : async [Types.LobbyChatMessage] {
    LobbyChatLib.getMessages(lobbyChat);
  };
};
