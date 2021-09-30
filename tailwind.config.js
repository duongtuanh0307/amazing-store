module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      96: "24rem",
      60: "15rem",
    },
    extend: {
      backgroundImage: {
        "amazing-world": "url('../../public/images/galaxy.jpeg')",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
