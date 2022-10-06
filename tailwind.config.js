/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixeled: ["Pixeled", "sans-serif"],
        signPainter: ["SignPainter", "sans-serif"]
      }
    },
  },
  plugins: [require("flowbite/plugin")],
}
