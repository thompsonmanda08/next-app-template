/** @type {import('tailwindcss').Config} */

import tailwindAnimate from 'tailwindcss-animate';
import { heroui } from '@heroui/theme';

export const darkMode = ['class'];
export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
  './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
];
export const prefix = '';
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1440px',
    },
  },

  extend: {
    fontFamily: {
      inter: 'var(--font-inter)',
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
        // Black-based primary colors
        50: '#f7f7f7',
        100: '#e3e3e3',
        200: '#c8c8c8',
        300: '#a4a4a4',
        400: '#818181',
        500: '#666666',
        600: '#515151',
        700: '#434343',
        800: '#383838',
        900: '#000000',
        950: '#000000',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
        // White-based secondary colors
        50: '#ffffff',
        100: '#fafafa',
        200: '#f5f5f5',
        300: '#f0f0f0',
        400: '#e5e5e5',
        500: '#d4d4d4',
        600: '#a3a3a3',
        700: '#737373',
        800: '#525252',
        900: '#404040',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
      '4xl': '2rem',
    },
  },
};

export const plugins = [
  tailwindAnimate,
  // formsPlugin,
  heroui({
    addCommonColors: true,
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: '#000000',
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: '#ffffff',
            foreground: '#000000',
          },
          default: {
            DEFAULT: '#f5f5f5',
            foreground: '#000000',
          },
          background: '#ffffff',
          foreground: '#000000',
        },
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: '#ffffff',
            foreground: '#000000',
          },
          secondary: {
            DEFAULT: '#000000',
            foreground: '#ffffff',
          },
          default: {
            DEFAULT: '#1a1a1a',
            foreground: '#ffffff',
          },
          background: '#000000',
          foreground: '#ffffff',
        },
      },
    },
  }),
];
