import React from 'react';
import 'slick-carousel/slick/slick.css';
import post1 from '@/assets/Img/Posts/stories-1.png';
import post2 from '@/assets/Img/Posts/stories-2.png';
import post3 from '@/assets/Img/Posts/stories-3.png';
import post4 from '@/assets/Img/Posts/stories-4.png';
import logo from '@/assets/Img/Logo/Footer-logo.png';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import useLocalization from "@/lib/UseLocalization"
import { LANG } from '@/constant/language';

export default function WebstoriesSlider() {
  const { t, changeLocale } = useLocalization(LANG);

  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 992 },
  //     items: 2
  //   },
  //   tablet: {
  //     breakpoint: { max: 991, min: 767 },
  //     items: 2
  //   },
  //   mobile: {
  //     breakpoint: { max: 767, min: 0 },
  //     items: 1
  //   }
  // };
  var Webstories = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
    ],
  };
  return (
    <Slider {...Webstories} lazyLoad='anticipated'>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post1} alt='Post' />
              <h2>{t('Why is everyone obsessed with...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post2} alt='Post' />
              <h2>{t('What is Blockchain Security: Everything...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post3} alt='Post' />
              <h2>{t('TON Blockchain:')} {t('The Complete Guide 2023...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post4} alt='Post' />
              <h2>{t('How to transfer Crypto from Freewell to...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post1} alt='Post' />
              <h2>{t('Why is everyone obsessed with...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post2} alt='Post' />
              <h2>{t('What is Blockchain Security: Everything...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post3} alt='Post' />
              <h2>{t('TON Blockchain:')} {t('The Complete Guide 2023...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className='Stories-post'>
          <div className='Stories-post-inner'>
            <div className='top-span'>
              <span className='span-logo'>
                <Image className='post-logo' src={logo} alt='Logo' />
              </span>
              <Link
                href='#'
                style={{
                  pointerEvents: 'none',
                }}
                className='story-btn'
              >
                {t('coming soon')}
              </Link>
            </div>
            <Link
              href='/'
              style={{
                pointerEvents: 'none',
              }}
              className='img-pnl'
            >
              <Image src={post4} alt='Post' />
              <h2>{t('How to transfer Crypto from Freewell to...')}</h2>
              <ul>
                <li>{t('Buy NFT Studio 24')}</li>
                <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
    </Slider>
  );
}
