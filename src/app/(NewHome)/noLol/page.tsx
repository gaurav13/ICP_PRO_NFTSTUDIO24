'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Dropdown } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import stars from '@/assets/Img/Icons/icon-start.png';
import press from '@/assets/Img/Icons/icon-press-release.png';
import iconevents from '@/assets/Img/Icons/icon-event.png';
import iconthumb from '@/assets/Img/Icons/icon-thumb.png';
import iconmessage from '@/assets/Img/Icons/icon-comment.png';
import iconranking from '@/assets/Img/Icons/icon-ranking.png';
import iconrss from '@/assets/Img/Icons/icon-rss.png';
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
import ReleasePost from '@/components/ReleasePost/ReleasePost';
// import PressPost from '@/components/PressPost/PressPost';
import FeaturedSlider from '@/components/FeaturedSlider/FeaturedSlider';
import ReleaseSlider from '@/components/ReleaseSlider/ReleaseSlider';
import LeadershipPost from '@/components/LeadershipPost/LeadershipPost';
import { useConnectPlugWalletStore, useThemeStore } from '@/store/useStore';
import GeneralSlider from '@/components/GeneralSlider/GeneralSlider';
import { makeUserActor } from '@/dfx/service/actor-locator';
import { getImage } from '@/components/utils/getImage';
import { E8S } from '@/constant/config';
import CompanyListSidebar from '@/components/companyListSidebar/CompanyListSidebar';
import TrendingArticleSide from '@/components/TrendingArticleSide/TrendingArticleSide';
import LeadershipboardNew from '@/components/LeadershipboardNew/LeadershipboardNew';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  const router = useRouter();
  const [animatedElements, setAnimatedElements] = useState([]);
  const [HideTrendinpost, setHideTrendinpost] = useState<any>(true);

  const { isBlack } = useThemeStore((state) => ({
    isBlack: state.isBlack,
  }));
  const { auth, setAuth, identity, principal } = useConnectPlugWalletStore(
    (state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      identity: state.identity,
      principal: state.principal,
    })
  );
  function isElementInViewport(elem: any) {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const elemTop = elem.getBoundingClientRect().top + scroll;
    return elemTop - scroll < windowHeight;
  }

  function animateSections() {
    const elementsToAnimate = document.querySelectorAll('.scroll-anime');
    const elementsInViewport: any = [];
    elementsToAnimate.forEach((elem) => {
      if (isElementInViewport(elem)) {
        elem.classList.add('anime');
        elementsInViewport.push(elem);
      }
    });
    setAnimatedElements(elementsInViewport);
  }

  useEffect(() => {
    animateSections();
    window.addEventListener('scroll', animateSections);
    return () => {
      window.removeEventListener('scroll', animateSections);
    };
  }, []);
  const { t, changeLocale } = useLocalization(LANG);
  // router.push('/route')
  return (
    <>
      <main id='main' className='new-home'>
        <div className='main-inner home'>
          <Head>
            <title>{t('Hi')}</title>
          </Head>
          <div className='section scroll-anime anime-down' id='news'>
            <Row>
              <Col xxl='3' xl='4' lg='12' md='12' sm='12'>
                <Row>
                  <Col
                    xxl='12'
                    xl='12'
                    lg='12'
                    md='12'
                    className='heding icp-leadership-pnl'
                  >
                    <h4>
                      <Image src={iconevents} alt='Hot' /> Events
                    </h4>
                    <div className='spacer-20'></div>
                    <div className='flex-div-xs align-items-center'>
                      <Link href='#' className='upcoming-btn'>
                        Upcoming <i className='fa fa-angle-down'></i>
                      </Link>
                      <div className='search-pnl'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder={t('find events')}
                        />
                        <button>
                          <i className='fa fa-search'></i>
                        </button>
                      </div>
                    </div>
                    <div className='spacer-30'></div>
                    <ReleasePost />
                  </Col>
                  <Col xxl='12' xl='12' lg='12' className='ld-cntnr'>
                    <div className='flex-div align-items-center heding'>
                      <h4>
                        <Image src={iconfeed} alt='icon feed' />{' '}
                        {t('Add Your Feed')}
                      </h4>
                      <h4>
                        <Image
                          style={{ maxWidth: '20px' }}
                          src={iconinfo}
                          alt='icon info'
                        />
                      </h4>
                    </div>
                    <div className='spacer-20'></div>

                    <CompanyListSidebar />
                  </Col>
                  <Col xxl='12' xl='12' lg='12' className='ld-cntnr heding'>
                    <h4>
                      <Image src={iconranking} alt='icon ranking' />{' '}
                      {t('Leaderboard')}
                    </h4>
                    {/* <LeadershipPost /> */}
                    <LeadershipboardNew />
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
                  {/* <Col xxl='12' xl='12' lg='6' md='6' sm='6'>
                    <div className='general-post auto'>
                      <div className='txt-pnl'>
                        <Link href='#'>
                          <h6>
                            Japan Relaxes Corporate Crypto Tax Regime in 2024
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
                              <Image src={iconmessage} alt='Icon Comment' /> 12
                              {t('Comments')}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col xxl='12' xl='12' lg='6' md='6' sm='6'>
                    <div className='general-post auto'>
                      <div className='txt-pnl'>
                        <Link href='#'>
                          <h6>
                            Japan Relaxes Corporate Crypto Tax Regime in 2024
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
                              <Image src={iconmessage} alt='Icon Comment' /> 12
                              {t('Comments')}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col xxl='12' xl='12' lg='6' md='6' sm='6'>
                    <div className='general-post auto'>
                      <div className='txt-pnl'>
                        <Link href='#'>
                          <h6>
                            Japan Relaxes Corporate Crypto Tax Regime in 2024
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
                              <Image src={iconmessage} alt='Icon Comment' /> 12
                              {t('Comments')}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col xxl='12' xl='12' lg='6' md='6' sm='6'>
                    <div className='general-post auto'>
                      <div className='txt-pnl'>
                        <Link href='#'>
                          <h6>
                            Japan Relaxes Corporate Crypto Tax Regime in 2024
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
                              <Image src={iconmessage} alt='Icon Comment' /> 12
                              {t('Comments')}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col> */}
                  <span className={HideTrendinpost ? 'content show' : 'content hide'}>
                    <TrendingArticleSide isArticle={true} />
                  </span>
                </Row>
              </Col>
              <Col xxl='9' xl='8' lg='12' md='12' className='log-home'>
                <div className='anime-right'>
                  <Row>
                    <Col xl='12' lg='12' md='12'>
                      <div className='social-space-post'>
                        <div className='header-pnl'>
                          <div className='img-pnl'></div>
                          <div className='txt-pnl'>
                            <p>
                              <b>John Mc Kewon</b>
                              {t('commented on this article')}
                            </p>
                            <ul>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-ellipsis-h'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-close'></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className='top-text-pnl'>
                          <div className='flex-div'>
                            <div className='user-panel'>
                              <div className='img-pnl'></div>
                              <div className='txty-pnl'>
                                <h6>{t('by')}</h6>
                                <h4>Hinza Asif</h4>
                                <p>CEO | NFTStudio24</p>
                              </div>
                            </div>
                            <div className='user-panel'>
                              <Link href='#' className='img-pnl'></Link>
                              <Link href='#' className='txty-pnl'>
                                <h6>{t('by')}</h6>
                                <h4>Hinza Asif</h4>
                                <p>CEO | NFTStudio24</p>
                              </Link>
                            </div>
                          </div>
                          <p>
                            Following the success of BlockDown 2023 in Portugal,
                            the Never Bored Ape Party sets off to Istanbul to
                            join HAQQ-powered Istanbul Blockchain Week for an
                            exclusive BlockDown x IBW Official Afterparty.
                          </p>
                        </div>
                        <div className='post-image-pnl'>
                          <Image src={post1} alt='Post' />
                        </div>
                        <div className='grey-text-pln '>
                          <div>
                            <h4>
                              Bitcoin Dips Below $26K, Ether Surges 11% after
                              ETF Futures Prospects
                            </h4>
                            <h6>NFTSTudio24.com</h6>
                          </div>
                          <Link href='#' className='learn-more-btn'>
                            {' '}
                            {t('Learn More')}
                          </Link>
                        </div>
                        <div className='txt-pnl'>
                          <ul className='post-comment-list'>
                            <li>
                              <Image src={iconcoin} alt='Icon Comment' /> +500
                              NS24
                            </li>
                            <li>
                              <a href='#' className='mr-3'>
                                <Image src={iconthumb} alt='Icon Thumb' /> 11
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconmessage} alt='Icon Comment' />{' '}
                                12 {t('Comments')}
                              </a>
                            </li>
                          </ul>
                          <ul className='post-comment-info-list'>
                            <li>
                              <div className='d-flex'>
                                <ul className='vote-comment-list'>
                                  <li>
                                    <div>
                                      <Image src={iconrise} alt='Rise' /> 
                                    </div>
                                    <div>{t('Vote')}</div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <a href='#' className='mr-3'>
                                <Image src={iconthumb} alt='Icon Thumb' /> {t('Like')}
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconmessage} alt='Icon Comment' />{' '}
                                {t('Comments')}
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconretweet} alt='Icon Comment' />{' '}
                                Repost
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconshare} alt='Icon Comment' />{' '}
                                {t('Share')}
                              </a>
                            </li>
                          </ul>
                          <div className='grey-text-pln round'>
                            <Image
                              className='mx-2'
                              src={iconnotice}
                              alt='Icon Notice'
                            />{' '}
                            <p>
                              {t('Boost your expertise, contribute now')}{' '}
                              <Image
                                className='pic'
                                src={iconcrown}
                                alt='Icon Crown'
                              />{' '}
                              {/* <span>Earn the Web3 Expert Badge</span> for your
                              insights in this field. – your path to distinction
                              is just a click away! */}
                              {t(
                                'Icon Crown Earn the Web3 Expert Badge for your insights in this field. – your path to distinction is just a click away!'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className='footer-pnl'>
                          <div className='img-pnl'></div>
                          <div className='txt-pnl'>
                            <input type='text' placeholder='add a comment' />
                            <ul>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-smile-o'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-image'></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <div className='spacer-40'></div>
                    <Col xl='12' lg='12' md='12' className='heding'>
                      <h4>
                        <Image src={iconrss} alt='RSS' />{t('Blockchain News')}
                      </h4>
                      <div className='spacer-20'></div>
                      <GeneralSlider />
                    </Col>
                    <Col xl='12' lg='12' md='12'>
                      <div className='social-space-post'>
                        <div className='header-pnl'>
                          <div className='img-pnl'></div>
                          <div className='txt-pnl'>
                            <p>
                              <b>John Mc Kewon</b>
                              {t('commented on this article')}
                            </p>
                            <ul>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-ellipsis-h'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-close'></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className='top-text-pnl'>
                          <div className='flex-div'>
                            <div className='user-panel'>
                              <div className='img-pnl'></div>
                              <div className='txty-pnl'>
                                <h6>{t('by')}</h6>
                                <h4>Hinza Asif</h4>
                                <p>CEO | NFTStudio24</p>
                              </div>
                            </div>
                            <div className='user-panel'>
                              <Link href='#' className='img-pnl'></Link>
                              <Link href='#' className='txty-pnl'>
                                <h6>{t('by')}</h6>
                                <h4>Hinza Asif</h4>
                                <p>CEO | NFTStudio24</p>
                              </Link>
                            </div>
                          </div>
                          <p>
                            Following the success of BlockDown 2023 in Portugal,
                            the Never Bored Ape Party sets off to Istanbul to
                            join HAQQ-powered Istanbul Blockchain Week for an
                            exclusive BlockDown x IBW Official Afterparty.
                          </p>
                        </div>
                        <div className='post-image-pnl'>
                          <Image src={post2} alt='Post' />
                        </div>
                        <div className='grey-text-pln '>
                          <div>
                            <h4>
                              Bored Ape Yacht Party set to take place at
                              Istanbul Blockchain Week
                            </h4>
                            <h6>NFTSTudio24.com</h6>
                          </div>
                          <Link href='#' className='learn-more-btn'>
                            {' '}
                            {t('Learn More')}
                          </Link>
                        </div>
                        <div className='txt-pnl'>
                          <ul className='post-comment-list'>
                            <li>
                              <Image src={iconcoin} alt='Icon Comment' /> +500
                              NS24
                            </li>
                            <li>
                              <a href='#' className='mr-3'>
                                <Image src={iconthumb} alt='Icon Thumb' /> 11
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconmessage} alt='Icon Comment' />{' '}
                                12 {t('Comments')}
                              </a>
                            </li>
                          </ul>
                          <ul className='post-comment-info-list'>
                            <li>
                              <div className='d-flex'>
                                <ul className='vote-comment-list'>
                                  <li>
                                    <div>
                                      <Image src={iconrise} alt='Rise' /> {t('Vote')}
                                    </div>
                                    <div>{t('Vote')}</div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <a href='#' className='mr-3'>
                                <Image src={iconthumb} alt='Icon Thumb' />{t('Like')}
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconmessage} alt='Icon Comment' />{' '}
                                {t('Comments')}
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconretweet} alt='Icon Comment' />{' '}
                                {t('Repost')}
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconshare} alt='Icon Comment' />{' '}
                                {t('Share')}
                              </a>
                            </li>
                          </ul>
                          <div className='grey-text-pln round'>
                            <Image
                              className='mx-2'
                              src={iconnotice}
                              alt='Icon Notice'
                            />{' '}
                            <p>
                              {t('Boost your expertise, contribute now')}{' '}
                              <Image
                                className='pic'
                                src={iconcrown}
                                alt='Icon Crown'
                              />{' '}
                              {/* <span>Earn the Web3 Expert Badge</span> for your
                              insights in this field. – your path to distinction
                              is just a click away! */}
                              {t(
                                'Icon Crown Earn the Web3 Expert Badge for your insights in this field. – your path to distinction is just a click away!'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className='footer-pnl'>
                          <div className='img-pnl'></div>
                          <div className='txt-pnl'>
                            <input type='text' placeholder='add a comment' />
                            <ul>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-smile-o'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-image'></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <div className='spacer-40'></div>
                    <Col xl='12' lg='12' md='12'>
                      <div className='anime-right'>
                        <Row>
                          <Col xl='12' lg='12' md='12' className='heding'>
                            <div className='spacer-30'></div>

                            <h4>
                              <Image src={press} alt='Hot' />  {t('Press Release')}
                            </h4>
                            <div className='spacer-20'></div>
                          </Col>
                          <ReleaseSlider />
                        </Row>
                      </div>
                    </Col>
                    <div className='spacer-30'></div>
                    <Col xl='12' lg='12' md='12'>
                      <div className='social-space-post'>
                        <div className='header-pnl'>
                          <div className='img-pnl'></div>
                          <div className='txt-pnl'>
                            <p>
                              <b>John Mc Kewon</b>
                              {t('commented on this article')}
                            </p>
                            <ul>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-ellipsis-h'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-close'></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className='top-text-pnl'>
                          <div className='flex-div'>
                            <div className='user-panel'>
                              <div className='img-pnl'></div>
                              <div className='txty-pnl'>
                                <h6>{t('by')}</h6>
                                <h4>Hinza Asif</h4>
                                <p>CEO | NFTStudio24</p>
                              </div>
                            </div>
                            <div className='user-panel'>
                              <Link href='#' className='img-pnl'></Link>
                              <Link href='#' className='txty-pnl'>
                                <h6>{t('by')}</h6>
                                <h4>Hinza Asif</h4>
                                <p>CEO | NFTStudio24</p>
                              </Link>
                            </div>
                          </div>
                          <p>
                            Following the success of BlockDown 2023 in Portugal,
                            the Never Bored Ape Party sets off to Istanbul to
                            join HAQQ-powered Istanbul Blockchain Week for an
                            exclusive BlockDown x IBW Official Afterparty.
                          </p>
                        </div>
                        <div className='post-image-pnl'>
                          <Image src={post3} alt='Post' />
                        </div>
                        <div className='grey-text-pln '>
                          <div>
                            <h4>
                              OpenSea Adopts Flexible Creator Fees, Disables
                              Royalty Enforcer Tool
                            </h4>
                            <h6>NFTSTudio24.com</h6>
                          </div>
                          <Link href='#' className='learn-more-btn'>
                            {' '}
                            {t('Learn More')}
                          </Link>
                        </div>
                        <div className='txt-pnl'>
                          <ul className='post-comment-list'>
                            <li>
                              <Image src={iconcoin} alt='Icon Comment' /> +500
                              NS24
                            </li>
                            <li>
                              <a href='#' className='mr-3'>
                                <Image src={iconthumb} alt='Icon Thumb' /> 11
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconmessage} alt='Icon Comment' />{' '}
                                12 {t('Comments')}
                              </a>
                            </li>
                          </ul>
                          <ul className='post-comment-info-list'>
                            <li>
                              <div className='d-flex'>
                                <ul className='vote-comment-list'>
                                  <li>
                                    <div>
                                      <Image src={iconrise} alt='Rise' /> {t("vote")}
                                    </div>
                                    <div>{t("vote")}</div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <a href='#' className='mr-3'>
                                <Image src={iconthumb} alt='Icon Thumb' /> {t('Like')}
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconmessage} alt='Icon Comment' />{' '}
                                {t('Comments')}
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconretweet} alt='Icon Comment' />{' '}
                                Repost
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <Image src={iconshare} alt='Icon Comment' />{' '}
                                {t('Share')}
                              </a>
                            </li>
                          </ul>
                          <div className='grey-text-pln round'>
                            <Image
                              className='mx-2'
                              src={iconnotice}
                              alt='Icon Notice'
                            />{' '}
                            <p>
                              {t('Boost your expertise, contribute now')}{' '}
                              <Image
                                className='pic'
                                src={iconcrown}
                                alt='Icon Crown'
                              />{' '}
                              {/* <span>Earn the Web3 Expert Badge</span> for your
                              insights in this field. – your path to distinction
                              is just a click away! */}
                              {t(
                                'Icon Crown Earn the Web3 Expert Badge for your insights in this field. – your path to distinction is just a click away!'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className='footer-pnl'>
                          <div className='img-pnl'></div>
                          <div className='txt-pnl'>
                            <input type='text' placeholder='add a comment' />
                            <ul>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-smile-o'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa fa-image'></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <div className='spacer-40'></div>
                    <Col xl='12' lg='12' md='12'>
                      <div className='anime-left '>
                        <Row>
                          <Col xl='12' lg='12' md='12' className='heding'>
                            <div className='spacer-30'></div>
                            <h4>
                              <Image src={stars} alt='Hot' />
                              {t('Featured Campaigns')} {' '}
                            </h4>
                            <div className='spacer-20'></div>
                          </Col>
                          <FeaturedSlider />
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Partners Site Panel */}
        <div className='spacer-40'></div>
      </main>
    </>
  );
}
