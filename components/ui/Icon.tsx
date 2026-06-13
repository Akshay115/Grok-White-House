'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  animateOnHover?: boolean;
  color?: 'teal' | 'charcoal' | 'warm' | 'sage' | 'gold';
}

const colorMap: Record<NonNullable<IconProps['color']>, string> = {
  teal: 'text-sea-teal',
  charcoal: 'text-charcoal',
  warm: 'text-warm-gray',
  sage: 'text-sage',
  gold: 'text-gold',
};

export function Icon({
  icon: IconComponent,
  size = 20,
  className = '',
  animateOnHover = true,
  color = 'teal',
}: IconProps) {
  const colorClass = colorMap[color];

  const cls = [
    'icon inline-block',
    colorClass,
    className,
  ].filter(Boolean).join(' ');

  if (!animateOnHover) {
    return <IconComponent size={size} className={cls} strokeWidth={1.65} />;
  }

  return (
    <motion.span
      whileHover={{ scale: 1.08, rotate: 1.5 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      className="inline-flex"
    >
      <IconComponent
        size={size}
        className={cls}
        strokeWidth={1.65}
      />
    </motion.span>
  );
}

export default Icon;
