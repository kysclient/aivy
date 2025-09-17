import { apiClient } from '@/api/api-client';
import { BaseRepository } from './base/BaseRepository';
import { ApiResponse } from './base/IBaseRepository';
import { User } from '@/types/user';


export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}

export class UserRepository extends BaseRepository<User> {
    protected endpoint = '/users';

    async login(credentials: LoginDto): Promise<AuthResponse> {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(
            '/auth/login',
            credentials
        );

        if (response.statusCode >= 400) {
            throw new Error(response.error || 'Login failed');
        }

        return response.data;
    }

    async register(userData: CreateUserDto): Promise<AuthResponse> {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(
            '/auth/register',
            userData
        );

        if (response.statusCode >= 400) {
            throw new Error(response.error || 'Registration failed');
        }

        return response.data;
    }

    async getProfile(): Promise<User> {
        const response = await apiClient.get<ApiResponse<User>>('/users/profile');

        if (response.statusCode >= 400) {
            throw new Error(response.error || 'Failed to get profile');
        }

        return response.data;
    }

    async updateProfile(data: UpdateUserDto): Promise<User> {
        const response = await apiClient.patch<ApiResponse<User>>('/auth/profile', data);

        if (response.statusCode >= 400) {
            throw new Error(response.error || 'Failed to update profile');
        }

        return response.data;
    }

    async refreshToken(refreshToken: string): Promise<{ token: string }> {
        const response = await apiClient.post<ApiResponse<{ token: string }>>(
            '/auth/refresh',
            { refreshToken }
        );

        if (response.statusCode >= 400) {
            throw new Error(response.error || 'Token refresh failed');
        }

        return response.data;
    }

    async forgotPassword(email: string): Promise<{ message: string }> {
        const response = await apiClient.post<ApiResponse<{ message: string }>>(
            '/auth/forgot-password',
            { email }
        );

        if (response.statusCode >= 400) {
            throw new Error(response.error || 'Password reset email failed to send');
        }

        return response.data;
    }

    async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
        const response = await apiClient.post<ApiResponse<{ message: string }>>(
            '/auth/reset-password',
            { token, newPassword }
        );

        if (response.statusCode >= 400) {
            throw new Error(response.error || 'Password reset failed');
        }

        return response.data;
    }
}