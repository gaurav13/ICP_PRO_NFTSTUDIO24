import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Spinner, Table } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import loader from '@/assets/Img/Icons/icon-loader.png';
import arrows from '@/assets/Img/Icons/icon-arrows.png';
import post1 from '@/assets/Img/Posts/small-post-10.png';
import promotedIcon from '@/assets/Img/promoted-icon.png';
import { utcToLocal } from '@/components/utils/utcToLocal';
import Tippy from '@tippyjs/react';
import logger from '@/lib/logger';
import { usePathname, useRouter } from 'next/navigation';
import pressicon from '@/assets/Img/Icons/icon-press-release.png';
import { makeEntryActor } from '@/dfx/service/actor-locator';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { canisterId as userCanisterId } from '@/dfx/declarations/user';
import { canisterId as commentCanisterId } from '@/dfx/declarations/comment';
import { toast } from 'react-toastify';
import PodcastSVG from '@/components/podcastSVG/Podcastsvg';
import { profileAspect } from '@/constant/sizes';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import { handleAdminDeleteEntry } from '@/components/utils/admindeleteEntry';
import { openLink } from '@/components/utils/localStorage';
import { ARTICLE_STATIC_PATH, Podcast_STATIC_PATH } from '@/constant/routes';

function ViewsInput({
  views,
  id,
  entryActor,
  isWeb3,
}: {
  views: number;
  id: string;
  entryActor: any;
  isWeb3: boolean;
}) {
  const [inputValue, setInputValue] = useState<number>(views);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const intNumber = Math.floor(event.target.valueAsNumber);
    setInputValue(intNumber);
  };
  let changeArticleView = async () => {
    const resp = await entryActor.editViews(
      id,
      inputValue,
      userCanisterId,
      commentCanisterId
    );
    return resp;
  };
  let changeWeb3View = async () => {
    const resp = await entryActor.editWeb3Views(
      id,
      inputValue,
      userCanisterId,
      commentCanisterId
    );
    return resp;
  };
  const hanldeViewChange = async () => {
    setIsLoading(true);
    let resp = null;
    if (isWeb3) {
      resp = await changeWeb3View();
    } else {
      resp = await changeArticleView();
    }

    if (resp) {
      toast.success('Views Updated Successfully');
    } else {
      toast.error('Error while updating views');
    }

    setIsLoading(false);
  };

  return (
    <div className='d-flex align-items-start flex-column justify-content-center gap-1'>
      <input
        type='number'
        className='form-control'
        placeholder={isWeb3 ? 'Web3 Views' : 'Article Views'}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        className='publish-btn td'
        onClick={hanldeViewChange}
        disabled={isLoading || !inputValue || inputValue <= 0 ? true : false}
      >
        {isLoading ? <Spinner size='sm' /> : 'Change'}
      </Button>
    </div>
  );
}

export function ArticlesList({
  currentItems,
  currentTab,
  handleTabChange,
  views,
  isCompany,
  refetchfn,
  isAdmin,
}: {
  currentItems: any[];
  currentTab: string;
  handleTabChange?: any;
  views?: boolean;
  isCompany?: boolean;
  refetchfn?: any;
  isAdmin?: boolean;
}) {
  const location = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { t, changeLocale } = useLocalization(LANG);
  const [categoryItem, setCategoryItem] = useState({
    id: '',
    name: '',
    isAdmin: false,
  });
  const { auth, userAuth, setAuth, identity } = useConnectPlugWalletStore(
    (state) => ({
      auth: state.auth,
      userAuth: state.userAuth,
      setAuth: state.setAuth,
      identity: state.identity,
    })
  );
  const router = useRouter();
  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });
  // const tooltipRef = useRef<HTMLDivElement | null>(null);
  // const boxRef = useRef<HTMLDivElement | null>(null);
  // const [showTip, setShowTip] = useState(false);

  // const { styles, attributes } = usePopper(boxRef.current, tooltipRef.current);
  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  let OpenCategory = (id: string) => {
    if (location == '/articles') {
      router.push(`/category-details?category=${id}`);
    } else {
      window.open(`/category-details?category=${id}`);
    }
  };
  const handleDelete = async () => {
    if (auth.state !== 'initialized') {
      return toast.error(
        'To perform this action, kindly connect to Internet Identity.'
      );
    }
    const defaultEntryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    setDeleting(true);
    const deletedCategory = await defaultEntryActor.deleteDraftEntry(
      categoryItem.id,
      commentCanisterId
    );
    if (deletedCategory?.ok) {
      toast.success('Draft Deleted Successfully');
      handleTabChange('Draft');
      // categories = categories.filter((category: any) => {
      //   return category[0] !== categoryItem.id;
      // });
      // setmyCategories(categories);
      // logger({ categories }, 'filtered');
      // setCategoriesSize((prev) => prev--);
      handleClose();
    } else {
      toast.error(deletedCategory?.err);
    }
    setDeleting(false);
  };
  const handleAdminDelete = async () => {
    if (auth.state !== 'initialized') {
      return toast.error(
        'To perform this action, kindly connect to Internet Identity.'
      );
    }
    if (!userAuth.userPerms?.articleManagement) {
      return toast.error('Not Allowed');
    }
    const defaultEntryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });

    let data = { id: categoryItem.id, commentCanisterId, userCanisterId };
    handleAdminDeleteEntry({
      defaultEntryActor,
      setDeleting,
      refetchfn,
      handleClose,
      data,
    });
  };

  return (
    <>
      <Col xl='12' lg='12'>
        <div className='full-div'>
          <div className='table-container lg'>
            <div className='table-inner-container'>
              <Table striped hover className='article-table'>
                <thead>
                  <tr>
                    <th>
                      <p>
                        {t('title')}{' '}
                        <Image className='arw' src={arrows} alt='arrow' />
                      </p>
                    </th>
                    <th>{t('author ')}</th>
                    <th>{t('categories')}</th>
                    <th>
                      <p>
                        {t('date')}{' '}
                        <Image className='arw' src={arrows} alt='arrow' />
                      </p>
                    </th>
                    {(currentTab === 'Minted' || currentTab === 'MyMinted') && (
                      <th>{t('minted')}</th>
                    )}
                    <th className='text-center'>
                      {views ? (
                        <div className='d-flex align-items-center justify-content-center'>
                          Views
                        </div>
                      ) : (
                        <div className='d-flex align-items-center justify-content-center'>
                          <Image src={loader} alt='loader' /> {t('status')}
                        </div>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((article) => {
                    let status = article.isDraft
                      ? 'draft'
                      : Object.keys(article.status)[0];
                    return (
                      <tr key={article.entryId}>
                        <td>
                          {status != 'approved' && !views ? (
                            <div
                              className='removeUl  category-item'
                              // style={{pointerEvents:"none"}}
                            >
                              <div
                                className='d-flex align-items-start '
                                onClick={() => {
                                  if (!isAdmin) {
                                    if (article.isDraft) {
                                      router.push(
                                        `/add-article?draftId=${article.entryId}`
                                      );
                                    } else if (article.isPodcast) {
                                      router.push(
                                        article.isStatic?`${Podcast_STATIC_PATH+article.entryId}`: `/podcast?podcastId=${article.entryId}`
                                      );
                                    } else {
                                      router.push(
                                        article.isStatic?`${ARTICLE_STATIC_PATH+article.entryId}`: `/article?articleId=${article.entryId}`
                                      );
                                    }
                                  }
                                }}
                              >
                                {article.image ? (
                                  <div
                                    style={{
                                      minWidth: 89,
                                      height: 46,
                                      position: 'relative',
                                      marginRight: 10,
                                    }}
                                  >
                                    <Image
                                      src={article.image}
                                      fill
                                      sizes='(max-width: 2000px) 89px,46px'
                                      alt='Post'
                                    />
                                  </div>
                                ) : (
                                  <Image src={post1} alt='Post' />
                                )}
                                <p style={{ maxWidth: 480 }} className='d-flex'>
                                  {article.isPromoted && (
                                    <Tippy
                                      content={
                                        <p className='mb-0'>{t("Promoted Article")}</p>
                                      }
                                    >
                                      <Image
                                        src={promotedIcon}
                                        alt='promoted'
                                        style={{ width: 22, height: 22 }}
                                      />
                                    </Tippy>

                                    // <span className='publish-btn table-btn'>
                                    //   promotedIcon
                                    // </span>
                                  )}
                                  {article.pressRelease && (
                                    <Tippy
                                      content={
                                        <p className='mb-0'>
                                          {t('Press Release')}
                                        </p>
                                      }
                                    >
                                      <Image
                                        src={pressicon}
                                        alt='pressicon'
                                        style={{ width: 22, height: 22 }}
                                      />
                                    </Tippy>

                                    // <span className='publish-btn table-btn'>
                                    //   promotedIcon
                                    // </span>
                                  )}
                                  {article.isPodcast && (
                                    <Tippy
                                      content={
                                        <p className='mb-0 '>{t('podcast')}</p>
                                      }
                                    >
                                      <div
                                        style={{
                                          aspectRatio: profileAspect,
                                          position: 'relative',
                                          width: '22px',
                                        }}
                                        className='me-1'
                                      >
                                        <PodcastSVG />
                                      </div>
                                    </Tippy>
                                  )}
                                  <p style={{ maxWidth: '300px' }}>
                                    {article.title.slice(0, 75)}
                                    {article.title.length > 75 && '...'}{' '}
                                  </p>

                                  {article.isDraft && <span>| Draft </span>}
                                </p>
                              </div>
                              <div className='item-menu mt-1'>
                                <Link
                                  href={
                                    article.isDraft
                                      ? `/add-article?draftId=${article.entryId}`
                                      : article.isPodcast
                                      ? article.isStatic?`${Podcast_STATIC_PATH+article.entryId}`: `/podcast?podcastId=${article.entryId}`
                                      : isCompany
                                      ? `/directory?directoryId=${article.entryId}`
                                      : article.isStatic?`${ARTICLE_STATIC_PATH+article.entryId}`:`/article?articleId=${article.entryId}`
                                  }
                                  target={`${
                                    location == '/articles' ? '_self' : '_blank'
                                  }`}
                                  className='removeUl'
                                >
                                  {article.isDraft ? 'Edit' : 'View'}
                                </Link>
                                <span>|</span>
                                <Button
                                  onClick={() => {
                                    handleShow();
                                    setCategoryItem({
                                      id: article.entryId,
                                      name: article.title,
                                      isAdmin: false,
                                    });
                                  }}
                                  className='removeUl text-danger'
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div
                                className='d-flex align-items-start '
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  if (!isAdmin) {
                                    if (article?.isPodcast) {
                                      router.push(
                                        article.isStatic?`${Podcast_STATIC_PATH+article.entryId}`: `/podcast?podcastId=${article.entryId}`
                                      );
                                    } else if (isCompany) {
                                      router.push(
                                        `/directory?directoryId=${article.entryId}`
                                      );
                                    } else {
                                      router.push(
                                        article.isStatic?`${ARTICLE_STATIC_PATH+article.entryId}`:`/article?articleId=${article.entryId}`
                                      );
                                    }
                                  }
                                }}
                              >
                                {article.image ? (
                                  <div
                                    style={{
                                      minWidth: 89,
                                      height: 46,
                                      position: 'relative',
                                      marginRight: 10,
                                    }}
                                  >
                                    <Image
                                      src={article.image}
                                      fill
                                      sizes='(max-width: 2000px) 89px,46px'
                                      alt='Post'
                                    />
                                  </div>
                                ) : (
                                  <Image src={post1} alt='Post' />
                                )}
                                <p style={{ maxWidth: 480 }} className='d-flex'>
                                  {article.isPromoted && (
                                    <Tippy
                                      content={
                                        <p className='mb-0'>{t("Promoted Article")}</p>
                                      }
                                    >
                                      <Image
                                        src={promotedIcon}
                                        alt='promoted'
                                        style={{ width: 22, height: 22 }}
                                      />
                                    </Tippy>

                                    // <span className='publish-btn table-btn'>
                                    //   promotedIcon
                                    // </span>
                                  )}
                                  {article.pressRelease && (
                                    <Tippy
                                      content={
                                        <p className='mb-0'>
                                          {t('Press Release')}
                                        </p>
                                      }
                                    >
                                      <Image
                                        src={pressicon}
                                        alt='pressicon'
                                        style={{ width: 22, height: 22 }}
                                      />
                                    </Tippy>

                                    // <span className='publish-btn table-btn'>
                                    //   promotedIcon
                                    // </span>
                                  )}
                                  {article.isPodcast && (
                                    <Tippy
                                      content={
                                        <p className='d-flex mb-0'>
                                          {t('podcast')}
                                        </p>
                                      }
                                    >
                                      <div
                                        style={{
                                          aspectRatio: profileAspect,
                                          position: 'relative',
                                          width: '22px',
                                        }}
                                        className='me-1'
                                      >
                                        <PodcastSVG />
                                      </div>
                                    </Tippy>
                                  )}
                                  {article.title.slice(0, 75)}
                                  {article.title.length > 75 && '...'}{' '}
                                  {article.isDraft && <span>| Draft </span>}
                                </p>
                              </div>
                              {userAuth.userPerms?.articleManagement &&
                                isAdmin && (
                                  <div className='item-menu mt-1'>
                                    <Button
                                      onClick={() => {
                                        if (article?.isPodcast) {
                                          openLink(
                                            article.isStatic?`${Podcast_STATIC_PATH+article.entryId}`:  `/podcast?podcastId=${article.entryId}`
                                          );
                                        } else if (isCompany) {
                                          openLink(
                                            `/directory?directoryId=${article.entryId}`
                                          );
                                        } else {
                                          openLink(
                                            article.isStatic?`${ARTICLE_STATIC_PATH+article.entryId}`: `/article?articleId=${article.entryId}`
                                          );
                                        }
                                      }}
                                      className='text-primary ps-0'
                                    >
                                      {'View'}
                                    </Button>
                                    <span>|</span>
                                    <Button
                                      onClick={() => {
                                        handleShow();
                                        setCategoryItem({
                                          id: article.entryId,
                                          name: article.title,
                                          isAdmin: true,
                                        });
                                      }}
                                      className='removeUl text-danger'
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                )}
                            </>
                          )}
                        </td>
                        <td>
                          <Link
                            href={
                              article.isPodcast
                                ? article.isStatic?`${Podcast_STATIC_PATH+article.entryId}`: `/podcast?podcastId=${article.entryId}`
                                : `/profile?userId=${article.userId}`
                            }
                            target={`${
                              location == '/articles' ? '_self' : '_blank'
                            }`}
                            className='removeUl'
                          >
                            <p>{article?.userName}</p>
                          </Link>
                        </td>
                        <td>
                          <Tippy
                            content={
                              article?.categories?.length > 0 ? (
                                <div className='categories'>
                                  {article.categories.map(
                                    (category: string, index: number) => (
                                      <p
                                        className='category d-inline-block'
                                        key={index}
                                      >
                                        {category}
                                        {!(
                                          index ===
                                          article.categories.length - 1
                                        ) && ', '}
                                      </p>
                                    )
                                  )}
                                </div>
                              ) : (
                                ''
                              )
                            }
                          >
                            <p
                              className='d-inline-block'
                              onClick={() =>
                                OpenCategory(article.categoriesId[0])
                              }
                              style={{ cursor: 'pointer' }}
                            >
                              {article.categories[0] + ' '}{' '}
                              {article.categories.length > 1 &&
                                '+' + (article.categories.length - 1) + ' more'}
                            </p>
                          </Tippy>
                        </td>
                        <td>
                          <span className='w-100'>Created At</span>
                          {/* 2023/11/08 at 06:52 pm */}
                          <span>
                            {utcToLocal(
                              article.creation_time,
                              'YYYY/MM/DD  hh:mm a'
                            )}
                          </span>
                        </td>
                        {(currentTab === 'Minted' ||
                          currentTab === 'MyMinted') && (
                          <td className='text-center'>
                            {/* 2023/11/08 at 06:52 pm */}
                            <span>
                              {article?.minters?.length >= 0
                                ? article?.minters?.length + 1
                                : '0'}
                            </span>
                          </td>
                        )}

                        <td className='text-center'>
                          {views ? (
                            userAuth.userPerms?.articleManagement && (
                              <ViewsInput
                                entryActor={entryActor}
                                views={parseInt(article.views)}
                                id={article.entryId}
                                isWeb3={article.isWeb3}
                              />
                            )
                          ) : (
                            <div className='d-flex align-items-center justify-content-center gap-1'>
                              <span
                                className={`circle-span m-0 ${status}`}
                              ></span>
                              <p className={`status-text ${status}`}>
                                {' '}
                                {status.replace('approved', 'minted')}
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* <tr>
                        <td>
                          <div className='d-flex align-items-start'>
                            <Image src={post2} alt='Post' />
                            <p>
                              6 NFT Projects currently popular on the Tezos
                              marketplace{' '}
                            </p>
                          </div>
                        </td>
                        <td>
                          <p>NFTStudio24</p>
                        </td>
                        <td>
                          <p>News</p>
                        </td>
                        <td>
                          <span className='w-100'>Last Modified</span>
                          <span>2023/11/08 at 06:52 pm</span>
                        </td>
                        <td className='text-center'>
                          <span className='circle-span green'></span>
                        </td>
                      </tr>
                            */}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Col>
      <Modal
        show={showModal}
        // size='md'
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <h3 className='text-center'>
            {/* Delete <i>{categoryItem.name}</i> */}
            Delete Exploring Web3 Investments: An Exclusive Interview with Yat
            Siu on Animoca Brands, Mocaverse, and Digital Property Rights
          </h3>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Entry?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='publish-btn'
            onClick={() => {
              if (
                userAuth.userPerms?.articleManagement &&
                categoryItem.isAdmin
              ) {
                handleAdminDelete();
              } else {
                handleDelete();
              }
            }}
          >
            {deleting ? <Spinner size='sm' /> : 'Delete'}
          </Button>
          <Button
            disabled={deleting}
            className='default-btn'
            onClick={handleClose}
          >
            {t('Cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
