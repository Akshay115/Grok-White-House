import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import YandexMetrika from '@/components/analytics/YandexMetrika';
import StructuredData from '@/components/seo/StructuredData';
import LocalePageTransition from '@/components/ui/LocalePageTransition';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { routing } from '@/i18n/routing';
import { buildSiteMetadata, type MetadataMessages } from '@/lib/seo';
import '@/styles/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const resolvedLocale = locale as 'ru' | 'en';

  const messages: MetadataMessages = {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    ogTitle: t('ogTitle'),
    ogDescription: t('ogDescription'),
    ogImage: t('ogImage'),
  };

  return buildSiteMetadata(resolvedLocale, messages);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ru' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <StructuredData />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LocalePageTransition>{children}</LocalePageTransition>
          <SmoothScroll />
          <ScrollProgress />
        </NextIntlClientProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}