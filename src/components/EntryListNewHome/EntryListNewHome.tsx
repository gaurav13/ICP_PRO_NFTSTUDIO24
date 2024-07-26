import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Col, Spinner } from 'react-bootstrap';
import parse from 'html-react-parser';
import promotedIcon from '@/assets/Img/promoted-icon.png';
import pressicon from '@/assets/Img/Icons/icon-press-release.png';
import iconthumb from '@/assets/Img/Icons/icon-thumb.png';
import iconmessage from '@/assets/Img/Icons/icon-comment.png';
import { useRouter } from 'next/navigation';
import Tippy from '@tippyjs/react';
import { ARTICLE_FEATURED_IMAGE_ASPECT } from '@/constant/sizes';
import { formatLikesCount } from '@/components/utils/utcToLocal';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import { ARTICLE_DINAMIC_PATH, ARTICLE_STATIC_PATH } from '@/constant/routes';
export default React.memo(function EntryListNewHome({
  Entries,
  connectModel,
}: {
  Entries: any[];
  connectModel: any;
}) {
  let router = useRouter();
  let openArticleLink = (articleLink: any) => {
    router.push(articleLink);
  };
  const { t, changeLocale } = useLocalization(LANG);
  return (
    <>
      {Entries.map((ent: any) => {
        return (
          <Col xxl='3' xl='6' lg='6' md='6' sm='6' key={ent[0]}>
            <div className='general-post new'>
              <div
                className='img-wrapper'
                style={{
                  aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                }}
              >
                <Image
                  src={ent[1].image[0]}
                  className='mb-2'
                  alt={ent[1].caption ?? 'general post'}
                  // width={100}
                  fill
                  // height={100}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    openArticleLink(
                      ent[1].isStatic
                        ? `${ARTICLE_STATIC_PATH + ent[0]}`
                        : `${
                            ent[0].length != 0
                              ? ARTICLE_DINAMIC_PATH + ent[0]
                              : ARTICLE_DINAMIC_PATH + '#'
                          }`
                    )
                  }
                />
              </div>

              <div className='txt-pnl'>
                <div className='spacer-10' />
                <Link
                  href={
                    ent[1].isStatic
                      ? `${ARTICLE_STATIC_PATH + ent[0]}`
                      : `${
                          ent[0].length != 0
                            ? ARTICLE_DINAMIC_PATH + ent[0]
                            : ARTICLE_DINAMIC_PATH + '#'
                        }`
                  }
                  target='_self'
                >
                  <h6>
                    {ent[1].isPromoted ? (
                      <Tippy
                        content={
                          <p className='mb-0'>{t('Promoted Article')}</p>
                        }
                      >
                        <Image
                          src={promotedIcon}
                          alt='promoted'
                          style={{ width: 20, height: 20 }}
                        />
                      </Tippy>
                    ) : // <span className='publish-btn table-btn'>
                    //   promotedIcon
                    // </span>
                    ent[1].pressRelease ? (
                      <Tippy
                        content={<p className='mb-0'>{t('Press Release')}</p>}
                      >
                        <Image
                          src={pressicon}
                          alt='promoted'
                          style={{ width: 20, height: 20 }}
                        />
                      </Tippy>
                    ) : (
                      <></>
                    )}{' '}
                    {ent[1].title.length > 60
                      ? `${ent[1].title.slice(0, 60)}...`
                      : ent[1].title}
                  </h6>
                </Link>
                <p
                  className='elipscls'
                  style={{
                    maxHeight: '48px',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    openArticleLink(
                      ent[1].isStatic
                        ? `${ARTICLE_STATIC_PATH + ent[0]}`
                        : `${
                            ent[0].length != 0
                              ? ARTICLE_DINAMIC_PATH + ent[0]
                              : ARTICLE_DINAMIC_PATH + '#'
                          }`
                    )
                  }
                >
                  {ent[1]?.seoExcerpt}
                  {/* {ent[1]?.seoExcerpt.length>65? `${ent[1]?.seoExcerpt.slice(0,65)}...`:ent[1]?.seoExcerpt ?? ''} */}
                </p>
                <ul className='thumb-list flex'>
                  <li>
                    <a href='#' onClick={connectModel}>
                      <Image src={iconthumb} alt='Icon Thumb' />{' '}
                      {Number(ent[1].likes) != 0
                        ? formatLikesCount(Number(ent[1].likes))
                        : 0}
                    </a>

                    <a
                      className='web-view-display'
                      href='#'
                      onClick={connectModel}
                    >
                      <Image src={iconmessage} alt='Icon Comment' />
                      {ent[1]?.comment?.comments ?? 0} {t('Comments')}
                    </a>
                  </li>
                  <li>
                    <Link href={`#`} onClick={connectModel} className='ms-1'>
                      <div className='viewbox'>
                        <i className='fa fa-eye fill blue-icon fa-lg me-1' />
                        {t('Views')}
                        <span className='mx-1'>|</span>

                        {Number(ent[1].views) != 0
                          ? formatLikesCount(Number(ent[1].views))
                          : 0}
                      </div>
                    </Link>
                    <a
                      className='mobile-view-display mobile-cmnt-btn ss'
                      href='#'
                      onClick={connectModel}
                    >
                      <Image src={iconmessage} alt='Icon Comment' />
                      {ent[1]?.comment?.comments ?? 0}
                      {t('Comments')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        );
      })}
    </>
  );
});
