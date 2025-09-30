import TokenManager from '@/lib/token-manager';
import { UserRepository } from '@/repositoires/UserRepository';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiClient {
  private client: AxiosInstance;
  private baseURL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`;

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
        const token = TokenManager.getAccessToken(true); // 두 스토리지 모두 확인
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor - 에러 처리 및 토큰 갱신
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const userRepository = new UserRepository();
        // 401 에러 처리 (토큰 만료 또는 무효)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // 리프레시 토큰으로 새 토큰 발급 시도
            const refreshToken = TokenManager.getRefreshToken(true);
            if (refreshToken) {
              const { token: newAccessToken } = await userRepository.refreshToken(refreshToken);

              // 새 토큰 저장 (기존과 같은 스토리지 방식 유지)
              const rememberMe = !!localStorage.getItem('refreshToken');
              TokenManager.setTokens(newAccessToken, refreshToken, rememberMe);

              // 원래 요청에 새 토큰 적용하여 재시도
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);

            // 리프레시 실패 시 모든 토큰 및 사용자 데이터 삭제
            TokenManager.clearTokens();

            // 전역 로그아웃 이벤트 발생 (useAuth에서 감지)
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('auth:logout'));
            }
          }

          // 리프레시 토큰도 없거나 실패한 경우 토큰 삭제
          TokenManager.clearTokens();

          // 전역 로그아웃 이벤트 발생
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('auth:logout'));
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
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
