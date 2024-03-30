'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Spinner, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Calander from '@/assets/Img/Icons/icon-calender.png';
import GiftBox from '@/assets/Img/Icons/icon-gift-box.png';
import bg from '@/assets/Img/bg.jpg';
import EventSlider from '@/components/EventSlider/EventSlider';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { makeEntryActor } from '@/dfx/service/actor-locator';
import logger from '@/lib/logger';
import { getImage } from '@/components/utils/getImage';
import post1 from '@/assets/Img/placeholder-img.jpg';
import { utcToLocal } from '@/components/utils/utcToLocal';
import parse from 'html-react-parser';
import { ARTICLE_FEATURED_IMAGE_ASPECT } from '@/constant/sizes';
import { TopEvent } from '@/types/article';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import Tippy from '@tippyjs/react';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import MyComponent from '@/components/testingMap/MapTesting';
import { GOOGLEMAP_URL } from '@/constant/routes';

export default function EventDetails({ eventId }: { eventId: string }) {
  const { t, changeLocale } = useLocalization(LANG);
  const { auth, setAuth, identity, articleHeadingsHierarchy } =
    useConnectPlugWalletStore((state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      identity: state.identity,
      articleHeadingsHierarchy: state.articleHeadingsHierarchy,
    }));
  let [event, setEvent] = useState<any>(null);
  const urlparama = useSearchParamsHook();
  const [isLoading, setIsLoading] = useState(false);
  const [topEvents, setTopEvents] = useState<null | TopEvent[]>();
  const [search, setSearch] = useState('');
  const getEvent = async () => {
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    if (eventId) {
      const tempEntry = await entryActor.get_event(eventId);

      logger(tempEntry, 'tempEvent');
      if (tempEntry.length != 0) {
        tempEntry[0].image = await getImage(tempEntry[0].image);
        tempEntry[0].date = utcToLocal(
          tempEntry[0].date.toString(),
          'MMM D, YYYY'
        );
        tempEntry[0].endDate = utcToLocal(
          tempEntry[0].endDate.toString(),
          'MMM D, YYYY'
        );
        setEvent(tempEntry[0]);
      }
    }
  };
  async function getEvents(reset?: boolean) {
    let searched = reset ? '' : search;
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    const resp = await entryActor.get_events(searched, 0, 6, [], [], []);
    setIsLoading(true);
    const unEvents = resp.entries;
    logger(unEvents, 'evedgfdsg');
    if (unEvents.length > 0) {
      const refinedEvents = unEvents.map((raw: any) => {
        const unEvent = raw[1];
        const image = getImage(unEvent.image);
        const date = utcToLocal(unEvent.date.toString(), 'MMM D, YYYY');
        const endDate = utcToLocal(unEvent.endDate.toString(), 'MMM D, YYYY');

        const refinedEvent: TopEvent = {
          id: raw[0],
          title: unEvent.title,
          date: date,
          endDate,
          image,
          shortDescription: unEvent.shortDescription,
          freeTicket: unEvent.freeTicket,
          applyTicket: unEvent.applyTicket,
          lat: unEvent.lat,
          lng: unEvent.lng,
          isStatic: unEvent.isStatic,
        };
        return refinedEvent;
      });
      if (refinedEvents.length > 6) {
        setTopEvents(refinedEvents.slice(0, 6));
      } else {
        setTopEvents(refinedEvents);
      }
      setTopEvents(refinedEvents);
    } else {
      setTopEvents(null);
    }
    setIsLoading(false);
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getEvents();
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  useEffect(() => {
    if (auth.state == 'anonymous' || auth.state === 'initialized') getEvent();
  }, [eventId, auth]);
  let openMapFn = (id: string) => {
    let link = GOOGLEMAP_URL + id;
    window.open(link);
  };
  return (
    <>
      <main id='main'>
        <div className='main-inner event-detail-page'>
          <div className='inner-content'>
            <Row>
              <Col xl='12' lg='12' md='12'>
                <Breadcrumb className='new-breadcrumb web'>
                  <Breadcrumb.Item>
                    <Link href='/'>
                      <i className='fa fa-home'></i>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    <Link href='/events'>{t('Events')}</Link>
                  </Breadcrumb.Item>
                  {event && (
                    <Breadcrumb.Item active>
                      <Tippy
                        content={event.title.length != 0 ? event.title : ''}
                      >
                        <Link
                          href='/'
                          style={{
                            pointerEvents: 'none',
                          }}
                        >
                          {event.title.length > 8
                            ? `${event.title.slice(0, 8).trim()}` + '...'
                            : event.title}
                        </Link>
                      </Tippy>
                    </Breadcrumb.Item>
                  )}
                </Breadcrumb>
              </Col>
              <Col xl='12' lg='12' md='12'>
                <div className='event-innr'>
                  <EventSlider eventList={topEvents} />
                </div>
              </Col>
            </Row>
            {event ? (
              <Row>
                <Col xl='12' lg='12' md='12'>
                  <div className='spacer-20'></div>
                  <h1>
                    <b>{event ? event.title : ''}</b>
                  </h1>
                  <div className='spacer-10'></div>
                  <h3>
                    <Image src={Calander} alt='Calander' />{' '}
                    {event ? event.date : ''}
                  </h3>
                  <div className='spacer-20'></div>
                  <div className='event-innr d-flex justify-content-center'>
                    <div
                      style={{
                        aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                        position: 'relative',
                        width: '100%',
                        maxHeight: '400px',
                        maxWidth: '800px',
                      }}
                    >
                      {/* <Image src={bg} alt='Bg' /> */}

                      <Image
                        src={event ? event.image : post1}
                        // className='backend-img'
                        fill
                        alt={`feature image`}
                      />
                    </div>
                  </div>
                  <div className='spacer-40'></div>
                  <h4>{event ? event.shortDescription : ''}</h4>
                  <div className='spacer-50'></div>
                </Col>
                <Col xl='12' lg='12' md='12'>
                  <div>
                    <p>
                      📅 <b>{t('date')}:</b> {event ? event.date : ''}
                    </p>
                    <p
                      onClick={() => {
                        openMapFn(event.location);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      📍<b>{t('Location')}: </b>
                <span className='hover'>  {event ? event.location : ''}</span>    
                    </p>
                    <p>
                      🔥 <b>{t('Event Highlights:')}</b>
                    </p>
                    {event ? parse(event.description) : ''}
                    <div className='spacer-10'></div>
                    <div className='btn-cntnr-pnl'>
                      <div>
                        {event && event?.applyTicket.length != 0 && (
                          <Link
                            href={event ? event.applyTicket : '#'}
                            target='_blank'
                            className='reg-btn bluebg'
                          >
                            {t('Get Your Tickets Now')}
                          </Link>
                        )}
                        {event && event?.discountTicket.length != 0 && (
                          <Link
                            href={event ? event.discountTicket : '#'}
                            target='_blank'
                            className='red-link mx-4'
                          >
                            {t('Apply for discount ticket here!')}
                          </Link>
                        )}
                      </div>

                      {event && event?.freeTicket.length != 0 && (
                        <Link
                          href={event ? event.freeTicket : '#'}
                          className='reg-btn red'
                          target='_blank'
                        >
                          <Image src={GiftBox} alt='Gift' /> {t('Free Ticket')}
                        </Link>
                      )}
                    </div>
                    <div className='spacer-30'></div>

                    {event && event.website.length != 0 && (
                      <p>
                        👉<b>{t('website')}:</b>{' '}
                        <Link href={`${event ? event.website : '#'}`}>
                          {' '}
                          {event ? event.website : ''}
                        </Link>
                      </p>
                    )}

                    <p>
                      {event && (
                        <ul className='post-social-list-2 d-flex flex-wrap'>
                          {event.twitter.length != 0 ? (
                            <li>
                              <Link href={event.twitter} target='_blank'>
                                <i className='fa fa-twitter'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )}
                          {event.telegram.length != 0 ? (
                            <li>
                              <Link href={event.telegram} target='_blank'>
                                <i className='fa fa-telegram'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )}
                          {event.instagram.length != 0 ? (
                            <li>
                              <Link href={event.instagram} target='_blank'>
                                <i className='fa fa-instagram'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )}
                          {event.facebook.length != 0 ? (
                            <li>
                              <Link href={event.facebook} target='_blank'>
                                <i className='fa fa-facebook'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )}
                          {event.linkdin.length != 0 ? (
                            <li>
                              <Link href={event.linkdin} target='_blank'>
                                <i className='fa fa-linkedin'></i>
                              </Link>
                            </li>
                          ) : (
                            ''
                          )}
                        </ul>
                      )}
                    </p>
                    <div className='spacer-50'></div>
                  </div>
                  <div className='details-address-panel'>
                    <Row>
                      <Col xl='4' lg='4' md='6'>
                        <h4>
                          <b>{t('DETAILS')}</b>
                        </h4>
                        <h6 className='m-0'>{t('Start Date')}:</h6>
                        <p>{event ? event.date : ''}</p>
                        <h6 className='m-0'>{t('End Date')}:</h6>
                        <p>{event ? event.endDate : ''}</p>
                        <h6 className='m-0'>{t('Event Tags')}:</h6>
                        {event &&
                          event.tags.map((e: any) => {
                            return (
                              <span className='mb-0' key={e}>
                                {e}
                              </span>
                            );
                          })}

                        <div className='spacer-20'></div>
                        {event && event.website.length != 0 ? (
                          <>
                            {' '}
                            <h6 className='m-0'>{t('website')}:</h6>
                            <Link
                              target='_blank'
                              href={event ? event.website : '#'}
                            >
                              {event ? event.website : ''}
                            </Link>
                          </>
                        ) : (
                          ''
                        )}

                        <br></br>

                        <div className='spacer-20'></div>
                      </Col>
                      <Col xl='4' lg='4' md='6'>
                        <h6>{t('VENUE')}</h6>
                        <div className='spacer-10'></div>
                        <p>{event ? event.location : ''}</p>

                        <div className='spacer-20'></div>
                      </Col>
                      <Col xl='4' lg='4' md='12'>
                        <div className='map-pnl'>
                          {event && (
                            <iframe
                              src={`https://maps.google.com/maps?q=${event.lat}, ${event.lng}&z=15&output=embed`}
                              width='100%'
                              height='400'
                              allowFullScreen={true}
                            ></iframe>
                          )}
                          <div className='d-flex justify-content-center mt-3'>
                            <Link
                              target='_blank'
                              // href={`https://google.com/maps/?q=${event.lat},${event.lng}`}
                              href={'#'}
                              onClick={(e) => {
                                e.preventDefault();
                                openMapFn(event.location);
                              }}
                            >
                              + {t('Google Map')}
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            ) : (
              <div className='d-flex justify-content-center mt-5'>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
