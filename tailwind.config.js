module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        comeup: {
          '0%': { transform: 'translateY(2rem)' },
          '100%': { transform: 'none' },
        },
      },
    },
  },
  plugins: [],
};
