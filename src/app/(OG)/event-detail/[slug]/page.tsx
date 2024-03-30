// 'use client';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { makeEntryActor, makeUserActor } from '@/dfx/service/actor-locator';
import { Metadata, MetadataRoute, ResolvingMetadata } from 'next';
import axios from 'axios';
import { fromNullable } from '@dfinity/utils';
import { siteConfig } from '@/constant/config';
import { utcToLocal } from '@/components/utils/utcToLocal';
import { Date_m_d_y_h_m } from '@/constant/DateFormates';
import { GET_ENTRY_URL, GET_EVENT_URL, LANG } from '@/constant/language';
import { ARTICLE_STATIC_PATH, Event_STATIC_PATH } from '@/constant/routes';
import EventDetails from '@/components/EventDetail/EventDetail';
import { DEFUALT_IMG } from '@/constant/image';

const entryActor = makeEntryActor();
interface EventType {
  title : string;
  shortDescription : string;
  date : BigInt;
  endDate : BigInt;
  location : string;
  country : string;
  city : string;
  website : string;
  category : [string];
  tags : [string];
  organiser : string;
  image :string | undefined;
  creation_time : BigInt;
  month : Number;
  user : any;
  seoTitle : string;
  seoSlug : string;
  seoDescription : string;
  seoExcerpt : string;
  description  : string;
  freeTicket : string;
  applyTicket : string;

}

export async function generateStaticParams() {
  const response = await axios.get(
    `${process.env.BASE_URL}entries/getAllEventsIds/${LANG}`
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
  let entry: EventType = {
    title : "Event",
    shortDescription : "shortDescription",
    date : BigInt(0),
    endDate :  BigInt(0),
    location : "location",
    country : "country",
    city : "city",
    website : "website",
    category : ["1232312312"],
    tags : ["tags"],
    organiser : "NFT",
    image :DEFUALT_IMG,
    creation_time :  BigInt(0),
    month : 1,
    user : "",
    seoTitle : "seoTitle",
    seoSlug : "seoSlug",
    seoDescription : "seoDescription",
    seoExcerpt : "seoExcerpt",
    description :"description",
    freeTicket :"freeTicket",
    applyTicket :"applyTicket",
  };
  let userId;

  let publishDate: string | undefined;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}entries/${GET_EVENT_URL}/${slug}`
    );

    const _entry = response.data;
    entry = _entry;
    entry.image = fromNullable(_entry.image);
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
    category: entry?.category[0],
    robots: 'index, follow',

    authors: [
      {
        name: entry?.organiser,
        url: `${siteConfig.url}/profile?userId=${userId}`,
      },
    ],
    publisher: 'NFTStudio24',

    openGraph: {
      publishedTime: publishDate,
      url: `${siteConfig.url}/${Event_STATIC_PATH}/${slug}`,
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
export default async function Page({ params }: any) {
  const { slug } = params;
  // const articleData = getArticleData(slug);
  // logger(params, 'params');
  let entry;
  const response = await axios.get(
    `${process.env.BASE_URL}entries/${GET_EVENT_URL}/${slug}`
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
  const startDate = utcToLocal(
    entry?.date?.toString(),
    Date_m_d_y_h_m,
    true
  );
  const endDate = utcToLocal(
    entry?.endDate?.toString(),
    Date_m_d_y_h_m,
    true
  );
  const userId = entry?.user?.__principal__;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",  
    "name": entry?.title,
    "startDate": startDate,
    "endDate": endDate,
    "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",

  "location": {
    "@type": "Place",
    "name": "Event Venue Name",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": entry?.location,
      "addressLocality": entry?.city,
      "addressCountry": entry?.country
    }
  },
  "image": [
    entry.image ?? DEFUALT_IMG
   ],

   "description": entry?.description,
   "offers": {
     "@type": "Offer",
     "url": entry?.applyTicket,
     "price": "99.00",
     "priceCurrency": "USD",
     "availability": "https://schema.org/InStock",
     "validFrom": "2024-04-01T12:00"
   },
   "performer": {
     "@type": "PerformingGroup",
     "name": "Name of the performer or group"
   },
   "organizer": {
     "@type": "Organization",
     "name": entry?.organiser,
     "url": entry?.website
   }
 
  };
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <EventDetails eventId={slug} />
    </>
  );
}
