'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import { loadGsap, loadScrollTrigger } from '@/lib/gsap-client';

// Dynamic import to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import('@/components/ui/LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="relative mx-auto w-full max-w-5xl h-[520px] rounded-3xl bg-warm-stone/60 flex items-center justify-center">
      <div className="text-warm-gray-light text-sm tracking-widest uppercase">Загрузка карты…</div>
    </div>
  ),
});

const DEST_KEYS = ['airport', 'station', 'beach', 'rosa'] as const;

const YANDEX_MAPS =
  'https://yandex.ru/maps?ll=39.969182,43.464403&mode=routes&rtext=~43.464403,39.969182&z=17';
const WHATSAPP = 'https://wa.me/79621574497';
const TELEGRAM = 'https://t.me/SochiWhiteHouse';
const VK = 'https://vk.com/sochiwhitehouse';

export default function Location() {
  const t = useTranslations('location');
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<string | undefined>();

  // Framer spring cards data (focused on key highlights + free transfers emphasized)
  const highlights = [
    { key: 'airport', time: '7', unit: t('unit'), label: t('destinations.airport.label'), desc: 'Международный аэропорт Сочи', free: true },
    { key: 'station', time: '12', unit: t('unit'), label: t('destinations.station.label'), desc: 'Железнодорожный вокзал Адлер', free: true },
    { key: 'beach', time: '10', unit: t('unit'), label: t('destinations.beach.label'), desc: 'Пляжи и инфраструктура Сириуса', free: true },
    { key: 'rosa', time: '30', unit: t('unit'), label: t('destinations.rosa.label'), desc: 'Горнолыжные курорты Красной Поляны', free: false },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsap = await loadGsap();
      await loadScrollTrigger();

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set('[data-location-map]', { opacity: 1, scale: 1 });
        gsap.set('[data-transfer-banner]', { opacity: 1, y: 0 });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-location-map]',
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '[data-location-map-area]',
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          '[data-transfer-banner]',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '[data-transfer-banner]',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  const handleCardClick = (key: string) => {
    setSelected(key);
    // Scroll map into view smoothly
    const mapArea = document.querySelector('[data-location-map-area]');
    if (mapArea) {
      mapArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 22, delay: i * 0.04 },
    }),
  };

  return (
    <section
      id="location"
      ref={sectionRef}
      className="location-gradient section-padding"
    >
      <div className="container-content">
        {/* Elegant headline */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-sea-teal">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-h1 italic leading-[0.96] text-charcoal">
            {t('heading')}
          </h2>
          <p className="mt-2 text-lg md:text-xl font-light italic text-warm-gray-light tracking-tight">
            {t('subheading')}
          </p>
        </div>

        {/* Interactive Map */}
        <div data-location-map-area className="relative mx-auto mt-10 max-w-5xl">
          <div data-location-map>
            <InteractiveMap 
              selected={selected} 
              onMarkerClick={(key) => setSelected(key)} 
            />
          </div>
          <p className="mt-3 text-center text-xs tracking-[0.5px] uppercase text-warm-gray-light">
            Нажмите на маркер или карточку — карта переместится к локации
          </p>
        </div>

        {/* Beautiful animated highlight cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {highlights.map((h, index) => (
            <motion.button
              key={h.key}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              onClick={() => handleCardClick(h.key)}
              className={`group text-left p-6 rounded-2xl border transition-all duration-200 flex flex-col bg-white hover:shadow-[0_20px_50px_-12px_rgb(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-sea-teal ${
                selected === h.key 
                  ? 'border-sea-teal ring-1 ring-sea-teal shadow-md' 
                  : 'border-warm-gray/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-[2.35rem] font-light italic leading-none text-sea-teal tracking-tighter">
                    {h.time}
                  </div>
                  <div className="text-[10px] uppercase tracking-[1.5px] text-warm-gray-light mt-0.5">{h.unit}</div>
                </div>
                <div className="text-sea-teal/70 group-hover:text-sea-teal transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 font-medium text-charcoal tracking-tight text-[15px]">{h.label}</div>
              <div className="mt-1 text-sm text-warm-gray-light leading-snug">{h.desc}</div>

              {h.free && (
                <div className="mt-auto pt-4 text-[10px] font-semibold tracking-[0.8px] uppercase text-sea-teal inline-flex items-center gap-1">
                  БЕСПЛАТНЫЙ ТРАНСФЕР
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Prominent free transfers banner */}
        <div
          data-transfer-banner
          className="mt-10 flex flex-col items-center gap-5 bg-charcoal text-white p-8 md:p-10 rounded-3xl md:flex-row md:items-center md:justify-between max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-5">
            <Car className="h-10 w-10 shrink-0 text-sea-teal-light" strokeWidth={1.6} />
            <div>
              <div className="font-semibold tracking-tight text-xl md:text-2xl">{t('transfer.heading')}</div>
              <p className="mt-1 text-white/75 max-w-md text-[15px] leading-relaxed">{t('transfer.body')}</p>
            </div>
          </div>

          <a
            href="#booking"
            data-analytics="book"
            className="shrink-0 mt-2 md:mt-0 inline-flex items-center justify-center rounded-3xl border border-white/40 px-7 py-3 text-sm font-medium uppercase tracking-widest transition hover:bg-white hover:text-charcoal active:scale-[0.985]"
          >
            {t('transfer.cta')}
          </a>
        </div>

        {/* Address + contacts */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-charcoal/10 py-5 text-sm md:flex-row max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-1.5 md:items-start text-charcoal/80">
            <a
              href={YANDEX_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-sea-teal transition-colors"
            >
              <MapPin className="h-4 w-4" /> {t('address')}
            </a>
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-sea-teal transition-colors"
            >
              <Phone className="h-4 w-4" /> {t('phone')}
            </a>
          </div>

          <div className="flex items-center gap-5 text-sea-teal">
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" aria-label={t('social.telegram')} className="hover:text-sea-teal-light transition">
              <Send className="h-4 w-4" />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label={t('social.whatsapp')} className="hover:text-sea-teal-light transition">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={VK} target="_blank" rel="noopener noreferrer" className="text-xs font-medium tracking-wider hover:text-sea-teal-light transition">
              VK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}