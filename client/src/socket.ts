import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
    autoConnect: false,
    auth: {
      token: sessionStorage.getItem("token"),
    },
});