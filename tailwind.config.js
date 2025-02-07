/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        customPink: '#ff8bba',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h2: {
              color: theme('colors.customPink'),
            },
          },
        },
        dark: {
          css: {
            h2: {
              color: theme('colors.customPink'),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
