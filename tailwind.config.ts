import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF3F9",
          100: "#D8E4F2",
          200: "#B1C8E4",
          300: "#7DA3D1",
          400: "#4A7BB8",
          500: "#285894",
          600: "#1B3F6E",
          700: "#142F54",
          800: "#0E2340",
          900: "#09182D",
          950: "#050E1C",
        },
        brand: {
          orange: "#F97316",
          orangeDark: "#EA580C",
          orangeLight: "#FFF7ED",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
