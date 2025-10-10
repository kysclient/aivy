'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { User } from '@/types/user';
import {
  AuthResponse,
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
  UserRepository,
} from '@/repositoires/UserRepository';
import TokenManager from '@/lib/token-manager';

// Auth Context Types
export interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;

  // Actions
  login: (credentials: LoginDto, rememberMe?: boolean, noRedirect?: boolean) => Promise<void>;
  register: (userData: CreateUserDto, noRedirect?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;

  // Error handling
  error: string | null;
}

// Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const userRepository = new UserRepository();

  // Computed state
  const isAuthenticated = !!user;

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if tokens exist
        if (!TokenManager.hasValidTokens()) {
          setIsInitializing(false);
          return;
        }

        const profile = await userRepository.getProfile();
        setUser(profile);

        // Update stored user with fresh data
        TokenManager.setUser(profile);
      } catch (error: any) {
        console.error('Auth initialization failed:', error);

        // If token is invalid, try to refresh
        try {
          const refreshToken = TokenManager.getRefreshToken(true);
          if (refreshToken) {
            const { token } = await userRepository.refreshToken(refreshToken);
            const rememberMe = !!localStorage.getItem('refreshToken');
            TokenManager.setTokens(token, refreshToken, rememberMe);

            // Retry getting profile
            const profile = await userRepository.getProfile();
            setUser(profile);
            TokenManager.setUser(profile, rememberMe);
          } else {
            throw new Error('No refresh token available');
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          TokenManager.clearTokens();
          setUser(null);
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(
    async (credentials: LoginDto, rememberMe: boolean = false, noRedirect?: boolean) => {
      setIsLoading(true);
      setError(null);

      try {
        const response: AuthResponse = await userRepository.login(credentials);

        // Store tokens and user
        TokenManager.setTokens(
          response.tokens.accessToken,
          response.tokens.refreshToken,
          rememberMe
        );
        TokenManager.setUser(response.user, rememberMe);
        setUser(response.user);

        toast.success(`환영합니다, ${response.user.name || response.user.nickname}님!`);

        // Redirect to dashboard
        if (!noRedirect) {
          router.push('/');
        }
      } catch (error: any) {
        const errorMessage = error.message || '로그인에 실패했습니다.';
        setError(errorMessage);

        // Handle specific error cases
        if (errorMessage.includes('Invalid credentials') || errorMessage.includes('Unauthorized')) {
          toast.error('이메일 또는 비밀번호를 확인해주세요.');
        } else if (errorMessage.includes('Account not found')) {
          toast.error('존재하지 않는 계정입니다.');
        } else if (errorMessage.includes('Account not verified')) {
          toast.error('이메일 인증이 필요합니다.');
        } else {
          toast.error(errorMessage);
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [userRepository, router]
  );

  // Register function
  const register = useCallback(
    async (userData: CreateUserDto, noRedirect?: boolean) => {
      setIsLoading(true);
      setError(null);

      try {
        const response: AuthResponse = await userRepository.register(userData);

        // Store tokens and user
        TokenManager.setTokens(response.tokens.accessToken, response.tokens.refreshToken, true);
        TokenManager.setUser(response.user, true);
        setUser(response.user);

        toast.success('회원가입이 완료되었습니다!');

        // Redirect to dashboard or onboarding
        if (!noRedirect) {
          router.push('/');
        }
      } catch (error: any) {
        const errorMessage = error.message || '회원가입에 실패했습니다.';
        setError(errorMessage);

        if (
          errorMessage.includes('Email already exists') ||
          errorMessage.includes('already registered')
        ) {
          toast.error('이미 사용 중인 이메일입니다.');
        } else if (errorMessage.includes('Username already exists')) {
          toast.error('이미 사용 중인 이름입니다.');
        } else {
          toast.error(errorMessage);
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [userRepository, router]
  );

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Clear tokens and user data
      TokenManager.clearTokens();
      setUser(null);

      toast.success('로그아웃되었습니다.');

      // Redirect to login page
      router.push('/auth');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if server logout fails, clear local data
      TokenManager.clearTokens();
      setUser(null);
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Update profile function
  const updateProfile = useCallback(
    async (data: FormData) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedUser = await userRepository.updateProfile(data);

        // Update user state and storage
        setUser(updatedUser);
        const rememberMe = !!localStorage.getItem('accessToken');
        TokenManager.setUser(updatedUser, rememberMe);

        toast.success('프로필이 업데이트되었습니다.');
      } catch (error: any) {
        const errorMessage = error.message || '프로필 업데이트에 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [userRepository]
  );

  // Forgot password function
  const forgotPassword = useCallback(
    async (email: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await userRepository.forgotPassword(email);
        toast.success('비밀번호 재설정 이메일을 발송했습니다.');
      } catch (error: any) {
        const errorMessage = error.message || '비밀번호 재설정 이메일 발송에 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [userRepository]
  );

  // Reset password function
  const resetPassword = useCallback(
    async (token: string, newPassword: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await userRepository.resetPassword(token, newPassword);
        toast.success('비밀번호가 재설정되었습니다.');

        // Redirect to login
        router.push('/auth');
      } catch (error: any) {
        const errorMessage = error.message || '비밀번호 재설정에 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [userRepository, router]
  );

  // Refresh authentication
  const refreshAuth = useCallback(async () => {
    if (!user) return;

    try {
      const profile = await userRepository.getProfile();
      setUser(profile);

      const rememberMe = !!localStorage.getItem('accessToken');
      TokenManager.setUser(profile, rememberMe);
    } catch (error: any) {
      console.error('Auth refresh failed:', error);

      // If refresh fails, try token refresh
      try {
        const refreshToken = TokenManager.getRefreshToken(true);
        if (refreshToken) {
          const { token } = await userRepository.refreshToken(refreshToken);
          const rememberMe = !!localStorage.getItem('refreshToken');
          TokenManager.setTokens(token, refreshToken, rememberMe);

          // Retry getting profile
          const profile = await userRepository.getProfile();
          setUser(profile);
          TokenManager.setUser(profile, rememberMe);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        await logout();
      }
    }
  }, [user, userRepository, logout]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue: AuthContextType = {
    // State
    user,
    isAuthenticated,
    isLoading,
    isInitializing,
    error,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
    refreshAuth,
    clearError,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// Protected route HOC
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    redirectTo?: string;
    requireAuth?: boolean;
  }
) {
  const { redirectTo = '/auth', requireAuth = true } = options || {};

  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isInitializing } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isInitializing && requireAuth && !isAuthenticated) {
        router.replace(redirectTo);
      }
    }, [isInitializing, isAuthenticated, router]);

    if (isInitializing) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (requireAuth && !isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Auth guard hook
export function useAuthGuard(options?: { redirectTo?: string; requireAuth?: boolean }) {
  const { redirectTo = '/auth', requireAuth = true } = options || {};
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && requireAuth && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isInitializing, isAuthenticated, router, redirectTo, requireAuth]);

  return {
    isAuthenticated,
    isInitializing,
    canAccess: !requireAuth || isAuthenticated,
  };
}
