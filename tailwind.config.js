/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#80eea3',
        'primary-dark': '#7ecc98',
        secondary: '#fbdf55',
        'secondary-dark': '#e0c448',
        background: '#fafaf8',
        card: '#FFFFFF',
        success: '#4CAF50',
        error: '#E53935',
        warning: '#FF9800',
        'text-primary': '#2C3E50',
        'text-secondary': '#6C757D',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'green-hover': '0 4px 15px rgba(76, 175, 80, 0.25)',
      },
    },
  },
  plugins: [],
}