/* eslint-disable @typescript-eslint/no-require-imports */
// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // For App Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-filters"),
    require("@tailwindcss/typography"),
  ],
};