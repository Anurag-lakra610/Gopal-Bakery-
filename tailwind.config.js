/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          cream: '#FAF6F0',
          'cream-dark': '#F2ECE1',
          chocolate: '#2B1E1A',
          'chocolate-light': '#4A3B35',
          terracotta: '#C85A32',
          'terracotta-dark': '#A64522',
          pastry: '#F4E7CE',
          gold: '#D4AF37',
          mint: '#4A7C59',
          rose: '#E8A598',
          accent: '#E67E22',
        }
      },
      fontFamily: {
        serif: ['"Apfel Grotezk"', 'serif'],
        sans: ['"balto"', 'sans-serif'],
        heading: ['"Apfel Grotezk"', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
