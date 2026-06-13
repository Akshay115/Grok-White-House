'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mountain, Plane, Waves } from 'lucide-react';
import HadidFlow from '@/components/ui/HadidFlow';

gsap.registerPlugin(ScrollTrigger);

const FACT_KEYS = ['airport', 'rosa', 'beach'] as const;

const FACT_ICONS = {
  airport: Plane,
  rosa: Mountain,
  beach: Waves,
} as const;

const COLLAGE_IMAGES = {
  main: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
  left: 'https://images.unsplash.com/photo-1575429198097-0414c8c0e0c5?w=600&q=80',
  right: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
};

type CollageImageProps = {
  src: string;
  alt: string;
  clipClass: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  accentBorder?: boolean;
};

function CollageImage({
  src,
  alt,
  clipClass,
  className = '',
  sizes,
  priority = false,
  accentBorder = false,
}: CollageImageProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    y.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`card-tilt group overflow-hidden ${clipClass} ${className} ${
        accentBorder ? 'border-r-[3px] border-gold' : ''
      }`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? 'high' : 'auto'}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes={sizes}
        />
      </div>
    </motion.div>
  );
}

export default function About() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol || !rightCol) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          leftCol,
          rightCol,
          section.querySelectorAll('[data-about-quote]'),
          section.querySelectorAll('[data-about-fact]'),
        ],
        { opacity: 1, x: 0, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftCol,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        rightCol,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '[data-about-quote]',
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-about-quote]',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '[data-about-fact]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-about-facts]',
            start: 'top 85%',
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
      className="relative overflow-hidden bg-deep-navy section-padding"
    >
      <HadidFlow variant="background" color="gold" opacity={0.04} animate />

      <div className="container-content relative z-10">
        <div className="flex flex-col gap-lg lg:flex-row lg:gap-xl">
          {/* Left column — 55% */}
          <div ref={leftColRef} className="w-full opacity-0 lg:w-[55%]">
            <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
              {t('eyebrow')}
            </p>

            <h2 className="mt-sm font-display text-h1 italic leading-[1.1] text-white">
              {t('heading')}
            </h2>

            <div className="mt-md space-y-sm">
              <p
                className="font-body text-body leading-[1.8]"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {t('paragraphs.p1')}
              </p>
              <p
                className="font-body text-body leading-[1.8]"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {t('paragraphs.p2')}
              </p>
              <p
                className="font-body text-body leading-[1.8]"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {t('paragraphs.p3')}
              </p>
            </div>

            <blockquote
              data-about-quote
              className="mt-lg border-l-[3px] border-gold pl-[1.5rem] opacity-0"
            >
              <p className="font-display text-[1.4rem] font-normal italic text-gold-light">
                &ldquo;{t('quote.text')}&rdquo;
              </p>
              <footer
                className="mt-xs font-body text-[0.8rem]"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                — {t('quote.attribution')}
              </footer>
            </blockquote>

            <div
              data-about-facts
              className="mt-lg flex flex-col gap-md sm:flex-row sm:gap-lg"
            >
              {FACT_KEYS.map((key) => {
                const Icon = FACT_ICONS[key];
                return (
                  <div
                    key={key}
                    data-about-fact
                    className="flex flex-1 items-center gap-sm opacity-0"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-display text-[2rem] font-light italic leading-none text-gold">
                        {t(`facts.${key}.value`)}
                      </p>
                      <p
                        className="mt-0.5 font-body text-[0.8rem]"
                        style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                      >
                        {t(`facts.${key}.label`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — 45% image collage */}
          <div ref={rightColRef} className="w-full opacity-0 lg:w-[45%]">
            <CollageImage
              src={COLLAGE_IMAGES.main}
              alt={t('images.main')}
              clipClass="about-clip-main"
              className="relative h-[280px] w-full sm:h-[320px]"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
              accentBorder
            />

            <div className="mt-sm grid grid-cols-1 gap-sm sm:grid-cols-2">
              <CollageImage
                src={COLLAGE_IMAGES.left}
                alt={t('images.secondary1')}
                clipClass="about-clip-left"
                className="relative h-[200px] w-full"
                sizes="(max-width: 640px) 100vw, 22vw"
              />
              <CollageImage
                src={COLLAGE_IMAGES.right}
                alt={t('images.secondary2')}
                clipClass="about-clip-right"
                className="relative h-[200px] w-full"
                sizes="(max-width: 640px) 100vw, 22vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}