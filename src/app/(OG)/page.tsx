'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Dropdown, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useConnectPlugWalletStore, useThemeStore } from '@/store/useStore';
import Authenticated from '@/components/Authenticated';
import UnAuthenticated from '@/components/UnAuthenticated';
import logger from '@/lib/logger';
import ArticleShimmer from '@/components/Shimmers/ArticleShimmer';
import AuthHomeShimmer from '@/components/Shimmers/AuthHomeShimmer';

export default function HomePage() {
  const { auth, setAuth, identity, principal, emailConnected } =
    useConnectPlugWalletStore((state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      identity: state.identity,
      principal: state.principal,
      emailConnected: state.emailConnected,
    }));

  return (
    <>
      {auth.isLoading ? (
        <main id='main' className='new-home'>
          <div className='main-inner home'>
            <div className='d-flex justify-content-center'>
              <AuthHomeShimmer />
            </div>
          </div>
        </main>
      ) : identity || emailConnected ? (
        <Authenticated />
      ) : (
        <UnAuthenticated />
      )}
    </>
  );
}
