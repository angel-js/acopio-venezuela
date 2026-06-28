import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        venezuela: {
          red: "#CF142B",
          blue: "#00247D",
          cream: "#F5F0E8",
          "cream-alt": "#EEE6D8",
          dark: "#1A1A1A",
          ink: "#161412",
          green: "#1F8A4C",
          yellow: "#FFC400",
        },
      },
      fontFamily: {
        display: ["var(--font-archivo)", "sans-serif"],
        accent: ["var(--font-newsreader)", "serif"],
        body: ["var(--font-archivo)", "sans-serif"],
      },
      borderRadius: {
        card: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
