import { siteConfig } from '@/constant/config';
import logger from '@/lib/logger';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.privatePloicyTitle,
  description: siteConfig.privatePolicyDesc,
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.privatePloicyTitle,
    description: siteConfig.privatePolicyDesc,
    images: [`${siteConfig.url}/images/private-policy.png`],
    creator: siteConfig.twitterCreator,
  },
  openGraph: {
    url: `${siteConfig.url}/privacy-policy`,
    title: siteConfig.privatePloicyTitle,
    description: siteConfig.privatePolicyDesc,
    siteName: siteConfig.siteName,
    images: [`${siteConfig.url}/images/private-policy.png`],
    type: 'article',
  },
};
export default function RootLayout({ children }: { children: any }) {
  return <>{children}</>;
}
