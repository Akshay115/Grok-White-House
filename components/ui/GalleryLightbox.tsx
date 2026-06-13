'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItemKey } from '@/lib/gallery-data';

export type LightboxSlide = {
  key: GalleryItemKey;
  src: string;
  caption: string;
  alt: string;
  index: number;
};

type GalleryLightboxProps = {
  slides: LightboxSlide[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function GalleryLightbox({
  slides,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const t = useTranslations('gallery');
  const isOpen = activeIndex !== null;
  const slide = isOpen ? slides[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + slides.length) % slides.length);
  }, [activeIndex, onNavigate, slides.length]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % slides.length);
  }, [activeIndex, onNavigate, slides.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && slide && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'rgba(11, 22, 40, 0.97)',
            backdropFilter: 'blur(4px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={slide.caption}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-md top-md z-10 text-white transition-colors hover:text-gold"
            aria-label={t('lightbox.close')}
          >
            <X className="h-8 w-8" strokeWidth={1.5} />
          </button>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-sm top-1/2 z-10 -translate-y-1/2 text-white transition-colors hover:text-gold md:left-md"
                aria-label={t('lightbox.prev')}
              >
                <ChevronLeft className="h-12 w-12" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-sm top-1/2 z-10 -translate-y-1/2 text-white transition-colors hover:text-gold md:right-md"
                aria-label={t('lightbox.next')}
              >
                <ChevronRight className="h-12 w-12" strokeWidth={1.5} />
              </button>
            </>
          )}

          <motion.div
            key={slide.key}
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center px-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) goPrev();
              else if (info.offset.x < -80) goNext();
            }}
          >
            <div className="relative h-[70vh] w-[90vw] max-w-5xl">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <p
              className="mt-md text-center font-body text-[0.85rem]"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              {slide.caption}
              <span className="mx-xs" aria-hidden="true">
                ·
              </span>
              {String(slide.index + 1).padStart(2, '0')}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}