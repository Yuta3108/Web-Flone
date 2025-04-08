/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
    transparent: 'transparent',
    current: 'currentColor',
    white: '#ffffff',
    'purple-custom': '#3f3cbb',
    'gray-custom': '#D9D9D9D9',
    'blue-custom': '#0771Fc',
    'Purple-dark': '#1E103A',
    'Purple-light': '#291355',
    'Purple-L': "#7d3f98",
    'Purple-C': "#4a237c",
    },
    extend: {
      backgroundImage: {
        'bg-test':"url('/img/bgtest.jpg')"
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}


