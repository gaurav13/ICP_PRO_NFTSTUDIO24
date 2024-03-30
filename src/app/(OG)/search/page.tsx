'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { usePathname, useRouter } from 'next/navigation';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { makeEntryActor } from '@/dfx/service/actor-locator';
import logger from '@/lib/logger';
import { getImage } from '@/components/utils/getImage';
import { EntrySizeMap } from '@/types/dashboard';
import { ArticlesList } from '@/components/ArticlesList';
import SearchArticlesList from '@/components/SearchArticlesList';
// import { usePopper } from 'react-popper';

export default function Search() {
  return (
    <>
      <main id='main'>
        <div className='main-inner home'>
          <SearchArticlesList />
        </div>
      </main>
    </>
  );
}
