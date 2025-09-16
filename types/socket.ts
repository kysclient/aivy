export interface SocketEvents {
    'meal-plan-status': (data: MealPlanStatus) => void;
    'meal-plan-updated': (data: MealPlanUpdate) => void;
    'join-meal-plan': (mealPlanId: string) => void;
    'leave-meal-plan': (mealPlanId: string) => void;
}

export enum MealPlanStatus {
    GENERATING = 'generating',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export interface MealPlanUpdate {
    mealPlanId: string;
    type: 'created' | 'updated' | 'deleted';
    data: any;
    timestamp: string;
}

