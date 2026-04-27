/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00A1DE",
          hover: "#008CBE",
          dark: "#006B92",
        },
        accent: {
          DEFAULT: "#FAD201",
          hover: "#E5BE00",
        },
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', "ui-sans-serif", "system-ui"],
        body: ['"Satoshi"', "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
