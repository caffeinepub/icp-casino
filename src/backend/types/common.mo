module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type E8s = Nat; // ICP in e8s (1 ICP = 100_000_000 e8s)

  public type UserProfile = {
    userId : UserId;
    username : Text;
    avatarUrl : ?Text;
    createdAt : Timestamp;
  };
};
