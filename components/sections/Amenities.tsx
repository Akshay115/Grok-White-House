'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AmenityIcon from '@/components/ui/AmenityIcon';

gsap.registerPlugin(ScrollTrigger);

const POOL_IMAGE =
  'https://images.unsplash.com/photo-1540541338287-a417d50cca71?w=1000&q=85';

type GroupKey = 'facilities' | 'services' | 'rooms';

const GROUPS: {
  key: GroupKey;
  itemKeys: string[];
  gridCols: { base: string; md: string; lg: string }[];
  showDivider: boolean;
}[] = [
  {
    key: 'facilities',
    itemKeys: ['heatedPools', 'parking', 'kitchen', 'breakfast'],
    gridCols: [
      { base: 'col-span-1', md: 'md:col-start-1', lg: 'lg:col-start-1' },
      { base: 'col-span-1', md: 'md:col-start-2', lg: 'lg:col-start-2' },
      { base: 'col-span-1', md: 'md:col-start-3', lg: 'lg:col-start-4' },
      { base: 'col-span-1', md: 'md:col-start-4', lg: 'lg:col-start-5' },
    ],
    showDivider: true,
  },
  {
    key: 'services',
    itemKeys: ['airportTransfer', 'trainTransfer', 'beachTransfer', 'excursions'],
    gridCols: [
      { base: 'col-span-1', md: 'md:col-start-1', lg: 'lg:col-start-2' },
      { base: 'col-span-1', md: 'md:col-start-2', lg: 'lg:col-start-3' },
      { base: 'col-span-1', md: 'md:col-start-3', lg: 'lg:col-start-5' },
      { base: 'col-span-1', md: 'md:col-start-4', lg: 'lg:col-start-6' },
    ],
    showDivider: true,
  },
  {
    key: 'rooms',
    itemKeys: ['ac', 'wifi', 'laundry', 'housekeeping'],
    gridCols: [
      { base: 'col-span-1', md: 'md:col-start-1', lg: 'lg:col-start-1' },
      { base: 'col-span-1', md: 'md:col-start-2', lg: 'lg:col-start-3' },
      { base: 'col-span-1', md: 'md:col-start-3', lg: 'lg:col-start-4' },
      { base: 'col-span-1', md: 'md:col-start-4', lg: 'lg:col-start-6' },
    ],
    showDivider: false,
  },
];

function HeaderFlow() {
  return (
    <svg
      viewBox="0 0 800 48"
      className="mx-auto mt-md h-12 w-full max-w-2xl"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,24 C100,8 200,40 300,24 S500,8 600,24 S720,36 800,24"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.06"
      />
      <path
        d="M40,32 C160,16 280,36 400,20 S560,12 680,28 S740,34 800,26"
        fill="none"
        stroke="white"
        strokeWidth="0.75"
        opacity="0.06"
      />
      <path
        d="M80,16 C200,28 320,4 440,20 S600,32 720,12"
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="0.5"
        opacity="0.06"
      />
    </svg>
  );
}

export default function Amenities() {
  const t = useTranslations('amenities');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const poolImageRef = useRef<HTMLDivElement>(null);
  const poolPanelRef = useRef<HTMLDivElement>(null);

  const headingText = t('heading');

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(section.querySelectorAll('[data-heading-char]'), { opacity: 1, y: 0 });
      gsap.set(section.querySelectorAll('[data-amenity-card]'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const chars = heading.querySelectorAll('[data-heading-char]');
      gsap.fromTo(
        chars,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.025,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '[data-amenity-card]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-amenities-groups]',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      const poolImage = poolImageRef.current;
      const poolPanel = poolPanelRef.current;
      if (poolImage && poolPanel) {
        gsap.to(poolImage, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: poolPanel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [headingText]);

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="bg-charcoal section-padding"
    >
      <div className="container-content">
        {/* Header */}
        <div className="text-center">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
            {t('eyebrow')}
          </p>

          <h2
            ref={headingRef}
            className="mt-sm font-display text-h1 italic leading-[1.1] text-white"
            aria-label={headingText}
          >
            {headingText.split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-heading-char
                className="inline-block opacity-0"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>

          <HeaderFlow />
        </div>

        {/* Pool feature panel */}
        <div
          ref={poolPanelRef}
          className="mt-xl grid items-center gap-lg overflow-hidden lg:grid-cols-[45%_55%]"
        >
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-[400px]">
            <div
              ref={poolImageRef}
              className="amenity-pool-clip absolute inset-0 will-change-transform"
            >
              <Image
                src={POOL_IMAGE}
                alt={t('feature.imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          <div className="lg:pl-md">
            <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
              {t('feature.eyebrow')}
            </p>
            <h3 className="mt-sm font-display text-[3rem] font-light italic leading-[1.1] text-white">
              {t('feature.heading')}
            </h3>
            <p
              className="mt-md font-body text-body leading-[1.8]"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {t('feature.body')}
            </p>
            <div
              className="mt-md flex flex-wrap gap-sm font-body text-[0.85rem]"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              <span className="text-gold">{t('feature.stats.pools')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('feature.stats.yearRound')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('feature.stats.filtered')}</span>
            </div>
          </div>
        </div>

        {/* Amenity groups */}
        <div data-amenities-groups className="mt-2xl space-y-xl">
          {GROUPS.map((group) => (
            <div key={group.key} className="relative">
              <div className="mb-md flex items-center gap-sm">
                <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.35em] text-gold">
                  {t(`groups.${group.key}.label`)}
                </p>
                <div
                  className="hidden h-px flex-1 lg:block"
                  style={{ background: 'rgba(200, 169, 110, 0.2)' }}
                  aria-hidden="true"
                />
              </div>

              <div className="amenities-grid relative min-h-[200px]">
                {group.itemKeys.map((itemKey, index) => (
                  <AmenityIcon
                    key={itemKey}
                    itemKey={itemKey}
                    label={t(`groups.${group.key}.items.${itemKey}`)}
                    gridClass={`${group.gridCols[index].base} ${group.gridCols[index].md} ${group.gridCols[index].lg}`}
                  />
                ))}

                {group.showDivider && (
                  <div
                    className="pointer-events-none absolute -right-3 top-0 hidden h-full w-px lg:block"
                    style={{ background: 'rgba(200, 169, 110, 0.35)' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}