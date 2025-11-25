/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0BB69B',
          dark: '#089680',
          light: '#E0F2F1',
          50: '#F0FDFA',
        },
        secondary: {
          DEFAULT: '#1F2937',
          light: '#F3F4F6',
        },
      },
      fontFamily: {
        heading: ['Raleway', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'colored': '0 4px 14px 0 rgba(11, 182, 155, 0.25)',
      },
    },
  },
  plugins: [],
}
