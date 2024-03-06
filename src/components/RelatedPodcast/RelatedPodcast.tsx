import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import smallpost1 from '@/assets/Img/Posts/Small-Post-4.png';
import logger from '@/lib/logger';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { makeEntryActor, makeUserActor } from '@/dfx/service/actor-locator';
import { getImage, iframeimgThumbnail } from '@/components/utils/getImage';
import { ARTICLE_FEATURED_IMAGE_ASPECT } from '@/constant/sizes';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import { Podcast_STATIC_PATH } from '@/constant/routes';
interface MyComponentProps {
  catagorytype: string[];
}

let RelatedPodcast: React.FC<MyComponentProps> = ({ catagorytype }) => {
  const [entriesByCategory, setEntriesByCategory] = useState([]);

  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  const podcastId = searchParams.get('podcastId');
  const { identity } = useConnectPlugWalletStore((state) => ({
    identity: state.identity,
  }));
  const getEntriesList = async (selectedCategory?: string) => {
    const categ = selectedCategory;
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    const userAcotr = makeUserActor({
      agentOptions: {
        identity,
      },
    });
    const resp = await entryActor.getPodcastList(categ, false, '', 0, 4);
    const tempList = resp.entries;
    let filterd = tempList.filter((e: any) => e[0] != podcastId);
    let tempentries = [];
    if (filterd.length > 3) {
      const firstitems = filterd.slice(0, 3);
      tempentries = firstitems;
      // setEntriesByCategory(firstitems);
    } else {
      tempentries = filterd;
      // setEntriesByCategory(filterd);
    }
    if (tempentries.length != 0) {
      for (let entry = 0; entry < tempentries.length; entry++) {
        let newUser = null;
        var authorId = tempentries[entry][1].user.toString();
        newUser = await userAcotr.get_user_details([authorId]);
        if (newUser.ok) {
          tempentries[entry][1].userName = newUser.ok[1].name;
          // entriesList[entry][1].image = await updateImg(
          //   entriesList[entry][1].image
        }
        setEntriesByCategory(tempentries);
      }
      logger(tempList, 'podcastList');
      return tempList;
    }
  };
  useEffect(() => {
    if (catagorytype) {
      getEntriesList(catagorytype[0]);
    }
  }, [catagorytype, podcastId]);
  return (
    <>
      {entriesByCategory.length == 0 && (
        <div className=''>
          <p className='fs-5 text-center'>No related Podcast</p>
        </div>
      )}
      {entriesByCategory &&
        entriesByCategory.map((entry: any, index) => {
          let dateformat = (t: any) => {
            const date = new Date(Number(t));
            return date.toDateString();
          };
          let image = null;
          if (entry[1].podcastVideoLink != '') {
            image = iframeimgThumbnail(entry[1].podcastVideoLink);
          }
          if (entry[1].podcastImg.length != 0) {
            image = getImage(entry[1].podcastImg[0]);
          }
          return (
            <div className='related-post' key={index}>
              <div className='related-post-inner'>
                <div className='img-pnl'>
                  <Link
                    href={entry[1]?.isStatic?`${Podcast_STATIC_PATH+entry[0]}`:`/podcast?podcastId=${entry[0]}`}
                    className='img-wrapper'
                    style={{ aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT }}
                  >
                    <Image
                      src={image ? image : smallpost1}
                      // style={{height:"194px",width: "259px"}}
                      fill
                      alt='Post'
                    />
                    {/* <div
                      dangerouslySetInnerHTML={{ __html: entry[1].podcastVideoLink }}
                      style={{ height: '100%', width: '100%',pointerEvents:"none" }}
                    /> */}
                  </Link>
                </div>
                <div className='txt-pnl'>
                  <Link
                    href={entry[1]?.isStatic?`${Podcast_STATIC_PATH+entry[0]}`:`/podcast?podcastId=${entry[0]}`}
                    className='rmLine'
                  >
                    {entry[1].title}
                  </Link>
                  <span>
                    <Link
                      href={`/profile?userId=${entry[1].user.toString()}`}
                      className='rmLine'
                    >
                      by {entry[1].userName}
                    </Link>
                  </span>
                  <span>{dateformat(entry[1].creation_time)}</span>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default RelatedPodcast;
