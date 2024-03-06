import React from 'react';
import post1 from '@/assets/Img/Posts/stories-1.png';
import post2 from '@/assets/Img/Posts/stories-2.png';
import post3 from '@/assets/Img/Posts/stories-3.png';
import post4 from '@/assets/Img/Posts/stories-4.png';
import logo from '@/assets/Img/Logo/Footer-logo.png';
import Link from 'next/link';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import Image from 'next/image';
import { Col } from 'react-bootstrap';
export default function StoriesPost() {
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <Col xl='3' lg='6' md='6' sm='12'>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link href='#' className='story-btn'>
                Story
              </Link>
            </div>
            <Link href='/' className='img-pnl'>
              <Image src={post1} alt='Post' />
              <h2>{t('Why is everyone obsessed with...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>September 30</li>
              </ul>
            </Link>
          </div>
        </div>
      </Col>
      <Col xl='3' lg='6' md='6' sm='12'>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link href='#' className='story-btn'>
                Story
              </Link>
            </div>
            <Link href='/' className='img-pnl'>
              <Image src={post2} alt='Post' />
              <h2>{t('The Complete Guide 2023...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>September 30</li>
              </ul>
            </Link>
          </div>
        </div>
      </Col>
      <Col xl='3' lg='6' md='6' sm='12'>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link href='#' className='story-btn'>
                Story
              </Link>
            </div>
            <Link href='/' className='img-pnl'>
              <Image src={post3} alt='Post' />
              <h2>{t('What is Blockchain Security: Everything...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>September 30</li>
              </ul>
            </Link>
          </div>
        </div>
      </Col>
      <Col xl='3' lg='6' md='6' sm='12'>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link href='#' className='story-btn'>
                Story
              </Link>
            </div>
            <Link href='/' className='img-pnl'>
              <Image src={post4} alt='Post' />
              <h2>{t('How to transfer Crypto from Freewell to...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>September 30</li>
              </ul>
            </Link>
          </div>
        </div>
      </Col>
    </>
  );
}
