// import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useAuth } from './auth-context';

// type SocketContextType = {
//     socket: Socket | null;
//     connected: boolean;
//     joinMealPlan: (mealPlanId: string) => void;
//     emitToServer: (event: string, data?: any) => void;
// };

// const SocketContext = createContext<SocketContextType | undefined>(undefined);

// export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const { isAuthenticated, token } = useAuth();

//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [connected, setConnected] = useState(false);

//     useEffect(() => {
//         if (!isAuthenticated) return;

//         const s = io(`localhost:8080/meal-plan`, {
//             auth: {
//                 token: token, 
//             },
//             withCredentials: true,
//         });

//         setSocket(s);

//         s.on('connect', () => {
//             console.log('✅ Socket connected:', s.id);
//             setConnected(true);
//         });

//         s.on('disconnect', () => {
//             console.log('❌ Socket disconnected');
//             setConnected(false);
//         });

//         // 서버에서 오는 기본 이벤트들
//         s.on('meal-plan-status', (data) => {
//             console.log('📡 Meal plan status:', data);
//         });

//         s.on('meal-plan-updated', (data) => {
//             console.log('📝 Meal plan updated:', data);
//         });

//         return () => {
//             s.disconnect();
//         };
//     }, [isAuthenticated]);

//     const joinMealPlan = useCallback((mealPlanId: string) => {
//         socket?.emit('join-meal-plan', mealPlanId);
//     }, [socket]);

//     const emitToServer = useCallback((event: string, data?: any) => {
//         socket?.emit(event, data);
//     }, [socket]);

//     return (
//         <SocketContext.Provider value={{ socket, connected, joinMealPlan, emitToServer }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export const useSocket = () => {
//     const context = useContext(SocketContext);
//     if (!context) throw new Error('useSocket must be used within SocketProvider');
//     return context;
// };