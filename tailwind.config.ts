import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sunny: {
          light: "#FFE680",
          DEFAULT: "#FFD700",
          dark: "#FFB400",
        },
        rainy: {
          light: "#A3D1FF",
          DEFAULT: "#5FA8FF",
          dark: "#004E9A",
        },
        cloudy: {
          light: "#E0E0E0",
          DEFAULT: "#B0BEC5",
          dark: "#78909C",
        },
        snowy: {
          light: "#E0F7FA",
          DEFAULT: "#B2EBF2",
          dark: "#80DEEA",
        },
        stormy: {
          light: "#A1887F",
          DEFAULT: "#6D4C41",
          dark: "#4E342E",
        },
      },
      backgroundImage: {
        "sunny-gradient": "linear-gradient(to bottom, #FFD700, #FFB400)",
        "rainy-gradient": "linear-gradient(to bottom, #5FA8FF, #004E9A)",
        "cloudy-gradient": "linear-gradient(to bottom, #B0BEC5, #78909C)",
        "snowy-gradient": "linear-gradient(to bottom, #B2EBF2, #80DEEA)",
        "stormy-gradient": "linear-gradient(to bottom, #6D4C41, #4E342E)",
      },
    },
  },
  plugins: [],
} satisfies Config;
