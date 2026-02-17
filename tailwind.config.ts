import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          bg: '#121212',
          sidebar: '#000000',
          accent: '#1DB954'
        }
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
