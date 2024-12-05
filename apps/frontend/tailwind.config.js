/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add paths for all your TypeScript and React components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17bebb',
        primary_light: '#57D6D4',
        secondary: '#d4f4dd',
        neutral: '#4b1d3f',
        danger: '#d62246',
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
