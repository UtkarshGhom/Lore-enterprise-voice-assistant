import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F9F6",
        surface: "#FFFFFF",
        forest: {
          50: "#F0F5F2",
          100: "#DEECE2",
          200: "#BED8C7",
          300: "#96BEA6",
          400: "#6EA385",
          500: "#4B8566",
          600: "#366B50",
          700: "#2B5540",
          800: "#224332",
          900: "#1B3629",
          950: "#0D1E16",
        },
        sage: {
          50: "#F6F8F5",
          100: "#EDF2EC",
          200: "#DCE5DC",
          300: "#C4D4C4",
          400: "#A6BDA7",
          500: "#86A387",
          600: "#6A866B",
          700: "#536B54",
          800: "#445545",
          900: "#384539",
        },
        sand: {
          50: "#FAF9F6",
          100: "#F4F2EC",
          200: "#E8E4DA",
          300: "#D8D2C2",
          400: "#C5BCA8",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Instrument Serif", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        card: "0 4px 20px -2px rgba(27, 54, 41, 0.05)",
        elevated: "0 10px 30px -4px rgba(27, 54, 41, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
