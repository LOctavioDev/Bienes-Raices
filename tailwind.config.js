/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/views/**/*.pug',],
  theme: {
    extend: {
      backgroundColor: {
        custom1: '#D6C5B7',
        custom2: '#1D2173',
        custom3: '#D9CAC1',
        custom4: '#D96B43',
        custom5: '#8C423B',
      },
    },
  },
  plugins: [],
}