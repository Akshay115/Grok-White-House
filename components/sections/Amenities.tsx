'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Waves,
  UtensilsCrossed,
  Car,
  Utensils,
  Wind,
  Wifi,
  Sparkles,
  ParkingSquare,
  Map,
  Coffee,
} from 'lucide-react';
import HadidFlow from '@/components/ui/HadidFlow';
import ParametricAccent from '@/components/ui/ParametricAccent';
import { staggerContainer, revealUp, springConfig } from '@/lib/animations';

const ICONS: Record<string, React.ElementType> = {
  heatedPools: Waves,
  bbq: UtensilsCrossed,
  freeTransfer: Car,
  kitchen: Utensils,
  ac: Wind,
  wifi: Wifi,
  dailyCleaning: Sparkles,
  parking: ParkingSquare,
  excursions: Map,
  breakfast: Coffee,
};

const AMENITY_KEYS = [
  'heatedPools',
  'bbq',
  'freeTransfer',
  'kitchen',
  'ac',
  'wifi',
  'dailyCleaning',
  'parking',
  'excursions',
  'breakfast',
] as const;

export default function Amenities() {
  const t = useTranslations('amenities');
  const sectionRef = useRef<HTMLElement>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.985 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
        delay: i * 0.04,
      },
    }),
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 2 },
  };

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="bg-cream section-padding relative overflow-hidden"
    >
      {/* Very subtle parametric background texture */}
      <HadidFlow variant="background" color="sea-teal" opacity={0.02} animate />

      <div className="container-content relative z-10">
        {/* Elegant Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.42em] text-sea-teal">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-h1 italic leading-[0.96] text-charcoal">
            {t('heading')}
          </h2>
          <p className="mt-3 text-[1.05rem] text-warm-gray-light max-w-md mx-auto">
            {t('intro')}
          </p>
          <div className="mx-auto mt-4">
            <ParametricAccent variant="line" opacity={0.12} className="w-20" />
          </div>
        </div>

        {/* Signature Feature — Two Heated Pools (curved organic container) */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative rounded-[3.5rem] overflow-hidden bg-white shadow-[0_25px_70px_-20px_rgb(0,0,0,0.08)] p-1">
            <div className="flex flex-col lg:flex-row items-stretch gap-1">
              {/* Image / visual side with curve */}
              <div className="lg:w-5/12 relative min-h-[280px] lg:min-h-[360px] bg-warm-stone rounded-[3rem] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(91,163,184,0.12)_0%,transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Waves className="mx-auto h-14 w-14 text-sea-teal mb-3" strokeWidth={1.3} />
                    <div className="font-display text-3xl italic text-sea-teal tracking-tight">
                      {t('feature.heading')}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[2px] text-warm-gray-light">
                      {t('feature.stats.pools')} · {t('feature.stats.yearRound')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col justify-center">
                <p className="font-body text-[0.7rem] uppercase tracking-[0.4em] text-sea-teal mb-2">
                  {t('feature.eyebrow')}
                </p>
                <p className="text-[1.05rem] leading-[1.7] text-warm-gray max-w-prose">
                  {t('feature.body')}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-warm-gray-light">
                  <span className="font-medium text-charcoal">{t('feature.stats.pools')}</span>
                  <span>·</span>
                  <span>{t('feature.stats.yearRound')}</span>
                  <span>·</span>
                  <span>{t('feature.stats.filtered')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful flowing masonry/grid of amenities */}
        <motion.div 
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {AMENITY_KEYS.map((key, index) => {
            const Icon = ICONS[key];
            const title = t(`items.${key}.title`);
            const desc = t(`items.${key}.desc`);

            return (
              <motion.div
                key={key}
                variants={revealUp}
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  transition: { type: 'spring', stiffness: 280, damping: 18 }
                }}
                className="group relative flex flex-col rounded-[2.25rem] bg-white p-7 lg:p-8 shadow-[0_10px_40px_-15px_rgb(0,0,0,0.06)] border border-warm-gray/5 hover:border-sea-teal/20 transition-colors duration-300"
              >
                {/* Subtle curved decorative element on some cards */}
                {index % 3 === 0 && (
                  <div className="absolute top-5 right-5 h-px w-8 bg-gradient-to-r from-sea-teal/30 to-transparent rounded" />
                )}

                <div className="mb-5">
                  <motion.div
                    variants={iconVariants}
                    initial="rest"
                    whileHover="hover"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sea-teal/8 text-sea-teal group-hover:bg-sea-teal/12 transition-colors"
                  >
                    {Icon && <Icon className="h-6 w-6" strokeWidth={1.7} />}
                  </motion.div>
                </div>

                <h3 className="font-body text-[1.05rem] font-semibold tracking-tight text-charcoal mb-2.5">
                  {title}
                </h3>

                <p className="text-[0.95rem] leading-[1.65] text-warm-gray-light flex-1">
                  {desc}
                </p>

                {/* Subtle reveal on hover */}
                <div className="mt-4 h-px w-6 bg-sea-teal/30 group-hover:w-10 transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Gentle closing note */}
        <div className="mt-10 text-center text-sm text-warm-gray-light tracking-wide max-w-md mx-auto">
          Каждый элемент создан для вашего полного комфорта и ощущения дома вдали от дома.
        </div>
      </div>
    </section>
  );
}