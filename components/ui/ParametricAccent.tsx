'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { PATH_DIVIDER_STROKE, pathMorphCycle } from '@/lib/hadid-paths';
import { setupHadidAnimations } from '@/lib/hadid-animation';

export interface ParametricAccentProps {
  /** Very low opacity recommended: 0.03 – 0.07 */
  opacity?: number;
  color?: 'sea-teal' | 'gold';
  className?: string;
  /** Slow gentle drift + morph */
  animate?: boolean;
  /** Thin elegant stroke for backgrounds / dividers */
  variant?: 'line' | 'divider';
  /** If true, the line will subtly tilt in response to mouse */
  interactive?: boolean;
}

/**
 * Refined, subtle parametric flowing line / accent.
 * Use sparingly as background texture or elegant section dividers.
 * Built on the existing Hadid path library.
 */
export default function ParametricAccent({
  opacity = 0.045,
  color = 'sea-teal',
  className = '',
  animate = true,
  variant = 'line',
  interactive = false,
}: ParametricAccentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const strokeColor =
    color === 'gold' ? 'var(--gold)' : 'var(--sea-teal)';

  // Optional mouse-responsive tilt for extra serenity and depth
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path || !animate) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cleanup = setupHadidAnimations({
      container,
      paths: [path],
      pathSequences: [pathMorphCycle(PATH_DIVIDER_STROKE)],
      animate: true,
      scrollRotate: false,
      drift: false,
    });

    if (interactive) {
      const handleMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        rotateY.set(((e.clientX - cx) / rect.width) * 4);
        rotateX.set(((cy - e.clientY) / rect.height) * 3);
      };
      const handleLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
      };
      window.addEventListener('mousemove', handleMove);
      container.addEventListener('mouseleave', handleLeave);
      return () => {
        cleanup?.();
        window.removeEventListener('mousemove', handleMove);
        container.removeEventListener('mouseleave', handleLeave);
      };
    }

    return cleanup;
  }, [animate, interactive, rotateX, rotateY]);

  const height = variant === 'divider' ? 'h-[1px]' : 'h-8';

  const Wrapper = interactive ? motion.div : 'div';
  const wrapperProps = interactive
    ? { style: { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 } }
    : {};

  return (
    <Wrapper
      ref={containerRef as any}
      {...wrapperProps}
      className={`parametric-accent pointer-events-none overflow-hidden ${height} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          ref={pathRef}
          d={PATH_DIVIDER_STROKE.d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={variant === 'divider' ? '1' : '0.65'}
          strokeOpacity={opacity}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Wrapper>
  );
}
