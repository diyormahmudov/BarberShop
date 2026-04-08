export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#facc15" },
        },
      },
      animation: {
        typing: "typing 3s steps(20, end) forwards",
        blink: "blink 0.7s infinite",
      },
    },
  },
  plugins: [],
};