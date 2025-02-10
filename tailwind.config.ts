import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
    },
    animation: {
      shimmer: 'shimmer 2s infinite linear',
    },
    keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' },
      },
    },
  },
  plugins: [],
} satisfies Config;
