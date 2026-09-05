/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // EcoLanka brand palette — sea blues, earthy greens, sunset yellows
        eco: {
          ocean: '#0E7490',
          'ocean-light': '#06B6D4',
          forest: '#15803D',
          'forest-light': '#22C55E',
          sunset: '#F59E0B',
          sand: '#FDE68A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
