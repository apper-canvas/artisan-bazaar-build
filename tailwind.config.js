/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B7355",
        secondary: "#A8B5A0",
        accent: "#D4765A",
        surface: "#FAF7F2",
        success: "#6B9B7F",
        warning: "#D4A574",
        error: "#C85A54",
        info: "#7B92A8"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}