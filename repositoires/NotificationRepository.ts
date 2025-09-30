import { BaseRepository } from './base/BaseRepository';
import { PaginatedResponse } from './base/IBaseRepository';
import { apiClient } from '@/api/api-client';

export enum NotificationType {
  MEAL_PLAN_REMINDER = 'meal_plan_reminder',
  NUTRITION_ALERT = 'nutrition_alert',
  RECIPE_RECOMMENDATION = 'recipe_recommendation',
  SYSTEM = 'system',
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  readAt?: string | null;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateNotificationDto {
  title: string;
  message: string;
  type: NotificationType;
  metadata?: any;
}

export interface UpdateNotificationPreferenceDto {
  mealPlanReminder: boolean;
  nutritionAlert: boolean;
  recipeRecommendation: boolean;
  system: boolean;
}

export interface NotificationPreferences {
  mealPlanReminder: boolean;
  nutritionAlert: boolean;
  recipeRecommendation: boolean;
  system: boolean;
}

export class NotificationRepository extends BaseRepository<Notification> {
  protected endpoint = '/notifications';

  async findByUser(options?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }): Promise<PaginatedResponse<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const unreadOnly = options?.unreadOnly || false;

    const params: any = { page, limit };
    if (unreadOnly) {
      params.unreadOnly = 'true';
    }

    const response = await apiClient.get<any>(this.endpoint, params);

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch notifications');
    }

    // 백엔드 응답 구조에 맞게 변환
    const backendData = response.data;
    return {
      data: backendData.notifications || [],
      pagination: {
        page: backendData.page || page,
        limit: backendData.limit || limit,
        total: backendData.total || 0,
        totalPages: backendData.totalPages || Math.ceil((backendData.total || 0) / limit),
        hasNext: (backendData.page || page) < (backendData.totalPages || 1),
        hasPrev: (backendData.page || page) > 1,
      },
    };
  }

  async markAsRead(id: string): Promise<Notification> {
    const response = await apiClient.post<any>(`${this.endpoint}/${id}/read`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to mark notification as read');
    }

    return response.data;
  }

  async markAllAsRead(): Promise<void> {
    const response = await apiClient.post<any>(`${this.endpoint}/read-all`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to mark all notifications as read');
    }
  }

  async getPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<any>(`${this.endpoint}/preferences`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch notification preferences');
    }

    return response.data;
  }

  async updatePreferences(data: UpdateNotificationPreferenceDto): Promise<NotificationPreferences> {
    const response = await apiClient.patch<any>(`${this.endpoint}/preferences`, data);

    if (!response.success) {
      throw new Error(response.error || 'Failed to update notification preferences');
    }

    return response.data;
  }

  async create(data: CreateNotificationDto): Promise<Notification> {
    return super.create(data);
  }

  async delete(id: string): Promise<boolean> {
    return super.delete(id);
  }
}
