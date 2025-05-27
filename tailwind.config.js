tailwind.config = {
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6', // blue-500
          DEFAULT: '#2563eb', // blue-600
          dark: '#1d4ed8', // blue-700
        },
        secondary: {
          light: '#2dd4bf', // teal-400
          DEFAULT: '#14b8a6', // teal-500
          dark: '#0d9488', // teal-600
        },
        success: {
          light: '#4ade80', // green-400
          DEFAULT: '#22c55e', // green-500
          dark: '#16a34a', // green-600
        },
        danger: {
          light: '#f87171', // red-400
          DEFAULT: '#ef4444', // red-500
          dark: '#dc2626', // red-600
        },
        warning: {
          light: '#facc15', // yellow-400
          DEFAULT: '#eab308', // yellow-500
          dark: '#ca8a04', // yellow-600
        },
        // Backgrounds and text colors for light/dark modes
        // These will often be handled by Tailwind's slate/gray/neutral colors
        // but you can define specific ones if needed.
        // e.g. appBackground: '#f8fafc', // slate-50
        // appBackgroundDark: '#0f172a', // slate-900
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        // poppins: ['Poppins', 'sans-serif'],
        // nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // If you need form styling enhancements
  ],
};