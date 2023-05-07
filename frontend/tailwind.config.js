/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "logo-light": "url('https://www.tactalyse.com/wp-content/uploads/2019/07/tactalyse-sport-analyse.png')",
        "logo-dark": "url('/logo_dark.png')"
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}