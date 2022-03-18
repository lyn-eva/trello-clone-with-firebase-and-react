module.exports = {
  content: ["./src/**/**/*.js"],
  theme: {
    extend: {
      colors: {
        "grey-blue": "#5e6c84",
        "dense-blue": "#172b4d",
      },
      backgroundColor: {
        "list-clr": "#ebecf0",
        primary: "#0079bf",
        "hover-clr": "rgba(90, 90, 90, 0.15)",
      },
      boxShadow: {
        "note": "0 1px 0px 0px #091e4240",
      },
      animation: {
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        "slide-in-right": {
          "0%": {
            "-webkit-transform": "translateX(1000px)",
            transform: "translateX(1000px)",
            opacity: 0,
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ["hover", "focus"],
      display: ["focus"],
    }
  },
  plugins: [],
};
