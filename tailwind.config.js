module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ["Basier"],
      'body': ['Basier'],
    },
    extend: {
      colors: {
        primary: {
          lighter: "var(--primaryLighter)",
          light: "var(--primaryLight)",
          default: "var(--primary)",
          dark: "var(--primaryDark)",
          darker: "var(--primaryDarker)"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
}
