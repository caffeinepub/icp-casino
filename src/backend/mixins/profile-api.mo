import CommonTypes "../types/common";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

mixin (profiles : Map.Map<CommonTypes.UserId, CommonTypes.UserProfile>) {

  // ---------------------------------------------------------------------------
  // Validation helpers
  // ---------------------------------------------------------------------------

  // Username must be 3-20 characters, alphanumeric + underscore only
  func isValidUsername(username : Text) : Bool {
    let len = username.size();
    if (len < 3 or len > 20) { return false };
    username.toArray().all(func(c : Char) : Bool {
      (c >= 'a' and c <= 'z') or
      (c >= 'A' and c <= 'Z') or
      (c >= '0' and c <= '9') or
      c == '_'
    })
  };

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /// Create or update the caller's profile.
  /// Username must be 3-20 chars, alphanumeric + underscore only.
  public shared ({ caller }) func setProfile(
    username : Text,
    avatarUrl : ?Text,
  ) : async { #ok; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Anonymous principals cannot set a profile");
    };
    if (not isValidUsername(username)) {
      return #err("Username must be 3-20 characters and contain only letters, numbers, or underscores");
    };

    // Check for username collision (another user already owns this username)
    let lowerUsername = username.toLower();
    let collision = profiles.values().find(func(p : CommonTypes.UserProfile) : Bool {
      not Principal.equal(p.userId, caller) and p.username.toLower() == lowerUsername
    });
    switch (collision) {
      case (?_) { return #err("Username is already taken") };
      case null {};
    };

    let now = Time.now();
    let existing = profiles.get(caller);
    let createdAt = switch (existing) {
      case (?p) p.createdAt;
      case null now;
    };

    let profile : CommonTypes.UserProfile = {
      userId = caller;
      username;
      avatarUrl;
      createdAt;
    };
    profiles.add(caller, profile);
    #ok
  };

  /// Fetch the profile for any user by their principal.
  public query func getProfile(userId : CommonTypes.UserId) : async ?CommonTypes.UserProfile {
    profiles.get(userId)
  };

  /// Fetch the caller's own profile.
  public query ({ caller }) func getMyProfile() : async ?CommonTypes.UserProfile {
    profiles.get(caller)
  };

  /// Returns true if the caller has already set a username.
  public query ({ caller }) func hasProfile() : async Bool {
    switch (profiles.get(caller)) {
      case (?_) true;
      case null false;
    }
  };
};
