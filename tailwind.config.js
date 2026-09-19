/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        flex: {
          primary: '#2D5A53',
          teal:    '#4ECDC4',
          dark:    '#1a1a1a',
          input:   '#f9fafb',
          muted:   '#6b7280',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 20px 60px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}