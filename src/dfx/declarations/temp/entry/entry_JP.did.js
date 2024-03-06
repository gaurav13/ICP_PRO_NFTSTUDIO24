export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const NewImageObject = IDL.Text;
  const InputEvent = IDL.Record({
    'lat' : IDL.Float64,
    'lng' : IDL.Float64,
    'month' : IDL.Nat,
    'organiser' : IDL.Text,
    'title' : IDL.Text,
    'country' : IDL.Text,
    'seoTitle' : IDL.Text,
    'linkdin' : IDL.Text,
    'endDate' : IDL.Int,
    'twitter' : IDL.Text,
    'seoSlug' : IDL.Text,
    'city' : IDL.Text,
    'date' : IDL.Int,
    'instagram' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'applyTicket' : IDL.Text,
    'description' : IDL.Text,
    'website' : IDL.Text,
    'shortDescription' : IDL.Text,
    'facebook' : IDL.Text,
    'category' : IDL.Vec(IDL.Text),
    'image' : NewImageObject,
    'seoDescription' : IDL.Text,
    'freeTicket' : IDL.Text,
    'seoExcerpt' : IDL.Text,
    'location' : IDL.Text,
    'telegram' : IDL.Text,
  });
  const EventId = IDL.Text;
  const Result_2 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, EventId),
    'err' : IDL.Text,
  });
  const Key = IDL.Text;
  const CategoryId__1 = IDL.Text;
  const InputCategory = IDL.Record({
    'logo' : NewImageObject,
    'name' : IDL.Text,
    'slug' : IDL.Text,
    'banner' : NewImageObject,
    'description' : IDL.Text,
    'parentCategoryId' : IDL.Opt(CategoryId__1),
  });
  const Category = IDL.Record({
    'creation_time' : IDL.Int,
    'logo' : NewImageObject,
    'name' : IDL.Text,
    'directoryCount' : IDL.Int,
    'slug' : IDL.Text,
    'user' : IDL.Principal,
    'totalCount' : IDL.Int,
    'banner' : NewImageObject,
    'description' : IDL.Text,
    'pressReleaseCount' : IDL.Int,
    'parentCategoryId' : IDL.Opt(CategoryId__1),
    'children' : IDL.Opt(IDL.Vec(CategoryId__1)),
    'articleCount' : IDL.Int,
    'isChild' : IDL.Bool,
    'podcastCount' : IDL.Int,
    'eventsCount' : IDL.Int,
  });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, Category),
    'err' : IDL.Text,
  });
  const EntryStatus = IDL.Variant({
    'pending' : IDL.Null,
    'approved' : IDL.Null,
    'rejected' : IDL.Null,
  });
  const UserId = IDL.Principal;
  List.fill(IDL.Opt(IDL.Tuple(IDL.Int, List)));
  const Entry = IDL.Record({
    'creation_time' : IDL.Int,
    'status' : EntryStatus,
    'userName' : IDL.Text,
    'title' : IDL.Text,
    'seoTitle' : IDL.Text,
    'promotionICP' : IDL.Nat,
    'likedUsers' : IDL.Vec(IDL.Principal),
    'seoSlug' : IDL.Text,
    'subscription' : IDL.Bool,
    'views' : IDL.Nat,
    'tags' : IDL.Vec(IDL.Text),
    'user' : UserId,
    'podcastImg' : IDL.Opt(NewImageObject),
    'minters' : IDL.Vec(IDL.Principal),
    'isStatic' : IDL.Bool,
    'description' : IDL.Text,
    'isPodcast' : IDL.Bool,
    'isPromoted' : IDL.Bool,
    'likes' : IDL.Nat,
    'isDraft' : IDL.Bool,
    'promotionHistory' : List,
    'pressRelease' : IDL.Bool,
    'caption' : IDL.Text,
    'category' : IDL.Vec(IDL.Text),
    'viewedUsers' : IDL.Vec(IDL.Principal),
    'image' : IDL.Opt(NewImageObject),
    'seoDescription' : IDL.Text,
    'podcastVideoLink' : IDL.Text,
    'isCompanySelected' : IDL.Bool,
    'seoExcerpt' : IDL.Text,
    'podcastImgCation' : IDL.Text,
    'companyId' : IDL.Text,
  });
  const Result_7 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, IDL.Opt(Entry)),
    'err' : IDL.Text,
  });
  const Result_8 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, Entry),
    'err' : IDL.Text,
  });
  const CategoryId = IDL.Text;
  const ListCategory = IDL.Record({
    'creation_time' : IDL.Int,
    'logo' : NewImageObject,
    'name' : IDL.Text,
    'directoryCount' : IDL.Int,
    'slug' : IDL.Text,
    'user' : IDL.Principal,
    'totalCount' : IDL.Int,
    'description' : IDL.Text,
    'pressReleaseCount' : IDL.Int,
    'parentCategoryId' : IDL.Opt(CategoryId__1),
    'children' : IDL.Opt(IDL.Vec(CategoryId__1)),
    'articleCount' : IDL.Int,
    'isChild' : IDL.Bool,
    'podcastCount' : IDL.Int,
    'eventsCount' : IDL.Int,
  });
  const ListCategories = IDL.Vec(IDL.Tuple(CategoryId, ListCategory));
  const Result_6 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, IDL.Opt(Category)),
    'err' : IDL.Text,
  });
  const Result_5 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, IDL.Bool),
    'err' : IDL.Tuple(IDL.Text, IDL.Bool),
  });
  const Web3Status = IDL.Variant({
    'all' : IDL.Null,
    'un_verfied' : IDL.Null,
    'verfied' : IDL.Null,
  });
  const Web3 = IDL.Record({
    'creation_time' : IDL.Int,
    'status' : Web3Status,
    'linkedin' : IDL.Opt(IDL.Text),
    'companyBanner' : NewImageObject,
    'founderName' : IDL.Text,
    'likedUsers' : IDL.Vec(IDL.Principal),
    'twitter' : IDL.Opt(IDL.Text),
    'views' : IDL.Nat,
    'founderImage' : NewImageObject,
    'instagram' : IDL.Opt(IDL.Text),
    'companyDetail' : IDL.Text,
    'user' : UserId,
    'totalCount' : IDL.Int,
    'catagory' : IDL.Text,
    'pressReleaseCount' : IDL.Int,
    'likes' : IDL.Nat,
    'company' : IDL.Text,
    'shortDescription' : IDL.Text,
    'facebook' : IDL.Opt(IDL.Text),
    'companyLogo' : NewImageObject,
    'discord' : IDL.Opt(IDL.Text),
    'companyUrl' : IDL.Opt(IDL.Text),
    'articleCount' : IDL.Int,
    'telegram' : IDL.Opt(IDL.Text),
    'podcastCount' : IDL.Int,
    'founderDetail' : IDL.Text,
  });
  const ListEntryItem = IDL.Record({
    'creation_time' : IDL.Int,
    'status' : EntryStatus,
    'userName' : IDL.Text,
    'title' : IDL.Text,
    'views' : IDL.Nat,
    'user' : UserId,
    'podcastImg' : IDL.Opt(NewImageObject),
    'minters' : IDL.Vec(IDL.Principal),
    'isStatic' : IDL.Bool,
    'isPodcast' : IDL.Bool,
    'isPromoted' : IDL.Bool,
    'likes' : IDL.Nat,
    'isDraft' : IDL.Bool,
    'pressRelease' : IDL.Bool,
    'category' : IDL.Vec(IDL.Text),
    'image' : IDL.Opt(NewImageObject),
    'podcastVideoLink' : IDL.Text,
    'isCompanySelected' : IDL.Bool,
    'seoExcerpt' : IDL.Text,
    'podcastImgCation' : IDL.Text,
    'companyId' : IDL.Text,
  });
  const EntryMetadata = IDL.Record({
    'creation_time' : IDL.Int,
    'status' : EntryStatus,
    'userName' : IDL.Text,
    'seoTitle' : IDL.Text,
    'seoSlug' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'user' : UserId,
    'podcastImg' : IDL.Opt(NewImageObject),
    'description' : IDL.Text,
    'isPodcast' : IDL.Bool,
    'isPromoted' : IDL.Bool,
    'pressRelease' : IDL.Bool,
    'caption' : IDL.Text,
    'category' : IDL.Vec(IDL.Text),
    'image' : IDL.Opt(NewImageObject),
    'seoDescription' : IDL.Text,
    'podcastVideoLink' : IDL.Text,
    'isCompanySelected' : IDL.Bool,
    'seoExcerpt' : IDL.Text,
    'podcastImgCation' : IDL.Text,
    'companyId' : IDL.Text,
  });
  const ListPodcastItem = IDL.Record({
    'creation_time' : IDL.Int,
    'status' : EntryStatus,
    'userName' : IDL.Text,
    'title' : IDL.Text,
    'likedUsers' : IDL.Vec(IDL.Principal),
    'views' : IDL.Nat,
    'user' : UserId,
    'podcastImg' : IDL.Opt(NewImageObject),
    'minters' : IDL.Vec(IDL.Principal),
    'isStatic' : IDL.Bool,
    'isPodcast' : IDL.Bool,
    'likes' : IDL.Nat,
    'isDraft' : IDL.Bool,
    'pressRelease' : IDL.Bool,
    'category' : IDL.Vec(IDL.Text),
    'image' : IDL.Opt(NewImageObject),
    'podcastVideoLink' : IDL.Text,
    'isCompanySelected' : IDL.Bool,
    'seoExcerpt' : IDL.Text,
    'companyId' : IDL.Text,
  });
  const EntryStatus__1 = IDL.Variant({
    'pending' : IDL.Null,
    'approved' : IDL.Null,
    'rejected' : IDL.Null,
  });
  const UserId__1 = IDL.Principal;
  const Web3Status__1 = IDL.Variant({
    'all' : IDL.Null,
    'un_verfied' : IDL.Null,
    'verfied' : IDL.Null,
  });
  const Web3DashboardList = IDL.Record({
    'creation_time' : IDL.Int,
    'status' : Web3Status,
    'founderName' : IDL.Text,
    'views' : IDL.Nat,
    'user' : UserId,
    'catagory' : IDL.Text,
    'company' : IDL.Text,
    'companyLogo' : NewImageObject,
    'companyUrl' : IDL.Opt(IDL.Text),
  });
  const Web3List = IDL.Record({
    'creation_time' : IDL.Int,
    'views' : IDL.Nat,
    'totalCount' : IDL.Int,
    'catagory' : IDL.Text,
    'pressReleaseCount' : IDL.Int,
    'company' : IDL.Text,
    'articleCount' : IDL.Int,
    'podcastCount' : IDL.Int,
  });
  const Event__1 = IDL.Record({
    'lat' : IDL.Float64,
    'lng' : IDL.Float64,
    'creation_time' : IDL.Int,
    'month' : IDL.Nat,
    'organiser' : IDL.Text,
    'title' : IDL.Text,
    'country' : IDL.Text,
    'seoTitle' : IDL.Text,
    'linkdin' : IDL.Text,
    'endDate' : IDL.Int,
    'twitter' : IDL.Text,
    'seoSlug' : IDL.Text,
    'city' : IDL.Text,
    'date' : IDL.Int,
    'instagram' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'user' : UserId,
    'applyTicket' : IDL.Text,
    'description' : IDL.Text,
    'website' : IDL.Text,
    'shortDescription' : IDL.Text,
    'facebook' : IDL.Text,
    'category' : IDL.Vec(IDL.Text),
    'image' : NewImageObject,
    'seoDescription' : IDL.Text,
    'freeTicket' : IDL.Text,
    'seoExcerpt' : IDL.Text,
    'location' : IDL.Text,
    'telegram' : IDL.Text,
  });
  const EventId__1 = IDL.Text;
  const Event = IDL.Record({
    'lat' : IDL.Float64,
    'lng' : IDL.Float64,
    'creation_time' : IDL.Int,
    'month' : IDL.Nat,
    'organiser' : IDL.Text,
    'title' : IDL.Text,
    'country' : IDL.Text,
    'seoTitle' : IDL.Text,
    'linkdin' : IDL.Text,
    'endDate' : IDL.Int,
    'twitter' : IDL.Text,
    'seoSlug' : IDL.Text,
    'city' : IDL.Text,
    'date' : IDL.Int,
    'instagram' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'user' : UserId,
    'applyTicket' : IDL.Text,
    'description' : IDL.Text,
    'website' : IDL.Text,
    'shortDescription' : IDL.Text,
    'facebook' : IDL.Text,
    'category' : IDL.Vec(IDL.Text),
    'image' : NewImageObject,
    'seoDescription' : IDL.Text,
    'freeTicket' : IDL.Text,
    'seoExcerpt' : IDL.Text,
    'location' : IDL.Text,
    'telegram' : IDL.Text,
  });
  const Events = IDL.Vec(IDL.Tuple(EventId__1, Event));
  const RewardConfig = IDL.Record({
    'admin' : IDL.Nat,
    'platform' : IDL.Nat,
    'master' : IDL.Nat,
  });
  const EventStatus = IDL.Variant({
    'all' : IDL.Null,
    'upcoming' : IDL.Null,
    'past' : IDL.Null,
    'ongoing' : IDL.Null,
  });
  const InputEntry = IDL.Record({
    'userName' : IDL.Text,
    'title' : IDL.Text,
    'seoTitle' : IDL.Text,
    'promotionICP' : IDL.Nat,
    'seoSlug' : IDL.Text,
    'subscription' : IDL.Bool,
    'tags' : IDL.Vec(IDL.Text),
    'podcastImg' : IDL.Opt(NewImageObject),
    'description' : IDL.Text,
    'isPodcast' : IDL.Bool,
    'isPromoted' : IDL.Bool,
    'isDraft' : IDL.Bool,
    'pressRelease' : IDL.Bool,
    'caption' : IDL.Text,
    'category' : IDL.Vec(IDL.Text),
    'image' : IDL.Opt(NewImageObject),
    'seoDescription' : IDL.Text,
    'podcastVideoLink' : IDL.Text,
    'isCompanySelected' : IDL.Bool,
    'seoExcerpt' : IDL.Text,
    'podcastImgCation' : IDL.Text,
    'companyId' : IDL.Text,
  });
  const EntryId = IDL.Text;
  const Result_4 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, EntryId),
    'err' : IDL.Text,
  });
  const InputWeb3 = IDL.Record({
    'linkedin' : IDL.Text,
    'companyBanner' : NewImageObject,
    'founderName' : IDL.Text,
    'twitter' : IDL.Text,
    'founderImage' : NewImageObject,
    'instagram' : IDL.Text,
    'companyDetail' : IDL.Text,
    'catagory' : IDL.Text,
    'company' : IDL.Text,
    'shortDescription' : IDL.Text,
    'facebook' : IDL.Text,
    'companyLogo' : NewImageObject,
    'discord' : IDL.Text,
    'companyUrl' : IDL.Text,
    'telegram' : IDL.Text,
    'founderDetail' : IDL.Text,
  });
  const Web3Id = IDL.Text;
  const Result_3 = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, Web3Id),
    'err' : IDL.Text,
  });
  const Result = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Text, IDL.Bool),
    'err' : IDL.Text,
  });
  const TrendingEntryItemSidebar = IDL.Record({
    'creation_time' : IDL.Int,
    'status' : EntryStatus,
    'userName' : IDL.Text,
    'title' : IDL.Text,
    'views' : IDL.Nat,
    'user' : UserId,
    'isStatic' : IDL.Bool,
    'isPromoted' : IDL.Bool,
    'likes' : IDL.Nat,
    'isDraft' : IDL.Bool,
    'pressRelease' : IDL.Bool,
    'category' : IDL.Vec(IDL.Text),
    'image' : IDL.Opt(NewImageObject),
    'isCompanySelected' : IDL.Bool,
    'seoExcerpt' : IDL.Text,
    'companyId' : IDL.Text,
  });
  const LikeReward = IDL.Nat;
  const anon_class_24_1 = IDL.Service({
    'addCategory' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Vec(IDL.Text)],
        [],
      ),
    'addEvent' : IDL.Func([InputEvent, IDL.Text, IDL.Text], [Result_2], []),
    'addView' : IDL.Func([Key], [IDL.Bool], []),
    'addWeb3View' : IDL.Func([Key], [IDL.Bool], []),
    'addWeb3postCount' : IDL.Func([Key, IDL.Text], [IDL.Bool], []),
    'add_category' : IDL.Func(
        [InputCategory, IDL.Text, IDL.Text],
        [Result_1],
        [],
      ),
    'adminDeleteEntry' : IDL.Func([Key, IDL.Text, IDL.Text], [Result_7], []),
    'approveArticle' : IDL.Func(
        [IDL.Text, IDL.Text, Key, IDL.Bool],
        [Result_8],
        [],
      ),
    'approvePodcast' : IDL.Func(
        [IDL.Text, IDL.Text, Key, IDL.Bool],
        [Result_8],
        [],
      ),
    'child_to_category' : IDL.Func(
        [IDL.Vec(CategoryId)],
        [ListCategories],
        ['query'],
      ),
    'deleteDraftEntry' : IDL.Func([Key, IDL.Text], [Result_7], []),
    'delete_category' : IDL.Func(
        [CategoryId, IDL.Text, IDL.Text],
        [Result_6],
        [],
      ),
    'delete_event' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_5], []),
    'delete_web3' : IDL.Func([Key, IDL.Text, IDL.Text], [Result_5], []),
    'editViews' : IDL.Func([Key, IDL.Nat, IDL.Text, IDL.Text], [IDL.Bool], []),
    'editWeb3Views' : IDL.Func(
        [Key, IDL.Nat, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'getAllEntries' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getAllEntryIds' : IDL.Func([IDL.Bool], [IDL.Vec(Key)], ['query']),
    'getApprovedWeb3List' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(Key, Web3))],
        ['query'],
      ),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getEntriesByCategory' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getEntriesList' : IDL.Func(
        [IDL.Text, IDL.Bool, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, ListEntryItem)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getEntriesNew' : IDL.Func(
        [CategoryId, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, Entry)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getEntry' : IDL.Func([Key], [IDL.Opt(Entry)], ['query']),
    'getEntryMeta' : IDL.Func([Key], [EntryMetadata], ['query']),
    'getEntry_admin' : IDL.Func([Key], [IDL.Opt(Entry)], ['query']),
    'getOnlyArticles' : IDL.Func(
        [IDL.Nat, IDL.Vec(IDL.Text)],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getOnlyPressRelease' : IDL.Func(
        [IDL.Nat, IDL.Vec(IDL.Text)],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getPaginatedEntries' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, Entry)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getPendingWeb3List' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(Key, Web3))],
        ['query'],
      ),
    'getPodcastList' : IDL.Func(
        [IDL.Text, IDL.Bool, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, ListPodcastItem)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getPressEntries' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getPromotedEntries' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getQuriedEntries' : IDL.Func(
        [IDL.Opt(CategoryId), IDL.Text, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, Entry)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getReviewEntries' : IDL.Func(
        [IDL.Text, IDL.Text, EntryStatus__1, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, ListEntryItem)),
            'amount' : IDL.Nat,
          }),
        ],
        [],
      ),
    'getReviewPodcast' : IDL.Func(
        [IDL.Text, IDL.Text, EntryStatus__1, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, ListPodcastItem)),
            'amount' : IDL.Nat,
          }),
        ],
        [],
      ),
    'getUserEntries' : IDL.Func(
        [UserId__1],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getUserEntriesList' : IDL.Func(
        [IDL.Text, IDL.Bool, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'entries' : IDL.Vec(IDL.Tuple(Key, ListEntryItem)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getUserPodcast' : IDL.Func(
        [UserId__1],
        [IDL.Vec(IDL.Tuple(Key, Entry))],
        ['query'],
      ),
    'getUserWeb3List' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'web3List' : IDL.Vec(IDL.Tuple(Key, Web3)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getWeb3' : IDL.Func([Key], [IDL.Opt(Web3)], ['query']),
    'getWeb3DirectoriesDashboard' : IDL.Func(
        [IDL.Text, Web3Status__1, IDL.Text, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'web3List' : IDL.Vec(IDL.Tuple(Key, Web3DashboardList)),
            'amount' : IDL.Nat,
          }),
        ],
        [],
      ),
    'getWeb3List' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'web3List' : IDL.Vec(IDL.Tuple(Key, Web3List)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getWeb3ListOfAllUsers' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'web3List' : IDL.Vec(IDL.Tuple(Key, Web3)),
            'amount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getWeb3_for_admin' : IDL.Func([Key, IDL.Text], [IDL.Opt(Web3)], []),
    'get_categories' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat, IDL.Bool],
        [IDL.Record({ 'entries' : ListCategories, 'amount' : IDL.Nat })],
        ['query'],
      ),
    'get_categories_by_name' : IDL.Func(
        [IDL.Vec(IDL.Text)],
        [IDL.Vec(IDL.Tuple(CategoryId, Category))],
        ['query'],
      ),
    'get_category' : IDL.Func([IDL.Text], [IDL.Opt(Category)], ['query']),
    'get_event' : IDL.Func([IDL.Text], [IDL.Opt(Event__1)], ['query']),
    'get_events' : IDL.Func(
        [
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Opt(IDL.Nat),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
        ],
        [IDL.Record({ 'entries' : Events, 'amount' : IDL.Nat })],
        ['query'],
      ),
    'get_like_reward' : IDL.Func([], [IDL.Nat], ['query']),
    'get_list_categories' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat, IDL.Bool],
        [IDL.Record({ 'entries' : ListCategories, 'amount' : IDL.Nat })],
        ['query'],
      ),
    'get_list_category' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(ListCategory)],
        ['query'],
      ),
    'get_reward' : IDL.Func([], [RewardConfig], ['query']),
    'get_upcoming_events' : IDL.Func(
        [
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          EventStatus,
          IDL.Opt(IDL.Nat),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
        ],
        [IDL.Record({ 'entries' : Events, 'amount' : IDL.Nat })],
        ['query'],
      ),
    'insertEntry' : IDL.Func(
        [InputEntry, IDL.Text, IDL.Bool, IDL.Text, IDL.Text],
        [Result_4],
        [],
      ),
    'insertWeb3' : IDL.Func(
        [InputWeb3, IDL.Text, IDL.Text, IDL.Text, IDL.Bool],
        [Result_3],
        [],
      ),
    'isMinted' : IDL.Func([Key], [IDL.Bool], []),
    'likeEntry' : IDL.Func([Key, IDL.Text, IDL.Text], [Result], []),
    'likeWeb3' : IDL.Func([Key, IDL.Text, IDL.Text], [Result], []),
    'makeStatic' : IDL.Func([Key], [IDL.Bool], []),
    'mintEntry' : IDL.Func([Key, IDL.Text], [Result], []),
    'trendingEntryItemSidebar' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(Key, TrendingEntryItemSidebar))],
        ['query'],
      ),
    'trendingPressReleaseItemSidebar' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(Key, TrendingEntryItemSidebar))],
        ['query'],
      ),
    'updateEvent' : IDL.Func(
        [InputEvent, IDL.Text, IDL.Text, IDL.Text],
        [Result_2],
        [],
      ),
    'update_category' : IDL.Func(
        [InputCategory, CategoryId, IDL.Text, IDL.Text],
        [Result_1],
        [],
      ),
    'update_count_category' : IDL.Func([CategoryId, IDL.Text], [Result], []),
    'update_like_reward' : IDL.Func([IDL.Text, LikeReward], [LikeReward], []),
    'update_reward' : IDL.Func([IDL.Text, RewardConfig], [RewardConfig], []),
    'verifyWeb3' : IDL.Func([Key, IDL.Text, IDL.Text, IDL.Bool], [Result], []),
  });
  return anon_class_24_1;
};
export const init = ({ IDL }) => { return []; };
