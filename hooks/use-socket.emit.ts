'use client';

import { useSocket } from '@/providers/socket-provider';
import { useCallback } from 'react';

export function useSocketEmit() {
  const { socket, isConnected } = useSocket();

  const emit = useCallback(
    (event: string, data?: any) => {
      if (socket && isConnected) {
        socket.emit(event, data);
      } else {
        console.warn('Socket is not connected');
      }
    },
    [socket, isConnected]
  );

  return { emit, isConnected };
}
