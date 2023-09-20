module.exports = {
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./tasks/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        wag: 'wag 0.5s infinite alternate',
        shake: 'shake 0.2s',
        bounce: 'bounce 1s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        wag: {
          '0%': { transform: 'rotate(-45deg)' },
          '100%': { transform: 'rotate(-40deg)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' }
        }
      },
      transform: {
        skewX: { '-5': '-5deg' }
      },
      scale: {
        105: '1.05'
      },
      colors: {
        white: "#fff",
        chocolate: "#d15428",
        peachpuff: "rgba(221, 202, 174, 0.67)",
        dimgray: {
          "100": "#756d61",
          "200": "#5c5c5c",
          "300": "#4e4444",
        },
        ddcaae: "#ddcaae",
        sandybrown: "#dda857",
        black: "#000",
        indianred: "#d46a6a",
        darkseagreen: "#a0b684",
        whitesmoke: {
          "100": "#f5f5f5",
          "200": "#efeeee",
        },
        linen: "#f5ecdf",
        silver: "#c6baa5",
        greh: "#272727",
        "drk-khaki": "#d2b294",
        darkslategray: "#363636",
        burlywood: "#e2b268",
        gray: "rgba(0, 0, 0, 0.13)",
      },
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        xl: "20px",
        "3xs": "10px",
        "4xs": "9px",
      },
      spacing: {
        '5': '1.25rem',
        '10': '2.5rem',
        '20': '5rem'
      },
      boxShadow: {
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'intense-inner': 'inset 0 6px 10px -2px rgba(0, 0, 0, 0.5), inset 0 4px 6px -2px rgba(0, 0, 0, 0.4)'
        },

      fontSize: {
        xl: "1.25rem",
        "5xl": "1.5rem",
        "6xl": "32px",
        "7xl": "40px",
        "8xl": "48px",
        "45xl": "4rem",
        inherit: "inherit",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("daisyui")],
};