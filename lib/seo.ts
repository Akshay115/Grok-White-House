import type { Metadata } from 'next';
import { buildLocaleAlternates } from '@/lib/metadata';
import { siteUrl } from '@/lib/site';

type Locale = 'ru' | 'en';

export type MetadataMessages = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

export function buildSiteMetadata(
  locale: Locale,
  messages: MetadataMessages
): Metadata {
  const keywords = messages.keywords.split(',').map((k) => k.trim());
  const ogLocale = locale === 'ru' ? 'ru_RU' : 'en_US';

  return {
    metadataBase: new URL(siteUrl),
    title: messages.title,
    description: messages.description,
    keywords,
    alternates: buildLocaleAlternates(locale),
    openGraph: {
      title: messages.ogTitle,
      description: messages.ogDescription,
      locale: ogLocale,
      alternateLocale: locale === 'ru' ? 'en_US' : 'ru_RU',
      type: 'website',
      siteName: 'White House Sochi',
      url: locale === 'ru' ? siteUrl : `${siteUrl}/en`,
      images: [
        {
          url: messages.ogImage,
          width: 1200,
          height: 630,
          alt: messages.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.ogTitle,
      description: messages.ogDescription,
      images: [messages.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icons/icon-192.png', sizes: '192x192' }],
    },
    other: {
      'theme-color': '#0B1628',
    },
  };
}