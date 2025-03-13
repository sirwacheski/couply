/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{jsx,tsx}",
  ],
  presets: [
    require("nativewind/preset")
  ],
  theme: {
    extend: {
      colors: {
        text: "#FFFFFF",
        screen: "#FF0054",
        message: "#B40C37",
      },
      fontFamily: {
        base: ["Sora"],
      }
    },
  },
  plugins: [],
}