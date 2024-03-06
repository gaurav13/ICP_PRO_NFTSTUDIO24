'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import logo from '@/assets/Img/Logo/Logo-2.png';
import mobile1 from '@/assets/Img/mobile-1.png';
import mobile2 from '@/assets/Img/mobile-2.png';
import mobile3 from '@/assets/Img/mobile-3.png';
import mobile4 from '@/assets/Img/mobile-4.png';
import mobile5 from '@/assets/Img/mobile-5.png';
import Footerlogo from '@/assets/Img/Logo/footerlogo.png';
import Link from 'next/link';
import Image from 'next/image';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import { usePathname } from 'next/navigation';
import TwitterSVGIcon from '@/components/twitterIconSVG/TwitterSVGIcon';
import logger from '@/lib/logger';
import { PATHS } from '@/constant/routes';
import { profileAspect } from '@/constant/sizes';

export default function Footer() {
  const { t, changeLocale } = useLocalization(LANG);
  const path = usePathname();

  const route = path.split('/')[1];
  const [isDetailPage, setIsDetailPage] = useState(true);
  const [btnShow, setBtnShow] = useState(true);

  useEffect(() => {
    logger({ path }, 'kjfjdsahf');
    let isExcit = PATHS.some((p) => path.startsWith(p));
    if (isExcit) {
      setIsDetailPage(true);
      setBtnShow(true);
    } else {
      setIsDetailPage(false);
      setBtnShow(false);
    }
  }, [path]);

  return (
    <>
      {route !== 'super-admin' && (
        <>
          <div className='footer scroll-anime full-div'>
            <div className='footer-inner'>
              <Row>
                <Col xl='3' lg='12' md='12'>
                  <div className='mobile-scl-cntnr'>
                    <div>
                      <Link href='#;' className='footer-logo'>
                        <Image src={Footerlogo} alt='Logo' />
                      </Link>
                      <h4 className='blue-text'>
                        {t(
                          'Your go-to for Web3, Blockchain, Crypto, & Metaverse AI news and insights. Stay informed and ahead with us!'
                        )}
                      </h4>
                    </div>
                    {LANG == 'en' && (
                      <ul className='footer-social-list align-items-center mobile-view-display-flex'>
                        <li>
                          <h4>{t('Follow Us')}</h4>
                        </li>
                        <li>
                          <Link
                            target='_blank'
                            href='https://www.facebook.com/nftstudio24.eth'
                          >
                            <i className='fa fa-facebook'></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target='_blank'
                            href='https://twitter.com/nftstudio24'
                          >
                            {/* <i className='fa-brands fa-x-twitter'></i> */}
                            <TwitterSVGIcon color='white' />
                          </Link>
                        </li>
                        <li>
                          <Link
                            target='_blank'
                            href='https://www.instagram.com/nftstudio24/'
                          >
                            <i className='fa fa-instagram'></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target='_blank'
                            href='https://www.youtube.com/channel/UCO18Z_ft-kBWh4g7rXqqeLQ'
                          >
                            <i className='fa fa-youtube-play'></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target='_blank'
                            href='https://www.linkedin.com/company/nftstudio24-com?trk=public_profile_experience-item_profile-section-card_image-click&originalSubdomain=ng'
                          >
                            <i className='fa fa-linkedin'></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target='_blank'
                            href='https://t.me/NFTStudio24_official'
                          >
                            <i className='fa fa-telegram'></i>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </Col>
                <Col xl='9' lg='12' md='12'>
                  <Row>
                    <Col
                      xl={LANG == 'jp' ? '4' : '3'}
                      lg={LANG == 'jp' ? '4' : '3'}
                      md={LANG == 'jp' ? '4' : '3'}
                      sm={LANG == 'jp' ? '4' : '3'}
                      xs={LANG == 'jp' ? '4' : '6'}
                    >
                      <h6>{t('About Us')}</h6>
                      <ul>
                        <li>
                          <Link href='https://nftstudio24.com/about/'>
                            {t('About Us')}
                          </Link>
                        </li>
                        <li>
                          {/* <Link href='/hinza-asif'> */}
                          <Link href='https://nftstudio24.com/hinza-asif/'>
                            {t('About Hinza Asif')}
                          </Link>
                        </li>
                        <li>
                          {/* <Link href='/careers'> */}
                          <Link href='https://nftstudio24.com/careers/'>
                            {t('Career')}
                          </Link>
                        </li>
                        <li>
                          {/* <Link href='/contact-us'> */}
                          <Link href='https://nftstudio24.com/contact-us/'>
                            {t('Contact Us')}
                          </Link>
                        </li>
                      </ul>
                    </Col>
                    <Col
                      xl={LANG == 'jp' ? '4' : '3'}
                      lg={LANG == 'jp' ? '4' : '3'}
                      md={LANG == 'jp' ? '4' : '3'}
                      sm={LANG == 'jp' ? '4' : '3'}
                      xs={LANG == 'jp' ? '4' : '6'}
                    >
                      <h6>{t('Our Services')}</h6>
                      <ul>
                        <li>
                          <Link href='https://nftstudio24.com/advertise-with-us/'>
                            {t('Advertise with Us')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/hackathon/'>
                            {t('Hackathon')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/web3-accelerators/'>
                            {t('Web3 Accelerators')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/experts-alliance/'>
                            {t('Experts Alliance')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/about-expert-alliance/'>
                            {t('About Alliance')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/expert-alliance-benefits/'>
                            {t('Alliance Benefits')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/expert-alliance-benefits/#:~:text=DIGITAL%20ARTIST-,Membership%20Requirements,-Occupational%20Position'>
                            {t('Membership Requirements')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/apply-for-experts-alliance/'>
                            {t('Experts Alliance')}
                          </Link>
                        </li>
                      </ul>
                    </Col>
                    <Col
                      xl={LANG == 'jp' ? '4' : '3'}
                      lg={LANG == 'jp' ? '4' : '3'}
                      md={LANG == 'jp' ? '4' : '3'}
                      sm={LANG == 'jp' ? '4' : '3'}
                      xs={LANG == 'jp' ? '4' : '6'}
                    >
                      <h6>{t('Top Categories')}</h6>
                      <ul>
                        <li>
                          <Link href='https://nftstudio24.com/news/'>
                            {t('News')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/press-release/'>
                            {t('Press Release')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/nft-review/'>
                            {t('NFT Collection Review')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/game-review/'>
                            {t('Blockchain Game Review')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/guide/'>
                            {t('WEB3 Guide')}
                          </Link>
                        </li>
                        <li>
                          <Link href='https://nftstudio24.com/events/'>
                            {t('Events')}
                          </Link>
                        </li>
                      </ul>
                    </Col>
                    {LANG == 'en' && (
                      <Col xl='3' lg='3' md='3' sm='3' xs='6'>
                        <h6>{t('Our Policy')}</h6>
                        <ul>
                          <li>
                            {/* <Link href='/privacy-policy'> */}
                            <Link href='https://nftstudio24.com/privacy-policy/'>
                              {t('Privacy Policy')}
                            </Link>
                          </li>
                          <li>
                            {/* <Link href='/terms-of-use'> */}
                            <Link href='https://nftstudio24.com/terms-of-use/'>
                              {t('Terms of Use')}
                            </Link>
                          </li>
                          <li>
                            {/* <Link href='/ethics-policy'> */}
                            <Link href='https://nftstudio24.com/ethics-policy/'>
                              {t('Ethics Policy')}
                            </Link>
                          </li>
                          <li>
                            {/* <Link href='/do-not-sell'> */}
                            <Link href='https://nftstudio24.com/do-not-sell-my-personal-info/'>
                              {t('Do Not Sell My Personal Info')}
                            </Link>
                          </li>
                          <li>
                            {/* <Link href='/disclaimer'> */}
                            <Link href='https://nftstudio24.com/disclaimer/'>
                              {t('Disclaimer')}
                            </Link>
                          </li>
                          <li>
                            {/* <Link href='/contact-us'> */}
                            <Link href='https://nftstudio24.com/contact-us/'>
                              {t('Contact Us')}
                            </Link>
                          </li>
                        </ul>
                      </Col>
                    )}
                  </Row>
                </Col>
                <Col xl='12' lg='12' md='12'>
                  <div className='spacer-20'></div>
                  <div className='flex-div-sm'>
                    <p>{t('© 2023 NFTStudio24.com . All Rights Reserved.')}</p>
                    {LANG == 'en' && (
                      <div>
                        <ul className='footer-social-list align-items-center web-view-display'>
                          <li>
                            <h4>{t('Follow Us')}</h4>
                          </li>
                          <li>
                            <Link
                              target='_blank'
                              href='https://www.facebook.com/nftstudio24.eth'
                            >
                              <i className='fa fa-facebook'></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              target='_blank'
                              href='https://twitter.com/nftstudio24'
                            >
                              {/* <i className='fa-brands fa-x-twitter'></i> */}
                              <TwitterSVGIcon color='white' />
                            </Link>
                          </li>
                          <li>
                            <Link
                              target='_blank'
                              href='https://www.instagram.com/nftstudio24/'
                            >
                              <i className='fa fa-instagram'></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              target='_blank'
                              href='https://www.youtube.com/channel/UCO18Z_ft-kBWh4g7rXqqeLQ'
                            >
                              <i className='fa fa-youtube-play'></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              target='_blank'
                              href='https://www.linkedin.com/company/nftstudio24-com?trk=public_profile_experience-item_profile-section-card_image-click&originalSubdomain=ng'
                            >
                              <i className='fa fa-linkedin'></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              target='_blank'
                              href='https://t.me/NFTStudio24_official'
                            >
                              <i className='fa fa-telegram'></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xl='12' lg='12' md='12'>
                  <div className='footer-bottom'>
                    {LANG == 'en' && (
                      <p className='m-0'>
                        {t('Please note that our')}{' '}
                        {/* <Link href='/privacy-policy'> */}
                        <Link href='https://nftstudio24.com/privacy-policy/'>
                          {t('Privacy Policy')}
                        </Link>
                        , {/* <Link href='/terms-of-use'> */}
                        <Link href='https://nftstudio24.com/terms-of-use/'>
                          {t('Terms of Use')}z
                        </Link>{' '}
                        {t(', cookies, and')} {/* <Link href='/do-not-sell'> */}
                        <Link href='https://nftstudio24.com/do-not-sell-my-personal-info/'>
                          do not sell my personal information
                        </Link>
                        {t('has been updated')}.
                      </p>
                    )}
                    <div className='spacer-20'></div>
                    <p>
                      {t(
                        'The leader in news and information on cryptocurrency, digital assets and the future of money, NFTStudio24 is a decentralized media outlet that strives for the highest journalistic standards and abides by a'
                      )}{' '}
                      {/* <Link href='/ethics-policy'> */}
                      <Link href='https://nftstudio24.com/ethics-policy/'>
                        {t('strict set of editorial policies')}
                      </Link>
                      {t(
                        'NFTStudio24 is an independent operating subsidiary of Diki Co ltd Japan, which invests in cryptocurrencies and blockchain startups. As part of their compensation, certain NFTStudio24 employees, including editorial employees, may receive exposure to Daiki Co Ltd equity in the form of stock appreciation rights, which vest over a multi-year period. NFTStudio24 journalists are not allowed to purchase stock outright in Daiki Co Ltd'
                      )}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
            {btnShow && (
              <Button
                className='filter-btn'
                onClick={() => setIsDetailPage((pre) => !pre)}
              >
                <Image
                  src='/images/bars-solid.jpg'
                  alt='Mobile'
                  height={30}
                  width={40}
                  className='mybtn'
                />
              </Button>
            )}
            <div className={`footer-scroller ${isDetailPage ? 'trans' : ''}`}>
              <ul>
                <li>
                  <Image src={mobile1} alt='Mobile' />
                  <p>{t('Home')} </p>
                </li>
                <li>
                  <Image src={mobile2} alt='Mobile' />
                  <p>{t('Campaigns')}</p>
                </li>
                <li>
                  {' '}
                  <div className='img-pnl'>
                    <Image src={mobile3} alt='Mobile' />
                  </div>
                </li>
                <li>
                  <Image src={mobile4} alt='Mobile' />
                  <p>{t('earn')}</p>
                </li>
                <li>
                  <Image src={mobile5} alt='Mobile' />
                  <p>{t('join us')}</p>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
