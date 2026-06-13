'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import HadidFlow from '@/components/ui/HadidFlow';
import ParametricAccent from '@/components/ui/ParametricAccent';
import { staggerContainer, revealUp, springConfig } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const MAIN_IMAGE = '/images/aerial-villa.jpg';

export default function About() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textCol = textColRef.current;
    const imageCol = imageColRef.current;
    if (!section || !textCol || !imageCol) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([textCol, imageCol], { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textCol,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        imageCol,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream section-padding"
    >
      {/* Subtle flowing parametric background accent */}
      <HadidFlow variant="background" color="sea-teal" opacity={0.025} animate />

      <div className="container-content relative z-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
          {/* Text — flowing, asymmetric, generous breathing room (left on desktop) */}
          <motion.div 
            ref={textColRef} 
            className="w-full lg:w-[58%] opacity-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={revealUp} className="font-body text-[0.7rem] font-normal uppercase tracking-[0.42em] text-sea-teal">
              {t('eyebrow')}
            </motion.p>

            <motion.h2 variants={revealUp} className="mt-3 font-display text-h1 italic leading-[0.96] text-charcoal">
              {t('heading')}
            </motion.h2>

            <div className="mt-7 space-y-6 max-w-[52ch]">
              <motion.p variants={revealUp} className="font-body text-[1.02rem] leading-[1.78] text-warm-gray">
                {t('paragraphs.p1')}
              </motion.p>
              <motion.p variants={revealUp} className="font-body text-[1.02rem] leading-[1.78] text-warm-gray">
                {t('paragraphs.p2')}
              </motion.p>
              <motion.p variants={revealUp} className="font-body text-[1.02rem] leading-[1.78] text-warm-gray">
                {t('paragraphs.p3')}
              </motion.p>
            </div>

            {/* Subtle location highlight as flowing accent */}
            <motion.div variants={revealUp} className="mt-8 inline-flex items-center gap-2 border-l-2 border-sea-teal pl-4 text-sm text-warm-gray-light font-body tracking-wide">
              Перекрёсток Сириуса и Красной Поляны
            </motion.div>
          </motion.div>

          {/* Large image — asymmetric placement with curved feel (right on desktop) */}
          <div ref={imageColRef} className="w-full lg:w-[42%] opacity-0 relative">
            <div className="relative overflow-hidden rounded-[3rem] shadow-[0_30px_90px_-20px_rgb(0,0,0,0.12)]">
              {/* Organic curved clip on the image for flowing architectural feel */}
              <div className="aspect-[16/13] lg:aspect-[4/3.1] relative">
                <Image
                  src={MAIN_IMAGE}
                  alt={t('images.main')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />

                {/* Very subtle parametric flowing accent line on the image */}
                <div className="absolute inset-x-6 bottom-8 h-px opacity-30">
                  <svg width="100%" height="2" viewBox="0 0 300 2" preserveAspectRatio="none">
                    <motion.path
                      d="M0 1 Q 80 0 160 1.2 Q 240 2.2 300 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      className="text-sea-teal"
                      initial={{ pathLength: 0.3, opacity: 0.3 }}
                      whileInView={{ pathLength: 1, opacity: 0.55 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
                    />
                  </svg>
                </div>

                {/* Soft overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating decorative parametric element */}
            <div className="absolute -bottom-3 -right-3 hidden lg:block">
              <ParametricAccent 
                variant="line" 
                opacity={0.08} 
                color="sea-teal" 
                animate 
                className="w-28" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}