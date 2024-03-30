import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import ImageType "../model/ImageType";
import Time "mo:base/Time";
import Bool "mo:base/Bool";
import Float "mo:base/Float";
import Int16 "mo:base/Int16";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Order "mo:base/Order";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import EntryType "../model/EntryType";
import Prim "mo:prim";
import EntryStoreHelper "../helper/EntryStoreHelper";
import Web3StoreHelper "../helper/web3StoreHelper";

import UserType "../model/UserType";

shared ({ caller = initializer }) actor class () {

  type Title = Text;
  type Key = Text;
  type Entry = EntryType.Entry;
  type UserId = EntryType.UserId;
  type InputEntry = EntryType.InputEntry;
  type EntryId = EntryType.EntryId;
  type Web3Id = Text;
  type EntryStatus = EntryType.EntryStatus;
  type ListEntryItem = EntryType.ListEntryItem;
  type ListPodcastItem = EntryType.ListPodcastItem;
  type Entries = [(Key, Entry)];
  type Permission = UserType.Permission;
  type User = UserType.User;
  type ActivityType = UserType.ActivityType;
  type AdminActivityType = UserType.AdminActivityType;
  type RewardConfig = { master : Nat; admin : Nat; platform : Nat };
  type LikeReward = Nat;
  type Web3 = EntryType.Web3;
  type InputWeb3 = EntryType.InputWeb3;
  type Web3List = EntryType.Web3List;
  type TrendingEntryItemSidebar = EntryType.TrendingEntryItemSidebar;

  type Web3DashboardList = EntryType.Web3DashboardList;
  type Web3Status = EntryType.Web3Status;
  //
  type ImageObject = ImageType.ImageObject;
  type NewImageObject = ImageType.NewImageObject;
  type SubAccount = UserType.SubAccount;
  type Icrc1Timestamp = UserType.Icrc1Timestamp;
  type Icrc1Tokens = UserType.Icrc1Tokens;
  type Icrc1BlockIndex = UserType.Icrc1BlockIndex;

  type Account = UserType.Account;
  type TransferFromArgs = UserType.TransferFromArgs;
  type TransferFromResult = UserType.TransferFromResult;

  type TransferFromError = UserType.TransferFromError;
  type CategoryId = EntryType.CategoryId;
  type Category = EntryType.Category;
  type ListCategory = EntryType.ListCategory;
  type NestedCategory = EntryType.NestedCategory;
  type InputCategory = EntryType.InputCategory;
  type Categories = [(CategoryId, Category)];
  type NestedCategories = [(CategoryId, NestedCategory)];
  type ListCategories = [(CategoryId, ListCategory)];
  type EventId = EntryType.EventId;
  type Event = EntryType.Event;
  type Events = EntryType.Events;
  type InputEvent = EntryType.InputEvent;
  type EntryMetadata = EntryType.EntryMetadata;
  type EventMetadata = EntryType.EventMetadata;
  type Web3MetaData = EntryType.Web3MetaData;

  type EventStatus = EntryType.EventStatus;
  //
  type TransactionHistoryItem = {
    user : Principal;
    platform : Nat;
    admin : Nat;
    creation_time : Int;
  };
  type TransactionHistory = List.List<TransactionHistoryItem>;

  var MAX_TRANSACTIONS = 10;
  let MASTER_WALLET = UserType.MASTER_WALLET;
  let PLATFORM_WALLET = UserType.PLATFORM_WALLET;
  let ADMIN_WALLET = UserType.ADMIN_WALLET;
  private let MAX_CATEGORY_NAME_CHARS = 100;
  private let MAX_CATEGORY_DESCRIPTION_CHARS = 3000;
  private let MAX_CATEGORY_SLUG_CHARS = 100;
  let MAX_TITLE_CHARS = 300;
  let MAX_SHORT_DESCRIPTION_CHARS = 500;
  let MAX_LOCATION_CHARS = 500;
  let MAX_COUNTRY_CHARS = 300;
  let MAX_CITY_CHARS = 300;
  let MAX_WEBSITE_CHARS = 500;
  let MAX_CATEGORY_CHARS = 400;
  let MAX_TAGS_CHARS = 500;
  let MAX_LINKEDIN_CHARS = 2045;
  let MAX_IMAGE_CHARS = 500;
  let MAX_SEO_TITLE_CHARS = 500;
  let MAX_SEO_SLUG_CHARS = 300;
  let MAX_SEO_DESCRIPTION_CHARS = 500;
  let MAX_SEO_EXCERPT_CHARS = 500;
  private let MAX_NAME_CHARS = 40;

  // Stable Variables
  stable var stable_entries : Entries = [];
  stable var stable_events : Events = [];
  stable var stable_categories : [Text] = ["Web 3 Blockchain", "Crypto", "Defi", "Dao", "NFT", "Metaverse Directory", "Event", "Blockchain Game"];
  stable var tstable_categories : Categories = [];
  stable var stable_web3 : [(Key, Web3)] = [];
  stable var reward_config : RewardConfig = {
    master = 80;
    admin = 10;
    platform = 10;
  };
  stable var like_reward : LikeReward = 1000;
  stable var transaction_history : TransactionHistory = List.nil();
  // Data Structures
  var entryStorage = Map.fromIter<Key, Entry>(stable_entries.vals(), 0, Text.equal, Text.hash);
  var web3Storage = Map.fromIter<Key, Web3>(stable_web3.vals(), 0, Text.equal, Text.hash);
  var categoryStorage = Map.fromIter<CategoryId, Category>(tstable_categories.vals(), 0, Text.equal, Text.hash);
  var eventStorage = Map.fromIter<EventId, Event>(stable_events.vals(), 0, Text.equal, Text.hash);

  private var sectek = "#cosa@erwe0ss1s<e}s*dfCc<e>c!dwa)<vvde>";
  // var entryStorage = Map.HashMap<Key, Entry>(0, Text.equal, Text.hash);

  func sortByCategory(inputCategory : Text, entriesList : Map.HashMap<Key, ListEntryItem>, key : Text, lisEntryItem : ListEntryItem, entry : Entry) : Map.HashMap<Key, ListEntryItem> {
    if (inputCategory == "All") {
      entriesList.put(key, lisEntryItem);
    } else {
      let tempCategories = entry.category;
      for (category in tempCategories.vals()) {
        if (category == inputCategory) {
          entriesList.put(key, lisEntryItem);
        };
      };
    };
    return entriesList;
  };
  func shouldSendEntry(entry : Entry) : Bool {
    if (not entry.isDraft and not entry.isPodcast) {
      switch (entry.status) {
        case (#approved) {
          // sortedEntries.put(key, entry);

          return true;
        };
        case (_) {
          return false;
        };
      };
    } else {
      return false;
    };
  };
  func shouldSendContent(entry : Entry) : Bool {
    if (not entry.isDraft) {
      switch (entry.status) {
        case (#approved) {
          // sortedEntries.put(key, entry);

          return true;
        };
        case (_) {
          return false;
        };
      };
    } else {
      return false;
    };
  };
  func shouldSendListEntry(status : EntryStatus) : Bool {
    switch (status) {
      case (#approved) {
        return true;
      };
      case (_) {
        return false;
      };
    };

  };
  func idsToCategoriest(childArray : [CategoryId]) : ListCategories {
    var nestedCategoriesMap = Map.HashMap<CategoryId, ListCategory>(0, Text.equal, Text.hash);
    for (id in childArray.vals()) {
      let isChildCategory = categoryStorage.get(id);
      switch (isChildCategory) {
        case (?childCategory) {
          // var nestedCategories : ?NestedCategories = ?[];
          var hasMore = false;

          let newChild : ListCategory = {
            name = childCategory.name;
            slug = childCategory.slug;
            description = childCategory.description;
            creation_time = childCategory.creation_time;
            user = childCategory.user;
            parentCategoryId = childCategory.parentCategoryId;
            children = childCategory.children;
            isChild = childCategory.isChild;
            articleCount = childCategory.articleCount;
            podcastCount = childCategory.podcastCount;
            eventsCount = childCategory.eventsCount;
            directoryCount = childCategory.directoryCount;
            pressReleaseCount = childCategory.pressReleaseCount;
            totalCount = childCategory.totalCount;
            logo = childCategory.logo;
          };
          nestedCategoriesMap.put(id, newChild);

        };
        case (null) {

        };
      };
    };
    return Iter.toArray(nestedCategoriesMap.entries());
  };
  func getCategoriesChildren(categories : Categories) : NestedCategories {
    var nestedCategories = Map.HashMap<CategoryId, NestedCategory>(0, Text.equal, Text.hash);

    for ((id, category) in categories.vals()) {
      switch (category.children) {
        case (?children) {
          let childCategories = idsToCategoriest(children);

        };
        case (null) {

        };
      };
    };
    let nestedArray = Iter.toArray(nestedCategories.entries());
    return nestedArray;
  };
  public shared ({ caller }) func insertEntry(entry : InputEntry, userCanisterId : Text, isDraftUpdate : Bool, draftId : Text, commentCanisterId : Text) : async Result.Result<(Text, EntryId), (Text)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      check_user_exists : (caller : Principal) -> async Bool;
    };
    let isUser = await userCanister.check_user_exists(caller);
    assert isUser;
    let commentCanister = actor (commentCanisterId) : actor {
      addActivity : (user : Principal, target : Text, activityType : ActivityType, title : Text) -> async Bool;
    };
    let LEDGER = actor "ryjl3-tyaaa-aaaaa-aaaba-cai" : actor {
      icrc2_transfer_from : (TransferFromArgs) -> async (TransferFromResult);
    };

    if (isDraftUpdate) {
      let maybeOldEntry = entryStorage.get(draftId);
      switch (maybeOldEntry) {
        case (?oldEntry) {
          if (oldEntry.user != caller) {
            return #err("Error while saving draft");
          };
        };
        case (null) {
          return #err("Error while saving draft");
        };
      };
    };
    if (entry.isPromoted and entry.pressRelease) {
      return #err("Not Allowed");
    };
    if (entry.isPromoted) {
      if (List.size(transaction_history) >= MAX_TRANSACTIONS) {
        var totalPlatformFee = 0;
        var totalAdminFee = 0;
        func iterVals(item : TransactionHistoryItem) : Bool {
          totalPlatformFee := totalPlatformFee + item.platform;
          totalAdminFee := totalAdminFee + item.admin;
          return false;
        };
        let newHistory = List.filter<TransactionHistoryItem>(transaction_history, iterVals);
        transaction_history := List.nil();
        let platformRes = await LEDGER.icrc2_transfer_from({
          amount = totalPlatformFee;
          created_at_time = null;
          fee = null;
          from = {
            owner = Principal.fromText(MASTER_WALLET);
            subaccount = null;
          };
          memo = null;
          spender_subaccount = null;
          to = {
            owner = Principal.fromText(PLATFORM_WALLET);
            subaccount = null;
          };
        });
        let adminRes = await LEDGER.icrc2_transfer_from({
          amount = totalAdminFee;
          created_at_time = null;
          fee = null;
          from = {
            owner = Principal.fromText(MASTER_WALLET);
            subaccount = null;
          };
          memo = null;
          spender_subaccount = null;
          to = {
            owner = Principal.fromText(ADMIN_WALLET);
            subaccount = null;
          };
        });
      };

      let gasFee = (10000 * 2) / MAX_TRANSACTIONS;
      let rewardToGive = entry.promotionICP + gasFee;
      let response = await LEDGER.icrc2_transfer_from({
        amount = rewardToGive;
        created_at_time = null;
        fee = null;
        from = { owner = caller; subaccount = null };
        memo = null;
        spender_subaccount = null;
        to = { owner = Principal.fromText(MASTER_WALLET); subaccount = null };
      });
      let platformPercentage : Float = Float.fromInt(reward_config.platform) / 100;
      let adminPercentage : Float = Float.fromInt(reward_config.admin) / 100;
      let platformFee = (platformPercentage * Float.fromInt(entry.promotionICP));
      let adminFee = (adminPercentage * Float.fromInt(entry.promotionICP));
      var newTransaction : TransactionHistoryItem = {
        user = caller;
        platform = Int.abs(Float.toInt(platformFee));
        admin = Int.abs(Float.toInt(adminFee));
        creation_time = Time.now() / 1000000;
      };
      let new_transaction_history = List.push(newTransaction, transaction_history);
      transaction_history := new_transaction_history;

      switch (response) {
        case (#Ok(_)) {

        };
        case (#Err(_)) {
          return #err("Error during transaction");
        };
      };
    };
    let entryId = EntryType.generateNewRemoteObjectId();
    let masterPercentage : Float = Float.fromInt(reward_config.master) / 100;
    let articlePool = (masterPercentage * Float.fromInt(entry.promotionICP));
    // let articlePool : Nat = Int.abs(Float.toInt(masterPercentage));

    entryStorage := EntryStoreHelper.addNewEntry(entryStorage, entry, entryId, caller, isDraftUpdate, draftId, Int.abs(Float.toInt(articlePool)), stable_categories);
    if (not entry.isDraft) {
      if (isDraftUpdate) {
        if (entry.isPodcast) {
          let activited = commentCanister.addActivity(caller, draftId, #create_podcats, entry.title);

        } else if (entry.pressRelease) {
          let activited = commentCanister.addActivity(caller, draftId, #create_pressRelease, entry.title);

        } else {
          let activited = commentCanister.addActivity(caller, draftId, #create, entry.title);

        };
      } else {
        if (entry.isPodcast) {
          let activited = commentCanister.addActivity(caller, entryId, #create_podcats, entry.title);

        } else if (entry.pressRelease) {
          let activited = commentCanister.addActivity(caller, draftId, #create_pressRelease, entry.title);

        } else {
          if (entry.isPromoted) {
            let activited = commentCanister.addActivity(caller, entryId, #promote, entry.title);

          } else {
            let activited = commentCanister.addActivity(caller, entryId, #create, entry.title);

          };

        };

      };
    };
    if (isDraftUpdate) {
      return #ok("Published", draftId);
    } else {
      return #ok("Published", entryId);
    };
  };
  public shared ({ caller }) func updateEntry(tempEntry : Entry, key : Text) : async Bool {
    let newEntry = entryStorage.replace(key, tempEntry);
    return true;
  };
  public shared ({ caller }) func updateUserEntries(userId : UserId, userName : Text) : async Bool {
    assert not Principal.isAnonymous(caller);

    for ((key, entry) in entryStorage.entries()) {
      if (entry.user == userId) {
        //  Debug.print(debug_show (entry,userId,userName,"entry is here"));
        let tempEntry : Entry = {
          title = entry.title;
          description = entry.description;
          image = entry.image;
          creation_time = entry.creation_time;
          user = entry.user;
          views = entry.views;
          likes = entry.likes;
          category = entry.category;
          seoTitle = entry.seoTitle;
          seoSlug = entry.seoSlug;
          viewedUsers = entry.viewedUsers;
          likedUsers = entry.viewedUsers;
          seoDescription = entry.seoDescription;
          seoExcerpt = entry.seoExcerpt;
          subscription = entry.subscription;
          isDraft = entry.isDraft;
          isPromoted = entry.isPromoted;
          promotionICP = entry.promotionICP;
          minters = entry.minters;
          userName = userName;
          status = entry.status;
          promotionHistory = entry.promotionHistory;
          pressRelease = entry.pressRelease;
          caption = entry.caption;
          tags = entry.tags;
          isCompanySelected = entry.isCompanySelected;
          companyId = entry.companyId;
          isPodcast = entry.isPodcast;
          podcastVideoLink = entry.podcastVideoLink;
          podcastImgCation = entry.podcastImgCation;
          isStatic = entry.isStatic;
          podcastImg = entry.podcastImg;
        };
        let isok = entryStorage.replace(key, tempEntry);

      };

    };

    return true;

  };

  public query ({ caller }) func getEntry(key : Key) : async ?Entry {
    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        if (isEntry.status == #approved) {
          return maybeEntry;
        } else {
          if (isEntry.user == caller) {
            return maybeEntry;
          } else {
            return null;
          };
        };
      };
      case (null) {
        return null;
      };
    };
  };
  public query ({ caller }) func getEntry_admin(key : Key) : async ?Entry {

    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        return maybeEntry;
      };
      case (null) {
        return null;
      };
    };
  };
  public query ({ caller }) func getEntryMeta(key : Key) : async EntryMetadata {
    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        return {
          title = isEntry.title;
          caption = isEntry.caption;
          seoTitle = isEntry.seoTitle;
          companyId = isEntry.companyId;
          creation_time = isEntry.creation_time;
          isCompanySelected = isEntry.isCompanySelected;
          isPodcast = isEntry.isPodcast;
          podcastVideoLink = isEntry.podcastVideoLink;
          podcastImgCation = isEntry.podcastImgCation;
          podcastImg = isEntry.podcastImg;
          isPromoted = isEntry.isPromoted;
          pressRelease = isEntry.pressRelease;
          tags = isEntry.tags;
          seoExcerpt = isEntry.seoExcerpt;
          status = isEntry.status;
          user = isEntry.user;
          userName = isEntry.userName;
          seoSlug = isEntry.seoSlug;
          seoDescription = isEntry.seoDescription;
          image = isEntry.image;
          category = isEntry.category;
          description = isEntry.description;
        };
      };
      case (null) {
        return {
          title = "Default field";
          caption = "Default field";
          seoTitle = "Default field";
          companyId = "Default field";
          creation_time = Time.now() / 100000;
          isCompanySelected = false;
          isPodcast = false;
          podcastVideoLink = "Default field";
          podcastImgCation = "Default field";
          podcastImg = ?"Default field";
          isPromoted = false;
          pressRelease = false;
          tags = ["Default field"];
          seoExcerpt = "Default field";
          status = #pending;
          user = caller;
          userName = "Default field";
          seoSlug = "Default field";
          seoDescription = "Default field";
          image = ?"Default field";
          category = ["Default field"];
          description = "Default field";
        };
      };
    };
  };
  public query ({ caller }) func getEventMeta(key : Key) : async EventMetadata {
    let maybeEntry = eventStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        return {
          title = isEntry.title;
          shortDescription = isEntry.shortDescription;
          date = isEntry.date;
          endDate = isEntry.endDate;
          location = isEntry.location;
          country = isEntry.country;
          city = isEntry.city;
          website = isEntry.website;
          category = isEntry.category;
          tags = isEntry.tags;
          organiser = isEntry.organiser;
          image = isEntry.image;
          creation_time = isEntry.creation_time;
          month = isEntry.month;
          user = isEntry.user;
          seoTitle = isEntry.seoTitle;
          seoSlug = isEntry.seoSlug;
          seoDescription = isEntry.seoDescription;
          seoExcerpt = isEntry.seoExcerpt;
          description = isEntry.description;
          freeTicket = isEntry.freeTicket;
          applyTicket = isEntry.applyTicket;
        };
      };
      case (null) {
        return {

          title = "Default field";
          shortDescription = "Default field";
          date = Time.now() / 100000;
          endDate = Time.now() / 100000;
          location = "Default location";
          country = "Default country";
          city = "Default city";
          website = "Default website";
          category = ["Default field"];
          tags = ["Default field"];
          organiser = "Default field";
          image = "Default field";
          creation_time = Time.now() / 100000;
          month = 2;
          user = caller;
          seoTitle = "Default field";
          seoSlug = "Default field";
          seoDescription = "Default field";
          seoExcerpt = "Default field";
          description = "description";
          freeTicket = "freeTicket";
          applyTicket = "applyTicket";
        };
      };
    };
  };
  public shared ({ caller }) func makeStatic(key : Key) : async Bool {
    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        let newStatic = true;
        var tempEntry : Entry = {
          title = isEntry.title;
          description = isEntry.description;
          image = isEntry.image;
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
          isPromoted = isEntry.isPromoted;
          minters = isEntry.minters;
          userName = isEntry.userName;
          promotionICP = isEntry.promotionICP;
          status = isEntry.status;
          promotionHistory = isEntry.promotionHistory;
          pressRelease = isEntry.pressRelease;
          caption = isEntry.caption;
          tags = isEntry.tags;
          isCompanySelected = isEntry.isCompanySelected;
          companyId = isEntry.companyId;
          isPodcast = isEntry.isPodcast;
          podcastVideoLink = isEntry.podcastVideoLink;
          podcastImgCation = isEntry.podcastImgCation;
          podcastImg = isEntry.podcastImg;
          isStatic = newStatic;
        };
        let old = entryStorage.replace(key, tempEntry);
        return true;
      };
      case (null) {
        return false;
      };
    };
  };
  public shared ({ caller }) func makeStaticEvent(key : Key) : async Bool {
    let maybeEntry = eventStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        let newStatic = true;
        var tempEntry : Event = {
          title = isEntry.title;
          shortDescription = isEntry.shortDescription;
          description = isEntry.description;
          date = isEntry.date;
          endDate = isEntry.endDate;
          location = isEntry.location;
          country = isEntry.country;
          city = isEntry.city;
          website = isEntry.website;
          category = isEntry.category;
          tags = isEntry.tags;
          linkdin = isEntry.linkdin;
          image = isEntry.image;
          creation_time = isEntry.creation_time;
          user = isEntry.user;
          seoTitle = isEntry.seoTitle;
          seoSlug = isEntry.seoSlug;
          seoDescription = isEntry.seoDescription;
          seoExcerpt = isEntry.seoExcerpt;
          month = isEntry.month;
          facebook = isEntry.facebook;
          telegram = isEntry.telegram;
          instagram = isEntry.instagram;
          twitter = isEntry.twitter;
          organiser = isEntry.organiser;
          freeTicket = isEntry.freeTicket;
          applyTicket = isEntry.applyTicket;
          lat = isEntry.lat;
          lng = isEntry.lng;
          isStatic = newStatic;
          discountTicket = isEntry.discountTicket;

        };
        let old = eventStorage.replace(key, tempEntry);
        return true;
      };
      case (null) {
        return false;
      };
    };
  };
  public query ({ caller }) func getWeb3Meta(key : Key) : async Web3MetaData {
    let maybeEntry = web3Storage.get(key);
    switch (maybeEntry) {
      case (?isWeb3) {

        return {
          company = isWeb3.company;
          shortDescription = isWeb3.shortDescription;
          companyUrl = isWeb3.companyUrl;
          facebook = isWeb3.facebook;
          instagram = isWeb3.instagram;
          linkedin = isWeb3.linkedin;
          discord = isWeb3.discord;
          telegram = isWeb3.telegram;
          twitter = isWeb3.twitter;
          founderName = isWeb3.founderName;
          companyBanner = isWeb3.companyBanner;
          catagory = isWeb3.catagory;
          founderDetail = isWeb3.founderDetail;
          founderImage = isWeb3.founderImage;
          companyDetail = isWeb3.companyDetail;
          creation_time = isWeb3.creation_time;
          user = isWeb3.user;
          status = isWeb3.status;
          companyLogo = isWeb3.companyLogo;
        };
      };
      case (null) {
        return {
          company = "company";
          shortDescription = "shortDescription";
          companyUrl = ?"companyUrl";
          facebook = ?"facebook";
          instagram = ?"instagram";
          linkedin = ?"linkedin";
          discord = ?"discord";
          telegram = ?"telegram";
          twitter = ?"twitter";
          founderName = "founderName";
          companyBanner = "companyBanner";
          catagory = "catagory";
          founderDetail = "founderDetail";
          founderImage = "founderImage";
          companyDetail = "companyDetail";
          creation_time = Time.now() / 100000;
          user = caller;
          status = #un_verfied;
          companyLogo = "companyLogo";
        };
      };
    };
  };
  public query func getAllWeb3Ids() : async [Key] {
    var filteredKeys : [Key] = [];
    for (key in web3Storage.keys()) {
      let entry = web3Storage.get(key);
      switch (entry) {
        case (null) {
          // Handle null case if needed
        };
        case (?entryValue) {
          switch (entryValue.status) {
            case (#verfied) {
              filteredKeys := Array.append(filteredKeys, [key]);

            };
            case (_) {

            };
          };

        };
      };
    };
    return filteredKeys;

  };
  public shared ({ caller }) func makeStaticWeb3(key : Key) : async Bool {
    let maybeEntry = web3Storage.get(key);
    switch (maybeEntry) {
      case (?web3) {

        let tempWeb3 : Web3 = {
          company = web3.company;
          shortDescription = web3.shortDescription;
          founderName = web3.founderName;
          founderDetail = web3.founderDetail;
          founderImage = web3.founderImage;
          companyBanner = web3.companyBanner;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          user = web3.user;
          status = web3.status;
          likes = web3.likes;
          likedUsers = web3.likedUsers;
          companyUrl = web3.companyUrl;
          facebook = web3.facebook;
          instagram = web3.instagram;
          linkedin = web3.linkedin;
          companyDetail = web3.companyDetail;
          companyLogo = web3.companyLogo;
          discord = web3.discord;
          telegram = web3.telegram;
          twitter = web3.twitter;
          views = web3.views;
          articleCount = web3.articleCount;
          podcastCount = web3.podcastCount;
          pressReleaseCount = web3.pressReleaseCount;
          totalCount = web3.totalCount;
          isStatic = true;
          founderEmail = web3.founderEmail;

        };
        let newEntry = web3Storage.replace(key, tempWeb3);
        return true;
      };
      case (null) {
        return false;
      };
    };
  };
  public shared ({ caller }) func addView(key : Key) : async Bool {
    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        if (isEntry.status != #approved) return false;

        let newViews = isEntry.views + 1;

        var tempEntry : Entry = {
          title = isEntry.title;
          description = isEntry.description;
          image = isEntry.image;
          creation_time = isEntry.creation_time;
          user = isEntry.user;
          views = newViews;
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
          isPromoted = isEntry.isPromoted;
          minters = isEntry.minters;
          userName = isEntry.userName;
          promotionICP = isEntry.promotionICP;
          status = isEntry.status;
          promotionHistory = isEntry.promotionHistory;
          pressRelease = isEntry.pressRelease;
          caption = isEntry.caption;
          tags = isEntry.tags;
          isCompanySelected = isEntry.isCompanySelected;
          companyId = isEntry.companyId;
          isPodcast = isEntry.isPodcast;
          podcastVideoLink = isEntry.podcastVideoLink;
          podcastImgCation = isEntry.podcastImgCation;
          podcastImg = isEntry.podcastImg;
          isStatic = isEntry.isStatic;

        };
        Debug.print(debug_show (tempEntry.views, tempEntry.viewedUsers));
        let newEntry = entryStorage.replace(key, tempEntry);
        return true;

      };

      case (null) {
        return false;
      };
    };
  };
  public shared ({ caller }) func addWeb3View(key : Key) : async Bool {
    let maybeEntry = web3Storage.get(key);
    switch (maybeEntry) {
      case (?web3) {
        var tempviews = web3.views +1;
        let tempWeb3 : Web3 = {
          company = web3.company;
          shortDescription = web3.shortDescription;
          founderName = web3.founderName;
          founderDetail = web3.founderDetail;
          founderImage = web3.founderImage;
          companyBanner = web3.companyBanner;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          user = web3.user;
          status = web3.status;
          likes = web3.likes;
          likedUsers = web3.likedUsers;
          companyUrl = web3.companyUrl;
          facebook = web3.facebook;
          instagram = web3.instagram;
          linkedin = web3.linkedin;
          companyDetail = web3.companyDetail;
          companyLogo = web3.companyLogo;
          discord = web3.discord;
          telegram = web3.telegram;
          twitter = web3.twitter;
          views = tempviews;
          articleCount = web3.articleCount;
          podcastCount = web3.podcastCount;
          pressReleaseCount = web3.pressReleaseCount;
          totalCount = web3.totalCount;
          isStatic = web3.isStatic;
          founderEmail = web3.founderEmail;

        };
        let newEntry = web3Storage.replace(key, tempWeb3);
        return true;
      };
      case (null) {
        return false;
      };
    };
  };
  public shared ({ caller }) func addWeb3postCount(key : Key, creationType : Text) : async Bool {
    let maybeEntry = web3Storage.get(key);
    switch (maybeEntry) {
      case (?web3) {

        var tempPodcastCount = web3.podcastCount;
        var temppressReleaseCount = web3.pressReleaseCount;
        var temparticleCount = web3.articleCount;
        var temptotalCount = web3.totalCount +1;
        if (creationType == "podcast") {
          tempPodcastCount += 1;
        };
        if (creationType == "pressRelease") {
          temppressReleaseCount += 1;
        };
        if (creationType == "article") {
          temparticleCount += 1;
        };
        let tempWeb3 : Web3 = {
          company = web3.company;
          shortDescription = web3.shortDescription;
          founderName = web3.founderName;
          founderDetail = web3.founderDetail;
          founderImage = web3.founderImage;
          companyBanner = web3.companyBanner;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          user = web3.user;
          status = web3.status;
          likes = web3.likes;
          likedUsers = web3.likedUsers;
          companyUrl = web3.companyUrl;
          facebook = web3.facebook;
          instagram = web3.instagram;
          linkedin = web3.linkedin;
          companyDetail = web3.companyDetail;
          companyLogo = web3.companyLogo;
          discord = web3.discord;
          telegram = web3.telegram;
          twitter = web3.twitter;
          views = web3.views;
          articleCount = temparticleCount;
          podcastCount = tempPodcastCount;
          pressReleaseCount = temppressReleaseCount;
          totalCount = temptotalCount;
          isStatic = web3.isStatic;
          founderEmail = web3.founderEmail;

        };
        let newEntry = web3Storage.replace(key, tempWeb3);
        return true;
      };
      case (null) {
        return false;
      };
    };
  };
  public shared ({ caller }) func editViews(key : Key, inputViews : Nat, userCanisterId : Text, commentCanisterId : Text) : async Bool {

    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    assert not Principal.isAnonymous(caller);
    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        if (isEntry.status != #approved) return false;
        let newViews = inputViews;
        var tempEntry : Entry = {
          title = isEntry.title;
          description = isEntry.description;
          image = isEntry.image;
          creation_time = isEntry.creation_time;
          user = isEntry.user;
          views = newViews;
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
          isPromoted = isEntry.isPromoted;
          minters = isEntry.minters;
          userName = isEntry.userName;
          promotionICP = isEntry.promotionICP;
          status = isEntry.status;
          promotionHistory = isEntry.promotionHistory;
          pressRelease = isEntry.pressRelease;
          caption = isEntry.caption;
          tags = isEntry.tags;
          isCompanySelected = isEntry.isCompanySelected;
          companyId = isEntry.companyId;
          isPodcast = isEntry.isPodcast;
          podcastVideoLink = isEntry.podcastVideoLink;
          podcastImgCation = isEntry.podcastImgCation;
          podcastImg = isEntry.podcastImg;
          isStatic = isEntry.isStatic;
        };
        let activitied = commentCanister.addAdminActivity(caller, key, #editViews, isEntry.title);
        let newEntry = entryStorage.replace(key, tempEntry);
        return true;
      };
      case (null) {
        return false;
      };
    };
  };
  public shared ({ caller }) func editWeb3Views(key : Key, inputViews : Nat, userCanisterId : Text, commentCanisterId : Text) : async Bool {

    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    assert not Principal.isAnonymous(caller);
    let maybeEntry = web3Storage.get(key);
    switch (maybeEntry) {
      case (?web3) {
        let tempWeb3 : Web3 = {
          company = web3.company;
          shortDescription = web3.shortDescription;
          founderName = web3.founderName;
          founderDetail = web3.founderDetail;
          founderImage = web3.founderImage;
          companyBanner = web3.companyBanner;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          user = web3.user;
          status = web3.status;
          likes = web3.likes;
          likedUsers = web3.likedUsers;
          companyUrl = web3.companyUrl;
          facebook = web3.facebook;
          instagram = web3.instagram;
          linkedin = web3.linkedin;
          companyDetail = web3.companyDetail;
          companyLogo = web3.companyLogo;
          discord = web3.discord;
          telegram = web3.telegram;
          twitter = web3.twitter;
          views = inputViews;
          articleCount = web3.articleCount;
          podcastCount = web3.podcastCount;
          pressReleaseCount = web3.pressReleaseCount;
          totalCount = web3.totalCount;
          isStatic = web3.isStatic;
          founderEmail = web3.founderEmail;

        };

        let activitied = commentCanister.addAdminActivity(caller, key, #editWeb3Views, web3.company);
        let newEntry = web3Storage.replace(key, tempWeb3);
        return true;
      };
      case (null) {
        return false;
      };
    };
  };

  public query func getCategories() : async [Text] {
    return stable_categories;
  };
  public shared ({ caller }) func addCategory(categoryName : Text, userCanisterId : Text, commentCanisterId : Text) : async [Text] {
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let newCategories = Array.append<Text>([categoryName], stable_categories);

    stable_categories := newCategories;
    // stable_categories := ["AI", "BlockChain", "Guide", "GameReview"];
    return newCategories;
  };
  public shared ({ caller }) func likeEntry(key : Key, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, Bool), (Text)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      add_reward : (caller : Principal, like_reward : Nat) -> async Bool;
      check_user_exists : (caller : Principal) -> async Bool;
      get_NFT24Coin : () -> async Nat;
    };
    let commentCanister = actor (commentCanisterId) : actor {
      addActivity : (user : Principal, target : Text, activityType : ActivityType, title : Text) -> async Bool;
    };

    let isUser = await userCanister.check_user_exists(caller);
    assert isUser;

    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {
        var tempLikedUsers = isEntry.likedUsers;
        var isLiked = Array.find<Principal>(tempLikedUsers, func x = x == caller);
        var isPromoted = isEntry.isPromoted;
        var newPromoted = false;

        if (isPromoted) {
          switch (isLiked) {
            case (?liked) {
              return #err("Not Allowed");
            };
            case (null) {
              // let isTargetReached = isEntry.likes >= isEntry.promotionLikesTarget;
              // if (isTargetReached) {
              //   newPromoted := false;
              // } else {
              //   newPromoted := true;
              // };
              var oneCoinsValue = await userCanister.get_NFT24Coin();
              var tempRewardAmount = oneCoinsValue * like_reward;
              var newPromotionICP : Nat = isEntry.promotionICP;
              var shouldReward = false;
              if ((newPromotionICP - tempRewardAmount) : Int == 0) {
                newPromotionICP := newPromotionICP - tempRewardAmount;
                newPromoted := false;
                shouldReward := true;
              } else if ((newPromotionICP - tempRewardAmount) : Int <= 0) {
                shouldReward := false;
                newPromoted := false;
              } else {
                newPromotionICP := newPromotionICP - tempRewardAmount;
                newPromoted := true;
                shouldReward := true;
              };
              let newLikedUsers = Array.append(tempLikedUsers, [caller]);
              var isUserRewarded = true;
              if (shouldReward) {
                isUserRewarded := await userCanister.add_reward(caller, like_reward);
              };

              if (isUserRewarded) {
                var tempcompanyId = "";
                var tempImg : ?NewImageObject = null;
                if (isEntry.image != null) {

                  tempImg := isEntry.image;

                };
                var temppodcastImg : ?NewImageObject = null;
                if (isEntry.podcastImg != null) {

                  temppodcastImg := isEntry.podcastImg;

                };
                tempcompanyId := isEntry.companyId;
                var tempEntry : Entry = {
                  title = isEntry.title;
                  description = isEntry.description;
                  image = tempImg;
                  creation_time = isEntry.creation_time;
                  user = isEntry.user;
                  views = isEntry.views;
                  likes = isEntry.likes +1;
                  category = isEntry.category;
                  seoTitle = isEntry.seoTitle;
                  seoSlug = isEntry.seoSlug;
                  viewedUsers = isEntry.viewedUsers;
                  likedUsers = newLikedUsers;
                  seoDescription = isEntry.seoDescription;
                  seoExcerpt = isEntry.seoExcerpt;
                  subscription = isEntry.subscription;
                  isDraft = isEntry.isDraft;
                  isPromoted = newPromoted;
                  minters = isEntry.minters;
                  userName = isEntry.userName;
                  // promotionLikesTarget = isEntry.promotionLikesTarget;
                  promotionICP = newPromotionICP;
                  status = isEntry.status;
                  promotionHistory = isEntry.promotionHistory;
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
                let newEntry = entryStorage.replace(key, tempEntry);
                let activited = commentCanister.addActivity(caller, key, #like, isEntry.title);
                return #ok("Article Liked Successfully", true);

              } else {
                var tempcompanyId = "";
                tempcompanyId := isEntry.companyId;
                var tempImg : ?NewImageObject = null;
                if (isEntry.image != null) {

                  tempImg := isEntry.image;

                };
                var temppodcastImg : ?NewImageObject = null;
                if (isEntry.podcastImg != null) {

                  temppodcastImg := isEntry.podcastImg;

                };
                var tempEntry : Entry = {
                  title = isEntry.title;
                  description = isEntry.description;
                  image = tempImg;
                  creation_time = isEntry.creation_time;
                  user = isEntry.user;
                  views = isEntry.views;
                  likes = isEntry.likes +1;
                  category = isEntry.category;
                  seoTitle = isEntry.seoTitle;
                  seoSlug = isEntry.seoSlug;
                  viewedUsers = isEntry.viewedUsers;
                  likedUsers = newLikedUsers;
                  seoDescription = isEntry.seoDescription;
                  seoExcerpt = isEntry.seoExcerpt;
                  subscription = isEntry.subscription;
                  isDraft = isEntry.isDraft;
                  minters = isEntry.minters;
                  userName = isEntry.userName;
                  isPromoted = isEntry.isPromoted;
                  // promotionLikesTarget = isEntry.promotionLikesTarget;
                  promotionICP = isEntry.promotionICP;
                  status = isEntry.status;
                  promotionHistory = isEntry.promotionHistory;
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
                let newEntry = entryStorage.replace(key, tempEntry);
                return #ok("Error while liking", true);
              };
              //  return #err("HIIIIi");
            };
          };
        } else {

          switch (isLiked) {
            case (?liked) {
              var newLikedUsers : [Principal] = [];
              for (item : Principal in tempLikedUsers.vals()) {
                if (item != caller) {
                  newLikedUsers := Array.append<Principal>(newLikedUsers, [item]);
                };
              };
              var newLikesCount = 0;
              if (isEntry.likes > 0) {
                newLikesCount := isEntry.likes -1;
              };
              var tempcompanyId = "";
              tempcompanyId := isEntry.companyId;
              var tempImg : ?NewImageObject = null;
              if (isEntry.image != null) {

                tempImg := isEntry.image;

              };
              var temppodcastImg : ?NewImageObject = null;
              if (isEntry.podcastImg != null) {

                temppodcastImg := isEntry.podcastImg;

              };
              var tempEntry : Entry = {
                title = isEntry.title;
                description = isEntry.description;
                image = tempImg;
                creation_time = isEntry.creation_time;
                user = isEntry.user;
                views = isEntry.views;
                likes = newLikesCount;
                category = isEntry.category;
                seoTitle = isEntry.seoTitle;
                seoSlug = isEntry.seoSlug;
                viewedUsers = isEntry.viewedUsers;
                likedUsers = newLikedUsers;
                seoDescription = isEntry.seoDescription;
                seoExcerpt = isEntry.seoExcerpt;
                subscription = isEntry.subscription;
                minters = isEntry.minters;
                isDraft = isEntry.isDraft;
                isPromoted = isEntry.isPromoted;
                // promotionLikesTarget = isEntry.promotionLikesTarget;
                userName = isEntry.userName;
                promotionICP = isEntry.promotionICP;
                status = isEntry.status;
                promotionHistory = isEntry.promotionHistory;
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
              let newEntry = entryStorage.replace(key, tempEntry);
              #ok("Article Unliked Successfully", false);
              // #err("Article Already Liked", false);
            };
            case (null) {
              let newLikedUsers = Array.append(tempLikedUsers, [caller]);
              var tempcompanyId = "";
              tempcompanyId := isEntry.companyId;
              var tempImg : ?NewImageObject = null;
              if (isEntry.image != null) {

                tempImg := isEntry.image;

              };
              var temppodcastImg : ?NewImageObject = null;
              if (isEntry.podcastImg != null) {

                temppodcastImg := isEntry.podcastImg;

              };
              var tempEntry : Entry = {
                title = isEntry.title;
                description = isEntry.description;
                image = tempImg;
                creation_time = isEntry.creation_time;
                user = isEntry.user;
                views = isEntry.views;
                likes = isEntry.likes +1;
                category = isEntry.category;
                seoTitle = isEntry.seoTitle;
                seoSlug = isEntry.seoSlug;
                viewedUsers = isEntry.viewedUsers;
                likedUsers = newLikedUsers;
                seoDescription = isEntry.seoDescription;
                seoExcerpt = isEntry.seoExcerpt;
                subscription = isEntry.subscription;
                isDraft = isEntry.isDraft;
                minters = isEntry.minters;
                isPromoted = isEntry.isPromoted;
                userName = isEntry.userName;
                // promotionLikesTarget = isEntry.promotionLikesTarget;
                promotionICP = isEntry.promotionICP;
                status = isEntry.status;
                pressRelease = isEntry.pressRelease;
                promotionHistory = isEntry.promotionHistory;
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
              let newEntry = entryStorage.replace(key, tempEntry);
              let activited = commentCanister.addActivity(caller, key, #like, isEntry.title);
              #ok("Article Liked Successfully", true);
            };
          };
        };
      };
      case (null) {
        #err("No Article Found")

      };
    };
  };
  public shared ({ caller }) func mintEntry(key : Key, userCanisterId : Text) : async Result.Result<(Text, Bool), (Text)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      check_user_exists : (caller : Principal) -> async Bool;
    };
    let isUser = await userCanister.check_user_exists(caller);
    assert isUser;

    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {

        var tempMinters = isEntry.minters;
        var isMinted = Array.find<Principal>(tempMinters, func x = x == caller);
        switch (isMinted) {
          case (?minted) {
            #err("Not Allowed");
          };
          case (null) {
            let newMinted : [Principal] = Array.append(tempMinters, [caller]);
            var tempcompanyId = "";
            tempcompanyId := isEntry.companyId;
            var tempImg : ?NewImageObject = null;
            if (isEntry.image != null) {

              tempImg := isEntry.image;

            };
            var temppodcastImg : ?NewImageObject = null;
            if (isEntry.podcastImg != null) {

              temppodcastImg := isEntry.podcastImg;

            };
            var tempEntry : Entry = {
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
              minters = newMinted;
              isPromoted = isEntry.isPromoted;
              promotionICP = isEntry.promotionICP;
              userName = isEntry.userName;
              caption = isEntry.caption;
              tags = isEntry.tags;

              status = isEntry.status;
              // promotionLikesTarget = isEntry.promotionLikesTarget;
              pressRelease = isEntry.pressRelease;
              promotionHistory = isEntry.promotionHistory;
              isCompanySelected = isEntry.isCompanySelected;
              companyId = tempcompanyId;
              isPodcast = isEntry.isPodcast;
              podcastVideoLink = isEntry.podcastVideoLink;
              podcastImgCation = isEntry.podcastImgCation;
              podcastImg = temppodcastImg;
              isStatic = isEntry.isStatic;
            };

            let newEntry = entryStorage.replace(key, tempEntry);
            #ok("Article Minted Successfully", true);
          };
        };

      };
      case (null) {
        #err("No Article Found")

      };
    };
    //  public query func getEntry(key : Key) : async Result.Result<(Entry, Text), Text> {
    //   var entry = entryStorage.get(key);
    //   switch (entry) {
    //     case (?isEntry) {
    //       return #ok(isEntry, "Entery get successfully");
    //     };
    //     case (null) {
    //       return #err("Entry not found");
    //     };
    //   };
    // };
  };
  public shared ({ caller }) func isMinted(key : Key) : async Bool {
    assert not Principal.isAnonymous(caller);

    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?isEntry) {

        var tempMinters = isEntry.minters;
        var isMinted = Array.find<Principal>(tempMinters, func x = x == caller);
        switch (isMinted) {
          case (?minted) {
            return true;
          };
          case (null) {
            return false;
          };
        };

      };
      case (null) {
        return false;

      };
    };
    //  public query func getEntry(key : Key) : async Result.Result<(Entry, Text), Text> {
    //   var entry = entryStorage.get(key);
    //   switch (entry) {
    //     case (?isEntry) {
    //       return #ok(isEntry, "Entery get successfully");
    //     };
    //     case (null) {
    //       return #err("Entry not found");
    //     };
    //   };
    // };
  };
  public query func getUserEntries(user : UserId) : async [(Key, Entry)] {
    var sortedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (entry.user == user) {
        if (shouldSendEntry(entry)) {
          sortedEntries.put(key, entry);
        };
      };
    };

    let entryArray = Iter.toArray(sortedEntries.entries());
    return EntryStoreHelper.sortEntriesByLatest(entryArray);
  };
  public query func getUserPodcast(user : UserId) : async [(Key, Entry)] {
    var sortedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (entry.user == user and entry.isPodcast and not entry.isDraft) {

        switch (entry.status) {
          case (#approved) {
            sortedEntries.put(key, entry);

          };
          case (_) {

          };
        };

      };
    };

    let entryArray = Iter.toArray(sortedEntries.entries());
    return EntryStoreHelper.sortEntriesByLatest(entryArray);
  };
  public query func getEntriesByCategory(inputCategory : Text) : async [(Key, Entry)] {
    // stable to entrystorage
    var sortedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      // if (entry.user == user) {
      //   sortedEntries.put(key, entry);
      // };
      if (shouldSendEntry(entry)) {
        let tempCategories = entry.category;
        for (category in tempCategories.vals()) {
          if (category == inputCategory) {

            sortedEntries.put(key, entry);
          };
        };
      };
    };
    let entryArray = Iter.toArray(sortedEntries.entries());
    return EntryStoreHelper.sortEntriesByLatest(entryArray);
  };
  public query func getAllEntries(cate : Text) : async [(Key, Entry)] {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendEntry(entry)) {
        if (cate == "All") {
          nonDraftedEntries.put(key, entry);

        } else {
          for (entryCat in entry.category.vals()) {
            if (entryCat == cate) {
              nonDraftedEntries.put(key, entry);

            };
          };
        };

      };
    };
    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    let sortedArray = EntryStoreHelper.sortEntriesByLatest(entryArray);
    var paginatedArray : [(Key, Entry)] = [];

    if (sortedArray.size() > 10) {

      paginatedArray := Array.subArray<(Key, Entry)>(sortedArray, 0, 10);
    } else {
      paginatedArray := sortedArray;
    };
    return paginatedArray;

    // var tempEntries : [(Key, Entry)] = [];
    // tempEntries := Iter.toArray(entryStorage.entries());
    // return tempEntries;
  };
  public query func getAllEntryIds(isPodcast : Bool) : async [Key] {
    var filteredKeys : [Key] = [];
    for (key in entryStorage.keys()) {
      let entry = entryStorage.get(key);
      switch (entry) {
        case (null) {
          // Handle null case if needed
        };
        case (?entryValue) {
          // Add your filter condition here
          if (not entryValue.isDraft and (isPodcast == entryValue.isPodcast)) {
            filteredKeys := Array.append(filteredKeys, [key]);
          };
        };
      };
    };
    return filteredKeys;

  };
  public query func getAllEventsIds() : async [Key] {
    var filteredKeys : [Key] = [];
    for (key in eventStorage.keys()) {
      let entry = eventStorage.get(key);
      switch (entry) {
        case (null) {
          // Handle null case if needed
        };
        case (?entryValue) {
          filteredKeys := Array.append(filteredKeys, [key]);
        };
      };
    };
    return filteredKeys;

  };
  public query func getPaginatedEntries(startIndex : Nat, length : Nat) : async {
    entries : [(Key, Entry)];
    amount : Nat;
  } {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      switch (entry.status) {
        case (#approved) {

          nonDraftedEntries.put(key, entry);

        };
        case (_) {

        };
      };

    };
    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    return EntryStoreHelper.paginateEntriesByLatest(entryArray, startIndex, length)

    // var tempEntries : [(Key, Entry)] = [];
    // tempEntries := Iter.toArray(entryStorage.entries());
    // return tempEntries;
  };
  public query func getEntriesNew(inputCategory : CategoryId, search : Text, startIndex : Nat, length : Nat) : async {
    amount : Nat;
    entries : [(Key, Entry)];
  } {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);

    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendEntry(entry)) {
        let tempCategories = entry.category;
        for (category in tempCategories.vals()) {
          if (category == inputCategory) {

            nonDraftedEntries.put(key, entry);
          };
        };
        // nonDraftedEntries.put(key, entry);
      };
    };

    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    return EntryStoreHelper.searchSortEntries(entryArray, search, startIndex, length)

  };
  public query func getQuriedEntries(inputCategory : ?CategoryId, search : Text, tag : Text, startIndex : Nat, length : Nat) : async {
    amount : Nat;
    entries : [(Key, Entry)];
  } {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);

    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendContent(entry)) {
        let tempCategories = entry.category;
        for (category in tempCategories.vals()) {
          switch (inputCategory) {
            case (?isCategory) {
              if (category == isCategory) {

                nonDraftedEntries.put(key, entry);
              };
            };
            case (null) {
              nonDraftedEntries.put(key, entry);

            };
          };

        };
        // nonDraftedEntries.put(key, entry);
      };
    };

    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    return EntryStoreHelper.searchSortTaggedEntries(entryArray, search, tag, startIndex, length)

  };
  public query func getPressEntries(cate : Text) : async [(Key, Entry)] {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendEntry(entry)) {
        if (entry.pressRelease) {
          if (cate == "All") {
            nonDraftedEntries.put(key, entry);

          } else {
            for (entryCat in entry.category.vals()) {
              if (entryCat == cate) {
                nonDraftedEntries.put(key, entry);

              };
            };
          };

        };
      };
    };
    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    return EntryStoreHelper.sortEntriesByLatest(entryArray)

    // var tempEntries : [(Key, Entry)] = [];
    // tempEntries := Iter.toArray(entryStorage.entries());
    // return tempEntries;
  };
  public query func getOnlyPressRelease(length : Nat, cate : [Text]) : async [(Key, Entry)] {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendEntry(entry)) {
        if (entry.pressRelease) {
          for (category in entry.category.vals()) {
            let maybeCategory = categoryStorage.get(category);
            switch (maybeCategory) {
              case (?isCategory) {

                for (mycate in cate.vals()) {
                  let category1 : Text = Text.map(isCategory.name, Prim.charToLower);

                  let category2 : Text = Text.map(mycate, Prim.charToLower);
                  if (category1 == category2) {
                    nonDraftedEntries.put(key, entry);
                  };
                };

              };
              case (null) {};
            };
          };
        };
      };
    };
    var paginatedArray : [(Key, Entry)] = [];
    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    if (entryArray.size() > length) {
      paginatedArray := Array.subArray<(Key, Entry)>(entryArray, 0, length);
      return EntryStoreHelper.sortEntriesByLatest(paginatedArray)

    } else {
      return EntryStoreHelper.sortEntriesByLatest(entryArray)

    };

    // var tempEntries : [(Key, Entry)] = [];
    // tempEntries := Iter.toArray(entryStorage.entries());
    // return tempEntries;
  };
  public query func getOnlyArticles(length : Nat, cate : [Text]) : async [(Key, Entry)] {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendEntry(entry)) {
        if (not entry.pressRelease) {
          for (category in entry.category.vals()) {
            let maybeCategory = categoryStorage.get(category);
            switch (maybeCategory) {
              case (?isCategory) {

                for (mycate in cate.vals()) {
                  let category1 : Text = Text.map(isCategory.name, Prim.charToLower);

                  let category2 : Text = Text.map(mycate, Prim.charToLower);
                  if (category1 == category2) {
                    nonDraftedEntries.put(key, entry);
                  };
                };

              };
              case (null) {};
            };

          };

        };
      };
    };
    var paginatedArray : [(Key, Entry)] = [];
    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    if (entryArray.size() > length) {
      paginatedArray := Array.subArray<(Key, Entry)>(entryArray, 0, length);
      return EntryStoreHelper.sortEntriesByLatest(paginatedArray)

    } else {
      return EntryStoreHelper.sortEntriesByLatest(entryArray)

    };

    // var tempEntries : [(Key, Entry)] = [];
    // tempEntries := Iter.toArray(entryStorage.entries());
    // return tempEntries;
  };

  public query func trendingPressReleaseItemSidebar(length : Nat) : async [(Key, TrendingEntryItemSidebar)] {
    var nonDraftedEntries = Map.fromIter<Key, TrendingEntryItemSidebar>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendEntry(entry)) {
        if (entry.pressRelease) {
          nonDraftedEntries.put(key, entry);

        };
      };
    };
    var paginatedArray : [(Key, TrendingEntryItemSidebar)] = [];
    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    if (entryArray.size() > length) {
      paginatedArray := Array.subArray<(Key, TrendingEntryItemSidebar)>(entryArray, 0, length);
      return EntryStoreHelper.sortTrendingEntriesByLatest(paginatedArray)

    } else {
      return EntryStoreHelper.sortTrendingEntriesByLatest(entryArray)

    };

  };
  public query func trendingEntryItemSidebar(length : Nat) : async [(Key, TrendingEntryItemSidebar)] {
    var nonDraftedEntries = Map.fromIter<Key, TrendingEntryItemSidebar>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if (shouldSendEntry(entry)) {
        if (not entry.pressRelease) {
          nonDraftedEntries.put(key, entry);

        };
      };
    };
    var paginatedArray : [(Key, TrendingEntryItemSidebar)] = [];
    let entryArray = Iter.toArray(nonDraftedEntries.entries());
    if (entryArray.size() > length) {
      paginatedArray := Array.subArray<(Key, TrendingEntryItemSidebar)>(entryArray, 0, length);
      return EntryStoreHelper.sortTrendingEntriesByLatest(paginatedArray)

    } else {
      return EntryStoreHelper.sortTrendingEntriesByLatest(entryArray)

    };

  };
  public query func getPromotedEntries(length : Nat) : async [(Key, Entry)] {
    var nonDraftedEntries = Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    for ((key, entry) in entryStorage.entries()) {
      if ((shouldSendEntry(entry)) and entry.isPromoted) {
        nonDraftedEntries.put(key, entry);
      };
    };
    let entryArray = Iter.toArray(nonDraftedEntries.entries());

    let sortedArray = EntryStoreHelper.sortEntriesByLatest(entryArray);
    let size = sortedArray.size();
    let startIndex = 0;
    var paginatedArray : [(Key, Entry)] = [];
    let itemsPerPage = 10;

    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedArray, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedArray, startIndex, itemsPerPage);

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      let amount : Nat = size - startIndex;
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Key, Entry)>(sortedArray, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Key, Entry)>(sortedArray, 0, itemsPerPage);
    } else {
      paginatedArray := sortedArray;
    };
    return paginatedArray;
  };
  public query func getEntriesList(inputCategory : Text, draft : Bool, search : Text, startIndex : Nat, length : Nat) : async {
    entries : [(Key, ListEntryItem)];
    amount : Nat;
  } {

    var entiresList = Map.HashMap<Key, ListEntryItem>(0, Text.equal, Text.hash);

    for ((key, entry) in entryStorage.entries()) {
      var tempcompanyId = "";
      var tempImg : ?NewImageObject = null;
      if (entry.image != null) {

        tempImg := entry.image;

      };
      var temppodcastImg : ?NewImageObject = null;
      if (entry.podcastImg != null) {

        temppodcastImg := entry.podcastImg;

      };
      tempcompanyId := entry.companyId;
      let lisEntryItem : ListEntryItem = {
        title = entry.title;
        image = tempImg;
        likes = entry.likes;
        views = entry.views;
        creation_time = entry.creation_time;
        user = entry.user;
        userName = entry.userName;
        category = entry.category;
        isDraft = entry.isDraft;
        minters = entry.minters;
        status = entry.status;
        isPromoted = entry.isPromoted;
        pressRelease = entry.pressRelease;
        caption = entry.caption;
        tags = entry.tags;
        isCompanySelected = entry.isCompanySelected;
        companyId = tempcompanyId;
        podcastImgCation = entry.podcastImgCation;
        podcastImg = temppodcastImg;
        podcastVideoLink = entry.podcastVideoLink;
        isPodcast = entry.isPodcast;
        seoExcerpt = entry.seoExcerpt;
        isStatic = entry.isStatic;
      };
      if ((inputCategory == "All")) {
        if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
          entiresList.put(key, lisEntryItem);
        };
      } else {
        if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
          let tempCategories = entry.category;
          for (category in tempCategories.vals()) {
            if (category == inputCategory) {
              entiresList.put(key, lisEntryItem);
            };
          };

          // entiresList := sortByCategory(inputCategory, entiresList, key, lisEntryItem, entry);
        };
      };
    };
    // let entryArray = Iter.toArray(entiresList.entries());

    return EntryStoreHelper.searchSortList(entiresList, search, startIndex, length);

  };
  //  dataType for below function
  // 1 =pressRelease
  // 2 =podcast
  // 3 =article

  public query func getUniqueDataList(inputCategory : Text, draft : Bool, search : Text, startIndex : Nat, length : Nat, dataType : Nat) : async {
    entries : [(Key, ListPodcastItem)];
    amount : Nat;
  } {

    var entiresList = Map.HashMap<Key, ListPodcastItem>(0, Text.equal, Text.hash);

    for ((key, entry) in entryStorage.entries()) {
      var tempcompanyId = "";
      var tempImg : ?NewImageObject = null;
      if (entry.image != null) {

        tempImg := entry.image;

      };
      var temppodcastImg : ?NewImageObject = null;
      if (entry.podcastImg != null) {

        temppodcastImg := entry.podcastImg;

      };
      tempcompanyId := entry.companyId;
      let lisEntryItem : ListPodcastItem = {
        title = entry.title;
        image = tempImg;
        likes = entry.likes;
        views = entry.views;
        creation_time = entry.creation_time;
        user = entry.user;
        userName = entry.userName;
        category = entry.category;
        isDraft = entry.isDraft;
        minters = entry.minters;
        status = entry.status;
        isPromoted = entry.isPromoted;
        pressRelease = entry.pressRelease;
        caption = entry.caption;
        tags = entry.tags;
        isCompanySelected = entry.isCompanySelected;
        companyId = tempcompanyId;
        isPodcast = entry.isPodcast;
        podcastVideoLink = entry.podcastVideoLink;
        podcastImgCation = entry.podcastImgCation;
        podcastImg = temppodcastImg;
        likedUsers = entry.likedUsers;
        seoExcerpt = entry.seoExcerpt;
        isStatic = entry.isStatic;
      };
      if (dataType == 1) {
        if (entry.pressRelease) {
          if ((inputCategory == "All")) {
            if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
              entiresList.put(key, lisEntryItem);
            };
          } else {
            if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
              let tempCategories = entry.category;
              for (category in tempCategories.vals()) {
                if (category == inputCategory) {
                  entiresList.put(key, lisEntryItem);
                };
              };

            };

            // entiresList := sortByCategory(inputCategory, entiresList, key, lisEntryItem, entry);
          };
        };
      } else if (dataType == 2) {
        if (entry.isPodcast) {
          if ((inputCategory == "All")) {
            if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
              entiresList.put(key, lisEntryItem);
            };
          } else {
            if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
              let tempCategories = entry.category;
              for (category in tempCategories.vals()) {
                if (category == inputCategory) {
                  entiresList.put(key, lisEntryItem);
                };
              };

            };

            // entiresList := sortByCategory(inputCategory, entiresList, key, lisEntryItem, entry);
          };
        };
      } else if (dataType == 3) {
        if (not entry.pressRelease and not entry.isPodcast) {
          if ((inputCategory == "All")) {
            if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
              entiresList.put(key, lisEntryItem);
            };
          } else {
            if (draft and entry.isDraft or not draft and not entry.isDraft and shouldSendListEntry(entry.status)) {
              let tempCategories = entry.category;
              for (category in tempCategories.vals()) {
                if (category == inputCategory) {
                  entiresList.put(key, lisEntryItem);
                };
              };

            };

            // entiresList := sortByCategory(inputCategory, entiresList, key, lisEntryItem, entry);
          };
        };
      };

    };
    // let entryArray = Iter.toArray(entiresList.entries());

    return EntryStoreHelper.searchSortListPodcast(entiresList, search, startIndex, length);

  };
  public query ({ caller }) func getUserEntriesList(inputCategory : Text, draft : Bool, search : Text, startIndex : Nat, length : Nat) : async {
    entries : [(Key, ListEntryItem)];
    amount : Nat;
  } {
    assert not Principal.isAnonymous(caller);
    //   let userCanister = actor (userCanisterId) : actor {
    //   check_user_exists : (caller : Principal) -> async Bool;
    // };
    // let isUser = await userCanister.check_user_exists(caller);
    var entiresList = Map.HashMap<Key, ListEntryItem>(0, Text.equal, Text.hash);

    for ((key, entry) in entryStorage.entries()) {

      if (entry.user == caller) {
        var tempcompanyId = "";
        tempcompanyId := entry.companyId;
        var tempImg : ?NewImageObject = null;
        if (entry.image != null) {

          tempImg := entry.image;

        };
        var temppodcastImg : ?NewImageObject = null;
        if (entry.podcastImg != null) {

          temppodcastImg := entry.podcastImg;

        };
        let lisEntryItem : ListEntryItem = {
          title = entry.title;
          image = tempImg;
          likes = entry.likes;
          views = entry.views;
          creation_time = entry.creation_time;
          user = entry.user;
          category = entry.category;
          minters = entry.minters;
          isDraft = entry.isDraft;
          userName = entry.userName;
          status = entry.status;
          isPromoted = entry.isPromoted;
          pressRelease = entry.pressRelease;
          caption = entry.caption;
          tags = entry.tags;
          isCompanySelected = entry.isCompanySelected;
          companyId = tempcompanyId;
          podcastImgCation = entry.podcastImgCation;
          podcastImg = temppodcastImg;
          podcastVideoLink = entry.podcastVideoLink;
          isPodcast = entry.isPodcast;
          seoExcerpt = entry.seoExcerpt;
          isStatic = entry.isStatic;
        };

        if ((inputCategory == "All")) {

          if ((draft and (entry.isDraft or not shouldSendListEntry(entry.status))) or (not draft and not entry.isDraft and shouldSendListEntry(entry.status))) {
            entiresList.put(key, lisEntryItem);
          };
        } else {
          if ((draft and (entry.isDraft or not shouldSendListEntry(entry.status))) or (not draft and not entry.isDraft and shouldSendListEntry(entry.status))) {
            let tempCategories = entry.category;
            for (category in tempCategories.vals()) {
              if (category == inputCategory) {
                entiresList.put(key, lisEntryItem);
              };
            };

          };
        };

      };
    };
    let entryArray = Iter.toArray(entiresList.entries());
    return EntryStoreHelper.searchSortList(entiresList, search, startIndex, length);

  };
  public shared ({ caller }) func getReviewEntries(inputCategory : Text, userCanisterId : Text, status : EntryStatus, search : Text, startIndex : Nat, length : Nat) : async {
    entries : [(Key, ListEntryItem)];
    amount : Nat;
  } {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    var entiresList = Map.HashMap<Key, ListEntryItem>(0, Text.equal, Text.hash);

    for ((key, entry) in entryStorage.entries()) {
      var tempcompanyId = "";
      tempcompanyId := entry.companyId;
      var tempImg : ?NewImageObject = null;
      if (entry.image != null) {

        tempImg := entry.image;

      };
      var temppodcastImg : ?NewImageObject = null;
      if (entry.podcastImg != null) {

        temppodcastImg := entry.podcastImg;

      };
      let lisEntryItem : ListEntryItem = {
        title = entry.title;
        image = tempImg;
        likes = entry.likes;
        views = entry.views;
        creation_time = entry.creation_time;
        user = entry.user;
        category = entry.category;
        minters = entry.minters;
        isDraft = entry.isDraft;
        userName = entry.userName;
        status = entry.status;
        isPromoted = entry.isPromoted;
        pressRelease = entry.pressRelease;
        caption = entry.caption;
        tags = entry.tags;
        isCompanySelected = entry.isCompanySelected;
        companyId = tempcompanyId;
        podcastImgCation = entry.podcastImgCation;
        podcastImg = temppodcastImg;
        podcastVideoLink = entry.podcastVideoLink;
        isPodcast = entry.isPodcast;
        seoExcerpt = entry.seoExcerpt;
        isStatic = entry.isStatic;
      };
      if (not entry.isDraft and not entry.isPodcast) {
        if ((inputCategory == "All")) {
          if (entry.status == status) {
            entiresList.put(key, lisEntryItem);
          };
        } else {
          if (entry.status == status) {
            let tempCategories = entry.category;
            for (category in tempCategories.vals()) {
              if (category == inputCategory) {
                entiresList.put(key, lisEntryItem);
              };
            };
          };

        };
      };

    };
    let entryArray = Iter.toArray(entiresList.entries());
    return EntryStoreHelper.searchSortList(entiresList, search, startIndex, length);

  };
  public shared ({ caller }) func getReviewPodcast(inputCategory : Text, userCanisterId : Text, status : EntryStatus, search : Text, startIndex : Nat, length : Nat) : async {
    entries : [(Key, ListPodcastItem)];
    amount : Nat;
  } {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    var entiresList = Map.HashMap<Key, ListPodcastItem>(0, Text.equal, Text.hash);

    for ((key, entry) in entryStorage.entries()) {
      var tempcompanyId = "";
      tempcompanyId := entry.companyId;
      var tempImg : ?NewImageObject = null;
      if (entry.image != null) {

        tempImg := entry.image;

      };
      var temppodcastImg : ?NewImageObject = null;
      if (entry.podcastImg != null) {

        temppodcastImg := entry.podcastImg;

      };
      let lisEntryItem : ListPodcastItem = {
        title = entry.title;
        image = tempImg;
        likes = entry.likes;
        views = entry.views;
        creation_time = entry.creation_time;
        user = entry.user;
        category = entry.category;
        minters = entry.minters;
        isDraft = entry.isDraft;
        userName = entry.userName;
        status = entry.status;
        isPromoted = entry.isPromoted;
        pressRelease = entry.pressRelease;
        caption = entry.caption;
        tags = entry.tags;
        isCompanySelected = entry.isCompanySelected;
        companyId = tempcompanyId;
        isPodcast = entry.isPodcast;
        podcastVideoLink = entry.podcastVideoLink;
        seoExcerpt = entry.seoExcerpt;
        podcastImgCation = entry.podcastImgCation;
        podcastImg = temppodcastImg;
        likedUsers = entry.likedUsers;
        isStatic = entry.isStatic;
      };
      if (not entry.isDraft and entry.isPodcast) {
        if ((inputCategory == "All")) {
          if (entry.status == status) {
            entiresList.put(key, lisEntryItem);
          };
        } else {
          if (entry.status == status) {
            let tempCategories = entry.category;
            for (category in tempCategories.vals()) {
              if (category == inputCategory) {
                entiresList.put(key, lisEntryItem);
              };
            };
          };

        };
      };

    };
    let entryArray = Iter.toArray(entiresList.entries());
    return EntryStoreHelper.searchSortListPodcast(entiresList, search, startIndex, length);

  };
  public shared ({ caller }) func getWeb3DirectoriesDashboard(userCanisterId : Text, status : Web3Status, cate : Text, search : Text, startIndex : Nat, length : Nat) : async {
    web3List : [(Key, Web3DashboardList)];
    amount : Nat;
  } {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);

    var entiresList = Map.HashMap<Key, Web3DashboardList>(0, Text.equal, Text.hash);

    for ((key, entry) in web3Storage.entries()) {
      let lisEntryItem : Web3DashboardList = {
        company = entry.company;
        founderName = entry.founderName;
        catagory = entry.catagory;
        creation_time = entry.creation_time;
        user = entry.user;
        status = entry.status;
        companyUrl = entry.companyUrl;
        companyLogo = entry.companyLogo;
        views = entry.views;
        isStatic = entry.isStatic;
        founderEmail = entry.founderEmail;

      };
      if (cate == "All") {

        switch (status) {
          case (#all) {
            entiresList.put(key, lisEntryItem);

          };
          case (_) {
            if (entry.status == status) {
              entiresList.put(key, lisEntryItem);

            };
          };
        };
      } else if (entry.catagory == cate) {
        switch (status) {
          case (#all) {
            entiresList.put(key, lisEntryItem);

          };
          case (_) {
            if (entry.status == status) {
              entiresList.put(key, lisEntryItem);

            };
          };
        };
      };

    };
    let entryArray = Iter.toArray(entiresList.entries());
    return Web3StoreHelper.searchSortWeb3DashboardList(entiresList, search, startIndex, length);

  };
  public shared ({ caller }) func approveArticle(commentCanisterId : Text, userCanisterId : Text, key : Key, action : Bool) : async Result.Result<(Text, Entry), Text> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?entry) {
        var status : EntryStatus = #pending;
        var activity : AdminActivityType = #approve;
        if (action) {
          status := #approved;
          activity := #approve;
        } else {
          status := #rejected;
          activity := #reject;
        };
        var tempcompanyId = "";
        tempcompanyId := entry.companyId;
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
          creation_time = entry.creation_time;
          user = entry.user;
          views = 0;
          likes = 0;
          category = entry.category;
          seoTitle = entry.seoTitle;
          seoSlug = entry.seoSlug;
          viewedUsers = [];
          likedUsers = [];
          seoDescription = entry.seoDescription;
          seoExcerpt = entry.seoExcerpt;
          subscription = entry.subscription;
          isDraft = false;
          isPromoted = entry.isPromoted;
          // promotionLikesTarget = entry.promotionLikesTarget;
          promotionICP = entry.promotionICP;
          minters = [];
          userName = entry.userName;
          status = status;
          promotionHistory = null;
          pressRelease = entry.pressRelease;
          caption = entry.caption;
          tags = entry.tags;
          isCompanySelected = entry.isCompanySelected;
          companyId = tempcompanyId;
          isPodcast = entry.isPodcast;
          podcastVideoLink = entry.podcastVideoLink;
          podcastImgCation = entry.podcastImgCation;
          podcastImg = temppodcastImg;
          isStatic = entry.isStatic;
        };
        let activitied = commentCanister.addAdminActivity(caller, key, activity, entry.title);
        let newEntry = entryStorage.replace(key, tempEntry);
        switch (newEntry) {
          case (?isEntry) {

            for (cat in entry.category.vals()) {
              if (entry.pressRelease) {

                let countIncrease = await update_count_category(cat, "pressRelease");
                let countIncreaseweb3 = await addWeb3postCount(entry.companyId, "pressRelease");

              } else {

                let countIncrease = await update_count_category(cat, "Article");
                let countIncreaseweb3 = await addWeb3postCount(entry.companyId, "article");

              };

            };

            #ok("Entry Approved Succesfuly", isEntry);
          };
          case (null) {
            #err("Error while approving");
          };
        };
      };
      case (null) {
        #err("Error while approving")

      };
    };
  };
  public shared ({ caller }) func approvePodcast(commentCanisterId : Text, userCanisterId : Text, key : Key, action : Bool) : async Result.Result<(Text, Entry), Text> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let maybeEntry = entryStorage.get(key);
    switch (maybeEntry) {
      case (?entry) {
        var status : EntryStatus = #pending;
        var activity : AdminActivityType = #approve;
        if (action) {
          status := #approved;
          activity := #approve;
        } else {
          status := #rejected;
          activity := #reject;
        };
        var tempcompanyId = "";
        tempcompanyId := entry.companyId;
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
          creation_time = entry.creation_time;
          user = entry.user;
          views = 0;
          likes = 0;
          category = entry.category;
          seoTitle = entry.seoTitle;
          seoSlug = entry.seoSlug;
          viewedUsers = [];
          likedUsers = [];
          seoDescription = entry.seoDescription;
          seoExcerpt = entry.seoExcerpt;
          subscription = entry.subscription;
          isDraft = false;
          isPromoted = false;
          // promotionLikesTarget = entry.promotionLikesTarget;
          promotionICP = 0;
          minters = [];
          userName = entry.userName;
          status = status;
          promotionHistory = null;
          pressRelease = false;
          caption = "";
          tags = entry.tags;
          isCompanySelected = entry.isCompanySelected;
          companyId = tempcompanyId;
          isPodcast = entry.isPodcast;
          podcastVideoLink = entry.podcastVideoLink;
          podcastImgCation = entry.podcastImgCation;
          podcastImg = temppodcastImg;
          isStatic = entry.isStatic;
        };
        let activitied = commentCanister.addAdminActivity(caller, key, activity, entry.title);
        let newEntry = entryStorage.replace(key, tempEntry);
        switch (newEntry) {
          case (?isEntry) {
            for (cat in entry.category.vals()) {
              if (entry.isPodcast) {

                let countIncrease = await update_count_category(cat, "Podcast");
                let countIncreaseweb3 = await addWeb3postCount(entry.companyId, "podcast");

              };

            };
            #ok("Podcast Approved Succesfuly", isEntry);
          };
          case (null) {
            #err("Error while approving");
          };
        };
      };
      case (null) {
        #err("Error while approving")

      };
    };
  };
  public query ({ caller }) func get_reward() : async RewardConfig {
    assert not Principal.isAnonymous(caller);
    return reward_config;
  };
  public query ({ caller }) func get_like_reward() : async Nat {
    assert not Principal.isAnonymous(caller);
    return like_reward;
  };
  // web3
  public shared ({ caller }) func insertWeb3(inputWeb3 : InputWeb3, userCanisterId : Text, commentCanisterId : Text, editId : Text, isEdit : Bool) : async Result.Result<(Text, Web3Id), (Text)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      check_user_exists : (caller : Principal) -> async Bool;
    };
    let isUser = await userCanister.check_user_exists(caller);
    assert isUser;
    let commentCanister = actor (commentCanisterId) : actor {
      addActivity : (user : Principal, target : Text, activityType : ActivityType, title : Text) -> async Bool;
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };

    if (isEdit) {
      let userCanister2 = actor (userCanisterId) : actor {
        entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
      };
      assert await userCanister2.entry_require_permission(caller, #manage_article);

    };
    let web3Id = EntryType.generateNewRemoteObjectId();

    if (not isEdit) {
      let companyExists = Web3StoreHelper.companyExists(inputWeb3.company, web3Storage);
      if (companyExists) {
        return #err("Company name already exists.");
      };
    };
    if (isEdit) {
      web3Storage := Web3StoreHelper.addNewWeb3(web3Storage, inputWeb3, editId, caller, isEdit);
      let activited = commentCanister.addAdminActivity(caller, editId, #edit_web3, inputWeb3.company);

      return #ok("Edit", editId);

    } else {
      web3Storage := Web3StoreHelper.addNewWeb3(web3Storage, inputWeb3, web3Id, caller, isEdit);

      let activited = commentCanister.addActivity(caller, web3Id, #create_web3, inputWeb3.company);

      return #ok("created", web3Id);
    };

  };
  public shared ({ caller }) func delete_web3(key : Key, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, Bool), (Text, Bool)> {
    assert not Principal.isAnonymous(caller);

    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let isEntry = web3Storage.get(key);
    switch (isEntry) {
      case (?maybeEntry) {
        let del = web3Storage.remove(key);
        let activited = commentCanister.addAdminActivity(caller, key, #delete_web3, maybeEntry.company);

        #ok("Web3 deleted successfully", true);
      };
      case (null) {
        return #err("Web3 not found", false);
      };
    };

  };
  func shouldSendWeb3(status : Web3Status) : Bool {
    switch (status) {
      case (#verfied) {
        return true;
      };
      case (_) {
        return false;
      };
    };
  };
  public query func getWeb3(key : Key) : async ?Web3 {
    let mayBeWeb3 = web3Storage.get(key);
    switch (mayBeWeb3) {
      case (?isweb3) {
        var status = isweb3.status;
        let shoudSend = shouldSendWeb3(status);
        if (shoudSend) {
          return mayBeWeb3;
        } else {
          return null;

        };
      };
      case (null) {
        return null;
      };
    };
  };
  public shared ({ caller }) func getWeb3_for_admin(key : Key, userCanisterId : Text) : async ?Web3 {
    assert not Principal.isAnonymous(caller);

    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    web3Storage.get(key);

  };
  public shared ({ caller }) func deleteDraftEntry(key : Key, commentCanisterId : Text) : async Result.Result<(Text, ?Entry), Text> {
    assert not Principal.isAnonymous(caller);
    let maybeEntry : ?Entry = entryStorage.get(key);
    let commentCanister = actor (commentCanisterId) : actor {
      addActivity : (user : Principal, target : Text, activityType : ActivityType, title : Text) -> async Bool;
    };
    switch (maybeEntry) {
      case (?isEntry) {
        if (isEntry.user == caller) {

          switch (isEntry.status) {
            case (#approved) {

              return #err("You can't delete this article.");

            };
            case (_) {
              let removed = entryStorage.remove(key);
              if (isEntry.pressRelease) {
                let activited = commentCanister.addActivity(caller, key, #delete_pressRelease, isEntry.title);

              } else if (isEntry.isPodcast) {
                let activited = commentCanister.addActivity(caller, key, #delete_podcats, isEntry.title);

              } else {
                let activited = commentCanister.addActivity(caller, key, #delete_article, isEntry.title);

              };

              return #ok("Draft removed successfully.", removed);

            };
          };

        } else {
          return #err("Not Allowed.");
        };

      };
      case (null) {
        return #err("Did not find Entry.");
      };
    };
  };
  public shared ({ caller }) func adminDeleteEntry(key : Key, commentCanisterId : Text, userCanisterId : Text) : async Result.Result<(Text, ?Entry), Text> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let maybeEntry : ?Entry = entryStorage.get(key);

    switch (maybeEntry) {
      case (?isEntry) {

        let removed = entryStorage.remove(key);
        if (isEntry.pressRelease) {
          let activited = commentCanister.addAdminActivity(caller, key, #delete_pressRelease, isEntry.title);
          return #ok("PressRelease deleted successfully.", removed);

        } else if (isEntry.isPodcast) {
          let activited = commentCanister.addAdminActivity(caller, key, #delete_podcats, isEntry.title);
          return #ok("podcast deleted successfully.", removed);

        } else {
          let activited = commentCanister.addAdminActivity(caller, key, #delete_article, isEntry.title);
          return #ok("Article deleted successfully.", removed);

        };

      };
      case (null) {
        return #err("Did not find Entry.");
      };
    };
  };
  public shared ({ caller }) func likeWeb3(key : Key, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, Bool), (Text)> {
    assert not Principal.isAnonymous(caller);
    // let userCanister = actor (userCanisterId) : actor {
    //   add_reward : (caller : Principal, like_reward : Nat) -> async Bool;
    //   check_user_exists : (caller : Principal) -> async Bool;

    // };
    let commentCanister = actor (commentCanisterId) : actor {
      addActivity : (user : Principal, target : Text, activityType : ActivityType, title : Text) -> async Bool;
    };

    // let isUser = await userCanister.check_user_exists(caller);
    // assert isUser;

    let maybeEntry = web3Storage.get(key);
    switch (maybeEntry) {
      case (?web3) {
        var tempLikedUsers = web3.likedUsers;
        var isLiked = Array.find<Principal>(tempLikedUsers, func x = x == caller);

        switch (isLiked) {
          case (?liked) {
            var newLikedUsers : [Principal] = [];
            for (item : Principal in tempLikedUsers.vals()) {
              if (item != caller) {
                newLikedUsers := Array.append<Principal>(newLikedUsers, [item]);
              };
            };
            var newLikesCount = 0;
            if (web3.likes > 0) {
              newLikesCount := web3.likes -1;
            };
            let tempWeb3 : Web3 = {
              company = web3.company;
              shortDescription = web3.shortDescription;
              founderName = web3.founderName;
              founderDetail = web3.founderDetail;
              founderImage = web3.founderImage;
              companyBanner = web3.companyBanner;
              catagory = web3.catagory;
              creation_time = web3.creation_time;
              user = web3.user;
              status = web3.status;
              likes = newLikesCount;
              likedUsers = newLikedUsers;
              companyUrl = web3.companyUrl;
              facebook = web3.facebook;
              instagram = web3.instagram;
              linkedin = web3.linkedin;
              companyDetail = web3.companyDetail;
              companyLogo = web3.companyLogo;
              discord = web3.discord;
              telegram = web3.telegram;
              twitter = web3.twitter;
              views = web3.views;
              articleCount = web3.articleCount;
              podcastCount = web3.podcastCount;
              pressReleaseCount = web3.pressReleaseCount;
              totalCount = web3.totalCount;
              isStatic = web3.isStatic;
              founderEmail = web3.founderEmail;

            };
            let newEntry = web3Storage.replace(key, tempWeb3);
            #ok("directory Unliked Successfully", false);
            // #err("Article Already Liked", false);
          };
          case (null) {
            let newLikedUsers = Array.append(tempLikedUsers, [caller]);
            let tempWeb3 : Web3 = {
              company = web3.company;
              shortDescription = web3.shortDescription;
              founderName = web3.founderName;
              founderDetail = web3.founderDetail;
              founderImage = web3.founderImage;
              companyBanner = web3.companyBanner;
              catagory = web3.catagory;
              creation_time = web3.creation_time;
              user = web3.user;
              status = web3.status;
              likes = web3.likes +1;
              likedUsers = newLikedUsers;
              companyUrl = web3.companyUrl;
              facebook = web3.facebook;
              instagram = web3.instagram;
              linkedin = web3.linkedin;
              companyDetail = web3.companyDetail;
              companyLogo = web3.companyLogo;
              discord = web3.discord;
              telegram = web3.telegram;
              twitter = web3.twitter;
              views = web3.views;
              articleCount = web3.articleCount;
              podcastCount = web3.podcastCount;
              pressReleaseCount = web3.pressReleaseCount;
              totalCount = web3.totalCount;
              isStatic = web3.isStatic;
              founderEmail = web3.founderEmail;

            };
            let newEntry = web3Storage.replace(key, tempWeb3);
            // commentCanister.addActivity(caller,key,#like_web3)
            let activited = commentCanister.addActivity(caller, key, #like_web3, web3.company);
            #ok("directory Liked Successfully", true);
          };
        };

      };
      case (null) {
        #err("No directory Found")

      };
    };
  };
  // to verify and unverfy web3
  public shared ({ caller }) func verifyWeb3(key : Key, userCanisterId : Text, commentCanisterId : Text, isVerify : Bool) : async Result.Result<(Text, Bool), (Text)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let maybeEntry = web3Storage.get(key);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    switch (maybeEntry) {
      case (?web3) {
        var tempstatus : Web3Status = #un_verfied;
        if (isVerify) {
          tempstatus := #verfied;
        };
        let tempWeb3 : Web3 = {
          company = web3.company;
          shortDescription = web3.shortDescription;
          founderName = web3.founderName;
          founderDetail = web3.founderDetail;
          founderImage = web3.founderImage;
          companyBanner = web3.companyBanner;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          user = web3.user;
          status = tempstatus;
          likes = web3.likes;
          likedUsers = web3.likedUsers;
          companyUrl = web3.companyUrl;
          facebook = web3.facebook;
          instagram = web3.instagram;
          linkedin = web3.linkedin;
          companyDetail = web3.companyDetail;
          companyLogo = web3.companyLogo;
          discord = web3.discord;
          telegram = web3.telegram;
          twitter = web3.twitter;
          views = web3.views;
          articleCount = web3.articleCount;
          podcastCount = web3.podcastCount;
          pressReleaseCount = web3.pressReleaseCount;
          totalCount = web3.totalCount;
          isStatic = web3.isStatic;
          founderEmail = web3.founderEmail;

        };
        let newEntry = web3Storage.replace(key, tempWeb3);
        let activited = commentCanister.addAdminActivity(caller, key, #verify_web3, web3.company);

        let countIncrease = await update_count_category(web3.catagory, "Directory");

        return #ok("directory verified Successfully", true);

      };
      case (null) {
        #err("No directory Found")

      };
    };
  };
  public query ({ caller }) func getUserWeb3List(inputCategory : Text, search : Text, startIndex : Nat, length : Nat) : async {
    web3List : [(Key, Web3)];
    amount : Nat;
  } {
    assert not Principal.isAnonymous(caller);
    //   let userCanister = actor (userCanisterId) : actor {
    //   check_user_exists : (caller : Principal) -> async Bool;
    // };
    // let isUser = await userCanister.check_user_exists(caller);
    var web3List = Map.HashMap<Key, Web3>(0, Text.equal, Text.hash);

    for ((key, web3) in web3Storage.entries()) {

      if (web3.user == caller) {
        let web3Item : Web3 = {
          company = web3.company;
          shortDescription = web3.shortDescription;
          founderName = web3.founderName;
          founderDetail = web3.founderDetail;
          founderImage = web3.founderImage;
          companyBanner = web3.companyBanner;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          user = web3.user;
          status = web3.status;
          companyUrl = web3.companyUrl;
          likes = web3.likes;
          facebook = web3.facebook;
          instagram = web3.instagram;
          linkedin = web3.linkedin;
          companyDetail = web3.companyDetail;
          companyLogo = web3.companyLogo;
          likedUsers = web3.likedUsers;
          discord = web3.discord;
          telegram = web3.telegram;
          twitter = web3.twitter;
          views = web3.views;
          articleCount = web3.articleCount;
          podcastCount = web3.podcastCount;
          pressReleaseCount = web3.pressReleaseCount;
          totalCount = web3.totalCount;
          isStatic = web3.isStatic;
          founderEmail = web3.founderEmail;

        };
        if ((inputCategory == "")) {

          web3List.put(key, web3Item);

        } else if (inputCategory == web3Item.catagory) {

          web3List.put(key, web3Item);

        };

      };
    };
    let web3Array = Iter.toArray(web3List.entries());
    return Web3StoreHelper.searchSortList(web3List, search, startIndex, length);

  };
  public query ({ caller }) func getWeb3ListOfAllUsers(inputCategory : Text, search : Text, startIndex : Nat, length : Nat) : async {
    web3List : [(Key, Web3)];
    amount : Nat;
  } {
    //   let userCanister = actor (userCanisterId) : actor {
    //   check_user_exists : (caller : Principal) -> async Bool;
    // };
    // let isUser = await userCanister.check_user_exists(caller);
    var web3List = Map.HashMap<Key, Web3>(0, Text.equal, Text.hash);

    for ((key, web3) in web3Storage.entries()) {
      let status = web3.status;
      let shouldSend = shouldSendWeb3(status);
      if (shouldSend) {

        let web3Item : Web3 = {
          company = web3.company;
          shortDescription = web3.shortDescription;
          founderName = web3.founderName;
          founderDetail = web3.founderDetail;
          founderImage = web3.founderImage;
          companyBanner = web3.companyBanner;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          user = web3.user;
          status = web3.status;
          companyUrl = web3.companyUrl;
          likes = web3.likes;
          facebook = web3.facebook;
          instagram = web3.instagram;
          linkedin = web3.linkedin;
          companyDetail = web3.companyDetail;
          companyLogo = web3.companyLogo;
          likedUsers = web3.likedUsers;
          discord = web3.discord;
          telegram = web3.telegram;
          twitter = web3.twitter;
          views = web3.views;
          articleCount = web3.articleCount;
          podcastCount = web3.podcastCount;
          pressReleaseCount = web3.pressReleaseCount;
          totalCount = web3.totalCount;
          isStatic = web3.isStatic;
          founderEmail = web3.founderEmail;

        };
        if ((inputCategory == "All")) {

          web3List.put(key, web3Item);

        } else if (inputCategory == web3Item.catagory) {
          web3List.put(key, web3Item);
        };
      };

    };
    let web3Array = Iter.toArray(web3List.entries());
    let tempStoreage = Web3StoreHelper.searchSortList(web3List, search, startIndex, length);
    if (tempStoreage.web3List.size() >= 10) {

      return {
        amount = tempStoreage.amount;
        web3List = Array.subArray<(Key, Web3)>(tempStoreage.web3List, 0, 10);
      };
    } else {
      return tempStoreage;
    };

  };
  // in this api we will send web3 comapny name and its id
  public query ({ caller }) func getWeb3List(inputCategory : Text, search : Text, startIndex : Nat, length : Nat) : async {
    web3List : [(Key, Web3List)];
    amount : Nat;
  } {
    assert not Principal.isAnonymous(caller);
    //   let userCanister = actor (userCanisterId) : actor {
    //   check_user_exists : (caller : Principal) -> async Bool;
    // };
    // let isUser = await userCanister.check_user_exists(caller);
    var web3List = Map.HashMap<Key, Web3List>(0, Text.equal, Text.hash);

    for ((key, web3) in web3Storage.entries()) {
      let status = web3.status;
      let shouldSend = shouldSendWeb3(status);
      if (shouldSend) {

        let web3Item : Web3List = {
          company = web3.company;
          catagory = web3.catagory;
          creation_time = web3.creation_time;
          views = web3.views;
          articleCount = web3.articleCount;
          podcastCount = web3.podcastCount;
          pressReleaseCount = web3.pressReleaseCount;
          totalCount = web3.totalCount;
          isStatic = web3.isStatic;
          founderEmail = web3.founderEmail;

        };
        if ((inputCategory == "")) {

          web3List.put(key, web3Item);

        } else if (inputCategory == web3Item.catagory) {

          web3List.put(key, web3Item);

        };
      };
    };
    let web3Array = Iter.toArray(web3List.entries());
    return Web3StoreHelper.searchSortListWeb3(web3List, search, startIndex, length);

  };

  public query func getPendingWeb3List(length : Nat) : async [(Key, Web3)] {
    var pendingWeb3 = Map.fromIter<Text, Web3>(stable_web3.vals(), stable_web3.size(), Text.equal, Text.hash);
    for ((key, entry) in web3Storage.entries()) {
      switch (entry.status) {
        case (#un_verfied) {
          pendingWeb3.put(key, entry);

        };
        case (_) {

        };
      };
    };
    let entryArray = Iter.toArray(pendingWeb3.entries());

    let sortedArray = Web3StoreHelper.sortEntriesByLatest(entryArray);
    let size = sortedArray.size();
    let startIndex = 0;
    var paginatedArray : [(Key, Web3)] = [];
    let itemsPerPage = 10;

    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, startIndex, itemsPerPage);

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      let amount : Nat = size - startIndex;
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, 0, itemsPerPage);
    } else {
      paginatedArray := sortedArray;
    };
    return paginatedArray;
  };
  public query func getApprovedWeb3List(length : Nat) : async [(Key, Web3)] {
    var approvedWeb3 = Map.fromIter<Text, Web3>(stable_web3.vals(), stable_web3.size(), Text.equal, Text.hash);
    for ((key, entry) in web3Storage.entries()) {
      switch (entry.status) {
        case (#verfied) {
          approvedWeb3.put(key, entry);

        };
        case (_) {

        };
      };

    };
    let entryArray = Iter.toArray(approvedWeb3.entries());

    let sortedArray = Web3StoreHelper.sortEntriesByLatest(entryArray);
    let size = sortedArray.size();
    let startIndex = 0;
    var paginatedArray : [(Key, Web3)] = [];
    let itemsPerPage = 10;

    if (size > startIndex and size > (length + startIndex) and length != 0) {
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, startIndex, length);
    } else if (size > startIndex and size > (startIndex + itemsPerPage)) {
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, startIndex, itemsPerPage);

    } else if (size > startIndex and size < (startIndex + itemsPerPage) and size > itemsPerPage) {
      let amount : Nat = size - startIndex;
      Debug.print(debug_show (size, startIndex, amount));
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, startIndex, amount);

    } else if (size > itemsPerPage) {
      paginatedArray := Array.subArray<(Key, Web3)>(sortedArray, 0, itemsPerPage);
    } else {
      paginatedArray := sortedArray;
    };
    return paginatedArray;
  };

  public shared ({ caller }) func update_reward(userCanisterId : Text, inputReward : RewardConfig) : async RewardConfig {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #assign_role);
    let total = inputReward.master + inputReward.platform + inputReward.admin;
    assert total == 100;
    reward_config := inputReward;
    return reward_config;
  };
  public shared ({ caller }) func update_like_reward(userCanisterId : Text, inputReward : LikeReward) : async LikeReward {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #assign_role);
    assert like_reward < 100000000;
    like_reward := inputReward;
    return like_reward;
  };

  public shared ({ caller }) func add_category(category : InputCategory, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, Category), Text> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let categoryId = EntryType.generateNewRemoteObjectId();

    assert category.name.size() <= MAX_CATEGORY_NAME_CHARS;
    assert category.name.size() >= 1;

    assert category.slug.size() <= MAX_CATEGORY_SLUG_CHARS;
    assert category.slug.size() >= 1;

    assert category.description.size() <= MAX_CATEGORY_DESCRIPTION_CHARS;
    assert category.description.size() >= 1;
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    var tempChild = 0;
    var isChild = false;
    switch (category.parentCategoryId) {
      case (?parentCategoryId) {

        assert parentCategoryId.size() <= MAX_CATEGORY_DESCRIPTION_CHARS;
        assert parentCategoryId.size() >= 1;

        let maybeParentCategory = categoryStorage.get(parentCategoryId);
        switch (maybeParentCategory) {
          case (?parentCategory) {
            isChild := true;
            let isChildren = parentCategory.children;
            var newChildrens : [CategoryId] = [];

            switch (isChildren) {
              case (?oldChildrens) {
                newChildrens := Array.append<CategoryId>([categoryId], oldChildrens);
              };
              case (null) {
                newChildrens := [categoryId];
              };
            };
            let updatedParent : Category = {
              name = parentCategory.name;
              slug = parentCategory.slug;
              description = parentCategory.description;
              logo = parentCategory.logo;
              banner = parentCategory.banner;
              isChild = parentCategory.isChild;
              children = ?newChildrens;
              user = parentCategory.user;
              creation_time = parentCategory.creation_time;
              parentCategoryId = parentCategory.parentCategoryId;
              articleCount = parentCategory.articleCount;
              podcastCount = parentCategory.podcastCount;
              eventsCount = parentCategory.eventsCount;
              directoryCount = parentCategory.directoryCount;
              pressReleaseCount = parentCategory.pressReleaseCount;
              totalCount = parentCategory.totalCount;
            };
            let newParent = categoryStorage.replace(parentCategoryId, updatedParent)
            // let grandParents = parentCategory.child;
            // tempChild := grandParents + 1;
          };
          case (null) {
            return #err("Error while creating category");
          };
        };
      };
      case (null) {

      };
    };

    let newCategory : Category = {
      name = category.name;
      slug = category.slug;
      description = category.description;
      logo = category.logo;
      banner = category.banner;
      parentCategoryId = category.parentCategoryId;
      user = caller;
      creation_time = Time.now() / 1000000;
      isChild = isChild;
      children = null;
      articleCount = 0;
      podcastCount = 0;
      eventsCount = 0;
      directoryCount = 0;
      pressReleaseCount = 0;
      totalCount = 0;
    };
    categoryStorage.put(categoryId, newCategory);
    let activity = commentCanister.addAdminActivity(caller, categoryId, #add_category, category.name);
    return #ok("Created Category", newCategory);
  };
  public shared ({ caller }) func update_category(category : InputCategory, categoryId : CategoryId, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, Category), Text> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    // let categoryId = EntryType.generateNewRemoteObjectId();

    assert category.name.size() <= MAX_CATEGORY_NAME_CHARS;
    assert category.name.size() >= 1;

    assert category.slug.size() <= MAX_CATEGORY_SLUG_CHARS;
    assert category.slug.size() >= 1;

    assert category.description.size() <= MAX_CATEGORY_DESCRIPTION_CHARS;
    assert category.description.size() >= 1;

    var tempChild = 0;
    var isChild = false;
    let isOldCategory = categoryStorage.get(categoryId);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    switch (category.parentCategoryId) {
      case (?parentCategoryId) {
        assert parentCategoryId.size() <= MAX_CATEGORY_DESCRIPTION_CHARS;
        assert parentCategoryId.size() >= 1;
        let maybeParentCategory = categoryStorage.get(parentCategoryId);
        switch (isOldCategory) {
          case (?oldCategory) {
            switch (oldCategory.parentCategoryId) {
              case (?oldParent) {
                if (oldParent != parentCategoryId) {
                  return #err("Can't update parent of a category");
                };
              };
              case (null) {};
            };
          };
          case (null) {
            return #err("Not Allowed");
          };
        };
        switch (maybeParentCategory) {
          case (?parentCategory) {
            isChild := true;
            let isChildren = parentCategory.children;
            var newChildrens : [CategoryId] = [];
            switch (isChildren) {
              case (?oldChildrens) {
                newChildrens := Array.append<CategoryId>([categoryId], oldChildrens);
              };
              case (null) {
                newChildrens := [categoryId];
              };
            };
            let updatedParent : Category = {
              name = parentCategory.name;
              slug = parentCategory.slug;
              description = parentCategory.description;
              logo = parentCategory.logo;
              banner = parentCategory.banner;
              isChild = parentCategory.isChild;
              children = ?newChildrens;
              user = parentCategory.user;
              creation_time = parentCategory.creation_time;
              parentCategoryId = parentCategory.parentCategoryId;
              articleCount = parentCategory.articleCount;
              podcastCount = parentCategory.podcastCount;
              eventsCount = parentCategory.eventsCount;
              directoryCount = parentCategory.directoryCount;
              pressReleaseCount = parentCategory.pressReleaseCount;
              totalCount = parentCategory.totalCount;
            };
            let newParent = categoryStorage.replace(parentCategoryId, updatedParent);

            // let grandParents = parentCategory.child;
            // tempChild := grandParents + 1;
          };
          case (null) {
            return #err("Error while updating category");
          };
        };
      };
      case (null) {};
    };

    switch (isOldCategory) {
      case (?oldCategory) {

        let newCategory : Category = {
          name = category.name;
          slug = category.slug;
          description = category.description;
          logo = category.logo;
          banner = category.banner;
          parentCategoryId = category.parentCategoryId;
          user = oldCategory.user;
          creation_time = oldCategory.creation_time;
          isChild = isChild;
          children = oldCategory.children;
          articleCount = oldCategory.articleCount;
          podcastCount = oldCategory.podcastCount;
          eventsCount = oldCategory.eventsCount;
          directoryCount = oldCategory.directoryCount;
          pressReleaseCount = oldCategory.pressReleaseCount;
          totalCount = oldCategory.totalCount;
        };
        let added = categoryStorage.replace(categoryId, newCategory);
        let activity = commentCanister.addAdminActivity(caller, categoryId, #edit_category, category.name);

        return #ok("Updated Category", newCategory);
      };
      case (null) {
        return #err("Not Allowed");
      };
    };

  };

  public shared ({ caller }) func delete_category(categoryId : CategoryId, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, ?Category), Text> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    // let categoryId = EntryType.generateNewRemoteObjectId();
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let isOldCategory = categoryStorage.get(categoryId);

    switch (isOldCategory) {
      case (?oldCategory) {
        switch (oldCategory.children) {
          case (?hadChildren) {
            return #err("You can not delete a parent category");
          };
          case (null) {};

        };
        switch (oldCategory.parentCategoryId) {
          case (?parentCategoryId) {
            let maybeParentCategory = categoryStorage.get(parentCategoryId);
            switch (maybeParentCategory) {
              case (?parentCategory) {
                let isChildren = parentCategory.children;
                var newChildrens : ?[CategoryId] = null;

                switch (isChildren) {
                  case (?oldChildrens) {
                    newChildrens := ?Array.filter<CategoryId>(oldChildrens, func x = x != categoryId);
                    switch (newChildrens) {
                      case (?new) {
                        if (new.size() == 0) {
                          newChildrens := null;
                        };
                      };
                      case (null) {};
                    };
                  };
                  case (null) {
                    newChildrens := null;
                  };
                };
                let updatedParent : Category = {
                  name = parentCategory.name;
                  slug = parentCategory.slug;
                  description = parentCategory.description;
                  logo = parentCategory.logo;
                  banner = parentCategory.banner;
                  isChild = parentCategory.isChild;
                  children = newChildrens;
                  user = parentCategory.user;
                  creation_time = parentCategory.creation_time;
                  parentCategoryId = parentCategory.parentCategoryId;
                  articleCount = parentCategory.articleCount;
                  podcastCount = parentCategory.podcastCount;
                  eventsCount = parentCategory.eventsCount;
                  directoryCount = parentCategory.directoryCount;
                  pressReleaseCount = parentCategory.pressReleaseCount;
                  totalCount = parentCategory.totalCount;

                };
                let newParent = categoryStorage.replace(parentCategoryId, updatedParent)
                // let grandParents = parentCategory.child;
                // tempChild := grandParents + 1;
              };
              case (null) {
                return #err("Error while creating category");
              };
            };
          };
          case (null) {

          };
        };
        let added = categoryStorage.remove(categoryId);
        let activit = commentCanister.addAdminActivity(caller, categoryId, #delete_category, oldCategory.name);
        return #ok("Deleted Category", added);
      };
      case (null) {
        return #err("Not Allowed");
      };
    };

  };
  //get top 5 catagories
  public query ({ caller }) func get_categories(search : Text, startIndex : Nat, length : Nat, isParentOnly : Bool) : async {
    entries : ListCategories;
    amount : Nat;
  } {
    let categoryArray = Iter.toArray(categoryStorage.entries());
    let parentCategories = EntryStoreHelper.searchCategories(categoryArray, search, startIndex, length, isParentOnly);
    return parentCategories;

  };
  public query ({ caller }) func get_list_categories(search : Text, startIndex : Nat, length : Nat, isParentOnly : Bool) : async {
    entries : ListCategories;
    amount : Nat;
  } {
    let categoryArray = Iter.toArray(categoryStorage.entries());
    let parentCategories = EntryStoreHelper.searchListCategories(categoryArray, search, startIndex, length, isParentOnly);
    return parentCategories;

  };
  public shared ({ caller }) func update_count_category(categoryId : CategoryId, typeCount : Text) : async Result.Result<(Text, Bool), Text> {
    assert not Principal.isAnonymous(caller);

    let maybeCategory = categoryStorage.get(categoryId);
    switch (maybeCategory) {
      case (?isCategory) {
        var tempArticleCount = isCategory.articleCount;
        var tempPodcastCount = isCategory.podcastCount;
        var tempEventCount = isCategory.eventsCount;
        var temppressReleaseCount = isCategory.pressReleaseCount;
        var temptotalCount = isCategory.totalCount;

        var tempDirectoryCount = isCategory.directoryCount;
        if (typeCount == "Article") {
          tempArticleCount += 1;
          temptotalCount += 1;

        };
        if (typeCount == "Podcast") {
          tempPodcastCount += 1;
          temptotalCount += 1;

        };
        if (typeCount == "Event") {
          tempEventCount += 1;
          temptotalCount += 1;

        };
        if (typeCount == "Directory") {
          tempDirectoryCount += 1;
          temptotalCount += 1;

        };
        if (typeCount == "pressRelease") {
          temppressReleaseCount += 1;
          temptotalCount += 1;

        };
        let updatedCategory : Category = {
          name = isCategory.name;
          slug = isCategory.slug;
          description = isCategory.description;
          logo = isCategory.logo;
          banner = isCategory.banner;
          isChild = isCategory.isChild;
          children = isCategory.children;
          user = isCategory.user;
          creation_time = isCategory.creation_time;
          parentCategoryId = isCategory.parentCategoryId;
          articleCount = tempArticleCount;
          podcastCount = tempPodcastCount;
          eventsCount = tempEventCount;
          directoryCount = tempDirectoryCount;
          pressReleaseCount = temppressReleaseCount;
          totalCount = temptotalCount;

        };
        let update = categoryStorage.replace(categoryId, updatedCategory);
        return #ok("Count Increate successfully", true)

      };
      case (null) {
        return #err("Did not find Category.");
      };
    };

  };
  public query ({ caller }) func child_to_category(childArray : [CategoryId]) : async ListCategories {
    var nestedCategoriesMap = Map.HashMap<CategoryId, ListCategory>(0, Text.equal, Text.hash);
    for (id in childArray.vals()) {
      let isChildCategory = categoryStorage.get(id);
      switch (isChildCategory) {
        case (?childCategory) {
          // var nestedCategories : ?NestedCategories = ?[];
          var hasMore = false;

          let newChild : ListCategory = {
            name = childCategory.name;
            slug = childCategory.slug;
            description = childCategory.description;
            creation_time = childCategory.creation_time;
            user = childCategory.user;
            parentCategoryId = childCategory.parentCategoryId;
            children = childCategory.children;
            isChild = childCategory.isChild;
            articleCount = childCategory.articleCount;
            podcastCount = childCategory.podcastCount;
            eventsCount = childCategory.eventsCount;
            directoryCount = childCategory.directoryCount;
            pressReleaseCount = childCategory.pressReleaseCount;
            totalCount = childCategory.totalCount;
            logo = childCategory.logo;
          };
          nestedCategoriesMap.put(id, newChild);

        };
        case (null) {

        };
      };
    };
    return Iter.toArray(nestedCategoriesMap.entries());
  };
  public query ({ caller }) func get_category(categoryId : Text) : async ?Category {
    let isCategory = categoryStorage.get(categoryId);
    return isCategory;
  };
  public query ({ caller }) func get_categories_by_name(categories : [Text]) : async [(CategoryId, Category)] {
    var refinedCategories : [(CategoryId, Category)] = [];
    for ((key, category) in categoryStorage.entries()) {
      for (categoryName in categories.vals()) {
        let category1Name : Text = Text.map(category.name, Prim.charToLower);
        let category2Name : Text = Text.map(categoryName, Prim.charToLower);
        if (category1Name == category2Name) {
          refinedCategories := Array.append([(key, category)], refinedCategories);
        };
      };
    };
    return refinedCategories;
  };

  public query ({ caller }) func get_list_category(categoryId : Text) : async ?ListCategory {
    let isCategory = categoryStorage.get(categoryId);
    return isCategory;
  };
  public shared ({ caller }) func addEvent(inputEvent : InputEvent, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, EventId), (Text)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      check_user_exists : (caller : Principal) -> async Bool;
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;

    };

    let isUser = await userCanister.check_user_exists(caller);
    assert isUser;
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    // Define maximum character limits for each field

    // Assertion checks for each field
    assert inputEvent.title.size() <= MAX_TITLE_CHARS;
    assert inputEvent.organiser.size() <= MAX_NAME_CHARS;
    assert inputEvent.shortDescription.size() <= MAX_SHORT_DESCRIPTION_CHARS;
    assert inputEvent.location.size() <= MAX_LOCATION_CHARS;
    assert inputEvent.country.size() <= MAX_COUNTRY_CHARS;
    assert inputEvent.city.size() <= MAX_CITY_CHARS;
    assert inputEvent.website.size() <= MAX_WEBSITE_CHARS;
    assert inputEvent.category.size() <= MAX_CATEGORY_CHARS;
    assert inputEvent.tags.size() <= MAX_TAGS_CHARS;
    assert inputEvent.linkdin.size() <= MAX_LINKEDIN_CHARS;
    assert inputEvent.facebook.size() <= MAX_LINKEDIN_CHARS;
    assert inputEvent.telegram.size() <= MAX_LINKEDIN_CHARS;
    assert inputEvent.instagram.size() <= MAX_LINKEDIN_CHARS;
    assert inputEvent.twitter.size() <= MAX_LINKEDIN_CHARS;
    assert inputEvent.seoTitle.size() <= MAX_SEO_TITLE_CHARS;
    assert inputEvent.seoSlug.size() <= MAX_SEO_SLUG_CHARS;
    assert inputEvent.seoDescription.size() <= MAX_SEO_DESCRIPTION_CHARS;
    assert inputEvent.seoExcerpt.size() <= MAX_SEO_EXCERPT_CHARS;
    assert inputEvent.discountTicket.size() <= MAX_LINKEDIN_CHARS;

    let eventId = EntryType.generateNewRemoteObjectId();
    let newEvent : Event = {
      title = inputEvent.title;
      shortDescription = inputEvent.shortDescription;
      description = inputEvent.description;
      date = inputEvent.date;
      endDate = inputEvent.endDate;
      location = inputEvent.location;
      country = inputEvent.country;
      city = inputEvent.city;
      website = inputEvent.website;
      category = inputEvent.category;
      tags = inputEvent.tags;
      linkdin = inputEvent.linkdin;
      image = inputEvent.image;
      creation_time = Time.now() / 1000000;
      user = caller;
      seoTitle = inputEvent.seoTitle;
      seoSlug = inputEvent.seoSlug;
      seoDescription = inputEvent.seoDescription;
      seoExcerpt = inputEvent.seoExcerpt;
      month = inputEvent.month;
      facebook = inputEvent.facebook;
      telegram = inputEvent.telegram;
      instagram = inputEvent.instagram;
      twitter = inputEvent.twitter;
      organiser = inputEvent.organiser;
      freeTicket = inputEvent.freeTicket;
      applyTicket = inputEvent.applyTicket;
      lat = inputEvent.lat;
      lng = inputEvent.lng;
      isStatic = false;
      discountTicket = inputEvent.discountTicket;
    };
    eventStorage.put(eventId, newEvent);
    for (cat in inputEvent.category.vals()) {
      if (cat != "") {

        let countIncrease = await update_count_category(cat, "Event");
      };
    };
    let addactivity = commentCanister.addAdminActivity(caller, eventId, #add_event, inputEvent.title);

    return #ok("Event created successfully", eventId);
  };
  public shared ({ caller }) func updateEvent(inputEvent : InputEvent, userCanisterId : Text, commentCanisterId : Text, eventId : Text) : async Result.Result<(Text, EventId), (Text)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      check_user_exists : (caller : Principal) -> async Bool;
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;

    };

    let isUser = await userCanister.check_user_exists(caller);
    assert isUser;
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    // Define maximum character limits for each field
    let mayevent = eventStorage.get(eventId);
    switch (mayevent) {
      case (?isEvent) {
        // Assertion checks for each field
        assert inputEvent.title.size() <= MAX_TITLE_CHARS;
        assert inputEvent.organiser.size() <= MAX_NAME_CHARS;
        assert inputEvent.shortDescription.size() <= MAX_SHORT_DESCRIPTION_CHARS;
        assert inputEvent.location.size() <= MAX_LOCATION_CHARS;
        assert inputEvent.country.size() <= MAX_COUNTRY_CHARS;
        assert inputEvent.city.size() <= MAX_CITY_CHARS;
        assert inputEvent.website.size() <= MAX_WEBSITE_CHARS;
        assert inputEvent.category.size() <= MAX_CATEGORY_CHARS;
        assert inputEvent.tags.size() <= MAX_TAGS_CHARS;
        assert inputEvent.linkdin.size() <= MAX_LINKEDIN_CHARS;
        assert inputEvent.facebook.size() <= MAX_LINKEDIN_CHARS;
        assert inputEvent.telegram.size() <= MAX_LINKEDIN_CHARS;
        assert inputEvent.instagram.size() <= MAX_LINKEDIN_CHARS;
        assert inputEvent.twitter.size() <= MAX_LINKEDIN_CHARS;
        assert inputEvent.seoTitle.size() <= MAX_SEO_TITLE_CHARS;
        assert inputEvent.seoSlug.size() <= MAX_SEO_SLUG_CHARS;
        assert inputEvent.seoDescription.size() <= MAX_SEO_DESCRIPTION_CHARS;
        assert inputEvent.seoExcerpt.size() <= MAX_SEO_EXCERPT_CHARS;

        let newEvent : Event = {
          title = inputEvent.title;
          shortDescription = inputEvent.shortDescription;
          description = inputEvent.description;
          date = inputEvent.date;
          endDate = inputEvent.endDate;
          location = inputEvent.location;
          country = inputEvent.country;
          city = inputEvent.city;
          website = inputEvent.website;
          category = inputEvent.category;
          tags = inputEvent.tags;
          linkdin = inputEvent.linkdin;
          image = inputEvent.image;
          creation_time = isEvent.creation_time;
          user = isEvent.user;
          seoTitle = inputEvent.seoTitle;
          seoSlug = inputEvent.seoSlug;
          seoDescription = inputEvent.seoDescription;
          seoExcerpt = inputEvent.seoExcerpt;
          month = inputEvent.month;
          facebook = inputEvent.facebook;
          telegram = inputEvent.telegram;
          instagram = inputEvent.instagram;
          twitter = inputEvent.twitter;
          organiser = inputEvent.organiser;
          freeTicket = inputEvent.freeTicket;
          applyTicket = inputEvent.applyTicket;
          lat = inputEvent.lat;
          lng = inputEvent.lng;
          isStatic = isEvent.isStatic;
          discountTicket = inputEvent.discountTicket;

        };
        let resp = eventStorage.replace(eventId, newEvent);
        let addactivity = commentCanister.addAdminActivity(caller, eventId, #edit_event, inputEvent.title);

        for (cat in inputEvent.category.vals()) {
          if (cat != "") {

            let countIncrease = await update_count_category(cat, "Event");
          };
        };

        return #ok("Event edited successfully", eventId);
      };
      case (null) {
        return #err("Event not found");

      };
    };

  };
  public query ({ caller }) func get_events(search : Text, startIndex : Nat, length : Nat, month : ?Nat, country : ?Text, city : ?Text) : async {
    entries : Events;
    amount : Nat;
  } {
    let eventsArray = Iter.toArray(eventStorage.entries());
    let parentCategories = EntryStoreHelper.searchEvents(eventsArray, search, startIndex, length, #all, month, country, city);
    return parentCategories;
  };
  public query ({ caller }) func get_upcoming_events(search : Text, startIndex : Nat, length : Nat, status : EventStatus, month : ?Nat, country : ?Text, city : ?Text) : async {
    entries : Events;
    amount : Nat;
  } {
    let eventsArray = Iter.toArray(eventStorage.entries());
    let parentCategories = EntryStoreHelper.searchEvents(eventsArray, search, startIndex, length, status, month, country, city);
    return parentCategories;
  };
  public query ({ caller }) func get_event(eventId : Text) : async ?Event {
    return eventStorage.get(eventId);
  };
  public shared ({ caller }) func delete_event(eventId : Text, userCanisterId : Text, commentCanisterId : Text) : async Result.Result<(Text, Bool), (Text, Bool)> {
    assert not Principal.isAnonymous(caller);
    let userCanister = actor (userCanisterId) : actor {
      entry_require_permission : (pal : Principal, perm : Permission) -> async Bool;
    };
    assert await userCanister.entry_require_permission(caller, #manage_article);
    let commentCanister = actor (commentCanisterId) : actor {
      addAdminActivity : (user : Principal, target : Text, activityType : AdminActivityType, title : Text) -> async Bool;
    };
    let mayEvent = eventStorage.get(eventId);
    switch (mayEvent) {
      case (?isevent) {
        let res = eventStorage.remove(eventId);
        let activited = commentCanister.addAdminActivity(caller, eventId, #delete_event, isevent.title);
        #ok("Deleted successfully.", true);
      };
      case (null) {
        return #err("Event not found.", false);
      };
    };
  };
  system func preupgrade() {
    Debug.print("Starting pre-upgrade hook...");
    stable_entries := Iter.toArray(entryStorage.entries());
    stable_web3 := Iter.toArray(web3Storage.entries());
    tstable_categories := Iter.toArray(categoryStorage.entries());
    stable_events := Iter.toArray(eventStorage.entries());
    Debug.print("pre-upgrade finished.");

  };
  system func postupgrade() {
    Debug.print("Starting post-upgrade hook...");
    entryStorage := Map.fromIter<Key, Entry>(stable_entries.vals(), stable_entries.size(), Text.equal, Text.hash);
    web3Storage := Map.fromIter<Key, Web3>(stable_web3.vals(), stable_web3.size(), Text.equal, Text.hash);
    categoryStorage := Map.fromIter<CategoryId, Category>(tstable_categories.vals(), tstable_categories.size(), Text.equal, Text.hash);
    eventStorage := Map.fromIter<EventId, Event>(stable_events.vals(), stable_events.size(), Text.equal, Text.hash);
    stable_entries := [];
    stable_web3 := [];
    tstable_categories := [];
    stable_events := [];

    Debug.print("post-upgrade finished.");

  };

};
