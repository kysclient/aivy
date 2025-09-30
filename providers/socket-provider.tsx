'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { socketClient } from '@/lib/socket-client';
import TokenManager from '@/lib/token-manager';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: (token: string) => void;
  disconnect: () => void;
  joinMealPlan: (mealPlanId: string) => void;
  leaveMealPlan: (mealPlanId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const token = TokenManager.getAccessToken();

  const connect = (token: string) => {
    const newSocket = socketClient.connect(token);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from socket server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });
  };

  const disconnect = () => {
    socketClient.disconnect();
    setSocket(null);
    setIsConnected(false);
  };

  const joinMealPlan = (mealPlanId: string) => {
    if (socket?.connected) {
      socket.emit('join-meal-plan', mealPlanId);
    }
  };

  const leaveMealPlan = (mealPlanId: string) => {
    if (socket?.connected) {
      socket.emit('leave-meal-plan', mealPlanId);
    }
  };

  useEffect(() => {
    connect(token || '');
    return () => {
      disconnect();
    };
  }, []);

  const value: SocketContextType = {
    socket,
    isConnected,
    connect,
    disconnect,
    joinMealPlan,
    leaveMealPlan,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
