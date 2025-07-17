/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-dark": "#222631",
        "app-darker": "#1F2630",
        "app-secondary": "#212832",
        "app-light": "#C9CED8",
        "app-text": "#E3F3F2",
        "app-accent": "#00C6B8",
        "app-primary": "#00C6B8",
        "app-warning": "#E09D18",
        "app-success": "#71BC2C",
        "app-error": "#C10000",
        "feed-bg": "#242B2C",
        "border-glass": "rgba(211, 251, 216, 0.50)",
      },
      fontFamily: {
        ubuntu: [
          "Ubuntu",
          "-apple-system",
          "Roboto",
          "Helvetica",
          "sans-serif",
        ],
        "share-tech": [
          "Share Tech",
          "-apple-system",
          "Roboto",
          "Helvetica",
          "sans-serif",
        ],
      },
      backdropBlur: {
        glass: "2px",
        "glass-heavy": "4px",
      },
      borderRadius: {
        custom: "1px 25px 25px 25px",
        "custom-large": "1px 12px 12px 12px",
        "custom-header": "0px 6px 6px 6px",
        "custom-right": "0px 10px 10px 0px",
        "custom-feed": "0px 10px 10px 10px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
