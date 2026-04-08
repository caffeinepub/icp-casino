import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;

  public type LobbyChatMessage = {
    id : Text;
    senderId : UserId;
    senderName : Text;
    message : Text;
    timestamp : Timestamp;
  };
};
