'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Spinner, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import smallpost1 from '@/assets/Img/Posts/small-post-16.jpg';
import smallpost2 from '@/assets/Img/Posts/small-post-17.jpg';
import smallpost3 from '@/assets/Img/Posts/small-post-18.jpg';
import smallpost4 from '@/assets/Img/Posts/small-post-19.jpg';
import smallpost5 from '@/assets/Img/Posts/small-post-20.jpg';
import iconevents from '@/assets/Img/Icons/icon-event.png';
import iconhorn from '@/assets/Img/Icons/icon-horn.png';
import iconthumb from '@/assets/Img/Icons/icon-thumb.png';
import iconmessage from '@/assets/Img/Icons/icon-comment.png';
import ReleasePost from '@/components/ReleasePost/ReleasePost';
import TakeQuiz from '@/components/TakeQuiz/TakeQuiz';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import { useConnectPlugWalletStore } from '@/store/useStore';
import {
  makeCommentActor,
  makeEntryActor,
  makeUserActor,
} from '@/dfx/service/actor-locator';
import { fromNullable } from '@dfinity/utils';
import logger from '@/lib/logger';
import { getImage } from '@/components/utils/getImage';
import HTMLReactParser from 'html-react-parser';
import { ARTICLE_FEATURED_IMAGE_ASPECT } from '@/constant/sizes';
import { canisterId as userCanisterId } from '@/dfx/declarations/user';
import { canisterId as commentCanisterId } from '@/dfx/declarations/comment';
import TopEvents from '@/components/TopEvents';
import TrendingArticleSide from '@/components/TrendingArticleSide/TrendingArticleSide';
import {
  formatLikesCount,
  isUserConnected,
} from '@/components/utils/utcToLocal';
import { toast } from 'react-toastify';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import ConnectModal from '@/components/Modal';
import Tippy from '@tippyjs/react';
import { ARTICLE_STATIC_PATH } from '@/constant/routes';

const MAX_ENTRIES = 12;

function EntryItem({ entry, entryActor }: { entry: any; entryActor: any }) {
  const [likeCount, setLikeCount] = useState<number>(entry.likes);
  const [isliked, setIsLiked] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const { identity, auth } = useConnectPlugWalletStore((state) => ({
    identity: state.identity,
    auth: state.auth,
  }));
  const handleConnectModal = () => {
    // e.preventDefault();
    setShowConnectModal(true);
    // setConnectLink(e);
  };
  const handleConnectModalClose = () => {
    setShowConnectModal(false);
  };

  const likeEntry = async () => {
    if (!isUserConnected(auth, handleConnectModal)) return;
    if (!isliked) {
      setLikeCount((pre: number) => pre + 1);
      setIsLiked(true);
    } else {
      setLikeCount((pre: number) => pre - 1);
      setIsLiked(false);
    }

    return new Promise(async (resolve, reject) => {
      // if (!entry || !article[1].userId)
      //   reject('NO Entry or user ID provided');

      entryActor
        .likeEntry(entry.id, userCanisterId, commentCanisterId)
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
  const { t, changeLocale } = useLocalization(LANG);
  useEffect(() => {
    if (identity) {
      let liked = entry.likedUsers.some(
        (u: any) => u.toString() == identity.getPrincipal()
      );
      setIsLiked(liked);
    }
  }, [identity]);

  return (
    <>
      <Col xl='6' lg='6' md='6' sm='6'>
        <div className='general-post auto'>
          <Link
            className='img-pnl'
            style={{
              width: '100%',
              aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
              position: 'relative',
            }}
            href={
              entry.isStatic
                ? `${ARTICLE_STATIC_PATH + entry.id}`
                : `/article?articleId=${entry.id}`
            }
          >
            <Image fill src={entry?.image} alt='Post' />
          </Link>
          <div className='txt-pnl'>
            <Link
              href={
                entry.isStatic
                  ? `${ARTICLE_STATIC_PATH + entry.id}`
                  : `/article?articleId=${entry.id}`
              }
            >
              <h6>{entry?.title}</h6>
            </Link>
            <p
              style={{ maxHeight: '45px', overflow: 'hidden' }}
              className='customstyle'
            >
              {/* {HTMLReactParser(entry?.description)} */}
              {entry?.seoExcerpt}
            </p>
            <ul className='thumb-list'>
              <li
                style={{
                  cursor: 'pointer',
                }}
                onClick={likeEntry}
              >
                <a
                  style={{
                    pointerEvents: 'none',
                  }}
                  href='#'
                >
                  <Image
                    src={`${
                      isliked ? '/images/liked.svg' : '/images/like.svg'
                    }`}
                    width={25}
                    height={25}
                    alt='Icon Thumb'
                  />{' '}
                  {formatLikesCount(likeCount) ?? 0}
                </a>
              </li>
              <li>
                <Link
                  href={
                    entry.isStatic
                      ? `${ARTICLE_STATIC_PATH + entry.id}?route=comments`
                      : `/article?articleId=${entry.id}&route=comments`
                  }
                >
                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                  {entry?.comments} {t('Comments')}
                </Link>
              </li>
              <li>
                <Link
                  href={
                    entry.isStatic
                      ? `${ARTICLE_STATIC_PATH + entry.id}?route=comments`
                      : `/article?articleId=${entry.id}&route=comments`
                  }
                  className='ms-1'
                >
                  <div className='viewbox'>
                    <i className='fa fa-eye fill blue-icon fa-lg me-1'></i>
                    {t('Views')} <span className='mx-1'>|</span>
                    {entry?.views ? formatLikesCount(entry?.views) : 0}
                  </div>
                </Link>
              </li>
            </ul>
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
export default function CategoryDetails() {
  const [category, setCategory] = useState<any | undefined>();
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState<undefined | any[]>();
  const [entriesSize, setEntriesSize] = useState(0);
  const [HideTrendinpost, setHideTrendinpost] = useState<any>(true);
  const [isLoading, setIsLoading] = useState(true);

  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  const categoryId = searchParams.get('category');
  const { auth, identity } = useConnectPlugWalletStore((state) => ({
    auth: state.auth,
    identity: state.identity,
  }));

  const router = useRouter();
  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });

  const userActor = makeUserActor({
    agentOptions: {
      identity,
    },
  });
  const commentsActor = makeCommentActor({
    agentOptions: {
      identity,
    },
  });
  async function getCategory(newCategoryId?: string, oldCategory?: any) {
    let id = newCategoryId ? newCategoryId : categoryId;
    if (id == null) {
      return;
    }
    logger(id, 'sdafsafssad');

    const resp = await entryActor.get_list_category(id);
    const _category: any | undefined = fromNullable(resp);
    if (_category) {
      _category.id = id;
      if (newCategoryId) {
        oldCategory.parents.unshift(_category);
      } else {
        _category.parents = [];
        oldCategory = _category;
      }
    }
    if (_category.isChild) {
      let parentId: string | undefined = fromNullable(
        _category.parentCategoryId
      );
      if (parentId) return getCategory(parentId, oldCategory);
    } else {
      return oldCategory;
    }
  }
  const getRefinedList = async (tempEntriesList: any[]) => {
    if (tempEntriesList.length === 0) {
      return [];
    }
    const refinedPromise = await Promise.all(
      tempEntriesList.map(async (entry: any) => {
        let image = null;
        if (entry[1].image) {
          image = getImage(entry[1].image[0]);
        }

        const userId = entry[1].user.toString();

        // const user = await userActor.get_user_details([userId]);
        const _comments = await commentsActor.getComments(entry[0]);
        let comments = 0;
        if (_comments.ok) {
          comments = _comments.ok[0].length;
        }
        logger(entry, 'isStatic');

        // let
        let newItem = {
          id: entry[0],
          creation_time: entry[1].creation_time,
          image: image,
          title: entry[1].title,
          description: entry[1].description,
          isDraft: entry[1].isDraft,
          isPromoted: entry[1].isPromoted,
          userName: entry[1].userName,
          userId,
          status: entry[1].status,
          pressRelease: entry[1].pressRelease,
          comments,
          likes: parseInt(entry[1].likes),
          likedUsers: entry[1].likedUsers,
          isStatic: entry[1].isStatic,
          views: entry[1].views,
          seoExcerpt: entry[1].seoExcerpt,
        };
        // if (user.ok) {
        //   newItem.userName = user.ok[1].name ?? entry[1].userName;
        // }
        return newItem;
      })
    );

    return refinedPromise;
  };
  async function getEntries(reset?: boolean, oldEntries?: any) {
    let searched = reset ? '' : search;
    const resp = await entryActor.getEntriesNew(categoryId, searched, 0, 6);
    const { entries: _entries, amount } = resp;
    logger(resp, 'entries654');

    if (oldEntries) {
      oldEntries.push(..._entries);
    } else {
      oldEntries = _entries;
    }
    return oldEntries;
    // if (oldEntries.length >= MAX_ENTRIES || oldEntries.length >= amount) {
    //   return oldEntries;
    // } else {
    //   return getEntries(false, oldEntries);
    // }
  }
  const { t, changeLocale } = useLocalization(LANG);
  const getNSetEntries = async (reset?: boolean) => {
    setIsLoading(true);
    const tempEntries = await getEntries(reset);
    const refinedEntries = await getRefinedList(tempEntries);
    setEntries(refinedEntries);
    setIsLoading(false);
  };
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getNSetEntries();
    }
  };
  useEffect(() => {
    const getnSetCategory = async () => {
      const tempCategory = await getCategory();
      setCategory(tempCategory);
      getNSetEntries();
    };
    getnSetCategory();
  }, [categoryId]);

  return (
    <>
      <main id='main'>
        <div className='main-inner event-detail-page lis'>
          <div className='inner-content'>
            <Col xl='12' lg='12' md='12'>
              <div className='event-innr'>
                <div className='flex-div-sm align-items-center'>
                  <Breadcrumb className='new-breadcrumb web'>
                    <Breadcrumb.Item>
                      <Link href='/'>
                        <i className='fa fa-home'></i>
                      </Link>
                    </Breadcrumb.Item>
                    {category?.parents &&
                      category?.parents.length > 0 &&
                      category?.parents.map((parent: any, index: number) => (
                        <Breadcrumb.Item key={index}>
                          <Link
                            href={`/category-details?category=${parent.id}`}
                          >
                            {parent.name}
                          </Link>
                        </Breadcrumb.Item>
                      ))}
                    {category && (
                      <Breadcrumb.Item>
                        <Tippy content={category.name}>
                          <Link
                            href={`/category-details?category=${category.id}`}
                          >
                            {category.name}
                          </Link>
                        </Tippy>
                      </Breadcrumb.Item>
                    )}
                  </Breadcrumb>
                  <div className='search-pnl small'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder={t('Search News')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleSearch}
                    />
                    {search.length >= 1 && (
                      <button
                        onClick={() => {
                          setSearch('');
                          getNSetEntries(true);
                        }}
                      >
                        <i className='fa fa-xmark mx-1'></i>
                      </button>
                    )}
                    <button onClick={() => getNSetEntries()}>
                      <i className='fa fa-search'></i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <div className='event-innr'>
              <Col xl='12' lg='12' md='12'>
                {category ? (
                  <>
                    <h2>{category.name}</h2>
                    {/* <h2>BLOCKCHAIN NEWS</h2> */}
                    <div className='spacer-10'></div>
                    {/*   <p>
                 The blockchain industry is the infrastructure on which every
                  decentralized application or website operates. It uses the
                  Distributed ledger technology (DLT) to record transactions and
                  share information with various networks with no central party.
                </p>
                <p>
                  The latest news on recent developments in the Blockchain
                  industry. Blockchain updates for Ethereum, Solana, Polygon,
                  Klayton, and other networks.
                </p> */}
                    <p>{category.description}</p>
                  </>
                ) : (
                  <div className='spinner-div'>
                    <Spinner />
                  </div>
                )}
                <div className='spacer-50'></div>
                <h4>
                  <Image src={iconhorn} alt='Horn' />{' '}
                  {category &&
                    `${category?.name}`}
                </h4>
                <div className='spacer-20'></div>
              </Col>
              <Col xl='12' lg='12' md='12'>
                <Row>
                  <Col xxl='8' xl='8' lg='12'>
                    <Row>
                      {isLoading ? (
                        <div className='d-flex justify-content-center w-full'>
                          <Spinner />
                        </div>
                      ) : entries && entries.length != 0 ? (
                        entries.map((entry: any) => (
                          <EntryItem entry={entry} entryActor={entryActor} />
                        ))
                      ) : (
                        <p className='d-flex justify-content-center w-full'>
                          {t('No news found')}{' '}
                          {category &&
                            `${t('ON')} ${category?.name} 
                        ${t('Category')}`}{' '}
                        </p>
                      )}
                      {/* <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost2} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Coinbase Publicly Unveils ‘Base’ Revolutionary
                                Decentralized Blockchain
                              </h6>
                            </Link>
                            <p>
                              Coinbase, the largest U.S. cryptocurrency
                              exchange, officially launches its decentralized
                              blockchain, Base…
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost3} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                2022 Consumer Electronics Show Displays
                                Metaverse And Blockchain Technology
                              </h6>
                            </Link>
                            <p>
                              2022 Consumer Electronics Show displays Metaverse
                              and Blockchain technology... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost4} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Blockchain Gaming | Platform Rebuilds Blockchain
                                Gaming with a Full-Scale Game Including Lore and
                                Backstories
                              </h6>
                            </Link>
                            <p>
                              Blockchain games are a new way for gamers to play.
                              This new technology will change the ..... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'></Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                2022 Consumer Electronics Show Displays
                                Metaverse And Blockchain Technology
                              </h6>
                            </Link>
                            <p>
                              2022 Consumer Electronics Show displays Metaverse
                              and Blockchain technology... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'></Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Blockchain Gaming | Platform Rebuilds Blockchain
                                Gaming with a Full-Scale Game Including Lore and
                                Backstories
                              </h6>
                            </Link>
                            <p>
                              Blockchain games are a new way for gamers to play.
                              This new technology will change the ..... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'></Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                2022 Consumer Electronics Show Displays
                                Metaverse And Blockchain Technology
                              </h6>
                            </Link>
                            <p>
                              2022 Consumer Electronics Show displays Metaverse
                              and Blockchain technology... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'></Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Blockchain Gaming | Platform Rebuilds Blockchain
                                Gaming with a Full-Scale Game Including Lore and
                                Backstories
                              </h6>
                            </Link>
                            <p>
                              Blockchain games are a new way for gamers to play.
                              This new technology will change the ..... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'></Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                2022 Consumer Electronics Show Displays
                                Metaverse And Blockchain Technology
                              </h6>
                            </Link>
                            <p>
                              2022 Consumer Electronics Show displays Metaverse
                              and Blockchain technology... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'></Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Blockchain Gaming | Platform Rebuilds Blockchain
                                Gaming with a Full-Scale Game Including Lore and
                                Backstories
                              </h6>
                            </Link>
                            <p>
                              Blockchain games are a new way for gamers to play.
                              This new technology will change the ..... .{' '}
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col> */}
                    </Row>
                  </Col>

                  <Col xxl='4' xl='4' lg='12'>
                    <Row>
                      <Col xxl='12' xl='12' lg='6' md='6' sm='12'>
                        <TakeQuiz />
                      </Col>
                      <Col xxl='12' xl='12' lg='12' md='12' className='heding'>
                        {/* <h4 style={{ textTransform: 'unset' }}>
                          <Image src={iconevents} alt='Hot' /> Events
                        </h4>
                        <div className='spacer-20'></div>
                        <div className='flex-div-xs'>
                          <Link
                            href='#'
                            className='upcoming-btn'
                            style={{ textTransform: 'unset' }}
                          >
                            Upcoming <i className='fa fa-angle-down'></i>
                          </Link>
                          
                          <div className='search-pnl small'>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Find Events'
                            />
                            <button>
                              <i className='fa fa-search'></i>
                            </button>
                          </div>
                        </div>
                        <div className='spacer-30'></div>
                        <ReleasePost /> */}
                        <TopEvents />
                      </Col>
                      <Col xl='12' lg='12' className='heding'>
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
                          {/* 
                      <Dropdown.Menu>
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
                      {/* <Col xxl='12' xl='12' lg='6' md='6' sm='6'>
                        <div className='general-post auto sml'>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Japan Relaxes Corporate Crypto Tax Regime in
                                2024
                              </h6>
                            </Link>
                            <p>Dec 25,2023</p>
                            <p>
                              In positive regulatory news for the local
                              cryptocurrency industry, Japan has...
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xxl='12' xl='12' lg='6' md='6' sm='6'>
                        <div className='general-post auto sml'>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Japan Relaxes Corporate Crypto Tax Regime in
                                2024
                              </h6>
                            </Link>
                            <p>Dec 25,2023</p>
                            <p>
                              In positive regulatory news for the local
                              cryptocurrency industry, Japan has...
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xxl='12' xl='12' lg='6' md='6' sm='6'>
                        <div className='general-post auto sml'>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Japan Relaxes Corporate Crypto Tax Regime in
                                2024
                              </h6>
                            </Link>
                            <p>Dec 25,2023</p>
                            <p>
                              In positive regulatory news for the local
                              cryptocurrency industry, Japan has...
                            </p>
                            <ul className='thumb-list'>
                              <li>
                                <a href='#'>
                                  <Image src={iconthumb} alt='Icon Thumb' /> 11
                                </a>
                              </li>
                              <li>
                                <a href='#'>
                                  <Image src={iconmessage} alt='Icon Comment' />{' '}
                                  12 Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col> */}

                      <span
                        className={
                          HideTrendinpost ? 'content show' : 'content hide'
                        }
                      >
                        <TrendingArticleSide isArticle={true} />
                      </span>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
