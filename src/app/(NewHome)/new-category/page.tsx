'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Spinner, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
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
import TrendingArticleSide from '@/components/TrendingArticleSide/TrendingArticleSide';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
export default function NewCategory() {
  const { t, changeLocale } = useLocalization(LANG);
  const [HideTrendinpost, setHideTrendinpost] = useState<any>(true);

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
                    <Breadcrumb.Item>
                      <Link
                        href='/'
                        style={{
                          pointerEvents: 'none',
                        }}
                      >
                        News
                      </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      <Link
                        href='/'
                        style={{
                          pointerEvents: 'none',
                        }}
                      >
                        {t('Blockchain News')}
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
              </div>
            </Col>
            <div className='event-innr'>
              <Col xl='12' lg='12' md='12'>
                <h2>{t('Blockchain News')}</h2>
                <div className='spacer-10'></div>
                <p>
                  The blockchain industry is the infrastructure on which every
                  decentralized application or website operates. It uses the
                  Distributed ledger technology (DLT) to record transactions and
                  share information with various networks with no central party.
                </p>
                <p>
                  The latest news on recent developments in the Blockchain
                  industry. Blockchain updates for Ethereum, Solana, Polygon,
                  Klayton, and other networks.
                </p>
                <div className='spacer-50'></div>
                <h4>
                  <Image src={iconhorn} alt='Horn' /> LATEST BLOCKCHAIN NEWS
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
                                NPCI, Backed by Indian Central Bank, Initiates
                                Blockchain Talent Search
                              </h6>
                            </Link>
                            <p>
                              Singapore, Malaysia, the UAE, France, Benelux
                              nations, Nepal, and the U.K. Embrace… .
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
                                  12 {t('Comments')}
                                </a>
                              </li>
                            </ul>
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
                                </a>
                              </li>
                            </ul>
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                                  12 {t('Comments')}
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
                </Row>
              </Col>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
