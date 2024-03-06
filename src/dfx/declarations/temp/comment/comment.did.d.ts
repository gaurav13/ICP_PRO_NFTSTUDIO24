import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Activities = Array<Activity>;
export interface Activity {
  'activity_type' : ActivityType,
  'title' : string,
  'time' : bigint,
  'target' : string,
}
export type ActivityType = { 'subscribe' : null } |
  { 'create_pressRelease' : null } |
  { 'create_podcats' : null } |
  { 'delete_article' : null } |
  { 'delete_podcats' : null } |
  { 'like_web3' : null } |
  { 'like' : null } |
  { 'comment_podcats' : null } |
  { 'create' : null } |
  { 'comment' : null } |
  { 'create_web3' : null } |
  { 'comment_pressRelease' : null } |
  { 'delete_pressRelease' : null } |
  { 'promote' : null } |
  { 'delete_web3' : null };
export type AdminActivities = Array<AdminActivity>;
export interface AdminActivity {
  'activity_type' : AdminActivityType,
  'title' : string,
  'time' : bigint,
  'target' : string,
}
export type AdminActivityType = { 'reject' : null } |
  { 'edit_web3' : null } |
  { 'edit_event' : null } |
  { 'delete_article' : null } |
  { 'delete_podcats' : null } |
  { 'edit_category' : null } |
  { 'unBlock' : null } |
  { 'approve' : null } |
  { 'add_category' : null } |
  { 'editWeb3Views' : null } |
  { 'delete_category' : null } |
  { 'verify_web3' : null } |
  { 'delete_event' : null } |
  { 'block' : null } |
  { 'editViews' : null } |
  { 'delete_pressRelease' : null } |
  { 'add_event' : null } |
  { 'delete_web3' : null };
export interface Comment {
  'creation_time' : bigint,
  'content' : string,
  'user' : Principal,
}
export type Comments = Array<Comment>;
export type InputComment = string;
export type Result = { 'ok' : [Comments, string] } |
  { 'err' : string };
export type Result_1 = { 'ok' : [AdminActivities, string] } |
  { 'err' : string };
export type Result_2 = { 'ok' : [Activities, string] } |
  { 'err' : string };
export type Result_3 = { 'ok' : [Comment, string] } |
  { 'err' : string };
export type UserId = Principal;
export interface anon_class_19_1 {
  'addActivity' : ActorMethod<[UserId, string, ActivityType, string], boolean>,
  'addAdminActivity' : ActorMethod<
    [UserId, string, AdminActivityType, string],
    boolean
  >,
  'addComment' : ActorMethod<
    [InputComment, string, string, string, string],
    Result_3
  >,
  'getActivities' : ActorMethod<[], Result_2>,
  'getAdminActivities' : ActorMethod<[UserId, string], Result_1>,
  'getComments' : ActorMethod<[string], Result>,
}
export interface _SERVICE extends anon_class_19_1 {}
