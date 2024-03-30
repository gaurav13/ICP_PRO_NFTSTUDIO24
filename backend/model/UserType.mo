import Time "mo:base/Time";
import Int "mo:base/Int";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import ImageType "ImageType";
import Map "mo:base/HashMap";
import Principal "mo:base/Principal";

module UserType {
  type ImageObject = ImageType.ImageObject;
  type NewImageObject = ImageType.NewImageObject;
  public type UserId = ?Text;
  public type Id = Principal;

  public type Reward = {
    isClaimed : Bool;
    creation_time : Int;
    claimed_at : ?Int;
    amount : Nat;
  };
  public type Rewards = [Reward];
  public type EntryId = Text;
  public type Role = {
    #admin;
    #sub_admin;
    #user_admin;
    #article_admin;
    #authorized;
  };
  public type Permission = {
    #assign_role;
    #manage_user;
    #manage_article;
    #write;
  };
  public type User = {
    profileImg : ?NewImageObject;
    bannerImg : ?NewImageObject;
    name : ?Text;
    designation : ?Text;
    email : ?Text;
    website : ?Text;
    dob : ?Text;
    gender : ?Text;
    facebook : ?Text;
    twitter : ?Text;
    instagram : ?Text;
    linkedin : ?Text;
    authorInfo : ?Text;
    authorTitle : ?Text;
    authorDescription : ?Text;
    joinedFrom : Int;
    rewards : Rewards;
    role : Role;
    isVerified : Bool;
    isVerificationRequested : Bool;
    identificationImage : ?NewImageObject;
    isBlocked : Bool;
    isAdminBlocked : Bool;
  };
  public type ListUser = {
    name : ?Text;
    email : ?Text;
    joinedFrom : Int;
    isBlocked : Bool;
    isAdminBlocked : Bool;
    isVerified : Bool;
    isVerificationRequested : Bool;
    identificationImage : ?NewImageObject;
  };
  public type TopWinnerUserList = {
    profileImg : ?NewImageObject;
    name : Text;
    dob : ?Text;
    gender : ?Text;
    joinedFrom : Int;
    rewards : Rewards;
    totalReward : Int;
  };
  public type ListAdminUser = {
    name : ?Text;
    email : ?Text;
    joinedFrom : Int;
    role : Role;
    isBlocked : Bool;
    isAdminBlocked : Bool;

  };
  public type InputUser = {
    profileImg : ?NewImageObject;
    bannerImg : ?NewImageObject;
    name : Text;
    designation : Text;
    email : Text;
    website : Text;
    dob : Text;
    gender : Text;
    facebook : Text;
    twitter : Text;
    instagram : Text;
    linkedin : Text;
    authorInfo : Text;
    authorTitle : Text;
    authorDescription : Text;
  };
  public type Users = [(Id, User)];
  public type ListUsers = [(Id, ListUser)];
  public type ListAdminUsers = [(Id, ListAdminUser)];
  public type ActivityType = {
    #like;
    #comment;
    #subscribe;
    #create;
    #create_web3;
    #create_podcats;
    #like_web3;
    #promote;
    #delete_article;
    #delete_web3;
    #delete_podcats;
    #delete_pressRelease;
    #comment_podcats;
    #comment_pressRelease;
    #create_pressRelease;
  };
  public type AdminActivityType = {
    #block;
    #unBlock;
    #verify_user;
    #un_verify_user;
    #approve;
    #reject;
    #editViews;
    #delete_web3;
    #delete_category;
    #delete_article;
    #delete_podcats;
    #delete_pressRelease;
    #add_event;
    #delete_event;
    #edit_event;
    #add_category;
    #edit_category;
    #editWeb3Views;
    #edit_web3;
    #verify_web3;
  };
  public type SubAccount = Blob;
  public type Icrc1Timestamp = Nat64;
  public type Icrc1Tokens = Nat;
  public type Icrc1BlockIndex = Nat;

  public type Account = {
    owner : Principal;
    subaccount : ?SubAccount;
  };
  public type TransferFromArgs = {
    spender_subaccount : ?SubAccount;
    from : Account;
    to : Account;
    amount : Icrc1Tokens;
    fee : ?Icrc1Tokens;
    memo : ?Blob;
    created_at_time : ?Icrc1Timestamp;
  };
  public type TransferFromResult = {
    #Ok : Icrc1BlockIndex;
    #Err : TransferFromError;
  };

  public type TransferFromError = {
    #BadFee : { expected_fee : Icrc1Tokens };
    #BadBurn : { min_burn_amount : Icrc1Tokens };
    #InsufficientFunds : { balance : Icrc1Tokens };
    #InsufficientAllowance : { allowance : Icrc1Tokens };
    #TooOld;
    #CreatedInFuture : { ledger_time : Icrc1Timestamp };
    #Duplicate : { duplicate_of : Icrc1BlockIndex };
    #TemporarilyUnavailable;
    #GenericError : { error_code : Nat; message : Text };
  };

  public let MASTER_WALLET = "2r6rd-n6xpv-wfiro-ywtls-3ibbp-igmc4-z3a4z-skfas-on6b5-miuv7-dqe";
  public let PLATFORM_WALLET = "dyit4-wohf2-4sn5i-xxblj-3wrwx-ezij4-3lhdg-gur4r-br4ro-eqyvc-wae";
  public let ADMIN_WALLET = "bq5nc-mj5dn-hth7s-yxioz-eeaav-mbafa-lfv4p-27ccr-y7qfm-wslcl-fae";
};
