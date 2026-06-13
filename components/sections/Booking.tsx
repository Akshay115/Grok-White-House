'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookingContact from '@/components/booking/BookingContact';
import BookingInquiryForm from '@/components/booking/BookingInquiryForm';

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const t = useTranslations('booking');
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([left, right], { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { opacity: 0, x: -50 },
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
        right,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="booking" ref={sectionRef} className="bg-cream section-padding">
      <div className="container-content">
        {/* Header */}
        <div className="text-center">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-sm font-display text-h1 italic leading-[1.1] text-deep-navy">
            {t('heading')}
          </h2>
          <p className="mt-sm font-body text-body text-charcoal/60">
            {t('subheading')}
          </p>
        </div>

        {/* Split layout */}
        <div className="mt-xl grid overflow-hidden rounded-[4px] shadow-[0_16px_48px_rgba(11,22,40,0.1)] lg:grid-cols-[45%_55%]">
          <div ref={leftRef} className="opacity-0">
            <BookingContact />
          </div>
          <div ref={rightRef} className="opacity-0">
            <BookingInquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}