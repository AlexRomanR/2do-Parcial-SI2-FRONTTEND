/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          "50": "#fff5f0",
          "100": "#ffd6c2",
          "200": "#feb795",
          "300": "#fe9868",
          "400": "#fd783c",
          "500": "#fb580f",
          "600": "#db4603",
          "700": "#b03802",
          "800": "#862b01",
          "900": "#5a1d00",
          "950": "#2f0f00",
        },
      },
    },
  },
  plugins: [],
};
