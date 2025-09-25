import { io } from "socket.io-client";

const URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://api.yourdomain.com"; // deploy url

const globalAny = window;
if (!globalAny.__SOCKET__) {
  globalAny.__SOCKET__ = io(URL, { transports: ["websocket"] });
}

export default globalAny.__SOCKET__;
