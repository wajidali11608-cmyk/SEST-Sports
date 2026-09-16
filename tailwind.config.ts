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
        sest: {
          darkest: "#03120c",
          dark: "#062319",
          darkCard: "#092f22",
          darkHover: "#0e4030",
          borderDark: "#154636",
          emerald: "#059669",
          emeraldBright: "#10b981",
          emeraldLight: "#34d399",
          emeraldDark: "#047857",
          emeraldBg: "#022c22",
          grayText: "#9ca3af",
          lightBg: "#f8faf9",
          lightCard: "#ffffff",
          lightBorder: "#e5e7eb",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        emeraldGlow: "0 0 20px rgba(16, 185, 129, 0.25)",
        cardShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.06)",
        cardShadowDark: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
