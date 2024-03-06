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

export default function EthicsPolicy() {
  const { t, changeLocale } = useLocalization(LANG);
  const [hideMyContent, setHideMyContent] = useState(true);
  const [activeSection, setActiveSection] = useState('top'); // Default to the first section

  useEffect(() => {
    let currentSection = 'top'; // Default to the first section

    const handleScroll = () => {
      const sections = [
        'top',
        'top1',
        'top2',
        'top3',
        'top4',
        'top5',
        'top6',
        'top7',
        'top8',
        'top9',
        'top10',
      ]; // Update with your section IDs

      // Determine the currently active section based on scroll position
      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const sectionTop = sectionElement.getBoundingClientRect().top;
          if (sectionTop <= 10 && sectionTop >= -5) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                        <Dropdown
                          onClick={() => setHideMyContent((pre: any) => !pre)}
                        >
                          <Dropdown.Toggle
                            variant='success'
                            className='fill'
                            id='dropdown-basic'
                          >
                            {t('All Content')}{' '}
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
                        <div className='spacer-20'></div>
                        <ul
                          className='tab-blue-list'
                          style={{
                            height: '470px',
                            position: 'sticky',
                            top: '0',
                            display: hideMyContent ? 'block' : 'none',
                          }}
                        >
                          <li>
                            <Link
                              href='#top'
                              className={
                                activeSection === 'top' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Ethics
                              Policy
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top1'
                              className={
                                activeSection === 'top1' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Disclosure
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top2'
                              className={
                                activeSection === 'top2' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Journalistic
                              standards
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top3'
                              className={
                                activeSection === 'top3' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Personal
                              investing
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top4'
                              className={
                                activeSection === 'top4' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Company
                              stocks
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top5'
                              className={
                                activeSection === 'top5' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Social media
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top6'
                              className={
                                activeSection === 'top6' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Use of AI
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top7'
                              className={
                                activeSection === 'top7' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Advertising
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top8'
                              className={
                                activeSection === 'top8' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Events and
                              partnerships
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top9'
                              className={
                                activeSection === 'top9' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i>{' '}
                              Giveaways/contests
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='#top10'
                              className={
                                activeSection === 'top10' ? 'active' : ''
                              }
                            >
                              <i className='fa fa-angle-right'></i> Appendix A
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className='right-detail-pnl'>
                        <div id='top' className='spacer-50'></div>
                        <h1>{t('Ethics Policy')}</h1>
                        <div className='spacer-30'></div>

                        <p>
                          {' '}
                          <b>
                            NFTStudio24 is a leading decentralized media
                            publication covering the digital transformation of
                            money in the 21st century. Our mission is to inform,
                            educate, and connect the global community of
                            investors, innovators, and users of
                            cryptocurrencies, blockchains, and other
                            decentralized technologies. Founded in 2022, we
                            serve an audience of 0.5 million monthly website
                            visitors, 3,000+ partners, 200,000 newsletter
                            subscribers, and thousands of readers of our
                            research reports.
                          </b>
                        </p>
                        <p>
                          {' '}
                          Editorial independence: NFTStudio24 is a wholly-owned
                          subsidiary of Daiki Co ltd, one of the largest private
                          investors in the industry. We operate independently of
                          the parent company, with no involvement in editorial
                          or content decisions. Our journalists cover Daiki Co
                          ltd and its portfolio companies objectively, just like
                          any other subjects.
                        </p>
                        <p>
                          {' '}
                          NFTStudio24 and Daiki Co ltd have strict independence
                          policies. Daiki Co ltd employees cannot pressure
                          NFTStudio24 journalists for coverage, and NFTStudio24
                          employees are encouraged to report any such attempts.
                        </p>
                        <p>
                          {' '}
                          Our office is located in the same building as Daiki Co
                          ltd subsidiary, but on a separate floor, ensuring
                          independence.
                        </p>
                        <div id='top1'></div>
                        <h2> Disclosure:</h2>
                        <p>
                          {' '}
                          We disclose our corporate ownership in all articles,
                          and certain NFTStudio24 employees may receive Daiki Co
                          ltd equity as part of their compensation, which they
                          must hold for a minimum of 30 days.
                        </p>
                        <div id='top2'></div>
                        <h2>Journalistic standards:</h2>
                        <p>
                          {' '}
                          We uphold high standards of accuracy, fairness,
                          objectivity, and responsible reporting. Factual errors
                          are corrected promptly, and all corrections are
                          disclosed.
                        </p>
                        <div id='top3'></div>
                        <h2>Personal investing:</h2>
                        <p>
                          {' '}
                          We have guidelines to ensure transparency and prevent
                          misuse of information obtained during work. Employees
                          must notify compliance officers of cryptocurrency
                          trades, with a 30-day holding period.
                        </p>
                        <div id='top4'></div>
                        <h2>Company stocks:</h2>
                        <p>
                          {' '}
                          We have more restrictive guidelines for owning stocks,
                          with journalists barred from owning shares in
                          pure-play crypto firms or diversified companies
                          involved in crypto.
                        </p>
                        <div id='top5'></div>
                        <h2>Social media:</h2>

                        <p>
                          {' '}
                          We use social media professionally, and employees
                          interacting with users are expected to conduct
                          themselves professionally.
                        </p>
                        <div id='top6'></div>
                        <h2>Use of AI:</h2>

                        <p>
                          {' '}
                          We may use AI tools for content generation, with clear
                          disclosures and bylines when AI is involved.
                        </p>
                        <div id='top7'></div>
                        <h2>Advertising:</h2>
                        <p>
                          {' '}
                          We refuse ads directly promoting tokens, fundraising
                          events, or tokens under SEC scrutiny. We disclose
                          affiliate links, but they do not influence editorial
                          decisions.
                        </p>
                        <div id='top8'></div>
                        <h2>Events and partnerships:</h2>
                        <p>
                          {' '}
                          Sponsored content is clearly labeled, and sponsor
                          relationships do not impact content. Sponsored
                          sessions at events are separate from editorial
                          content.
                        </p>
                        <div id='top9'></div>
                        <h2>Giveaways/contests:</h2>

                        <p>
                          {' '}
                          Employees may not accept tokens or products from
                          giveaways that could affect their coverage.
                        </p>
                        <div id='top10'></div>
                        <h2>Appendix A:</h2>
                        <p>
                          {' '}
                          Policy on content independence: This section outlines
                          our commitment to editorial independence from{' '}
                          <b>Daiki Co. Ltd</b>., detailing processes to ensure
                          unbiased reporting, address conflicts of interest, and
                          protect against undue influence.”
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
