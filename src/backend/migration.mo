import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "types/common";
import VersusTypes "types/versus";
import LobbyChatTypes "types/lobby-chat";
import CasinoTypes "types/casino";

module {
  // --- Old types (from .old/src/backend) defined inline ---

  type OldUserId = CommonTypes.UserId;
  type OldE8s = CommonTypes.E8s;
  type OldTimestamp = CommonTypes.Timestamp;

  type OldPlayerStatus = {
    #Online;
    #Playing;
    #Offline;
  };

  // Old OnlinePlayer — without username and avatarUrl
  type OldOnlinePlayer = {
    id : OldUserId;
    balanceE8s : OldE8s;
    status : OldPlayerStatus;
    lastSeen : OldTimestamp;
  };

  type OldActor = {
    onlinePlayers : Map.Map<OldUserId, OldOnlinePlayer>;
  };

  type NewActor = {
    onlinePlayers : Map.Map<CommonTypes.UserId, VersusTypes.OnlinePlayer>;
  };

  public func run(old : OldActor) : NewActor {
    let onlinePlayers = old.onlinePlayers.map<OldUserId, OldOnlinePlayer, VersusTypes.OnlinePlayer>(
      func(id, p) : VersusTypes.OnlinePlayer {
        {
          p with
          username = null : ?Text;
          avatarUrl = null : ?Text;
        }
      }
    );
    { onlinePlayers };
  };
};
