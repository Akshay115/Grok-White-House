'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Star } from 'lucide-react';
import ReviewCarousel from '@/components/ui/ReviewCarousel';

gsap.registerPlugin(ScrollTrigger);

const REVIEW_KEYS = ['nina', 'vyacheslav', 'lada', 'victoria'] as const;
const YANDEX_REVIEWS_URL =
  'https://yandex.ru/maps/org/193383996310/reviews/';

export default function Reviews() {
  const t = useTranslations('reviews');
  const sectionRef = useRef<HTMLElement>(null);
  const ratingRef = useRef<HTMLSpanElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const reviews = useMemo(
    () =>
      REVIEW_KEYS.map((key) => ({
        key,
        text: t(`items.${key}.text`),
        author: t(`items.${key}.author`),
        date: t(`items.${key}.date`),
        platform: t('platform'),
      })),
    [t]
  );

  useEffect(() => {
    const section = sectionRef.current;
    const ratingEl = ratingRef.current;
    const starsEl = starsRef.current;
    if (!section || !ratingEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      ratingEl.textContent = '4.9';
      setIsVisible(true);
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => setIsVisible(true),
        once: true,
      });

      gsap.to(counter, {
        value: 4.9,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-reviews-rating]',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          ratingEl.textContent = counter.value.toFixed(1);
        },
      });

      if (starsEl) {
        const stars = starsEl.querySelectorAll('[data-star]');
        gsap.fromTo(
          stars,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.4,
            scrollTrigger: {
              trigger: '[data-reviews-rating]',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="overflow-hidden bg-deep-navy section-padding"
    >
      <div className="container-content">
        {/* Header */}
        <p className="text-center font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
          {t('eyebrow')}
        </p>

        {/* Rating hero */}
        <div data-reviews-rating className="mt-lg text-center">
          <span
            ref={ratingRef}
            className="block font-display text-[9rem] font-light italic leading-none text-gold"
          >
            0.0
          </span>

          <div
            ref={starsRef}
            className="mt-sm flex justify-center gap-1"
            aria-hidden="true"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                data-star
                className="h-6 w-6 fill-gold text-gold"
                strokeWidth={0}
              />
            ))}
          </div>

          <p
            className="mt-sm font-body text-body"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            {t('ratingMeta')}
          </p>
        </div>

        {/* Carousel */}
        <ReviewCarousel reviews={reviews} isVisible={isVisible} />

        {/* CTA */}
        <div className="mt-lg text-center">
          <a
            href={YANDEX_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-xs font-body text-[0.9rem] font-medium text-gold transition-all hover:underline"
          >
            {t('cta')}
            <ExternalLink className="h-3 w-3" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}