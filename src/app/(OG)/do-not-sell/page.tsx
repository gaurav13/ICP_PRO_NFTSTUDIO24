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

export default function DoNotSellMyPersonalInfo() {
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <main id='main'>
        <div className='main-inner detail-inner-Pages pri-term-pnl not-sell-pnl'>
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
                              <i className='fa fa-angle-right'></i> Do Not Sell
                              My Personal Info
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
                        <h1>Do Not Sell My Personal Info</h1>
                        <div className='spacer-30'></div>
                        <h2>
                          Sale of Personal Information and Right to Opt Out:
                        </h2>
                        <p>
                          State law requires companies to include certain
                          disclosures including a{' '}
                          <i>“Do Not Sell My Personal Info”</i> links on their
                          websites. We do not knowingly sell the personal
                          information of consumers under 16 years of age. To opt
                          out of the sale to third parties, please sending us an
                          email at{' '}
                          <Link href='mailto:support@nftstudio24.com'>
                            <b>support@nftstudio24.com</b>
                          </Link>{' '}
                          and using the cookie manager on our Website to disable
                          non-necessary cookies. Please note that your right to
                          opt out does not apply to our sharing of data with
                          service providers, with whom we work and who are
                          required to use the data on our behalf.
                        </p>
                        <p>
                          The following categories of personal information that
                          are disclosed for a business purpose or “sold” and the
                          related categories of third parties:
                        </p>
                        <p>
                          Identifiers: Name, email, unique personal identifiers,
                          online identifiers, IP address, or other similar
                          identifiers to affiliates, business partners,
                          advertising and marketing companies, data analytics
                          providers, and social networks.
                        </p>
                        <p>
                          Internet or other electronic network activity
                          information: info regarding your interaction with an
                          internet website, application, or advertisement to
                          affiliates, business partners, advertising and
                          marketing companies, data analytics providers, and
                          social networks.
                        </p>
                        <div className='spacer-30'></div>
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
