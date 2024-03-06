'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Dropdown, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import hot from '@/assets/Img/Icons/icon-flame-1.png';
import stars from '@/assets/Img/Icons/icon-start.png';
import press from '@/assets/Img/Icons/icon-press-release.png';
import iconcompass from '@/assets/Img/Icons/icon-compass.png';
import iconrss from '@/assets/Img/Icons/icon-rss.png';
import iconevents from '@/assets/Img/Icons/icon-event.png';
import iconthumb from '@/assets/Img/Icons/icon-thumb.png';
import iconmessage from '@/assets/Img/Icons/icon-comment.png';
import iconranking from '@/assets/Img/Icons/icon-ranking.png';
import iconnotice from '@/assets/Img/Icons/icon-notice.png';
import iconshare from '@/assets/Img/Icons/icon-share-o.png';
import iconfeed from '@/assets/Img/Icons/icon-feed.png';
import iconinfo from '@/assets/Img/Icons/icon-infor.png';
import iconcrown from '@/assets/Img/Icons/icon-crown.png';
import iconretweet from '@/assets/Img/Icons/icon-retweet.png';
import iconrise from '@/assets/Img/Icons/icon-rise.png';
import iconcoin from '@/assets/Img/coin-image.png';
import post1 from '@/assets/Img/event-7.png';
import post2 from '@/assets/Img/event-8.png';
import post3 from '@/assets/Img/event-9.png';
import icongirl from '@/assets/Img/Icons/icon-girl-1.png';
import generalpost1 from '@/assets/Img/event-5.png';
import icpimage from '@/assets/Img/coin-image.png';
import generalpost2 from '@/assets/Img/event-6.png';
import user from '@/assets/Img/user.png';
import iconbnb from '@/assets/Img/icon-bnb.png';
import PodcastPost from '@/components/PodcastPost/PodcastPost';
import SurveyPost from '@/components/SurveyPost/SurveyPost';
import ReleasePost from '@/components/ReleasePost/ReleasePost';
// import PressPost from '@/components/PressPost/PressPost';
import FeaturedSlider from '@/components/FeaturedSlider/FeaturedSlider';
import ReleaseSlider from '@/components/ReleaseSlider/ReleaseSlider';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import LeadershipPost from '@/components/LeadershipPost/LeadershipPost';
import { useConnectPlugWalletStore, useThemeStore } from '@/store/useStore';
import Articles from '@/components/Articles';
import WebstoriesSlider from '@/components/WebstoriesSlider/WebstoriesSlider';
import { getImage, iframeimgThumbnail } from '@/components/utils/getImage';
import girl from '@/assets/Img/user-img.png';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import logger from '@/lib/logger';
import {
  makeCommentActor,
  makeEntryActor,
  makeUserActor,
} from '@/dfx/service/actor-locator';
import parse from 'html-react-parser';
import EntryListNewHome from '@/components/EntryListNewHome/EntryListNewHome';
import { Router } from 'lucide-react';
import GeneralSlider from '@/components/GeneralSlider/GeneralSlider';
import NewsSlider from '@/components/NewsSlider';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConnectModal from '@/components/Modal';
import { canisterId as userCanisterId } from '@/dfx/declarations/user';
import { canisterId as commentCanisterId } from '@/dfx/declarations/comment';
import PromotedSVG from '@/components/PromotedSvg/Promoted';
import Tippy from '@tippyjs/react';
import { ARTICLE_FEATURED_IMAGE_ASPECT, profileAspect } from '@/constant/sizes';
import TopEvents from '@/components/TopEvents';
import { E8S } from '@/constant/config';
import { fromNullable } from '@dfinity/utils';
import LeadershipboardNew from '@/components/LeadershipboardNew/LeadershipboardNew';
import CompanyListSidebar from '@/components/companyListSidebar/CompanyListSidebar';
import TrendingArticleSide from '@/components/TrendingArticleSide/TrendingArticleSide';
import {
  formatLikesCount,
  isUserConnected,
} from '@/components/utils/utcToLocal';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import DirectorySlider from '@/components/CompanySlider/CompanySlider';
import Web3HomeSlider from '@/components/web3Homeslider/Web3homeSlider';
import PodcastHomeSlider from '@/components/PodcastSliderHome/PodcastHomeSlider';
import { ARTICLE_STATIC_PATH, Podcast_STATIC_PATH } from '@/constant/routes';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

function HomeArticle({ article, small }: { article: any; small?: boolean }) {
  let [commentVal, setCommentVal] = useState('');
  let [commentsLength, setCommentsLength] = useState(
    article[1].comment.comments ?? 0
  );
  const [showConnectModal, setShowConnectModal] = useState(false);

  const [userImage, setuserImage] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  let [likeCount, setLikeCount] = useState(0 ?? Number(article[1].likes));
  let [isliked, setIsLiked] = useState(
    article[1]?.likedUsers?.some((u: any) => u?.toString() == article[1].userId)
  );

  const { auth, setAuth, identity, principal } = useConnectPlugWalletStore(
    (state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      identity: state.identity,
      principal: state.principal,
    })
  );
  const router = useRouter();
  const path = usePathname();

  const fouceOnInputField = async (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleConnectModal = () => {
    // e.preventDefault();
    setShowConnectModal(true);
    // setConnectLink(e);
  };
  const handleConnectModalClose = () => {
    setShowConnectModal(false);
  };

  const sendcomment = async (e: any) => {
    e.preventDefault();
    logger(commentVal.trim().length, 'c2');
    if (commentVal.trim().length < 1) {
      return toast.error("Comment can't be empty.");
    }
    if (commentVal.trim().length > 400) {
      return toast.error("Comment can't be more then 400 characters.");
    }
    try {
      if (!isUserConnected(auth, handleConnectModal)) return;
      setIsCommenting(true);
      const commentsActor = makeCommentActor({
        agentOptions: {
          identity,
        },
      });
      let entrytype = 'article';
      if (article[1]?.isPodcast) {
        entrytype = 'podcast';
      }
      if (article[1]?.pressRelease) {
        entrytype = 'pressRelease';
      }
      const addedComment = await commentsActor.addComment(
        commentVal,
        userCanisterId,
        article[0],
        article[1]?.title,
        entrytype
      );
      // const user = await auth.actor.get_user_details([principal]);
      // const dateNow = moment.utc().format('MMMM Do, YYYY');
      // const newComment = {
      //   creation_time: utcToLocal('', 'MMMM Do, YYYY, HH:mm'),
      //   user: user.ok[1],
      //   content: currentComment,
      //   userId: principal,
      // };
      // setUserArticleComments((prev: any) => {
      //   return [newComment, ...prev];
      // });
      if (addedComment.ok) {
        setIsCommenting(false);
        setCommentsLength((pre: any) => pre + 1);
        setCommentVal('');
        toast.success('Comment added successfully.');
      } else {
        setIsCommenting(false);
        toast.error(t('Something went wrong.'));
      }
      logger(addedComment, 'comment1');
      // handleCommented();
    } catch (err) {
      logger(err, 'ERR');
      setIsCommenting(false);

      // handleCommented();
    }
  };

  const likeEntry = async () => {
    if (!isUserConnected(auth, handleConnectModal)) return;

    if (!isliked) {
      setLikeCount((pre) => pre + 1);
      setIsLiked(true);
    } else {
      setLikeCount((pre) => pre - 1);
      setIsLiked(false);
    }

    return new Promise(async (resolve, reject) => {
      if (!article || !article[1].userId)
        reject('NO Entry or user ID provided');
      const entryActor = makeEntryActor({
        agentOptions: {
          identity,
        },
      });

      entryActor
        .likeEntry(article[0], userCanisterId, commentCanisterId)
        .then(async (entry: any) => {
          logger(entry, 'een');
          resolve(entry);
        })
        .catch((err: any) => {
          logger(err);
          if (!isliked) {
            setLikeCount((pre) => pre + 1);
            setIsLiked(true);
          } else {
            setLikeCount((pre) => pre - 1);
            setIsLiked(false);
          }
          reject(err);
        });
    });
  };
  let copyToClipboard = (e: any, link: string) => {
    e.preventDefault();
    let newPath = path.split('/');
    // newPath = newPath + link;
    // const currentURL = window.location.href.split('/');
    // const fetched = currentURL[2] + '/';
    // logger(currentURL, 'PEPEPEPEPEP');
    let location = window.navigator.clipboard.writeText(window.location.href);
    toast.success('URL copied to clipboard');
  };
  const getUser = async (userId: string) => {
    let newUser = null;
    if(!userId) return;
    newUser = await auth.actor.get_user_details([userId]);
    logger(newUser, '34a344');
    if (newUser.ok) {
      if (newUser.ok[1].profileImg.length != 0) {
        let userImg = getImage(newUser.ok[1].profileImg[0]);
        setuserImage(userImg);
      }
    }
  };
  useEffect(() => {
    if (identity) {
      getUser(identity?._principal?.toString());
      if (identity._principal) {
        if (
          article[1]?.likedUsers?.some(
            (u: any) => u?.toString() === identity?._principal.toString()
          )
        ) {
          setIsLiked(true);
        }
      }
    }
  }, [auth, identity]);

  let openArticleLink = (articleLink: any) => {
    router.push(articleLink);
  };
  useEffect(() => {
    setLikeCount(Number(article[1].likes));
    logger(
      {
        liked: article[1].userId,
        article: article[1].likedUsers[0]?.toString(),
      },
      'article245'
    );
  }, [article]);
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <Col
        xl={small ? '9' : '12'}
        lg='12'
        md='12'
        className={small ? 'my-5' : ''}
      >
        <div className='social-space-post'>
          {article[1]?.comment && (
            <div className='header-pnl'>
              {/* <div className='img-pnl'></div> */}
              {article[1].comment.image ? (
                <Image
                  alt='commenter'
                  src={article[1].comment.image}
                  width={60}
                  height={60}
                  className='user-pf-img'
                />
              ) : (
                <Image
                  alt='commenter'
                  src={icongirl}
                  width={60}
                  height={60}
                  className='user-pf-img'
                />
              )}
              <div className='txt-pnl'>
                <p>
                  <b>{article[1].comment.author}</b>{' '}
                  {t('commented on this article')}
                </p>
                <ul>
                  <li>
                    <Link
                      style={{ pointerEvents: 'none' }}
                      href='https://nftstudio24.com/news/'
                    >
                      <i className='fa fa-ellipsis-h'></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ pointerEvents: 'none' }}
                      href='https://nftstudio24.com/news/'
                    >
                      <i className='fa fa-close'></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className='top-text-pnl'>
            <div className='flex-div'>
              <div className='user-panel'>
                <Image
                  src={
                    article[1].user?.profileImg?.length != 0
                      ? article[1].user?.profileImg
                      : girl
                  }
                  alt='User'
                  width={60}
                  className='user-pf-img'
                  height={60}
                />

                <div className='txty-pnl'>
                  <h6>{t('by')}</h6>
                  <h4
                    onClick={() =>
                      openArticleLink(`/profile?userId=${article[1].userId}`)
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    {article[1].user?.name ?? 'User name  '}
                  </h4>
                  <p className='m-0'>
                    {article[1]?.user?.designation?.length !== 0
                      ? article[1]?.user?.designation
                      : ''}
                  </p>
                </div>
              </div>
              <div className='user-panel'>
                <div>
                  {/* <Image src={iconbnb} alt='BNB' /> */}
                  <Image
                    src={
                      article[1]?.isCompanySelected && article[1]?.directory
                        ? article[1]?.directory[0]?.companyLogo
                        : article[1].categoryLogo
                    }
                    alt='BNB'
                    style={{ borderRadius: '100%' }}
                    width={50}
                    height={50}
                  />
                </div>
                <Link
                  href='#'
                  className='txty-pnl'
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      article[1]?.isCompanySelected &&
                      article[1]?.directory
                    ) {
                      openArticleLink(
                        `/directory?directoryId=${article.length != 0 ? article[1]?.companyId : '#'
                        }`
                      );
                    } else {
                      openArticleLink(
                        `/category-details?category=${article.length != 0 ? article[1]?.category[0] : '#'
                        }`
                      );
                    }
                  }}
                >
                  <h6>0n</h6>
                  <h4 className='mb-0' style={{ lineHeight: 1 }}>
                    {article[1]?.isCompanySelected
                      ? article[1]?.directory
                        ? article[1]?.directory[0].company.length > 15
                          ? `${article[1]?.directory[0].company.slice(
                            0,
                            15
                          )}...`
                          : article[1]?.directory[0].company
                        : article[1].categoryName
                      : article[1].categoryName}
                    {/* {article[1]?.category ? article[1].category[0] : 'category'} */}
                  </h4>
                  <p>
                    {' '}
                    {article[1]?.isCompanySelected && article[1]?.directory
                      ? article[1]?.directory[0].shortDescription.length > 10
                        ? `${article[1]?.directory[0].shortDescription.slice(
                          0,
                          10
                        )}...`
                        : article[1]?.directory[0].shortDescription
                      : ''}
                  </p>
                </Link>
              </div>
            </div>
            <p
              onClick={() =>
                openArticleLink(
                  article[1].isPodcast
                    ? article[1].isStatic
                      ? `${Podcast_STATIC_PATH + article[0]}`
                      : `/podcast?podcastId=${article[0] ?? 'noarticlefound'}`
                    : article[1].isStatic
                      ? `${ARTICLE_STATIC_PATH + article[0]}`
                      : `/article?articleId=${article[0] ?? 'noarticlefound'}`
                )
              }
              style={{
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
              }}
            >
              {article[1]?.title ? article[1].title : 'Article Title '}
            </p>
          </div>
          <div
            className='post-image-pnl'
            style={{
              position: 'relative',
              width: '100%',
              // height: 470,
              aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
            }}
          >
            {article[1]?.isPromoted && (
              <div className='promotedlable'>
                <PromotedSVG />
                {/* <Image
                      src={promotedIcon2}
                      alt='promoted icon'
                      height={25}
                      width={25}
                      className='me-2 '
                    />{' '} */}
                <p className='mb-0' style={{ fontWeight: '600' }}>
                {t("Promoted Article")}
                </p>
              </div>
            )}
            {/* <Image src={post1} alt='Post' /> */}
            {article[1]?.image && (
              <Link
                href={
                  article[1].isPodcast
                    ? article[1].isStatic
                      ? `${Podcast_STATIC_PATH + article[0]}`
                      : `/podcast?podcastId=${article[0] ?? 'noarticlefound'}`
                    : article[1].isStatic
                      ? `${ARTICLE_STATIC_PATH + article[0]}`
                      : `/article?articleId=${article[0] ?? '#'}`
                }
                target='_self'
              >
                {/* <Image src={article[1]?.image} fill={true} alt='articleimage' /> */}
                <Tippy
                  content={
                    <p className='mb-0 ' style={{ overflow: 'hidden' }}>
                      {article[1]?.caption}
                    </p>
                  }
                >
                  <Image
                    src={article[1]?.image[0]}
                    fill={true}
                    alt={article[1]?.caption}
                  />
                </Tippy>
              </Link>
            )}
          </div>
          <div className='grey-text-pln '>
            <div>
              <h4>
                {' '}
                {article[1]?.seoExcerpt
                  ? article[1]?.seoExcerpt?.length > 69
                    ? article[1]?.seoExcerpt.slice(0, 69)
                    : article[1]?.seoExcerpt
                  : ''}
              </h4>
              <h6>{article[1]?.userName}</h6>
            </div>
            <Link
              href={
                article[1].isPodcast
                  ? article[1].isStatic
                    ? `${Podcast_STATIC_PATH + article[0]}`
                    : `/podcast?podcastId=${article[0]}`
                  : article[1].isStatic
                    ? `${ARTICLE_STATIC_PATH + article[0]}`
                    : `/article?articleId=${article[0]}`
              }
              className='learn-more-btn'
            >
              {' '}
              {t('Learn More')}
            </Link>
          </div>
          <div className='txt-pnl'>
            <ul className='post-comment-list'>
              <li>
                <Image src={iconcoin} alt='Icon Comment' /> +500 NS24
              </li>
              <li>
                <a
                  href={
                    article[1].isPodcast
                      ? article[1].isStatic
                        ? `${Podcast_STATIC_PATH + article[0]}`
                        : `/podcast?podcastId=${article[0]}`
                      : article[1].isStatic
                        ? `${ARTICLE_STATIC_PATH + article[0]}`
                        : `/article?articleId=${article[0]}`
                  }
                  className='mr-3'
                >
                  <Image
                    src={`${isliked ? '/images/liked.svg' : '/images/like.svg'
                      }`}
                    width={25}
                    height={25}
                    alt='Icon Thumb'
                  />{' '}
                  {formatLikesCount(likeCount) ?? 0}
                </a>
              </li>
              <li>
                <a
                  href={
                    article[1].isPodcast
                      ? article[1].isStatic
                        ? `${Podcast_STATIC_PATH + article[0]}?route=comments`
                        : `/podcast?podcastId=${article[0]}&route=comments`
                      : article[1].isStatic
                        ? `${ARTICLE_STATIC_PATH + article[0]}?route=comments`
                        : `/article?articleId=${article[0]}&route=comments`
                  }
                >
                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                  {commentsLength ?? 0} &nbsp;
                  {t('Comments')}
                </a>
              </li>
            </ul>
            <ul className='post-comment-info-list'>
              {/* <li>
              <div className='d-flex'>
                <ul className='vote-comment-list'>
                  <li>
                    <div>
                      <Image src={iconrise} alt='Rise' /> Vote
                    </div>
                    <div>{Number(article[1].likes) ?? 0}</div>
                  </li>
                </ul>
              </div>
            </li> */}
              <li>
                <div
                  className='d-flex align-items-center gap-1'
                  style={{ cursor: 'pointer' }}
                  onClick={likeEntry}
                >
                  <div className='viewbox'>
                    <i className='fa fa-eye fill blue-icon fa-lg me-1'></i>
                    <b>{t('Views')}</b> <span className='mx-1'>|</span>
                    <b>{formatLikesCount(parseInt(article[1]?.views)) ?? 0}</b>
                  </div>
                </div>
              </li>

              <li>
                <div
                  className='d-flex align-items-center gap-1'
                  style={{ cursor: 'pointer' }}
                  onClick={likeEntry}
                >
                  <Image
                    src={`${isliked ? '/images/liked.svg' : '/images/like.svg'
                      }`}
                    width={25}
                    height={25}
                    alt='Icon Thumb'
                  />
                  <a
                    href='#'
                    onClick={(e: any) => e.preventDefault()}
                    className='mr-3'
                  >
                    {' '}
                    {formatLikesCount(likeCount) ?? 0} {t('Like')}
                  </a>
                </div>
              </li>
              <li>
                <a href='#' onClick={fouceOnInputField}>
                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                  {commentsLength ?? 0}
                  {t('Comments')}
                </a>
              </li>
              {/* <li>
              <a
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
              >
                <Image src={iconretweet} alt='Icon Comment' /> Repost
              </a>
            </li> */}
              <li>
                <a
                  href='#'
                  onClick={(e) =>
                    copyToClipboard(
                      e,
                      article[1].isPodcast
                        ? `podcast?podcastId=${article[0]}`
                        : `article?articleId=${article[0]}`
                    )
                  }
                >
                  <Image src={iconshare} alt='Icon Comment' /> {t('Share')}
                </a>
              </li>
            </ul>
            <div className='grey-text-pln round'>
              <Image className='mx-2' src={iconnotice} alt='Icon Notice' />{' '}
              <p>
                {t('Boost your expertise, contribute now!')}{' '}
                <Image className='pic' src={iconcrown} alt='Icon Crown' />{' '}
                {/* <span>Earn the Web3 Expert Badge</span> for your insights in
                this field. – your path to distinction is just a click away!{' '} */}
                {t(
                  'Icon Crown Earn the Web3 Expert Badge for your insights in this field. – your path to distinction is just a click away!'
                )}
                <Link
                  href='#'
                  style={{
                    pointerEvents: 'none',
                  }}
                  className='story-btn v2'
                >
                  {t('coming soon')}
                </Link>
              </p>
            </div>
          </div>
          <div
            className='footer-pnl'
          // onClick={() =>
          //   openArticleLink(`/article?articleId=${article[0]}&route=comments`)
          // }
          >
            <div
              className=''
              style={{
                aspectRatio: profileAspect,
                position: 'relative',
                width: '55px',
              }}
            >
              <Image
                src={userImage != '' ? userImage : girl}
                alt='notice'
                fill
                className='rounded-circle'
              />
            </div>
            <div className='txt-pnl'>
              <input
                type='text'
                placeholder={t('share your opinion')}
                value={commentVal}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendcomment(e);
                  }
                }}
                onChange={(e) => setCommentVal(e.target.value)}
              />
              {commentVal.length > 0 ? (
                <ul>
                  <li>
                    {isCommenting ? (
                      <Spinner animation='border' size='sm' />
                    ) : (
                      <Link href='#' onClick={sendcomment}>
                        <i className='fa fa-send'></i>
                      </Link>
                    )}
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link
                      href='#'
                      style={{ pointerEvents: 'none' }}
                      className='disabled'
                    >
                      <i className='fa fa-send'></i>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </Col>
      <ConnectModal
        handleClose={handleConnectModalClose}
        showModal={showConnectModal}
      />
    </>
  );
}
export default function Authenticated() {
  const router = useRouter();
  const [Entries, setEntries] = useState<any>([]);
  const [latestEntry, setLatestEntry] = useState<any>([]);
  const [lastIndex, setLastIndex] = useState(3);
  const [paginatedEntries, setPaginatedEntries] = useState<any[]>([]);

  const [entriesAmount, setEntriesAmount] = useState(0);
  const [isArticleLoading, setIsArticleLoading] = useState<any>(true);
  const [HideTrendinpost, setHideTrendinpost] = useState<any>(true);

  const { auth, setAuth, identity, principal } = useConnectPlugWalletStore(
    (state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      identity: state.identity,
      principal: state.principal,
    })
  );
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  let cRoute = searchParams.get('route');
  const path = usePathname();
  let updateImg = async (img: any, name?: string) => {
    if (img) {
      let tempImg = await getImage(img);
      return tempImg;
    }
  };
  let openArticleLink = (articleLink: any) => {
    router.push(articleLink);
  };

  let refineEntries = async (entriesList: any) => {
    const userAcotr = makeUserActor({
      agentOptions: {
        identity,
      },
    });

    const commentsActor = makeCommentActor({
      agentOptions: {
        identity,
      },
    });
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });

    for (let entry = 0; entry < entriesList.length; entry++) {
      let newUser = null;
      let TempDirectory = null;
      var authorId = entriesList[entry][1].user.toString();
      newUser = await userAcotr.get_user_details([authorId]);
      const comments = await commentsActor.getComments(entriesList[entry][0]);
      let resp = await entryActor.get_category(
        entriesList[entry][1].category[0]
      );
      let category: any = fromNullable(resp);
      let categoryName = 'No Category';
      let categoryLogo: any = iconbnb;
      if (category) {
        logger({ category }, 'categorytt');

        categoryName = category.name;
        if (category?.logo) {
          categoryLogo = getImage(category.logo);
        }
      }
      logger({ resp, categoryName }, 'categoooo');
      if (entriesList[entry][1].isCompanySelected) {
        let directoryGet = await entryActor.getWeb3(
          entriesList[entry][1].companyId
        );
        if (directoryGet.length != 0) {
          directoryGet[0].companyBanner = await updateImg(
            directoryGet[0].companyBanner
          );
          directoryGet[0].founderImage = await updateImg(
            directoryGet[0].founderImage
          );
          directoryGet[0].companyLogo = await updateImg(
            directoryGet[0].companyLogo
          );
          TempDirectory = directoryGet;
        }

        logger(TempDirectory, 'TempDirectoryhfdgh');
      }
      // logger(entriesList[entry][1], 'TempDirectory');
      entriesList[entry][1].comment = false;
      entriesList[entry][1].categoryName = categoryName;
      entriesList[entry][1].categoryLogo = categoryLogo;

      if (comments.ok) {
        // setArticleComments(comments.ok[0]);
        logger(comments.ok[0], 'Nameofcomments44');

        let tempComments = comments.ok[0];

        let tempComment = tempComments[tempComments.length - 1];
        let commenterId = tempComment.user;
        let authorDetails = await userAcotr.get_user_name(commenterId);
        if (authorDetails[0]?.image.length > 0) {
          tempComment.image = await updateImg(authorDetails[0].image[0]);
        } else {
          tempComment.image = false;
        }
        logger(comments.ok[0], 'Name of comments');
        tempComment.author = authorDetails[0].name;
        tempComment.comments = tempComments.length;
        entriesList[entry][1].comment = tempComment;
        // logger({ Comment: comments.ok[0], identity }, 'THEM DOMMENTS');
      }
      if (newUser.ok) {
        if (newUser.ok[1].profileImg.length != 0) {
          newUser.ok[1].profileImg = await updateImg(
            newUser.ok[1].profileImg[0]
          );
        }
        entriesList[entry][1].userId = authorId;

        entriesList[entry][1].user = newUser.ok[1];
      }
      if (entriesList[entry][1].isPodcast) {
        if (entriesList[entry][1].podcastVideoLink != '') {
          entriesList[entry][1].image[0] = iframeimgThumbnail(
            entriesList[entry][1].podcastVideoLink
          );
        } else {
          entriesList[entry][1].image[0] = await updateImg(
            entriesList[entry][1].podcastImg[0]
          );
        }
      } else {
        entriesList[entry][1].image[0] = await updateImg(
          entriesList[entry][1].image[0]
        );
      }

      entriesList[entry][1].directory = TempDirectory;
    }
    logger({ entriesList }, 'list of enttttt');
    return entriesList;
  };

  const getEntries = async (category?: string | null) => {
    try {
      const entryActor = makeEntryActor({
        agentOptions: {
          identity,
        },
      });

      const resp = await entryActor.getPaginatedEntries(0, 6);
      logger(resp, 'REsp of paginations');
      let tempEntries = resp.entries;
      if (tempEntries.length > 5) {
        const filteredEntries = tempEntries;
        let refined = await refineEntries(filteredEntries);
        setLatestEntry(refined);
        // let [bcaa, ...restEntries] = refined;
        // setEntries(restEntries);
        setIsArticleLoading(false);
      } else if (tempEntries.length != 0) {
        let refined = await refineEntries(tempEntries);
        // let [bcaa, ...restEntries] = refined;
        // setEntries(restEntries);
        logger(refined, 'refined');
        setLatestEntry(refined);
        setIsArticleLoading(false);
        // setIsArticleLoading(false)
        // setLatestEntry(refined[0]);
      } else {
        setIsArticleLoading(false);
      }
      // setEntryId(templatestEntry[0]);
      // logger('pop');
    } catch (err) {
      setIsArticleLoading(false);
      // logger('pop');
    }
  };
  const getNewEntries = async () => {
    logger('new entries were called');
    try {
      const entryActor = makeEntryActor({
        agentOptions: {
          identity,
        },
      });
      let startIndex = paginatedEntries.length + 3;
      // if (entriesAmount > 5) {
      //   startIndex = lastIndex > entriesAmount ? entriesAmount - 1 : lastIndex;
      // }

      logger(startIndex, 'getting for diddd');
      const resp = await entryActor.getPaginatedEntries(startIndex, 3);
      logger(resp, 'Paginatein RESP of paginations');
      let tempEntries = resp.entries;
      setEntriesAmount(parseInt(resp.amount));
      if (tempEntries) {
        const filteredEntries = tempEntries;
        let refined = await refineEntries(filteredEntries);

        setLastIndex((prev) => prev + 3);
        // setLatestEntry();
        logger(refined, 'refined2');
        setPaginatedEntries((prev: any) => [...prev, ...refined]);
        // let [bcaa, ...restEntries] = refined;
        // setEntries(restEntries);
        setIsArticleLoading(false);
      } else {
        setIsArticleLoading(false);
      }
      // setEntryId(templatestEntry[0]);
      // logger('pop');
    } catch (err) {
      setIsArticleLoading(false);
      // logger('pop');
    }
  };
  let copyToClipboard = (e: any, link: string) => {
    e.preventDefault();
    let newPath = path.split('/');
    // newPath = newPath + link;
    // const currentURL = window.location.href.split('/');
    // const fetched = currentURL[2] + '/';
    // logger(currentURL, 'PEPEPEPEPEP');
    let location = window.navigator.clipboard.writeText(window.location.href);
    toast.success('URL copied to clipboard');
  };
  useEffect(() => {
    getNewEntries();
    getEntries();
  }, []);
  useEffect(() => {
    if (cRoute && auth.state === 'initialized') {
      const targetElement = document.getElementById(cRoute);

      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 3000);
      }
    }
  }, [cRoute, auth]);
  // router.push('/route')
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <main id='main' className='new-home logged-main'>
        <div className='main-inner home'>
          <Head>
            <title>Hi</title>
          </Head>
          <div className='section scroll-anime anime-down' id='news'>
            <Row>
              <Col xxl='12' xl='12' lg='12' md='12' sm='12'>
                <div className='feed-page-main'>
                  <div className='left-side'>
                    <Row>
                      <Col
                        xxl='12'
                        xl='12'
                        lg='12'
                        md='12'
                        className='heding icp-leadership-pnl'
                        id='event'
                      >
                        <TopEvents />
                      </Col>
                      <Col
                        xxl='12'
                        xl='12'
                        lg='6'
                        md='6'
                        sm='6'
                        className='ld-cntnr'
                      >
                        <div className='flex-div align-items-center heding'>
                          <h4>
                            <Image src={iconfeed} alt='icon feed' />{' '}
                            {t('Add Your Feed')}
                          </h4>
                          <div className='d-flex align-items-center'>
                            <h4>
                              <Image
                                style={{ maxWidth: '20px' }}
                                src={iconinfo}
                                alt='icon info'
                              />
                            </h4>
                          </div>
                        </div>
                        <div className='spacer-20'></div>

                        <CompanyListSidebar />
                      </Col>
                      <Col
                        xxl='12'
                        xl='12'
                        lg='6'
                        md='6'
                        sm='6'
                        className='ld-cntnr heding'
                      >
                        <h4>
                          <Image src={iconranking} alt='icon ranking' />{' '}
                          {t('Leaderboard')}
                        </h4>
                        <LeadershipboardNew />
                        {/* <LeadershipPost more={false} /> */}
                      </Col>
                      <Col xl='12' lg='12' className='heding'>
                        <div className='spacer-20'></div>
                        <Dropdown
                          onClick={() => setHideTrendinpost((pre: any) => !pre)}
                        >
                          <Dropdown.Toggle
                            variant='success'
                            className='fill'
                            id='dropdown-basic'
                          >
                            {t('Trending')}{' '}
                            {HideTrendinpost ? (
                              <i className='fa fa-angle-down'></i>
                            ) : (
                              <i className='fa fa-angle-right'></i>
                            )}
                          </Dropdown.Toggle>

                          {/* <Dropdown.Menu>
                        <Dropdown.Item href='#/action-1'>
                          Trending
                        </Dropdown.Item>
                        <Dropdown.Item href='#/action-2'>
                          Trending
                        </Dropdown.Item>
                      </Dropdown.Menu> */}
                        </Dropdown>
                        <div className='spacer-20'></div>
                      </Col>

                      <span
                        className={
                          HideTrendinpost ? 'content show' : 'content hide'
                        }
                      >
                        <TrendingArticleSide isArticle={true} />
                      </span>
                    </Row>
                  </div>
                  <div className='right-side'>
                    <div className='log-home '>
                      <div className='anime-right dashleft-pnl'>
                        <Row>
                          {isArticleLoading ? (
                            <div className='d-flex justify-content-center'>
                              <Spinner />
                            </div>
                          ) : (
                            latestEntry.length > 0 && (
                              <HomeArticle article={latestEntry[0]} />
                            )
                          )}
                          <div className='spacer-40'></div>
                          <Col
                            xl='12'
                            lg='12'
                            md='12'
                            className='heding'
                            id='blockchain'
                          >
                            <h4>
                              <Image src={iconrss} alt='RSS' />{' '}
                              {t('Blockchain News')}
                            </h4>
                            <div className='spacer-20'></div>
                            {/* <GeneralSlider /> */}
                            <NewsSlider />
                          </Col>
                          {isArticleLoading ? (
                            <div
                              style={{
                                width: '100%',
                                height: 1100,
                              }}
                            ></div>
                          ) : (
                            latestEntry.length > 1 && (
                              <HomeArticle article={latestEntry[1]} />
                            )
                          )}

                          <div className='spacer-40'></div>
                          <Col xl='12' lg='12' md='12'>
                            <div className='anime-right'>
                              <Row>
                                <Col
                                  xl='12'
                                  lg='12'
                                  md='12'
                                  className='heding'
                                  id='pressRelease'
                                >
                                  <h4>
                                    <Image src={press} alt='Hot' />
                                    {t('Press Release')}
                                  </h4>
                                  <div className='spacer-20'></div>
                                </Col>
                                <ReleaseSlider />
                              </Row>
                            </div>
                          </Col>
                          <div className='spacer-30'></div>
                          {isArticleLoading ? (
                            <div
                              style={{
                                width: '100%',
                                height: 1100,
                              }}
                            ></div>
                          ) : (
                            latestEntry.length > 2 && (
                              <HomeArticle article={latestEntry[2]} />
                            )
                          )}

                          <div className='spacer-40'></div>
                          <Col xl='12' lg='12' md='12'>
                            <div className='anime-left'>
                              <Row>
                                <Col
                                  xl='12'
                                  lg='12'
                                  md='12'
                                  className='heding'
                                  id='campaign'
                                >
                                  <h4>
                                    <Image src={stars} alt='Hot' />
                                    {t('Featured Campaigns')}{' '}
                                  </h4>
                                  <div className='spacer-20'></div>
                                </Col>
                                <FeaturedSlider />
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xxl='3' xl='4' lg='12' md='12' sm='12'></Col>
              <Col xxl='9' xl='8' lg='12' md='12' className='log-home '>
                <div className='anime-right dashleft-pnl'>
                  <Row>
                    <InfiniteScroll
                      dataLength={paginatedEntries.length} //This is important field to render the next data
                      next={getNewEntries}
                      scrollThreshold={'10px'}
                      hasMore={true}
                      style={{ overflow: 'unset' }}
                      loader={
                        <div className='d-flex justify-content-center mt-4'>
                          <Spinner />
                        </div>
                      }
                    // endMessage={<p>DUDE WHAT U WATCHING ?? ITS GONE</p>}
                    // below props only if you need pull down functionality
                    >
                      <div
                        className='mycls-w'
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                        }}
                      //  className='d-flex flex-row flex-wrap gap-5'
                      >
                        {paginatedEntries.map(
                          (mappedEntry: any, index: number) =>
                            isArticleLoading ? (
                              <div className='d-flex justify-content-center'>
                                <Spinner />
                              </div>
                            ) : (
                              paginatedEntries.length > 0 && (
                                <>
                                  <HomeArticle
                                    article={mappedEntry}
                                    small={true}
                                    key={index}
                                  />
                                  {index % 4 === 0 && (
                                    <>
                                      <Col
                                        xl='12'
                                        lg='12'
                                        md='12'
                                        className='heding w-100'
                                        id='blockchain'
                                      >
                                        <h4>
                                          <Image src={iconrss} alt='RSS' />{' '}
                                          {t('Blockchain News')}
                                        </h4>
                                        <div className='spacer-20'></div>
                                        {/* <GeneralSlider /> */}
                                        <NewsSlider
                                          catagory={mappedEntry[1]?.category[0]}
                                          key={index}
                                        />
                                      </Col>
                                    </>
                                  )}
                                  {index % 4 === 1 && (
                                    <>
                                      <Col
                                        xl='12'
                                        lg='12'
                                        md='12'
                                        className='w-100'
                                      >
                                        <div className='anime-right'>
                                          <Row>
                                            <Col
                                              xl='12'
                                              lg='12'
                                              md='12'
                                              className='heding'
                                              id='pressRelease'
                                            >
                                              <h4>
                                                <Image src={press} alt='Hot' />{' '}
                                                Press Release
                                              </h4>
                                              <div className='spacer-20'></div>
                                            </Col>
                                            <ReleaseSlider
                                              catagory={
                                                mappedEntry[1]?.category[0]
                                              }
                                              key={index}
                                            />
                                          </Row>
                                        </div>
                                      </Col>
                                    </>
                                  )}
                                  {index % 4 === 2 && (
                                    <>
                                      <Col
                                        xl='12'
                                        lg='12'
                                        md='12'
                                        className='w-100'
                                      >
                                        <div className='anime-left'>
                                          <Row>
                                            <Col
                                              xl='12'
                                              lg='12'
                                              md='12'
                                              className='heding'
                                              id='campaign'
                                            >
                                              <h4>
                                                <Image src={stars} alt='Hot' />
                                                {t('podcast')}{' '}
                                              </h4>
                                              <div className='spacer-20'></div>
                                            </Col>
                                            <PodcastHomeSlider
                                              catagory={
                                                mappedEntry[1]?.category[0]
                                              }
                                              key={index}
                                            />
                                          </Row>
                                        </div>
                                      </Col>
                                    </>
                                  )}
                                  {index % 4 === 3 && (
                                    <>
                                      <Col
                                        xl='12'
                                        lg='12'
                                        md='12'
                                        className='w-100'
                                      >
                                        <div className='anime-right'>
                                          <Row>
                                            <Col
                                              xl='12'
                                              lg='12'
                                              md='12'
                                              className='heding'
                                              id='pressRelease'
                                            >
                                              <h4>
                                                <Image src={press} alt='Hot' />{' '}
                                                Web3
                                              </h4>
                                              <div className='spacer-20'></div>
                                            </Col>

                                            <Web3HomeSlider
                                              category={
                                                mappedEntry[1]?.category[0]
                                              }
                                              key={index}
                                            />
                                          </Row>
                                        </div>
                                      </Col>
                                    </>
                                  )}
                                </>
                              )
                            )
                        )}
                      </div>
                    </InfiniteScroll>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Partners Site Panel */}
      </main>
    </>
  );
}
