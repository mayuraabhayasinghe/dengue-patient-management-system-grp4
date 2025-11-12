// src/socket.js
import { io } from "socket.io-client";
import api from "./api/api";

const socket = io(`${api}`); // Backend server URL

socket.on("connect", () => {
  console.log("Socket connected with ID:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

export default socket;
