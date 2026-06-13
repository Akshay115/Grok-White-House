'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car } from 'lucide-react';
import RoomCard, { type RoomKey } from '@/components/ui/RoomCard';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_HREF = 'https://wa.me/79621574497';

const ROOM_CATALOG: { key: RoomKey; image: string; number: string }[] = [
  {
    key: 'standard',
    number: '01',
    image: '/images/room-interior.jpg',
  },
  {
    key: 'deluxe',
    number: '02',
    image: '/images/hero-villa.jpg',
  },
  {
    key: 'family',
    number: '03',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded549a5d?w=900&q=80',
  },
  {
    key: 'apartment',
    number: '04',
    image: '/images/aerial-villa.jpg',
  },
];

// Per-room photo galleries (high-end modern white villa style)
const ROOM_GALLERIES: Record<RoomKey, string[]> = {
  standard: ['/images/interior-living.jpg', 'https://images.unsplash.com/photo-1611892440504-42a784e15d7f?w=900&q=80', '/images/hero-villa.jpg'],
  deluxe: ['/images/hero-villa.jpg', '/images/interior-living.jpg', 'https://images.unsplash.com/photo-1611892440504-42a784e15d7f?w=900&q=80'],
  family: ['https://images.unsplash.com/photo-1598928506311-c55ded549a5d?w=900&q=80', '/images/aerial-villa.jpg', '/images/interior-living.jpg'],
  apartment: ['/images/aerial-villa.jpg', '/images/hero-villa.jpg', 'https://images.unsplash.com/photo-1611892440504-42a784e15d7f?w=900&q=80'],
};

export default function Rooms() {
  const t = useTranslations('rooms');
  const sectionRef = useRef<HTMLElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);

  const [selectedRoom, setSelectedRoom] = useState<RoomKey | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const closeModal = () => {
    setSelectedRoom(null);
    setGalleryIndex(0);
  };

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
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-sea-teal">
            {t('eyebrow')}
          </p>

          <h2 className="mt-sm font-display text-h1 italic leading-[1.1] text-charcoal">
            {t('heading')}
          </h2>

          <p className="mx-auto mt-sm max-w-xl font-display text-h3 font-light italic text-warm-gray-light">
            {t('subheading')}
          </p>

          <div
            ref={headerLineRef}
            className="mx-auto mt-md h-px w-[80px] origin-left bg-sea-teal"
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
              onSelect={setSelectedRoom}
            />
          ))}
        </div>

        {/* Booking note banner — luminous sculptural */}
        <div className="rooms-banner-clip mx-auto mt-xl flex max-w-4xl flex-col items-center gap-md p-md text-center sm:flex-row sm:justify-between sm:text-left md:p-[2.1rem]">
          <div className="flex items-center gap-sm">
            <Car className="h-6 w-6 shrink-0 text-sea-teal" strokeWidth={1.5} />
            <p className="font-body text-body text-charcoal/80">{t('banner.text')}</p>
          </div>

          <a
            href={WHATSAPP_HREF}
            data-analytics="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-sea-teal px-8 py-2.5 font-body text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-sea-teal transition-all hover:bg-sea-teal hover:text-white fluid-button"
          >
            {t('banner.cta')}
          </a>
        </div>
      </div>

      {/* Stunning Zaha-inspired Room Detail Modal with Gallery */}
      <AnimatePresence>
        {selectedRoom && (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/75 p-4 backdrop-blur-xl"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-pearl shadow-2xl"
            >
              {/* Parametric accent bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-sea-teal to-transparent" />

              <div className="grid md:grid-cols-12">
                {/* Left: Large image + gallery strip */}
                <div className="md:col-span-7 relative bg-warm-stone overflow-hidden">
                  <div className="relative aspect-[16/10] md:aspect-auto md:h-[520px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryIndex}
                        initial={{ opacity: 0.6, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={ROOM_GALLERIES[selectedRoom][galleryIndex]}
                          alt={`${t(`items.${selectedRoom}.name`)} photo ${galleryIndex + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/40" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Elegant room name overlay */}
                    <div className="absolute bottom-8 left-8 text-white drop-shadow-lg">
                      <div className="font-display text-5xl md:text-6xl italic tracking-[-2px]">{t(`items.${selectedRoom}.name`)}</div>
                      <div className="mt-1 text-sm tracking-[4px] opacity-80">{t(`items.${selectedRoom}.area`)} · {t(`items.${selectedRoom}.capacity`)}</div>
                    </div>
                  </div>

                  {/* Photo gallery strip */}
                  <div className="absolute bottom-4 right-4 flex gap-2 bg-white/90 backdrop-blur p-1.5 rounded-2xl shadow">
                    {ROOM_GALLERIES[selectedRoom].map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`relative h-12 w-16 overflow-hidden rounded-xl border-2 transition-all ${idx === galleryIndex ? 'border-sea-teal scale-[1.03]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Detailed panel */}
                <div className="md:col-span-5 p-8 md:p-10 flex flex-col text-charcoal relative">
                  <button
                    onClick={closeModal}
                    className="absolute right-6 top-6 text-3xl leading-none text-charcoal/30 hover:text-charcoal transition-colors"
                    aria-label="Close"
                  >
                    ×
                  </button>

                  <div>
                    <div className="uppercase tracking-[4px] text-xs text-sea-teal mb-1.5">{t('eyebrow')}</div>
                    <div className="font-display text-4xl md:text-[42px] italic tracking-[-1.5px] leading-none mb-3 pr-8">{t(`items.${selectedRoom}.name`)}</div>
                    <div className="text-[26px] font-light italic text-sea-teal mb-8">{t(`items.${selectedRoom}.priceFrom`)}</div>
                  </div>

                  <div className="text-[15px] leading-[1.7] text-charcoal/85 mb-8">
                    {t(`items.${selectedRoom}.description`)}
                  </div>

                  {/* Detailed specs */}
                  <div className="mb-7">
                    <div className="uppercase tracking-[2.5px] text-xs text-sea-teal mb-3">КЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ</div>
                    <div className="grid grid-cols-1 gap-y-2 text-[0.97rem]">
                      <div className="flex justify-between border-b border-charcoal/10 py-1"><span className="text-charcoal/60">Площадь</span> <span>{t(`items.${selectedRoom}.area`)}</span></div>
                      <div className="flex justify-between border-b border-charcoal/10 py-1"><span className="text-charcoal/60">Вместимость</span> <span>{t(`items.${selectedRoom}.capacity`)}</span></div>
                      <div className="flex justify-between border-b border-charcoal/10 py-1"><span className="text-charcoal/60">Вид</span> <span>Бассейн / Сад / Горы</span></div>
                      <div className="flex justify-between border-b border-charcoal/10 py-1"><span className="text-charcoal/60">Кухня</span> <span>Кухонный уголок / Полная</span></div>
                      <div className="flex justify-between border-b border-charcoal/10 py-1"><span className="text-charcoal/60">Балкон / Терраса</span> <span>Да, с видом</span></div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="uppercase tracking-[2.5px] text-xs text-sea-teal mb-3">ОСОБЕННОСТИ</div>
                    <ul className="grid grid-cols-1 gap-y-1.5 text-[0.97rem] text-charcoal/90 mb-8">
                      {(t.raw(`items.${selectedRoom}.features`) as string[]).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">— {f}</li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="#booking"
                        onClick={closeModal}
                        className="flex-1 text-center rounded-3xl bg-sea-teal py-3.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-sea-teal-light hover:text-charcoal transition-all"
                      >
                        Забронировать сейчас
                      </a>
                      <a
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center rounded-3xl border border-sea-teal py-3.5 text-sm font-semibold uppercase tracking-widest text-sea-teal hover:bg-sea-teal hover:text-white transition-all"
                      >
                        Написать в WhatsApp
                      </a>
                    </div>
                    <p className="mt-5 text-center text-[10px] tracking-[1.5px] text-charcoal/50">Бесплатный трансфер при бронировании от 3 ночей • Гибкая отмена</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}