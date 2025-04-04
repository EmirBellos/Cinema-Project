/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#4D3F72",
        "secondary-purple": "#8A7C9C",
        "light-blue": "#C1DBE3",
        "button-green": "#558564",
        "cinema-yellow": "#D5A021",

        //Nueva paleta de colores
        "blue-header": "#1D2D44",
        "gray-background": "#FCFAF9",
        "second-blue": "#3E5C76",
      },
    },
  },
  plugins: [],
};
