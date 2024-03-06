import { Metadata } from 'next';
import * as React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { siteConfig } from '@/constant/config';
import '@/styles/App.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'tippy.js/dist/tippy.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: 'index, follow',
  icons: {
    icon: `${siteConfig.url}/favicon/favicon.ico`,
    shortcut: `${siteConfig.url}/favicon/favicon-16x16.png`,
    apple: `${siteConfig.url}/favicon/apple-touch-icon.png`,
  },
  applicationName: 'NFTStudio24',
  manifest: `${siteConfig.url}/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: 'NFTStudio24',
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: '@nocreateor',
  },

  verification: { google: 'TdfBBW45GwpqKJWSb3Xbn6_1RPynvspf6r1oggpxgQI' },
  // authors: [
  //   {
  //     name: 'Actual Author Name',
  //     url: 'https://actualauthorurl.com/',
  //   },
  // ],
};
import { ToastContainer } from 'react-toastify';
import SidebarHome from '@/components/SideBarHome/SideBarHome';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import NavBarNew from '@/components/NavBar/NavabrNew';
import NewSidebarHome from '@/components/SideBarHome/NewSideBarHome';
import Head from 'next/head';
import { LANG } from '@/constant/language';
export default function RootLayout({
  children,
  hide,
}: {
  children: React.ReactNode;
  hide?: boolean;
}) {
  return (
    <html>
      {/* <Head> */}
      <head>
        <link
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
          rel='stylesheet'
        />

        <meta name='robots' content='index,follow' />
        {/* <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700&family=Literata:opsz,wght@7..72,300;7..72,400;7..72,500;7..72,600;7..72,700;7..72,800&display=swap'
          rel='stylesheet'
        /> */}
        {/* <script src='http://localhost:8097'></script> */}
        {/* Google tag (gtag.js) */}
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-9M6DC9SQFP'
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-9M6DC9SQFP');
        `,
          }}
        ></script>
      </head>
      {/* </Head> */}
      <body className={`${LANG=="jp"? "ENStyle":""}`}>
        <NewSidebarHome />
        <NavBarNew />
        {children}
        <Footer />

        <ToastContainer theme='light' autoClose={3000} />
        <script
          src='https://kit.fontawesome.com/3fcb35e151.js'
          crossOrigin='anonymous'
        ></script>
      </body>
    </html>
  );
}
