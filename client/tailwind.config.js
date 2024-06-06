/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
          item: "#717171"
        }
      },
      width: {
        "sidebar": "500px"
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

