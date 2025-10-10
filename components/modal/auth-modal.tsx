'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/providers/auth-provider';
import { CreateUserDto, LoginDto } from '@/repositoires/UserRepository';
import Link from 'next/link';
import { useSocket } from '@/providers/socket-provider';
import TokenManager from '@/lib/token-manager';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface FormErrors {
  [key: string]: string;
}

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Validation utilities
const validateEmail = (email: string): string | null => {
  if (!email) return '이메일을 입력해주세요.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.';
  }
  return null;
};

const validateName = (name: string): string | null => {
  if (!name) return '이름을 입력해주세요.';
  if (name.length < 2) return '이름은 최소 2자 이상이어야 합니다.';
  if (name.length > 50) return '이름은 50자를 초과할 수 없습니다.';
  return null;
};

export function AuthModal({ open, onOpenChange, onSuccess }: AuthModalProps) {
  const { login, register, isLoading } = useAuth();
  const { connect } = useSocket();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleLoginChange = (field: keyof LoginFormData, value: string | boolean) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));

    if (typeof value === 'string') {
      clearError(field);

      if (field === 'email' && value) {
        const emailError = validateEmail(value);
        if (emailError) {
          setErrors((prev) => ({ ...prev, [field]: emailError }));
        }
      }

      if (field === 'password' && value) {
        const passwordError = validatePassword(value);
        if (passwordError) {
          setErrors((prev) => ({ ...prev, [field]: passwordError }));
        }
      }
    }
  };

  const handleSignupChange = (field: keyof SignupFormData, value: string | boolean) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));

    if (typeof value === 'string') {
      clearError(field);

      if (field === 'name' && value) {
        const nameError = validateName(value);
        if (nameError) {
          setErrors((prev) => ({ ...prev, [field]: nameError }));
        }
      }

      if (field === 'email' && value) {
        const emailError = validateEmail(value);
        if (emailError) {
          setErrors((prev) => ({ ...prev, [field]: emailError }));
        }
      }

      if (field === 'password' && value) {
        const passwordError = validatePassword(value);
        if (passwordError) {
          setErrors((prev) => ({ ...prev, [field]: passwordError }));
        }
      }

      if (field === 'confirmPassword' && value) {
        if (value !== signupData.password) {
          setErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
        }
      }
    }
  };

  const validateLoginForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(loginData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(loginData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignupForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateName(signupData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(signupData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(signupData.password);
    if (passwordError) newErrors.password = passwordError;

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!signupData.agreeToTerms) {
      newErrors.agreeToTerms = '이용약관에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      toast.error('입력 정보를 확인해주세요.');
      return;
    }

    try {
      const credentials: LoginDto = {
        email: loginData.email,
        password: loginData.password,
      };
      localStorage.setItem('rememberMe', loginData.rememberMe.toString());
      await login(credentials, loginData.rememberMe, true);

      // 로그인 성공 후 소켓 재연결
      const token = TokenManager.getAccessToken();
      if (token) {
        connect(token);
      }

      // 로그인 성공 시에만 모달 닫기
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Login failed from component:', error);

      const errorMessage = error.message || '로그인에 실패했습니다.';
      if (errorMessage.includes('Invalid credentials') || errorMessage.includes('Unauthorized')) {
        setErrors({
          email: '이메일 또는 비밀번호가 잘못되었습니다.',
          password: '이메일 또는 비밀번호가 잘못되었습니다.',
        });
      } else if (errorMessage.includes('Account not found')) {
        setErrors({ email: '존재하지 않는 계정입니다.' });
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignupForm()) {
      toast.error('입력 정보를 확인해주세요.');
      return;
    }

    try {
      const userData: CreateUserDto = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      };
      await register(userData, true);

      // 회원가입 성공 후 소켓 연결
      const token = TokenManager.getAccessToken();
      if (token) {
        connect(token);
      }

      // 회원가입 성공 시에만 모달 닫기
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Signup error:', error);

      const errorMessage = error.message || '회원가입에 실패했습니다.';

      if (
        errorMessage.includes('Email already exists') ||
        errorMessage.includes('already registered')
      ) {
        setErrors({ email: '이미 사용 중인 이메일입니다.' });
      } else if (errorMessage.includes('Username already exists')) {
        setErrors({ name: '이미 사용 중인 이름입니다.' });
      }
      // auth-provider에서 이미 toast를 표시하므로 여기서는 중복 toast 제거
    }
  };

  const ErrorMessage = ({ error }: { error: string }) => (
    <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
      <AlertCircle className="w-4 h-4" />
      <span>{error}</span>
    </div>
  );

  const SuccessIndicator = () => (
    <div className="flex items-center gap-1 mt-1 text-sm text-green-500">
      <CheckCircle2 className="w-4 h-4" />
      <span>올바른 형식입니다</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">로그인</TabsTrigger>
            <TabsTrigger value="signup">회원가입</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0">
                <CardTitle>로그인</CardTitle>
                <CardDescription>계정에 로그인하여 계속하세요</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">이메일</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      className={errors.email ? 'border-red-500' : ''}
                      value={loginData.email}
                      onChange={(e) => handleLoginChange('email', e.target.value)}
                      required
                    />
                    {errors.email && <ErrorMessage error={errors.email} />}
                    {!errors.email &&
                      loginData.email &&
                      validateEmail(loginData.email) === null && <SuccessIndicator />}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">비밀번호</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력하세요"
                        className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        value={loginData.password}
                        onChange={(e) => handleLoginChange('password', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <ErrorMessage error={errors.password} />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={loginData.rememberMe}
                      onCheckedChange={(checked) => handleLoginChange('rememberMe', checked)}
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      로그인 상태 유지
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0">
                <CardTitle>회원가입</CardTitle>
                <CardDescription>새 계정을 만들어 시작하세요</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">이름</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="이름을 입력하세요"
                      className={errors.name ? 'border-red-500' : ''}
                      value={signupData.name}
                      onChange={(e) => handleSignupChange('name', e.target.value)}
                      required
                    />
                    {errors.name && <ErrorMessage error={errors.name} />}
                    {!errors.name &&
                      signupData.name &&
                      validateName(signupData.name) === null && <SuccessIndicator />}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">이메일</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      className={errors.email ? 'border-red-500' : ''}
                      value={signupData.email}
                      onChange={(e) => handleSignupChange('email', e.target.value)}
                      required
                    />
                    {errors.email && <ErrorMessage error={errors.email} />}
                    {!errors.email &&
                      signupData.email &&
                      validateEmail(signupData.email) === null && <SuccessIndicator />}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">비밀번호</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력하세요"
                        className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        value={signupData.password}
                        onChange={(e) => handleSignupChange('password', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <ErrorMessage error={errors.password} />}
                    {!errors.password &&
                      signupData.password &&
                      validatePassword(signupData.password) === null && <SuccessIndicator />}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">비밀번호 확인</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 다시 입력하세요"
                        className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        value={signupData.confirmPassword}
                        onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <ErrorMessage error={errors.confirmPassword} />}
                    {!errors.confirmPassword &&
                      signupData.confirmPassword &&
                      signupData.password === signupData.confirmPassword &&
                      signupData.confirmPassword.length > 0 && <SuccessIndicator />}
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <Checkbox
                      id="terms"
                      className="mt-1"
                      required
                      checked={signupData.agreeToTerms}
                      onCheckedChange={(checked) => handleSignupChange('agreeToTerms', checked)}
                    />
                    <label htmlFor="terms" className="text-muted-foreground leading-relaxed">
                      <Link href={'/terms'} className="text-primary hover:underline">
                        이용약관
                      </Link>
                      과{' '}
                      <Link href={'/privacy-policy'} className="text-primary hover:underline">
                        개인정보처리방침
                      </Link>
                      에 동의합니다
                    </label>
                  </div>
                  {errors.agreeToTerms && <ErrorMessage error={errors.agreeToTerms} />}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? '가입 중...' : '회원가입'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
