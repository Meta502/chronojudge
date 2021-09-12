import React from "react";
import { useState, useEffect, createContext } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url, { path: process.env.WEBSOCKET_PATH });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, [url]);

  return socket;
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC = ({ children }) => {
  const socket = useSocket(`${process.env.NEXT_PUBLIC_API_URL}`);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return React.useContext(SocketContext);
};
