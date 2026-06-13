'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { MessageCircle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  'about',
  'rooms',
  'amenities',
  'gallery',
  'location',
  'reviews',
  'contacts',
] as const;

const SCROLL_THRESHOLD = 80;
const PHONE_HREF = 'tel:+79621574497';
const WHATSAPP_HREF = 'https://wa.me/79621574497';

function NavWatermark() {
  return (
    <svg
      viewBox="0 0 1440 900"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,400 C200,200 400,600 600,350 S900,150 1100,450 S1300,550 1440,300"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
      />
      <path
        d="M0,550 C180,700 360,300 540,500 S780,650 960,400 S1200,250 1440,500"
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="1.5"
      />
      <path
        d="M100,200 C300,350 500,100 700,300 S950,500 1150,200 S1350,100 1440,350"
        fill="none"
        stroke="var(--white)"
        strokeWidth="1"
      />
      <path
        d="M0,650 C250,500 450,750 650,550 S900,400 1100,700 S1300,800 1440,600 L1440,900 L0,900 Z"
        fill="var(--gold)"
        opacity="0.3"
      />
    </svg>
  );
}

export default function Navigation() {
  const t = useTranslations('nav');
  const tBooking = useTranslations('booking');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathTopRef = useRef<SVGPathElement>(null);
  const pathBotRef = useRef<SVGPathElement>(null);
  const lastScrollY = useRef(0);
  const hamburgerTl = useRef<gsap.core.Timeline | null>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

      if (!isOpen && !prefersReducedMotion) {
        if (currentScrollY > lastScrollY.current && currentScrollY > SCROLL_THRESHOLD) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false);
    }
  }, [isOpen]);

  // Zaha-inspired curved hamburger → elegant close morph
  useEffect(() => {
    const topPath = pathTopRef.current;
    const botPath = pathBotRef.current;
    if (!topPath || !botPath) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Elegant parametric-style curves (subtle organic arcs)
    const menuTop = 'M3.5,6.5 Q8,5.8 20.5,6.5';
    const menuBot = 'M3.5,17.5 Q8,18.2 20.5,17.5';

    const closeTop = 'M6,6 Q12,12 18,18';
    const closeBot = 'M6,18 Q12,12 18,6';

    if (prefersReducedMotion) {
      if (isOpen) {
        gsap.set([topPath, botPath], { attr: { d: closeTop } });
        gsap.set(botPath, { attr: { d: closeBot } });
      } else {
        gsap.set(topPath, { attr: { d: menuTop } });
        gsap.set(botPath, { attr: { d: menuBot } });
      }
      return;
    }

    hamburgerTl.current?.kill();

    const tl = gsap.timeline({ defaults: { duration: 0.42, ease: 'power3.inOut' } });

    if (isOpen) {
      // Morph the two curves into a refined crossed close
      tl.to(topPath, { attr: { d: closeTop } }, 0)
        .to(botPath, { attr: { d: closeBot } }, 0);
    } else {
      tl.to(topPath, { attr: { d: menuTop } }, 0)
        .to(botPath, { attr: { d: menuBot } }, 0);
    }

    hamburgerTl.current = tl;

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const links = mobileLinksRef.current;
    if (!overlay || !links) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const linkEls = links.querySelectorAll('[data-mobile-link]');

    let linkTween: gsap.core.Tween | null = null;
    if (!prefersReducedMotion) {
      linkTween = gsap.fromTo(
        linkEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }

    const focusable = overlay.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab' || !first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    first?.focus();

    return () => {
      linkTween?.kill();
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (isOpen || !mobileLinksRef.current) return;

    const linkEls = mobileLinksRef.current.querySelectorAll('[data-mobile-link]');
    gsap.set(linkEls, { opacity: 0, y: 40 });
  }, [isOpen]);

  // Active section detection for fluid underline (parametric style)
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Map nav keys to actual section ids (contacts → booking)
    const sectionIds = NAV_ITEMS.map((item) => (item === 'contacts' ? 'booking' : item));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.2, 0.5, 0.8],
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Fallback: set initial based on hash or first
    const initial = window.location.hash.replace('#', '') || sectionIds[0];
    if (sectionIds.includes(initial as any)) setActiveSection(initial);

    return () => observer.disconnect();
  }, []);

  const headerClasses = [
    'nav-header fixed inset-x-0 top-0 z-50 transition-all duration-300',
    isScrolled || isOpen ? 'nav-header--glass nav-header--scrolled' : 'bg-transparent',
    isHidden && !isOpen ? 'nav-header--hidden' : 'translate-y-0',
  ].join(' ');

  return (
    <header ref={headerRef} className={headerClasses}>
      <nav
        role="navigation"
        aria-label={t('ariaLabel')}
        className={`container-content relative flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2 lg:py-3' : 'py-sm lg:py-md'
        }`}
      >
        {/* Refined bilingual logo / wordmark */}
        <a href="#" className="group flex shrink-0 flex-col items-start -ml-1">
          <span 
            className={`font-display text-[1.05rem] font-light italic tracking-[0.22em] transition-colors duration-300 lg:text-[1.18rem] ${
              isScrolled ? 'text-charcoal' : 'text-white'
            } group-hover:text-sea-teal`}
          >
            White House
          </span>
          <span 
            className={`-mt-1 flex items-center gap-1.5 font-body text-[0.52rem] font-normal tracking-[0.32em] transition-colors duration-300 ${
              isScrolled ? 'text-warm-gray-light' : 'text-white/70'
            }`}
          >
            БЕЛЫЙ ДОМ
          </span>
          {/* Subtle parametric accent line under logo */}
          <span className="mt-0.5 h-px w-6 bg-gradient-to-r from-sea-teal/40 to-transparent transition-all group-hover:w-8" />
        </a>

        {/* Desktop center nav — fluid parametric curve underlines */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-lg lg:flex">
          {NAV_ITEMS.map((item) => {
            const sectionId = item === 'contacts' ? 'booking' : item;
            const isActive = activeSection === sectionId || (item === 'contacts' && activeSection === 'booking');
            return (
              <li key={item} className="relative">
                <a
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    // smooth scroll with slight offset for fixed nav
                    const el = document.getElementById(sectionId);
                    if (el) {
                      e.preventDefault();
                      const y = el.getBoundingClientRect().top + window.scrollY - 90;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`group relative inline-flex items-center py-1 text-[0.82rem] font-normal uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isScrolled ? 'text-warm-gray hover:text-charcoal' : 'text-white/80 hover:text-white'
                  } ${isActive ? (isScrolled ? 'text-sea-teal' : 'text-white') : ''}`}
                >
                  {t(item)}
                  {/* Parametric curve underline — Zaha-inspired fluid bezier */}
                  <span
                    className={`parametric-nav-underline absolute -bottom-[1px] left-0 right-0 h-[3px] overflow-hidden transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <svg
                      width="100%"
                      height="3"
                      viewBox="0 0 100 3"
                      preserveAspectRatio="none"
                      className="w-full"
                    >
                      <path
                        d="M3,1.5 Q 25,0.2 50,1.5 Q 75,2.8 97,1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style={{
                          strokeDasharray: isActive ? '0' : '100',
                          strokeDashoffset: isActive ? '0' : '100',
                        }}
                      />
                    </svg>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop right: Elegant language toggle + prominent refined CTA */}
        <div className="hidden items-center gap-md lg:flex">
          <LanguageSwitcher />

          {/* Refined prominent CTA with magnetic hover + subtle scale */}
          <motion.a
            href="#booking"
            data-analytics="book"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-[2.25rem] border px-7 py-[0.6rem] font-body text-[0.78rem] font-medium uppercase tracking-[0.13em] transition-all duration-300 ${
              isScrolled
                ? 'border-sea-teal text-sea-teal hover:bg-sea-teal hover:text-white'
                : 'border-white/70 text-white hover:border-white hover:bg-white hover:text-charcoal'
            }`}
          >
            <span className="relative z-10">{t('book')}</span>
            {/* Subtle magnetic / fluid highlight */}
            <span 
              className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0" 
              aria-hidden 
            />
          </motion.a>
        </div>

        {/* Mobile hamburger — Zaha-inspired fluid curve morph */}
        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative z-[60] flex h-10 w-10 items-center justify-center lg:hidden transition-colors ${
            isScrolled ? 'text-charcoal' : 'text-white'
          }`}
          aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="overflow-visible"
          >
            {/* Top curve (menu) / upper diagonal (close) */}
            <path
              ref={pathTopRef}
              d="M3.5,6.5 Q8,5.8 20.5,6.5"
            />
            {/* Bottom curve (menu) / lower diagonal (close) */}
            <path
              ref={pathBotRef}
              d="M3.5,17.5 Q8,18.2 20.5,17.5"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        className={`fixed inset-0 z-[55] flex flex-col bg-pearl/95 backdrop-blur-3xl transition-opacity duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <NavWatermark />

        <div className="relative z-10 flex flex-1 flex-col justify-center px-sm">
          <ul ref={mobileLinksRef} className="flex flex-col gap-md">
            {NAV_ITEMS.map((item) => {
              const sectionId = item === 'contacts' ? 'booking' : item;
              return (
                <li key={item}>
                  <a
                    href={`#${sectionId}`}
                    data-mobile-link
                    onClick={closeMenu}
                    className="nav-mobile-link"
                  >
                    {t(item)}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="#booking"
                data-analytics="book"
                data-mobile-link
                onClick={closeMenu}
                className="nav-mobile-link text-gold"
              >
                {t('book')}
              </a>
            </li>
          </ul>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-sm py-md">
          <a
            href={PHONE_HREF}
            data-analytics="phone"
            className="font-body text-body text-gold transition-opacity hover:opacity-80"
          >
            {tBooking('contact.phone')}
          </a>
          <div className="flex items-center gap-md">
            <LanguageSwitcher variant="mobile" />
            <a
              href={WHATSAPP_HREF}
              data-analytics="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-opacity hover:opacity-80"
              aria-label={tBooking('contact.whatsapp')}
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}