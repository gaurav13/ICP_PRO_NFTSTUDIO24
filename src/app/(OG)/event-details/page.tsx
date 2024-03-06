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
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
export default function EventDetails() {
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
  const searchParams = new URLSearchParams(urlparama);
  const eventId = searchParams.get('eventId');
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
      logger(tempEntry, 'unnasdf');

      // let TempDirectory = null;
      // let tempUser = tempEntry[0].user?.toString();
      // setUserId(tempUser);
      // updateImg(tempEntry[0].image, 'feature');
      // if (tempEntry[0].isCompanySelected) {
      //   let directoryGet = await entryActor.getWeb3(tempEntry[0].companyId);
      //   if (directoryGet.length != 0) {
      //     directoryGet[0].companyBanner = await updateNewImg(
      //       directoryGet[0].companyBanner
      //     );
      //     directoryGet[0].founderImage = await updateNewImg(
      //       directoryGet[0].founderImage
      //     );
      //     directoryGet[0].companyLogo = await updateNewImg(
      //       directoryGet[0].companyLogo
      //     );
      //     TempDirectory = directoryGet;
      //   }

      //   tempEntry[0].directory = TempDirectory;
      //   logger(TempDirectory, 'TempDirectory2');
      // }
      // setEntry(tempEntry[0]);
      // logger(tempEntry[0], 'Entries fetched from canister');
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
                    <Link href='/events'>Events</Link>
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
                  <div className='event-innr'>
                    <div
                      style={{
                        aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                        position: 'relative',
                        width: '100%',
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
                      📅 <b>Date:</b> {event ? event.date : ''}
                    </p>
                    <p>📍{event ? event.location : ''}</p>
                    <p>
                      🔥 <b>Event Highlights:</b>
                    </p>
                    {event ? parse(event.description) : ''}
                    <div className='spacer-10'></div>
                    <div className='btn-cntnr-pnl'>
                      {event && event?.applyTicket.length != 0 && (
                        <div>
                          <Link
                            href={event ? event.applyTicket : '#'}
                            target='_blank'
                            className='reg-btn bluebg'
                          >
                            Get Your Tickets Now
                          </Link>
                          <Link
                            href={event ? event.applyTicket : '#'}
                            target='_blank'
                            className='red-link mx-4'
                          >
                            {t('Apply for discount ticket here!')}
                          </Link>
                        </div>
                      )}

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
                    <p>
                      <Link className='text-decoration' href='#'>
                        WikiExpo Tickets
                      </Link>
                    </p>
                    <p>
                      Stay tuned for updates on speakers, sessions, and more!
                      Follow us for the latest event news and exciting
                      announcements.
                    </p>
                    <p>
                      👉<b>{t('website')}:</b>{' '}
                      <Link href={`${event ? event.website : '#'}`}>
                        {' '}
                        {event ? event.website : ''}
                      </Link>
                    </p>

                    <p>
                      👥<b>Join our LinkedIn Group:</b>{' '}
                      <Link href={`${event ? event.linkdin : '#'}`}>
                        [ {event ? event.linkdin : ''} ]
                      </Link>
                    </p>
                    <div className='spacer-50'></div>
                  </div>
                  <div className='details-address-panel'>
                    <Row>
                      <Col xl='4' lg='4' md='6'>
                        <div className='spacer-20'></div>
                        <h4>
                          <b>DETAILS</b>
                        </h4>
                        <h6 className='m-0'>Start Date:</h6>
                        <p>{event ? event.date : ''}</p>
                        <h6 className='m-0'>End Date:</h6>
                        <p>{event ? event.endDate : ''}</p>
                        <h6 className='m-0'>Event Tags:</h6>
                        {event &&
                          event.tags.map((e: any) => {
                            return (
                              <span className='mb-0' key={e}>
                                {e}
                              </span>
                            );
                          })}
                        {/* <Link href='#'>WikiExpo 2023</Link> */}
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
                        {/* </Link> */}
                        <br></br>
                        {/* <Link
                        target='_blank'
                        href='Australia/2023_EN/auexpo.html'
                      >
                        Australia/2023_EN/auexpo.html
                      </Link> */}
                        <div className='spacer-20'></div>
                      </Col>
                      <Col xl='4' lg='4' md='6'>
                        <h6>VENUE</h6>
                        <div className='spacer-10'></div>
                        <p>{event ? event.location : ''}</p>
                        <Link
                          target='_blank'
                          href='Australia/2023_EN/auexpo.html'
                        >
                          + Google Map
                        </Link>
                        <div className='spacer-20'></div>
                        <Link href='#'>View Venue Website</Link>
                        <div className='spacer-20'></div>
                      </Col>
                      <Col xl='4' lg='4' md='12'>
                        <div className='map-pnl'>
                          {/* <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8378963028213!2d151.20521737657992!3d-33.86806831902254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b9597300d6dd%3A0x85247df2880c3db5!2sThe%20Fullerton%20Hotel%20Sydney!5e0!3m2!1sen!2s!4v1705392057776!5m2!1sen!2s'
                            width='600'
                            height='450'
                            allowFullScreen={false}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                          ></iframe> */}
                          {/* {event ? (
                            <MyComponent lat={event.lat} lng={event.lng}/>
                          ) : (
                            ''
                          )} */}
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
