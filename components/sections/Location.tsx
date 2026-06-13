'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Car, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import DistanceCard from '@/components/ui/DistanceCard';
import LocationMap from '@/components/ui/LocationMap';
import { loadGsap, loadScrollTrigger } from '@/lib/gsap-client';

const DEST_KEYS = [
  'airport',
  'station',
  'beach',
  'rosa',
  'olympic',
  'shops',
] as const;

const FAN_POSITIONS: Record<
  (typeof DEST_KEYS)[number],
  string
> = {
  airport: 'lg:absolute lg:left-0 lg:top-[2%] lg:max-w-[220px]',
  station: 'lg:absolute lg:left-0 lg:top-[38%] lg:max-w-[220px]',
  shops: 'lg:absolute lg:bottom-[8%] lg:left-[4%] lg:max-w-[220px]',
  beach: 'lg:absolute lg:bottom-0 lg:left-[28%] lg:max-w-[220px]',
  olympic: 'lg:absolute lg:bottom-[8%] lg:right-[4%] lg:max-w-[220px]',
  rosa: 'lg:absolute lg:right-0 lg:top-[2%] lg:max-w-[220px]',
};

const YANDEX_MAPS =
  'https://yandex.ru/maps?ll=39.969182,43.464403&mode=routes&rtext=~43.464403,39.969182&z=17';
const WHATSAPP = 'https://wa.me/79621574497';
const TELEGRAM = 'https://t.me/SochiWhiteHouse';
const VK = 'https://vk.com/sochiwhitehouse';

export default function Location() {
  const t = useTranslations('location');
  const sectionRef = useRef<HTMLElement>(null);

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
        gsap.set(section.querySelectorAll('[data-distance-card]'), {
          opacity: 1,
          x: 0,
          y: 0,
        });
        gsap.set('[data-location-map]', { opacity: 1, scale: 1 });
        gsap.set('[data-transfer-banner]', { opacity: 1, y: 0 });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-location-map]',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '[data-location-map-area]',
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        const cards = section.querySelectorAll('[data-distance-card]');
        cards.forEach((card, index) => {
          const fromRight = index % 2 === 1;
          gsap.fromTo(
            card,
            { opacity: 0, x: fromRight ? 40 : -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '[data-distance-area]',
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        gsap.fromTo(
          '[data-transfer-banner]',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '[data-transfer-banner]',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="location-gradient section-padding"
    >
      <div className="container-content">
        {/* Header */}
        <div className="text-center">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-sm font-display text-h1 italic leading-[1.1] text-deep-navy">
            {t('heading')}
          </h2>
          <p className="mx-auto mt-sm max-w-xl font-display text-h3 font-light italic text-gold">
            {t('subheading')}
          </p>
        </div>

        {/* Map + distance fan */}
        <div
          data-location-map-area
          data-distance-area
          className="relative mx-auto mt-xl max-w-6xl"
        >
          {/* Desktop fan layout */}
          <div className="relative hidden min-h-[620px] lg:block">
            <div className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2">
              <LocationMap />
            </div>

            {DEST_KEYS.map((key) => (
              <DistanceCard
                key={key}
                destKey={key}
                time={t(`destinations.${key}.time`)}
                unit={t('unit')}
                label={t(`destinations.${key}.label`)}
                className={FAN_POSITIONS[key]}
              />
            ))}
          </div>

          {/* Mobile / tablet grid */}
          <div className="lg:hidden">
            <LocationMap />
            <div className="mt-md grid grid-cols-2 gap-sm">
              {DEST_KEYS.map((key) => (
                <DistanceCard
                  key={key}
                  destKey={key}
                  time={t(`destinations.${key}.time`)}
                  unit={t('unit')}
                  label={t(`destinations.${key}.label`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Transfer banner */}
        <div
          data-transfer-banner
          className="mt-xl flex flex-col items-center gap-md bg-deep-navy p-lg opacity-0 md:flex-row md:justify-between md:gap-lg md:p-[3rem]"
        >
          <Car
            className="h-12 w-12 shrink-0 text-gold"
            strokeWidth={1.5}
          />

          <div className="flex-1 text-center md:text-left">
            <h3 className="font-body text-h3 font-semibold text-white">
              {t('transfer.heading')}
            </h3>
            <p
              className="mt-xs font-body text-body leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {t('transfer.body')}
            </p>
          </div>

          <a
            href="#booking"
            data-analytics="book"
            className="shrink-0 rounded-[2px] border border-gold px-lg py-sm font-body text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
          >
            {t('transfer.cta')}
          </a>
        </div>

        {/* Address + contact bar */}
        <div className="mt-lg flex flex-col items-center justify-between gap-md border-t border-charcoal/10 py-md md:flex-row">
          <div className="flex flex-col items-center gap-xs md:items-start">
            <a
              href={YANDEX_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-xs font-body text-[0.85rem] text-charcoal transition-colors hover:text-gold"
            >
              <MapPin className="h-4 w-4 text-gold" />
              {t('address')}
            </a>
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              data-analytics="phone"
              className="inline-flex items-center gap-xs font-body text-[0.85rem] text-charcoal transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" />
              {t('phone')}
            </a>
          </div>

          <div className="flex items-center gap-md">
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-opacity hover:opacity-70"
              aria-label={t('social.telegram')}
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href={WHATSAPP}
              data-analytics="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-opacity hover:opacity-70"
              aria-label={t('social.whatsapp')}
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={VK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[0.75rem] font-medium text-gold transition-opacity hover:opacity-70"
              aria-label={t('social.vk')}
            >
              VK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}