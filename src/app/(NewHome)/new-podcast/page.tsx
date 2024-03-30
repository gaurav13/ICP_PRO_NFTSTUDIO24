'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Spinner, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';
import smallpost1 from '@/assets/Img/Posts/podcast-1.jpeg';
import smallpost2 from '@/assets/Img/Posts/poadcast-1.jpg';
import smallpost3 from '@/assets/Img/Posts/podcast-3.jpg';
import smallpost4 from '@/assets/Img/Posts/podcast-4.webp';
import iconevents from '@/assets/Img/Icons/icon-event.png';
import iconhorn from '@/assets/Img/Icons/icon-horn.png';
import iconthumb from '@/assets/Img/Icons/icon-thumb.png';
import iconmessage from '@/assets/Img/Icons/icon-comment.png';
import ReleasePost from '@/components/ReleasePost/ReleasePost';
import TakeQuiz from '@/components/TakeQuiz/TakeQuiz';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import TrendingArticleSide from '@/components/TrendingArticleSide/TrendingArticleSide';

export default function NewPodcast() {
  const { t, changeLocale } = useLocalization(LANG);
  const [HideTrendinpost, setHideTrendinpost] = useState<any>(true);

  return (
    <>
      <main id='main'>
        <div className='main-inner event-detail-page lis pod'>
          <div className='inner-content'>
            <Col xl='12' lg='12' md='12'>
              <div className='flex-div-sm align-items-center'>
                <Breadcrumb className='new-breadcrumb web'>
                  <Breadcrumb.Item>
                    <Link href='/'>
                      <i className='fa fa-home'></i>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    <Link
                      href='/'
                      style={{
                        pointerEvents: 'none',
                      }}
                    >
                      {t('Expert Interviews')}
                    </Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className='search-pnl small'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search'
                  />
                  <button>
                    <i className='fa fa-search'></i>
                  </button>
                </div>
              </div>
            </Col>
            <div className='event-innr'>
              <Col xl='12' lg='12' md='12'>
                <h2>{t('Expert Interviews')}</h2>
                <div className='spacer-30'></div>
                <h4>
                  <Image src={iconhorn} alt='Horn' /> {t('Interviews')}
                </h4>
                <div className='spacer-20'></div>
              </Col>
              <Col xl='12' lg='12' md='12'>
                <Row>
                  <Col xxl='8' xl='8' lg='12'>
                    <Row>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost1} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Coin Musme’s Takuya Tsuji talks about Japanese
                                Entrepreneur Culture and Gives Tips on
                                Fundraising for Web3 Games
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              NFTStudio24 Podcast Series presents an exclusive
                              interview with Takuya Tsuji, CEO of…
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost2} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Exploring Web3 Investments: An Exclusive
                                Interview with Yat Siu on Animoca Brands,
                                Mocaverse, and Digital Property Rights
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              Welcome to an exclusive interview that delves deep
                              into the world of…
                            </p>
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
                                The Power of UniSat Wallet: Exclusive Interview
                                with Michael, Community Manager
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              Join us for an exclusive interview as we dive deep
                              into the…
                            </p>
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
                                Exclusive Interview with ASTAR Founder Sota
                                Watanabe: Unveiling ASTAR zkEVM & Polygon Labs
                                at Token2049
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              Welcome to an exclusive interview where we have
                              the privilege of sitting…
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost2} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                The Future of Your Finances: A Captivating
                                Interview with Elliot, COO of Renegade
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              Welcome to an exclusive interview where we delve
                              into the future of…
                            </p>
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
                                Exclusive Interview with Luca Netz, CEO of Pudgy
                                Penguins at Token2049
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              We are thrilled to present you with an exclusive
                              interview featuring Luca…
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost1} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Coin Musme’s Takuya Tsuji talks about Japanese
                                Entrepreneur Culture and Gives Tips on
                                Fundraising for Web3 Games
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              NFTStudio24 Podcast Series presents an exclusive
                              interview with Takuya Tsuji, CEO of…
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xl='6' lg='6' md='6' sm='6'>
                        <div className='general-post auto'>
                          <Link className='img-pnl' href='#'>
                            <Image src={smallpost2} alt='Post' />
                          </Link>
                          <div className='txt-pnl'>
                            <Link href='https://nftstudio24.com/news/'>
                              <h6>
                                Exploring Web3 Investments: An Exclusive
                                Interview with Yat Siu on Animoca Brands,
                                Mocaverse, and Digital Property Rights
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              Welcome to an exclusive interview that delves deep
                              into the world of…
                            </p>
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
                                The Power of UniSat Wallet: Exclusive Interview
                                with Michael, Community Manager
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              Join us for an exclusive interview as we dive deep
                              into the…
                            </p>
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
                                Exclusive Interview with ASTAR Founder Sota
                                Watanabe: Unveiling ASTAR zkEVM & Polygon Labs
                                at Token2049
                              </h6>
                            </Link>
                            <p className='mb-2'>
                              <span>NFT Studio 24</span> October 5, 2023
                            </p>
                            <p>
                              Welcome to an exclusive interview where we have
                              the privilege of sitting…
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xxl='4' xl='4' lg='12'>
                    <Row>
                      <Col xxl='12' xl='12' lg='6' md='6' sm='12'>
                        <TakeQuiz />
                      </Col>
                      <Col xxl='12' xl='12' lg='12' md='12' className='heding'>
                        <h4 style={{ textTransform: 'unset' }}>
                          <Image src={iconevents} alt='Hot' />{t('Events')}
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
                          {/* <Link href='#' className='upcoming-btn'>
                  </Link> */}
                          <div className='search-pnl small'>
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
                      <Col xl='12' lg='12' className='heding'>
                        <Dropdown
                          onClick={() => setHideTrendinpost((pre: any) => !pre)}
                        >
                          <Dropdown.Toggle
                            variant='success'
                            className='fill'
                            id='dropdown-basic'
                          >
                            Trending{' '}
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
