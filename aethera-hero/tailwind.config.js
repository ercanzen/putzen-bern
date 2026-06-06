/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        sans:    ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      colors: {
        'bg-dark':    '#040d04',
        'green':      '#22c55e',
        'green-br':   '#4ade80',
      },
    },
  },
  plugins: [],
}
