'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';
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
        {/* Elegant Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.42em] text-sea-teal">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-h1 italic leading-[0.96] text-charcoal">
            {t('heading')}
          </h2>
          <p className="mt-2 font-body text-[1rem] text-warm-gray-light">
            {t('subheading')}
          </p>
        </div>

        {/* Main content: inviting split + extras */}
        <div className="mt-xl">
          {/* Split layout: Contacts + Form */}
          <div className="grid overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgb(0,0,0,0.1)] lg:grid-cols-[42%_58%] bg-white">
            <div ref={leftRef} className="opacity-0">
              <BookingContact />
            </div>
            <div ref={rightRef} className="opacity-0">
              <BookingInquiryForm />
            </div>
          </div>

          {/* Full address + interactive embedded map */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-warm-gray/10 bg-white p-6">
              <div className="font-body text-sm uppercase tracking-[0.1em] text-sea-teal mb-2">ADDRESS</div>
              <p className="text-charcoal leading-snug">{t('contact.address')}</p>
              <a 
                href={`tel:${t('contact.phone').replace(/\s/g, '')}`} 
                className="mt-3 inline-flex items-center gap-2 text-sea-teal hover:text-charcoal transition-colors text-sm"
              >
                <Phone className="h-4 w-4" /> {t('contact.phone')}
              </a>
            </div>

            <div className="rounded-3xl overflow-hidden border border-warm-gray/10 h-[280px] bg-warm-stone">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.5!2d39.969182!3d43.464403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDI3JzUyLjAiTiAzOcKwNTgnMDkuMSJF!5e0!3m2!1sen!2sru!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="White House Sochi Location"
              />
            </div>
          </div>

          {/* Virtual tour / 3D preview CTA - inviting and low-friction */}
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-cream to-white border border-sea-teal/10 p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="uppercase tracking-[3px] text-xs text-sea-teal mb-1">{t('virtualTour.eyebrow') || 'EXPERIENCE THE VILLA'}</div>
              <h3 className="font-display text-2xl italic text-charcoal">{t('virtualTour.heading') || 'Virtual 360° Tour & 3D Preview'}</h3>
              <p className="mt-1 text-warm-gray-light">{t('virtualTour.desc') || 'Walk through the terraces, pools, and luminous interiors from anywhere.'}</p>
            </div>
            <button
              onClick={() => {
                // Placeholder for real 3D/Matterport integration
                window.open('https://example.com/virtual-tour', '_blank');
              }}
              className="px-8 py-3 rounded-3xl bg-sea-teal text-white font-medium text-sm uppercase tracking-widest hover:bg-sea-teal-light hover:text-charcoal transition-all flex items-center gap-2"
            >
              <span>{t('virtualTour.cta') || 'Start Virtual Tour'}</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}