/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
      extend: {
          colors: {
              primary: "#9F78FF",
              "primary-20": "#f0eef7",
              "primary-50": "#F2E7FE",
              "primary-100": "#DBB2FF",
              secondary: "#F6EDFF",
              s1: "#3B0091",
              s2: "#480EA5",
              s3: "#5323B1",
          },
      },
  },
  plugins: [],
};
