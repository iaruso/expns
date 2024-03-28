/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		fontSize: {
			'min': ['.5rem', '.625rem'],
			'xs': ['.625rem', '.75rem'],
			'sm': ['.75rem', '0.925rem'],
			'tiny': ['.875rem', '1.125rem'],
			'base': ['1rem', '1.25rem'],
			'big': ['2rem', '2.5rem']
		},
    extend: {
      colors: {
        white: '#FFFFFF', // Background, text
        alabaster: '#F8F8F8', // Background
        gallery: '#F0F0F0', // Borders
        mercury: '#EAEAEA', // Minor details
        alto: '#D6D6D6', // Placeholder
        chalice: '#A8A8A8', // Icons
        gray: '#7F7F7F', // Text buttons
        cod: '#1A1A1A', // Text main
        //
        persian: '#2433C2', // Main color, mostly for hovers
        royal: '#3A4AD9', // Main lighter color (used more), buttons
        have: '#5163EB', // Just in case (lighter)
        portage: '#687DFC' // Just in case (even lighter)
      }
    }
  },
  plugins: [],
}
