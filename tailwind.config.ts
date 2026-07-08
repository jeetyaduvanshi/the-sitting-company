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
        brand: {
          black: "#0F0B08",
          deep: "#080503",
          card: "#1A1209",
          gold: "#C9A84C",
          cream: "#F0E6D3",
          white: "#F5F0EA",
          grey: "#9A8F84",
          divider: "#2A1F14",
        },
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        dmsans: ["var(--font-dm-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        wide: "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;
