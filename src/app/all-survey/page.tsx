'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Spinner, Breadcrumb } from 'react-bootstrap';
import { makeEntryActor } from '@/dfx/service/actor-locator';
import { ConnectPlugWalletSlice } from '@/types/store';
import { useConnectPlugWalletStore } from '@/store/useStore';
import logger from '@/lib/logger';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { usePathname, useRouter } from 'next/navigation';
import ServayListComponent from '@/components/ServayComponents/ServayListComponent';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import { ALL_SURVEY_ROUTE_USER } from '@/constant/routes';
const itemsPerPage = 10;
export default function QuizListPage() {
  const { auth, userAuth, identity } = useConnectPlugWalletStore((state) => ({
    auth: (state as ConnectPlugWalletSlice).auth,
    userAuth: (state as ConnectPlugWalletSlice).userAuth,
    identity: (state as ConnectPlugWalletSlice).identity,
  }));

  const [search, setSearch] = useState('');
  const [servaySize, setServaySize] = useState(0);
  const [isGetting, setIsGetting] = useState(true);
  const [servayList, setServayList] = useState<any[]>([]);
  const [forcePaginate, setForcePaginate] = useState(0);
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  let tempEntryId = searchParams.get('entryId');
  const router = useRouter();
  let pageCount = Math.ceil(servaySize / itemsPerPage);
  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });

  async function getServayList(reset?: boolean) {
    setIsGetting(true);
    const searched = reset ? '' : search;
    let entryId: any = tempEntryId ? [tempEntryId] : [];
    //isActiveList value 1 for active ,2 for non active and 0 for all
    let isActiveList: any = 0;
    const resp = await entryActor.getServayList_for_auther(
      entryId,
      isActiveList,
      searched,
      0,
      itemsPerPage
    );

    const servaylist = resp.entries;
    const servaylistLength = parseInt(resp.amount);
    setServaySize(servaylistLength);
    setServayList(servaylist);
    setIsGetting(false);
    logger({ servaylist }, '43434fgdfgdfgf');
  }

  const location = usePathname();
  let language;

  const changeLang = () => {
    if (LANG === 'jp') {
      if (location) {
        language = location.includes('super-admin/') ? 'en' : 'jp';
      }
    } else {
      language = 'en';
    }
  };
  const funcCalling = changeLang();
  const { t, changeLocale } = useLocalization(language);

  const handlePageClick = async (event: any) => {
    setIsGetting(true);

    setForcePaginate(event.selected);
    // setItemOffset(newOffset);
    // if ()
    let list: any = [];
    const newOffset = (event.selected * itemsPerPage) % servaySize;
    let entryId: any = tempEntryId ? [tempEntryId] : [];

    //isActiveList value 1 for active ,2 for non active and 0 for all
    let isActiveList: any = 0;
    const resp = await entryActor.getServayList_for_auther(
      entryId,
      isActiveList,
      search,
      newOffset,
      itemsPerPage
    );
    logger(resp, 'quizlist');

    list = resp.entries;
    setServayList(list);

    setIsGetting(false);
  };
  function handleSearch(reset?: boolean) {
    setForcePaginate(0);
    getServayList(reset);
  }
  useEffect(() => {
    if (tempEntryId) {
      getServayList();
    }
  }, [tempEntryId]);
  useEffect(() => {
    if (auth.state === 'initialized') {
      getServayList();
    } else if (auth.state === 'anonymous') {
      router.replace('/');
    }
  }, [userAuth, auth]);
  return (
    <>
      <main id='main' className='dark'>
        <div className='main-inner admin-main'>
          <div className='section admin-inner-pnl' id='top'>
          <Col xl='12' lg='12' md='12'>
                <Breadcrumb className='new-breadcrumb web'>
                  <Breadcrumb.Item>
                    <Link href='/'>
                      <i className='fa fa-home' />
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link href={ALL_SURVEY_ROUTE_USER}>{'Manage-Survey'}</Link>
                  </Breadcrumb.Item>
                
                </Breadcrumb>
              </Col>
            <Row>
              <Col xl='9' lg='12' className='text-left'>
                <h1>{t('All Survey')}</h1>
                <div className='spacer-20' />
              </Col>
              <Col xl='12' lg='12' md='12' className='mt-2 mb-4'>
                <div className='full-div text-right-md'>
                  <div className='search-post-pnl'>
                    <input
                      type='text'
                      placeholder={t('Search Survey')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                    />
                    {search.length >= 1 && (
                      <button
                        onClick={() => {
                          setSearch('');
                          handleSearch(true);
                        }}
                      >
                        <i className='fa fa-xmark mx-1' />
                      </button>
                    )}
                    <button onClick={() => handleSearch()}>
                      <i className='fa fa-search' />
                    </button>
                  </div>
                </div>
              </Col>
              <Col xxl='12'>
                {isGetting ? (
                  <div className='d-flex justify-content-center w-full'>
                    <Spinner />
                  </div>
                ) : servayList.length > 0 ? (
                  <ServayListComponent
                    servayList={servayList}
                    reGetFn={getServayList}
                  />
                ) : (
                  <p className='text-center'>{t('No Survey Found')}</p>
                )}
                <div className='pagination-container mystyle d-flex justify-content-end'>
                  {servayList.length > 0 && (
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
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </main>
    </>
  );
}
