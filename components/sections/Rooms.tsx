'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car } from 'lucide-react';
import RoomCard, { type RoomKey } from '@/components/ui/RoomCard';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_HREF = 'https://wa.me/79621574497';

const ROOM_CATALOG: { key: RoomKey; image: string; number: string }[] = [
  {
    key: 'standard',
    number: '01',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80',
  },
  {
    key: 'deluxe',
    number: '02',
    image: 'https://images.unsplash.com/photo-1611892440504-42a784e15d7f?w=700&q=80',
  },
  {
    key: 'family',
    number: '03',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded549a5d?w=700&q=80',
  },
  {
    key: 'apartment',
    number: '04',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80',
  },
];

export default function Rooms() {
  const t = useTranslations('rooms');
  const sectionRef = useRef<HTMLElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headerLine = headerLineRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(section.querySelectorAll('[data-room-card]'), {
        opacity: 1,
        y: 0,
      });
      if (headerLine) gsap.set(headerLine, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (headerLine) {
        gsap.fromTo(
          headerLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '[data-rooms-header]',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        '[data-room-card]',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-rooms-grid]',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="bg-off-white section-padding"
    >
      {/* Section header strip */}
      <div
        data-rooms-header
        className="rooms-header-gradient -mx-sm mb-xl px-sm py-xl md:-mx-md md:px-md"
      >
        <div className="container-content text-center">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
            {t('eyebrow')}
          </p>

          <h2 className="mt-sm font-display text-h1 italic leading-[1.1] text-deep-navy">
            {t('heading')}
          </h2>

          <p className="mx-auto mt-sm max-w-xl font-display text-h3 font-light italic text-gold">
            {t('subheading')}
          </p>

          <div
            ref={headerLineRef}
            className="mx-auto mt-md h-px w-[80px] origin-left bg-gold"
            style={{ transform: 'scaleX(0)' }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Room grid */}
      <div className="container-content">
        <div
          data-rooms-grid
          className="grid grid-cols-1 gap-md md:grid-cols-2 md:gap-md xl:grid-cols-4 xl:gap-md"
        >
          {ROOM_CATALOG.map((room) => (
            <RoomCard
              key={room.key}
              roomKey={room.key}
              imageSrc={room.image}
              roomNumber={room.number}
            />
          ))}
        </div>

        {/* Booking note banner */}
        <div className="rooms-banner-clip mx-auto mt-xl flex max-w-4xl flex-col items-center gap-md bg-deep-navy p-md text-center sm:flex-row sm:justify-between sm:text-left md:p-[2rem]">
          <div className="flex items-center gap-sm">
            <Car className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
            <p className="font-body text-body text-white/80">{t('banner.text')}</p>
          </div>

          <a
            href={WHATSAPP_HREF}
            data-analytics="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-[2px] border border-gold px-lg py-sm font-body text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
          >
            {t('banner.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}