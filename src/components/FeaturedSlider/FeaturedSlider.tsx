import React from 'react';
import 'slick-carousel/slick/slick.css';
import post1 from '@/assets/Img/Posts/Post-1.png';
import post2 from '@/assets/Img/Posts/Post-2.png';
import logo from '@/assets/Img/Logo/Footer-logo.png';
import box from '@/assets/Img/Icons/icon-giftbox.png';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import useLocalization from "@/lib/UseLocalization"
import { LANG } from '@/constant/language';
export default function FeaturedSlider({ isHome }: { isHome?: boolean }) {
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
  var Featued = {
    dots: null,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: isHome ? 2 : 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <Slider {...Featued}>
        <div className='Post-padding'>
          <div className='Featured-Post'>
            <div className='Featured-Post-inner'>
              <Link href='/' className='img-pnl'>
                <Image src={post1} alt='Post' />
              </Link>
              <div className='txt-pnl'>
                <h5>
                  {t('All You Need to Know about Superlative Secret Society NFT...')}
                </h5>
                <p>
                  <span>
                    <Image src={logo} alt='logo' />
                  </span>{' '}
                  {t('Campaing of')} <b>NFTStudio24</b>
                </p>
                <Link href='#'>
                  <Image src={box} alt='logo' /> {t('2500 USDT Up for Grabs!')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='Post-padding'>
          <div className='Featured-Post'>
            <div className='Featured-Post-inner'>
              <Link href='/' className='img-pnl'>
                <Image src={post2} alt='Post' />
              </Link>
              <div className='txt-pnl'>
                <h5>
                  {t('How Party Degen climbed the top ranking on OpenSea in 6 days')}
                </h5>
                <p>
                  <span>
                    <Image src={logo} alt='logo' />
                  </span>{' '}
                  {t('Campaing of')} <b>NFTStudio24</b>
                </p>
                <Link href='#'>
                  <Image src={box} alt='logo' /> {t('Join and Win USDT!')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='Post-padding'>
          <div className='Featured-Post'>
            <div className='Featured-Post-inner'>
              <Link href='/' className='img-pnl'>
                <Image src={post1} alt='Post' />
              </Link>
              <div className='txt-pnl'>
                <h5>
                  {t('All You Need to Know about Superlative Secret Society NFT...')}
                </h5>
                <p>
                  <span>
                    <Image src={logo} alt='logo' />
                  </span>{' '}
                  {t('Campaing of')} <b>NFTStudio24</b>
                </p>
                <Link href='#'>
                  <Image src={box} alt='logo' /> {t('2500 USDT Up for Grabs!')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='Post-padding'>
          <div className='Featured-Post'>
            <div className='Featured-Post-inner'>
              <Link href='/' className='img-pnl'>
                <Image src={post2} alt='Post' />
              </Link>
              <div className='txt-pnl'>
                <h5>
                  {t('How Party Degen climbed the top ranking on OpenSea in 6 days')}
                </h5>
                <p>
                  <span>
                    <Image src={logo} alt='logo' />
                  </span>{' '}
                  {t('Campaing of')} <b>NFTStudio24</b>
                </p>
                <Link href='#'>
                  <Image src={box} alt='logo' /> {t('Join and Win USDT!')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}
