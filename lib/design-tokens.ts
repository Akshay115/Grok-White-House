/**
 * White House Sochi — Zaha Hadid Inspired Design Tokens
 * Light palette only. Source of truth for JS/TS runtime (Framer Motion, animations, etc.).
 * Keep in sync with styles/globals.css custom properties.
 */

export const colors = {
  white: '#ffffff',
  cream: '#f8f5f0',
  pearl: '#f4f1eb',
  offWhite: '#f1ede6',
  warmStone: '#e9e4db',
  charcoal: '#3f3b36',
  warmGray: '#4f4a45',
  warmGrayLight: '#6c6761',
  deepNavy: '#2a2824',
  seaTeal: '#5ba3b8',
  seaTealLight: '#a8d5e5',
  sage: '#8a9588',
  gold: '#c5a77d',
  goldLight: '#d9c7a3',
  goldSoft: '#c8b18a',
  glass: 'rgba(255, 255, 255, 0.82)',
  glassDark: 'rgba(63, 59, 54, 0.04)',
} as const;

export const typography = {
  fontDisplay: "'Cormorant Garamond', serif",
  fontBody: "'Inter', sans-serif",

  sizes: {
    hero: 'clamp(3.5rem, 9vw, 8rem)',
    h1: 'clamp(2.5rem, 5vw, 4.5rem)',
    h2: 'clamp(1.8rem, 3vw, 2.8rem)',
    h3: 'clamp(1.2rem, 2vw, 1.8rem)',
    body: '1rem',
    small: '0.875rem',
  },

  lineHeights: {
    hero: '0.92',
    tight: '1.0',
    snug: '1.1',
    normal: '1.5',
    relaxed: '1.65',
    loose: '1.8',
  },

  letterSpacing: {
    tight: '-0.02em',
    snug: '-0.01em',
    normal: '0',
    wide: '0.08em',
    wider: '0.12em',
    widest: '0.3em',
  },
} as const;

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '2rem',
  lg: '4rem',
  xl: '8rem',
  '2xl': '12rem',
  // Architectural extras
  '3xl': '6rem',
  '4xl': '10rem',
} as const;

export const radii = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  full: '999px',
  // Organic large for villa feel
  organic: '2rem',
} as const;

export const shadows = {
  sm: '0 1px 2px rgb(0 0 0 / 0.05)',
  md: '0 4px 12px -2px rgb(0 0 0 / 0.06)',
  lg: '0 10px 30px -8px rgb(0 0 0 / 0.08)',
  architectural: '0 24px 48px -12px rgba(11, 22, 40, 0.12)',
  sculptural: '0 40px 90px -20px rgba(31, 31, 31, 0.12)',
  glowTeal: '0 0 40px rgba(91, 163, 184, 0.12)',
  glowGold: '0 0 40px rgba(197, 167, 125, 0.12)',
} as const;

export const transitions = {
  default: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  fast: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
  slow: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
  reveal: '600ms',
} as const;

export const easings = {
  fluid: [0.23, 1, 0.32, 1] as const,
  spring: { type: 'spring', stiffness: 260, damping: 24 } as const,
} as const;

/** Parametric / Zaha accent colors for strokes */
export const parametric = {
  stroke: colors.seaTeal,
  strokeLight: colors.seaTealLight,
  strokeGold: colors.gold,
  opacitySubtle: 0.06,
  opacityRefined: 0.035,
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radii;
