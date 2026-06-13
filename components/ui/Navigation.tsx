'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MessageCircle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  'rooms',
  'amenities',
  'location',
  'gallery',
  'reviews',
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
  const lineTopRef = useRef<HTMLSpanElement>(null);
  const lineMidRef = useRef<HTMLSpanElement>(null);
  const lineBotRef = useRef<HTMLSpanElement>(null);
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

  useEffect(() => {
    const top = lineTopRef.current;
    const mid = lineMidRef.current;
    const bot = lineBotRef.current;
    if (!top || !mid || !bot) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      if (isOpen) {
        gsap.set(top, { y: 7, rotation: 45 });
        gsap.set(mid, { opacity: 0 });
        gsap.set(bot, { y: -7, rotation: -45 });
      } else {
        gsap.set(top, { y: 0, rotation: 0 });
        gsap.set(mid, { opacity: 1 });
        gsap.set(bot, { y: 0, rotation: 0 });
      }
      return;
    }

    hamburgerTl.current?.kill();

    const tl = gsap.timeline();
    if (isOpen) {
      tl.to(top, { y: 7, rotation: 45, duration: 0.4, ease: 'power3.inOut' }, 0)
        .to(mid, { opacity: 0, duration: 0.2, ease: 'power2.inOut' }, 0)
        .to(bot, { y: -7, rotation: -45, duration: 0.4, ease: 'power3.inOut' }, 0);
    } else {
      tl.to(top, { y: 0, rotation: 0, duration: 0.4, ease: 'power3.inOut' }, 0)
        .to(mid, { opacity: 1, duration: 0.2, ease: 'power2.inOut' }, 0.1)
        .to(bot, { y: 0, rotation: 0, duration: 0.4, ease: 'power3.inOut' }, 0);
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

  const headerClasses = [
    'nav-header fixed inset-x-0 top-0 z-50',
    isScrolled || isOpen ? 'nav-header--glass' : 'bg-transparent',
    isHidden && !isOpen ? 'nav-header--hidden' : 'translate-y-0',
  ].join(' ');

  return (
    <header ref={headerRef} className={headerClasses}>
      <nav
        role="navigation"
        aria-label={t('ariaLabel')}
        className="container-content relative flex items-center justify-between py-sm lg:py-md"
      >
        {/* Logo */}
        <a href="#" className="group shrink-0">
          <span className="block font-display text-[1.1rem] font-light italic tracking-[0.25em] text-white transition-colors group-hover:text-gold-light lg:text-[1.25rem]">
            {t('logo')}
          </span>
          <span className="mt-0.5 block font-body text-[0.6rem] font-normal tracking-[0.4em] text-gold">
            {t('logoSubtitle')}
          </span>
        </a>

        {/* Desktop center nav */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-lg lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a href={`#${item}`} className="nav-link">
                {t(item)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right: CTA + lang */}
        <div className="hidden items-center gap-md lg:flex">
          <a href="#booking" className="nav-cta" data-analytics="book">
            {t('book')}
          </a>
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span
            ref={lineTopRef}
            className="block h-px w-6 origin-center bg-white"
          />
          <span
            ref={lineMidRef}
            className="block h-px w-6 origin-center bg-white"
          />
          <span
            ref={lineBotRef}
            className="block h-px w-6 origin-center bg-white"
          />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        className={`fixed inset-0 z-[55] flex flex-col bg-deep-navy transition-opacity duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <NavWatermark />

        <div className="relative z-10 flex flex-1 flex-col justify-center px-sm">
          <ul ref={mobileLinksRef} className="flex flex-col gap-md">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  data-mobile-link
                  onClick={closeMenu}
                  className="nav-mobile-link"
                >
                  {t(item)}
                </a>
              </li>
            ))}
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