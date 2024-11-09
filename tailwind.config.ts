const konstaConfig = require('konsta/config');

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // or 'class'
  theme: {
    extend: {
      // colors: appColors,
      colors: {
        'primary': 'red',
        'yellow-gradient-start': '#FFD700',
        'yellow-gradient-end': '#FFA500',
      },
      animation: {
        'star-move': 'starMove 30s linear infinite',
      },
      keyframes: {
        starMove: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-2000px)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
