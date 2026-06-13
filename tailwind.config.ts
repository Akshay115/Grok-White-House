import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: 'var(--white)',
        'off-white': 'var(--off-white)',
        cream: 'var(--cream)',
        charcoal: 'var(--charcoal)',
        'deep-navy': 'var(--deep-navy)',
        gold: {
          DEFAULT: 'var(--gold)',
          light: 'var(--gold-light)',
        },
        ocean: {
          DEFAULT: 'var(--ocean)',
          mist: 'var(--ocean-mist)',
        },
        glass: 'var(--glass)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        hero: 'var(--text-hero)',
        h1: 'var(--text-h1)',
        h2: 'var(--text-h2)',
        h3: 'var(--text-h3)',
        body: 'var(--text-body)',
        small: 'var(--text-small)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        card: '0 24px 48px -12px rgba(11, 22, 40, 0.12)',
        glow: '0 0 40px rgba(200, 169, 110, 0.15)',
      },
      transitionDuration: {
        reveal: '600ms',
      },
      ringColor: {
        focus: 'var(--gold)',
      },
    },
  },
  plugins: [],
};

export default config;