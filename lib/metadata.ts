import type { Metadata } from 'next';

type Locale = 'ru' | 'en';

export function localePath(locale: Locale, pathname = '/') {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (locale === 'en') {
    return normalized === '/' ? '/en' : `/en${normalized}`;
  }

  return normalized;
}

export function buildLocaleAlternates(
  locale: Locale,
  pathname = '/'
): NonNullable<Metadata['alternates']> {
  const ruPath = localePath('ru', pathname);
  const enPath = localePath('en', pathname);

  return {
    canonical: localePath(locale, pathname),
    languages: {
      ru: ruPath,
      en: enPath,
      'x-default': ruPath,
    },
  };
}

