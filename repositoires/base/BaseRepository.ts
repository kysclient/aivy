import { apiClient } from '@/api/api-client';
import { ApiResponse, FindAllOptions, IBaseRepository, PaginatedResponse } from './IBaseRepository';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    protected abstract endpoint: string;

    async findById(id: string): Promise<T> {
        const response = await apiClient.get<ApiResponse<T>>(`${this.endpoint}/${id}`);

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch data');
        }

        return response.data;
    }

    async findAll(options?: FindAllOptions): Promise<PaginatedResponse<T>> {
        const params = {
            page: options?.page || 1,
            limit: options?.limit || 10,
            sortBy: options?.sortBy || 'createdAt',
            sortOrder: options?.sortOrder || 'DESC',
            ...options?.filters,
        };

        const response = await apiClient.get<ApiResponse<PaginatedResponse<T>>>(
            this.endpoint,
            params
        );

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch data');
        }

        return response.data;
    }

    async create(data: Partial<T>): Promise<T> {
        const response = await apiClient.post<ApiResponse<T>>(this.endpoint, data);

        if (!response.success) {
            throw new Error(response.error || 'Failed to create');
        }

        return response.data;
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        const response = await apiClient.put<ApiResponse<T>>(`${this.endpoint}/${id}`, data);

        if (!response.success) {
            throw new Error(response.error || 'Failed to update');
        }

        return response.data;
    }

    async delete(id: string): Promise<boolean> {
        const response = await apiClient.delete<ApiResponse<boolean>>(`${this.endpoint}/${id}`);

        if (!response.success) {
            throw new Error(response.error || 'Failed to delete');
        }

        return response.data;
    }
}