import { Variants } from 'framer-motion';

/**
 * Sophisticated, serene animation primitives for White House Sochi.
 * Prioritize spring physics for natural, non-gimmicky motion.
 * 60fps: transforms + opacity only.
 */

export const springConfig = {
  // Gentle, architectural spring – serene, not bouncy
  gentle: { type: 'spring' as const, stiffness: 120, damping: 25, mass: 0.9 },
  // Slightly snappier for micro interactions
  responsive: { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.8 },
  // For reveals and staggers – very calm
  reveal: { type: 'spring' as const, stiffness: 90, damping: 22, mass: 1.0 },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig.reveal,
  },
};

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springConfig.gentle,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
  hover: {
    y: -8,
    scale: 1.012,
    rotateX: 1.5,
    rotateY: 2.5,
    transition: springConfig.responsive,
  },
};

export const imageHover = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

export const magneticCTA = {
  rest: { scale: 1 },
  hover: { scale: 1.015, transition: springConfig.responsive },
  tap: { scale: 0.985 },
};

// For parametric elements – subtle response
export const parametricScroll = {
  hidden: { opacity: 0.3, pathLength: 0.3 },
  visible: {
    opacity: 0.7,
    pathLength: 1,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Architectural section clip fade (soft curve feel via opacity + slight scale)
export const sectionReveal: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springConfig.gentle, duration: 0.9 },
  },
};

// For modals/lightboxes
export const modalEnter: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springConfig.gentle, stiffness: 140 },
  },
  exit: { opacity: 0, y: 30, scale: 0.985, transition: { duration: 0.2 } },
};

export const lightboxImage: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springConfig.gentle, stiffness: 160 },
  },
  exit: { opacity: 0, scale: 0.98 },
};