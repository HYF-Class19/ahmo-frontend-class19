import { io } from "socket.io-client";

// ws://localhost:5500

export const socket = io("https://ahmo-api-socket-production.up.railway.app");
