import React from 'react';
import bgimg from '@/assets/Img/Posts/bg-post.png';
import sublogo from '@/assets/Img/Logo/sub-logo.png';
import girl from '@/assets/Img/Icons/icon-girl.png';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import logger from '@/lib/logger';
import { ARTICLE_FEATURED_IMAGE_ASPECT, profileAspect } from '@/constant/sizes';
import { formatLikesCount } from '@/components/utils/utcToLocal';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import { DIRECTORY_STATIC_PATH } from '@/constant/routes';
export default function ProductSlider({
  trendingDirectries,
}: {
  trendingDirectries: any;
}) {
  var Product = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };
  logger(trendingDirectries, 'trendingDirectries22');
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      <Slider {...Product} lazyLoad='anticipated'>
        {trendingDirectries.length != 0 &&
          trendingDirectries.map((item: any) => {
            return (
              <div className='Post-padding' key={item[0]}>
                <Link
                  href={item[1].isStatic? `${DIRECTORY_STATIC_PATH +item[0]}`:`/directory?directoryId=${item[0]}`}
                  className='Product-post'
                >
                  <div className='Product-post-inner'>
                    <div
                      className='img-pnl'
                      style={{
                        aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                        width: '100%',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={
                          item[1].companyBanner
                            ? item[1].companyBanner
                            : '/images/b-b.png'
                        }
                        fill
                        alt='Logo'
                      />
                    </div>
                    <div className='text-pnl'>
                      <div className='d-flex'>
                        <div
                          className='logo-img'
                          style={{
                            aspectRatio: profileAspect,
                            width: '40px',
                            height: '40px',
                            position: 'relative',
                          }}
                        >
                          <Image
                            src={
                              item[1].companyLogo
                                ? item[1].companyLogo
                                : '/images/l-b.png'
                            }
                            fill
                            alt='Logo'
                          />
                        </div>
                        <div className='heading-txt-pnl'>
                          <h3 style={{ height: 19.19, overflow: 'hidden' }}>
                            {item[1].company ?? ''}
                          </h3>
                          <p style={{ height: 84, overflow: 'hidden' }}>
                            {item[1].shortDescription ?? ''}
                          </p>
                        </div>
                      </div>
                      <div className='txt-pnl'>
                        <p style={{ height: 21, overflow: 'hidden' }}>
                          <i>{item[1].founderDetail ?? ''}</i>
                        </p>
                        <div className='img-pl'>
                          <div
                            style={{
                              aspectRatio: profileAspect,
                              width: '40px',
                              height: '40px',
                              position: 'relative',
                            }}
                          >
                            <Image
                              src={
                                item[1].founderImage
                                  ? item[1].founderImage
                                  : '/images/l-n.png'
                              }
                              fill
                              alt='Girl'
                            />
                          </div>

                          <h5 className='ms-2'>{item[1].founderName ?? ''}</h5>
                        </div>
                      </div>
                      <ul>
                        <li>
                          {formatLikesCount(Number(item[1]?.totalCount)) ?? 0}
                          <span>{t('Posts')}</span>
                        </li>
                        <li>
                          {formatLikesCount(Number(item[1].views ?? 0))}
                          <span>{t('Views')}</span>
                        </li>
                        <li>
                          {formatLikesCount(Number(item[1].likes) ?? 0)}
                          <span>{t('Likes')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}

        {/* <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-s.png'}
                  width={213}
                  height={78}
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
                <div className='txt-pnl'>
                  <p>
                    The general population should exercise caution while
                    using...
                  </p>
                  <div className='img-pl'>
                    <Image
                      src={'/images/l-n.png'}
                      width={20}
                      height={20}
                      alt='Girl'
                    />
                    <h5>NFTStudio 24</h5>
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
                    <span>{t('Upvotes')}s</span>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
        <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-e.png'}
                  width={213}
                  height={78}
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
                      Crypto ETF Expert Predicts All Spot Bitcoin ETF
                      Applications...
                    </p>
                  </div>
                </div>
                <div className='txt-pnl'>
                  <p>
                    The general population should exercise caution while
                    using...
                  </p>
                  <div className='img-pl'>
                    <Image
                      src={'/images/l-n.png'}
                      width={20}
                      height={20}
                      alt='Girl'
                    />
                    <h5>NFTStudio 24</h5>
                  </div>
                </div>
                <ul>
                  <li>
                    4<span>Posts</span>
                  </li>
                  <li>
                    123
                    <span>Reviews</span>
                  </li>
                  <li>
                    1356
                    <span>{t('Upvotes')}s</span>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
        <div className='Post-padding'>
          <Link
            href='https://nftstudio24.com/news/cryptopedia/blockchain-news/'
            className='Product-post'
          >
            <div className='Product-post-inner'>
              <div className='img-pnl'>
                <Image
                  src={'/images/b-a.png'}
                  width={213}
                  height={78}
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
                      Aptos Ventures Abroad: Navigating Global Markets in the
                      Web3 and...
                    </p>
                  </div>
                </div>
                <div className='txt-pnl'>
                  <p>
                    The general population should exercise caution while
                    using...
                  </p>
                  <div className='img-pl'>
                    <Image
                      src={'/images/l-n.png'}
                      width={20}
                      height={20}
                      alt='Girl'
                    />
                    <h5>NFTStudio 24</h5>
                  </div>
                </div>
                <ul>
                  <li>
                    4<span>Posts</span>
                  </li>
                  <li>
                    123
                    <span>Reviews</span>
                  </li>
                  <li>
                    1356
                    <span>{t('Upvotes')}s</span>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        </div> */}
      </Slider>
    </>
  );
}
