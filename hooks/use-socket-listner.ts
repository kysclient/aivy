'use client';

import { useSocket } from '@/providers/socket-provider';
import { useEffect, useRef } from 'react';

type SocketEventHandler = (...args: any[]) => void;

export function useSocketListener(event: string, handler: SocketEventHandler, deps: any[] = []) {
  const { socket } = useSocket();
  const savedHandler = useRef<SocketEventHandler>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!socket) return;

    const eventListener = (...args: any[]) => {
      savedHandler.current?.(...args);
    };

    socket.on(event, eventListener);

    return () => {
      socket.off(event, eventListener);
    };
  }, [socket, event, ...deps]);
}