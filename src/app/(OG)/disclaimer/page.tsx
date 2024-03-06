'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';
import useLocalization from "@/lib/UseLocalization"
import { LANG } from '@/constant/language';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function Disclaimer() {
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
                              {t('Disclaimer')}
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
                        <div className='spacer-50'></div>
                        <h1>{t('Disclaimer')}</h1>
                        <div className='spacer-30'></div>

                        <p>
                          {' '}
                          The information provided on{' '}
                          <b>
                            <Link href='/'>NFTStudio24</Link>
                          </b>{' '}
                          is for general informational and educational purposes
                          only. It should not be considered as financial or
                          investment advice. Cryptocurrencies and blockchain
                          technologies are highly volatile and can be subject to
                          rapid price fluctuations.
                        </p>
                        <p>
                          {' '}
                          Investing in cryptocurrencies and blockchain projects
                          involves risk, including the risk of losing your
                          capital. Always do your own research and consider your
                          financial situation before making any investment
                          decisions.{' '}
                          <b>
                            <Link href='/'>NFTStudio24</Link>
                          </b>{' '}
                          does not guarantee the accuracy, completeness, or
                          timeliness of the information presented on this
                          website.
                        </p>
                        <p>
                          {' '}
                          The content on this website may include opinions,
                          analyses, or recommendations from various authors or
                          sources. These opinions and views are their own and do
                          not necessarily represent the views of{' '}
                          <b>
                            <Link href='/'>NFTStudio24</Link>
                          </b>{' '}
                          .
                        </p>

                        <p>
                          {' '}
                          We do not endorse or promote any specific
                          cryptocurrency, token, project, or exchange. It is
                          crucial to conduct thorough due diligence and seek
                          advice from a qualified financial advisor or
                          professional before making any investment.
                        </p>

                        <p>
                          {' '}
                          Cryptocurrency regulations and laws vary by
                          jurisdiction and are subject to change. Users are
                          responsible for understanding and complying with the
                          regulations in their respective regions.
                        </p>

                        <p>
                          {' '}
                          <b>
                            <Link href='/'>NFTStudio24</Link>
                          </b>{' '}
                          is not responsible for any losses or damages resulting
                          from the use of information on this website. We
                          recommend users exercise caution and use their
                          judgment when interacting with cryptocurrency-related
                          projects, platforms, or services.
                        </p>

                        <p>
                          {' '}
                          By using{' '}
                          <b>
                            <Link href='/'>NFTStudio24</Link>
                          </b>{' '}
                          , you agree to these terms and conditions and
                          acknowledge the inherent risks associated with
                          cryptocurrency investments and blockchain
                          technologies.
                        </p>
                        <hr></hr>
                        <p>
                          {' '}
                          Please consult with a legal or financial professional
                          for advice tailored to your specific situation.
                        </p>
                        <p>
                          Feel free to customize this disclaimer to suit the
                          specific needs and focus of your website.
                          Additionally, it’s essential to consult with a legal
                          professional to ensure that your disclaimer complies
                          with applicable laws and regulations in your
                          jurisdiction.
                        </p>
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
