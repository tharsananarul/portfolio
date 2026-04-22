/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#020617",
        secondary: "#0f172a",
        accent: {
          DEFAULT: "#3b82f6",
          hover: "#60a5fa",
        },
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
