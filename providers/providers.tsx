"use client";

import { ReactNode } from "react";
import { SocketProvider } from "./socket-provider";

export function Providers({ children }: { children: ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>;
}