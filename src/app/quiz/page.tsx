'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Form, Button, Table, Modal, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, FormikProps, FormikValues } from 'formik';
import { makeEntryActor } from '@/dfx/service/actor-locator';
import { ConnectPlugWalletSlice } from '@/types/store';
import { useConnectPlugWalletStore } from '@/store/useStore';
import logger from '@/lib/logger';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { usePathname, useRouter } from 'next/navigation';
import { number, object, string } from 'yup';
import { toast } from 'react-toastify';
import { canisterId as userCanisterId } from '@/dfx/declarations/user';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';

function QuizListComponent({
  QuizList,
  reGetFn,
}: {
  QuizList: any[];
  reGetFn: any;
}) {
  const [quizId, setQuizId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { identity } = useConnectPlugWalletStore((state) => ({
    identity: (state as ConnectPlugWalletSlice).identity,
  }));
  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });

  let routes: {
    QuizPost: string;
  } = {
    QuizPost: '/take-quiz',
  };

  return (
    <>
      <Col xl='12' lg='12' md='12'>
        <div className='full-div'>
          <div className='table-container lg'>
            <div className='table-inner-container'>
              <Table striped hover className='article-table'>
                <thead>
                  <tr>
                    <th>
                      <p>Title</p>
                    </th>
                    <th>
                      <p>Duration</p>
                    </th>
                    <th>
                      <p>Question</p>
                    </th>

                    <th className='centercls'>
                      <p>Action</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {QuizList.map((item: any) => {
                    let quiz = item[1];
                    let id = item[0];
                    let questionCount = 0;
                    let quizDuration = 0;

                    if (quiz?.questionCount) {
                      questionCount = parseInt(quiz?.questionCount);
                    }
                    if (quiz?.duration) {
                      quizDuration = parseInt(quiz?.duration);
                    }

                    return (
                      <tr key={id}>
                        <td className='category-item'>
                          <p>
                            {quiz.title.length > 20
                              ? quiz.title.slice(0, 20) + '...'
                              : quiz.title}
                          </p>{' '}
                        </td>
                        <td>{quizDuration}m</td>

                        <td>{questionCount}</td>

                        <td className='centercls'>
                          <Link
                            href={{ pathname: '/take-quiz', query: { id: id } }}
                          >
                            <Button
                              className={`reg-btn fill bg-fix trackbtn ms-1 addQuestionBtn`}
                            >
                              Take Quiz
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}

const itemsPerPage = 10;
export default function QuizListPage() {
  const { auth, userAuth, identity } = useConnectPlugWalletStore((state) => ({
    auth: (state as ConnectPlugWalletSlice).auth,
    userAuth: (state as ConnectPlugWalletSlice).userAuth,
    identity: (state as ConnectPlugWalletSlice).identity,
  }));
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [QuizSize, setQuizSize] = useState(0);
  const [isGetting, setIsGetting] = useState(true);
  const [quizList, setQuizList] = useState<any[]>([]);
  const [forcePaginate, setForcePaginate] = useState(0);
  const router = useRouter();
  let pageCount = Math.ceil(QuizSize / itemsPerPage);
  const handleShow = () => {
    setShowModal(true);
  };

  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });

  async function getQuizList(reset?: boolean) {
    setIsGetting(true);
    const searched = reset ? '' : search;
    let quizId: any = [];
    const resp = await entryActor.getQuizList(
      quizId,
      searched,
      0,
      itemsPerPage
    );
    logger(resp, 'asfafsdgdsf');

    const quizlist = resp.entries;
    const quizlistLength = parseInt(resp.amount);
    setQuizSize(quizlistLength);
    setQuizList(quizlist);
    setIsGetting(false);
  }
  const handlePageClick = async (event: any) => {
    setIsGetting(true);

    setForcePaginate(event.selected);
    // setItemOffset(newOffset);
    // if ()
    let list: any = [];
    const newOffset = (event.selected * itemsPerPage) % QuizSize;
    let quizId: any = [];
    const resp = await entryActor.getQuizList(
      quizId,
      search,
      newOffset,
      itemsPerPage
    );
    logger(resp, 'quizlist');

    list = resp.entries;
    setQuizList(list);

    setIsGetting(false);
  };
  function handleSearch(reset?: boolean) {
    setForcePaginate(0);
    getQuizList(reset);
  }

  useEffect(() => {
    if (auth.state === 'initialized') {
      getQuizList();
    } else if (auth.state === 'anonymous') {
      router.replace('/');
    }
  }, [auth]);

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
  return (
    <>
      <main id='main' className='dark'>
        <div className='main-inner admin-main'>
          <div className='section admin-inner-pnl' id='top'>
            <Row>
              <Col xl='12' lg='12' md='12' className='mt-2 mb-4'>
                <div className='full-div text-right-md'>
                  <div className='search-post-pnl'>
                    <input
                      type='text'
                      placeholder='Search Quiz'
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
                ) : quizList.length > 0 ? (
                  <QuizListComponent
                    QuizList={quizList}
                    reGetFn={getQuizList}
                  />
                ) : (
                  <p className='text-center'>{t('No Quiz Found')}</p>
                )}
                <div className='pagination-container mystyle d-flex justify-content-end'>
                  {quizList.length > 0 && (
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
