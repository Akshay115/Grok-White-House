'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Users } from 'lucide-react';

export type RoomKey = 'standard' | 'deluxe' | 'family' | 'apartment';

type RoomCardProps = {
  roomKey: RoomKey;
  imageSrc: string;
  roomNumber: string;
};

export default function RoomCard({ roomKey, imageSrc, roomNumber }: RoomCardProps) {
  const t = useTranslations('rooms');
  const cardRef = useRef<HTMLElement>(null);

  const features = t.raw(`items.${roomKey}.features`) as string[];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateX: y * -6,
        rotateY: x * 10,
        transformPerspective: 1200,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      data-room-card
      className="group flex min-h-[520px] w-full flex-col overflow-hidden bg-white opacity-0 transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(200,169,110,0.15)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Image area — 60% */}
      <div className="relative h-[60%] min-h-[280px] shrink-0 overflow-hidden">
        <div className="room-clip-image relative h-full w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={t(`items.${roomKey}.name`)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 25vw"
          />
        </div>

        <span
          className="pointer-events-none absolute left-md top-md font-display text-[3rem] font-light italic leading-none"
          style={{ color: 'rgba(255, 255, 255, 0.3)' }}
          aria-hidden="true"
        >
          {roomNumber}
        </span>

        <div className="absolute right-md top-md flex items-center gap-xs rounded-full bg-white/90 px-sm py-xs backdrop-blur-sm">
          <Users className="h-3.5 w-3.5 text-charcoal" strokeWidth={1.5} />
          <span className="font-body text-[0.75rem] font-medium text-charcoal">
            {t(`items.${roomKey}.capacityShort`)}
          </span>
        </div>
      </div>

      {/* Content area — 40% */}
      <div className="flex flex-1 flex-col border-l-[3px] border-l-transparent px-[2rem] py-[1.5rem] transition-colors duration-300 group-hover:border-l-gold">
        <h3 className="font-body text-[1.1rem] font-bold uppercase tracking-[0.08em] text-charcoal">
          {t(`items.${roomKey}.name`)}
        </h3>

        <p className="mt-xs font-body text-[0.85rem] text-charcoal/50">
          {t(`items.${roomKey}.area`)}
          <span className="mx-xs">{t('metaSeparator')}</span>
          {t(`items.${roomKey}.capacity`)}
        </p>

        <ul className="mt-sm flex flex-wrap gap-xs">
          {features.map((feature) => (
            <li
              key={feature}
              className="rounded-[2px] bg-ocean-mist px-[0.75rem] py-[0.25rem] font-body text-[0.75rem] text-ocean"
            >
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between pt-md">
          <p className="font-display text-[1.5rem] font-light italic text-gold">
            {t(`items.${roomKey}.priceFrom`)}
          </p>

          <a
            href="#booking"
            className="group/details flex items-center gap-xs font-body text-[0.85rem] font-medium text-charcoal transition-colors hover:text-gold"
          >
            {t('details')}
            <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-gold text-white transition-transform duration-300 group-hover/details:translate-x-1 group-hover/details:bg-gold/90">
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}