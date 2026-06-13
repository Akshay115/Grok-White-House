'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'fluid' | 'sculptural' | 'glass';
  children: React.ReactNode;
}

const base = 'card overflow-hidden';

const variants: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-white border border-warm-gray/10 rounded-[1.5rem]',
  fluid: 'card-fluid bg-white border border-warm-gray/10 rounded-[1.5rem]',
  sculptural: 'sculptural-card bg-white border border-warm-gray/10 rounded-[2rem]',
  glass: 'glass-panel bg-white/80 backdrop-blur-xl border border-white/20 rounded-[1.5rem]',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'fluid', children, ...props }, ref) => {
    const cls = [base, variants[variant], className].filter(Boolean).join(' ');

    return (
      <motion.div
        ref={ref}
        variants={{ 
          rest: { y: 0, rotateX: 0, rotateY: 0, scale: 1 },
          hover: { y: -10, rotateX: 1.8, rotateY: 2.2, scale: 1.01 }
        }}
        initial="rest"
        whileHover="hover"
        transition={ { type: 'spring', stiffness: 240, damping: 24 } }
        style={{ perspective: 1200 }}
        className={cls}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
