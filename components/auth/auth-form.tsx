'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Shield, Zap, TrendingUp } from 'lucide-react';
// import { AuthResponse, CreateUserDto, LoginDto } from '@/repositoires/UserRepository'
// import { userRepository } from '@/repositoires/RepositoryFactory'
import { Checkbox } from '@/components/ui/checkbox';
// import { useAuth } from '@/providers/auth-provider'
import Link from 'next/link';
// import { Background } from '../background'
import Image from 'next/image';
import { useAuth } from '@/providers/auth-provider';
import { CreateUserDto, LoginDto } from '@/repositoires/UserRepository';

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

export function AuthForm() {
  const params = useParams();
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const { login, register, isLoading } = useAuth()
  const { login, register, isLoading } = useAuth();

  // Form data state
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

  // Clear specific error
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Real-time validation
  const handleLoginChange = (field: keyof LoginFormData, value: string | boolean) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));

    if (typeof value === 'string') {
      clearError(field);

      // Real-time validation
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

      // Real-time validation
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

  // Validate login form
  const validateLoginForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(loginData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(loginData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate signup form
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

  // Handle login submission
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
      await login(credentials, loginData.rememberMe);
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

  // Handle signup submission
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
      localStorage.setItem('rememberMe', loginData.rememberMe.toString());
      await register(userData);
    } catch (error: any) {
      console.error('Signup error:', error);

      const errorMessage = error.message || '회원가입에 실패했습니다.';

      if (
        errorMessage.includes('Email already exists') ||
        errorMessage.includes('already registered')
      ) {
        setErrors({ email: '이미 사용 중인 이메일입니다.' });
        toast.error('이미 사용 중인 이메일입니다.');
      } else if (errorMessage.includes('Username already exists')) {
        setErrors({ name: '이미 사용 중인 이름입니다.' });
        toast.error('이미 사용 중인 이름입니다.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!loginData.email) {
      toast.error('비밀번호를 재설정할 이메일을 입력해주세요.');
      return;
    }

    const emailError = validateEmail(loginData.email);
    if (emailError) {
      toast.error('올바른 이메일을 입력해주세요.');
      return;
    }

    toast.success('비밀번호 재설정 이메일을 발송했습니다.');
  };

  const socialButtonOnClick = () => {
    toast.info('소셜로그인은 서비스 준비중입니다.');
  };

  // Error display component
  const ErrorMessage = ({ error }: { error: string }) => (
    <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
      <AlertCircle className="w-4 h-4" />
      <span>{error}</span>
    </div>
  );

  // Success indicator component
  const SuccessIndicator = () => (
    <div className="flex items-center gap-1 mt-1 text-sm text-green-500">
      <CheckCircle2 className="w-4 h-4" />
      <span>올바른 형식입니다</span>
    </div>
  );

  return (
    <div className="auth-split-container">
      <div className="auth-visual-side">
        <div className="auth-visual-bg">
          <Image
            src="/default-placeholder.png"
            alt="AI Health Technology"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <div className="auth-visual-content">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 text-balance">
              AI 건강 관리의
              <span className="block text-green-200">새로운 시작</span>
            </h1>
            <p className="text-xl text-white/80 text-pretty">
              개인 맞춤형 AI 건강 솔루션으로 더 나은 삶을 시작하세요
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-md">
            <div className="stats-card">
              <div className="stats-number">98%</div>
              <div className="stats-label">사용자 만족도</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">24/7</div>
              <div className="stats-label">AI 건강 모니터링</div>
            </div>
          </div>

          <div className="space-y-4 text-left">
            <div className="feature-highlight">
              <Shield className="feature-icon" />
              <span>개인정보 보호 최우선</span>
            </div>
            <div className="feature-highlight">
              <Zap className="feature-icon" />
              <span>실시간 건강 분석</span>
            </div>
            <div className="feature-highlight">
              <TrendingUp className="feature-icon" />
              <span>맞춤형 건강 개선 계획</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href={'/'}>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                aivy
              </h1>
            </Link>
            <p className="text-muted-foreground mt-2 text-lg">간편하게 시작하세요</p>
          </div>

          {/* Auth Forms */}
          <Card className="auth-card-modern bg-background">
            <Tabs defaultValue="login" className="w-full p-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="">
                  로그인
                </TabsTrigger>
                <TabsTrigger value="signup" className="">
                  회원가입
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <CardHeader className="space-y-1 pb-4 px-0">
                  <CardTitle className="text-2xl text-center">로그인</CardTitle>
                  <CardDescription className="text-center text-muted-foreground">
                    계정에 로그인하여 계속하세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium">
                        이메일
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="이메일을 입력하세요"
                        className={`auth-input-modern ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
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
                      <Label htmlFor="login-password" className="text-sm font-medium">
                        비밀번호
                      </Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="비밀번호를 입력하세요"
                          className={`auth-input-modern pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                          value={loginData.password}
                          onChange={(e) => handleLoginChange('password', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && <ErrorMessage error={errors.password} />}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={loginData.rememberMe}
                          onCheckedChange={(checked) => handleLoginChange('rememberMe', checked)}
                        />
                        <span className="text-muted-foreground">로그인 상태 유지</span>
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full auth-button-modern"
                      disabled={isLoading}
                    >
                      {isLoading ? '로그인 중...' : '로그인'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup">
                <CardHeader className="space-y-1 pb-4 px-0">
                  <CardTitle className="text-2xl text-center">회원가입</CardTitle>
                  <CardDescription className="text-center text-muted-foreground">
                    새 계정을 만들어 시작하세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium">
                        이름
                      </Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="이름을 입력하세요"
                        className={`auth-input-modern ${errors.name ? 'border-red-500 focus:ring-red-500/20' : ''}`}
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
                      <Label htmlFor="signup-email" className="text-sm font-medium">
                        이메일
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="이메일을 입력하세요"
                        className={`auth-input-modern ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
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
                      <Label htmlFor="signup-password" className="text-sm font-medium">
                        비밀번호
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="비밀번호를 입력하세요"
                          className={`auth-input-modern pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                          value={signupData.password}
                          onChange={(e) => handleSignupChange('password', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && <ErrorMessage error={errors.password} />}
                      {!errors.password &&
                        signupData.password &&
                        validatePassword(signupData.password) === null && <SuccessIndicator />}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-medium">
                        비밀번호 확인
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="비밀번호를 다시 입력하세요"
                          className={`auth-input-modern pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                          value={signupData.confirmPassword}
                          onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                        className="mt-1"
                        required
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) => handleSignupChange('agreeToTerms', checked)}
                      />
                      <span className="text-muted-foreground leading-relaxed">
                        <Link href={'/terms'} className="text-green-600 hover:underline">
                          이용약관
                        </Link>
                        과{' '}
                        <Link href={'/privacy-policy'} className="text-green-600 hover:underline">
                          개인정보처리방침
                        </Link>
                        에 동의합니다
                      </span>
                    </div>
                    {errors.agreeToTerms && <ErrorMessage error={errors.agreeToTerms} />}
                    <Button
                      type="submit"
                      className="w-full auth-button-modern"
                      disabled={isLoading}
                    >
                      {isLoading ? '가입 중...' : '회원가입'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
