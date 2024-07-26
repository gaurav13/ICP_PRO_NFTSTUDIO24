import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col } from 'react-bootstrap';
import podcast from '@/assets/Img/Icons/icon-podcast-3.png';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import podcastuser from '@/assets/Img/Profile/Podcast.png';
import SignInButton from '@/components/SignInButton';
export default function PodcastPost() {
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      {/* <div className='Podcast-pnl scroll-anime'>
        <Row>
          <Col xl="12" lg="12" md="12"/>
          <div className='podcast-post'>
            <div className='text-pnl'>
              <h2>
                Podcasting
                <span>Simplified</span>
              </h2>
              <h5>
                Welcome to <b>NFTStudio24</b> Podcast! Explore the Web3 and blockchain world through success and failure stories from
                industry pioneers. Get inspired and informed in just minutes.
              </h5>
              <Link href="#" className='reg-btn big'>Subscribe now!</Link>
              <Link href="#" className='reg-btn big'><Image src={podcast} alt='podcast' /> Podcast</Link>
            </div>
            <div className='img-pnl'>
              <Image src={podcastuser} alt='podcast' />
            </div>
          </div>
        </Row>
      </div>
      <div className='full-div podcast-list'>
        <ul>
          <li>
            <Link href="#">
              <i className='fa fa-podcast'/>
              <p>iTunes</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className='fa fa-soundcloud'/>
              <p>Soundcloud</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className='fa fa-spotify'/>
              <p>Spotify</p>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className='fa fa-google-plus-circle'/>
              <p>Google</p>
            </Link>
          </li>
        </ul>
      </div> */}
      <div className='Podcast-pnl scroll-anime'>
        <Row>
          {/* <Col xl='12' lg='12' md='12'/> */}
          <div className='podcast-post'>
            <div className='text-pnl'>
              <h2>
                {/* Podcasting */}
                {t('Podcasting')}
                <span>{t('SIMPLIFIED')}</span>
              </h2>
              <h5>
                {/* Welcome to <b>NFTStudio24</b> Podcast! Explore the Web3 and
                blockchain world through success and failure stories from
                industry pioneers. Get inspired and informed in just minutes. */}

                {t(
                  'Welcome to NFTStudio24 Podcast! Explore the Web3 and blockchain world through success and failure stories from industry pioneers. Get inspired and informed in just minutes.'
                )}
              </h5>
              {/* <Link
                href='/'

                className='reg-btn big'
              > */}

              {/* </Link> */}

              <SignInButton isPodcastLink={true} />

              <Link href='/podcasts' className='reg-btn big'>
                <Image src={podcast} alt='podcast' /> {t('podcast')}
              </Link>
              <div className='full-div podcast-list'>
                <ul>
                  <li>
                    <i className='fa fa-podcast' />
                    <p>iTunes</p>
                  </li>
                  <li>
                    <i className='fa fa-soundcloud' />
                    <p>Soundcloud</p>
                  </li>
                  <li>
                    <i className='fa fa-spotify' />
                    <p>Spotify</p>
                  </li>
                  <li>
                    <i className='fa fa-google-plus-circle' />
                    <p>Google</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className='img-pnl'>
              <Image src={podcastuser} alt='podcast' />
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}
