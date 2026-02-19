// tailwind.config.ts
// export default {
//   content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0038de",
        primaryWhite: "#fff5f2",
        accentGreen: "#c6ff57",
        accentYellow: "#ffed00",
        accentPink: "#ffb5d0",
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config