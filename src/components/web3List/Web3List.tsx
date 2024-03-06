import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import tempimg from '@/assets/Img/banner-1.png';
import React from 'react';
import logger from '@/lib/logger';
import { formatLikesCount } from '@/components/utils/utcToLocal';
import useLocalization from "@/lib/UseLocalization"
import { LANG } from '@/constant/language';

export default function Web3ListbyCategoryId({
  relatedDirectory,
  trendingDirectriesIds,
}: {
  relatedDirectory: any;
  trendingDirectriesIds?: any[];
}) {
  const { t, changeLocale } = useLocalization(LANG);
  const router = useRouter();
  let openArticleLink = (entryLink: any) => {
    router.push(entryLink);
  };
  logger(relatedDirectory, 'relatedDirectory22435');
  return (
    <>
      {relatedDirectory.map((entry: any) => {
        let istrending = false;
        if (trendingDirectriesIds && trendingDirectriesIds.includes(entry[0])) {
          istrending = true;
        }
        return (
          <div
            className='Post-padding '
            key={entry[0]}
            style={{ maxWidth: '350px' }}
          >
            <Link
              href='#'
              onClick={(e) => {
                e.preventDefault();

                openArticleLink(
                  `/directory?directoryId=${entry.length != 0 ? entry[0] : '#'}`
                );
              }}
              className='Product-post direc '
            >
              <div className='Product-post-inner'>
                <div className='img-pnl'>
                  {/* <Image
                  src={'/images/b-b.png'}
                  width={213}
                  height={133}
                  alt='Logo'
                /> */}
                  <Image
                    src={entry[1]?.companyBanner ?? tempimg}
                    alt='founder image'
                    height={100}
                    width={100}
                    style={{ height: '100%', width: '100%' }}
                  />
                  {istrending ? (
                    <h5 className='labelTrending'>{t('Trending')}</h5>
                  ) : (
                    ''
                  )}
                </div>
                <div className='text-pnl'>
                  <div className='d-flex'>
                    <div className='logo-img'>
                      <Image
                        src={entry[1]?.companyLogo ?? '/images/l-b.png'}
                        width={15}
                        height={16}
                        alt='Logo'
                      />
                    </div>
                    <div className='heading-txt-pnl'>
                      <h3>
                        {entry[1]?.company.length > 15
                          ? `${entry[1]?.company.slice(0, 15)}...`
                          : entry[1]?.company ?? ''}
                      </h3>
                      <p style={{ minHeight: 84 }}>
                        {entry[1]?.shortDescription.length > 50
                          ? `${entry[1]?.shortDescription.slice(0, 50)}...`
                          : entry[1]?.shortDescription ?? ''}
                      </p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      {formatLikesCount(Number(entry[1]?.totalCount)) ?? 0}
                      <span>{t('Posts')}</span>
                    </li>
                    <li>
                      {formatLikesCount(Number(entry[1]?.views)) ?? 0}
                      <span>{t('Views')}</span>
                    </li>
                    <li>
                      {formatLikesCount(Number(entry[1]?.likes)) ?? 0}
                      <span>{t('Likes')}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='txt-pnl' style={{ height: '135px' }}>
                <p style={{ overflow: 'hidden', height: '40px' }}>
                  <i>
                    {/* {entry[1]?.founderDetail.length > 50
                        ? `${entry[1]?.founderDetail.slice(0, 50)}...`
                        : entry[1]?.founderDetail ?? ''} */}
                    {entry[1]?.founderDetail}
                  </i>
                </p>
                <div className='img-pl'>
                  <Image
                    src={entry[1]?.founderImage ?? '/images/l-n.png'}
                    width={20}
                    height={20}
                    alt='Girl'
                  />

                  <div>
                    <h5>{entry[1]?.founderName ?? ''}</h5>
                    <p>Founder</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
