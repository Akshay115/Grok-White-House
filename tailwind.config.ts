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
        pearl: 'var(--pearl)',
        'warm-stone': 'var(--warm-stone)',
        charcoal: 'var(--charcoal)',
        'warm-gray': 'var(--warm-gray)',
        'warm-gray-light': 'var(--warm-gray-light)',
        'deep-navy': 'var(--deep-navy)',
        'sea-teal': 'var(--sea-teal)',
        'sea-teal-light': 'var(--sea-teal-light)',
        sage: 'var(--sage)',
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
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        organic: 'var(--radius-organic)',
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        architectural: 'var(--shadow-architectural)',
        sculptural: 'var(--shadow-sculptural)',
        'glow-teal': 'var(--shadow-glow-teal)',
        'glow-gold': 'var(--shadow-glow-gold)',
        // legacy aliases
        card: 'var(--shadow-architectural)',
        glow: 'var(--shadow-glow-gold)',
      },
      transitionDuration: {
        reveal: '600ms',
      },
      ringColor: {
        focus: 'var(--sea-teal)',
      },
      transitionTimingFunction: {
        fluid: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};

export default config;