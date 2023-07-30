/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["var(--font-display)", "sans-serif"],
      "sans-serif": ["var(--font-sans-serif)", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      black: "#010101",
      white: "#FEFEFE",
      cream: "#FFF9DD",
      pink: "#D5227E",
      indigo: "#210544",
      blue: "#16B1D8",
      yellow: "#FE9A0B",
    },
  },
  plugins: [],
};
