import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3123", { autoConnect: true });
    console.log("connecting");
    socket.on("connect", () => {
      console.log("connect");
      setSocket(socket);
    });
    socket.connect();
  }, []);

  return socket;
};
