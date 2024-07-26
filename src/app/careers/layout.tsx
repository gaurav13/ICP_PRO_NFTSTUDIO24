import { siteConfig } from '@/constant/config';
import { LanguageForSchema } from '@/constant/language';
import { CAREERS } from '@/constant/routes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.articlesPgTitle,
  description: siteConfig.articlesPgDec,
  openGraph: {
    url: `${siteConfig.url+CAREERS}`,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: 'NFTStudio24',
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: LanguageForSchema,
  },
};
export default function RootLayout({ children }: { children: any }) {
  return <>{children}</>;
}
