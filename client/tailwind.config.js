/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chat: {
          gray: {
            light: "#A0A0A0",
            normal: "#5F5F5F",
            strength: "#515151"
          },
          blue: {
            normal: "#00A3FF",
            active: "#009AF1"
          },
          bg: "#E7E7E7",
          item: "#717171",
          dark: {
            100: "#323232",
            200: "#292929",
            300: "#121212",
            border: "#303030"
          }
        }
      },
      width: {
        "sidebar": "420px"
      },
      height: {
        chatList: "720px"
      },
      maxWidth: {
        "auth-form": "500px"
      }
    },
  },
  plugins: [],
}

