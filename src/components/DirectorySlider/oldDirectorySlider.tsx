import React from 'react';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import Link from 'next/link';
import useLocalization from "@/lib/UseLocalization"
import { LANG } from '@/constant/language';
import Image from 'next/image';
export default function DirectorySlider() {
  \
  const { t, changeLocale } = useLocalization(LANG);
  var Directory = {
    dots: null,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...Directory}>
        <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post direc'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-b.png'}
                  width={213}
                  height={133}
                  alt='Logo'
                />
              </div>
              <div className='text-pnl'>
                <div className='d-flex'>
                  <div className='logo-img'>
                    <Image
                      src={'/images/l-b.png'}
                      width={15}
                      height={16}
                      alt='Logo'
                    />
                  </div>
                  <div className='heading-txt-pnl'>
                    <h3>{t('on Binance')}</h3>
                    <p style={{ minHeight: 84 }}>
                      Binance Contemplates US Exchange Closure Amidst Global
                      Concern
                    </p>
                  </div>
                </div>
                <ul>
                  <li>
                    2<span>Posts</span>
                  </li>
                  <li>
                    345
                    <span>Views</span>
                  </li>
                  <li>
                    2213
                    <span>Likes</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='txt-pnl'>
              <p>
                <i>
                  The general population should exercise caution while using...
                </i>
              </p>
              <div className='img-pl'>
                <Image
                  src={'/images/l-n.png'}
                  width={20}
                  height={20}
                  alt='Girl'
                />

                <div>
                  <h5>NFTStudio 24</h5>
                  <p>Founder</p>
                </div>
              </div>
            </div>
          </Link>
        </div>{' '}
        <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post direc'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-s.png'}
                  width={213}
                  height={133}
                  alt='Logo'
                />
              </div>
              <div className='text-pnl'>
                <div className='d-flex'>
                  <div className='logo-img'>
                    <Image
                      src={'/images/ls.png'}
                      width={20}
                      height={20}
                      alt='Logo'
                    />
                  </div>
                  <div className='heading-txt-pnl'>
                    <h3>Solana</h3>
                    <p style={{ minHeight: 84 }}>
                      Solana Blockchain Enables OpenAI’s ChatGPT Plugin for
                      Enhanced User...
                    </p>
                  </div>
                </div>
                <ul>
                  <li>
                    3<span>Posts</span>
                  </li>
                  <li>
                    350
                    <span>Reviews</span>
                  </li>
                  <li>
                    2950
                    <span>Likes</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='txt-pnl'>
              <p>
                <i>
                  The general population should exercise caution while using...
                </i>
              </p>
              <div className='img-pl'>
                <Image
                  src={'/images/l-n.png'}
                  width={20}
                  height={20}
                  alt='Girl'
                />

                <div>
                  <h5>NFTStudio 24</h5>
                  <p>Founder</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post direc'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-e.png'}
                  width={213}
                  height={133}
                  alt='Logo'
                />
              </div>
              <div className='text-pnl'>
                <div className='d-flex'>
                  <div className='logo-img'>
                    <Image
                      src={'/images/l-e.png'}
                      width={20}
                      height={20}
                      alt='Logo'
                    />
                  </div>
                  <div className='heading-txt-pnl'>
                    <h3>Etherium</h3>
                    <p style={{ minHeight: 84 }}>
                      {t('Crypto ETF Expert Predicts All Spot Bitcoin ETF Applications...')}
                    </p>
                  </div>
                </div>
                <ul>
                  <li>
                    4<span>{t('Posts')}</span>
                  </li>
                  <li>
                    123
                    <span>{t('Reviews')}</span>
                  </li>
                  <li>
                    1356
                    <span>{t("Likes")}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='txt-pnl'>
              <p>
                <i>
                  {t('The general population should exercise caution while using...')}
                </i>
              </p>
              <div className='img-pl'>
                <Image
                  src={'/images/l-n.png'}
                  width={20}
                  height={20}
                  alt='Girl'
                />

                <div>
                  <h5>NFTStudio 24</h5>
                  <p>{t('Founder')}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post direc'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-a.png'}
                  width={213}
                  height={133}
                  alt='Logo'
                />
              </div>
              <div className='text-pnl'>
                <div className='d-flex'>
                  <div className='logo-img'>
                    <Image
                      src={'/images/l-a.png'}
                      width={20}
                      height={20}
                      alt='Logo'
                    />
                  </div>
                  <div className='heading-txt-pnl'>
                    <h3>Aptos</h3>
                    <p style={{ minHeight: 84 }}>
                     {t('Aptos Ventures Abroad: Navigating Global Markets in the Web3 and...')}
                    </p>
                  </div>
                </div>
                <ul>
                  <li>
                    4<span>{t('Posts')}</span>
                  </li>
                  <li>
                    123
                    <span>{t('Reviews')}</span>
                  </li>
                  <li>
                    1356
                    <span>{t('Likes')}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='txt-pnl'>
              <p>
                <i>
                {t('The general population should exercise caution while using...')}
                </i>
              </p>
              <div className='img-pl'>
                <Image
                  src={'/images/l-n.png'}
                  width={20}
                  height={20}
                  alt='Girl'
                />

                <div>
                  <h5>NFTStudio 24</h5>
                  <p>{t('Founder')}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post direc'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-a.png'}
                  width={213}
                  height={133}
                  alt='Logo'
                />
              </div>
              <div className='text-pnl'>
                <div className='d-flex'>
                  <div className='logo-img'>
                    <Image
                      src={'/images/l-a.png'}
                      width={20}
                      height={20}
                      alt='Logo'
                    />
                  </div>
                  <div className='heading-txt-pnl'>
                    <h3>Aptos</h3>
                    <p style={{ minHeight: 84 }}>
                    {t('Aptos Ventures Abroad: Navigating Global Markets in the Web3 and...')}
                    </p>
                  </div>
                </div>
                <ul>
                <li>
                    4<span>{t('Posts')}</span>
                  </li>
                  <li>
                    123
                    <span>{t('Reviews')}</span>
                  </li>
                  <li>
                    1356
                    <span>{t('Likes')}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='txt-pnl'>
              <p>
                <i>
                  {t('The general population should exercise caution while using...')}
                </i>
              </p>
              <div className='img-pl'>
                <Image
                  src={'/images/l-n.png'}
                  width={20}
                  height={20}
                  alt='Girl'
                />
                <div>
                  <h5>NFTStudio 24</h5>
                  <p>{t('Founder')}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Slider>
    </>
  );
}
