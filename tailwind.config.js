/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'Purple-dark': '#1E103A',
      'Purple-light': '#291355',
      'black' : '#000000',
      'red':'#FF0000',
      'gray':'#D9D9D9D9',
      'blue':'#0771Fc',
      'Purple-L':"#7d3f98",
      'Purple-C':"#4a237c"
    },
    extend: {
      backgroundImage: {
        'bg-test':"url('/src/img/bgtest.jpg')"
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


