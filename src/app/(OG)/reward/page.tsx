'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Button, Modal, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import inifinity from '@/assets/Img/coin-image.png';
import inifinity2 from '@/assets/Img/infinity.png';
import Image from 'next/image';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import Link from 'next/link';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { usePathname, useRouter } from 'next/navigation';
import logger from '@/lib/logger';
import { formatLikesCount, utcToLocal } from '@/components/utils/utcToLocal';
import { makeEntryActor, makeUserActor } from '@/dfx/service/actor-locator';
import { canisterId as entryCanisterId } from '@/dfx/declarations/entry';
import {
  E8S,
  GAS_FEE,
  MIN_REWARD_CLAIM,
  MIN_REWARD_CLAIM_ICP,
} from '@/constant/config';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import updateBalance from '@/components/utils/updateBalance';
import updateReward from '@/components/utils/updateReward';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { exponentialToDecimal } from '@/components/utils/NOExponentional';

export default function Reward() {
  const [rewards, setRewards] = useState<any>();
  const [likeReward, setLikeReward] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState<any>();
  const [userVerification, setUserVerification] = useState<any | null>();
  const [unlaimedRewards, setUnClaimedRewards] = useState<any>();
  const [claimableICP, setClaimableICP] = useState(0);
  const { t, changeLocale } = useLocalization(LANG);
  const [totallRewardFont, setTotallRewardFont] = useState(2.5);
  const [oneCoinVal, setCoinVal] = useState(0);

  const [totallClaimedFont, setTotallClaimedFont] = useState(2.5);
  const [totallUnclaimedRewardFont, setTotallUnclaimedRewardFont] =
    useState(2.5);
  const [rewardAmount, setRewardAmount] = useState({
    all: 0,
    claimed: 0,
    unclaimed: 0,
  });

  const [chartData, setChartData] = useState({
    labels: ['Total Rewards', 'Total Claimed', 'Total unClaimed'],
    datasets: [
      {
        backgroundColor: ['#348BFB', '#FFE544', '#FFAA7A'],
        hoverBackgroundColor: ['#348BFB', '#FFE544', '#FFAA7A'],
        data: [0, 0, 0],
      },
    ],
  });
  const { auth, setAuth, identity, principal, setReward, setBalance } =
    useConnectPlugWalletStore((state: any) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      identity: state.identity,
      principal: state.principal,
      setReward: state.setReward,
      setBalance: state.setBalance,
    }));

  const router = useRouter();
  const pathname = usePathname();

  const entryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });

  const handleShow = () => {
    if (!userVerification)
      return toast.error(t('You have to verify your profile to claim rewards'));

    if (claimableICP < MIN_REWARD_CLAIM_ICP) {
      return toast.error(
        `${t('You need to have atleast')} ${MIN_REWARD_CLAIM_ICP} ${t(
          'unclaimed rewards in ICP to claim them, Current Amount:'
        )} ${exponentialToDecimal(claimableICP)}`
      );
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    if (isClaiming) return;

    setShowModal(false);
  };
  const getUser = async (res?: any) => {
    let tempUser = null;
    if (res) {
      tempUser = await res.get_user_details([]);
    } else {
      tempUser = await auth.actor.get_user_details([]);
    }
    if (tempUser?.ok) {
      const tempRewards = tempUser?.ok[1].rewards;
      setUserVerification(tempUser?.ok[1].isVerified);
      setRewards(tempRewards.reverse());
      const claimedArray = [];
      const unClaimedArray = [];
      let allAmount = 0;
      let claimedAmount = 0;
      let unClaimedAmount = 0;
      for (let i = 0; i < tempRewards.length; i++) {
        const reward = tempRewards[i];
        const amount = Number(reward.amount);
        allAmount += amount;
        if (reward.isClaimed) {
          claimedArray.push(reward);
          claimedAmount += amount;
        } else {
          unClaimedAmount += amount;
          unClaimedArray.push(reward);
        }
      }
      setRewardAmount({
        all: allAmount,
        claimed: claimedAmount,
        unclaimed: unClaimedAmount,
      });
      let reward =await getNFTCoinVal();
      if(reward){
        logger(unClaimedAmount *reward,"sadsaasdasdasunClaimedAmount")
        setClaimableICP(unClaimedAmount *reward);
      }
     
      // const claimedRewards = tempRewards.filter((reward: any) => {
      //   return reward.isClaimed;
      // });
      // const unClaimedRewards = tempRewards.filter((reward: any) => {
      //   return !reward.isClaimed;
      // });
      setClaimedRewards(claimedArray);
      setUnClaimedRewards(unClaimedArray);
      logger({ tempRewards, unClaimedArray, claimedArray });

      // updateImg(tempUser.ok[1].profileImg[0]);
    }
  };
  const userActor = makeUserActor({
    agentOptions: {
      identity,
    },
  });
  const getNFTCoinVal = async () => {
    if (!identity || auth.state !== 'initialized') return;

    const temponeCoinValue = await userActor.get_NFT24Coin();

    let amount = Number(temponeCoinValue)/E8S;
    const expandedForm = Number(amount.toExponential()).toFixed(20);
    // scientificNotation.toFixed(20)
    logger({expandedForm},"dsfsfasdfsfa");

setCoinVal(amount);
return amount;
  };
  // chart conig
  let ifNoVal = {
    labels: ['No Rewards'],
    datasets: [
      {
        backgroundColor: ['#c0c0c0'],
        hoverBackgroundColor: ['#c0c0c0'],
        data: [0.000000001],
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            logger(context, 'context');
            if (context) {
              const label = context.label || '';
              const value = context.parsed;

              // Display small values without exponential notation
              const formattedValue = value.toFixed(8);

              return ` ${formattedValue}`;
            }
          },
        },
      },
    },
  };
  const handleClaim = async () => {
    if (auth.state !== 'initialized' || !identity) return;
    if (claimableICP < MIN_REWARD_CLAIM_ICP) {
      return toast.error(
        `${t('You need to have atleast')} ${MIN_REWARD_CLAIM_ICP} ${t(
          'unclaimed rewards in ICP to claim them, Current Amount:'
        )} ${claimableICP}`
      );
    }
    try {
      setIsClaiming(true);
      const claim = await auth.actor.claim_rewards(entryCanisterId);
      getUser();
      logger(claim,"claimclaim")
      toast.success(t('You have successfully claimed your rewards'));
      updateBalance({ identity, setBalance, auth });
      updateReward({ identity, setReward, auth });
      setIsClaiming(false);
      handleModalClose();
    } catch (err) {
      setIsClaiming(false);
      handleModalClose();
    }
  };
  let claimableReward = rewardAmount.unclaimed;
  let gasFee = GAS_FEE / E8S;
  useEffect(() => {
    if (auth.state === 'anonymous') {
      router.push('/');
      // setIsOwner(false);
    } else if (auth.state !== 'initialized') {
    } else {
      getUser();
    getNFTCoinVal()
      
    }
  }, [auth, pathname]);

  useEffect(() => {
    const getLikeR = async () => {
      const tempLike = await entryActor.get_like_reward();
      const likeR = parseInt(tempLike);
      setLikeReward(likeR / E8S);
    };
    if (identity && auth.state === 'initialized') {
      getLikeR();

    }
  }, [auth, identity, pathname]);
  useEffect(() => {
    setChartData({
      labels: ['Total Rewards', 'Total Claimed', 'Total Unclaimed'],
      datasets: [
        {
          backgroundColor: ['#348BFB', '#FFE544', '#FFAA7A'],
          hoverBackgroundColor: ['#348BFB', '#FFE544', '#FFAA7A'],
          data: [
            rewardAmount ? rewardAmount.all : 0,
            rewardAmount ? rewardAmount.claimed : 0,
            rewardAmount ? rewardAmount.unclaimed : 0,
          ],
        },
      ],
    });
    if (rewards) logger(rewards, 'test');
  }, [rewardAmount]);
  ChartJS.register(ArcElement, Tooltip);
  useEffect(() => {
    let all = rewardAmount.all.toString();
    let claimed = rewardAmount.claimed.toString();
    let unclaimed = rewardAmount.unclaimed.toString();

    if (all.length <= 9) {
      setTotallRewardFont(2.1);
    } else if (all.length <= 11) {
      setTotallRewardFont(1.7);
    } else if (all.length <= 15) {
      setTotallRewardFont(1.3);
    } else if (all.length <= 17) {
      setTotallRewardFont(1);
    } else {
      setTotallRewardFont(0.85);
    }

    if (claimed.length <= 9) {
      setTotallClaimedFont(2.1);
    } else if (claimed.length <= 11) {
      setTotallClaimedFont(1.7);
    } else if (claimed.length <= 15) {
      setTotallClaimedFont(1.3);
    } else if (claimed.length <= 17) {
      setTotallClaimedFont(1);
    } else {
      setTotallClaimedFont(0.85);
    }

    if (unclaimed.length <= 9) {
      setTotallUnclaimedRewardFont(2.1);
    } else if (unclaimed.length <= 11) {
      setTotallUnclaimedRewardFont(1.7);
    } else if (unclaimed.length <= 15) {
      setTotallUnclaimedRewardFont(1.3);
    } else if (claimed.length <= 17) {
      setTotallUnclaimedRewardFont(1);
    } else {
      setTotallUnclaimedRewardFont(0.85);
    }
  }, [rewardAmount]);
  return (
    <>
      <main id='main'>
        <div className='main-inner home'>
          <Head>
            <title>{t('Hi')}</title>
          </Head>
          <div className='section' id='top'>
            <Row>
              <Col xl='12' lg='12' md='12'>
                <div className='spacer-20'></div>
                <Row>
                  <Col xl='12' lg='12' md='12'>
                    <div className='flex-div-sm align-items-center'>
                      <div>
                        <h2>{t('my rewards')}</h2>
                        <div className='spacer-20'></div>
                      </div>
                      <div className='d-flex flex-column align-items-end rewardbtn'>
                        <Button
                          onClick={handleShow}
                          disabled={isClaiming}
                          className='blue-button sm'
                        >
                          {t('Claim Rewards')} ({formatLikesCount(claimableReward)}
                          <Image
                            src={inifinity}
                            alt='inifinity'
                            style={{ height: '24px', width: '24px' }}
                          />
                          )
                        </Button>
                        <p className='text-secondary mt-2'>
                          {t('* The minimum requirement for claiming is')}{' '}
                          {MIN_REWARD_CLAIM_ICP}{' '}
                          {t('ICP worth of unclaimed rewards')}
                        </p>
                        <div className='spacer-20'></div>
                      </div>
                    </div>
                  </Col>
                  <Col xl='4' lg='6' md='6'>
                    <div
                      className='total-reward-panel'
                      style={{ backgroundColor: '#348BFB' }}
                    >
                      <h3>{t('Total Rewards')}</h3>
                      <div className='flex-div-xs align-items-center'>
                        <Image src={inifinity} alt='inifinity' />
                        <p
                          className='reward-text'
                          style={{ fontSize: `${totallRewardFont}rem ` }}
                        >
                          {/* {rewards && rewards.length ? rewards.length : '0'} */}
                          {formatLikesCount(rewardAmount.all ?? 0)}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p
                          style={{
                            color: '#348BFB',
                          }}
                        >
                          .
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col xl='4' lg='6' md='6'>
                    <Link
                      href='#'
                      className='total-reward-panel'
                      style={{ backgroundColor: '#FFE544' }}
                    >
                      <h3>{t('Total Claimed')}</h3>
                      <div className='flex-div-xs align-items-center'>
                        <Image src={inifinity} alt='inifinity' />
                        <p
                          className='reward-text'
                          style={{ fontSize: `${totallClaimedFont}rem ` }}
                        >
                          {/* {claimedRewards ? claimedRewards.length : 0} */}
                          {formatLikesCount(rewardAmount?.claimed ?? 0)}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p>---------</p>
                      </div>
                    </Link>
                  </Col>
                  <Col xl='4' lg='6' md='6'>
                    <div
                      className='total-reward-panel'
                      style={{ backgroundColor: '#FFAA7A' }}
                    >
                      <h3>{t('Total Unclaimed')}</h3>
                      <div className='flex-div-xs align-items-center'>
                        <Image src={inifinity} alt='inifinity' />
                        <p
                          className='reward-text'
                          style={{
                            fontSize: `${totallUnclaimedRewardFont}rem `,
                          }}
                        >
                          {/* 0 */}
                          {formatLikesCount(rewardAmount.unclaimed ?? 0)}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p>---------</p>
                      </div>
                    </div>
                  </Col>
                  <Col xl='4' lg='6' md='6'>
                    <div className='total-pnl' style={{ paddingTop: '10px' }}>
                      {/* <Image src={Circle} alt='Circle' /> */}
                      <div className='d-flex justify-content-center ghContainer'>
                        {rewards && rewards.length == 0 ? (
                          <div style={{ height: '100%' }}>
                            <Doughnut data={ifNoVal} />
                          </div>
                        ) : (
                          <div style={{ height: '100%' }}>
                            <Doughnut data={chartData} options={options} />
                          </div>
                        )}
                      </div>
                      <ul className='total-toal-list '>
                        <li>
                          <span style={{ backgroundColor: '#348BFB' }}></span>{' '}
                          {t('Total Rewards')}
                        </li>
                        <li>
                          <span style={{ backgroundColor: '#FFE544' }}></span>{' '}
                          {t('Total Claimed')}
                        </li>
                        <li>
                          <span style={{ backgroundColor: '#FFAA7A' }}></span>{' '}
                          {t('Total Unclaimed')}
                        </li>
                      </ul>
                    </div>
                  </Col>
                  {/* <Col xl='12' lg='12' md='12'>
                    <div className='spacer-20'></div>
                  </Col> */}
                  <Col xl='8' lg='12' md='12'>
                    <div className='table-container'>
                      <div
                        className='table-container-inner sm'
                        style={{ borderRadius: '20px' }}
                      >
                        <div className='reward-table-panl'>
                          <div className='reward-tabel'>
                            <div className='reward-table-head'>
                              <Row>
                                <Col xs='4'>{t('Transaction')}</Col>
                                <Col xs='2'>{t('Amount')}</Col>
                                <Col xs='2'>{t('date')}</Col>
                                <Col xs='2'>{t('Time')}</Col>
                                <Col xs='2'>{t('Action')}</Col>
                              </Row>
                            </div>
                            <div className='reward-table-body'>
                              {rewards && rewards?.length > 0 ? (
                                rewards?.map((reward: any, index: number) => (
                                  <Row key={index}>
                                    <Col xs='4'>
                                      {reward.creation_time.toString()}
                                    </Col>
                                    <Col xs='2'>
                                    
                                             <Tippy
                          content={
                            <div>
                              <p className='m-0'>
                              {exponentialToDecimal(Number(reward.amount)* oneCoinVal)} ICP
                              </p>
                            </div>
                          }
                        >
                          <p className='m-0'>
                          {reward.amount
                                        ? exponentialToDecimal(Number(reward.amount)* oneCoinVal).length>5?`${exponentialToDecimal(Number(reward.amount)* oneCoinVal).toString().slice(0,4)}...${exponentialToDecimal(Number(reward.amount)* oneCoinVal).toString().slice(-1)}`:exponentialToDecimal(Number(reward.amount)* oneCoinVal)
                                        : 0}{' '} ICP
                          </p>
                        </Tippy>
                                     
                                    </Col>
                                    <Col xs='2'>
                                      {/* 20-05-2023{' '} */}
                                      {utcToLocal(
                                        reward.creation_time.toString(),
                                        'DD-MM-YYYY'
                                      )}
                                    </Col>
                                    <Col xs='2'>
                                      {
                                        // 09:06 AM
                                        utcToLocal(
                                          reward.creation_time.toString(),
                                          'hh:mm A'
                                        )
                                      }
                                    </Col>
                                    <Col xs='2'>
                                      {reward.isClaimed ? (
                                        <Tippy
                                          content={
                                            <div>
                                              {utcToLocal(
                                                reward?.claimed_at[0]?.toString(),
                                                'DD-MM-yyyy hh:mm A'
                                              )}
                                            </div>
                                          }
                                        >
                                          <span>{t('Claimed')}</span>
                                        </Tippy>
                                      ) : (
                                        t('UnClaimed')
                                      )}
                                    </Col>
                                  </Row>
                                ))
                              ) : (
                                <p className='mt-3 text-center'>
                                  {t('No Rewards found')}
                                </p>
                              )}

                              <div style={{ height: 300 }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='spacer-30'></div>
                  </Col>
                  {/* <Col xl='4' lg='6' md='12'>
                    <div className='total-pnl'>
                      {/* <Image src={Circle} alt='Circle' /> */}
                  {/* <div className='d-flex justify-content-center'>

                    
                     {(rewards && rewards.length == 0) ? <Doughnut data={ifNoVal} />:<div style={{width:'200px'}}><Doughnut data={chartData} /></div> }
                     </div>
                      <ul className='total-toal-list'>
                        <li>
                          <span style={{ backgroundColor: '#348BFB' }}></span>{' '}
                          Total Rewards
                        </li>
                        <li>
                          <span style={{ backgroundColor: '#FFE544' }}></span>{' '}
                          Total Claimed
                        </li>
                        <li>
                          <span style={{ backgroundColor: '#FFAA7A' }}></span>{' '}
                          Recent Rewards
                        </li>
                      </ul>
                    </div>
                  </Col> */}
                </Row>
                {/* <div className='pbg-pnl text-left'></div> */}
              </Col>
            </Row>
          </div>
        </div>
      </main>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body>
          <>
            <div className='flex-div connect-heading-pnl mb-3'>
              {/* <i className='fa fa-question-circle-o'></i> */}
              <p></p>
              <p className='text-bold h5 fw-bold m-0'>{t('Claim Rewards')}</p>
              {/* <i onClick={handleModalClose} className='fa fa-close'></i> */}
              <i
                style={{
                  cursor: 'pointer',
                }}
                onClick={handleModalClose}
                className='fa fa-close'
              ></i>
              {/* <Button
                  className='close-btn'
                ></Button> */}
            </div>
            <div>
              <p className='text-center'>
                {t('Are you sure you want to claim')} {claimableReward}{' '}
                {t('rewards ?')}
              </p>

              <p className='text-secondary mb-1'>
                <span
                  style={{
                    border: '2px',
                  }}
                >
                  {t('Reward:')} {claimableReward}
                </span>
              </p>
              <p className='text-secondary mb-1'>
                <span
                  style={{
                    border: '2px',
                  }}
                >
                  {t('Amount in ICP:')} {claimableICP} ICP
                </span>
              </p>
              <p className='text-secondary mb-0'>
                {t('Transaction fee:')} {gasFee} ICP
              </p>
              <div
                style={{
                  height: 1,
                  backgroundColor: 'gray',
                  width: '40%',
                }}
              ></div>
              <p className='text-secondary mt-1 mb-0'>
                {t('Total:')}
                {(claimableICP - gasFee).toFixed(8)} ICP
              </p>
            </div>
            <div className='d-flex justify-content-center'>
              <Button
                className='publish-btn'
                disabled={isClaiming || isClaiming}
                onClick={handleClaim}
                // type='submit'
              >
                {isClaiming ? <Spinner size='sm' /> : t('Confirm')}
              </Button>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}
