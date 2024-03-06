'use client';
import React, { useEffect, useState } from 'react';
import Article from '@/components/Article';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import { useRouter } from 'next/navigation';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function ArticlePage() {
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  const articleId = searchParams.get('articleId');
  let router = useRouter();
  if (articleId) {
    return <Article articleId={articleId} />;
  } else {
    // router.push("/")
    return (
      <main id='main'>
        <div className='main-inner'>
          <div className='inner-content'></div>
        </div>{' '}
      </main>
    );
  }
}
