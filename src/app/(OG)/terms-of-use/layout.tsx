import { siteConfig } from '@/constant/config';
import logger from '@/lib/logger';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.termOfUsePgtitle,
  description: siteConfig.termOfUseDes,
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.termOfUsePgtitle,
    description: siteConfig.termOfUseTwitterDes,
    images: [`${siteConfig.url}/images/private-policy.png`],
    creator: siteConfig.twitterCreator,
  },
  openGraph: {
    url: `${siteConfig.url}/terms-of-use`,
    title: siteConfig.termOfUsePgtitle,
    description: siteConfig.termOfUseTwitterDes,
    siteName: siteConfig.siteName,
    images: [`${siteConfig.url}/images/private-policy.png`],
    type: 'article',
  },
};
export default function RootLayout({ children }: { children: any }) {
  return <>{children}</>;
}
