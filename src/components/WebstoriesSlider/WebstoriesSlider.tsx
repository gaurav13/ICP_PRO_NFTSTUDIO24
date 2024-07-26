import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import post1 from '@/assets/Img/Posts/stories-1.png';
import post2 from '@/assets/Img/Posts/stories-2.png';
import post3 from '@/assets/Img/Posts/stories-3.png';
import post4 from '@/assets/Img/Posts/stories-4.png';
import logo from '@/assets/Img/Logo/Footer-logo.png';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import logger from '@/lib/logger';

export default function WebstoriesSlider() {
  const { t, changeLocale } = useLocalization(LANG);
  const [shortsVidesLink, setShortsVidesLink] = useState<string[]>([]);

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
        breakpoint: 2000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
    ],
  };
  let jpShortsVidesLink = [
    'https://www.youtube.com/embed/O1KiW_sfqO8',
    'https://www.youtube.com/embed/ZFNzFaHtS2E',
    'https://www.youtube.com/embed/SN6jQH-SyMA',
    'https://www.youtube.com/embed/CzM5ZoWOkU8',
    'https://www.youtube.com/embed/3w92GIff6eM',
    'https://www.youtube.com/embed/vqTvvAXlTPM',
    'https://www.youtube.com/embed/-H-MQOr_a3o',
    'https://www.youtube.com/embed/edGuNFXdgvc',
    'https://www.youtube.com/embed/bMxXjhH0ars',
    'https://www.youtube.com/embed/naB1LzbJpBg',
    'https://www.youtube.com/embed/egLGAFdBqD0',
    'https://www.youtube.com/embed/YyuU3xheZi4',
    'https://www.youtube.com/embed/PlpHx-FGpR4',
    'https://www.youtube.com/embed/3bdwxg8KKbk',
    'https://www.youtube.com/embed/CbhfMOST3Ls',
  ];
  let ShortsVidesLink = [
    'https://www.youtube.com/embed/aF5PWYYMpjQ',
    'https://www.youtube.com/embed/gXEfU0pKnbU',
    'https://www.youtube.com/embed/vs10ddo5c_8',
    'https://www.youtube.com/embed/6MKljLRujz0',
    'https://www.youtube.com/embed/qYVP2J6sEgs',
    'https://www.youtube.com/embed/H4ygVSWlbr0',
    'https://www.youtube.com/embed/ME75JUTOQ9A',
    'https://www.youtube.com/embed/9PaLyYmWCp4',
    'https://www.youtube.com/embed/cCNM6KBltE4',
    'https://www.youtube.com/embed/YdVXtDcDgaQ',
    'https://www.youtube.com/embed/c1ViBzmP7Og',
    'https://www.youtube.com/embed/mKMCbZDMMeE',
    'https://www.youtube.com/embed/AM8uzo62rz8',
    'https://www.youtube.com/embed/lFxF-CBlOCA',
    'https://www.youtube.com/embed/I4PfkPnWb48',
  ];
  useEffect(() => {
    if (LANG == 'jp') {
      setShortsVidesLink(jpShortsVidesLink);
    } else {
      setShortsVidesLink(ShortsVidesLink);
    }
  }, [LANG]);

  return (
    <Slider {...Webstories} lazyLoad='anticipated'>
      {shortsVidesLink &&
        shortsVidesLink.length != 0 &&
        shortsVidesLink.map((e, index) => {
          return (
            <div className='Stories-post' key={index}>
              <div className='Stories-post-inner shortCls'>
                <iframe
                  width='100%'
                  height='300'
                  src={e}
                  title='YouTube Shorts Video Player'
                  allowFullScreen
                />

                {/* </Link> */}
              </div>
            </div>
          );
        })}
    </Slider>
  );
  // return (
  //   <Slider {...Webstories} lazyLoad='anticipated'>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner shortCls'>

  //           {/* <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           > */}
  //           <iframe
  //       width="165"
  //       height="300"
  //       src="https://www.youtube.com/embed/O1KiW_sfqO8"
  //       title="YouTube Shorts Video Player"
  //       allowFullScreen
  //     />

  //           {/* </Link> */}
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner'>
  //           <div className='top-span'>
  //             <span className='span-logo'>
  //               <Image className='post-logo' src={logo} alt='NFTスタジオ24' />
  //             </span>
  //             <Link
  //               href='#'
  //               style={{
  //                 pointerEvents: 'none',
  //               }}
  //               className='story-btn'
  //             >
  //               {t('coming soon')}
  //             </Link>
  //           </div>
  //           <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           >
  //             <Image src={post2} alt='Post' />
  //             <h2>{t('What is Blockchain Security: Everything...')}</h2>
  //             <ul>
  //               <li>{t('Buy NFT Studio 24')}</li>
  //               <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
  //             </ul>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner'>
  //           <div className='top-span'>
  //             <span className='span-logo'>
  //               <Image className='post-logo' src={logo} alt='NFTスタジオ24' />
  //             </span>
  //             <Link
  //               href='#'
  //               style={{
  //                 pointerEvents: 'none',
  //               }}
  //               className='story-btn'
  //             >
  //               {t('coming soon')}
  //             </Link>
  //           </div>
  //           <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           >
  //             <Image src={post3} alt='Post' />
  //             <h2>{t('TON Blockchain:')} {t('The Complete Guide 2023...')}</h2>
  //             <ul>
  //               <li>{t('Buy NFT Studio 24')}</li>
  //               <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
  //             </ul>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner'>
  //           <div className='top-span'>
  //             <span className='span-logo'>
  //               <Image className='post-logo' src={logo} alt='NFTスタジオ24' />
  //             </span>
  //             <Link
  //               href='#'
  //               style={{
  //                 pointerEvents: 'none',
  //               }}
  //               className='story-btn'
  //             >
  //               {t('coming soon')}
  //             </Link>
  //           </div>
  //           <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           >
  //             <Image src={post4} alt='Post' />
  //             <h2>{t('How to transfer Crypto from Freewell to...')}</h2>
  //             <ul>
  //               <li>{t('Buy NFT Studio 24')}</li>
  //               <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
  //             </ul>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner'>
  //           <div className='top-span'>
  //             <span className='span-logo'>
  //               <Image className='post-logo' src={logo} alt='NFTスタジオ24' />
  //             </span>
  //             <Link
  //               href='#'
  //               style={{
  //                 pointerEvents: 'none',
  //               }}
  //               className='story-btn'
  //             >
  //               {t('coming soon')}
  //             </Link>
  //           </div>
  //           <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           >
  //             <Image src={post1} alt='Post' />
  //             <h2>{t('Why is everyone obsessed with...')}</h2>
  //             <ul>
  //               <li>{t('Buy NFT Studio 24')}</li>
  //               <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
  //             </ul>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner'>
  //           <div className='top-span'>
  //             <span className='span-logo'>
  //               <Image className='post-logo' src={logo} alt='NFTスタジオ24' />
  //             </span>
  //             <Link
  //               href='#'
  //               style={{
  //                 pointerEvents: 'none',
  //               }}
  //               className='story-btn'
  //             >
  //               {t('coming soon')}
  //             </Link>
  //           </div>
  //           <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           >
  //             <Image src={post2} alt='Post' />
  //             <h2>{t('What is Blockchain Security: Everything...')}</h2>
  //             <ul>
  //               <li>{t('Buy NFT Studio 24')}</li>
  //               <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
  //             </ul>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner'>
  //           <div className='top-span'>
  //             <span className='span-logo'>
  //               <Image className='post-logo' src={logo} alt='NFTスタジオ24' />
  //             </span>
  //             <Link
  //               href='#'
  //               style={{
  //                 pointerEvents: 'none',
  //               }}
  //               className='story-btn'
  //             >
  //               {t('coming soon')}
  //             </Link>
  //           </div>
  //           <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           >
  //             <Image src={post3} alt='Post' />
  //             <h2>{t('TON Blockchain:')} {t('The Complete Guide 2023...')}</h2>
  //             <ul>
  //               <li>{t('Buy NFT Studio 24')}</li>
  //               <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
  //             </ul>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className='Stories-post'>
  //         <div className='Stories-post-inner'>
  //           <div className='top-span'>
  //             <span className='span-logo'>
  //               <Image className='post-logo' src={logo} alt='NFTスタジオ24' />
  //             </span>
  //             <Link
  //               href='#'
  //               style={{
  //                 pointerEvents: 'none',
  //               }}
  //               className='story-btn'
  //             >
  //               {t('coming soon')}
  //             </Link>
  //           </div>
  //           <Link
  //             href='/'
  //             style={{
  //               pointerEvents: 'none',
  //             }}
  //             className='img-pnl'
  //           >
  //             <Image src={post4} alt='Post' />
  //             <h2>{t('How to transfer Crypto from Freewell to...')}</h2>
  //             <ul>
  //               <li>{t('Buy NFT Studio 24')}</li>
  //               <li>{LANG=="en"?"On Dec 30, 2022":"2022 年 12 月 30 日"}</li>
  //             </ul>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </Slider>
  // );
}
