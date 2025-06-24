import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Helper from "../../helpers";

// Create context
const SocketContext = createContext<SocketIOClient.Socket | null>(null);

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};

// SocketProvider component to provide socket to the app
export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("session");

    if (isAuthenticated) {
      let authUser = Helper.getStorageData("session");
      let Authorization = Helper.encrypt(authUser.api_token);
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

      const newSocket = io(baseUrl, {
        transports: ['websocket'],
        query: {
          Authorization: Authorization,
        },
      });

      newSocket.on('connect', () => {
        console.log('WebSocket connected');
        setConnected(true);
        const userId = authUser.id.toString();

        // Emit the _join_room event only after socket is connected
        newSocket.emit('_join_room', { user_id: userId });

        // Check the socket's room after joining it
        newSocket.on('_on_join_room', (data) => {
          console.log('Joined room successfully:', data);
          console.log('Socket is connected to rooms:', newSocket.rooms); // Should now show the correct rooms
        });
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
        setConnected(false);
      });

      newSocket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        setConnected(false);
      });

      setSocket(newSocket);

      // Cleanup on component unmount
      return () => {
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.off('_on_join_room');
        newSocket.disconnect();
      };
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
