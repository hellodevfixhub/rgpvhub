/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* W3Schools palette */
        w3green: {
          DEFAULT: '#04AA6D',
          50:  '#E6FBF3',
          100: '#C0F4DF',
          200: '#87E9C5',
          300: '#3FDEA5',
          400: '#04AA6D',
          500: '#038A57',
          600: '#026B44',
          700: '#024D31',
          800: '#012F1E',
          900: '#00110B',
        },
        w3dark: {
          DEFAULT: '#282A35',
          light:  '#3a3d4e',
          darker: '#1a1c25',
        },
        w3gray: {
          DEFAULT: '#f1f1f1',
          50:  '#fafafa',
          100: '#f1f1f1',
          200: '#e7e9eb',
          300: '#d5d5d5',
          400: '#aaaaaa',
          500: '#777777',
          600: '#555555',
          700: '#333333',
          800: '#1a1a1a',
        },
        w3blue:   '#2196F3',
        w3orange: '#FF9800',
        w3red:    '#f44336',
        w3purple: '#9c27b0',
        w3yellow: '#ffeb3b',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Verdana', 'system-ui', 'sans-serif'],
        mono: ['Consolas', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'w3': '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
        'w3-hover': '0 8px 17px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)',
        'card': '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08)',
        'card-hover': '0 4px 12px rgba(0,0,0,.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        fadeIn: {
          '0%':   { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      screens: { xs: '375px' },
    },
  },
  plugins: [],
}
