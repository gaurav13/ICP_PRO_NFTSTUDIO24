import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Category {
  'creation_time' : bigint,
  'logo' : NewImageObject,
  'name' : string,
  'directoryCount' : bigint,
  'slug' : string,
  'user' : Principal,
  'totalCount' : bigint,
  'banner' : NewImageObject,
  'description' : string,
  'pressReleaseCount' : bigint,
  'parentCategoryId' : [] | [CategoryId__1],
  'children' : [] | [Array<CategoryId__1>],
  'articleCount' : bigint,
  'isChild' : boolean,
  'podcastCount' : bigint,
  'eventsCount' : bigint,
}
export type CategoryId = string;
export type CategoryId__1 = string;
export interface Entry {
  'creation_time' : bigint,
  'status' : EntryStatus,
  'userName' : string,
  'title' : string,
  'seoTitle' : string,
  'promotionICP' : bigint,
  'likedUsers' : Array<Principal>,
  'seoSlug' : string,
  'subscription' : boolean,
  'views' : bigint,
  'tags' : Array<string>,
  'user' : UserId,
  'podcastImg' : [] | [NewImageObject],
  'minters' : Array<Principal>,
  'isStatic' : boolean,
  'description' : string,
  'isPodcast' : boolean,
  'isPromoted' : boolean,
  'likes' : bigint,
  'isDraft' : boolean,
  'promotionHistory' : List,
  'pressRelease' : boolean,
  'caption' : string,
  'category' : Array<string>,
  'viewedUsers' : Array<Principal>,
  'image' : [] | [NewImageObject],
  'seoDescription' : string,
  'podcastVideoLink' : string,
  'isCompanySelected' : boolean,
  'seoExcerpt' : string,
  'podcastImgCation' : string,
  'companyId' : string,
}
export type EntryId = string;
export interface EntryMetadata {
  'creation_time' : bigint,
  'status' : EntryStatus,
  'userName' : string,
  'seoTitle' : string,
  'seoSlug' : string,
  'tags' : Array<string>,
  'user' : UserId,
  'podcastImg' : [] | [NewImageObject],
  'description' : string,
  'isPodcast' : boolean,
  'isPromoted' : boolean,
  'pressRelease' : boolean,
  'caption' : string,
  'category' : Array<string>,
  'image' : [] | [NewImageObject],
  'seoDescription' : string,
  'podcastVideoLink' : string,
  'isCompanySelected' : boolean,
  'seoExcerpt' : string,
  'podcastImgCation' : string,
  'companyId' : string,
}
export type EntryStatus = { 'pending' : null } |
  { 'approved' : null } |
  { 'rejected' : null };
export type EntryStatus__1 = { 'pending' : null } |
  { 'approved' : null } |
  { 'rejected' : null };
export interface Event {
  'lat' : number,
  'lng' : number,
  'creation_time' : bigint,
  'month' : bigint,
  'organiser' : string,
  'title' : string,
  'country' : string,
  'seoTitle' : string,
  'linkdin' : string,
  'endDate' : bigint,
  'twitter' : string,
  'seoSlug' : string,
  'city' : string,
  'date' : bigint,
  'instagram' : string,
  'tags' : Array<string>,
  'user' : UserId,
  'applyTicket' : string,
  'description' : string,
  'website' : string,
  'shortDescription' : string,
  'facebook' : string,
  'category' : Array<string>,
  'image' : NewImageObject,
  'seoDescription' : string,
  'freeTicket' : string,
  'seoExcerpt' : string,
  'location' : string,
  'telegram' : string,
}
export type EventId = string;
export type EventId__1 = string;
export type EventStatus = { 'all' : null } |
  { 'upcoming' : null } |
  { 'past' : null } |
  { 'ongoing' : null };
export interface Event__1 {
  'lat' : number,
  'lng' : number,
  'creation_time' : bigint,
  'month' : bigint,
  'organiser' : string,
  'title' : string,
  'country' : string,
  'seoTitle' : string,
  'linkdin' : string,
  'endDate' : bigint,
  'twitter' : string,
  'seoSlug' : string,
  'city' : string,
  'date' : bigint,
  'instagram' : string,
  'tags' : Array<string>,
  'user' : UserId,
  'applyTicket' : string,
  'description' : string,
  'website' : string,
  'shortDescription' : string,
  'facebook' : string,
  'category' : Array<string>,
  'image' : NewImageObject,
  'seoDescription' : string,
  'freeTicket' : string,
  'seoExcerpt' : string,
  'location' : string,
  'telegram' : string,
}
export type Events = Array<[EventId__1, Event]>;
export interface InputCategory {
  'logo' : NewImageObject,
  'name' : string,
  'slug' : string,
  'banner' : NewImageObject,
  'description' : string,
  'parentCategoryId' : [] | [CategoryId__1],
}
export interface InputEntry {
  'userName' : string,
  'title' : string,
  'seoTitle' : string,
  'promotionICP' : bigint,
  'seoSlug' : string,
  'subscription' : boolean,
  'tags' : Array<string>,
  'podcastImg' : [] | [NewImageObject],
  'description' : string,
  'isPodcast' : boolean,
  'isPromoted' : boolean,
  'isDraft' : boolean,
  'pressRelease' : boolean,
  'caption' : string,
  'category' : Array<string>,
  'image' : [] | [NewImageObject],
  'seoDescription' : string,
  'podcastVideoLink' : string,
  'isCompanySelected' : boolean,
  'seoExcerpt' : string,
  'podcastImgCation' : string,
  'companyId' : string,
}
export interface InputEvent {
  'lat' : number,
  'lng' : number,
  'month' : bigint,
  'organiser' : string,
  'title' : string,
  'country' : string,
  'seoTitle' : string,
  'linkdin' : string,
  'endDate' : bigint,
  'twitter' : string,
  'seoSlug' : string,
  'city' : string,
  'date' : bigint,
  'instagram' : string,
  'tags' : Array<string>,
  'applyTicket' : string,
  'description' : string,
  'website' : string,
  'shortDescription' : string,
  'facebook' : string,
  'category' : Array<string>,
  'image' : NewImageObject,
  'seoDescription' : string,
  'freeTicket' : string,
  'seoExcerpt' : string,
  'location' : string,
  'telegram' : string,
}
export interface InputWeb3 {
  'linkedin' : string,
  'companyBanner' : NewImageObject,
  'founderName' : string,
  'twitter' : string,
  'founderImage' : NewImageObject,
  'instagram' : string,
  'companyDetail' : string,
  'catagory' : string,
  'company' : string,
  'shortDescription' : string,
  'facebook' : string,
  'companyLogo' : NewImageObject,
  'discord' : string,
  'companyUrl' : string,
  'telegram' : string,
  'founderDetail' : string,
}
export type Key = string;
export type LikeReward = bigint;
export type List = [] | [[bigint, List]];
export type ListCategories = Array<[CategoryId, ListCategory]>;
export interface ListCategory {
  'creation_time' : bigint,
  'logo' : NewImageObject,
  'name' : string,
  'directoryCount' : bigint,
  'slug' : string,
  'user' : Principal,
  'totalCount' : bigint,
  'description' : string,
  'pressReleaseCount' : bigint,
  'parentCategoryId' : [] | [CategoryId__1],
  'children' : [] | [Array<CategoryId__1>],
  'articleCount' : bigint,
  'isChild' : boolean,
  'podcastCount' : bigint,
  'eventsCount' : bigint,
}
export interface ListEntryItem {
  'creation_time' : bigint,
  'status' : EntryStatus,
  'userName' : string,
  'title' : string,
  'views' : bigint,
  'user' : UserId,
  'podcastImg' : [] | [NewImageObject],
  'minters' : Array<Principal>,
  'isStatic' : boolean,
  'isPodcast' : boolean,
  'isPromoted' : boolean,
  'likes' : bigint,
  'isDraft' : boolean,
  'pressRelease' : boolean,
  'category' : Array<string>,
  'image' : [] | [NewImageObject],
  'podcastVideoLink' : string,
  'isCompanySelected' : boolean,
  'seoExcerpt' : string,
  'podcastImgCation' : string,
  'companyId' : string,
}
export interface ListPodcastItem {
  'creation_time' : bigint,
  'status' : EntryStatus,
  'userName' : string,
  'title' : string,
  'likedUsers' : Array<Principal>,
  'views' : bigint,
  'user' : UserId,
  'podcastImg' : [] | [NewImageObject],
  'minters' : Array<Principal>,
  'isStatic' : boolean,
  'isPodcast' : boolean,
  'likes' : bigint,
  'isDraft' : boolean,
  'pressRelease' : boolean,
  'category' : Array<string>,
  'image' : [] | [NewImageObject],
  'podcastVideoLink' : string,
  'isCompanySelected' : boolean,
  'seoExcerpt' : string,
  'companyId' : string,
}
export type NewImageObject = string;
export type Result = { 'ok' : [string, boolean] } |
  { 'err' : string };
export type Result_1 = { 'ok' : [string, Category] } |
  { 'err' : string };
export type Result_2 = { 'ok' : [string, EventId] } |
  { 'err' : string };
export type Result_3 = { 'ok' : [string, Web3Id] } |
  { 'err' : string };
export type Result_4 = { 'ok' : [string, EntryId] } |
  { 'err' : string };
export type Result_5 = { 'ok' : [string, boolean] } |
  { 'err' : [string, boolean] };
export type Result_6 = { 'ok' : [string, [] | [Category]] } |
  { 'err' : string };
export type Result_7 = { 'ok' : [string, [] | [Entry]] } |
  { 'err' : string };
export type Result_8 = { 'ok' : [string, Entry] } |
  { 'err' : string };
export interface RewardConfig {
  'admin' : bigint,
  'platform' : bigint,
  'master' : bigint,
}
export interface TrendingEntryItemSidebar {
  'creation_time' : bigint,
  'status' : EntryStatus,
  'userName' : string,
  'title' : string,
  'views' : bigint,
  'user' : UserId,
  'isStatic' : boolean,
  'isPromoted' : boolean,
  'likes' : bigint,
  'isDraft' : boolean,
  'pressRelease' : boolean,
  'category' : Array<string>,
  'image' : [] | [NewImageObject],
  'isCompanySelected' : boolean,
  'seoExcerpt' : string,
  'companyId' : string,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export interface Web3 {
  'creation_time' : bigint,
  'status' : Web3Status,
  'linkedin' : [] | [string],
  'companyBanner' : NewImageObject,
  'founderName' : string,
  'likedUsers' : Array<Principal>,
  'twitter' : [] | [string],
  'views' : bigint,
  'founderImage' : NewImageObject,
  'instagram' : [] | [string],
  'companyDetail' : string,
  'user' : UserId,
  'totalCount' : bigint,
  'catagory' : string,
  'pressReleaseCount' : bigint,
  'likes' : bigint,
  'company' : string,
  'shortDescription' : string,
  'facebook' : [] | [string],
  'companyLogo' : NewImageObject,
  'discord' : [] | [string],
  'companyUrl' : [] | [string],
  'articleCount' : bigint,
  'telegram' : [] | [string],
  'podcastCount' : bigint,
  'founderDetail' : string,
}
export interface Web3DashboardList {
  'creation_time' : bigint,
  'status' : Web3Status,
  'founderName' : string,
  'views' : bigint,
  'user' : UserId,
  'catagory' : string,
  'company' : string,
  'companyLogo' : NewImageObject,
  'companyUrl' : [] | [string],
}
export type Web3Id = string;
export interface Web3List {
  'creation_time' : bigint,
  'views' : bigint,
  'totalCount' : bigint,
  'catagory' : string,
  'pressReleaseCount' : bigint,
  'company' : string,
  'articleCount' : bigint,
  'podcastCount' : bigint,
}
export type Web3Status = { 'all' : null } |
  { 'un_verfied' : null } |
  { 'verfied' : null };
export type Web3Status__1 = { 'all' : null } |
  { 'un_verfied' : null } |
  { 'verfied' : null };
export interface anon_class_24_1 {
  'addCategory' : ActorMethod<[string, string, string], Array<string>>,
  'addEvent' : ActorMethod<[InputEvent, string, string], Result_2>,
  'addView' : ActorMethod<[Key], boolean>,
  'addWeb3View' : ActorMethod<[Key], boolean>,
  'addWeb3postCount' : ActorMethod<[Key, string], boolean>,
  'add_category' : ActorMethod<[InputCategory, string, string], Result_1>,
  'adminDeleteEntry' : ActorMethod<[Key, string, string], Result_7>,
  'approveArticle' : ActorMethod<[string, string, Key, boolean], Result_8>,
  'approvePodcast' : ActorMethod<[string, string, Key, boolean], Result_8>,
  'child_to_category' : ActorMethod<[Array<CategoryId>], ListCategories>,
  'deleteDraftEntry' : ActorMethod<[Key, string], Result_7>,
  'delete_category' : ActorMethod<[CategoryId, string, string], Result_6>,
  'delete_event' : ActorMethod<[string, string, string], Result_5>,
  'delete_web3' : ActorMethod<[Key, string, string], Result_5>,
  'editViews' : ActorMethod<[Key, bigint, string, string], boolean>,
  'editWeb3Views' : ActorMethod<[Key, bigint, string, string], boolean>,
  'getAllEntries' : ActorMethod<[string], Array<[Key, Entry]>>,
  'getAllEntryIds' : ActorMethod<[boolean], Array<Key>>,
  'getApprovedWeb3List' : ActorMethod<[bigint], Array<[Key, Web3]>>,
  'getCategories' : ActorMethod<[], Array<string>>,
  'getEntriesByCategory' : ActorMethod<[string], Array<[Key, Entry]>>,
  'getEntriesList' : ActorMethod<
    [string, boolean, string, bigint, bigint],
    { 'entries' : Array<[Key, ListEntryItem]>, 'amount' : bigint }
  >,
  'getEntriesNew' : ActorMethod<
    [CategoryId, string, bigint, bigint],
    { 'entries' : Array<[Key, Entry]>, 'amount' : bigint }
  >,
  'getEntry' : ActorMethod<[Key], [] | [Entry]>,
  'getEntryMeta' : ActorMethod<[Key], EntryMetadata>,
  'getEntry_admin' : ActorMethod<[Key], [] | [Entry]>,
  'getOnlyArticles' : ActorMethod<[bigint, Array<string>], Array<[Key, Entry]>>,
  'getOnlyPressRelease' : ActorMethod<
    [bigint, Array<string>],
    Array<[Key, Entry]>
  >,
  'getPaginatedEntries' : ActorMethod<
    [bigint, bigint],
    { 'entries' : Array<[Key, Entry]>, 'amount' : bigint }
  >,
  'getPendingWeb3List' : ActorMethod<[bigint], Array<[Key, Web3]>>,
  'getPodcastList' : ActorMethod<
    [string, boolean, string, bigint, bigint],
    { 'entries' : Array<[Key, ListPodcastItem]>, 'amount' : bigint }
  >,
  'getPressEntries' : ActorMethod<[string], Array<[Key, Entry]>>,
  'getPromotedEntries' : ActorMethod<[bigint], Array<[Key, Entry]>>,
  'getQuriedEntries' : ActorMethod<
    [[] | [CategoryId], string, string, bigint, bigint],
    { 'entries' : Array<[Key, Entry]>, 'amount' : bigint }
  >,
  'getReviewEntries' : ActorMethod<
    [string, string, EntryStatus__1, string, bigint, bigint],
    { 'entries' : Array<[Key, ListEntryItem]>, 'amount' : bigint }
  >,
  'getReviewPodcast' : ActorMethod<
    [string, string, EntryStatus__1, string, bigint, bigint],
    { 'entries' : Array<[Key, ListPodcastItem]>, 'amount' : bigint }
  >,
  'getUserEntries' : ActorMethod<[UserId__1], Array<[Key, Entry]>>,
  'getUserEntriesList' : ActorMethod<
    [string, boolean, string, bigint, bigint],
    { 'entries' : Array<[Key, ListEntryItem]>, 'amount' : bigint }
  >,
  'getUserPodcast' : ActorMethod<[UserId__1], Array<[Key, Entry]>>,
  'getUserWeb3List' : ActorMethod<
    [string, string, bigint, bigint],
    { 'web3List' : Array<[Key, Web3]>, 'amount' : bigint }
  >,
  'getWeb3' : ActorMethod<[Key], [] | [Web3]>,
  'getWeb3DirectoriesDashboard' : ActorMethod<
    [string, Web3Status__1, string, string, bigint, bigint],
    { 'web3List' : Array<[Key, Web3DashboardList]>, 'amount' : bigint }
  >,
  'getWeb3List' : ActorMethod<
    [string, string, bigint, bigint],
    { 'web3List' : Array<[Key, Web3List]>, 'amount' : bigint }
  >,
  'getWeb3ListOfAllUsers' : ActorMethod<
    [string, string, bigint, bigint],
    { 'web3List' : Array<[Key, Web3]>, 'amount' : bigint }
  >,
  'getWeb3_for_admin' : ActorMethod<[Key, string], [] | [Web3]>,
  'get_categories' : ActorMethod<
    [string, bigint, bigint, boolean],
    { 'entries' : ListCategories, 'amount' : bigint }
  >,
  'get_categories_by_name' : ActorMethod<
    [Array<string>],
    Array<[CategoryId, Category]>
  >,
  'get_category' : ActorMethod<[string], [] | [Category]>,
  'get_event' : ActorMethod<[string], [] | [Event__1]>,
  'get_events' : ActorMethod<
    [string, bigint, bigint, [] | [bigint], [] | [string], [] | [string]],
    { 'entries' : Events, 'amount' : bigint }
  >,
  'get_like_reward' : ActorMethod<[], bigint>,
  'get_list_categories' : ActorMethod<
    [string, bigint, bigint, boolean],
    { 'entries' : ListCategories, 'amount' : bigint }
  >,
  'get_list_category' : ActorMethod<[string], [] | [ListCategory]>,
  'get_reward' : ActorMethod<[], RewardConfig>,
  'get_upcoming_events' : ActorMethod<
    [
      string,
      bigint,
      bigint,
      EventStatus,
      [] | [bigint],
      [] | [string],
      [] | [string],
    ],
    { 'entries' : Events, 'amount' : bigint }
  >,
  'insertEntry' : ActorMethod<
    [InputEntry, string, boolean, string, string],
    Result_4
  >,
  'insertWeb3' : ActorMethod<
    [InputWeb3, string, string, string, boolean],
    Result_3
  >,
  'isMinted' : ActorMethod<[Key], boolean>,
  'likeEntry' : ActorMethod<[Key, string, string], Result>,
  'likeWeb3' : ActorMethod<[Key, string, string], Result>,
  'makeStatic' : ActorMethod<[Key], boolean>,
  'mintEntry' : ActorMethod<[Key, string], Result>,
  'trendingEntryItemSidebar' : ActorMethod<
    [bigint],
    Array<[Key, TrendingEntryItemSidebar]>
  >,
  'trendingPressReleaseItemSidebar' : ActorMethod<
    [bigint],
    Array<[Key, TrendingEntryItemSidebar]>
  >,
  'updateEvent' : ActorMethod<[InputEvent, string, string, string], Result_2>,
  'update_category' : ActorMethod<
    [InputCategory, CategoryId, string, string],
    Result_1
  >,
  'update_count_category' : ActorMethod<[CategoryId, string], Result>,
  'update_like_reward' : ActorMethod<[string, LikeReward], LikeReward>,
  'update_reward' : ActorMethod<[string, RewardConfig], RewardConfig>,
  'verifyWeb3' : ActorMethod<[Key, string, string, boolean], Result>,
}
export interface _SERVICE extends anon_class_24_1 {}
