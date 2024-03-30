import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Id = Principal;
export interface InputUser {
  'dob' : string,
  'authorDescription' : string,
  'linkedin' : string,
  'twitter' : string,
  'instagram' : string,
  'name' : string,
  'designation' : string,
  'authorInfo' : string,
  'email' : string,
  'website' : string,
  'facebook' : string,
  'gender' : string,
  'bannerImg' : [] | [NewImageObject],
  'authorTitle' : string,
  'profileImg' : [] | [NewImageObject],
}
export interface ListAdminUser {
  'isAdminBlocked' : boolean,
  'isBlocked' : boolean,
  'name' : [] | [string],
  'role' : Role,
  'email' : [] | [string],
  'joinedFrom' : bigint,
}
export interface ListUser {
  'isVerificationRequested' : boolean,
  'isAdminBlocked' : boolean,
  'isBlocked' : boolean,
  'name' : [] | [string],
  'email' : [] | [string],
  'isVerified' : boolean,
  'joinedFrom' : bigint,
  'identificationImage' : [] | [NewImageObject],
}
export type NewImageObject = string;
export type NewImageObject__1 = string;
export type Permission = { 'assign_role' : null } |
  { 'manage_user' : null } |
  { 'manage_article' : null } |
  { 'write' : null };
export type Result = { 'ok' : [string, User, [] | [User]] } |
  { 'err' : string };
export type Result_1 = { 'ok' : [string, User] } |
  { 'err' : string };
export type Result_2 = { 'ok' : [string, User, boolean] } |
  { 'err' : string };
export interface Reward {
  'creation_time' : bigint,
  'claimed_at' : [] | [bigint],
  'isClaimed' : boolean,
  'amount' : bigint,
}
export type Rewards = Array<Reward>;
export type Role = { 'admin' : null } |
  { 'article_admin' : null } |
  { 'authorized' : null } |
  { 'user_admin' : null } |
  { 'sub_admin' : null };
export type Role__1 = { 'admin' : null } |
  { 'article_admin' : null } |
  { 'authorized' : null } |
  { 'user_admin' : null } |
  { 'sub_admin' : null };
export interface TopWinnerUserList {
  'dob' : [] | [string],
  'name' : string,
  'joinedFrom' : bigint,
  'gender' : [] | [string],
  'rewards' : Rewards,
  'totalReward' : bigint,
  'profileImg' : [] | [NewImageObject],
}
export interface User {
  'dob' : [] | [string],
  'authorDescription' : [] | [string],
  'linkedin' : [] | [string],
  'twitter' : [] | [string],
  'isVerificationRequested' : boolean,
  'isAdminBlocked' : boolean,
  'instagram' : [] | [string],
  'isBlocked' : boolean,
  'name' : [] | [string],
  'designation' : [] | [string],
  'authorInfo' : [] | [string],
  'role' : Role,
  'email' : [] | [string],
  'website' : [] | [string],
  'facebook' : [] | [string],
  'isVerified' : boolean,
  'joinedFrom' : bigint,
  'gender' : [] | [string],
  'rewards' : Rewards,
  'identificationImage' : [] | [NewImageObject],
  'bannerImg' : [] | [NewImageObject],
  'authorTitle' : [] | [string],
  'profileImg' : [] | [NewImageObject],
}
export type UserId = [] | [string];
export interface anon_class_22_1 {
  'add_reward' : ActorMethod<[Principal, bigint], boolean>,
  'add_user' : ActorMethod<[], Result_1>,
  'admin_update_user' : ActorMethod<[Id, InputUser, string], Result>,
  'assign_role' : ActorMethod<[Principal, string, Role__1], Result_1>,
  'block_sub_admin' : ActorMethod<[string, string], Result_1>,
  'block_user' : ActorMethod<[string, string], Result_1>,
  'check_user_exists' : ActorMethod<[Principal], boolean>,
  'claim_rewards' : ActorMethod<[string], boolean>,
  'entry_require_permission' : ActorMethod<[Principal, Permission], boolean>,
  'get_NFT24Coin' : ActorMethod<[], bigint>,
  'get_authorized_users' : ActorMethod<
    [string, bigint, bigint],
    { 'users' : Array<[Id, ListUser]>, 'amount' : bigint }
  >,
  'get_subAdmin_users' : ActorMethod<
    [string, bigint, bigint],
    { 'users' : Array<[Id, ListAdminUser]>, 'amount' : bigint }
  >,
  'get_user_details' : ActorMethod<[UserId], Result_2>,
  'get_user_email' : ActorMethod<
    [Principal],
    [] | [{ 'email' : [] | [string] }]
  >,
  'get_user_name' : ActorMethod<
    [Principal],
    [] | [{ 'name' : [] | [string], 'image' : [] | [NewImageObject__1] }]
  >,
  'get_user_name_only' : ActorMethod<[Principal], [] | [string]>,
  'get_users' : ActorMethod<
    [string, boolean, bigint, bigint],
    { 'users' : Array<[Id, ListUser]>, 'amount' : bigint }
  >,
  'get_winner_users' : ActorMethod<
    [string, bigint, bigint],
    { 'users' : Array<[Id, TopWinnerUserList]>, 'amount' : bigint }
  >,
  'give_reward' : ActorMethod<[Id, bigint, boolean], boolean>,
  'make_admin' : ActorMethod<[Principal, Role__1], boolean>,
  'request_verification' : ActorMethod<[NewImageObject__1], Result>,
  'unBlock_sub_admin' : ActorMethod<[string, string], Result_1>,
  'unBlock_user' : ActorMethod<[string, string], Result_1>,
  'un_verify_user' : ActorMethod<[string, string], Result>,
  'update_NFT24Coin' : ActorMethod<[bigint], boolean>,
  'update_user' : ActorMethod<[InputUser, string], Result>,
  'verify_user' : ActorMethod<[string, string], Result>,
}
export interface _SERVICE extends anon_class_22_1 {}
