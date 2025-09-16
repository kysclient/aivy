'use client';

import { useSocket } from '@/providers/socket-provider';
import { useEffect, useState, useCallback } from 'react';

interface MealPlanStatus {
    status: string;
    progress?: number;
    message?: string;
    data?: any;
}

interface MealPlanUpdate {
    mealPlanId: string;
    type: string;
    data: any;
}

export function useMealPlanSocket(mealPlanId?: string) {
    const { socket, isConnected, joinMealPlan, leaveMealPlan } = useSocket();
    const [mealPlanStatus, setMealPlanStatus] = useState<MealPlanStatus | null>(null);
    const [mealPlanUpdates, setMealPlanUpdates] = useState<MealPlanUpdate[]>([]);
    const [lastUpdate, setLastUpdate] = useState<MealPlanUpdate | null>(null);

    // Join/Leave meal plan room
    useEffect(() => {
        if (isConnected && socket && mealPlanId) {
            joinMealPlan(mealPlanId);

            return () => {
                leaveMealPlan(mealPlanId);
            };
        }
    }, [isConnected, socket, mealPlanId, joinMealPlan, leaveMealPlan]);

    // Listen for meal plan status updates
    useEffect(() => {
        if (!socket) return;

        const handleMealPlanStatus = (data: MealPlanStatus) => {
            setMealPlanStatus(data);
        };

        const handleMealPlanUpdate = (data: MealPlanUpdate) => {
            setLastUpdate(data);
            setMealPlanUpdates(prev => [...prev, data]);
        };

        socket.on('meal-plan-status', handleMealPlanStatus);
        socket.on('meal-plan-updated', handleMealPlanUpdate);

        return () => {
            socket.off('meal-plan-status', handleMealPlanStatus);
            socket.off('meal-plan-updated', handleMealPlanUpdate);
        };
    }, [socket]);

    const clearUpdates = useCallback(() => {
        setMealPlanUpdates([]);
    }, []);

    const clearStatus = useCallback(() => {
        setMealPlanStatus(null);
    }, []);

    return {
        mealPlanStatus,
        mealPlanUpdates,
        lastUpdate,
        clearUpdates,
        clearStatus,
        isConnected,
    };
}
