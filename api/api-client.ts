import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

class ApiClient {
    private client: AxiosInstance;
    private baseURL = 'http://localhost:8080/api/v1';

    constructor() {
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request Interceptor - 토큰 자동 추가
        this.client.interceptors.request.use(
            async (config) => {
                const cookieStore = await cookies()
                const token = cookieStore.get('authToken')
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor - 에러 처리
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    const cookieStore = await cookies()
                    cookieStore.delete('authToken')
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, params?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(url, { params });
        return response.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.client.post(url, data);
        return response.data;
    }

    async put<T>(url: string, data?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.client.put(url, data);
        return response.data;
    }

    async patch<T>(url: string, data?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.client.patch(url, data);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await this.client.delete(url);
        return response.data;
    }
}

export const apiClient = new ApiClient();