'use client';
import { User } from '@/types/user';

class TokenManager {
  private static ACCESS_TOKEN_KEY = 'accessToken';
  private static REFRESH_TOKEN_KEY = 'refreshToken';
  private static USER_KEY = 'user';
  private static REMEMBER_ME_KEY = 'rememberMe';

  static getAccessToken(rememberMe: boolean = false): string | null {
    if (typeof window === 'undefined') return null;
    const remember = localStorage.getItem(this.REMEMBER_ME_KEY) || false;
    const storage = remember ? localStorage : sessionStorage;
    return storage.getItem(this.ACCESS_TOKEN_KEY) || localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(rememberMe: boolean = false): string | null {
    if (typeof window === 'undefined') return null;
    const remember = localStorage.getItem(this.REMEMBER_ME_KEY) || false;
    const storage = remember ? localStorage : sessionStorage;
    return storage.getItem(this.REFRESH_TOKEN_KEY) || localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setTokens(accessToken: string, refreshToken: string, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return;
    const remember = localStorage.getItem(this.REMEMBER_ME_KEY) || false;

    const storage = remember ? localStorage : sessionStorage;

    // Clear tokens from both storages first
    this.clearTokens();

    // Set tokens in the appropriate storage
    storage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    storage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  static getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static setUser(user: User, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return;
    const remember = localStorage.getItem(this.REMEMBER_ME_KEY) || false;

    const storage = remember ? localStorage : sessionStorage;

    // Clear user from both storages first
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.USER_KEY);

    // Set user in the appropriate storage
    storage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static hasValidTokens(): boolean {
    const accessToken = this.getAccessToken(true); // Check both storages
    const refreshToken = this.getRefreshToken(true);
    return !!(accessToken && refreshToken);
  }
}

export default TokenManager;
