'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import comment from '@/assets/Img/Icons/icon-writer.png';
import comment_JP from '@/assets/Img/Icons/icon-writer_JP.png';
import { useConnectPlugWalletStore } from '@/store/useStore';
import logger from '@/lib/logger';
import { makeEntryActor } from '@/dfx/service/actor-locator';
import ExportPost from '@/components/ExportPost/ExportPost';
import ActivityTab from '@/components/ActivityTab';
import ExportPodcast from '@/components/ExportPodcast/ExportPodcast';
import { getImage, iframeimgThumbnail } from '@/components/utils/getImage';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';

export default function ProfileTabs({
  userId,
  isOwner,
}: {
  userId: any;
  isOwner: boolean;
}) {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [userEntries, setUserEntries] = useState<any[]>([]);
  const [userPodcast, setUserPodcast] = useState<any[]>([]);
  const { t, changeLocale } = useLocalization(LANG);
  const [activeTab, setActiveTab] = useState<any>("Articles");
  const articleTabName = t('Articles');
  const activityTabName = t('activity');
  const PodcastTabName = t('Podcast');

  const tabs = [
    activityTabName,
    articleTabName,
    PodcastTabName,
    t('Comments'),
    t('Favorite Posts '),
    t('Favorite product Communities'),
  ];
  const [isLoading, setIsLoading] = useState(false);
  // const { isBlack } = useThemeStore((state) => ({
  //   isBlack: state.isBlack,
  // }));
  const handleClose = () => { };
  const divRef = useRef<HTMLDivElement | null>(null);
  const { auth, identity } = useConnectPlugWalletStore((state) => ({
    auth: state.auth,
    identity: state.identity,
  }));
  const getUserEntries = async (category?: string | null) => {
    try {
      const entryActor = makeEntryActor({
        agentOptions: {
          identity,
        },
      });
      const tempEntries = await entryActor.getUserEntries(userId);
      setUserEntries(tempEntries);
      // setEntries(tempEntries[0][1]);
      // setEntryId(tempEntries[0][0]);
    } catch (err) {
      logger(err);
    }
  };
  const getUserPodcast = async (category?: string | null) => {
    try {
      const entryActor = makeEntryActor({
        agentOptions: {
          identity,
        },
      });
      const tempEntries = await entryActor.getUserPodcast(userId);
      // setUserEntries(tempEntries);
      logger(tempEntries, 'getUserPodcast');
      setUserPodcast(tempEntries);
      if (tempEntries.length != 0) {
        for (let index = 0; index < tempEntries.length; index++) {
          if (tempEntries[index][1].podcastVideoLink != '') {
            tempEntries[index][1].image = iframeimgThumbnail(
              tempEntries[index][1].podcastVideoLink
            );
          } else if (tempEntries[index][1].podcastImg.length != 0) {
            tempEntries[index][1].image = getImage(
              tempEntries[index][1].podcastImg[0]
            );
          } else {
            tempEntries[index][1].image = comment;
          }
        }
      } else {
        setUserPodcast([]);
      }
      // setEntries(tempEntries[0][1]);
      // setEntryId(tempEntries[0][0]);
    } catch (err) {
      logger(err);
    }
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current) {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.pageX - divRef.current.offsetLeft);
      setScrollLeft(divRef.current.scrollLeft);
    }
  };
  const handleTabChange = (tab: string | null) => {
    logger(tab, "sdisOwner")
    setActiveTab(tab)
    if (tab === articleTabName) {
      if (auth.state === 'initialized') {
        getUserEntries();
      }
    }
    if (tab === PodcastTabName) {
      if (auth.state === 'initialized') {
        getUserPodcast();
      }
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      const x = e.pageX - divRef.current!.offsetLeft;
      const walk = (x - startX) * 2; // You can adjust the scrolling speed
      divRef.current!.scrollLeft = scrollLeft - walk;
    }
  };

  const scrollForward = () => {
    if (divRef.current) {
      const scrollAmount = 200; // You can adjust this value
      const maxScroll = divRef.current.scrollWidth - divRef.current.clientWidth;

      // Calculate the new scroll position
      const newScroll = scrollPosition + scrollAmount;

      if (newScroll >= maxScroll) {
        // If we reach the end, reset the scroll position
        setScrollPosition(-100);
      } else {
        setScrollPosition(newScroll);
      }

      // Set the new scroll position
      divRef.current.scrollLeft = newScroll;
    }
  };
  const backword = () => {
    if (divRef.current) {
      const scrollAmount = -200; // You can adjust this value
      const maxScroll = divRef.current.clientWidth - divRef.current.scrollWidth;

      // Calculate the new scroll position
      const newScroll = scrollAmount - scrollPosition;

      if (newScroll <= maxScroll) {
        // If we reach the end, reset the scroll position
        setScrollPosition(100);
      } else {
        setScrollPosition(newScroll);
      }

      // Set the new scroll position
      divRef.current.scrollLeft = newScroll;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  // router.push('/route')

  useEffect(() => {
    // if (auth.state === 'initialized') {
    getUserEntries();
    getUserPodcast();
    // }
    // logger(userId);
  }, [auth, userId]);
  useEffect(() => {
    logger(isOwner, "sdisOwner")
    if (isOwner) {
      setActiveTab(activityTabName)
    }
  }, [isOwner])

  return (
    <>
      <Tab.Container
        id='left-tabs-example'
        defaultActiveKey={"Articles"}
        onSelect={handleTabChange}
        activeKey={activeTab}
      >
        <Row>
          <Col sm={12} className='d-flex'>
            <ul className='tabs-list filter'>
              <li>
                <Link
                  href={'#'}
                  onClick={(e) => {
                    e.preventDefault();
                    backword();
                  }}
                  className='arrow-link'
                >
                  <i className='fa fa-angle-left'></i>
                </Link>
              </li>
            </ul>
            <Nav
              variant='tabs'
              className='tabs-fill scrollable-tabs'
              ref={divRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {tabs.map((tab, index) => {
                return tab === activityTabName ? (
                  isOwner ? (
                    <Nav.Item key={index}>
                      <Nav.Link style={{ whiteSpace: 'nowrap' }} eventKey={tab}>
                        {tab}
                      </Nav.Link>
                    </Nav.Item>
                  ) : null
                ) : (
                  <Nav.Item key={index}>
                    <Nav.Link style={{ whiteSpace: 'nowrap' }} eventKey={tab}>
                      {tab}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
              {/* {categories &&
                categories?.map((cate, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={cate}>{cate}</Nav.Link>
                    </Nav.Item>
                  );
                })} */}

              {/* <Nav.Item>
                <Nav.Link eventKey='second'>Tab 2</Nav.Link>
              </Nav.Item> */}
            </Nav>
            <ul className='tabs-list filter'>
              <li>
                <Link
                  href={'#'}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollForward();
                  }}
                  className='arrow-link'
                >
                  <i className='fa fa-angle-right'></i>
                </Link>
              </li>
            </ul>
            {/* <ul className='tabs-list filter'>
              <li>
                <Link
                  href={'#'}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollForward();
                  }}
                  className='arrow-link'
                >
                  <i className='fa fa-angle-right'></i>
                </Link>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle id='dropdown-basic'>
                    <Image src={iconfilter} alt='Icon Filter' /> Filter
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-2'>
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href='#/action-3'>
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul> */}
          </Col>
          <Col sm={12}>
            <Tab.Content>
              {tabs.map((c, i) => {
                if (c == activityTabName) {
                  return isOwner ? (
                    <Tab.Pane key={i} eventKey={c}>
                      <div>
                        <ActivityTab />
                      </div>
                    </Tab.Pane>
                  ) : null;
                } else if (c == PodcastTabName) {
                  return (
                    <Tab.Pane key={i} eventKey={c}>
                      <div>
                        {c !== PodcastTabName ? (
                          <div className='profile-comment-pnl'>
                            {LANG === 'en' ?
                              <Image src={comment} alt='comment' />
                              : <Image src={comment_JP} alt={t('comments')} style={{ opacity: 0.4 }} />
                            }
                          </div>
                        ) : (
                          <div className='profile-articles mt-3'>
                            {userPodcast.length == 0 && (
                              <div className='profile-comment-pnl'>
                                {LANG === 'en' ?
                                  <Image src={comment} alt='comment' />
                                  : <Image src={comment_JP} alt={t('comments')} style={{ opacity: 0.4 }} />
                                }
                              </div>
                            )}
                            {userPodcast &&
                              userPodcast.map((entry) => {
                                return (
                                  <ExportPodcast
                                    key={entry[0]}
                                    entry={entry[1]}
                                    entryId={entry[0] as string}
                                  />
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </Tab.Pane>
                  );
                } else {
                  return (
                    <Tab.Pane key={i} eventKey={c}>
                      <div>
                        {c !== articleTabName ? (
                          <div className='profile-comment-pnl'>
                            {LANG === 'en' ?
                              <Image src={comment} alt='comment' />
                              : <Image src={comment_JP} alt={t('comments')} style={{ opacity: 0.4 }} />
                            }
                          </div>
                        ) : (
                          <div className='profile-articles mt-3'>
                            {userEntries.length == 0 && (
                              <div className='profile-comment-pnl'>
                                {LANG === 'en' ?
                                  <Image src={comment} alt='comment' />
                                  : <Image src={comment_JP} alt={t('comments')} style={{ opacity: 0.4 }} />

                                }

                              </div>
                            )}
                            {userEntries &&
                              userEntries.map((entry) => {
                                return (
                                  <ExportPost
                                    key={entry[0]}
                                    entry={entry[1]}
                                    entryId={entry[0] as string}
                                  />
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </Tab.Pane>
                  );
                }
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
