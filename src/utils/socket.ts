import { io } from "socket.io-client";

// https://ahmo-api-socket-production.up.railway.app

export const socket = io("ws://localhost:5050");
