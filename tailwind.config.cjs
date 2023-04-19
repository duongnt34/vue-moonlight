/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-lighten": "#161616",
        // primary: "#5179ff",
        // primary: "#bd0000",
        primary: "#ffd80e",
        "gray-lighten": "#989898",
        "gray-darken": "#3a3939",
        dark: "#1C1C1E",
        "dark-darken": "#19191b",
        "dark-lighten": "#333335",
        "dark-lighten-2": "#49494b",
      },
    },
    fontFamily: {
      roboto: ["Roboto, sans-serif"],
      sourcesanspro: ["Source Sans Pro, sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
