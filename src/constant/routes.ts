import { LANG } from '@/constant/language';

export const TAG_CONTENT_ROUTE = '/content';
export const PATHS = [
  '/article',
  '/podcast',
  '/article-details',
  '/podcast-details',
];
export const ARTICLE_STATIC_PATH = '/article-details/';
export const Podcast_STATIC_PATH = '/podcast-details/';
export const Event_STATIC_PATH = '/event-detail/';
export const DIRECTORY_STATIC_PATH = '/directory-detail/';
export const GOOGLEMAP_URL = 'https://www.google.com/maps/place/?q=';
export const CATEGORY_PATH = {
  WEB3:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710137112381095238'
      : 'https://pro.nftstudio24.com/category-details?category=1710824440160026975',
  AI:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710821043195619936'
      : 'https://pro.nftstudio24.com/category-details?category=1710824547303409877',
  NFT:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822374423109041'
      : 'https://pro.nftstudio24.com/category-details?category=1710824938281383049',
  BLOCKCHAIN_GAMES:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822404046076093'
      : 'https://pro.nftstudio24.com/category-details?category=1710824682149507703',
  BLOCKCHAIN_NEWS:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822432496415429'
      : 'https://pro.nftstudio24.com/category-details?category=1709729027034774944',
  DEFI:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822512655241150'
      : 'https://pro.nftstudio24.com/category-details?category=1710824804844169435',
  DAO:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822326165086912'
      : 'https://pro.nftstudio24.com/category-details?category=1710824774105912497',
  METAVERCE:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822461756881598'
      : 'https://pro.nftstudio24.com/category-details?category=1710824602932401716',
  CRYPTO:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822487300013125'
      : 'https://pro.nftstudio24.com/category-details?category=1710824747458814944',
  LATEST_NEW:
    LANG == 'jp'
      ? 'https://dapp.nftstudio24.com/category-details?category=1710822550939375077'
      : 'https://pro.nftstudio24.com/category-details?category=1710824990554939585',
};
