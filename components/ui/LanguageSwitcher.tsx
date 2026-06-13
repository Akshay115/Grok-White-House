'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

type LanguageSwitcherProps = {
  className?: string;
  variant?: 'nav' | 'footer' | 'mobile';
};

const VARIANT_STYLES = {
  nav: {
    container: 'text-[0.85rem] tracking-[0.12em]',
    inactive: 'text-warm-gray-light hover:text-charcoal/70',
    separator: 'text-warm-gray/40',
  },
  footer: {
    container: 'text-[0.85rem] tracking-[0.12em]',
    inactive: 'text-warm-gray-light hover:text-charcoal/70',
    separator: 'text-warm-gray/40',
  },
  mobile: {
    container: 'text-[1rem] tracking-[0.15em]',
    inactive: 'text-warm-gray-light hover:text-charcoal',
    separator: 'text-warm-gray/50',
  },
} as const;

export default function LanguageSwitcher({
  className = '',
  variant = 'nav',
}: LanguageSwitcherProps) {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const styles = VARIANT_STYLES[variant];

  const switchLocale = (nextLocale: 'ru' | 'en') => {
    if (nextLocale === locale || isPending) return;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div
      className={`lang-crossfade flex items-center gap-xs font-body uppercase ${styles.container} ${className}`}
      data-switching={isPending}
      role="group"
      aria-label={t('ariaLabel')}
    >
      <button
        type="button"
        onClick={() => switchLocale('ru')}
        disabled={isPending}
        className={`transition-colors duration-300 ${
          locale === 'ru' ? 'text-sea-teal' : styles.inactive
        }`}
        aria-label={t('switchToRu')}
        aria-current={locale === 'ru' ? 'true' : undefined}
      >
        {t('ru')}
      </button>
      <span className={styles.separator} aria-hidden="true">
        {t('separator')}
      </span>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`transition-colors duration-300 ${
          locale === 'en' ? 'text-sea-teal' : styles.inactive
        }`}
        aria-label={t('switchToEn')}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        {t('en')}
      </button>
    </div>
  );
}