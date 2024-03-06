import { siteConfig } from '@/constant/config';
import logger from '@/lib/logger';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.twitterTitle,
  description: siteConfig.hinzaAsifDesc,
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.twitterTitle,
    description: siteConfig.hinzaAsifDesc,
    images: [`${siteConfig.url}/images/hinza-asif.png`],
    creator: siteConfig.twitterCreator,
  },
  openGraph: {
    url: `${siteConfig.url}/hinza-asif`,
    title: siteConfig.twitterTitle,
    description: siteConfig.hinzaAsifDesc,
    siteName: siteConfig.siteName,
    images: [`${siteConfig.url}/images/hinza-asif.png`],
    type: 'article',
  },
};
export default function RootLayout({ children }: { children: any }) {
  return <>{children}</>;
}
