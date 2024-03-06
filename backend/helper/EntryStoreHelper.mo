import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Map "mo:base/HashMap";

import ImageType "../model/ImageType";
import EntryType "../model/EntryType";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Prelude "mo:base/Prelude";
import Order "mo:base/Order";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Option "mo:base/Option";
import Prim "mo:prim";
import UserType "../model/UserType";

module EntryStoreHelper {
  public type TopWinnerUserList = UserType.TopWinnerUserList;
  type Entry = EntryType.Entry;
  type UserId = EntryType.UserId;
  type InputEntry = EntryType.InputEntry;
  type EntryStorage = EntryType.EntryStorage;
  type EntryStatus = EntryType.EntryStatus;
  type TrendingEntryItemSidebar = EntryType.TrendingEntryItemSidebar;

  type EntryId = EntryType.EntryId;
  type ListEntryItem = EntryType.ListEntryItem;
  type ListPodcastItem = EntryType.ListPodcastItem;

  type Key = Text;
  type SubKey = EntryType.SubKey;

  type Id = UserType.Id;
  type ListUser = UserType.ListUser;
  type Subscriber = EntryType.Subscriber;
  type ListAdminUser = UserType.ListAdminUser;

  type ImageStore = Trie.Trie<ImageId, ImageObject>;
  type ImageObject = ImageType.ImageObject;
  type NewImageObject = ImageType.NewImageObject;
  type ImageId = ImageType.ImageId;

  type CategoryId = EntryType.CategoryId;
  type Category = EntryType.Category;
  type Categories = [(CategoryId, Category)];
  type ListCategory = EntryType.ListCategory;
  type ListCategories = [(CategoryId, ListCategory)];
  type EventId = EntryType.EventId;
  type Event = EntryType.Event;
  type Events = EntryType.Events;
  type EventStatus = EntryType.EventStatus;

  public func addNewEntry(entryStorage : EntryStorage, entry : InputEntry, entryId : EntryId, caller : UserId, isDraftUpdate : Bool, draftId : Text, articlePool : Nat, stable_categories : [Text]) : EntryStorage {

    var categories = entry.category;

    var tempcompanyId = "";

    // if (entry.isCompanySelected) {
    //   categories := [];
    // };
    // case ("AI") ?"AI";

    // case ("BlockChain") ?"BlockChain";
    // case ("Guide") ?"Guide";
    // case ("GameReview") ?"GameReview";
    // case (_) ?"Other";

    // switch (entry.category) {

    //   case ("AI") "AI";
    //   case ("BlockChain") "BlockChain";
    //   case ("Guide") "Guide";
    //   case ("GameReview") "GameReview";
    //   case (_) "Other";
    // };

    var entryStatus : EntryStatus = #pending;
    // if (not entry.isPodcast) {
    if (entry.isPromoted) {

      let oldEntry = entryStorage.get(draftId);
      switch (oldEntry) {
        case (?isEntry) {
          let mergedPromotionICP = articlePool + isEntry.promotionICP;
          tempcompanyId := isEntry.companyId;
          if (not entry.isCompanySelected) {
            tempcompanyId := "";
          };
          var tempImg : ?NewImageObject = null;
          if (entry.image != null) {

            tempImg := entry.image;

          };
          var temppodcastImg : ?NewImageObject = null;
          if (entry.podcastImg != null) {

            temppodcastImg := entry.podcastImg;

          };
          let newPromotion = List.push<Int>(Time.now() / 1000000, isEntry.promotionHistory);
          let tempEntry : Entry = {
            title = isEntry.title;
            description = isEntry.description;
            image = tempImg;
            creation_time = isEntry.creation_time;
            user = isEntry.user;
            views = isEntry.views;
            likes = isEntry.likes;
            category = isEntry.category;
            seoTitle = isEntry.seoTitle;
            seoSlug = isEntry.seoSlug;
            viewedUsers = isEntry.viewedUsers;
            likedUsers = isEntry.likedUsers;
            seoDescription = isEntry.seoDescription;
            seoExcerpt = isEntry.seoExcerpt;
            subscription = isEntry.subscription;
            isDraft = isEntry.isDraft;
            isPromoted = entry.isPromoted;
            // promotionLikesTarget = isEntry.promotionLikesTarget;
            promotionICP = mergedPromotionICP;
            minters = isEntry.minters;
            userName = isEntry.userName;
            status = isEntry.status;
            promotionHistory = newPromotion;
            pressRelease = isEntry.pressRelease;
            caption = isEntry.caption;
            tags = isEntry.tags;
            isCompanySelected = isEntry.isCompanySelected;
            companyId = tempcompanyId;
            isPodcast = isEntry.isPodcast;
            podcastVideoLink = isEntry.podcastVideoLink;
            podcastImgCation = isEntry.podcastImgCation;
            podcastImg = temppodcastImg;
            isStatic = isEntry.isStatic;
          };
          let oldEntry = entryStorage.replace(draftId, tempEntry);
          let newEntryStorage : Map.HashMap<EntryId, Entry> = Map.fromIter<EntryId, Entry>(entryStorage.entries(), entryStorage.size(), Text.equal, Text.hash);
          return newEntryStorage;

        };
        case (null) {
          return entryStorage;
        };
      };
    } else {
      var tempcompanyId = "";
      tempcompanyId := entry.companyId;
      if (not entry.isCompanySelected) {
        tempcompanyId := "";
      };
      var tempImg : ?NewImageObject = null;
      if (entry.image != null) {

        tempImg := entry.image;

      };
      var temppodcastImg : ?NewImageObject = null;
      if (entry.podcastImg != null) {
        temppodcastImg := entry.podcastImg;
      };

      let tempEntry : Entry = {
        title = entry.title;
        description = entry.description;
        image = tempImg;
        creation_time = Time.now() / 1000000;
        user = caller;
        views = 0;
        likes = 0;
        category = categories;
        seoTitle = entry.seoTitle;
        seoSlug = entry.seoSlug;
        viewedUsers = [];
        likedUsers = [];
        seoDescription = entry.seoDescription;
        seoExcerpt = entry.seoExcerpt;
        subscription = entry.subscription;
        isDraft = entry.isDraft;
        isPromoted = false;
        // promotionLikesTarget = entry.promotionLikesTarget;
        promotionICP = 0;
        minters = [];
        userName = entry.userName;
        status = entryStatus;
        promotionHistory = List.nil<Int>();
        pressRelease = entry.pressRelease;
        caption = entry.caption;
        tags = entry.tags;
        isCompanySelected = entry.isCompanySelected;
        companyId = tempcompanyId;
        isPodcast = entry.isPodcast;
        podcastVideoLink = entry.podcastVideoLink;
        podcastImgCation = entry.podcastImgCation;
        isStatic = false;
        podcastImg = temppodcastImg;
      };
      if (isDraftUpdate) {
        let oldEntry = entryStorage.replace(draftId, tempEntry);
        let newEntryStorage : Map.HashMap<EntryId, Entry> = Map.fromIter<EntryId, Entry>(entryStorage.entries(), entryStorage.size(), Text.equal, Text.hash);
        return newEntryStorage;
      } else {
        entryStorage.put(entryId, tempEntry);
        let newEntryStorage : Map.HashMap<EntryId, Entry> = Map.fromIter<EntryId, Entry>(entryStorage.entries(), entryStorage.size(), Text.equal, Text.hash);
        return newEntryStorage;

      };
    };
    // } else {

    //   var tempcompanyId = "";
    //   tempcompanyId := entry.companyId;
    //   if (not entry.isCompanySelected) {
    //     tempcompanyId := "";
    //   };
    //   var tempImg : ?ImageObject = null;
    //   if (entry.image != null) {

    //     tempImg := entry.image;

    //   };
    //   var temppodcastImg : ?ImageObject = null;
    //   if (entry.podcastImg != null) {

    //     temppodcastImg := entry.podcastImg;

    //   };
    //   let tempEntry : Entry = {
    //     title = entry.title;
    //     description = entry.description;
    //     image = tempImg;
    //     creation_time = Time.now() / 1000000;
    //     user = caller;
    //     views = 0;
    //     likes = 0;
    //     category = categories;
    //     seoTitle = entry.seoTitle;
    //     seoSlug = entry.seoSlug;
    //     viewedUsers = [];
    //     likedUsers = [];
    //     seoDescription = entry.seoDescription;
    //     seoExcerpt = entry.seoExcerpt;
    //     subscription = entry.subscription;
    //     isDraft = false;
    //     isPromoted = false;
    //     // promotionLikesTarget = entry.promotionLikesTarget;
    //     promotionICP = 0;
    //     minters = [];
    //     userName = entry.userName;
    //     status = entryStatus;
    //     promotionHistory = List.nil<Int>();
    //     pressRelease = false;
    //     imageTags = [""];
    //     caption = "";
    //     tags = entry.tags;
    //     isCompanySelected = entry.isCompanySelected;
    //     companyId = tempcompanyId;
    //     isPodcast = true;
    //     podcastVideoLink = entry.podcastVideoLink;
    //     podcastImgCation = entry.podcastImgCation;
    //     podcastImg = temppodcastImg;
    //   };
    //   entryStorage.put(entryId, tempEntry);
    //   let newEntryStorage : Map.HashMap<EntryId, Entry> = Map.fromIter<EntryId, Entry>(entryStorage.entries(), entryStorage.size(), Text.equal, Text.hash);
    //   return newEntryStorage;
    // };

  };
  public func sortListByLatest(array : [(Key, ListEntryItem)]) : [(Key, ListEntryItem)] {
    let compare = func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    Array.sort(
      array,
      compare,
    );
  };
  public func searchSortList(array : Map.HashMap<Key, ListEntryItem>, search : Text, startIndex : Nat, length : Nat) : {
    entries : [(Key, ListEntryItem)];
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedEntries = Map.HashMap<Key, ListEntryItem>(0, Text.equal, Text.hash);
    for ((key, entry) in array.entries()) {
      let title = Text.map(entry.title, Prim.charToLower);
      let user = Text.map(entry.userName, Prim.charToLower);
      var isTitleSearched = Text.contains(title, #text searchString);
      var isUserSearched = Text.contains(user, #text searchString);
      if (isTitleSearched or isUserSearched) {
        searchedEntries.put(key, entry);
      };
    };
    var searchedEntriesArray : [(Key, ListEntryItem)] = Iter.toArray(searchedEntries.entries());
    let compare = func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) : Order.Order {
      if (a.isPromoted and not b.isPromoted) {
        return #less;
      } else if (b.isPromoted and not a.isPromoted) {
        return #greater;
      } else {
        if (a.creation_time > b.creation_time) {
          return #less;
        } else if (a.creation_time < b.creation_time) {
          return #greater;
        } else {
          return #equal;
        };
      };
    };
    let sortedEntries = Array.sort(
      searchedEntriesArray,
      compare,
    );
    var paginatedArray : [(Key, ListEntryItem)] = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 6;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, ListEntryItem)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<(Key, ListEntryItem)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(Key, ListEntryItem)>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Key, ListEntryItem)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Key, ListEntryItem)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchSortListPodcast(array : Map.HashMap<Key, ListPodcastItem>, search : Text, startIndex : Nat, length : Nat) : {
    entries : [(Key, ListPodcastItem)];
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedEntries = Map.HashMap<Key, ListPodcastItem>(0, Text.equal, Text.hash);
    for ((key, entry) in array.entries()) {
      let title = Text.map(entry.title, Prim.charToLower);
      let user = Text.map(entry.userName, Prim.charToLower);
      var isTitleSearched = Text.contains(title, #text searchString);
      var isUserSearched = Text.contains(user, #text searchString);
      if (isTitleSearched or isUserSearched) {
        searchedEntries.put(key, entry);
      };
    };
    var searchedEntriesArray : [(Key, ListPodcastItem)] = Iter.toArray(searchedEntries.entries());
    let compare = func((keyA : Key, a : ListPodcastItem), (keyB : Key, b : ListPodcastItem)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };

    };
    let sortedEntries = Array.sort(
      searchedEntriesArray,
      compare,
    );
    var paginatedArray : [(Key, ListPodcastItem)] = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 6;
    if (size > startIndex and size >= (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, ListPodcastItem)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {

        paginatedArray := Array.subArray<(Key, ListPodcastItem)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(Key, ListPodcastItem)>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      paginatedArray := Array.subArray<(Key, ListPodcastItem)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Key, ListPodcastItem)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func sortTopWinner(array : Map.HashMap<Id, TopWinnerUserList>, search : Text, startIndex : Nat, length : Nat) : {
    users : [(Id, TopWinnerUserList)];
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedEntries = Map.HashMap<Id, TopWinnerUserList>(0, Principal.equal, Principal.hash);
    for ((key, entry) in array.entries()) {
      let user = Text.map(entry.name, Prim.charToLower);
      var isUserSearched = Text.contains(user, #text searchString);
      if (isUserSearched) {
        searchedEntries.put(key, entry);
      };
    };

    var searchedEntriesArray : [(Id, TopWinnerUserList)] = Iter.toArray(searchedEntries.entries());
    let compare = func((keyA : Id, a : TopWinnerUserList), (keyB : Id, b : TopWinnerUserList)) : Order.Order {
      if (a.totalReward > b.totalReward) {
        return #less;
      } else if (a.totalReward < b.totalReward) {
        return #greater;
      } else {
        return #equal;
      };

    };
    let sortedEntries = Array.sort(
      searchedEntriesArray,
      compare,
    );
    var paginatedArray : [(Id, TopWinnerUserList)] = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 6;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Id, TopWinnerUserList)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<(Id, TopWinnerUserList)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(Id, TopWinnerUserList)>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Id, TopWinnerUserList)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Id, TopWinnerUserList)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { users = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchSortUserList(array : Map.HashMap<Id, ListUser>, search : Text, startIndex : Nat, length : Nat) : {
    users : [(Id, ListUser)];
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedUsers = Map.HashMap<Id, ListUser>(0, Principal.equal, Principal.hash);
    for ((key, user) in array.entries()) {
      // let title = Text.map(user.title, Prim.charToLower);
      var name = "";
      switch (user.name) {
        case (?isName) {
          name := isName;
        };
        case (null) {

        };
      };
      let userName = Text.map(name, Prim.charToLower);
      // var isTitleSearched = Text.contains(title, #text searchString);
      var isUserSearched = Text.contains(userName, #text searchString);
      if (isUserSearched) {
        searchedUsers.put(key, user);
      };
    };
    var searchedUsersArray : [(Id, ListUser)] = Iter.toArray(searchedUsers.entries());
    let compare = func((keyA : Id, a : ListUser), (keyB : Id, b : ListUser)) : Order.Order {
      if (a.joinedFrom > b.joinedFrom) {
        return #less;
      } else if (a.joinedFrom < b.joinedFrom) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Id, a : ListUser), (keyB : Id, b : ListUser)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      searchedUsersArray,
      compare,
    );
    // let entryArray = Iter.toArray(searchedEntries.entries());
    var paginatedArray : [(Id, ListUser)] = [];
    let itemsPerPage = 10;
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Id, ListUser)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<(Id, ListUser)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(Id, ListUser)>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Id, ListUser)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Id, ListUser)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { users = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchSortAdminUserList(array : Map.HashMap<Id, ListAdminUser>, search : Text, startIndex : Nat, length : Nat) : {
    users : [(Id, ListAdminUser)];
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedUsers = Map.HashMap<Id, ListAdminUser>(0, Principal.equal, Principal.hash);
    for ((key, user) in array.entries()) {
      // let title = Text.map(user.title, Prim.charToLower);
      var name = "";
      switch (user.name) {
        case (?isName) {
          name := isName;
        };
        case (null) {

        };
      };
      let userName = Text.map(name, Prim.charToLower);
      // var isTitleSearched = Text.contains(title, #text searchString);
      var isUserSearched = Text.contains(userName, #text searchString);
      if (isUserSearched) {
        searchedUsers.put(key, user);
      };
    };
    var searchedUsersArray : [(Id, ListAdminUser)] = Iter.toArray(searchedUsers.entries());
    let compare = func((keyA : Id, a : ListAdminUser), (keyB : Id, b : ListAdminUser)) : Order.Order {
      if (a.joinedFrom > b.joinedFrom) {
        return #less;
      } else if (a.joinedFrom < b.joinedFrom) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Id, a : ListUser), (keyB : Id, b : ListUser)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      searchedUsersArray,
      compare,
    );
    // let entryArray = Iter.toArray(searchedEntries.entries());
    var paginatedArray : [(Id, ListAdminUser)] = [];
    let size = sortedEntries.size();
    let itemsPerPage = 4;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Id, ListAdminUser)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      paginatedArray := Array.subArray<(Id, ListAdminUser)>(sortedEntries, startIndex, itemsPerPage);

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      let amount : Nat = size - startIndex;
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Id, ListAdminUser)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Id, ListAdminUser)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { users = paginatedArray; amount = sortedEntries.size() };
  };
  public func sortEntriesByLatest(array : [(Key, Entry)]) : [(Key, Entry)] {
    let compare = func((keyA : Key, a : Entry), (keyB : Key, b : Entry)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    Array.sort(
      array,
      compare,
    );
  };
  public func sortTrendingEntriesByLatest(array : [(Key, TrendingEntryItemSidebar)]) : [(Key, TrendingEntryItemSidebar)] {
    let compare = func((keyA : Key, a : TrendingEntryItemSidebar), (keyB : Key, b : TrendingEntryItemSidebar)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    Array.sort(
      array,
      compare,
    );
  };
  public func paginateEntriesByLatest(array : [(Key, Entry)], startIndex : Nat, length : Nat) : {
    entries : [(Key, Entry)];
    amount : Nat;
  } {
    let compare = func((keyA : Key, a : Entry), (keyB : Key, b : Entry)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      array,
      compare,
    );
    var paginatedArray : [(Key, Entry)] = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 3;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);

    } else if (size > startIndex) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchSortEntries(array : [(Key, Entry)], search : Text, startIndex : Nat, length : Nat) : {
    entries : [(Key, Entry)];
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedEntries = Map.HashMap<Key, Entry>(0, Text.equal, Text.hash);
    for ((key, entry) in array.vals()) {
      let entryTitle = Text.map(entry.title, Prim.charToLower);
      var isEntrySearched = Text.contains(entryTitle, #text searchString);
      if (isEntrySearched) {
        searchedEntries.put(key, entry);
      } else {
        for (tag in entry.tags.vals()) {
          let tagLower = Text.map(tag, Prim.charToLower);
          var isTagSearched = Text.contains(tagLower, #text searchString);
          if (isTagSearched) {
            searchedEntries.put(key, entry);
          };
        };
      };
    };
    var searchedEntriesArray : [(Key, Entry)] = Iter.toArray(searchedEntries.entries());
    let compare = func((keyA : Key, a : Entry), (keyB : Key, b : Entry)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      searchedEntriesArray,
      compare,
    );
    var paginatedArray : [(Key, Entry)] = [];
    let size = sortedEntries.size();
    if (startIndex > size) {
      return { entries = []; amount = 0 };
    };
    let amount : Nat = size - startIndex;
    let itemsPerPage = 6;
    // size > startIndex and
    if (size >= (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, length);
      // size > startIndex and
    } else if (size >= (startIndex + itemsPerPage)) {
      // paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, itemsPerPage);
      // size > startIndex and
      // size < (startIndex + itemsPerPage) and
    } else {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);

    };
    // else if (size > startIndex) {
    //   paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);

    // } else if (size > itemsPerPage) {
    //   // paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, 0, itemsPerPage);

    // } else {
    //   // paginatedArray := sortedEntries;
    // };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchSortTaggedEntries(array : [(Key, Entry)], search : Text, tag : Text, startIndex : Nat, length : Nat) : {
    entries : [(Key, Entry)];
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    let tagString = Text.map(tag, Prim.charToLower);
    var searchedEntries = Map.HashMap<Key, Entry>(0, Text.equal, Text.hash);
    for ((key, entry) in array.vals()) {
      let entryTitle = Text.map(entry.title, Prim.charToLower);
      var isEntrySearched = Text.contains(entryTitle, #text searchString);

      for (tag in entry.tags.vals()) {
        let tagLower = Text.map(tag, Prim.charToLower);
        var isTagSearched = Text.contains(tagLower, #text tagString);
        if (isTagSearched) {
          if (isEntrySearched) {
            searchedEntries.put(key, entry);
          };
        };
      };

    };
    var searchedEntriesArray : [(Key, Entry)] = Iter.toArray(searchedEntries.entries());
    let compare = func((keyA : Key, a : Entry), (keyB : Key, b : Entry)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListEntryItem), (keyB : Key, b : ListEntryItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      searchedEntriesArray,
      compare,
    );
    var paginatedArray : [(Key, Entry)] = [];
    let size = sortedEntries.size();
    if (startIndex > size) {
      return { entries = []; amount = 0 };
    };
    let amount : Nat = size - startIndex;
    let itemsPerPage = 6;
    // size > startIndex and
    if (size >= (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, length);
      // size > startIndex and
    } else if (size >= (startIndex + itemsPerPage)) {
      // paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, itemsPerPage);
      // size > startIndex and
      // size < (startIndex + itemsPerPage) and
    } else {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);

    };
    // else if (size > startIndex) {
    //   paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, startIndex, amount);

    // } else if (size > itemsPerPage) {
    //   // paginatedArray := Array.subArray<(Key, Entry)>(sortedEntries, 0, itemsPerPage);

    // } else {
    //   // paginatedArray := sortedEntries;
    // };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func paginateSubscribersByLatest(array : [Subscriber], startIndex : Nat, length : Nat) : {
    entries : [Subscriber];
    amount : Nat;
  } {
    let compare = func(a : Subscriber, b : Subscriber) : Order.Order {
      if (a.subscribed_on > b.subscribed_on) {
        return #less;
      } else if (a.subscribed_on < b.subscribed_on) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListSubscriberItem), (keyB : Key, b : ListSubscriberItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      array,
      compare,
    );
    var paginatedArray : [Subscriber] = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 11;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<Subscriber>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<Subscriber>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<Subscriber>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<Subscriber>(sortedEntries, startIndex, amount);

    } else if (size > startIndex) {
      paginatedArray := Array.subArray<Subscriber>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<Subscriber>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchCategories(array : ListCategories, search : Text, startIndex : Nat, length : Nat, isParentOnly : Bool) : {
    entries : ListCategories;
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedCategories = Map.HashMap<CategoryId, ListCategory>(0, Text.equal, Text.hash);
    for ((key, category) in array.vals()) {
      let categoryName = Text.map(category.name, Prim.charToLower);
      var isCategorySearch = Text.contains(categoryName, #text searchString);
      // Check if the category is searched and is not a child category
      if (isCategorySearch) {
        if ((isParentOnly and not category.isChild) or not isParentOnly) {
          searchedCategories.put(key, category);
        };
      };
    };
    var searchedCategoriesArray : [(CategoryId, ListCategory)] = Iter.toArray(searchedCategories.entries());

    let compare = func((keyA : CategoryId, a : ListCategory), (keyB : CategoryId, b : ListCategory)) : Order.Order {
      if (a.totalCount > b.totalCount) {
        return #less;
      } else if (a.totalCount < b.totalCount) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListSubscriberItem), (keyB : Key, b : ListSubscriberItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      searchedCategoriesArray,
      compare,
    );
    var paginatedArray : ListCategories = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 10;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, amount);

    } else if (size > startIndex) {
      paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchListCategories(array : Categories, search : Text, startIndex : Nat, length : Nat, isParentOnly : Bool) : {
    entries : ListCategories;
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedCategories = Map.HashMap<CategoryId, ListCategory>(0, Text.equal, Text.hash);
    for ((key, category) in array.vals()) {
      let categoryName = Text.map(category.name, Prim.charToLower);
      var isCategorySearch = Text.contains(categoryName, #text searchString);
      // Check if the category is searched and is not a child category
      if (isCategorySearch) {
        if ((isParentOnly and not category.isChild) or not isParentOnly) {
          searchedCategories.put(key, category);
        };
      };
    };
    var searchedCategoriesArray : [(CategoryId, ListCategory)] = Iter.toArray(searchedCategories.entries());

    let compare = func((keyA : CategoryId, a : ListCategory), (keyB : CategoryId, b : ListCategory)) : Order.Order {
      if (a.creation_time > b.creation_time) {
        return #less;
      } else if (a.creation_time < b.creation_time) {
        return #greater;
      } else {
        return #equal;
      };
    };
    // let sortedArray = Array.sort(newArr, func((keyA : Key, a : ListSubscriberItem), (keyB : Key, b : ListSubscriberItem)) { Order.fromCompare((b.creation_time - a.creation_time)) });
    let sortedEntries = Array.sort(
      searchedCategoriesArray,
      compare,
    );
    var paginatedArray : ListCategories = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 10;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, itemsPerPage);

      };
    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, amount);

    } else if (size > startIndex) {
      paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, startIndex, amount);

    } else if (size < startIndex) {
      paginatedArray := [];
    } else {
      paginatedArray := sortedEntries;

    };
    // else if (size > itemsPerPage) {
    //   paginatedArray := Array.subArray<(CategoryId, ListCategory)>(sortedEntries, 0, itemsPerPage);
    // }
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };
  public func searchEvents(array : Events, search : Text, startIndex : Nat, length : Nat, status : EventStatus, month : ?Nat, country : ?Text, city : ?Text) : {
    entries : Events;
    amount : Nat;
  } {
    let searchString = Text.map(search, Prim.charToLower);
    var searchedEvents = Map.HashMap<EventId, Event>(0, Text.equal, Text.hash);
    let currentTime = Time.now() / 1000000;
    for ((key, event) in array.vals()) {

      let eventName = Text.map(event.title, Prim.charToLower);
      var isEventSearched = Text.contains(eventName, #text searchString);
      var isStatusMatched = false;
      switch (status) {
        case (#all) {
          isStatusMatched := true;
        };
        case (#past) {
          if (event.endDate <= currentTime) {
            isStatusMatched := true;
          } else {
            isStatusMatched := false;
          };

        };
        case (#upcoming) {
          if (event.date >= currentTime) {
            isStatusMatched := true;
          } else {
            isStatusMatched := false;
          };
        };
        case (#ongoing) {
          if (event.date <= currentTime and event.endDate >= currentTime) {
            isStatusMatched := true;
          } else {
            isStatusMatched := false;
          };
        };
      };

      if (isEventSearched and isStatusMatched) {
        switch (month) {
          case (?isMonth) {
            if (event.month == isMonth) {
              switch (country) {
                case (?isCountry) {
                  if (event.country == isCountry) {
                    switch (city) {
                      case (?isCity) {
                        if (event.city == isCity) {
                          searchedEvents.put(key, event);
                        };
                      };
                      case (null) {
                        searchedEvents.put(key, event);

                      };
                    };
                  };
                };
                case (null) {
                  switch (city) {
                    case (?isCity) {
                      if (event.city == isCity) {
                        searchedEvents.put(key, event);
                      };
                    };
                    case (null) {
                      searchedEvents.put(key, event);

                    };
                  };
                };
              };
            };
          };
          case (null) {
            switch (country) {
              case (?isCountry) {
                if (event.country == isCountry) {
                  switch (city) {
                    case (?isCity) {
                      if (event.city == isCity) {
                        searchedEvents.put(key, event);
                      };
                    };
                    case (null) {
                      searchedEvents.put(key, event);

                    };
                  };
                };
              };
              case (null) {
                switch (city) {
                  case (?isCity) {
                    if (event.city == isCity) {
                      searchedEvents.put(key, event);
                    };
                  };
                  case (null) {
                    searchedEvents.put(key, event);

                  };
                };
              };
            };
          };
        };

      };
    };
    var searchedEventsArray : [(EventId, Event)] = Iter.toArray(searchedEvents.entries());
    let absDiff = func(a : Time.Time, b : Time.Time) : Time.Time {
      if (a > b) {
        return a - b;
      } else {
        return b - a;
      };
    };
    let compare = func((keyA : EventId, a : Event), (keyB : EventId, b : Event)) : Order.Order {
      // if (a.date < b.date) {
      //   return #less;
      // } else if (a.date > b.date) {
      //   return #greater;
      // } else {
      //   return #equal;
      // };
      let currentDate = Time.now() / 1000000; // Get the current time as an Int
      let diffA = absDiff(currentDate, a.date);
      let diffB = absDiff(currentDate, b.date);

      if (diffA < diffB) {
        return #less;
      } else if (diffA > diffB) {
        return #greater;
      } else {
        return #equal;
      };
    };
    let sortedEntries = Array.sort(
      searchedEventsArray,
      compare,
    );
    var paginatedArray : Events = [];
    let size = sortedEntries.size();
    let amount : Nat = size - startIndex;
    let itemsPerPage = 10;
    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(EventId, Event)>(sortedEntries, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      if (length != 0) {
        paginatedArray := Array.subArray<(EventId, Event)>(sortedEntries, startIndex, amount);
      } else {
        paginatedArray := Array.subArray<(EventId, Event)>(sortedEntries, startIndex, itemsPerPage);

      };

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(EventId, Event)>(sortedEntries, startIndex, amount);

    } else if (size > startIndex) {
      paginatedArray := Array.subArray<(EventId, Event)>(sortedEntries, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(EventId, Event)>(sortedEntries, 0, itemsPerPage);
    } else {
      paginatedArray := sortedEntries;
    };
    return { entries = paginatedArray; amount = sortedEntries.size() };
  };

};
