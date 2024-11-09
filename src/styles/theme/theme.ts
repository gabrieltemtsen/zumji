export const appTheme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      error: "var(--error)",
      blueBg: "#00B9FF26",
      blueColor: "#1C87AD",
      brownBg: "#FFB80026",
      brownColor: "#7D5B08",
      greenBG: "#8ECC8D",
      lightGray: "#717171",
      errorBg: "var(--errorBg)",
      gray: "#4E4E4E",
      info: "var(--info)",
      infoBg: "var(--infoBg)",
      warning: "var(--warning)",
      warningBg: "var(--warningBg)",
      success: "var(--success)",
      primaryBg: "var(--primaryBg)",
      successBg: "var(--successBg)",
      background: "var(--background)",
      foreground: "var(--foreground)",
      black: "var(--card-foreground)",
      avatarBg: "var(--avatar)",
      successBadge: "var( --successBadge)",
      successBadgeText: "var(--successBadgeText)",
      profileAvatarBg: "var(--profile-avatar-color)",
      profileModalColor: "var(--profile-color)",
      profileForeground: "var(--profile-foreground)",
      accentForeground: "var(--accent-foreground)",
      "chart-1": "var(--chart-1)",
      "chart-2": "var(--chart-2)",
      "chart-3": "var(--chart-3)",
      "chart-4": "var(--chart-4)",
      "chart-5": "var(--chart-5)",
      "chart-6": "var(--chart-6)",
      "chart-7": "var(--chart-7)",
      "chart-8": "var(--chart-8)",
      "chart-9": "var(--chart-9)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
      pink: {
        DEFAULT: "var(--pink)",
        foreground: "var(--pink-foreground)"
      }
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
};

export const palette = appTheme.extend.colors;
