/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		fontSize: {
			'min': ['.5rem'],
			'xs': ['.625rem'],
			'sm': ['.75rem'],
			'tiny': ['.875rem'],
			'base': ['1rem'],
			'big': ['2rem']
		},
    screens: {
      'sm-mobile': { 'max': '480px' }, // => @media (max-width: 480px) { ... }
      'mobile': { 'max': '768px' }, // => @media (max-width: 768px) { ... }
      'sm': '640px', // => @media (min-width: 640px) { ... }
      'md': '768px', // => @media (min-width: 768px) { ... }
      'lg': '1024px', // => @media (min-width: 1024px) { ... }
      'xl': '1440px', // => @media (min-width: 1280px) { ... }
      'exl': '1920px', // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        white: '#FFFFFF', // Background, text
        sand: '#FCFCFC', // Background for input focus
        alabaster: '#F8F8F8', // Background and hover
        gallery: '#F0F0F0', // Borders
        alto: '#D6D6D6', // Placeholder, border focus
        chalice: '#A8A8A8', // Icons
        gray: '#5A5A5A', // Text buttons
        shaft: '#3C3C3C', // Text secondary and hover text
        cod: '#1A1A1A', // Text main
        black: '#000000', // Hover dark
        persian: '#2433C2', // Main color, mostly for hovers
        royal: '#3A4AD9', // Main lighter color (used more), buttons
        have: '#5163EB', // Just in case (lighter)
        portage: '#687DFC' // Just in case (even lighter)
      }
    }
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border)-(persian|have|portage)/
  }]
}
