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
			'big': ['1.9rem', '2.375rem']
		},
    extend: {
      colors: {
        main: '#2433C2',
        secondary: '#F9F9F9',
				tertiary: '#C7C7C7',
				mainHover: '#0B21B6',
				secondaryHover: '#F4F4F4',
				tertiaryHover: '#BEBEBE'
      },
			fontFamily: {
       	Montserrat: ['Montserrat', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
