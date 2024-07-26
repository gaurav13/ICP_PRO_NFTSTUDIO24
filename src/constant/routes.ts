import { EN_SITE_URL, JP_SITE_URL } from '@/constant/config';
import { LANG } from '@/constant/language';

export const TAG_CONTENT_ROUTE = '/content';
export const PATHS = [
  '/article',
  '/podcast',
  '/article-details',
  '/podcast-details',
];
export const ARTICLE_DYNAMIC_PATH_2 = '/article-details/';
export const PODCAST_DYNAMIC_PATH_2 = '/podcast-details/';
export const DIRECTORY_DYNAMIC_PATH_2 = '/directory-detail/';
export const EVENT_DYNAMIC_PATH_2 = '/event-detail/';


// export const Event_STATIC_PATH = '/event-detail/';
// export const DIRECTORY_STATIC_PATH = '/directory-detail/';

// export const Podcast_DINAMIC_PATH = '/podcast?podcastId=';
// export const ARTICLE_DINAMIC_PATH = '/article?articleId=';
// export const DIRECTORY_DINAMIC_PATH = '/directory?directoryId=';
// export const Event_DINAMIC_PATH = '/event-details?eventId=';


export const ARTICLE_STATIC_PATH = '/article/';
export const Podcast_STATIC_PATH = '/podcast/';
export const Event_STATIC_PATH = '/event-details/';
export const DIRECTORY_STATIC_PATH = '/directory/';

export const ARTICLE_DINAMIC_PATH = '/article-details/?articleId=';
export const Podcast_DINAMIC_PATH = '/podcast-details/?podcastId=';
export const Event_DINAMIC_PATH = '/event-detail/?eventId=';
export const DIRECTORY_DINAMIC_PATH = '/directory-detail/?directoryId=';

export const GOOGLEMAP_URL = 'https://www.google.com/maps/place/?q=';
export const CATEGORY_PATH = {
  WEB3:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710137112381095238`
      :`${EN_SITE_URL}/category-details/?category=1718641230817970431`,
  AI:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710821043195619936`
      : `${EN_SITE_URL}/category-details/?category=1718645044417924753`,
  NFT:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710822374423109041`
      : `${EN_SITE_URL}/category-details/?category=1718968029182069160`,
  BLOCKCHAIN_GAMES:
    LANG == 'jp'
      ?`${JP_SITE_URL}/category-details?category=1710822404046076093`
      : `${EN_SITE_URL}/category-details/?category=1719210909413102943`,
  BLOCKCHAIN_NEWS:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710822432496415429`
      : `${EN_SITE_URL}/category-details/?category=1718641457527889243`,
  DEFI:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710822512655241150`
      : `${EN_SITE_URL}/category-details/?category=1719210427243611048`,
  DAO:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710822326165086912`
      : `${EN_SITE_URL}/category-details/?category=1719211072131510431`,
  METAVERCE:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710822461756881598`
      : `${EN_SITE_URL}/category-details/?category=1718641722539268658`,
  CRYPTO:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710822487300013125`
      : `${EN_SITE_URL}/category-details/?category=1719210557164450999`,
  // LATEST_NEW:
  //   LANG == 'jp'
  //     ? `${JP_SITE_URL}/category-details?category=1710822550939375077`
  //     : `${EN_SITE_URL}/category-details?category=1710824990554939585`,
      LATEST_NEW:
    LANG == 'jp'
      ? `${JP_SITE_URL}/category-details?category=1710822550939375077&news=latest`
      : `${EN_SITE_URL}/category-details?category=1719210557164450999&news=latest`,
      

};
export const BLOCKCHAIN_CATEGORY_ID=LANG=="jp"?"1710822432496415429":"1718641457527889243";
// quil routes
export const ADD_ARTICLE="/add-article/"
export const ADD_WEB3="/add-directory";
export const ADD_QUIZ_ROUTE_USER = '/add-quiz';
export const ALL_ARTICLES = '/articles/';
export const ADD_QUIZ_ROUTE_ADMIN = '/super-admin/add-quiz/';
export const ADD_SURVEY_ROUTE_USER = '/add-survey';
export const ADD_SURVEY_ROUTE_ADMIN = '/super-admin/add-survey/';
export const ALL_SURVEY_ROUTE_USER = '/all-survey/';
export const ALL_QUIZ_ROUTE_USER = '/all-quiz/'
export const ALL_QUIZ_ROUTE_ADMIN = '/super-admin/manage-quiz/';
export const MANAGE_SURVEY_ADMIN="/super-admin/manage-survey/"
export const SURVEY="/take-survey"
export const TAKE_QUIZ="/take-quiz"
export const JSONLD_IMG_WIDTH=1200;
export const JSONLD_IMG_HEIGHT=630;
export const BUYTOKENS = '/buy-tokens/';
export const CONTACT_US = LANG=="jp" ? "/contact-us/":'https://nftstudio24.com/contact-us/';
export const PRIVACY_POLICY = LANG=="jp" ? "/privacy-policy/":'https://nftstudio24.com/privacy-policy/';
export const EDITOR_POLICY = '/editor-policy/';
export const ETHICS_POLICY = LANG=="jp" ? "/ethics-policy/":'https://nftstudio24.com/ethics-policy/';
export const PRESSRELEASE = '/press-release/';
export const EVENTS = '/events/';
export const TERMSOFUSE = LANG=="jp" ? "/terms-of-use/":'https://nftstudio24.com/terms-of-use/';
export const DONTNOTSELL = LANG=="jp" ? "/do-not-sell/":'https://nftstudio24.com/do-not-sell/';
export const CAREERS = LANG=="jp" ? "/careers/": 'https://nftstudio24.com/careers/';
export const HINZAASIF =  LANG=="jp" ? "/hinza-asif/":'https://nftstudio24.com/hinza-asif/';
export const DISCLAIMER = LANG=="jp" ? "/disclaimer/":'https://nftstudio24.com/disclaimer/';
export const QUIZ = '/quiz/';
export const PODCASTSPG = '/podcasts/';
export const TAKESURVEYPAGE = '/take-survey?id=';
export const TAKEQUIZPAGE = '/take-quiz?id=';
export const USERPROFILELINK = '/profile/?userId=';











