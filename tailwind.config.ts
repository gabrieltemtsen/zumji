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
      fontFamily: {
        logo: ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'star-move': 'starMove 30s linear infinite',
        'ad-float': 'adFloat 15s linear infinite',
      },
      keyframes: {
        starMove: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-2000px)' },
        },
        adFloat: {
          '0%': { transform: 'translate(-10%, -10%) rotate(0deg)' },
          '25%': { transform: 'translate(110%, -10%) rotate(90deg)' },
          '50%': { transform: 'translate(110%, 110%) rotate(180deg)' },
          '75%': { transform: 'translate(-10%, 110%) rotate(270deg)' },
          '100%': { transform: 'translate(-10%, -10%) rotate(360deg)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
