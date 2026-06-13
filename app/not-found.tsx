import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations({ locale: 'ru', namespace: 'notFound' });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-off-white px-sm text-center">
      <h1 className="font-display text-h1 text-deep-navy">{t('title')}</h1>
      <p className="mt-sm font-body text-body text-charcoal/70">
        {t('text')}
      </p>
      <Link
        href="/"
        className="mt-md inline-flex rounded-full border border-gold px-md py-sm font-body text-small text-gold transition-colors hover:bg-gold hover:text-white"
      >
        {t('home')}
      </Link>
    </div>
  );
}