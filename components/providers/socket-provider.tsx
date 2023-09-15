'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io as ClientIO, Socket } from 'socket.io-client';

type SocketContextType = {
  socket?: Socket;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: '/api/socket/io',
        addTrailingSlash: false
      }
    ) as Socket;

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
