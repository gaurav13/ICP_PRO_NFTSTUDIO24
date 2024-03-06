'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import talwaar from '@/assets/Img/Icons/talwaar.png';
import iconthumb from '@/assets/Img/Icons/icon-thumb.png';
import bard from '@/assets/Img/Icons/bard.png';
import tag from '@/assets/Img/Icons/tag.png';
import usericon from '@/assets/Img/Icons/icon-woman.png';
import bg from '@/assets/Img/Icons/bg.png';
import verifyicon from '@/assets/Img/Icons/verify-1.png';
import unverifyicon from '@/assets/Img/Icons/verify.png';
import discordicon from '@/assets/Img/Icons/discord.png';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';

import { useConnectPlugWalletStore } from '@/store/useStore';
import { makeEntryActor } from '@/dfx/service/actor-locator';
import logger from '@/lib/logger';
import { User } from '@/types/profile';
import { getImage } from '@/components/utils/getImage';
import { canisterId as userCanisterId } from '@/dfx/declarations/user';
import { canisterId as commentCanisterId } from '@/dfx/declarations/comment';
import CompanySlider from '@/components/CompanySlider/CompanySlider';
import { toast } from 'react-toastify';
import DirectorySliderv2 from '@/components/DirectorySlider/DirectorySliderv2';
import { fromNullable } from '@dfinity/utils';
import AddCompanyForm from '@/components/addCompanyForm/AddCompanyForm';
import { profileAspect } from '@/constant/sizes';
import CompanyListSidebar from '@/components/companyListSidebar/CompanyListSidebar';
import {
  formatLikesCount,
  isUserConnected,
} from '@/components/utils/utcToLocal';
import { Principal } from '@dfinity/principal';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import ConnectModal from '@/components/Modal';
import Tippy from '@tippyjs/react';
import { ConnectPlugWalletSlice } from '@/types/store';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function Article() {
  const { t, changeLocale } = useLocalization(LANG);
  const [userImg, setUserImg] = useState<string | null>();
  const [user, setUser] = useState<User | null>();
  const [featuredImage, setFeaturedImage] = useState<string | null>();
  const [entry, setEntry] = useState<any>();
  const [userId, setUserId] = useState();
  const [directory, setDirectory] = useState<any>([]);
  const [relatedDirectory, setRelatedDirectory] = useState<any>([]);
  let [isliked, setIsLiked] = useState(false);
  const [hideMyContent, setHideMyContent] = useState(true);
  let [likeCount, setLikeCount] = useState(0);
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  const articleId = searchParams.get('articleId');
  const directoryId = searchParams.get('directoryId');
  const promote = searchParams.get('promoted');
  const [showConnectModal, setShowConnectModal] = useState(false);

  const router = useRouter();
  const [showWeb3Model, setShowWeb3Model] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const { auth, setAuth, identity, userAuth } = useConnectPlugWalletStore((state) => ({
    auth: state.auth,
    setAuth: state.setAuth,
    identity: state.identity,
    userAuth: (state as ConnectPlugWalletSlice).userAuth,
  }));

  // logger();
  let copyDirectoryLink = (e: any) => {
    e.preventDefault();
    if (directoryId) {
      let directoryLink = window.location.href;
      window.navigator.clipboard.writeText(directoryLink);
      toast.success(t('Copied successfully.'));
    } else {
      toast.error('Directory Id not found.');
    }
  };
  const updateImg = async (img: any, name: string) => {
    if (img) {
      const tempImg = await getImage(img);
      if (name === 'user') setUserImg(tempImg);
      else {
        setFeaturedImage(tempImg);
      }
    } else {
      // setProfileFile(null);
      if (name === 'user') setUserImg(null);
      else {
        setFeaturedImage(null);
      }
    }
  };
  let reFetchfn = () => {
    getEntry();
  };

  const handleConnectModal = () => {
    setShowConnectModal(true);
  };
  const handleConnectModalClose = () => {
    setShowConnectModal(false);
  };
  const likeDirectory = async () => {
    if (!isUserConnected(auth, handleConnectModal)) return;
    if (!isliked) {
      setLikeCount((pre) => pre + 1);
      setIsLiked(true);
    } else {
      setLikeCount((pre) => pre - 1);
      setIsLiked(false);
    }

    return new Promise(async (resolve, reject) => {
      if (directory.length == 0 || !directory[0].user.toString())
        reject('NO directory or user ID provided');
      const entryActor = makeEntryActor({
        agentOptions: {
          identity,
        },
      });

      entryActor
        .likeWeb3(directoryId, userCanisterId, commentCanisterId)
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
  const getUser = async () => {
    let newUser = null;

    newUser = await auth.actor.get_user_details([userId]);
    if (newUser.ok) {
      setUser(newUser.ok[1]);
      updateImg(newUser.ok[1].profileImg[0], 'user');
    }
  };

  const getEntry = async () => {
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    if (articleId) {
      const tempEntry = await entryActor.getEntry(articleId);
      // const promted = await entryActor.getPromotedEntries();
      // logger(promted, 'PROMTED ENTRIES');
      logger(tempEntry, 'entries');
      if (tempEntry[0] && tempEntry[0].isDraft) {
        return router.push(`/add-article?draftId=${articleId}`);
      }
      let tempUser = tempEntry[0].user?.toString();
      setUserId(tempUser);
      updateImg(tempEntry[0].image, 'feature');

      setEntry(tempEntry[0]);
      logger(tempEntry[0], 'Entries fetched from canister');
    }
  };
  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });
  let getWeb3 = async () => {
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    if (directoryId) {
      setIsLoading(true)
      let TempDirectory: null | any = null;
      let tempWeb3;
      if (userAuth?.userPerms?.articleManagement) {
        tempWeb3 = await entryActor.getWeb3_for_admin(
          directoryId,
          userCanisterId
        );
        getdirectoryfn(tempWeb3);
      } else {
        tempWeb3 = await entryActor.getWeb3(directoryId);
        getdirectoryfn(tempWeb3);
      }

      if (tempWeb3.length != 0) {
        let resp = await entryActor.get_category(tempWeb3[0].catagory);
        let category: any = fromNullable(resp);
        let categoryName = 'No Category';
        if (category) {
          categoryName = category.name;
        }
        tempWeb3[0].catagoryId = tempWeb3[0].catagory;
        tempWeb3[0].catagory = categoryName;
        tempWeb3[0].companyBanner = await getImage(tempWeb3[0].companyBanner);
        tempWeb3[0].founderImage = await getImage(tempWeb3[0].founderImage);
        tempWeb3[0].companyLogo = await getImage(tempWeb3[0].companyLogo);

        TempDirectory = tempWeb3;
      }
      if (TempDirectory) {
        if (identity && identity._principal) {
          let liked = TempDirectory[0].likedUsers.some((u: Principal) => {
            let me = identity?._principal.toString();
            let you = u.toString();
            logger({ me, you }, 'tempWeb334');

            return you == me;
          });

          if (liked) {
            setIsLiked(true);
          }
        }
        setLikeCount(Number(TempDirectory[0].likes));
        getRelatedWeb3(TempDirectory[0].catagoryId);
        setDirectory(TempDirectory);
        setIsLoading(false)
      }
      // const promted = await entryActor.getPromotedEntries();
      // logger(promted, 'PROMTED ENTRIES');
    }
  };
  let getdirectoryfn = async (tempWeb3: any) => {
    if (!tempWeb3) return;
    let TempDirectory: null | any = null;
    if (tempWeb3.length != 0) {
      let resp = await entryActor.get_category(tempWeb3[0].catagory);
      let category: any = fromNullable(resp);
      let categoryName = 'No Category';
      if (category) {
        categoryName = category.name;
      }
      tempWeb3[0].catagoryId = tempWeb3[0].catagory;
      tempWeb3[0].catagory = categoryName;
      tempWeb3[0].companyBanner = await getImage(tempWeb3[0].companyBanner);
      tempWeb3[0].founderImage = await getImage(tempWeb3[0].founderImage);
      tempWeb3[0].companyLogo = await getImage(tempWeb3[0].companyLogo);

      TempDirectory = tempWeb3;
    }
    if (TempDirectory) {
      if (identity && identity._principal) {
        let liked = TempDirectory[0].likedUsers.some((u: Principal) => {
          let me = identity?._principal.toString();
          let you = u.toString();
          logger({ me, you }, 'tempWeb334');

          return you == me;
        });

        if (liked) {
          setIsLiked(true);
        }
      }
      setLikeCount(Number(TempDirectory[0].likes));
      getRelatedWeb3(TempDirectory[0].catagoryId);
      setDirectory(TempDirectory);
    }
  }
  let addcompanyfn = (e: any) => {
    e.preventDefault();
    // if (!identity) return toast.error('Please connect to internet identity.');
    if (!isUserConnected(auth, handleConnectModal)) return;

    setShowWeb3Model(true);
  };
  let getRelatedWeb3 = async (catagory: string) => {
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });

    let TempDirectory = null;
    let tempWeb3 = await entryActor.getWeb3ListOfAllUsers(catagory, '', 0, 8);

    if (tempWeb3?.web3List?.length != 0) {
      let web3array = tempWeb3.web3List.filter(
        (e: string) => e[0] != directoryId
      );

      for (let dirc = 0; dirc < web3array.length; dirc++) {
        web3array[dirc][1].companyBanner = await getImage(
          web3array[dirc][1].companyBanner
        );
        web3array[dirc][1].founderImage = await getImage(
          web3array[dirc][1].founderImage
        );
        web3array[dirc][1].companyLogo = await getImage(
          web3array[dirc][1].companyLogo
        );
      }
      TempDirectory = web3array;
    }
    if (TempDirectory) {
      setRelatedDirectory(TempDirectory);
    }
    // const promted = await entryActor.getPromotedEntries();
    // logger(promted, 'PROMTED ENTRIES');
    logger(tempWeb3, 'tempWeb3list');
  };

  useEffect(() => {
    if (auth.state == 'anonymous' || auth.state === 'initialized') getEntry();
  }, [articleId, auth, promote]);
  useEffect(() => {
    if (userId && auth.actor) {
      getUser();
    }
  }, [userId, auth.actor]);
  useEffect(() => {
    if (auth.state == 'anonymous' || auth.state === 'initialized') getWeb3();
  }, [directoryId, auth]);
  // router.push('/route')
  let addViewfn = async () => {
    if (directoryId) {
      const entryActor = makeEntryActor({
        agentOptions: {
          identity,
        },
      });
      let isadded = await entryActor.addWeb3View(directoryId);
    }
  };
  useEffect(() => {
    addViewfn();
  }, [directoryId]);
  return (
    <>
      <main id='main'>
        <div className='main-inner web-page directory-details'>
          <div className='inner-content'>
            <Row>
              <Col xl='12' lg='12' md='12'>
                <Breadcrumb className='new-breadcrumb web'>
                  <Breadcrumb.Item>
                    <Link href='/'>
                      <i className='fa fa-home'></i>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link href={`/web3-directory`}>{t('Web3 Directory')}</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href='#'>
                    {directory.length != 0 ? (
                      <Tippy content={directory[0]?.catagory}>
                        <Link
                          href={`/web3-directory?category=${directory[0]?.catagoryId}`}
                        >
                          {directory[0]?.catagory}
                        </Link>
                      </Tippy>
                    ) : (
                      <></>
                    )}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href='#'>
                    {directory.length != 0 ? (
                      <Link
                        href={`/category-detail?category=${directory[0]?.company}`}
                        style={{
                          pointerEvents: 'none',
                        }}
                      >
                        {directory[0]?.company}
                      </Link>
                    ) : (
                      <></>
                    )}
                  </Breadcrumb.Item>
                </Breadcrumb>
                {/* <nav aria-label="breadcrumb" class="new-breadcrumb web"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="#" role="button" tabindex="0"><a href="/">HOME </a></a></li><li class="breadcrumb-item active" aria-current="page"><a href="/category-detail?category=undefined" style="pointer-events: none;">Web3 Directory</a></li></ol></nav> */}
              </Col>
              {isLoading ? <div className='my-3 d-flex justify-content-center'><Spinner /></div> : <Col xl='12' lg='12'>
                <Row>
                  <Col xxl='6' xl='7' lg='12'>
                    <div>
                      <div className='top-us-pnl'>
                        <div className='img-pnl'>
                          <Image
                            src={
                              directory.length != 0
                                ? directory[0]?.companyLogo
                                : usericon
                            }
                            alt='founder image'
                            height={50}
                            width={50}
                          />
                        </div>
                        <div className='txt-pnl'>
                          <h5>
                            {directory.length != 0 ? directory[0].company : ''}
                          </h5>
                          <h2>
                            {directory.length != 0
                              ? directory[0].companyUrl[0].length > 30
                                ? `${directory[0].companyUrl[0].slice(
                                  0,
                                  30
                                )}...`
                                : directory[0].companyUrl[0]
                              : ''}
                          </h2>
                        </div>
                      </div>
                      <ul className='inline-list'>
                        <li>
                          <a
                            href='#'
                            className='mr-3'
                            onClick={(e) => {
                              e.preventDefault();
                              likeDirectory();
                            }}
                          >
                            <Image
                              src={`${isliked
                                ? '/images/liked.svg'
                                : '/images/like.svg'
                                }`}
                              width={30}
                              height={25}
                              alt='Icon Thumb'
                            />{' '}
                            {formatLikesCount(likeCount)}
                          </a>
                        </li>
                        <li>
                          <h6>
                            <div className='viewbox'>
                              <i className='fa fa-eye fill blue-icon fa-lg me-1'></i>
                              {t('Views')} <span className='mx-1'>|</span>
                              {directory[0]
                                ? formatLikesCount(
                                  parseInt(directory[0]?.views)
                                )
                                : 0}
                            </div>
                          </h6>
                        </li>
                        <li>
                          <a
                            className='reg-btn blue-btn small'
                            href='#'
                            onClick={copyDirectoryLink}
                          >
                            <i className='fa fa-share-alt'></i> {t('Share')}
                          </a>
                        </li>
                        {directory.length != 0 && (
                          <li>
                            <a
                              className='reg-btn yellow small d-flex justify-content-center align-items-center dark'
                              href='#'
                            >
                              {Object.keys(directory[0].status).toString() ==
                                'un_verfied' ? (
                                // <i className='fa fa-circle-xmark me-2 fs-5'></i>
                                <div
                                  style={{
                                    aspectRatio: profileAspect,
                                    position: 'relative',
                                    height: '20px',
                                  }}
                                  className='me-2'
                                >
                                  <Image
                                    src={unverifyicon}
                                    alt='founder image'
                                    fill
                                    style={{ height: '100%', width: '100%' }}
                                  />
                                </div>
                              ) : (
                                // <i className='fa fa-circle-check fs-5 me-2'></i>
                                <div
                                  style={{
                                    aspectRatio: profileAspect,
                                    position: 'relative',
                                    height: '20px',
                                  }}
                                  className='me-2'
                                >
                                  <Image
                                    src={verifyicon}
                                    alt='founder image'
                                    fill
                                    style={{ height: '100%', width: '100%' }}
                                  />{' '}
                                </div>
                              )}
                              {Object.keys(directory[0].status).toString() ==
                                'un_verfied'
                                ? t('Unverified')
                                : t('Verified')}
                            </a>
                          </li>
                        )}
                      </ul>
                      <p>
                        {directory.length != 0
                          ? directory[0].shortDescription
                          : ''}
                      </p>
                      {/* <p>
                        Blockchain.com (formerly Blockchain.info) is a
                        cryptocurrency financial services company. The company
                        began as the first Bitcoin blockchain explorer in 2011
                        and later created a cryptocurrency wallet that accounted
                        for 28% of bitcoin transactions between 2012 and 2020.
                      </p>
                      <p>
                        It also operates a cryptocurrency exchange and provides
                        institutional markets lending business and data, charts,
                        and analytics.
                      </p> */}
                      <ul className='post-social-list-2 d-flex flex-wrap'>
                        {directory.length != 0 ? (
                          directory[0].twitter[0].length != 0 ? (
                            <li>
                              <Link href={directory[0].twitter[0]}>
                                <i className='fa fa-twitter'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                        {directory.length != 0 ? (
                          directory[0].telegram[0].length != 0 ? (
                            <li>
                              <Link href={directory[0].telegram[0]}>
                                <i className='fa fa-telegram'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                        {directory.length != 0 ? (
                          directory[0].discord[0].length != 0 ? (
                            <li>
                              <Link href={directory[0].discord[0]}>
                                <div
                                  style={{
                                    aspectRatio: profileAspect,
                                    position: 'relative',
                                    width: '22px',
                                    height: '20px',
                                  }}
                                >
                                  <Image src={discordicon} fill alt='discord' />
                                </div>
                                {/* <i className="fa-brands fa-discord"></i> */}
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                        {directory.length != 0 ? (
                          directory[0].instagram[0].length != 0 ? (
                            <li>
                              <Link href={directory[0].instagram[0]}>
                                <i className='fa fa-instagram'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                        {directory.length != 0 ? (
                          directory[0].facebook[0].length != 0 ? (
                            <li>
                              <Link href={directory[0].facebook[0]}>
                                <i className='fa fa-facebook'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                        {directory.length != 0 ? (
                          directory[0].linkedin[0].length != 0 ? (
                            <li>
                              <Link href={directory[0].linkedin[0]}>
                                <i className='fa fa-linkedin'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                      </ul>
                      <ul className='post-social-list'>
                        {directory.length != 0 ? (
                          directory[0].companyUrl[0].length != 0 ? (
                            <li>
                              <Link
                                className='reg-btn small yellow dark'
                                href={directory[0].companyUrl[0]}
                              >
                                {t('Visit Website')}{' '}
                              </Link>
                            </li>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                      </ul>
                    </div>
                  </Col>
                  <Col xxl='4' xl='5' lg='6' md='8'>
                    <div className='img-box-pnl'>
                      <Image
                        src={
                          directory.length != 0
                            ? directory[0]?.companyBanner
                            : bg
                        }
                        alt='founder image'
                        height={100}
                        width={100}
                        style={{ height: '100%', width: '100%' }}
                      />
                    </div>
                    {/* <Image src={bg} alt='Infinity' /> */}
                  </Col>
                  <Col xl='12'>
                    <div className='spacer-40'></div>
                  </Col>
                </Row>
              </Col>}
              <Col xxl='12' xl='12' lg='12'>
                <div className='flex-details-pnl'>
                  <div className='left-side-pnl'>
                    <div
                      style={{
                        position: 'sticky',
                        top: '0',
                        minHeight: '256px',
                      }}
                    >
                      <ul className='faq-btn-list'>
                        <li>
                          <Link href='#' className='reg-btn faq-btn'>
                            FAQ
                          </Link>
                        </li>
                        <li>
                          <Dropdown
                            onClick={() => setHideMyContent((pre: any) => !pre)}
                          >
                            <Dropdown.Toggle
                              variant='success'
                              className='fill'
                              id='dropdown-basic'
                            >
                              All Company{' '}
                              {hideMyContent ? (
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
                        </li>
                      </ul>
                      <ul
                        className='tab-blue-list'
                        style={{ display: hideMyContent ? 'block' : 'none' }}
                      >
                        <li>
                          <Link className='active' href='#'>
                            <i className='fa fa-angle-right'></i>{' '}
                            {t('search companies')}
                          </Link>
                        </li>
                        <li>
                          <Link href='#'>
                            <i className='fa fa-angle-right'></i> Search for
                            Company
                          </Link>
                        </li>
                      </ul>
                      <Link
                        onClick={(e: any) => addcompanyfn(e)}
                        href='#'
                        style={{
                          display: hideMyContent ? 'inline-block' : 'none',
                        }}
                        className='reg-btn trans'
                      >
                        {t('Submit your Listing')}
                      </Link>
                      <AddCompanyForm
                        showWeb3Model={showWeb3Model}
                        setShowWeb3Model={setShowWeb3Model}
                        reFetchfn={reFetchfn}
                      />
                    </div>
                  </div>
                  {!isLoading && <div className='right-detail-pnl pr'>
                    <h3>
                      <Image src={bard} alt='Bard' /> {t('Company Detail')}
                    </h3>
                    <div className='spacer-20'></div>
                    <div>
                      <p>
                        {' '}
                        {directory.length != 0
                          ? directory[0].companyDetail
                          : ''}
                      </p>
                    </div>
                    <div className='full-div'>
                      <div className='shadow-txt-pnl'>
                        <p>
                          <i>
                            {directory.length != 0
                              ? directory[0].founderDetail
                              : ''}
                          </i>
                        </p>
                        <div className='d-flex'>
                          <div className='img-pnl radius'>
                            {/* <Image src={usericon} alt='Infinity' /> */}
                            <Image
                              src={
                                directory.length != 0
                                  ? directory[0]?.founderImage
                                  : usericon
                              }
                              alt='founder image'
                              height={50}
                              width={50}
                            />
                          </div>
                          <div className='txt-pnl mx-2'>
                            <h6 className='m-0'>
                              <b>
                                {directory.length != 0
                                  ? directory[0].founderName
                                  : ''}
                              </b>
                            </h6>
                            <p className='m-0'>Founder</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='slide-cntnr'>
                      <h3>
                        <Image src={talwaar} alt='Infinity' />{t('Similar Companies of')}
                         {directory.length != 0 ? directory[0]?.catagory : ''}
                      </h3>
                      <div className='slid-bg'>
                        <DirectorySliderv2
                          relatedDirectory={relatedDirectory}
                          isDirectory={true}
                        />
                      </div>
                    </div>
                  </div>}
                </div>
                <div className='spacer-40'></div>
              </Col>

              {!isLoading && <Col xxl='12' xl='12' lg='12' md='12'>
                <div className='flex-details-pnl'>
                  <div className='left-side-pnl'></div>
                  <div className='right-detail-pnl pr'>
                    <Row>
                      <Col xxl='5' xl='6' lg='12' md='12'>
                        <h3>
                          <Image src={tag} alt='Bard' /> {t('Trending')}{' '}
                          Companies
                        </h3>
                        <div className='spacer-10'></div>

                        <CompanyListSidebar />
                        <Link className='grey-link' href='#'>
                          {t('View more')} {t('Suggestion')}{' '}
                          <i className='fa fa-long-arrow-right'></i>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>}
            </Row>
          </div>
        </div>
      </main>

      <ConnectModal
        handleClose={handleConnectModalClose}
        showModal={showConnectModal}
      />
    </>
  );
}
// export const getStaticPaths = async () => {
//   // const paths = getAllArticleIds(); // Implement this function to get all article IDs
//   return {
//     paths,
//     fallback: true, // or false if you want to return a 404 page for unknown IDs
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   // const article = await getArticleById(params.articleId);
//   return {
//     props: {
//       // article,
//     },
//   };
// };
