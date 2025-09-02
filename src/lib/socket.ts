import { baseUrl } from "@/config/constants";
import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(baseUrl, {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: false,
    });

    socket.auth = {
      token: localStorage.getItem("token"),
    };

    socket.connect();
  }
  return socket;
};
