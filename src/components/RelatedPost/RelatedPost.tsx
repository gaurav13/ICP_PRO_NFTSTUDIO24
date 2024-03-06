import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import smallpost1 from '@/assets/Img/Posts/Small-Post-4.png';
import logger from '@/lib/logger';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { makeEntryActor, makeUserActor } from '@/dfx/service/actor-locator';
import { getImage } from '@/components/utils/getImage';
import { ARTICLE_FEATURED_IMAGE_ASPECT } from '@/constant/sizes';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import useLocalization from "@/lib/UseLocalization"
import { LANG } from '@/constant/language';
import { ARTICLE_STATIC_PATH } from '@/constant/routes';

interface MyComponentProps {
  catagorytype: string[];
}

let RelatedPost: React.FC<MyComponentProps> = ({ catagorytype }) => {
  const [entriesByCategory, setEntriesByCategory] = useState([]);
  const { t, changeLocale } = useLocalization(LANG);
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  const articleId = searchParams.get('articleId');
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
    const resp = await entryActor.getEntriesList(categ, false, '', 0, 4);
    const tempList = resp.entries;
    let filterd = tempList.filter((e: any) => e[0] != articleId);
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

      logger(tempList, 'Entries List');
      return tempList;
    }
  };
  useEffect(() => {
    if (catagorytype) {
      getEntriesList(catagorytype[0]);
    }
  }, [catagorytype, articleId]);
  return (
    <>
      {entriesByCategory.length == 0 && (
        <div className=''>
          <p className='fs-5 text-center'>No {t('Related Posts')}</p>
        </div>
      )}
      {entriesByCategory &&
        entriesByCategory.map((entry: any, index) => {
          let dateformat = (t: any) => {
            const date = new Date(Number(t));
            return date.toDateString();
          };
          let image = null;
          if (entry[1].image.length != 0) {
            image = getImage(entry[1].image[0]);
          }
          return (
            <div className='related-post' key={index}>
              <div className='related-post-inner'>
                <div className='img-pnl'>
                  <Link
                    href={entry[1].isStatic?`${ARTICLE_STATIC_PATH+entry[0]}`:`/article?articleId=${entry[0]}`}
                    className='img-wrapper'
                    style={{ aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT }}
                  >
                    <Image
                      src={image ? image : smallpost1}
                      // width={100}
                      // height={60}
                      // style={{height:"194px",width: "259px"}}
                      fill
                      alt='Post'
                    />
                  </Link>
                </div>
                <div className='txt-pnl'>
                  <Link
                    href={entry[1].isStatic?`${ARTICLE_STATIC_PATH+entry[0]}`:`/article?articleId=${entry[0]}`}
                    className='rmLine'
                  >
                    {entry[1].title}
                  </Link>
                  <div>
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
            </div>
          );
        })}
      {/* <div className='related-post'>
<div className='related-post-inner'>
<div className='img-pnl'>
<Link href="/"><Image src={smallpost2} alt="Post" /></Link>
</div>
<div className='txt-pnl'>
<Link href="#">NFTs and African Art: Empowering Creativity in the
Digital Age</Link>
<p>by Michael Saturday</p>
<span>Oct 20, 2023</span>
</div>
</div>
</div>
<div className='related-post'>
<div className='related-post-inner'>
<div className='img-pnl'>
<Link href="/"><Image src={smallpost3} alt="Post" /></Link>
</div>
<div className='txt-pnl'>
<Link href="#">Announcing the Scholarship Programme for African
women by SCA x GWG</Link>
<p>by Michael Saturday</p>
<span>Oct 20, 2023</span>
</div>
</div>
</div> */}
    </>
  );
};
export default RelatedPost;
