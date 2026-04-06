import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Direction 1 — Altitude palette
        brand: {
          night:   '#1A3A5C',
          blue:    '#2B6CB0',
          thermal: '#6BA3D6',
          cloud:   '#F0EFED',
          carbon:  '#2D2D2D',
        },
      },
    },
  },
  plugins: [],
}

export default config
