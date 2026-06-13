'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HadidFlow from '@/components/ui/HadidFlow';

const HERO_IMAGE = '/images/hero-main.jpg';

// Subtle light particles for cinematic atmosphere (dust / light specks)
function LightParticles() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${15 + ((i * 11) % 70)}%`,
            top: `${25 + (i % 4) * 15}%`,
            width: 1.5 + (i % 3) * 0.8,
            height: 1.5 + (i % 3) * 0.8,
            opacity: 0.06 + (i % 3) * 0.025,
            filter: 'blur(0.6px)',
          }}
          animate={{
            y: [0, -28 - i * 1.5, 0],
            x: [0, (i % 2 === 0 ? 8 : -6), 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 11 + i * 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-driven subtle parallax / tilt for decorative layers (cinematic depth)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 18, mass: 0.6 });

  const tiltX = useTransform(springY, [-400, 400], [1.8, -1.8]);
  const tiltY = useTransform(springX, [-400, 400], [-2.2, 2.2]);

  // Text stagger with spring physics (Framer Motion)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.085,
        delayChildren: 0.35,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 42 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 21,
        mass: 0.75,
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 24,
        mass: 0.6,
      },
    },
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => {
        if (prefersReducedMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        if (!prefersReducedMotion) {
          mouseX.set(0);
          mouseY.set(0);
        }
      }}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#f8f5f0]"
    >
      {/* Cinematic background — high-end architectural photography of the white villa */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt={t('imageAlt')}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />

        {/* Cinematic depth layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] via-black/[0.015] to-black/[0.07]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.18)_0%,transparent_55%)]" />

        {/* Subtle light particles / atmospheric specks */}
        <LightParticles />
      </div>

      {/* Very subtle parametric flowing line overlays — refined Zaha Hadid language */}
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : tiltX,
          rotateY: prefersReducedMotion ? 0 : tiltY,
          transformPerspective: 1200,
        }}
        className="absolute inset-0 z-[2] pointer-events-none"
      >
        <HadidFlow
          variant="hero"
          color="sea-teal"
          opacity={0.055}
          animate
        />
      </motion.div>

      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : tiltX,
          rotateY: prefersReducedMotion ? 0 : tiltY,
          transformPerspective: 1400,
        }}
        className="absolute inset-0 z-[1] pointer-events-none scale-[1.08]"
      >
        <HadidFlow
          variant="hero"
          color="gold"
          opacity={0.035}
          animate
        />
      </motion.div>

      {/* Foreground cinematic content — elegantly centered */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-[820px] text-center">
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 font-body text-[0.72rem] font-normal uppercase tracking-[0.48em] text-sea-teal/90"
          >
            {t('eyebrow')}
          </motion.p>

          {/* Main headline — Russian primary, large & refined */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-display text-[clamp(3.1rem,8.2vw,5.8rem)] leading-[0.88] tracking-[-0.015em] text-charcoal italic">
              {t('headline')}
            </h1>

            {/* Elegant English subtitle below */}
            <p className="mt-1 font-display text-[clamp(1.15rem,2.8vw,1.85rem)] font-light tracking-[0.01em] text-charcoal/70 italic">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Poetic tagline */}
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-[620px] font-body text-[1.02rem] leading-[1.65] text-charcoal/75"
          >
            {t('tagline')}
          </motion.p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {/* Primary CTA — elegant, magnetic, glow on hover */}
            <motion.a
              href="#booking"
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-sea-teal px-9 py-[0.92rem] font-body text-[0.85rem] font-semibold uppercase tracking-[0.11em] text-white shadow-[0_10px_30px_-12px_rgb(91,163,184,0.45)] transition-all duration-300 hover:bg-sea-teal-light hover:text-charcoal"
            >
              {t('ctaPrimary')}
              {/* Elegant inner glow / draw effect */}
              <span className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.a>

            {/* Secondary CTA — subtle with draw/scale */}
            <motion.a
              href="#about"
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              className="group relative inline-flex items-center justify-center rounded-[2.5rem] border border-charcoal/35 px-8 py-[0.9rem] font-body text-[0.84rem] font-medium uppercase tracking-[0.115em] text-charcoal transition-all duration-300 hover:border-sea-teal hover:text-sea-teal"
            >
              {t('ctaSecondary')}
              {/* Subtle animated underline draw */}
              <span className="absolute -bottom-[1px] left-1/2 h-px w-0 -translate-x-1/2 bg-sea-teal transition-all duration-300 group-hover:w-8" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Elegant scroll prompt — minimal and refined */}
      <motion.a
        href="#about"
        aria-label={t('aboutAria')}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: 'easeOut' }}
        className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-charcoal/50"
      >
        <div className="h-px w-5 bg-current" />
        <span className="font-body text-[0.6rem] font-normal uppercase tracking-[0.32em]">
          {t('scrollHint')}
        </span>
      </motion.a>
    </section>
  );
}