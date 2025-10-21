/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'Poppins', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        sans: ['Jost', 'Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          50: '#F5EFEB',
          100: '#F5EFEB',
          200: '#C8D9E6',
          300: '#C8D9E6',
          400: '#567C8D',
          500: '#567C8D',
          600: '#2F4156',
          700: '#2F4156',
          800: '#2F4156',
          900: '#2F4156',
        },
        brand: {
          50: '#F5EFEB',
          100: '#F5EFEB',
          200: '#C8D9E6',
          300: '#C8D9E6',
          400: '#567C8D',
          500: '#567C8D',
          600: '#2F4156',
          700: '#2F4156',
          800: '#2F4156',
          900: '#2F4156',
        },
        navy: '#2F4156',
        teal: '#567C8D',
        beige: '#F5EFEB',
        skyblue: '#C8D9E6',
        white: '#FFFFFF',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} 