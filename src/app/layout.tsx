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
    template: `%s `,
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
    locale: LanguageForSchema,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: '@nocreateor',
  },

  verification: {
    google:
      LANG == 'jp'
        ? 'G-PBPMHN86DB'
        : 'wovwHLycouYdk9QDn3uYmxM_4ln03ilWrP6tt2nGwks',
  },
  // authors: [
  //   {
  //     name: 'Actual Author Name',
  //     url: 'https://actualauthorurl.com/',
  //   },
  // ],
};


import { ToastContainer } from 'react-toastify';
import Footer from '@/components/Footer/Footer';
import NavBarNew from '@/components/NavBar/NavabrNew';
import NewSidebarHome from '@/components/SideBarHome/NewSideBarHome';
import { LANG, LanguageForSchema } from '@/constant/language';
import MainLayoutScript from '@/components/Scripts/MainLayoutScript';
export default function RootLayout({
  children,
  hide,
}: {
  children: React.ReactNode;
  hide?: boolean;
}) {
  return (
    <html lang={LANG === 'en' ? 'en' : 'ja-JP'}>
      {/* <Head> */}
      <head>
        
        <link
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
          rel='stylesheet'
        />


        <meta name='google-adsense-account' content='ca-pub-3667934312237467' />
        {/* <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700&family=Literata:opsz,wght@7..72,300;7..72,400;7..72,500;7..72,600;7..72,700;7..72,800&display=swap'
          rel='stylesheet'
        /> */}
        {/* <script src='http://localhost:8097'/> */}
        {/* Google tag (gtag.js) */}
        {/* <!-- Google tag (gtag.js) --> */}
      {LANG=="jp" ? <script async src="https://www.googletagmanager.com/gtag/js?id=G-BEDH4ZVQ4X"></script>:<script async src="https://www.googletagmanager.com/gtag/js?id=G-FV2HX3N3PR"></script>}
    <MainLayoutScript/>
         

     

          {LANG==="en" ? <script
          dangerouslySetInnerHTML={{
            __html: `
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KQBJZS3Z');
            
            
        `,
          }}
        ></script>:
        <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
           })(window,document,'script','dataLayer','GTM-5KKJLNR4') ;
          
          
      `,
        }}
      ></script>
        }
     

    
      </head>
      {/* </Head> */}
      <body className={`${LANG == 'jp' ? 'ENStyle' : ''}`}>
       
       {LANG == 'en'? <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQBJZS3Z"
height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>: <noscript>
<iframe
  src='https://www.googletagmanager.com/ns.html?id=GTM-5KKJLNR4'
  height='0'
  width='0'
  style={{ display: 'none', visibility: 'hidden' }}
></iframe>
</noscript>}

        <NewSidebarHome />
        <NavBarNew />
        {children}
        <Footer />
        <ToastContainer theme='light' autoClose={3000} />
        <script
          src='https://kit.fontawesome.com/3fcb35e151.js'
          crossOrigin='anonymous'
        />
      </body>
    </html>
  );
}
