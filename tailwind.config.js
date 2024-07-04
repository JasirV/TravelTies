/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        's': '400px',
        'xs': '500px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
      colors: {
        primary: '#1656A6',
        secondary: '#B9D8FD',
        black: '#000000',
        grey: '#808080',
        white: '#FFFFFF',
      }
    }
  },
  plugins: [],
}
