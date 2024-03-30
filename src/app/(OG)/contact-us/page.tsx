'use client';
import React, { useEffect, useRef, useState } from 'react';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import {
  Row,
  Col,
  Breadcrumb,
  Dropdown,
  Spinner,
  Form,
  Button,
} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';
import map from '@/assets/Img/Icons/icon-map.png';
import icondelivery from '@/assets/Img/Icons/icon-delivery.png';
import iconmail from '@/assets/Img/Icons/icon-attach.png';
import iconcall from '@/assets/Img/Icons/icon-call.png';

export default function ContactUs() {
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <main id='main'>
        <div className='main-inner detail-inner-Pages pri-term-pnl'>
          <div className='inner-content'>
            <div className='pri-term-inner'>
              <Row>
                <Col xl='12' lg='12'>
                  <div className='event-innr'>
                    <div className='flex-details-pnl'>
                      <div className='left-side-pnl'>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant='success'
                            className='fill'
                            id='dropdown-basic'
                          >
                            {t('All Content')}
                            <i className='fa fa-angle-down'></i>
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
                        <ul className='tab-blue-list'>
                          <li>
                            <Link className='active' href='#'>
                              <i className='fa fa-angle-right'></i>{' '}
                              {t('Contact Us')}
                            </Link>
                          </li>
                          {/* <li>
                        <Link href='#companySecrch'>
                          <i className='fa fa-angle-right'></i> Search for
                          Company
                        </Link>
                      </li> */}
                        </ul>
                      </div>

                      <div className='right-detail-pnl'>
                        <div className='spacer-20'></div>
                        <h2>
                          {' '}
                          {t('Call Us, Write Us,')}
                          <br></br>
                          {t('Or Knock On Our Door')}
                        </h2>
                        <div className='spacer-10'></div>
                        <div className='banner-text-pnl'>
                          <div className='bg-layer contact'></div>
                          <h3>
                            {/* Let's Meet You And Learn<br></br> All About Your
                            Business */}
                            {t(
                              'Let us Meet You And Learn All About Your Business'
                            )}
                          </h3>
                          <p>
                            {t(
                              'Are you seeking limitless Opportunities, a Dynamic, Vibrant, and Flexible Work Environment?'
                            )}
                          </p>
                          <p>
                            {t(
                              'Your comments and requests, together with other information we ask for in our web form, will be used for the purpose of improving NFTStudio24 – JAPAN broadcasts and website, and may be introduced on our website, in our publications, or in our programs.'
                            )}
                          </p>
                        </div>
                        <div className='banner-text-pnl trans'>
                          <ul className='contact-info-list'>
                            <li>
                              <div className='img-pnl'>
                                <Image src={icondelivery} alt='Map' />
                              </div>
                              <div className='txt-pnl'>
                                <h5>{t('Editorial Team- 24/7 Service')}</h5>
                                <div className='spacer-20'></div>
                                <p>{t('Monday - Thursday: 9AM - 7PM')}</p>
                                <p>{t('Friday: 9AM - 5PM')}</p>
                                <p>{t('Sunday: Closed')}</p>
                              </div>
                            </li>
                          </ul>
                          <ul className='contact-info-list'>
                            <li>
                              <Link
                                target='_blank'
                                href='https://www.google.com/maps/place/344-0063,+Japan/@35.9718336,139.7635914,16z/data=!3m1!4b1!4m6!3m5!1s0x6018beaea9619b53:0x169cec0083bd0749!8m2!3d35.9741584!4d139.7703197!16s%2Fg%2F1vhkkkj_?entry=ttu'
                              >
                                <div className='img-pnl'>
                                  <Image src={map} alt='Map' />
                                </div>
                                <div className='txt-pnl'>
                                  <h5>{t('We are On The Map​')}​</h5>
                                  <p>
                                    〒103-0022 Tokyo, Chuo City,
                                    Nihonbashimuromachi, 1 Chome−2−6
                                    日本橋大栄ビル 7階
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link href='callto:048-708-8997'>
                                <div className='img-pnl'>
                                  <Image src={iconcall} alt='call' />
                                </div>
                                <div className='txt-pnl'>
                                  <h5>{t('Give Us A Call')}</h5>
                                  <p>048-708-8997</p>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link href='mailto:support@nftstudio24.com'>
                                <div className='img-pnl'>
                                  <Image src={iconmail} alt='Mail' />
                                </div>
                                <div className='txt-pnl'>
                                  <h5>{t('Send Us A Message​')}​</h5>
                                  <p>support@nftstudio24.com</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className='spacer-20'></div>
                        <h2>{t('Contact Us')}</h2>
                        <p className='red-text m-0'>
                          {t('Fields marked with an * are required')}
                        </p>
                        <div className='spacer-10'></div>
                        <Form>
                          <Form.Group
                            className='mb-3'
                            controlId='exampleForm.ControlInput1'
                          >
                            <Form.Control
                              type='text'
                              placeholder={t('Name*')}
                            />
                          </Form.Group>
                          <Form.Group
                            className='mb-3'
                            controlId='exampleForm.ControlInput1'
                          >
                            <Form.Control
                              type='email'
                              placeholder={t('Email*')}
                            />
                          </Form.Group>
                          <Form.Group
                            className='mb-4'
                            controlId='exampleForm.ControlTextarea1'
                          >
                            <Form.Control
                              as='textarea'
                              placeholder={t('Message*')}
                              rows={1}
                            />
                          </Form.Group>

                          <Form.Group controlId='exampleForm.ControlTextarea1'>
                            <Button type='submit' className='submit-btn'>
                              {t('sbmit')}
                            </Button>
                          </Form.Group>
                        </Form>
                        <div className='spacer-50'></div>
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
