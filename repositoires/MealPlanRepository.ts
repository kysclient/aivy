import { apiClient } from '@/api/api-client';
import { BaseRepository } from './base/BaseRepository';
import { ApiResponse, PaginatedResponse } from './base/IBaseRepository';

export interface MealPlan {
    id: string;
    userId: string;
    title: string;
    startDate: string;
    endDate: string;
    dailyCalories: number;
    status: MealPlanStatus;
    mealPlanData?: MealPlanData;
    nutritionSummary?: NutritionSummary;
    createdAt: string;
    updatedAt: string;
}

export enum MealPlanStatus {
    GENERATING = 'generating',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

export interface MealPlanData {
    mealPlanData: DailyMealPlan[];
}

export interface DailyMealPlan {
    date: string;
    breakfast: MealItem;
    lunch: MealItem;
    dinner: MealItem;
    snack: MealItem;
    totalCalories: number;
    dailyNutrients: Nutrients;
}

export interface MealItem {
    menu: string;
    calories: number;
    nutrients: Nutrients;
}

export interface Nutrients {
    protein: number;
    carbs: number;
    fat: number;
}

export interface NutritionSummary {
    averageCalories: number;
    averageNutrients: Nutrients;
    totalDays: number;
}

export interface CreateMealPlanDto {
    title?: string;
    name: string;
    startDate: string;
    endDate: string;
    age: number | string;
    gender: string;
    height: number | string;
    weight: number | string;
    activityLevel: string;
    goal: string;
    allergies?: string[];
    excludeFoods?: string[];
    targetCalories?: number | null;
    specialRequests?: string;
}

export interface MealPlanStatusUpdate {
    mealPlanId: string;
    status: MealPlanStatus;
    progress?: number;
    message?: string;
}

export class MealPlanRepository extends BaseRepository<MealPlan> {
    protected endpoint = '/meal-plans';

    async generateMealPlan(createMealPlanDto: CreateMealPlanDto): Promise<MealPlan> {
        try {
            const response = await apiClient.post<ApiResponse<MealPlan>>(
                `${this.endpoint}/generate`,
                createMealPlanDto
            );

            if (response.statusCode >= 400) {
                throw new Error(response.error || 'Failed to generate meal plan');
            }

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('로그인이 필요합니다.');
            } else if (error.response?.status === 400) {
                throw new Error('입력 정보를 확인해주세요.');
            } else if (error.response?.status === 500) {
                throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
            throw new Error(error.message || '식단 생성에 실패했습니다.');
        }
    }

    async getMealPlanById(id: string): Promise<MealPlan> {
        try {
            const response = await apiClient.get<ApiResponse<MealPlan>>(
                `${this.endpoint}/${id}`
            );

            if (response.statusCode >= 400) {
                throw new Error(response.error || 'Failed to get meal plan');
            }

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('식단을 찾을 수 없습니다.');
            } else if (error.response?.status === 403) {
                throw new Error('접근 권한이 없습니다.');
            }
            throw new Error(error.message || '식단 조회에 실패했습니다.');
        }
    }

    async getUserMealPlans(page?: number, limit?: number): Promise<any> {
        try {
            const params = new URLSearchParams();
            if (page) params.append('page', page.toString());
            if (limit) params.append('limit', limit.toString());

            const response = await apiClient.get<ApiResponse<any>>(
                `${this.endpoint}?${params.toString()}`
            );

            if (response.statusCode >= 400) {
                throw new Error(response.error || 'Failed to get meal plans');
            }

            return response.data;
        } catch (error: any) {
            throw new Error(error.message || '식단 목록 조회에 실패했습니다.');
        }
    }

    async deleteMealPlan(id: string): Promise<void> {
        try {
            const response = await apiClient.delete<ApiResponse<void>>(
                `${this.endpoint}/${id}`
            );

            if (response.statusCode >= 400) {
                throw new Error(response.error || 'Failed to delete meal plan');
            }
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('삭제할 식단을 찾을 수 없습니다.');
            } else if (error.response?.status === 403) {
                throw new Error('식단 삭제 권한이 없습니다.');
            }
            throw new Error(error.message || '식단 삭제에 실패했습니다.');
        }
    }

    async updateMealPlan(id: string, updateData: Partial<CreateMealPlanDto>): Promise<MealPlan> {
        try {
            const response = await apiClient.patch<ApiResponse<MealPlan>>(
                `${this.endpoint}/${id}`,
                updateData
            );

            if (response.statusCode >= 400) {
                throw new Error(response.error || 'Failed to update meal plan');
            }

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('수정할 식단을 찾을 수 없습니다.');
            } else if (error.response?.status === 403) {
                throw new Error('식단 수정 권한이 없습니다.');
            }
            throw new Error(error.message || '식단 수정에 실패했습니다.');
        }
    }

    async getMealPlansByStatus(status: MealPlanStatus): Promise<any> {
        try {
            const response = await apiClient.get<any>(
                `${this.endpoint}?status=${status}`
            );

            if (response.statusCode >= 400) {
                throw new Error(response.error || 'Failed to get meal plans by status');
            }

            return response.data;
        } catch (error: any) {
            throw new Error(error.message || '상태별 식단 조회에 실패했습니다.');
        }
    }
}