/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        climoo: {
          900: '#1b0753',
          800: '#210856', // primária
          700: '#341472',
          300: '#7c3aed',
          200: '#9354e0',
          100: '#a855f7',
          cyan: '#62d0e5',
          page: '#e4ebf0',
          card: '#f3f4f6',
        },
      },
      boxShadow: {
        'climoo-card': '0 5px 28px rgba(0, 0, 0, 0.08)',
        'climoo-soft': '0 4px 24px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        pill: '99px',
      },
    },
  },
  plugins: [],
}
