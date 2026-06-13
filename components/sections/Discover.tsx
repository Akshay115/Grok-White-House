'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, Mountain, Waves, UtensilsCrossed, Sparkles, Trophy, Map } from 'lucide-react';
import HadidFlow from '@/components/ui/HadidFlow';
import ParametricAccent from '@/components/ui/ParametricAccent';
import { Icon } from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { staggerContainer, revealUp, cardHover, springConfig } from '@/lib/animations';

const EXPERIENCES = [
  {
    key: 'sirius-beaches',
    icon: Waves,
    cta: 'explore',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    time: '10 мин',
  },
  {
    key: 'krasnaya-polyana',
    icon: Mountain,
    cta: 'explore',
    image: '/images/aerial-villa.jpg',
    time: '30 мин',
  },
  {
    key: 'olympic-park',
    icon: Trophy,
    cta: 'explore',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    time: '10 мин',
  },
  {
    key: 'abkhazia',
    icon: Compass,
    cta: 'book',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    time: '1–2 ч · День',
  },
];

export default function Discover() {
  const t = useTranslations('discover');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
  }, []);

  return (
    <section
      id="discover"
      ref={sectionRef}
      className="relative overflow-hidden bg-white section-padding"
    >
      <HadidFlow variant="background" color="gold" opacity={0.035} animate />

      <div className="container-content relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-sea-teal">
            {t('eyebrow')}
          </p>
          <h2 className="mt-sm font-display text-h1 italic leading-[1.05] text-charcoal">
            {t('heading')}
          </h2>
          <p className="mt-sm mx-auto max-w-xl font-display text-h3 font-light italic text-warm-gray-light">
            {t('subheading')}
          </p>
          <ParametricAccent className="mx-auto mt-6 w-48" opacity={0.06} />
        </div>

        <div className="mt-xl grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {EXPERIENCES.map((exp, index) => {
            const title = t(`experiences.${exp.key}.title`);
            const desc = t(`experiences.${exp.key}.desc`);
            const duration = t(`experiences.${exp.key}.duration`) || exp.time;
            const imgSrc = exp.image || t(`experiences.${exp.key}.image`);
            const isAbkhazia = exp.key === 'abkhazia';
            return (
              <motion.article
                key={exp.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.015 }}
                transition={{ 
                  ...springConfig.gentle, 
                  delay: index * 0.04 
                }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-warm-gray/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Stunning image with time badge */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <Image 
                    src={imgSrc} 
                    alt={title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
                  
                  {/* Time / distance badge */}
                  <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium tracking-widest text-charcoal shadow">
                    {duration}
                  </div>

                  {/* Parametric subtle line overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sea-teal/40 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-sea-teal/20 text-sea-teal bg-sea-teal/5">
                      <Icon icon={exp.icon} size={18} color="teal" />
                    </div>
                    <h3 className="font-body text-lg font-semibold tracking-tight text-charcoal">
                      {title}
                    </h3>
                  </div>

                  <p className="flex-1 text-[0.95rem] leading-relaxed text-warm-gray-light">
                    {desc}
                  </p>

                  <div className="mt-6">
                    {isAbkhazia ? (
                      <a 
                        href="#booking" 
                        className="btn-primary inline-flex w-full justify-center text-sm py-2.5"
                      >
                        {t('inquire')}
                      </a>
                    ) : (
                      <a 
                        href="#location" 
                        className="group inline-flex items-center text-sm font-medium text-sea-teal hover:text-charcoal transition-colors"
                      >
                        {t('cta')} 
                        <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Subtle map integration */}
        <div className="mt-10 flex justify-center">
          <a 
            href="#location" 
            className="group inline-flex items-center gap-3 rounded-3xl border border-sea-teal/30 bg-white/60 px-6 py-3 text-sm font-medium text-sea-teal backdrop-blur transition-all hover:bg-sea-teal hover:text-white hover:border-sea-teal"
          >
            <Map className="h-4 w-4" />
            {t('viewMap')}
            <span className="text-xs opacity-60 group-hover:opacity-100">→</span>
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="mx-auto max-w-md font-body text-body text-warm-gray-light">
            {t('closing')}
          </p>
          <div className="mt-4">
            <a
              href="#booking"
              className="btn-secondary inline-flex items-center justify-center font-body uppercase tracking-[0.1em] rounded-[3rem] py-[0.85rem] px-8 text-[0.82rem]"
            >
              {t('inquire')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
