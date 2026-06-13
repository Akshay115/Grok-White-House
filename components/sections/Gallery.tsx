'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GalleryLightbox, { type LightboxSlide } from '@/components/ui/GalleryLightbox';
import GalleryTile from '@/components/ui/GalleryTile';
import {
  GALLERY_ITEMS,
  GALLERY_TABS,
  type GalleryItemKey,
  type GalleryTab,
} from '@/lib/gallery-data';

const INSTAGRAM_URL = 'https://www.instagram.com/sochi_white_house';

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Gallery() {
  const t = useTranslations('gallery');
  const [activeTab, setActiveTab] = useState<GalleryTab>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => {
      const category = t(`items.${item.key}.category`);
      return category === activeTab;
    });
  }, [activeTab, t]);

  const lightboxSlides: LightboxSlide[] = useMemo(
    () =>
      filteredItems.map((item, index) => ({
        key: item.key,
        src: item.src,
        caption: t(`items.${item.key}.caption`),
        alt: t(`items.${item.key}.alt`),
        index,
      })),
    [filteredItems, t]
  );

  const openLightbox = (key: GalleryItemKey) => {
    const index = lightboxSlides.findIndex((s) => s.key === key);
    if (index >= 0) setLightboxIndex(index);
  };

  const handleTabChange = (tab: GalleryTab) => {
    setActiveTab(tab);
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="bg-white section-padding">
      <div className="container-content">
        {/* Header */}
        <div className="text-center">
          <p className="font-body text-[0.7rem] font-normal uppercase tracking-[0.4em] text-gold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-sm font-display text-h1 italic leading-[1.1] text-deep-navy">
            {t('heading')}
          </h2>
        </div>

        {/* Tabs */}
        <div
          className="mt-lg flex flex-wrap justify-center gap-sm md:gap-md"
          role="tablist"
          aria-label={t('eyebrow')}
        >
          {GALLERY_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab)}
                className={`relative pb-xs font-body text-[0.85rem] font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
                  isActive
                    ? 'text-gold'
                    : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                {t(`tabs.${tab}`)}
                {isActive && (
                  <motion.span
                    layoutId="gallery-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="gallery-masonry mt-lg">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.3 } }}
              >
                <GalleryTile
                  item={item}
                  alt={t(`items.${item.key}.alt`)}
                  onClick={() => openLightbox(item.key)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <div className="mt-xl text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center gap-xs transition-transform duration-300 hover:scale-[1.02]"
          >
            <InstagramIcon className="h-7 w-7 text-gold" />
            <span className="font-body text-body text-charcoal underline decoration-gold decoration-2 underline-offset-4 transition-all group-hover:no-underline">
              {t('instagram.text')}
            </span>
            <span className="font-body text-[0.85rem] font-medium text-gold">
              {t('instagram.handle')}
            </span>
          </a>
        </div>
      </div>

      <GalleryLightbox
        slides={lightboxSlides}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}