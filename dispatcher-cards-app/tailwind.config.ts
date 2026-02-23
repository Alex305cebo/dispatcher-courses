import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        success: {
          500: '#10B981',
        },
        danger: {
          500: '#EF4444',
        },
        primary: {
          500: '#6366F1',
        },
        accent: {
          500: '#D946EF',
        },
      },
    },
  },
  plugins: [],
}

export default config
