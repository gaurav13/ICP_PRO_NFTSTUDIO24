'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Tab, Nav, Table, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import comment from '@/assets/Img/Icons/icon-writer.png';
import { useConnectPlugWalletStore } from '@/store/useStore';
import logger from '@/lib/logger';
import proimg from '@/assets/Img/promoted-icon.png';
import {
  makeCommentActor,
  makeEntryActor,
  makeUserActor,
} from '@/dfx/service/actor-locator';
import ExportPost from '@/components/ExportPost/ExportPost';
import { Activity, RefinedActivity } from '@/types/profile';
import pressicon from '@/assets/Img/Icons/icon-press-release.png';
import { utcToLocal } from '@/components/utils/utcToLocal';
import ReactPaginate from 'react-paginate';
import Tippy from '@tippyjs/react';
import PodcastSVG from '@/components/podcastSVG/Podcastsvg';
import { profileAspect } from '@/constant/sizes';
import useLocalization from "@/lib/UseLocalization"
import { LANG } from '@/constant/language';
import { ARTICLE_STATIC_PATH, Podcast_STATIC_PATH } from '@/constant/routes';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// const articleTabName = 'Articles';
// const activityTabName = 'Activity';
// const tabs = [
//   activityTabName,
//   'Comments',
//   'Favorite Posts',
//   'Favorite product Communities',
//   articleTabName,
// ];

export default function ActivityTab({ }: {}) {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myActivity, setMyActivity] = useState<RefinedActivity[]>([]);
  const [tempmyActivity, setTempMyActivity] = useState<any>([]);

  const [forcePaginate, setForcePaginate] = useState(0);
  const { t, changeLocale } = useLocalization(LANG);

  const articleTabName = t('Articles');
  const activityTabName = t('activity');

  const tabs = [
    activityTabName,
    articleTabName,
    t('Comments'),
    t('Favorite Posts '),
    t('Favorite product Communities'),
  ];

  // const { isBlack } = useThemeStore((state) => ({
  //   isBlack: state.isBlack,
  // }));
  const { auth, identity } = useConnectPlugWalletStore((state) => ({
    auth: state.auth,
    identity: state.identity,
  }));
  const activityActor = makeCommentActor({
    agentOptions: {
      identity,
    },
  });
  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });
  const userActor = makeUserActor({
    agentOptions: {
      identity,
    },
  });
  let itemsPerPage = 10;

  const pageCount = Math.ceil(tempmyActivity.length / itemsPerPage);
  // let endIndex =
  //   forcePaginate === 0
  //     ? itemsPerPage
  //     : (forcePaginate * itemsPerPage) % myActivity.length;
  let startIndex = forcePaginate * itemsPerPage;

  let currentItems = myActivity;
  // logger({ currentItems, myActivity, startIndex }, 'THESEEE');
  const refineActivity = (activity: Activity): RefinedActivity => {
    const refinedActivity: RefinedActivity = {
      message: '',
      time: '',
      date: '',
      title: '',
      target: '',
      isPromoted: false,
      pressRelease: false,
      isPodcast: false,
      isWeb3: false,
      shoudRoute :false,
      isStatic:false
    };
    if (activity.activity_type.hasOwnProperty('subscribe')) {
      refinedActivity.message = 'You subscribed to a User';
      refinedActivity.title = activity.title;
    } else if (activity.activity_type.hasOwnProperty('create_podcats')) {
      refinedActivity.message = 'You created a Podcast';
      refinedActivity.title = activity.title;
      refinedActivity.isPodcast = true;
    } else if (activity.activity_type.hasOwnProperty('create_pressRelease')) {
      refinedActivity.message = 'You created a Press Release';
      refinedActivity.title = activity.title;
      refinedActivity.pressRelease = true;
      refinedActivity.isStatic = activity.isStatic;
      
    } else if (activity.activity_type.hasOwnProperty('like_web3')) {
      refinedActivity.message = 'You liked a Company';
      refinedActivity.title = activity.title;
      refinedActivity.isWeb3 = true;
    } else if (activity.activity_type.hasOwnProperty('create_web3')) {
      refinedActivity.message = 'You created a Company';
      refinedActivity.title = activity.title;
      refinedActivity.isWeb3 = true;
    } else if (activity.activity_type.hasOwnProperty('comment')) {
      refinedActivity.message = 'You commented on an Article';
      refinedActivity.title = activity.title;
      refinedActivity.isStatic = activity.isStatic;
    } else if (activity.activity_type.hasOwnProperty('comment_podcats')) {
      refinedActivity.message = 'You commented on a Podcast';
      refinedActivity.title = activity.title;
      refinedActivity.isPodcast = true;
      refinedActivity.isStatic = activity.isStatic;
    } else if (activity.activity_type.hasOwnProperty('delete_podcats')) {
      refinedActivity.message = 'You deleted a Podcast';
      refinedActivity.title = activity.title;
      refinedActivity.isPodcast = true;
      refinedActivity.isStatic = activity.isStatic;
    } else if (activity.activity_type.hasOwnProperty('delete_article')) {
      refinedActivity.message = 'You deleted an Article';
      refinedActivity.title = activity.title;
      refinedActivity.isStatic = activity.isStatic;
    } else if (activity.activity_type.hasOwnProperty('delete_pressRelease')) {
      refinedActivity.message = 'You deleted a Press Release';
      refinedActivity.title = activity.title;
      refinedActivity.isStatic = activity.isStatic;
      refinedActivity.pressRelease = true;
    } else if (activity.activity_type.hasOwnProperty('comment_pressRelease')) {
      refinedActivity.message = 'You commented on a Press Release';
      refinedActivity.title = activity.title;
      refinedActivity.pressRelease = true;
      refinedActivity.isStatic = activity.isStatic;
    }
    else if (activity.activity_type.hasOwnProperty('promote')) {
      refinedActivity.message = 'You promoted an article';
      refinedActivity.title = activity.title;
      refinedActivity.pressRelease = false;
      refinedActivity.isPodcast = false;
      refinedActivity.isPromoted = true;
      refinedActivity.isStatic = activity.isStatic;

    } else if (activity.activity_type.hasOwnProperty('like')) {
      if (activity.isPodcast) {
        refinedActivity.message = 'You liked a Podcast';
        refinedActivity.title = activity.title;
        refinedActivity.isPodcast = true;
        refinedActivity.isStatic = activity.isStatic;
      } else {
        if (activity.pressRelease) {
          refinedActivity.message = 'You liked a Press Release';
          refinedActivity.title = activity.title;
          refinedActivity.pressRelease = true;
          refinedActivity.isStatic = activity.isStatic;
        } else {
          refinedActivity.message = 'You liked an Article';
          refinedActivity.title = activity.title;
          refinedActivity.isStatic = activity.isStatic;
        }
      }
    } else if (activity.activity_type.hasOwnProperty('create')) {
      refinedActivity.message = activity.isPromoted
        ? 'You Promoted an Article'
        : 'You created an Article';
      refinedActivity.title = activity.title;
      refinedActivity.isStatic = activity.isStatic;
    }

    refinedActivity.isWeb3 = activity.isWeb3;
    // refinedActivity.isPodcast=activity.isPodcast;

    refinedActivity.target = activity.target;
    refinedActivity.isPromoted = activity.isPromoted;
    // refinedActivity.pressRelease = activity.pressRelease;
    refinedActivity.time = utcToLocal(activity.time.toString(), 'hh:mm A');
    refinedActivity.date = utcToLocal(activity.time.toString(), 'DD-MM-yyyy');
    refinedActivity.shoudRoute=activity.shoudRoute;
    return refinedActivity;
  };
  let paginatedActivities = async (
    startIndex: any = 0,
    tempmyActivity: any
  ) => {
    let activities = tempmyActivity.slice(startIndex, startIndex + 10);

    for (const activity of activities) {
      if (activity.activity_type.hasOwnProperty('subscribe')) {
        let user = await userActor.get_user_details([activity.target]);
        if (user.ok) {
          activity.title = user.ok[1].name;
        }
      } else if (
        activity.activity_type.hasOwnProperty('create_web3') ||
        activity.activity_type.hasOwnProperty('like_web3')
      ) {
        let entry = await entryActor.getWeb3(activity.target);
        if (entry.length > 0) {
          activity.title = entry[0].company;
          activity.isWeb3 = true;
          activity.shoudRoute = true;
        } else {
          // activity.title = 'not-found';
          activity.isWeb3 = true;
          activity.shoudRoute = false;
        }
      } else {
        let entry = await entryActor.getEntry(activity.target);
        if (entry.length > 0) {
          activity.title = entry[0].title;
          activity.isPromoted = entry[0].isPromoted;
          activity.pressRelease = entry[0].pressRelease;
          activity.isPodcast = entry[0].isPodcast;
          activity.shoudRoute = true;
          activity.isStatic=entry[0].isStatic; 


          // if (entry[0].)
        } else {
          // activity.title = 'not-found';
          if (activity.activity_type.hasOwnProperty('comment_pressRelease')) {
            activity.pressRelease = true;
            activity.isPromoted = false;
          } else if (activity.activity_type.hasOwnProperty('comment_podcats')) {
            activity.isPodcast = true;
            activity.isPromoted = false;
          } else if (activity.activity_type.hasOwnProperty('comment_podcats')) {
            activity.isPodcast = true;
            activity.isPromoted = false;
          } else if (activity.activity_type.hasOwnProperty('promote')) {
            activity.pressRelease = false;
            activity.isPodcast = false;
            activity.isPromoted = true;
          } else {
            activity.pressRelease = false;

            activity.isPromoted = false;
          };
          activity.shoudRoute = false;
        }
      }
    }
    let refinedActivities: [RefinedActivity] = activities.map(
      (activity: Activity) => {
        return refineActivity(activity);
      }
    );
    setIsLoading(false);
    setMyActivity(refinedActivities);
  };
  const testimg = async () => {
    const myActivities = await activityActor.getActivities();

    if (myActivities.ok) {
      let activities = myActivities.ok[0];
      let tempact = [...activities];
    } else {
    }
  };
  const getActivities = async () => {
    const myActivities = await activityActor.getActivities();
    testimg();

    if (myActivities.ok) {
      let activities = myActivities.ok[0];
      setTempMyActivity(activities);
      paginatedActivities(0, activities);
    } else {
      setIsLoading(false);
    }
  };
  const handlePageClick = async (event: any) => {
    setForcePaginate(event.selected);
    let startIndex = event.selected * itemsPerPage;
    paginatedActivities(startIndex, tempmyActivity);
  };
  useEffect(() => {
    // let endIndex = (forcePaginate * itemsPerPage) % myActivity.length;
    // currentItems = myActivity.slice(forcePaginate, endIndex);
  }, [myActivity]);
  useEffect(() => {
    // if (auth.state === 'initialized') {
    // logger(userId);
    if (auth.state === 'initialized') {
      getActivities();
    }
  }, [auth]);
  useEffect(() => {
    if (auth.state === 'initialized') {
      getActivities();
    }
  }, []);
let openLink=(link:any)=>{
  router.push(link);
}
  return (
    <div>
      <div
        className='profile-comment-pnl m-0 p-0'
        style={{ boxShadow: 'none' }}
      >
        {currentItems?.length > 0 ? (
          <div className='table-container'>
            <div className='table-container-inner '>
              <Table className='activity-table small mb-0'>
                <thead>
                  <tr>
                    <th>
                      <p>{t('Activities')}</p>
                    </th>
                    <th>
                      <p>{t('date')}</p>
                    </th>
                    <th>
                      <p>Time</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((activity: RefinedActivity, index) => (
                    <tr key={index}>
                      <td>
                        <div className='d-inline-flex align-items-start'>
                          {activity.message ?? ''}
                          {activity.isPromoted && (
                            <Tippy
                              content={<p className='mb-0'>{t('Promoted Article')}</p>}
                            >
                              <Image
                                src={proimg}
                                alt='promoted icon'
                                height={15}
                                width={15}
                                className='ms-1 mx-2 mt-1'
                              />
                            </Tippy>
                          )}
                          {activity?.pressRelease && (
                            <Tippy
                              content={<p className='mb-0'> {t('Press Release')}</p>}
                            >
                              <Image
                                src={pressicon}
                                alt='pressicon'
                                className='ms-1'
                                style={{ width: 22, height: 22 }}
                              />
                            </Tippy>

                            // <span className='publish-btn table-btn'>
                            //   promotedIcon
                            // </span>
                          )}
                          {activity?.isPodcast && (
                            <Tippy content={<p className='mb-0'>Podcast</p>}>
                              <div
                                className='position-relative ms-1'
                                style={{
                                  aspectRatio: profileAspect,
                                  width: '20px',
                                }}
                              >
                                <PodcastSVG />
                              </div>
                            </Tippy>

                            // <span className='publish-btn table-btn'>
                            //   promotedIcon
                            // </span>
                          )}
                          <Link
                          onClick={(e)=>{
                            e.preventDefault();
                            if(activity.shoudRoute){

                            
                            if(activity.message == 'You subscribed to a User'){
                              openLink(`/profile?userId=${activity.target}`)

                            }else if(activity.isPodcast){
                              openLink(activity.isStatic?`${Podcast_STATIC_PATH+activity.target}`:`/podcast?podcastId=${activity.target}`);
                            }else if(activity.isWeb3){
                              openLink(`/directory?directoryId=${activity.target}`);
                            }else{
                              openLink(activity.isStatic?`${ARTICLE_STATIC_PATH+activity.target}`:`/article?articleId=${activity.target}`);
                            }
                          }
                          }}
                            href="#"
                            className='ms-1'
                            style={{cursor:activity.shoudRoute?"pointer":"not-allowed"}}
                          >
                            {' '}
                            {activity.title.length < 20
                              ? activity.title
                              : `${activity.title.slice(0, 30)}...` ?? ''}
                          </Link>
                        </div>
                      </td>
                      <td>{activity.date ?? ''}</td>
                      <td>{activity.time ?? ''}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          <div className='my-3'>
            {isLoading ? (
              <Spinner />
            ) : (
              <p className='h5 m-0'>No Recent Activity Found</p>
            )}
          </div>
        )}
      </div>
      <div className='d-flex justify-content-end mt-2'>
        <div className='pagination-container' style={{ width: 'auto' }}>
          <ReactPaginate
            breakLabel='...'
            nextLabel=''
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel=''
            renderOnZeroPageCount={null}
            forcePage={forcePaginate}
          />
        </div>
      </div>
    </div>
  );
}
