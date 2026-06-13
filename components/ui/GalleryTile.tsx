'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Expand } from 'lucide-react';
import type { GalleryItemConfig } from '@/lib/gallery-data';
import { loadGsap, loadScrollTrigger } from '@/lib/gsap-client';

const ASPECT_CLASS = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
} as const;

const CLIP_CLASS = {
  a: 'gallery-clip-a',
  b: 'gallery-clip-b',
  c: 'gallery-clip-c',
  d: 'gallery-clip-d',
} as const;

type GalleryTileProps = {
  item: GalleryItemConfig;
  alt: string;
  onClick: () => void;
};

export default function GalleryTile({ item, alt, onClick }: GalleryTileProps) {
  const tileRef = useRef<HTMLButtonElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    const imageWrap = imageWrapRef.current;
    if (!tile) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsap = await loadGsap();
      await loadScrollTrigger();

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tile,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );

        if (item.feature && imageWrap && !prefersReducedMotion) {
          gsap.to(imageWrap, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: tile,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }, tile);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [item.feature]);

  return (
    <button
      ref={tileRef}
      type="button"
      onClick={onClick}
      className={`gallery-tile group relative w-full overflow-hidden opacity-0 ${
        item.feature ? 'sm:col-span-2' : ''
      } ${CLIP_CLASS[item.clip]}`}
    >
      <div
        ref={imageWrapRef}
        className={`relative w-full overflow-hidden ${ASPECT_CLASS[item.aspect]} ${
          item.feature ? 'min-h-[280px] lg:min-h-[360px]' : ''
        }`}
      >
        <Image
          src={item.src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          sizes={
            item.feature
              ? '(max-width: 768px) 100vw, 66vw'
              : '(max-width: 768px) 100vw, 33vw'
          }
        />
        <div
          className="absolute inset-0 flex items-center justify-center bg-deep-navy/0 transition-colors duration-300 group-hover:bg-deep-navy/30"
        >
          <Expand
            className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </button>
  );
}