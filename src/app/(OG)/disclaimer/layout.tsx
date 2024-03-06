import { siteConfig } from '@/constant/config';
import logger from '@/lib/logger';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.disclaimerTitle,
  description: siteConfig.disclaimerDesc,
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.disclaimerTitle,
    description: siteConfig.disclaimerDesc,
    images: [`${siteConfig.url}/images/private-policy.png`],
    creator: siteConfig.twitterCreator,
  },
  openGraph: {
    url: `${siteConfig.url}/disclaimer`,
    title: siteConfig.disclaimerTitle,
    description: siteConfig.disclaimerDesc,
    siteName: siteConfig.siteName,
    images: [`${siteConfig.url}/images/private-policy.png`],
    type: 'article',
  },
};
export default function RootLayout({ children }: { children: any }) {
  return <>{children}</>;
}
