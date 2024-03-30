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
import icongift from '@/assets/Img/Icons/icon-giftbox.png';
import bg from '@/assets/Img/bg.jpg';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import bg1 from '@/assets/Img/banner-2.jpg';
import bgblack from '@/assets/Img/bg-black.jpg';
import iconevent from '@/assets/Img/Icons/icon-press-release.png';
import iconcalender from '@/assets/Img/Icons/icon-calender.png';
import logo from '@/assets/Img/Logo/Footer-logo.png';

export default function EventListNew() {
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <main id='main'>
        <div className='main-inner event-detail-page'>
          <div className='inner-content'>
            <div className='event-innr'>
              <Col xl='12' lg='12' md='12'>
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
                      {t('Upcoming event')}
                    </Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col xl='12' lg='12' md='12'>
                <div className='eventlist-header'>
                  <div className='img-pnl'>
                    <Image src={bg1} alt='Bg' />
                  </div>
                  <div className='txt-pnl'>
                    <h4>{t('Event Name')}</h4>
                    <div>
                      <Link href='#' className='reg-btn white mx-2'>
                        <i className='fa fa-info-circle'></i> {t('Learn More')}
                      </Link>
                      <Link href='#' className='reg-btn yellow'>
                        {t('Visit Website')}
                      </Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Image src={bg} alt='Bg' />
                    </li>
                    <li>
                      <Image src={bg} alt='Bg' />
                    </li>
                    <li>
                      <Image src={bg} alt='Bg' />
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xl='12' lg='12' md='12'>
                <div className='flex-div-xs'>
                  <div>
                    <Dropdown className='trans'>
                      <Dropdown.Toggle variant='success' id='dropdown-basic'>
                        Upcoming <i className='fa fa-angle-down'></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                        <Dropdown.Item href='#/action-2'>
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href='#/action-3'>
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div className='spacer-20'></div>
                  </div>
                  <div>
                    <div className='d-flex'>
                      <div className='search-pnl small'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder={t('Search for Events')}
                        />
                        <button>
                          <i className='fa fa-search'></i>
                        </button>
                      </div>
                      <Dropdown className='grey'>
                        <Dropdown.Toggle variant='success' id='dropdown-basic'>
                          <i className='fa fa-sliders'></i> {t('filter')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href='#/action-1'>
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href='#/action-2'>
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item href='#/action-3'>
                            Something else
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className='spacer-20'></div>
                  </div>
                </div>
                <div>
                  <Row>
                    <Col xl='2' lg='3' md='3' sm='6'>
                      <div className='flex-div align-items-center'>
                        <h6 className='m-0'>
                          <b>{t('Countries')}</b>
                        </h6>
                        <Link
                          href='#'
                          className='red-link text-decoration-no m-0'
                        >
                          {t('Clear')}
                        </Link>
                      </div>
                      <Form.Select aria-label='Default select example'>
                        <option>{t('All Countries')}</option>
                        <option value='1'>Country 1</option>
                        <option value='2'>Country 2</option>
                        <option value='3'>Country 3</option>
                      </Form.Select>
                    </Col>
                    <Col xl='2' lg='3' md='3' sm='6'>
                      <div className='flex-div align-items-center'>
                        <h6 className='m-0'>
                          <b>{t('Cities')}</b>
                        </h6>
                        <Link
                          href='#'
                          className='red-link text-decoration-no m-0'
                        >
                          {t('Clear')}
                        </Link>
                      </div>
                      <Form.Select aria-label='Default select example'>
                        <option>{t('All Cities')}</option>
                        <option value='1'>City 1</option>
                        <option value='2'>City 2</option>
                        <option value='3'>City 3</option>
                      </Form.Select>
                    </Col>
                    <Col xl='2' lg='3' md='3' sm='6'>
                      <div className='flex-div align-items-center'>
                        <h6 className='m-0'>
                          <b>{t('Months')}</b>
                        </h6>
                        <Link
                          href='#'
                          className='red-link text-decoration-no m-0'
                        >
                          {t('Clear')}
                        </Link>
                      </div>
                      <Form.Select aria-label='Default select example'>
                        <option>{t('All Months')}</option>
                        <option value='1'>Month 1</option>
                        <option value='2'>Month 2</option>
                        <option value='3'>Month 3</option>
                      </Form.Select>
                    </Col>
                    <Col xl='2' lg='3' md='3' sm='6'>
                      <div className='flex-div align-items-center'>
                        <h6 className='m-0'>
                          <b>{t('Types')}</b>
                        </h6>
                        <Link
                          href='#'
                          className='red-link text-decoration-no m-0'
                        >
                          {t('Clear')}
                        </Link>
                      </div>
                      <Form.Select aria-label='Default select example'>
                        <option>{t('All Types')}</option>
                        <option value='1'>Type 1</option>
                        <option value='2'>Type 2</option>
                        <option value='3'>Type 3</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </div>
                <div className='spacer-30'></div>
              </Col>
              <Col xl='12' lg='12'>
                <div className='event-list-main'>
                  <h4>
                    <span>
                      <Image src={iconcalender} alt='Calender' /> November 2023
                    </span>
                  </h4>
                  <div className='event-list-post'>
                    <div className='txt-pnl'>
                      <h5>November 16, 2023</h5>
                      <h6>WikiFinance EXPO Sydney 2023</h6>
                      <p>
                        The Fullerton Hotel Sydney No. 1 Martin Place, Sydney
                        NSW 2000, Australia The Fullerton Hotel Sydney, No. 1
                        Martin Place,, Sydney NSW 2000 , Australia, Australia
                      </p>
                      <p>
                        {t(
                          'Are you ready to embark on a journey of discovery and learning? Do not miss the WikiExpo SYDNEY 2023, the premier event for knowledge enthusiasts!'
                        )}
                      </p>
                      <div className='flex-div-xs align-items-center'>
                        <Link className='red-link' href='#'>
                          {t('Apply for discount ticket here!')}
                        </Link>
                        <div>
                          <Link className='reg-btn white-grey ' href='#'>
                            <Image src={icongift} alt='Calender' />{' '}
                            {t('Free Ticket')}
                          </Link>
                          <Link className='reg-btn bluebg' href='#'>
                            {t('Visit Website')}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='img-pnl'>
                      <Image src={bgblack} alt='Bg' />
                    </div>
                  </div>
                  <div className='event-list-post'>
                    <div className='txt-pnl'>
                      <h5>November 16, 2023</h5>
                      <h6>WikiFinance EXPO Sydney 2023</h6>
                      <p>
                        The Fullerton Hotel Sydney No. 1 Martin Place, Sydney
                        NSW 2000, Australia The Fullerton Hotel Sydney, No. 1
                        Martin Place,, Sydney NSW 2000 , Australia, Australia
                      </p>
                      <p>
                        {t(
                          'Are you ready to embark on a journey of discovery and learning? Do not miss the WikiExpo SYDNEY 2023, the premier event for knowledge enthusiasts!'
                        )}
                      </p>
                      <div className='flex-div-xs align-items-center'>
                        <Link className='red-link' href='#'>
                          {t('Apply for discount ticket here!')}
                        </Link>
                        <div>
                          <Link className='reg-btn white-grey ' href='#'>
                            <Image src={icongift} alt='Calender' />{' '}
                            {t('Free Ticket')}
                          </Link>
                          <Link className='reg-btn bluebg' href='#'>
                            {t('Visit Website')}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='img-pnl'>
                      <Image src={bgblack} alt='Bg' />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl='12' lg='12'>
                <div className='event-list-main'>
                  <h4>
                    <span>
                      <Image src={iconcalender} alt='Calender' /> December 2023
                    </span>
                  </h4>
                  <div className='event-list-post'>
                    <div className='txt-pnl'>
                      <h5>November 16, 2023</h5>
                      <h6>WikiFinance EXPO Sydney 2023</h6>
                      <p>
                        The Fullerton Hotel Sydney No. 1 Martin Place, Sydney
                        NSW 2000, Australia The Fullerton Hotel Sydney, No. 1
                        Martin Place,, Sydney NSW 2000 , Australia, Australia
                      </p>
                      <p>
                        {t(
                          'Are you ready to embark on a journey of discovery and learning? Do not miss the WikiExpo SYDNEY 2023, the premier event for knowledge enthusiasts!'
                        )}
                      </p>
                      <div className='flex-div-xs align-items-center'>
                        <Link className='red-link' href='#'>
                          {t('Apply for discount ticket here!')}
                        </Link>
                        <div>
                          <Link className='reg-btn white-grey ' href='#'>
                            <Image src={icongift} alt='Calender' />{' '}
                            {t('Free Ticket')}
                          </Link>
                          <Link className='reg-btn bluebg' href='#'>
                            {t('Visit Website')}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='img-pnl'>
                      <Image src={bgblack} alt='Bg' />
                    </div>
                  </div>
                  <div className='event-list-post'>
                    <div className='txt-pnl'>
                      <h5>November 16, 2023</h5>
                      <h6>WikiFinance EXPO Sydney 2023</h6>
                      <p>
                        The Fullerton Hotel Sydney No. 1 Martin Place, Sydney
                        NSW 2000, Australia The Fullerton Hotel Sydney, No. 1
                        Martin Place,, Sydney NSW 2000 , Australia, Australia
                      </p>
                      <p>
                        {t(
                          'Are you ready to embark on a journey of discovery and learning? Do not miss the WikiExpo SYDNEY 2023, the premier event for knowledge enthusiasts!'
                        )}
                      </p>
                      <div className='flex-div-xs align-items-center'>
                        <Link className='red-link' href='#'>
                          {t('Apply for discount ticket here!')}
                        </Link>
                        <div>
                          <Link className='reg-btn white-grey ' href='#'>
                            <Image src={icongift} alt='Calender' />{' '}
                            {t('Free Ticket')}
                          </Link>
                          <Link className='reg-btn bluebg' href='#'>
                            {t('Visit Website')}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='img-pnl'>
                      <Image src={bgblack} alt='Bg' />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl='12' lg='12'>
                <div className='spacer-20'></div>
                <div className='text-center'>
                  <Link href='#' className='reg-btn yellow auto'>
                    Load More
                  </Link>
                </div>
              </Col>
              <Row>
                <Col xl='12' lg='12'>
                  <div className='spacer-20'></div>
                  <h4>
                    {' '}
                    <Image src={iconevent} alt='Post' />
                    {t('Event News and Press Release')}
                  </h4>
                  <div className='spacer-20'></div>
                </Col>
                <Col xl='4' lg='6' md='6'>
                  <div className='Featured-Post max  auto'>
                    <div
                      className='Featured-Post-inner'
                      style={{ height: '340px' }}
                    >
                      <div className='img-pnl new d-flex align-items-center bg-dark'>
                        <Link href='#'>
                          <Image src={smallpost1} alt='Post' />
                          <h2>News</h2>
                        </Link>
                      </div>
                      <div className='txt-pnl'>
                        <h5 style={{ overflow: 'visible' }}>
                          Stablecoin Summit 2023: How Stablecoin Growth
                          Potential in Asia & Beyond Can Empower Emerging
                          Economies
                        </h5>
                        <p className='d-flex'>
                          <span>
                            {/* <Image src={logo} alt='logo' /> */}
                            <Link href='#' className='mylink'>
                              <Image
                                src={logo}
                                alt='logo'
                                className='myimg'
                                height={100}
                                width={100}
                              />
                            </Link>
                          </span>{' '}
                          {t('Press Release by')}{' '}
                          <b>
                            <Link href='#' className='mylink'>
                              NFTStudio24
                            </Link>
                          </b>
                        </p>
                        <div className='d-flex justify-content-center'>
                          <Link href='#' style={{ width: '270px' }}>
                            {t('Read More')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl='4' lg='6' md='6'>
                  <div className='Featured-Post max  auto'>
                    <div
                      className='Featured-Post-inner'
                      style={{ height: '340px' }}
                    >
                      <div className='img-pnl new d-flex align-items-center bg-dark'>
                        <Link href='#'>
                          <Image src={smallpost2} alt='Post' />
                          <h2>News</h2>
                        </Link>
                      </div>
                      <div className='txt-pnl'>
                        <h5 style={{ overflow: 'visible' }}>
                          TOKEN2049: Singapore Sparks Bullish Sentiment,
                          NFTStudio24 Concludes its Successful Trip
                        </h5>
                        <p className='d-flex'>
                          <span>
                            {/* <Image src={logo} alt='logo' /> */}
                            <Link href='#' className='mylink'>
                              <Image
                                src={logo}
                                alt='logo'
                                className='myimg'
                                height={100}
                                width={100}
                              />
                            </Link>
                          </span>{' '}
                          {t('Press Release by')}{' '}
                          <b>
                            <Link href='#' className='mylink'>
                              NFTStudio24
                            </Link>
                          </b>
                        </p>
                        <div className='d-flex justify-content-center'>
                          <Link href='#' style={{ width: '270px' }}>
                            {t('Read More')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl='4' lg='6' md='6'>
                  <div className='Featured-Post max  auto'>
                    <div
                      className='Featured-Post-inner'
                      style={{ height: '340px' }}
                    >
                      <div className='img-pnl new d-flex align-items-center bg-dark'>
                        <Link href='#'>
                          <Image src={smallpost3} alt='Post' />
                          <h2>News</h2>
                        </Link>
                      </div>
                      <div className='txt-pnl'>
                        <h5 style={{ overflow: 'visible' }}>
                          NFTStudio24 CEO Hinza to Grace NFTNow’s Gateway Korea
                          Event with Exclusive Interviews
                        </h5>
                        <p className='d-flex'>
                          <span>
                            {/* <Image src={logo} alt='logo' /> */}
                            <Link href='#' className='mylink'>
                              <Image
                                src={logo}
                                alt='logo'
                                className='myimg'
                                height={100}
                                width={100}
                              />
                            </Link>
                          </span>{' '}
                          {t('Press Release by')}{' '}
                          <b>
                            <Link href='#' className='mylink'>
                              NFTStudio24
                            </Link>
                          </b>
                        </p>
                        <div className='d-flex justify-content-center'>
                          <Link href='#' style={{ width: '270px' }}>
                            {t('Read More')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl='4' lg='6' md='6'>
                  <div className='Featured-Post max  auto'>
                    <div
                      className='Featured-Post-inner'
                      style={{ height: '340px' }}
                    >
                      <div className='img-pnl new d-flex align-items-center bg-dark'>
                        <Link href='#'>
                          <Image src={smallpost4} alt='Post' />
                          <h2>{t('Press Release')}</h2>
                        </Link>
                      </div>
                      <div className='txt-pnl'>
                        <h5 style={{ overflow: 'visible' }}>
                          Bored Ape Yacht Party set to take place at Istanbul
                          Blockchain Week
                        </h5>
                        <p className='d-flex'>
                          <span>
                            {/* <Image src={logo} alt='logo' /> */}
                            <Link href='#' className='mylink'>
                              <Image
                                src={logo}
                                alt='logo'
                                className='myimg'
                                height={100}
                                width={100}
                              />
                            </Link>
                          </span>{' '}
                          {t('Press Release by')}{' '}
                          <b>
                            <Link href='#' className='mylink'>
                              NFTStudio24
                            </Link>
                          </b>
                        </p>
                        <div className='d-flex justify-content-center'>
                          <Link href='#' style={{ width: '270px' }}>
                            {t('Read More')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl='4' lg='6' md='6'>
                  <div className='Featured-Post max  auto'>
                    <div
                      className='Featured-Post-inner'
                      style={{ height: '340px' }}
                    >
                      <div className='img-pnl new d-flex align-items-center bg-dark'>
                        <Link href='#'>
                          <Image src={smallpost5} alt='Post' />
                          <h2> {t('Press Release')}</h2>
                        </Link>
                      </div>
                      <div className='txt-pnl'>
                        <h5 style={{ overflow: 'visible' }}>
                          TOKEN2049: Singapore Sparks Bullish Sentiment,
                          NFTStudio24 Concludes its Successful Trip
                        </h5>
                        <p className='d-flex'>
                          <span>
                            {/* <Image src={logo} alt='logo' /> */}
                            <Link href='#' className='mylink'>
                              <Image
                                src={logo}
                                alt='logo'
                                className='myimg'
                                height={100}
                                width={100}
                              />
                            </Link>
                          </span>{' '}
                          {t('Press Release by')}{' '}
                          <b>
                            <Link href='#' className='mylink'>
                              NFTStudio24
                            </Link>
                          </b>
                        </p>
                        <div className='d-flex justify-content-center'>
                          <Link href='#' style={{ width: '270px' }}>
                            {t('Read More')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl='4' lg='6' md='6'>
                  <div className='Featured-Post max  auto'>
                    <div
                      className='Featured-Post-inner'
                      style={{ height: '340px' }}
                    >
                      <div className='img-pnl new d-flex align-items-center bg-dark'>
                        <Link href='#'>
                          <Image src={smallpost2} alt='Post' />
                          <h2> {t('Press Release by')}</h2>
                        </Link>
                      </div>
                      <div className='txt-pnl'>
                        <h5 style={{ overflow: 'visible' }}>
                          Upcoming EDGE Summit, Hong Kong, on AI & Web3 gets top
                          speakers to explore 4IR trends
                        </h5>
                        <p className='d-flex'>
                          <span>
                            {/* <Image src={logo} alt='logo' /> */}
                            <Link href='#' className='mylink'>
                              <Image
                                src={logo}
                                alt='logo'
                                className='myimg'
                                height={100}
                                width={100}
                              />
                            </Link>
                          </span>{' '}
                          {t('Press Release by')}{' '}
                          <b>
                            <Link href='#' className='mylink'>
                              NFTStudio24
                            </Link>
                          </b>
                        </p>
                        <div className='d-flex justify-content-center'>
                          <Link href='#' style={{ width: '270px' }}>
                            {t('Read More')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
