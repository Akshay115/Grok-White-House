'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ReviewCard from '@/components/ui/ReviewCard';

const CARD_STEP = 360 + 16;
const SCROLL_SPEED = 40;

export type ReviewSlide = {
  key: string;
  text: string;
  author: string;
  date: string;
  platform: string;
};

type ReviewCarouselProps = {
  reviews: ReviewSlide[];
  isVisible: boolean;
};

export default function ReviewCarousel({
  reviews,
  isVisible,
}: ReviewCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);
  const paused = useRef(false);
  const dragging = useRef(false);
  const lastPointerX = useRef(0);
  const loopWidth = useRef(0);
  const [activeDot, setActiveDot] = useState(0);

  const duplicated = [...reviews, ...reviews];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isVisible) return;

    loopWidth.current = track.scrollWidth / 2;

    gsap.to(track, { opacity: 1, duration: 0.6, delay: 0.3 });

    const tickerCallback = (_time: number, deltaTime: number) => {
      if (paused.current || dragging.current || !loopWidth.current) return;

      xPos.current -= SCROLL_SPEED * deltaTime;

      if (Math.abs(xPos.current) >= loopWidth.current) {
        xPos.current = 0;
      }

      gsap.set(track, { x: xPos.current });

      const normalized = Math.abs(xPos.current) % (reviews.length * CARD_STEP);
      const dotIndex = Math.round(normalized / CARD_STEP) % reviews.length;
      setActiveDot(dotIndex);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
    };
  }, [isVisible, reviews.length]);

  const handlePointerDown = (clientX: number) => {
    paused.current = true;
    dragging.current = true;
    lastPointerX.current = clientX;
  };

  const handlePointerMove = (clientX: number) => {
    if (!dragging.current || !trackRef.current) return;

    const delta = clientX - lastPointerX.current;
    lastPointerX.current = clientX;
    xPos.current += delta;

    if (loopWidth.current) {
      if (xPos.current > 0) xPos.current = -loopWidth.current + 1;
      if (Math.abs(xPos.current) >= loopWidth.current) xPos.current = 0;
    }

    gsap.set(trackRef.current, { x: xPos.current });
  };

  const handlePointerUp = () => {
    dragging.current = false;
    paused.current = false;
  };

  const scrollToDot = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    paused.current = true;
    const targetX = -(index * CARD_STEP);

    gsap.to(track, {
      x: targetX,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        xPos.current = targetX;
        setActiveDot(index);
        window.setTimeout(() => {
          paused.current = false;
        }, 1500);
      },
    });
  };

  return (
    <div className="mt-xl">
      <div
        ref={containerRef}
        className="reviews-carousel-mask overflow-hidden"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          if (!dragging.current) paused.current = false;
        }}
        onPointerDown={(e) => handlePointerDown(e.clientX)}
        onPointerMove={(e) => {
          if (dragging.current) handlePointerMove(e.clientX);
        }}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          ref={trackRef}
          className="flex w-max cursor-grab gap-sm opacity-0 active:cursor-grabbing"
          style={{ willChange: 'transform' }}
        >
          {duplicated.map((review, index) => (
            <ReviewCard
              key={`${review.key}-${index}`}
              text={review.text}
              author={review.author}
              date={review.date}
              platform={review.platform}
            />
          ))}
        </div>
      </div>

      <div className="mt-md flex justify-center gap-sm">
        {reviews.map((review, index) => (
          <button
            key={review.key}
            type="button"
            onClick={() => scrollToDot(index)}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              activeDot === index
                ? 'bg-sea-teal'
                : 'border border-charcoal/20 bg-transparent'
            }`}
            aria-label={`Review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}