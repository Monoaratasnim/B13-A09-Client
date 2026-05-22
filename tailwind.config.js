/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: { animation: {
        spinSlow: "spin 1.2s linear infinite",
      },},
  },

  plugins: [],
};
