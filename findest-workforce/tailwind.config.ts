import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        canvas: {
          DEFAULT: "#F5F1E8",
          dark: "#1A1815",
        },
        ink: {
          DEFAULT: "#1A1815",
          soft: "#4A453D",
          muted: "#8A8478",
        },
        accent: {
          DEFAULT: "#E86A2C",
          soft: "#F4C4A0",
        },
        crew: {
          marketing: "#E86A2C",
          sales: "#3B82C4",
          finance: "#4B9E6A",
        },
      },
      boxShadow: {
        soft: "0 2px 12px -4px rgba(26, 24, 21, 0.08)",
        lift: "0 8px 24px -8px rgba(26, 24, 21, 0.16)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
