// Import base modules
import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import ImageType "../model/ImageType";
import UserType "../model/UserType";
// import LEDGER "canister:icp_ledger_canister";
import EntryStoreHelper "../helper/EntryStoreHelper";
shared ({ caller = initializer }) actor class () {

  private let MAX_USERS = 1_000;
  private let MAX_NAME_CHARS = 40;
  private let MAX_TITLE_CHARS = 60;
  private let MAX_DESIGNATION_CHARS = 100;
  private let MAX_BIO_CHARS = 500;
  private let MAX_LINK_CHARS = 2048;
  private let MAX_EMAIL_CHARS = 320;
  //
  type SubAccount = UserType.SubAccount;
  type Icrc1Timestamp = UserType.Icrc1Timestamp;
  type Icrc1Tokens = UserType.Icrc1Tokens;
  type Icrc1BlockIndex = UserType.Icrc1BlockIndex;

  type Account = UserType.Account;
  type TransferFromArgs = UserType.TransferFromArgs;
  type TransferFromResult = UserType.TransferFromResult;

  type TransferFromError = UserType.TransferFromError;
  //

  type ImageObject = ImageType.ImageObject;
  type NewImageObject = ImageType.NewImageObject;
  type Reward = UserType.Reward;
  type Rewards = UserType.Rewards;
  type AdminActivityType = UserType.AdminActivityType;

  public type Role = UserType.Role;
  public type Permission = UserType.Permission;
  public type User = UserType.User;
  public type ListUser = UserType.ListUser;
  public type TopWinnerUserList = UserType.TopWinnerUserList;
  public type InputUser = UserType.InputUser;
  public type UserId = UserType.UserId;
  public type Id = UserType.Id;
  type Users = UserType.Users;
  type ListUsers = UserType.ListUsers;
  type ListAdminUser = UserType.ListAdminUser;
  private var sectek = "#cosa@erwe0ss1s<e}s*dfCc<e>c!dwa)<vvde>";

  stable var stable_users : Users = [];
  stable var oneNFT24Coin : Nat = 100000;
  var userStorage = Map.fromIter<Id, User>(stable_users.vals(), stable_users.size(), Principal.equal, Principal.hash);
  var GAS_FEE = 10000;
  var MIN_REWARD = GAS_FEE * 3;
  let E8S : Nat = 100000000;
  let MASTER_WALLET = UserType.MASTER_WALLET;

  func emailExists(email : Text) : Bool {
    // let users = Map.HashMap.entries<Id, User>(userStorage);
    for ((_, user) : (Id, User) in userStorage.entries()) {
      switch (user.email) {
        case (?userEmail) {
          if (userEmail == email) {
            return true;
          };
        };
        case null {};
      };
    };
    return false;
  };
  public shared ({ caller }) func add_user() : async Result.Result<(Text, User), Text> {
    // Return error if the user already exists
    assert not Principal.isAnonymous(caller);
    let oldUser = userStorage.get(caller);
    if (oldUser != null) {
      let user = userStorage.get(caller);
      switch user {
        case (?iuser) {
          return #ok("Already a User", iuser);
        };
        case (null) {
          return #err("Error while getting user");
        };
      };
    };
    let currentTime = Time.now();
    let lastFourDigits = currentTime % 10000; // This gives us the last four digits
    let textNumber = Int.toText(lastFourDigits);
    let result = "User" # textNumber;
    // Create new user with default name
    var tempUser = {
      profileImg = null;
      bannerImg = null;
      name = ?result;
      designation = null;
      email = null;
      website = null;
      dob = null;
      gender = null;
      facebook = null;
      twitter = null;
      instagram = null;
      linkedin = null;
      authorInfo = null;
      authorTitle = null;
      authorDescription = null;
      joinedFrom = (Time.now() / 1000000);
      rewards = [];
      role = #authorized;
      isBlocked = false;
      isAdminBlocked = false;
      isVerified = false;
      isVerificationRequested = false;
      identificationImage = null;

      // subscribers = ?0;
    };

    userStorage.put(caller, tempUser);
    return #ok("User added successfuly", tempUser);
  };
  // Check if the user exists
  func is_user(caller : Principal) : ?User {
    assert not Principal.isAnonymous(caller);
    let user = userStorage.get(caller);
    switch (user) {
      case (?isUser) {
        assert not isUser.isBlocked;
      };
      case (null) {

      };
    };

    return user;
  };
  // Check if the user has permission
  func has_permission(pal : Principal, perm : Permission) : Bool {
    let isUser = userStorage.get(pal);
    // if(Principal.isController(pal)){
    //   return true;
    // };
    switch (isUser) {
      case (?user) {
        let role = user.role;
        switch (role, perm) {
          case (#admin, _) true;
          case (#sub_admin, #write or #manage_user or #manage_article) true;
          case (#user_admin, #manage_user or #write) true;
          case (#article_admin, #manage_article or #write) true;
          case (#authorized, #write) true;
          case (_, _) false;
        };
      };
      case (null) {
        return false;
      };
    };

  };
  // Reject unauthorized user identities
  func require_permission(pal : Principal, perm : Permission) : Bool {
    if (has_permission(pal, perm) == false) {
      // throw Error.reject("unauthorized");
      return false;
    } else {
      return true;
    };
  };
  //
  public query ({ caller }) func entry_require_permission(pal : Principal, perm : Permission) : async Bool {
    assert Principal.isController(caller);

    if (has_permission(pal, perm) == false) {
      return false;
    } else {
      return true;
    };
  };
  // Assign a new role to a principal
  public shared ({ caller }) func assign_role(assignee : Principal, name : Text, new_role : Role) : async Result.Result<(Text, User), Text> {
    assert require_permission(caller, #assign_role);

    switch new_role {
      case (#admin) {
        throw Error.reject("Errror");
      };
      case (_) {};
    };
    // if (assignee == initializer) {
    //   throw Error.reject("Cannot assign a role to the canister owner");
    // };
    let isOldUser = userStorage.get(assignee);

    switch (isOldUser) {
      case (?oldUser) {
        if (oldUser.isBlocked) {
          return #err("This user is blocked");
        };
        let user = userStorage.get(assignee);
        switch user {
          case (?iuser) {
            if (iuser.role == #admin) {
              return #err("Error");
            };
            var tempUser = {
              profileImg = iuser.profileImg;
              bannerImg = iuser.bannerImg;
              name = ?name;
              designation = iuser.designation;
              email = iuser.email;
              website = iuser.website;
              dob = iuser.dob;
              gender = iuser.gender;
              facebook = iuser.facebook;
              twitter = iuser.twitter;
              instagram = iuser.instagram;
              linkedin = iuser.linkedin;
              authorInfo = iuser.authorInfo;
              authorTitle = iuser.authorTitle;
              authorDescription = iuser.authorDescription;
              joinedFrom = iuser.joinedFrom;
              rewards = iuser.rewards;
              role = new_role;
              isBlocked = iuser.isBlocked;
              isAdminBlocked = iuser.isAdminBlocked;
              isVerified = iuser.isVerified;
              isVerificationRequested = iuser.isVerificationRequested;
              identificationImage = iuser.identificationImage;
              // subscribers = ?0;
            };

            userStorage.put(assignee, tempUser);
            return #ok("Successfuly", tempUser);
          };
          case (null) {
            return #err("Error");
          };
        };
      };
      case (null) {};

    };
    // let lastFourDigits = currentTime % 10000; // This gives us the last four digits
    // let textNumber = Int.toText(lastFourDigits);
    // let result = "User" # textNumber;
    // Create new user with default name
    var tempUser = {
      profileImg = null;
      bannerImg = null;
      name = ?name;
      designation = null;
      email = null;
      website = null;
      dob = null;
      gender = null;
      facebook = null;
      twitter = null;
      instagram = null;
      linkedin = null;
      authorInfo = null;
      authorTitle = null;
      authorDescription = null;
      joinedFrom = (Time.now() / 1000000);
      rewards = [];
      role = new_role;
      isBlocked = false;
      isAdminBlocked = false;
      isVerified = false;
      isVerificationRequested = false;
      identificationImage = null;
      // subscribers = ?0;
    };

    userStorage.put(assignee, tempUser);
    return #ok("User added successfuly", tempUser);

    // roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, new_role).0;
    // role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0;
  };
  public shared ({ caller }) func make_admin(assignee : Principal, new_role : Role) : async Bool {
    assert Principal.isController(caller);
    let isOldUser = userStorage.get(assignee);
    if (isOldUser != null) {
      switch (isOldUser) {
        case (?oldUser) {
          if (oldUser.isBlocked) {
            return false;
          };
        };
        case (null) {

        };
      };
      let user = userStorage.get(assignee);
      switch user {
        case (?iuser) {
          var tempUser = {
            profileImg = iuser.profileImg;
            bannerImg = iuser.bannerImg;
            name = iuser.name;
            designation = iuser.designation;
            email = iuser.email;
            website = iuser.website;
            dob = iuser.dob;
            gender = iuser.gender;
            facebook = iuser.facebook;
            twitter = iuser.twitter;
            instagram = iuser.instagram;
            linkedin = iuser.linkedin;
            authorInfo = iuser.authorInfo;
            authorTitle = iuser.authorTitle;
            authorDescription = iuser.authorDescription;
            joinedFrom = iuser.joinedFrom;
            rewards = iuser.rewards;
            role = new_role;
            isBlocked = iuser.isBlocked;
            isAdminBlocked = iuser.isAdminBlocked;
            isVerified = iuser.isVerified;
            isVerificationRequested = iuser.isVerificationRequested;
            identificationImage = iuser.identificationImage;
            // subscribers = ?0;
          };

          userStorage.put(assignee, tempUser);
          return true;
        };
        case (null) {
          return false;
        };
      };
    };
    let lastFourDigits = Time.now() % 10000; // This gives us the last four digits
    let textNumber = Int.toText(lastFourDigits);
    let result = "User" # textNumber;
    // Create new user with default name
    var tempUser = {
      profileImg = null;
      bannerImg = null;
      name = ?result;
      designation = null;
      email = null;
      website = null;
      dob = null;
      gender = null;
      facebook = null;
      twitter = null;
      instagram = null;
      linkedin = null;
      authorInfo = null;
      authorTitle = null;
      authorDescription = null;
      joinedFrom = (Time.now() / 1000000);
      rewards = [];
      role = new_role;
      isBlocked = false;
      isAdminBlocked = false;
      isVerified = false;
      isVerificationRequested = false;
      identificationImage = null;
      // subscribers = ?0;
    };

    userStorage.put(assignee, tempUser);
    return true;

  };
  // artificial reward
  public shared ({ caller }) func give_reward(userId : Id, givenReward : Nat, isMenual : Bool) : async Bool {
    assert require_permission(caller, #assign_role);

    let isOldUser = userStorage.get(userId);
    if (isOldUser != null) {
      switch (isOldUser) {
        case (?oldUser) {
          if (oldUser.isBlocked) {
            return false;
          };
        };
        case (null) {

        };
      };
      let user = userStorage.get(userId);
      switch user {
        case (?iuser) {
          var tempIsClaimed = true;
          if (isMenual) {
            tempIsClaimed := false;
          };
          var tempReward : Reward = {
            isClaimed = tempIsClaimed;
            creation_time = Time.now() / 1000000;
            claimed_at = ?(Time.now() / 1000000);
            amount = givenReward;
          };
          let oldRewards = iuser.rewards;

          let newRewards : Rewards = Array.append(oldRewards, [tempReward]);

          var tempUser = {
            profileImg = iuser.profileImg;
            bannerImg = iuser.bannerImg;
            name = iuser.name;
            designation = iuser.designation;
            email = iuser.email;
            website = iuser.website;
            dob = iuser.dob;
            gender = iuser.gender;
            facebook = iuser.facebook;
            twitter = iuser.twitter;
            instagram = iuser.instagram;
            linkedin = iuser.linkedin;
            authorInfo = iuser.authorInfo;
            authorTitle = iuser.authorTitle;
            authorDescription = iuser.authorDescription;
            joinedFrom = iuser.joinedFrom;
            rewards = newRewards;
            role = iuser.role;
            isBlocked = iuser.isBlocked;
            isAdminBlocked = iuser.isAdminBlocked;
            isVerified = iuser.isVerified;
            isVerificationRequested = iuser.isVerificationRequested;
            identificationImage = iuser.identificationImage;
            // subscribers = ?0;

          };

          userStorage.put(userId, tempUser);
          return true;
        };
        case (null) {
          return false;
        };
      };
    } else {
      return true;

    };

  };
  public func check_user_exists(caller : Principal) : async Bool {
    let user = userStorage.get(caller);
    switch (user) {
      case (?isUser) {
        assert not isUser.isBlocked;
      };
      case (null) {

      };
    };
    return user != null;
  };

  public query ({ caller }) func get_authorized_users(search : Text, startIndex : Nat, length : Nat) : async {
    users : [(Id, ListUser)];
    amount : Nat;
  } {
    assert require_permission(caller, #manage_user);
    let users : Users = [];
    var usersList = Map.HashMap<Id, ListUser>(0, Principal.equal, Principal.hash);
    for ((id, user) in userStorage.entries()) {
      let listUser : ListUser = {
        name = user.name;
        email = user.email;
        joinedFrom = user.joinedFrom;
        isBlocked = user.isBlocked;
        isAdminBlocked = user.isAdminBlocked;
        isVerified = user.isVerified;
        isVerificationRequested = user.isVerificationRequested;
        identificationImage = user.identificationImage;
      };
      switch (user.role) {
        // case (#admin or #sub_admin or #user_admin) {
        case (#authorized) {
          usersList.put(id, listUser);
        };
        case (_) {
          // return #err("UnAuthorized");
        };
      };
    };
    return EntryStoreHelper.searchSortUserList(usersList, search, startIndex, length);

  };
  public query ({ caller }) func get_subAdmin_users(search : Text, startIndex : Nat, length : Nat) : async {
    users : [(Id, ListAdminUser)];
    amount : Nat;
  } {
    // var usersList = Map.HashMap<Id, ListUser>(0, Principal.equal, Principal.hash);
    // for ((id, user) in userStorage.entries()) {
    //   let listUser : ListUser = {
    //     name = user.name;
    //     email = user.email;
    //     joinedFrom = user.joinedFrom;
    //     isBlocked = user.isBlocked;
    //   };
    //   switch (user.role) {
    //     case (#sub_admin or #user_admin or #article_admin) {
    //       usersList.put(id, listUser);
    //     };
    //     case (_) {
    //       // return #err("UnAuthorized");
    //     };
    //   };
    // };
    // let usersArray = Iter.toArray(usersList.entries());
    // return #ok("Successfully", usersArray);
    assert require_permission(caller, #assign_role);

    let users : Users = [];
    var usersList = Map.HashMap<Id, ListAdminUser>(0, Principal.equal, Principal.hash);
    for ((id, user) in userStorage.entries()) {
      let listUser : ListAdminUser = {
        name = user.name;
        email = user.email;
        joinedFrom = user.joinedFrom;
        role = user.role;
        isBlocked = user.isBlocked;
        isAdminBlocked = user.isAdminBlocked;
      };
      switch (user.role) {
        // case (#admin or #sub_admin or #user_admin) {
        case (#sub_admin or #user_admin or #article_admin) {
          usersList.put(id, listUser);
        };
        case (_) {
          // return #err("UnAuthorized");
        };
      };
    };
    return EntryStoreHelper.searchSortAdminUserList(usersList, search, startIndex, length);
  };
  func totalReward(ary : [Reward]) : Nat {
    var totalReward = 0;
    for (entry in ary.vals()) {

      totalReward += entry.amount;

    };

    return totalReward;
  };
  public query ({ caller }) func get_winner_users(search : Text, startIndex : Nat, length : Nat) : async {
    users : [(Id, TopWinnerUserList)];
    amount : Nat;
  } {

    let users : Users = [];
    var usersList = Map.HashMap<Id, TopWinnerUserList>(0, Principal.equal, Principal.hash);
    for ((id, user) in userStorage.entries()) {
      var tempTotalreward = totalReward(user.rewards);

      var tempName : Text = "";
      //  if(user.name !=null){
      //  };
      switch (user.name) {
        case (?isname) {
          tempName := isname;

        };
        case (null) {

        };
      };
      let listUser : TopWinnerUserList = {
        name = tempName;
        joinedFrom = user.joinedFrom;
        role = user.role;
        isBlocked = user.isBlocked;
        isAdminBlocked = user.isAdminBlocked;
        dob = user.dob;
        profileImg = user.profileImg;
        gender = user.gender;
        rewards = user.rewards;
        totalReward = tempTotalreward;
      };

      usersList.put(id, listUser);

    };
    return EntryStoreHelper.sortTopWinner(usersList, search, startIndex, length);
  };
  // Get User details by the caller
  public query ({ caller }) func get_user_details(userId : UserId) : async Result.Result<(Text, User, Bool), Text> {
    // assert is_user(userId) != null;
    var userPrincipal : Principal = caller;
    switch userId {
      case (?isUserId) {
        userPrincipal := Principal.fromText(isUserId);
        let user = userStorage.get(userPrincipal);

        switch user {
          case (?iuser) {
            return #ok("User get by id Successful", iuser, userPrincipal == caller);
          };
          case (null) {
            return #err("User not found");

          };
        };
      };
      case (null) {
        let user = userStorage.get(caller);

        switch user {
          case (?iuser) {
            return #ok("User get by Caller Successful", iuser, true);
          };
          case (null) {
            return #err("User not found");

          };
        };

      };
    };

    // let user = userStorage.get(caller);

    return #err("Something went wrong while getting user");
  };
  public query func get_user_name(userId : Principal) : async ?{
    name : ?Text;
    image : ?NewImageObject;
  } {
    // assert is_user(userId) != null;

    let user = userStorage.get(userId);

    switch user {
      case (?iuser) {
        return ?{
          name = iuser.name;
          image = iuser.profileImg;
        };
      };
      case (null) {
        return null;

      };
    };

    // let user = userStorage.get(caller);

  };
  public query func get_user_email(userId : Principal) : async ?{
    email : ?Text;
  } {
    // assert is_user(userId) != null;

    let user = userStorage.get(userId);

    switch user {
      case (?iuser) {
        return ?{
          email = iuser.email;

        };
      };
      case (null) {
        return null;

      };
    };

    // let user = userStorage.get(caller);

  };
  public query func get_user_name_only(userId : Principal) : async ?Text {
    let user = userStorage.get(userId);
    switch user {
      case (?iuser) {
        return iuser.name;

      };
      case (null) {
        return null;
      };
    };

  };
  public shared ({ caller }) func block_user(userId : Text, commentCanisterId : Text) : async Result.Result<(Text, User), Text> {
    assert require_permission(caller, #manage_user);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let userPrincipal = Principal.fromText(userId);
    let maybeUser = is_user(userPrincipal);
    switch (maybeUser) {

      case (?user) {
        var tempUser = {
          name = user.name;
          designation = user.designation;
          email = user.email;
          website = user.website;
          dob = user.dob;
          gender = user.gender;
          facebook = user.facebook;
          twitter = user.twitter;
          instagram = user.instagram;
          linkedin = user.linkedin;
          authorInfo = user.authorInfo;
          authorTitle = user.authorTitle;
          authorDescription = user.authorDescription;
          profileImg = user.profileImg;
          bannerImg = user.bannerImg;
          joinedFrom = user.joinedFrom;
          rewards = user.rewards;
          role = user.role;
          // block the user
          isBlocked = true;
          isAdminBlocked = user.isAdminBlocked;
          isVerified = user.isVerified;
          isVerificationRequested = user.isVerificationRequested;
          identificationImage = user.identificationImage;
        };
        // tempUser.isBlocked := true;
        let oldUser = userStorage.replace(userPrincipal, tempUser);
        var tempname = "";

        switch (user.name) {
          case (?isname) {
            tempname := isname;

          };
          case (null) {

          };
        };
        let activitied = commentCanister.addAdminActivity(caller, userId, #block, tempname);

        return #ok("User blocked", tempUser);
      };
      case (null) {
        return #err("Erroe while blocking");
      };
    };

  };
  public shared ({ caller }) func block_sub_admin(userId : Text, commentCanisterId : Text) : async Result.Result<(Text, User), Text> {
    assert require_permission(caller, #assign_role);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let userPrincipal = Principal.fromText(userId);
    let maybeUser = is_user(userPrincipal);
    switch (maybeUser) {

      case (?user) {
        switch (user.role) {
          case (#admin) {
            return #err("Not Allowed");
          };
          case (_) {

          };
        };

        var tempUser = {
          name = user.name;
          designation = user.designation;
          email = user.email;
          website = user.website;
          dob = user.dob;
          gender = user.gender;
          facebook = user.facebook;
          twitter = user.twitter;
          instagram = user.instagram;
          linkedin = user.linkedin;
          authorInfo = user.authorInfo;
          authorTitle = user.authorTitle;
          authorDescription = user.authorDescription;
          profileImg = user.profileImg;
          bannerImg = user.bannerImg;
          joinedFrom = user.joinedFrom;
          rewards = user.rewards;
          role = user.role;
          // block the user
          isBlocked = user.isBlocked;
          isAdminBlocked = true;
          isVerified = user.isVerified;
          isVerificationRequested = user.isVerificationRequested;
          identificationImage = user.identificationImage;
        };
        // tempUser.isBlocked := true;
        let oldUser = userStorage.replace(userPrincipal, tempUser);
        var tempname = "";

        switch (user.name) {
          case (?isname) {
            tempname := isname;

          };
          case (null) {

          };
        };
        let activitied = commentCanister.addAdminActivity(caller, userId, #block, tempname);

        return #ok("Sub_admin successfully blocked", tempUser);
      };
      case (null) {
        return #err("Error while blocking");
      };
    };

  };
  public shared ({ caller }) func unBlock_sub_admin(userId : Text, commentCanisterId : Text) : async Result.Result<(Text, User), Text> {
    assert require_permission(caller, #assign_role);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let userPrincipal = Principal.fromText(userId);
    let maybeUser = userStorage.get(userPrincipal);
    switch (maybeUser) {
      case (?user) {
        switch (user.role) {
          case (#admin) {
            return #err("Not Allowed.");
          };
          case (_) {

          };
        };

        var tempUser = {
          name = user.name;
          designation = user.designation;
          email = user.email;
          website = user.website;
          dob = user.dob;
          gender = user.gender;
          facebook = user.facebook;
          twitter = user.twitter;
          instagram = user.instagram;
          linkedin = user.linkedin;
          authorInfo = user.authorInfo;
          authorTitle = user.authorTitle;
          authorDescription = user.authorDescription;
          profileImg = user.profileImg;
          bannerImg = user.bannerImg;
          joinedFrom = user.joinedFrom;
          rewards = user.rewards;
          role = user.role;
          // block the user
          isBlocked = user.isBlocked;
          isAdminBlocked = false;
          isVerified = user.isVerified;
          isVerificationRequested = user.isVerificationRequested;
          identificationImage = user.identificationImage;
        };
        // tempUser.isBlocked := true;
        let oldUser = userStorage.replace(userPrincipal, tempUser);
        var tempname = "";

        switch (user.name) {
          case (?isname) {
            tempname := isname;

          };
          case (null) {

          };
        };
        let activitied = commentCanister.addAdminActivity(caller, userId, #unBlock, tempname);
        return #ok("Sub_admin_Unblocked", tempUser);
      };
      case (null) {
        return #err("Erroe while unBlocking");
      };
    };

  };
  public shared ({ caller }) func unBlock_user(userId : Text, commentCanisterId : Text) : async Result.Result<(Text, User), Text> {
    assert require_permission(caller, #manage_user);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let userPrincipal = Principal.fromText(userId);
    let maybeUser = userStorage.get(userPrincipal);
    switch (maybeUser) {
      case (?user) {

        var tempUser = {
          name = user.name;
          designation = user.designation;
          email = user.email;
          website = user.website;
          dob = user.dob;
          gender = user.gender;
          facebook = user.facebook;
          twitter = user.twitter;
          instagram = user.instagram;
          linkedin = user.linkedin;
          authorInfo = user.authorInfo;
          authorTitle = user.authorTitle;
          authorDescription = user.authorDescription;
          profileImg = user.profileImg;
          bannerImg = user.bannerImg;
          joinedFrom = user.joinedFrom;
          rewards = user.rewards;
          role = user.role;
          // block the user
          isBlocked = false;
          isAdminBlocked = user.isAdminBlocked;
          isVerified = user.isVerified;
          isVerificationRequested = user.isVerificationRequested;
          identificationImage = user.identificationImage;
        };
        // tempUser.isBlocked := true;
        let oldUser = userStorage.replace(userPrincipal, tempUser);
        var tempname = "";

        switch (user.name) {
          case (?isname) {
            tempname := isname;

          };
          case (null) {

          };
        };
        let activitied = commentCanister.addAdminActivity(caller, userId, #unBlock, tempname);
        return #ok("User Unblocked", tempUser);
      };
      case (null) {
        return #err("Erroe while unBlocking");
      };
    };

  };

  // Edit User details by the caller
  public shared ({ caller }) func update_user(user : InputUser, entryCanisterId : Text) : async Result.Result<(Text, User, ?User), Text> {
    let entryCanister = actor (entryCanisterId) : actor {
      updateUserEntries : (userId : Principal, userName : Text) -> async Bool;
    };
    let oldUser = is_user(caller);
    assert oldUser != null;
    var tempRewareds : Rewards = [];
    var tempRole : Role = #authorized;
    var tempBlocked = false;
    var tempisAdminBlocked = false;
    switch (oldUser) {
      case (?isOldUser) {

        tempRewareds := isOldUser.rewards;
        tempRole := isOldUser.role;
        tempBlocked := isOldUser.isBlocked;
        tempisAdminBlocked := isOldUser.isAdminBlocked;

        if (tempBlocked) {
          return #err("error while updating profile");
        };
        switch (isOldUser.email) {
          case (?email) {
            if (user.email != email) {
              let isEmail = emailExists(user.email);
              if (isEmail) {
                return #err("Email Already Exists");

              };
            };
          };
          case (null) {};
        };
      };
      case (null) {
        return #err("error while updating user");
      };
    };

    // var tempName = "";
    // var tempBio = "";
    // var tempExternalLink = "";
    // var tempTwitter = "";
    // var tempEmail = "";
    var tempName = "";
    var tempDesignation = "";
    var tempEmail = "";
    var tempWebsite = "";
    var tempDob = "";
    var tempGender = "";
    var tempFacebook = "";
    var tempTwitter = "";
    var tempInstagram = "";
    var tempLinekdin = "";
    var tempAuthorInfo = "";
    var tempAuthorTitle = "";
    var tempAuthorDescription = "";
    var tempProfileImg : ?NewImageObject = null;
    var tempBannerImg : ?NewImageObject = null;
    var tempJoinedFrom : Int = 0;
    var tempVerified : Bool = false;
    var tempVerificationRequested : Bool = false;
    var tempidentificationImage : ?NewImageObject = null;

    // assert user.bio.size() <= MAX_BIO_CHARS;
    // tempBio := user.bio;
    // assert user.externalLink.size() <= MAX_LINK_CHARS;
    // tempExternalLink := user.externalLink;
    assert user.name.size() <= MAX_NAME_CHARS;
    assert user.name.size() >= 1;
    tempName := user.name;
    assert user.designation.size() <= MAX_DESIGNATION_CHARS;
    tempDesignation := user.designation;

    assert user.email.size() <= MAX_EMAIL_CHARS;
    tempEmail := user.email;

    assert user.website.size() <= MAX_LINK_CHARS;
    tempWebsite := user.website;

    assert user.dob.size() <= MAX_NAME_CHARS;
    tempDob := user.dob;

    assert user.gender.size() <= MAX_NAME_CHARS;
    tempGender := user.gender;

    assert user.facebook.size() <= MAX_LINK_CHARS;
    tempFacebook := user.facebook;

    assert user.twitter.size() <= MAX_LINK_CHARS;
    tempTwitter := user.twitter;

    assert user.instagram.size() <= MAX_LINK_CHARS;
    tempInstagram := user.instagram;

    assert user.linkedin.size() <= MAX_LINK_CHARS;
    tempLinekdin := user.linkedin;

    assert user.authorInfo.size() <= MAX_BIO_CHARS;
    tempAuthorInfo := user.authorInfo;

    assert user.authorTitle.size() <= MAX_TITLE_CHARS;
    tempAuthorTitle := user.authorTitle;

    assert user.authorDescription.size() <= MAX_BIO_CHARS;
    tempAuthorDescription := user.authorDescription;

    if (user.bannerImg != null) {
      tempBannerImg := user.bannerImg;

    } else {
      switch (oldUser) {
        case (?isUser) {
          tempBannerImg := isUser.bannerImg;
        };
        case (null) {};

      };
    };
    if (user.profileImg != null) {
      tempProfileImg := user.profileImg;
    } else {
      switch (oldUser) {
        case (?isUser) {
          tempProfileImg := isUser.profileImg;
        };
        case (null) {

        };

      };
    };

    switch oldUser {
      case (?isUser) {
        tempJoinedFrom := isUser.joinedFrom;
        tempVerified := isUser.isVerified;
        tempVerificationRequested := isUser.isVerificationRequested;
        tempidentificationImage := isUser.identificationImage;
        // let oldname = isUser.name;
        switch (isUser.name) {
          case (?oldname) {
            let isOldname = Text.notEqual(oldname, tempName);

            if (isOldname) {

              let result = entryCanister.updateUserEntries(caller, tempName);
            };
          };
          case (null) {

          };
        };

      };
      case (null) {
        return #err("Error while updating joined date");
      };
    };

    var tempUser = {
      name = ?tempName;
      designation = ?tempDesignation;
      email = ?tempEmail;
      website = ?tempWebsite;
      dob = ?tempDob;
      gender = ?tempGender;
      facebook = ?tempFacebook;
      twitter = ?tempTwitter;
      instagram = ?tempInstagram;
      linkedin = ?tempLinekdin;
      authorInfo = ?tempAuthorInfo;
      authorTitle = ?tempAuthorTitle;
      authorDescription = ?tempAuthorDescription;
      profileImg = tempProfileImg;
      bannerImg = tempBannerImg;
      joinedFrom = tempJoinedFrom;
      rewards = tempRewareds;
      role = tempRole;
      isBlocked = tempBlocked;
      isAdminBlocked = tempisAdminBlocked;
      isVerified = tempVerified;
      isVerificationRequested = tempVerificationRequested;
      identificationImage = tempidentificationImage;
    };
    let beforeUser = userStorage.replace(caller, tempUser);
    return #ok("User Updated Successfuly", tempUser, beforeUser)

  };
  // Edit User details by the admin
  public shared ({ caller }) func admin_update_user(userId : Id, user : InputUser, entryCanisterId : Text) : async Result.Result<(Text, User, ?User), Text> {
    let oldUser = is_user(userId);
    assert require_permission(caller, #assign_role);
    let entryCanister = actor (entryCanisterId) : actor {
      updateUserEntries : (userId : Principal, userName : Text) -> async Bool;
    };
    assert oldUser != null;
    var tempRewareds : Rewards = [];
    var tempRole : Role = #authorized;
    var tempBlocked = false;
    var tempisAdminBlocked = false;
    switch (oldUser) {
      case (?isOldUser) {

        tempRewareds := isOldUser.rewards;
        tempRole := isOldUser.role;
        tempBlocked := isOldUser.isBlocked;
        tempisAdminBlocked := isOldUser.isAdminBlocked;

        if (tempBlocked) {
          return #err("error while updating profile");
        };
        switch (isOldUser.email) {
          case (?email) {
            if (user.email != email) {
              let isEmail = emailExists(user.email);
              if (isEmail) {
                return #err("Email Already Exists");

              };
            };
          };
          case (null) {};
        };
      };
      case (null) {
        return #err("error while updating user");
      };
    };

    // var tempName = "";
    // var tempBio = "";
    // var tempExternalLink = "";
    // var tempTwitter = "";
    // var tempEmail = "";
    var tempName = "";
    var tempDesignation = "";
    var tempEmail = "";
    var tempWebsite = "";
    var tempDob = "";
    var tempGender = "";
    var tempFacebook = "";
    var tempTwitter = "";
    var tempInstagram = "";
    var tempLinekdin = "";
    var tempAuthorInfo = "";
    var tempAuthorTitle = "";
    var tempAuthorDescription = "";
    var tempProfileImg : ?NewImageObject = null;
    var tempBannerImg : ?NewImageObject = null;
    var tempJoinedFrom : Int = 0;
    var tempVerified : Bool = false;
    var tempVerificationRequested : Bool = false;
    var tempidentificationImage : ?NewImageObject = null;
    // assert user.bio.size() <= MAX_BIO_CHARS;
    // tempBio := user.bio;
    // assert user.externalLink.size() <= MAX_LINK_CHARS;
    // tempExternalLink := user.externalLink;
    assert user.name.size() <= MAX_NAME_CHARS;
    assert user.name.size() >= 1;
    tempName := user.name;
    assert user.designation.size() <= MAX_DESIGNATION_CHARS;
    tempDesignation := user.designation;

    assert user.email.size() <= MAX_EMAIL_CHARS;
    tempEmail := user.email;

    assert user.website.size() <= MAX_LINK_CHARS;
    tempWebsite := user.website;

    assert user.dob.size() <= MAX_NAME_CHARS;
    tempDob := user.dob;

    assert user.gender.size() <= MAX_NAME_CHARS;
    tempGender := user.gender;

    assert user.facebook.size() <= MAX_LINK_CHARS;
    tempFacebook := user.facebook;

    assert user.twitter.size() <= MAX_LINK_CHARS;
    tempTwitter := user.twitter;

    assert user.instagram.size() <= MAX_LINK_CHARS;
    tempInstagram := user.instagram;

    assert user.linkedin.size() <= MAX_LINK_CHARS;
    tempLinekdin := user.linkedin;

    assert user.authorInfo.size() <= MAX_BIO_CHARS;
    tempAuthorInfo := user.authorInfo;

    assert user.authorTitle.size() <= MAX_TITLE_CHARS;
    tempAuthorTitle := user.authorTitle;

    assert user.authorDescription.size() <= MAX_BIO_CHARS;
    tempAuthorDescription := user.authorDescription;

    if (user.bannerImg != null) {
      tempBannerImg := user.bannerImg;

    } else {
      switch (oldUser) {
        case (?isUser) {
          tempBannerImg := isUser.bannerImg;
        };
        case (null) {};

      };
    };
    if (user.profileImg != null) {
      tempProfileImg := user.profileImg;
    } else {
      switch (oldUser) {
        case (?isUser) {
          tempProfileImg := isUser.profileImg;
        };
        case (null) {

        };

      };
    };

    switch oldUser {
      case (?isUser) {
        tempJoinedFrom := isUser.joinedFrom;
        tempVerified := isUser.isVerified;
        tempVerificationRequested := isUser.isVerificationRequested;
        tempidentificationImage := isUser.identificationImage;
        switch (isUser.name) {
          case (?oldname) {
            let isOldname = Text.notEqual(oldname, tempName);

            if (isOldname) {

              let result = entryCanister.updateUserEntries(userId, tempName);
            };
          };
          case (null) {

          };
        };
      };
      case (null) {
        return #err("Error while updating joined date");
      };
    };

    var tempUser = {
      name = ?tempName;
      designation = ?tempDesignation;
      email = ?tempEmail;
      website = ?tempWebsite;
      dob = ?tempDob;
      gender = ?tempGender;
      facebook = ?tempFacebook;
      twitter = ?tempTwitter;
      instagram = ?tempInstagram;
      linkedin = ?tempLinekdin;
      authorInfo = ?tempAuthorInfo;
      authorTitle = ?tempAuthorTitle;
      authorDescription = ?tempAuthorDescription;
      profileImg = tempProfileImg;
      bannerImg = tempBannerImg;
      joinedFrom = tempJoinedFrom;
      rewards = tempRewareds;
      role = tempRole;
      isBlocked = tempBlocked;
      isAdminBlocked = tempisAdminBlocked;
      isVerified = tempVerified;
      isVerificationRequested = tempVerificationRequested;
      identificationImage = tempidentificationImage;
    };
    let beforeUser = userStorage.replace(userId, tempUser);
    return #ok("User Updated Successfuly", tempUser, beforeUser)

  };
  public query ({ caller }) func get_users(search : Text, status : Bool, startIndex : Nat, length : Nat) : async {
    users : [(Id, ListUser)];
    amount : Nat;
  } {
    assert require_permission(caller, #manage_user);
    let users : Users = [];
    var usersList = Map.HashMap<Id, ListUser>(0, Principal.equal, Principal.hash);
    for ((id, user) in userStorage.entries()) {
      let listUser : ListUser = {
        name = user.name;
        email = user.email;
        joinedFrom = user.joinedFrom;
        isBlocked = user.isBlocked;
        isAdminBlocked = user.isAdminBlocked;
        isVerified = user.isVerified;
        isVerificationRequested = user.isVerificationRequested;
        identificationImage = user.identificationImage;
      };
      if (status == user.isVerified and user.isVerificationRequested) {
        usersList.put(id, listUser);
      };
    };
    return EntryStoreHelper.searchSortUserList(usersList, search, startIndex, length);

  };
  public shared ({ caller }) func request_verification(identitificationImage : NewImageObject) : async Result.Result<(Text, User, ?User), Text> {
    let oldUser = is_user(caller);
    assert oldUser != null;
    let request = true;
    let identityImage = identitificationImage;

    switch (oldUser) {
      case (?user) {

        var tempUser = {
          name = user.name;
          designation = user.designation;
          email = user.email;
          website = user.website;
          dob = user.dob;
          gender = user.gender;
          facebook = user.facebook;
          twitter = user.twitter;
          instagram = user.instagram;
          linkedin = user.linkedin;
          authorInfo = user.authorInfo;
          authorTitle = user.authorTitle;
          authorDescription = user.authorDescription;
          profileImg = user.profileImg;
          bannerImg = user.bannerImg;
          joinedFrom = user.joinedFrom;
          rewards = user.rewards;
          role = user.role;
          isBlocked = user.isBlocked;
          isAdminBlocked = user.isAdminBlocked;
          isVerified = user.isVerified;
          isVerificationRequested = request;
          identificationImage = ?identityImage;
        };
        // tempUser.isBlocked := true
        let oldUser = userStorage.replace(caller, tempUser);
        return #ok("Verification Requested", tempUser, oldUser);
      };
      case (null) {
        return #err("Erroe while requesting verification");
      };
    };
  };
  public shared ({ caller }) func verify_user(userId : Text, commentCanisterId : Text) : async Result.Result<(Text, User, ?User), Text> {
    let userPrincipal = Principal.fromText(userId);
    let oldUser = is_user(userPrincipal);
    assert require_permission(caller, #manage_user);
    assert oldUser != null;
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let maybeUser = userStorage.get(userPrincipal);
    let verified = true;

    switch (maybeUser) {
      case (?user) {
        var tempUser = {
          name = user.name;
          designation = user.designation;
          email = user.email;
          website = user.website;
          dob = user.dob;
          gender = user.gender;
          facebook = user.facebook;
          twitter = user.twitter;
          instagram = user.instagram;
          linkedin = user.linkedin;
          authorInfo = user.authorInfo;
          authorTitle = user.authorTitle;
          authorDescription = user.authorDescription;
          profileImg = user.profileImg;
          bannerImg = user.bannerImg;
          joinedFrom = user.joinedFrom;
          rewards = user.rewards;
          role = user.role;
          isBlocked = user.isBlocked;
          isAdminBlocked = user.isAdminBlocked;
          isVerified = verified;
          isVerificationRequested = user.isVerificationRequested;
          identificationImage = user.identificationImage;
        };
        // tempUser.isBlocked := true
        let oldUser = userStorage.replace(userPrincipal, tempUser);
        var tempname = "";

        switch (user.name) {
          case (?isname) {
            tempname := isname;

          };
          case (null) {

          };
        };
        let activitied = commentCanister.addAdminActivity(caller, userId, #verify_user, tempname);
        return #ok("User Verified", tempUser, oldUser);
      };
      case (null) {
        return #err("Erroe while verfifying");
      };
    };
    // let beforeUser = userStorage.replace(userId, tempUser);
    // return #ok("User Updated Successfuly", tempUser, beforeUser)

  };
  public shared ({ caller }) func un_verify_user(userId : Text, commentCanisterId : Text) : async Result.Result<(Text, User, ?User), Text> {
    let userPrincipal = Principal.fromText(userId);
    let oldUser = is_user(userPrincipal);
    assert require_permission(caller, #manage_user);
    assert oldUser != null;
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let maybeUser = userStorage.get(userPrincipal);
    let verified = false;

    switch (maybeUser) {
      case (?user) {
        var tempUser = {
          name = user.name;
          designation = user.designation;
          email = user.email;
          website = user.website;
          dob = user.dob;
          gender = user.gender;
          facebook = user.facebook;
          twitter = user.twitter;
          instagram = user.instagram;
          linkedin = user.linkedin;
          authorInfo = user.authorInfo;
          authorTitle = user.authorTitle;
          authorDescription = user.authorDescription;
          profileImg = user.profileImg;
          bannerImg = user.bannerImg;
          joinedFrom = user.joinedFrom;
          rewards = user.rewards;
          role = user.role;
          isBlocked = user.isBlocked;
          isAdminBlocked = user.isAdminBlocked;
          isVerified = false;
          isVerificationRequested = false;
          identificationImage = null;
        };
        // tempUser.isBlocked := true
        let oldUser = userStorage.replace(userPrincipal, tempUser);
        var tempname = "";

        switch (user.name) {
          case (?isname) {
            tempname := isname;

          };
          case (null) {

          };
        };
        let activitied = commentCanister.addAdminActivity(caller, userId, #un_verify_user, tempname);
        return #ok("User UnVerified", tempUser, oldUser);
      };
      case (null) {
        return #err("Erroe while verfifying");
      };
    };
    // let beforeUser = userStorage.replace(userId, tempUser);
    // return #ok("User Updated Successfuly", tempUser, beforeUser)

  };
  public shared ({ caller }) func add_reward(user : Principal, like_reward : Nat) : async Bool {
    assert Principal.isController(caller);
    let oldUser = is_user(user);
    assert oldUser != null;

    switch (oldUser) {
      case (?isUser) {
        let oldRewards = isUser.rewards;
        let newReward : Reward = {
          creation_time = Time.now() / 1000000;
          isClaimed = false;
          claimed_at = null;
          amount = like_reward;
        };
        let newRewards : Rewards = Array.append(oldRewards, [newReward]);
        var tempUser = {
          name = isUser.name;
          designation = isUser.designation;
          email = isUser.email;
          website = isUser.website;
          dob = isUser.dob;
          gender = isUser.gender;
          facebook = isUser.facebook;
          twitter = isUser.twitter;
          instagram = isUser.instagram;
          linkedin = isUser.linkedin;
          authorInfo = isUser.authorInfo;
          authorTitle = isUser.authorTitle;
          authorDescription = isUser.authorDescription;
          profileImg = isUser.profileImg;
          bannerImg = isUser.bannerImg;
          joinedFrom = isUser.joinedFrom;
          rewards = newRewards;
          role = isUser.role;
          isBlocked = isUser.isBlocked;
          isAdminBlocked = isUser.isAdminBlocked;
          isVerified = isUser.isVerified;
          isVerificationRequested = isUser.isVerificationRequested;
          identificationImage = isUser.identificationImage;
        };
        let newEntry = userStorage.replace(user, tempUser);
        return true;
      };
      case (null) {
        return false;

      };
    };
  };
  public shared ({ caller }) func claim_rewards(entryCanisterId : Text) : async Bool {

    let oldUser = is_user(caller);
    assert oldUser != null;
    assert not Principal.isAnonymous(caller);
    switch (oldUser) {
      case (?isUser) {
        if (not isUser.isVerified) {
          Debug.print(debug_show ("66", "rewardToGive"));

          return false;
        };
      };
      case (null) {
        Debug.print(debug_show ("88", "rewardToGive"));

        return false;
      };
    };
    let LEDGER = actor "ryjl3-tyaaa-aaaaa-aaaba-cai" : actor {
      icrc2_transfer_from : (TransferFromArgs) -> async (TransferFromResult);
    };
    let entryCanister = actor (entryCanisterId) : actor {
      get_like_reward : () -> async Nat;
    };
    let rich = Principal.fromText(MASTER_WALLET);

    // let rich = Principal.fromText("dmy7a-ywgp6-wkwqw-rplzc-lbaqc-5ppsv-6och2-yh2mg-tnn4y-yz4su-lae");
    var likes = await entryCanister.get_like_reward();
    var count : Nat = 0;
    var claimableAmount : Nat = 0;
    // Debug.print(debug_show (dem));
    func claim_reward(reward : Reward) : Reward {
      if (reward.isClaimed) {
        return reward;
      } else {
        var newReward : Reward = {
          creation_time = reward.creation_time;
          isClaimed = true;
          claimed_at = ?(Time.now() / 1000000);
          amount = reward.amount;
        };
        count := count + 1;
        claimableAmount := claimableAmount + reward.amount;
        // newReward.isClaimed := false;
        return newReward;
      };
    };
    switch (oldUser) {
      case (?isUser) {
        let oldRewards = isUser.rewards;
        let ttt : Nat = 100_011_600;

        var newRewards = Array.map<Reward, Reward>(oldRewards, claim_reward);
        var totalICP : Nat = (claimableAmount * oneNFT24Coin);


        if (totalICP < MIN_REWARD) {
          newRewards := oldRewards;
        };
        var tempUser = {
          name = isUser.name;
          designation = isUser.designation;
          email = isUser.email;
          website = isUser.website;
          dob = isUser.dob;
          gender = isUser.gender;
          facebook = isUser.facebook;
          twitter = isUser.twitter;
          instagram = isUser.instagram;
          linkedin = isUser.linkedin;
          authorInfo = isUser.authorInfo;
          authorTitle = isUser.authorTitle;
          authorDescription = isUser.authorDescription;
          profileImg = isUser.profileImg;
          bannerImg = isUser.bannerImg;
          joinedFrom = isUser.joinedFrom;
          rewards = newRewards;
          role = isUser.role;
          isBlocked = isUser.isBlocked;
          isAdminBlocked = isUser.isAdminBlocked;
          isVerified = isUser.isVerified;
          isVerificationRequested = isUser.isVerificationRequested;
          identificationImage = isUser.identificationImage;
        };
        if (totalICP >= MIN_REWARD) {
          let newEntry = userStorage.replace(caller, tempUser);
          newRewards := oldRewards;

          let gasFee = 10000;

          let rewardToGive = totalICP - gasFee;

          if (rewardToGive <= 0) {
            return false;
          };
          let dem = await LEDGER.icrc2_transfer_from({
            amount = rewardToGive;
            created_at_time = null;
            fee = ?gasFee;
            from = { owner = rich; subaccount = null };
            memo = null;
            spender_subaccount = null;
            to = { owner = caller; subaccount = null };
          });
          return true;
        } else {
          return false;
        };

      };
      case (null) {
        return false;

      };
    };
  };

  public shared ({ caller }) func update_NFT24Coin(inputReward : Nat) : async Bool {
    assert not Principal.isAnonymous(caller);

    assert await entry_require_permission(caller, #assign_role);
    assert inputReward > 0;
    assert inputReward <= E8S;

    var oneCoinVal = E8S / inputReward;
    oneNFT24Coin := oneCoinVal;
    return true;
  };
  public query ({ caller }) func get_NFT24Coin() : async Nat {
    assert not Principal.isAnonymous(caller);
    return oneNFT24Coin;
  };

  system func preupgrade() {
    stable_users := Iter.toArray(userStorage.entries());

  };
  system func postupgrade() {
    userStorage := Map.fromIter<Id, User>(stable_users.vals(), stable_users.size(), Principal.equal, Principal.hash);
    stable_users := [];
  };
};
