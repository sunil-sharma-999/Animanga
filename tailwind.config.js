module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        progres: 'progress 700ms ease-in infinite',
      },
      keyframes: {
        progress: {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '200% 50%' },
          '75%': { backgroundPosition: '300% 50%' },
          '100%': { backgroundPosition: '400% 50%' },
        },
      },
    },
  },
  plugins: [],
};
