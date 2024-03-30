// 'use client';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { makeEntryActor, makeUserActor } from '@/dfx/service/actor-locator';
import logger from '@/lib/logger';
import iconbnb from '@/assets/Img/icon-bnb.png';
import { Metadata, MetadataRoute, ResolvingMetadata } from 'next';
import Article from '@/components/Article';
import axios from 'axios';
import { fromNullable } from '@dfinity/utils';
import { siteConfig } from '@/constant/config';
import { utcToLocal } from '@/components/utils/utcToLocal';
import { Date_m_d_y_h_m } from '@/constant/DateFormates';
import { GET_ENTRY_URL, LANG } from '@/constant/language';
import { ARTICLE_STATIC_PATH, Podcast_STATIC_PATH } from '@/constant/routes';
import Podcast from '@/components/Podcast';
import { DEFUALT_IMG } from '@/constant/image';

const entryActor = makeEntryActor();
interface ArticleType {
  title: string;
  image: string | undefined;
  seoSlug: string;
  seoDescription: string;
  category: string;
  podcastImg: string | undefined;
  creation_time: BigInt;
  user: any;
  userName: string;
  seoTitle: string;
}

export async function generateStaticParams() {
  const response = await axios.get(
    `${process.env.BASE_URL}entries/getAllEntryIds/podcast/${LANG}`
  );
  const entryIds = response.data;
  const paths = entryIds.map((id: string) => ({
    slug: id.toString(),
  }));
  return paths?.length > 0 ? paths : [{ slug: 'dsoew2387470hl' }];
}
export async function generateMetadata({
  params,
  searchParams,
}: any): Promise<Metadata> {
  const { slug } = params;
  let entry: ArticleType = {
    title: 'Article',
    seoSlug: 'article',
    image: DEFUALT_IMG,
    seoDescription: 'The best Article',
    category: 'super',
    podcastImg: DEFUALT_IMG,
    creation_time: BigInt(0),
    user: '',
    userName: '',
    seoTitle: '',
  };
  let userId;

  let publishDate: string | undefined;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}entries/${GET_ENTRY_URL}/${slug}`
    );

    const _entry = response.data;
    entry = _entry;
    entry.image = fromNullable(_entry.image);
    entry.podcastImg = fromNullable(_entry?.podcastImg);
    entry.user;
    publishDate = utcToLocal(
      entry?.creation_time?.toString(),
      Date_m_d_y_h_m,
      true
    );
    userId = entry?.user?.__principal__;
  } catch (error) {
    console.log(
      "Encountered an error while touching entry's metadata",
      error,
      slug
    );
  }
  return {
    title: entry?.seoTitle,
    description: entry?.seoDescription,
    category: entry.category,
    robots: 'index, follow',

    authors: [
      {
        name: entry?.userName,
        url: `${siteConfig.url}/profile?userId=${userId}`,
      },
    ],
    publisher: 'NFTStudio24',

    openGraph: {
      publishedTime: publishDate,
      url: `${siteConfig.url}/${Podcast_STATIC_PATH}/${slug}`,
      title: entry?.seoTitle,
      description: entry?.seoDescription,
      siteName: entry?.seoTitle,
      images: [entry.image ?? DEFUALT_IMG],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry?.seoTitle,
      description: entry?.seoDescription,
      images: [entry.image ?? DEFUALT_IMG],
      creator: '@nftstudio24',
    },
  };
}
function countWordsInHtml(html: string): number {
  const text = html.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
  const words = text.split(/\s+/); // Split by spaces
  return words.filter(Boolean).length; // Filter out empty strings and count the rest
}
export async function getArticleData(id: string) {
  let entry: undefined | any;
  try {
    const tempEntry = await entryActor.getEntry(id);

    logger(tempEntry, 'entries');

    let TempDirectory = null;
    let tempUser = tempEntry[0]?.user?.toString();
    // setUserId(tempUser);
    // await updateImg(tempEntry[0].image[0], 'feature');
    let categoryLogo: any = iconbnb;

    entry = tempEntry;
  } catch (error) {
    console.error('Error fetching entry', error);
  }
  return entry;
}
export default async function Page({ params }: any) {
  const { slug } = params;
  // const articleData = getArticleData(slug);
  // logger(params, 'params');
  let entry;
  const response = await axios.get(
    `${process.env.BASE_URL}entries/${GET_ENTRY_URL}/${slug}`
  );

  const _entry = response.data;

  // const _entry = await entryActor.getEntryMeta(slug);
  entry = _entry;
  entry.image = fromNullable(_entry.image);
  entry.podcastImg = fromNullable(_entry?.podcastImg);
  entry.user;
  const publishDate = utcToLocal(
    entry?.creation_time?.toString(),
    Date_m_d_y_h_m,
    true
  );
  const userId = entry?.user?.__principal__;
  const wordCount = countWordsInHtml(entry?.description);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${Podcast_STATIC_PATH}/${slug}`,
    },
    headline: entry?.seoTitle,
    image: {
      '@type': 'ImageObject',
      url: entry.image ?? DEFUALT_IMG,
      width: 1200,
      height: 628,
    },
    author: {
      '@type': 'Person',
      name: entry?.userName,
      url: `${siteConfig.url}/profile?userId=${userId}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NFTStudio24',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon/favicon.ico`,
        width: 60,
        height: 60,
      },
    },
    datePublished: publishDate,
    description: entry?.seoDescription,
    articleSection: entry.category[0],
    inLanguage: 'en-US',
    wordCount: wordCount,
  };
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Podcast articleId={slug} />
    </>
  );
}
