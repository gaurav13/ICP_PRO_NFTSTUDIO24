'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Breadcrumb,
  Dropdown,
  Spinner,
  Form,
  Button,
} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import smallpost1 from '@/assets/Img/Posts/small-post-16.jpg';
import smallpost2 from '@/assets/Img/Posts/small-post-17.jpg';
import smallpost3 from '@/assets/Img/Posts/small-post-18.jpg';
import smallpost4 from '@/assets/Img/Posts/small-post-19.jpg';
import smallpost5 from '@/assets/Img/Posts/small-post-20.jpg';
import icongift from '@/assets/Img/Icons/icon-giftbox.png';
import bg from '@/assets/Img/bg.jpg';
import bg1 from '@/assets/Img/banner-2.jpg';
import bgblack from '@/assets/Img/bg-black.jpg';
import iconevent from '@/assets/Img/Icons/icon-press-release.png';
import iconcalender from '@/assets/Img/Icons/icon-calender.png';
import logo from '@/assets/Img/Logo/Footer-logo.png';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { EventStatus, ListEvent } from '@/types/article';
import { makeEntryActor, makeUserActor } from '@/dfx/service/actor-locator';
import { getImage } from '@/components/utils/getImage';
import { utcToLocal } from '@/components/utils/utcToLocal';
import logger from '@/lib/logger';
import { ARTICLE_FEATURED_IMAGE_ASPECT } from '@/constant/sizes';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import getVariant from '@/components/utils/getEventStatus';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import { ARTICLE_STATIC_PATH } from '@/constant/routes';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
const EVENTS_LEGNTH = 3;
export default function Events() {
  const { t, changeLocale } = useLocalization(LANG);
  const [topEvents, setTopEvents] = useState<null | ListEvent[]>();
  const [articlesList, setArticlesList] = useState<any>([]);
  const [pressReleaseList, setPressReleaseList] = useState<any>([]);
  const [moreEvents, setMoreEvents] = useState(false);
  const [eventAmount, setEventAmount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [status, setStatus] = useState('all');
  const [previewEvents, setPreviewEvents] = useState<null | ListEvent[]>();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ month: string | number }>({
    month: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [articleLoading, setarticleLoading] = useState(true);

  const [ccVals, setCcVals] = useState({
    country: '',
    city: '',
  });
  const { auth, identity } = useConnectPlugWalletStore((state) => ({
    auth: state.auth,
    identity: state.identity,
  }));

  const router = useRouter();
  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });

  // sending the customstatus just sets the preview events
  async function getEvents(
    reset?: boolean,
    more?: number,
    customStatus?: string
  ) {
    let searched = reset ? '' : search;
    let month = filters.month ? [filters.month] : [];
    let queryStatus = customStatus ?? status;
    const country = ccVals.country == '' ? [] : [ccVals.country];
    const city = ccVals.city == '' ? [] : [ccVals.city];
    const startFrom = more ?? startIndex;
    const length = customStatus ? 4 : EVENTS_LEGNTH;
    let statusVariant = getVariant(queryStatus);
    logger(
      { searched, startFrom, reset, month, country, city, statusVariant },
      'gertting for  this'
    );
    setIsLoading(true);

    const resp = await entryActor.get_upcoming_events(
      searched,
      startFrom,
      length,
      statusVariant,
      month,
      country,
      city
    );
    const unEvents = resp.entries;
    const amount = resp.amount;
    if (!customStatus) {
      setEventAmount(amount);
      if (
        (more &&
          ((topEvents && unEvents.length + topEvents?.length < amount) ||
            (!topEvents && unEvents.length < amount))) ||
        (!more && unEvents.length < amount)
      ) {
        logger({ topEvents, un: unEvents.length, amount }, 'WHYY TRUEE<<<<,');
        setMoreEvents(true);
      } else {
        logger({ topEvents, un: unEvents.length, amount }, 'WHYY FASE<<<<,');
        setMoreEvents(false);
      }
    }
    if (unEvents.length > 0) {
      const refinedEvents = unEvents.map((raw: any) => {
        const unEvent = raw[1];
        const image = getImage(unEvent.image);
        const date = utcToLocal(unEvent.date.toString(), 'MMM D, YYYY');
        const refinedEvent: ListEvent = {
          id: raw[0],
          title: unEvent.title,
          date: date,
          image,
          shortDescription: unEvent.shortDescription,
          website: unEvent.website,
          freeTicket: unEvent.freeTicket,
          applyTicket: unEvent.applyTicket,
        };
        return refinedEvent;
      });
      if (customStatus) {
        setPreviewEvents(refinedEvents);
        return;
      }
      // if (refinedEvents.length > 3) {
      //   setTopEvents(refinedEvents.slice(0, 10));
      // }
      // setTopEvents(refinedEvents);
      if (more) {
        setTopEvents((prev) => {
          if (prev) return prev.concat(refinedEvents);
          else return refinedEvents;
        });
      } else {
        setTopEvents(refinedEvents);
      }
    } else {
      setTopEvents(null);
    }
    setIsLoading(false);
  }
  async function getMoreEvents() {
    if (startIndex + EVENTS_LEGNTH <= eventAmount) {
      setStartIndex((prev) => prev + EVENTS_LEGNTH);
      getEvents(false, startIndex + EVENTS_LEGNTH);
    }
  }
  function handleCChange(cc: string, value: string) {
    setCcVals((prev) => {
      return { ...prev, [cc]: value };
    });
  }
  function handleFilterChange(filter: string, value: string) {
    setFilters((prev) => {
      return { ...prev, [filter]: parseInt(value) };
    });
  }
  let refineEntries = async (entriesList: any) => {
    const userAcotr = makeUserActor({
      agentOptions: {
        identity,
      },
    });
    for (let entry = 0; entry < entriesList.length; entry++) {
      let newUser = null;
      var authorId = entriesList[entry][1].user.toString();
      entriesList[entry][1].userId = authorId;
      newUser = await userAcotr.get_user_details([authorId]);
      if (newUser.ok) {
        if (newUser.ok[1].profileImg.length != 0) {
          logger(newUser.ok[1].profileImg.length, 'newuserimg');
          newUser.ok[1].profileImg = await getImage(
            newUser.ok[1].profileImg[0]
          );
        }
        entriesList[entry][1].user = newUser.ok[1];
        logger(newUser, 'newuser1');
      }
      entriesList[entry][1].image = await getImage(
        entriesList[entry][1].image[0]
      );
    }
    return entriesList;
  };
  let getArticles = async () => {
    let category = ['Event', 'Events'];

    const resp = await entryActor.getOnlyArticles(3, category);
    if (resp.length != 0) {
      let refined = await refineEntries(resp);
      setArticlesList(refined);

      logger(refined, 'getOnlyArticles');
    } else {
      setArticlesList([]);
      // logger(resp,"getOnlyArticles")
    }
    logger(resp, 'getOnlyArticles');
  };
  let getPressRelease = async () => {
    let category = ['Event', 'Events'];
    const resp = await entryActor.getOnlyPressRelease(3, category);
    if (resp.length != 0) {
      let refined = await refineEntries(resp);
      setPressReleaseList(refined);

      logger(refined, 'getOnlyPressRelease');
    } else {
      setPressReleaseList([]);
    }
    setarticleLoading(false);
    // logger(resp,"getOnlyPressRelease")
  };
  const handleSearch = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e) {
      if (e.key === 'Enter') {
        logger('it got called from here');
        setStartIndex(0);
        getEvents(false, 0);
      }
    } else {
      setStartIndex(0);
      getEvents(false, 0);
    }
  };
  function handleStatusChange(e: any) {
    setStatus(e.target.value);
    setStartIndex(0);
  }
  useEffect(() => {
    getEvents();
  }, [status, ccVals, filters]);

  useEffect(() => {
    getEvents();
    setarticleLoading(true);
    getArticles();
    getPressRelease();
    getEvents(true, 0, 'upcoming');
  }, []);
  return (
    <>
      <main id='main'>
        <div className='main-inner event-detail-page'>
          <div className='inner-content'>
            <div className='event-innr'>
              <Col xl='12' lg='12' md='12'>
                <Breadcrumb className='new-breadcrumb web'>
                  <Breadcrumb.Item>
                    <Link href='/'>
                      <i className='fa fa-home'></i>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    <Link
                      href='/'
                      style={{
                        pointerEvents: 'none',
                      }}
                    >
                      Events
                    </Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col xl='12' lg='12' md='12'>
                {previewEvents && (
                  <div className='eventlist-header'>
                    {previewEvents?.length > 0 && (
                      <>
                        <div className='img-pnl'>
                          <Link
                            className='img-parent max'
                            style={{
                              aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                            }}
                            href={`/event-details?eventId=${previewEvents[0].id}`}
                          >
                            <Image
                              src={previewEvents[0].image}
                              fill
                              alt='Post'
                            />
                          </Link>
                        </div>
                        <div className='txt-pnl'>
                          <h4>{previewEvents[0]?.title}</h4>
                          <div>
                            <Link
                              href={`/event-details?eventId=${previewEvents[0].id}`}
                              className='reg-btn white mx-2'
                            >
                              <i className='fa fa-info-circle'></i> {t('Learn More')}
                            </Link>
                            <Link
                              href={previewEvents[0].website}
                              target='_blank'
                              className='reg-btn yellow'
                            >
                              {t('Visit Website')}
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                    {previewEvents.length > 1 ? (
                      <ul className='my-2 gap-2'>
                        {previewEvents.length > 4
                          ? previewEvents.slice(1, 4).map((event) => (
                            <li key={event.id}>
                              <Link
                                href={`/event-details?EventId=${event.id}`}
                                className='img-parent'
                                style={{
                                  aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                                }}
                              >
                                <Image fill src={event.image} alt='Bg' />
                              </Link>
                            </li>
                          ))
                          : previewEvents.map((event, index) => {
                            if (index == 0) return null;
                            return (
                              <li key={event.id} className='w-100'>
                                <Link
                                  href={`/event-details?eventId=${event.id}`}
                                  style={{
                                    aspectRatio:
                                      ARTICLE_FEATURED_IMAGE_ASPECT,
                                  }}
                                  className='img-parent'
                                >
                                  <Image fill src={event.image} alt='Bg' />
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    ) : null}
                    {/* <ul>
                     
                      <li>
                        <Image src={bg} alt='Bg' />
                      </li>
                      <li>
                        <Image src={bg} alt='Bg' />
                      </li>
                      <li>
                        <Image src={bg} alt='Bg' />
                      </li>
                    </ul> */}
                  </div>
                )}
              </Col>
              <Col xl='12' lg='12' md='12'>
                <div className='flex-div-xs '>
                  <div className='seelect'>
                    <Form.Select
                      aria-label='Default select example'
                      className='trans'
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option value={'all'}>{t('all events')}</option>
                      <option value={'upcoming'}>{t('Upcoming event')}</option>
                      <option value='past'>{t('past events')}</option>
                      <option value='ongoing'>{t('ongoing events')}</option>
                    </Form.Select>
                  </div>
                  <div>
                    <div className='d-flex'>
                      {/* <div className='search-pnl small'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Search for Events'
                        />
                        <button>
                          <i className='fa fa-search'></i>
                        </button>
                      </div> */}
                      <div className='search-pnl small'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder={t('Search for Events')}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyDown={handleSearch}
                        />
                        {search.length >= 1 && (
                          <button
                            onClick={() => {
                              setSearch('');
                              getEvents(true, 0);
                            }}
                          >
                            <i className='fa fa-xmark mx-1'></i>
                          </button>
                        )}
                        <button onClick={() => handleSearch()}>
                          <i className='fa fa-search'></i>
                        </button>
                      </div>

                      <div className='dropdown grey'>
                        <Button onClick={() => handleSearch()}>
                          <i className='fa fa-sliders'></i> {t('filter')}
                        </Button>
                      </div>
                    </div>
                    <div className='spacer-20'></div>
                  </div>
                </div>
                <div>
                  <Row>
                    <Col xl='2' lg='3' md='3' sm='6'>
                      <div className='flex-div align-items-center'>
                        <h6 className='m-0'>
                          <b>{t('Countries')}</b>
                        </h6>
                        <Button
                          onClick={() => {
                            setCcVals((prev) => {
                              return { city: '', country: '' };
                            });
                          }}
                          className='red-link text-decoration-no m-0'
                        >
                          {t('Clear')}
                        </Button>
                      </div>
                      <CountryDropdown
                        value={ccVals.country}
                        onChange={(e) => {
                          handleCChange('country', e);
                        }}
                      />
                    </Col>

                    <Col xl='2' lg='3' md='3' sm='6'>
                      <div className='flex-div align-items-center'>
                        <h6 className='m-0'>
                          <b>{t('Cities')}</b>
                        </h6>
                        <Button
                          onClick={() => {
                            setCcVals((prev) => {
                              return { ...prev, city: '' };
                            });
                          }}
                          className='red-link text-decoration-no m-0'
                        >
                          {t('Clear')}
                        </Button>
                      </div>
                      <RegionDropdown
                        country={ccVals.country}
                        value={ccVals.city}
                        defaultOptionLabel='Slect City'
                        blankOptionLabel='Select City'
                        disableWhenEmpty
                        onChange={(e) => {
                          handleCChange('city', e);
                        }}
                      />
                    </Col>
                    <Col xl='2' lg='3' md='3' sm='6'>
                      <div className='flex-div align-items-center'>
                        <h6 className='m-0'>
                          <b>{t('Months')}</b>
                        </h6>
                        <Button
                          onClick={() => {
                            setFilters((prev) => {
                              return { ...prev, month: '' };
                            });
                          }}
                          className='red-link text-decoration-no m-0'
                        >
                          {t('Clear')}
                        </Button>
                      </div>
                      <Form.Select
                        value={filters.month}
                        onChange={(e) =>
                          handleFilterChange('month', e.target.value)
                        }
                        className='category-select'
                        name='category'
                        aria-label='Default select example'
                      >
                        <option value={''}>{t('All Months')}</option>
                        <option value={0}>January</option>
                        <option value={1}>February</option>
                        <option value={2}>March</option>
                        <option value={3}>April</option>
                        <option value={4}>May</option>
                        <option value={5}>June</option>
                        <option value={6}>July</option>
                        <option value={7}>August</option>
                        <option value={8}>September</option>
                        <option value={9}>October</option>
                        <option value={10}>November</option>
                        <option value={11}>December</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </div>
                <div className='spacer-30'></div>
              </Col>
              <Col xl='12' lg='12'>
                <div className='event-list-main'>
                  <h4>
                    <span>
                      <Image src={iconcalender} alt='Calender' />{' '}
                      {status.charAt(0).toUpperCase() + status.slice(1)} Events
                    </span>
                  </h4>
                  {!(topEvents && topEvents?.length > 0) && isLoading ? (
                    <div className='d-flex justify-content-center my-4'>
                      <Spinner />
                    </div>
                  ) : topEvents && topEvents?.length > 0 ? (
                    topEvents.map((event: ListEvent, index: number) => {
                      return (
                        <div className='event-list-post' key={index}>
                          <div className='txt-pnl'>
                            <h5>{event.date}</h5>
                            <Link href={`/event-details?eventId=${event.id}`}>
                              <h6>{event.title}</h6>
                            </Link>
                            <Link
                              className='p-link'
                              href={`/event-details?eventId=${event.id}`}
                            >
                              <p className='event-description'>
                                {event.shortDescription}
                              </p>
                            </Link>
                            {/* <p>
                              Are you ready to embark on a journey of discovery
                              and learning? Don't miss the WikiExpo SYDNEY 2023,
                              the premier event for knowledge enthusiasts!
                            </p> */}
                            <div className='flex-div-xs align-items-center'>
                              {(event && event?.applyTicket.length != 0) ? (
                                <Link
                                  className='red-link'
                                  href={event ? `${event.applyTicket}` : '#'}
                                  target='_blank'
                                >
                                  {t('Apply for discount ticket here!')}
                                </Link>
                              ) :
                                <span></span>}
                              <div>
                                {(event && event?.freeTicket.length != 0) ?
                                  <Link
                                    className='reg-btn white-grey '
                                    href={event ? `${event?.freeTicket}` : '#'}
                                    target='_blank'
                                  >
                                    <Image src={icongift} alt='Calender' /> {t('Free Ticket')}
                                  </Link>
                                  : <span>
                                  </span>}
                                {(event && event?.website.length != 0) && <Link
                                  className='reg-btn bluebg'
                                  href={event.website}
                                  target='_blank'
                                >
                                  {t('Visit Website')}
                                </Link>}
                              </div>
                            </div>
                          </div>
                          <div className='img-pnl'>
                            <Link
                              style={{
                                position: 'relative',
                                width: '100%',
                                margin: '0 auto',
                                aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                              }}
                              href={`/event-details?eventId=${event.id}`}
                            >
                              <Image src={event.image} fill alt='Post' />
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className='text-center'>
                      {t('No Events Found')}
                    </p>
                  )}
                </div>
              </Col>

              <Col xl='12' lg='12'>
                <div className='spacer-20'></div>
                <div className='text-center'>
                  {moreEvents && (
                    <Button
                      onClick={getMoreEvents}
                      className='reg-btn yellow auto'
                    >
                      Load More
                    </Button>
                  )}
                </div>
              </Col>
              <Row>
                <Col xl='12' lg='12'>
                  <div className='spacer-20'></div>

                  <h4>
                    {' '}
                    <Image src={iconevent} alt='Post' />{t('Event News and Press Release')}
                  </h4>

                  <div className='spacer-20'></div>
                </Col>
              </Row>
              <div className='press-release-post-container mob-maring-cent'>
                <Row>
                  {articleLoading && (
                    <div className='d-flex justify-content-center'>
                      {' '}
                      <Spinner />
                    </div>
                  )}
                  {articlesList.length != 0 &&
                    articlesList.map((item: any, index: string) => {
                      return (
                        <Col xl='4' lg='6' md='6'>
                          <div className='Featured-Post max  auto'>
                            <div
                              className='Featured-Post-inner'
                              style={{ height: '340px' }}
                            >
                              <div className='img-pnl new d-flex align-items-center bg-dark'>
                                <Link
                                  href={item[1].isStatic ? `${ARTICLE_STATIC_PATH + item[0].id}` : `/article?articleId=${item[0]}`}
                                  style={{
                                    aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                                    position: 'relative',
                                  }}
                                >
                                  <Image
                                    src={
                                      item[1].image ? item[1].image : smallpost1
                                    }
                                    alt='Post'
                                    fill
                                  />
                                  <h2>News</h2>
                                </Link>
                              </div>
                              <div className='txt-pnl'>
                                <h5 style={{ overflow: 'visible' }}>
                                  {item[1].title}
                                </h5>
                                <p className='d-flex'>
                                  <span>
                                    {/* <Image src={logo} alt='logo' /> */}
                                    <Link
                                      href={`/profile?userId=${item[0]}`}
                                      className='mylink'
                                    >
                                      <Image
                                        src={
                                          item[1].user.profileImg.length != 0
                                            ? item[1].user.profileImg
                                            : logo
                                        }
                                        alt='logo'
                                        className='myimg'
                                        height={100}
                                        width={100}
                                      />
                                    </Link>
                                  </span>{' '}
                                  News By{' '}
                                  <b>
                                    <Link
                                      href={`/profile?userId=${item[1].userId}`}
                                      className='mylink'
                                      style={{ fontSize: '14px' }}
                                    >
                                      {item[1].user.name}
                                    </Link>
                                  </b>
                                </p>
                                <div className='d-flex justify-content-center'>
                                  <Link
                                    href={item[1].isStatic ? `${ARTICLE_STATIC_PATH + item[0].id}` : `/article?articleId=${item[0]}`}
                                    style={{ width: '270px' }}
                                  >
                                    Read More
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              </div>
              <div className='press-release-post-container mob-maring-cent'>
                <Row>
                  {pressReleaseList.length != 0 &&
                    pressReleaseList.map((item: any, index: number) => {
                      return (
                        <Col xl='4' lg='6' md='6' key={index}>
                          <div className='Featured-Post max  auto'>
                            <div
                              className='Featured-Post-inner'
                              style={{ height: '340px' }}
                            >
                              <div className='img-pnl new d-flex align-items-center bg-dark'>
                                <Link
                                  href={item[1].isStatic ? `${ARTICLE_STATIC_PATH + item[0].id}` : `/article?articleId=${item[0]}`}
                                  style={{
                                    aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                                    position: 'relative',
                                  }}
                                >
                                  <Image
                                    src={
                                      item[1].image ? item[1].image : smallpost1
                                    }
                                    alt='Post'
                                    fill
                                  />
                                  <h2> {t('Press Release')}</h2>
                                </Link>
                              </div>
                              <div className='txt-pnl'>
                                <h5 style={{ overflow: 'visible' }}>
                                  {item[1].title}
                                </h5>
                                <p className='d-flex'>
                                  <span>
                                    {/* <Image src={logo} alt='logo' /> */}
                                    <Link
                                      href={`/profile?userId=${item[0]}`}
                                      className='mylink'
                                    >
                                      <Image
                                        src={
                                          item[1].user.profileImg.length != 0
                                            ? item[1].user.profileImg
                                            : logo
                                        }
                                        alt='logo'
                                        className='myimg'
                                        height={100}
                                        width={100}
                                      />
                                    </Link>
                                  </span>{' '}
                                  {t('Press Release by')}{' '}
                                  <b>
                                    <Link
                                      href={`/profile?userId=${item[1].userId}`}
                                      className='mylink'
                                    >
                                      {item[1].user.name}
                                    </Link>
                                  </b>
                                </p>
                                <div className='d-flex justify-content-center'>
                                  <Link
                                    href={item[1].isStatic ? `${ARTICLE_STATIC_PATH + item[0].id}` : `/article?articleId=${item[0]}`}
                                    style={{ width: '270px' }}
                                  >
                                    Read More
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
