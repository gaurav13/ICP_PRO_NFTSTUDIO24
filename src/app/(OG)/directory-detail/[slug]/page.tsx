// 'use client';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Metadata } from 'next';
import axios from 'axios';
import { fromNullable } from '@dfinity/utils';
import { siteConfig } from '@/constant/config';
import { utcToLocal } from '@/components/utils/utcToLocal';
import { Date_m_d_y_h_m } from '@/constant/DateFormates';
import {
  GET_DIRECTORY_URL,
  LANG,
} from '@/constant/language';
import {
  DIRECTORY_STATIC_PATH,
} from '@/constant/routes';
import Web3DirectoryDetail from '@/components/Web3DirectoryDetail/Web3DirectoryDetail';
import { DEFUALT_IMG } from '@/constant/image';


interface Web3Directory {
  company: string;
  shortDescription: string;
  companyUrl: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  discord: string;
  telegram: string;
  twitter: string;
  founderName: string;
  companyBanner: string | undefined;
  catagory: string;
  founderDetail: string;
  founderImage: string | undefined;
  companyDetail: string;
  creation_time: BigInt;
  user: any;
  companyLogo: string | undefined;
}


export async function generateStaticParams() {
  const response = await axios.get(
    `${process.env.BASE_URL}entries/getAllDirectoriesIds/${LANG}`
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
  let entry: Web3Directory = {
    company: 'company',
    shortDescription: 'shortDescription',
    companyUrl: 'companyUrl',
    facebook: 'facebook',
    instagram: 'instagram',
    linkedin: 'linkedin',
    discord: 'discord',
    telegram: 'telegram',
    twitter: 'twitter',
    founderName: 'founderName',
    companyBanner: 'companyBanner',
    catagory: 'catagory',
    founderDetail: 'founderDetail',
    founderImage: 'founderImage',
    companyDetail: 'companyDetail',
    creation_time: BigInt(0),
    user: 'user',
    companyLogo: 'companyLogo',
  };
  let userId;

  let publishDate: string | undefined;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}entries/${GET_DIRECTORY_URL}/${slug}`
    );

    const _entry = response.data;
    entry = _entry;
    entry.companyBanner = fromNullable(_entry.companyBanner);
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
    title: entry?.company,
    description: entry?.shortDescription,
    category: entry?.catagory[0],
    robots: 'index, follow',

    authors: [
      {
        name: entry?.founderName,
        url: `${siteConfig.url}/profile?userId=${userId}`,
      },
    ],
    publisher: 'NFTStudio24',

    openGraph: {
      publishedTime: publishDate,
      url: `${siteConfig.url}/${DIRECTORY_STATIC_PATH}/${slug}`,
      title: entry?.company,
      description: entry?.shortDescription,
      siteName: entry?.company,
      images: [entry.companyBanner ?? DEFUALT_IMG],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry?.company,
      description: entry?.shortDescription,
      images: [entry.companyBanner ?? DEFUALT_IMG],
      creator: '@nftstudio24',
    },
  };
}
export default async function Page({ params }: any) {
  const { slug } = params;
  // const articleData = getArticleData(slug);
  // logger(params, 'params');
  let entry;
  const response = await axios.get(
    `${process.env.BASE_URL}entries/${GET_DIRECTORY_URL}/${slug}`
  );

  const _entry = response.data;

  // const _entry = await entryActor.getEntryMeta(slug);
  entry = _entry;
  entry.companyBanner = fromNullable(_entry?.companyBanner);
  entry.companyLogo = fromNullable(_entry?.companyLogo);
  entry.founderImage = fromNullable(_entry?.founderImage);

  entry.user;
  const publishDate = utcToLocal(
    entry?.creation_time?.toString(),
    Date_m_d_y_h_m,
    true
  );
  const userId = entry?.user?.__principal__;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: entry?.company,
    description: entry?.shortDescription,
    url: entry?.companyUrl,
    logo: entry?.companyLogo,
    image: entry?.companyBanner,
    founder: {
      '@type': 'Person',
      name: entry?.founderName,
      description: entry?.founderDetail,
      image: entry?.founderImage,
    },
    sameAs: [
      entry.facebook,
      entry.instagram,
      entry.linkedin,
      entry.discord,
      entry.telegram,
      entry.twitter,
    ],
    category: entry.catagory,
    detailedDescription: entry.companyDetail,
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Web3DirectoryDetail directoryId={slug} />
    </>
  );
}
