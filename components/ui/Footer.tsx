'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check,
  Instagram,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import HadidFlow from './HadidFlow';
import LanguageSwitcher from './LanguageSwitcher';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  'rooms',
  'amenities',
  'location',
  'gallery',
  'reviews',
  'booking',
] as const;

const SOCIAL_LINKS = {
  telegram: {
    href: 'https://t.me/SochiWhiteHouse',
    labelKey: 'social.telegram' as const,
  },
  whatsapp: {
    href: 'https://wa.me/79621574497',
    labelKey: 'social.whatsapp' as const,
  },
  vk: {
    href: 'https://vk.com/sochiwhitehouse',
    labelKey: 'social.vk' as const,
  },
  instagram: {
    href: 'https://www.instagram.com/sochi_white_house',
    labelKey: 'social.instagram' as const,
  },
};

const PHONE_HREF = 'tel:+79621574497';
const WHATSAPP_HREF = 'https://wa.me/79621574497';
const TELEGRAM_HREF = 'https://t.me/SochiWhiteHouse';
const YANDEX_MAPS =
  'https://yandex.ru/maps/org/193383996310/reviews/';

function VkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.46c-.55 0-.72-.44-1.71-1.44-.86-.82-1.24-.93-1.46-.93-.3 0-.38.09-.38.5v1.32c0 .36-.12.58-1.08.58-1.6 0-3.38-.97-4.63-2.77-1.89-2.66-2.41-4.66-2.41-4.78 0-.21.09-.4.5-.4h1.46c.37 0 .51.17.65.57.71 2.07 1.9 3.89 2.39 3.89.18 0 .27-.09.27-.55V9.9c-.06-.98-.57-1.06-.57-1.41 0-.17.14-.34.37-.34h2.29c.31 0 .42.17.42.53v2.87c0 .31.14.42.23.42.18 0 .33-.11.66-.44 1.02-1.14 1.75-2.9 1.75-2.9.1-.21.27-.4.64-.4h1.46c.44 0 .53.23.44.53-.18.84-1.93 3.3-1.93 3.3-.15.25-.21.36 0 .65.15.21.65.64 1 1.04.64.72 1.13 1.33 1.26 1.75.14.42-.08.64-.5.64z" />
    </svg>
  );
}

function SocialIcon({
  type,
  href,
  label,
}: {
  type: keyof typeof SOCIAL_LINKS;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      data-analytics={type === 'whatsapp' ? 'whatsapp' : undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="footer-social-icon flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:scale-110 hover:border-gold hover:text-gold"
    >
      {type === 'vk' ? (
        <VkIcon className="h-4 w-4" />
      ) : type === 'telegram' ? (
        <Send className="h-4 w-4" strokeWidth={1.5} />
      ) : type === 'whatsapp' ? (
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Instagram className="h-4 w-4" strokeWidth={1.5} />
      )}
    </a>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-body text-[0.7rem] font-medium uppercase tracking-[0.3em] text-gold">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-body text-[0.85rem] text-white/60 transition-colors duration-300 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const social = socialRef.current;
    if (!footer || !content) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0 });
      if (social) gsap.set(social.children, { scale: 1, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (social) {
        gsap.fromTo(
          social.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: footer,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  const factKeys = [
    'yandexRating',
    'renovation',
    'parking',
    'breakfast',
    'transfer',
  ] as const;

  return (
    <footer ref={footerRef} className="relative bg-charcoal text-white">
      <HadidFlow
        variant="footer"
        color="white"
        opacity={0.08}
        animate
        className="top-0 z-[2] -translate-y-[55%]"
      />

      <div ref={contentRef} className="relative z-[1] opacity-0">
        <div className="container-content pt-20 pb-12">
          <div className="grid gap-xl lg:grid-cols-[35%_20%_25%_20%] lg:gap-lg">
            {/* Brand */}
            <div>
              <h2 className="font-display text-[2.5rem] font-light italic leading-none text-white">
                {t('logo')}
              </h2>
              <p className="mt-sm font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
                {t('locationTag')}
              </p>
              <div
                className="my-6 h-px w-[60px]"
                style={{ backgroundColor: 'rgba(200, 169, 110, 0.3)' }}
              />
              <p className="max-w-[280px] font-body text-[0.85rem] leading-[1.7] text-white/50">
                {t('description')}
              </p>
              <div ref={socialRef} className="mt-lg flex gap-sm">
                {(Object.keys(SOCIAL_LINKS) as Array<keyof typeof SOCIAL_LINKS>).map(
                  (key) => (
                    <SocialIcon
                      key={key}
                      type={key}
                      href={SOCIAL_LINKS[key].href}
                      label={t(SOCIAL_LINKS[key].labelKey)}
                    />
                  )
                )}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <FooterHeading>{t('navHeading')}</FooterHeading>
              <ul className="mt-md space-y-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <FooterLink href={`#${item}`}>{tNav(item)}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <FooterHeading>{t('contactsHeading')}</FooterHeading>
              <ul className="mt-md space-y-sm">
                <li>
                  <a
                    href={PHONE_HREF}
                    data-analytics="phone"
                    className="inline-flex items-center gap-xs font-body text-[0.85rem] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    {t('phone')}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_HREF}
                    data-analytics="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-xs font-body text-[0.85rem] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    {t('whatsappLink')}
                  </a>
                </li>
                <li>
                  <a
                    href={TELEGRAM_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-xs font-body text-[0.85rem] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    <Send className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    {t('telegramLink')}
                  </a>
                </li>
                <li className="pt-xs">
                  <p className="font-body text-[0.85rem] leading-relaxed text-white/50">
                    {t('addressLine1')}
                    <br />
                    {t('addressLine2')}
                  </p>
                </li>
                <li className="flex items-center gap-xs pt-xs">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-[#4ade80]"
                    aria-hidden="true"
                  />
                  <span className="font-body text-[0.85rem] text-white/60">
                    {t('open24h')}
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Facts */}
            <div>
              <FooterHeading>{t('factsHeading')}</FooterHeading>
              <ul className="mt-md space-y-sm">
                {factKeys.map((key) => (
                  <li key={key} className="flex items-start gap-xs">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                      strokeWidth={2.5}
                    />
                    {key === 'yandexRating' ? (
                      <a
                        href={YANDEX_MAPS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-[0.85rem] leading-relaxed text-white/50 transition-colors hover:text-white/70"
                      >
                        {t(`facts.${key}`)}
                      </a>
                    ) : (
                      <span className="font-body text-[0.85rem] leading-relaxed text-white/50">
                        {t(`facts.${key}`)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t py-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}
        >
          <div className="container-content flex flex-col items-center gap-md text-center md:flex-row md:justify-between md:gap-sm md:text-left">
            <p className="font-body text-[0.85rem] text-white/40">
              {t('rights', { year })}
            </p>
            <LanguageSwitcher variant="footer" />
            <p className="font-body text-[0.85rem] text-white/40 md:min-w-[200px] md:text-right">
              {t('agency')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}