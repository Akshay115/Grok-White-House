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
      className="overflow-hidden bg-cream section-padding"
    >
      <div className="container-content">
        {/* Header */}
        <p className="text-center font-body text-[0.7rem] font-normal uppercase tracking-[0.42em] text-sea-teal">
          {t('eyebrow')}
        </p>

        {/* Elegant overall rating with count-up */}
        <div data-reviews-rating className="mt-lg text-center">
          <div className="flex flex-col items-center">
            <span
              ref={ratingRef}
              className="block font-display text-[7rem] md:text-[8.5rem] font-light italic leading-[0.85] text-charcoal"
            >
              0.0
            </span>

            <div
              ref={starsRef}
              className="mt-2 flex justify-center gap-1"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  data-star
                  className="h-5 w-5 fill-sea-teal text-sea-teal"
                  strokeWidth={0}
                />
              ))}
            </div>

            <p
              className="mt-3 font-body text-[0.95rem] text-warm-gray-light tracking-tight"
            >
              {t('ratingMeta')}
            </p>
          </div>
        </div>

        {/* Flowing carousel of elegant testimonial cards */}
        <ReviewCarousel reviews={reviews} isVisible={isVisible} />

        {/* CTA to Yandex */}
        <div className="mt-xl text-center">
          <a
            href={YANDEX_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-[0.85rem] font-medium text-sea-teal transition-all hover:text-charcoal group"
          >
            {t('cta')}
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}