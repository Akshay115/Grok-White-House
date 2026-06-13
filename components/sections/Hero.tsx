'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HadidFlow from '@/components/ui/HadidFlow';

const STAT_KEYS = ['rating', 'reviews', 'airport', 'pools'] as const;

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85';

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(image, { opacity: 1 });
      gsap.set(section.querySelectorAll('[data-hero-animate]'), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(image, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power1.inOut' }, 0);

      tl.fromTo(
        '[data-hero-eyebrow]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      );

      tl.fromTo(
        '[data-hero-headline]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.5
      );

      tl.fromTo(
        '[data-hero-subheadline]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );

      tl.fromTo(
        '[data-hero-body]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.9
      );

      tl.fromTo(
        '[data-hero-cta]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 },
        1.1
      );

      tl.fromTo(
        '[data-hero-stat]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        1.1
      );

      tl.fromTo(
        '[data-hero-scroll]',
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        1.3
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal"
    >
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 opacity-0">
        <Image
          src={HERO_IMAGE}
          alt={t('imageAlt')}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Parametric background forms */}
      <HadidFlow
        variant="hero"
        color="white"
        opacity={0.06}
        animate
        className="z-[1]"
      />

      {/* Main content */}
      <div className="container-content relative z-10 flex h-full items-center pt-[5rem] pb-[11rem] md:pb-[9rem]">
        <div className="max-w-3xl">
          <p
            data-hero-animate
            data-hero-eyebrow
            className="font-body text-[0.75rem] font-normal uppercase tracking-[0.5em] text-gold opacity-0"
          >
            {t('eyebrow')}
          </p>

          <h1
            data-hero-animate
            data-hero-headline
            className="mt-sm font-display text-hero italic leading-[0.95] text-white opacity-0"
          >
            {t('headline')}
          </h1>

          <p
            data-hero-animate
            data-hero-subheadline
            className="mt-sm font-display text-[clamp(1.4rem,2.5vw,2rem)] font-light italic text-gold-light opacity-0"
          >
            {t('subheadline')}
          </p>

          <p
            data-hero-animate
            data-hero-body
            className="mt-md max-w-[480px] font-body text-body leading-[1.7] opacity-0"
            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
          >
            {t('body')}
          </p>

          <div className="mt-lg flex flex-wrap gap-sm">
            <a
              href="#booking"
              data-analytics="book"
              data-hero-animate
              data-hero-cta
              className="hero-cta-primary opacity-0"
            >
              {t('ctaPrimary')}
            </a>
            <a
              href="#rooms"
              data-hero-animate
              data-hero-cta
              className="hero-cta-secondary opacity-0"
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        data-hero-animate
        data-hero-scroll
        className="absolute bottom-[7.5rem] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-xs opacity-0 md:bottom-[6.5rem]"
        aria-label={t('aboutAria')}
      >
        <div className="relative flex flex-col items-center">
          <div className="hero-scroll-line" />
          <div className="hero-scroll-dot absolute top-0" />
        </div>
        <span
          className="font-body text-[0.65rem] font-normal uppercase tracking-[0.3em]"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          {t('scrollHint')}
        </span>
      </a>

      {/* Statistics bar */}
      <div className="hero-stats-bar absolute inset-x-0 bottom-0 z-10 border-t border-white/10">
        <div className="container-content grid grid-cols-2 gap-sm px-sm py-md md:grid-cols-4 md:gap-md md:py-sm">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              data-hero-animate
              data-hero-stat
              className="flex flex-col items-center text-center opacity-0 md:items-start md:text-left"
            >
              <span className="font-display text-[2.5rem] font-light italic leading-none text-gold">
                {t(`stats.${key}.value`)}
              </span>
              <span
                className="mt-xs font-body text-[0.75rem] font-normal uppercase tracking-[0.1em]"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {t(`stats.${key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}