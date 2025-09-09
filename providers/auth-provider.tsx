// import { userRepository } from '@/repositories/RepositoryFactory';
// import { CreateUserDto, LoginDto, User } from '@/repositories/UserRepository';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// interface AuthContextType {
//     token: string | null;
//     user: User | null;
//     loading: boolean;
//     isAuthenticated: boolean;
//     login: (credentials: LoginDto) => Promise<{ success: boolean; error?: string }>;
//     register: (userData: CreateUserDto) => Promise<{ success: boolean; error?: string }>;
//     logout: () => Promise<void>;
//     checkAuthStatus: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true); // 초기에는 true로 시작
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [token, setToken] = useState<string | null>(null);
//     const checkAuthStatus = async () => {
//         try {
//             setLoading(true);
//             const token = await AsyncStorage.getItem('authToken');
//             if (!token) {
//                 setToken(null)
//                 setIsAuthenticated(false);
//                 setUser(null);
//                 return;
//             }

//             // 토큰이 있으면 프로필 가져오기
//             const profile = await userRepository.getProfile();
//             console.log('profile : ', profile)
//             setToken(token)
//             setUser(profile);
//             setIsAuthenticated(true);
//         } catch (error) {
//             console.error('Auth check failed:', error);
//             // 토큰이 유효하지 않으면 삭제
//             await AsyncStorage.removeItem('authToken');
//             await AsyncStorage.removeItem('refreshToken');
//             setToken(null)
//             setIsAuthenticated(false);
//             setUser(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const login = async (credentials: LoginDto) => {
//         try {
//             setLoading(true);
//             const authData = await userRepository.login(credentials);

//             await AsyncStorage.setItem('authToken', authData.tokens.accessToken);
//             await AsyncStorage.setItem('refreshToken', authData.tokens.refreshToken);

//             setUser(authData.user);
//             setIsAuthenticated(true);

//             return { success: true };
//         } catch (error: any) {
//             return {
//                 success: false,
//                 error: error.message || 'Login failed'
//             };
//         } finally {
//             setLoading(false);
//         }
//     };

//     const register = async (userData: CreateUserDto) => {
//         try {
//             setLoading(true);
//             const authData = await userRepository.register(userData);

//             await AsyncStorage.setItem('authToken', authData.tokens.accessToken);
//             await AsyncStorage.setItem('refreshToken', authData.tokens.refreshToken);

//             setUser(authData.user);
//             setIsAuthenticated(true);

//             return { success: true };
//         } catch (error: any) {
//             return {
//                 success: false,
//                 error: error.message || 'Registration failed'
//             };
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = async () => {
//         try {
//             setLoading(true);
//             await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
//             setUser(null);
//             setIsAuthenticated(false);
//         } catch (error) {
//             console.error('Logout error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 앱 시작 시 인증 상태 확인
//     useEffect(() => {
//         checkAuthStatus();
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 token,
//                 user,
//                 loading,
//                 isAuthenticated,
//                 login,
//                 register,
//                 logout,
//                 checkAuthStatus,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };