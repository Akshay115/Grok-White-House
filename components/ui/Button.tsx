'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion';
import { springConfig } from '@/lib/animations';

type ButtonVariant = 'primary' | 'secondary' | 'magnetic';
type ButtonSize = 'default' | 'compact';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const base = 'inline-flex items-center justify-center font-body uppercase tracking-[0.1em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea-teal focus-visible:ring-offset-2 ring-offset-pearl disabled:opacity-60 disabled:pointer-events-none rounded-[3rem]';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-sea-teal text-white shadow-[0_0_40px_rgba(91,163,184,0.12)] hover:bg-sea-teal-light hover:text-charcoal',
  secondary: 'bg-transparent text-charcoal border border-warm-gray/35 hover:border-sea-teal hover:text-sea-teal hover:bg-white/60',
  magnetic: 'bg-sea-teal text-white shadow-[0_0_40px_rgba(91,163,184,0.12)] hover:bg-sea-teal-light hover:text-charcoal relative overflow-hidden',
};

const sizes: Record<ButtonSize, string> = {
  default: 'py-[0.85rem] px-8 text-[0.82rem]',
  compact: 'py-2.5 px-6 text-[0.75rem]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'default', children, ...props }, ref) => {
    const cls = [
      base,
      variants[variant],
      sizes[size],
      className,
    ].filter(Boolean).join(' ');

    const isMagnetic = variant === 'magnetic';
    const buttonRef = useRef<HTMLButtonElement>(null);

    // True magnetic effect for the prominent variant
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, springConfig.responsive);
    const springY = useSpring(y, springConfig.responsive);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isMagnetic || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15); // subtle
      y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
      if (!isMagnetic) return;
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={buttonRef as any}
        whileHover={isMagnetic ? { scale: 1.012 } : { scale: 1.005 }}
        whileTap={{ scale: 0.985 }}
        transition={springConfig.responsive}
        style={isMagnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cls}
        {...props}
      >
        {children}
        {isMagnetic && (
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white/30 rounded-full transition-[width,height] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[280px] group-hover:h-[280px]"
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
