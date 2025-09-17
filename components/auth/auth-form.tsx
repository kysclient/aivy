'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { AuthResponse, CreateUserDto, LoginDto } from '@/repositoires/UserRepository'
import { userRepository } from '@/repositoires/RepositoryFactory'
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from '@/providers/auth-provider'

interface FormErrors {
    [key: string]: string
}

interface LoginFormData {
    email: string
    password: string
    rememberMe: boolean
}

interface SignupFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
    agreeToTerms: boolean
}

// Validation utilities
const validateEmail = (email: string): string | null => {
    if (!email) return '이메일을 입력해주세요.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.'
    return null
}

const validatePassword = (password: string): string | null => {
    if (!password) return '비밀번호를 입력해주세요.'
    if (password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.'
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.'
    }
    return null
}

const validateName = (name: string): string | null => {
    if (!name) return '이름을 입력해주세요.'
    if (name.length < 2) return '이름은 최소 2자 이상이어야 합니다.'
    if (name.length > 50) return '이름은 50자를 초과할 수 없습니다.'
    return null
}

export function AuthForm() {
    const params = useParams()
    const router = useRouter()
    const [errors, setErrors] = useState<FormErrors>({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { login, register, isLoading } = useAuth()
    // Form data state
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false
    })

    const [signupData, setSignupData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    })



    // Clear specific error
    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    // Real-time validation
    const handleLoginChange = (field: keyof LoginFormData, value: string | boolean) => {
        setLoginData(prev => ({ ...prev, [field]: value }))

        if (typeof value === 'string') {
            clearError(field)

            // Real-time validation
            if (field === 'email' && value) {
                const emailError = validateEmail(value)
                if (emailError) {
                    setErrors(prev => ({ ...prev, [field]: emailError }))
                }
            }

            if (field === 'password' && value) {
                const passwordError = validatePassword(value)
                if (passwordError) {
                    setErrors(prev => ({ ...prev, [field]: passwordError }))
                }
            }
        }
    }

    const handleSignupChange = (field: keyof SignupFormData, value: string | boolean) => {
        setSignupData(prev => ({ ...prev, [field]: value }))

        if (typeof value === 'string') {
            clearError(field)

            // Real-time validation
            if (field === 'name' && value) {
                const nameError = validateName(value)
                if (nameError) {
                    setErrors(prev => ({ ...prev, [field]: nameError }))
                }
            }

            if (field === 'email' && value) {
                const emailError = validateEmail(value)
                if (emailError) {
                    setErrors(prev => ({ ...prev, [field]: emailError }))
                }
            }

            if (field === 'password' && value) {
                const passwordError = validatePassword(value)
                if (passwordError) {
                    setErrors(prev => ({ ...prev, [field]: passwordError }))
                }
            }

            if (field === 'confirmPassword' && value) {
                if (value !== signupData.password) {
                    setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }))
                }
            }
        }
    }

    // Validate login form
    const validateLoginForm = (): boolean => {
        const newErrors: FormErrors = {}

        const emailError = validateEmail(loginData.email)
        if (emailError) newErrors.email = emailError

        const passwordError = validatePassword(loginData.password)
        if (passwordError) newErrors.password = passwordError

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Validate signup form
    const validateSignupForm = (): boolean => {
        const newErrors: FormErrors = {}

        const nameError = validateName(signupData.name)
        if (nameError) newErrors.name = nameError

        const emailError = validateEmail(signupData.email)
        if (emailError) newErrors.email = emailError

        const passwordError = validatePassword(signupData.password)
        if (passwordError) newErrors.password = passwordError

        if (signupData.password !== signupData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
        }

        if (!signupData.agreeToTerms) {
            newErrors.agreeToTerms = '이용약관에 동의해주세요.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle login submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateLoginForm()) {
            toast.error('입력 정보를 확인해주세요.')
            return
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
    }

    // Handle signup submission
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateSignupForm()) {
            toast.error('입력 정보를 확인해주세요.')
            return
        }


        try {
            const userData: CreateUserDto = {
                name: signupData.name,
                email: signupData.email,
                password: signupData.password
            }
            localStorage.setItem('rememberMe', loginData.rememberMe.toString());
            await register(userData);

        } catch (error: any) {
            console.error('Signup error:', error)

            const errorMessage = error.message || '회원가입에 실패했습니다.'

            if (errorMessage.includes('Email already exists') || errorMessage.includes('already registered')) {
                setErrors({ email: '이미 사용 중인 이메일입니다.' })
                toast.error('이미 사용 중인 이메일입니다.')
            } else if (errorMessage.includes('Username already exists')) {
                setErrors({ name: '이미 사용 중인 이름입니다.' })
                toast.error('이미 사용 중인 이름입니다.')
            } else {
                toast.error(errorMessage)
            }
        } finally {
        }
    }

    // Handle forgot password
    const handleForgotPassword = async () => {
        if (!loginData.email) {
            toast.error('비밀번호를 재설정할 이메일을 입력해주세요.')
            return
        }

        const emailError = validateEmail(loginData.email)
        if (emailError) {
            toast.error('올바른 이메일을 입력해주세요.')
            return
        }

        try {
            await userRepository.forgotPassword(loginData.email)
            toast.success('비밀번호 재설정 이메일을 발송했습니다.')
        } catch (error: any) {
            toast.error(error.message || '비밀번호 재설정 이메일 발송에 실패했습니다.')
        }
    }

    const socialButtonOnClick = () => {
        toast.info('소셜로그인은 서비스 준비중입니다.')
    }

    // Error display component
    const ErrorMessage = ({ error }: { error: string }) => (
        <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
        </div>
    )

    // Success indicator component
    const SuccessIndicator = () => (
        <div className="flex items-center gap-1 mt-1 text-sm text-green-500">
            <CheckCircle2 className="w-4 h-4" />
            <span>올바른 형식입니다</span>
        </div>
    )

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">aivy</h1>
                    <p className="text-muted-foreground mt-2">간편하게 시작하세요</p>
                </div>

                {/* Auth Forms */}
                <Card className="bg-background">
                    <Tabs defaultValue="login" className="w-full px-2">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login" className="text-sm">
                                로그인
                            </TabsTrigger>
                            <TabsTrigger value="signup" className="text-sm">
                                회원가입
                            </TabsTrigger>
                        </TabsList>

                        {/* Login Form */}
                        <TabsContent value="login">
                            <CardHeader className="space-y-1 pb-4">
                                <CardTitle className="text-xl text-center">로그인</CardTitle>
                                <CardDescription className="text-center text-muted-foreground">계정에 로그인하여 계속하세요</CardDescription>
                            </CardHeader>
                            <CardContent className='px-2'>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-email">이메일</Label>
                                        <Input
                                            id="login-email"
                                            type="email"
                                            placeholder="이메일을 입력하세요"
                                            className={`h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                            value={loginData.email}
                                            onChange={(e) => handleLoginChange('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <ErrorMessage error={errors.email} />}
                                        {!errors.email && loginData.email && validateEmail(loginData.email) === null && <SuccessIndicator />}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="login-password">비밀번호</Label>
                                        <div className="relative">
                                            <Input
                                                id="login-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="비밀번호를 입력하세요"
                                                className={`h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500/20' : ''}`}
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
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center space-x-2 cursor-pointer">

                                            <Checkbox checked={loginData.rememberMe}
                                                onCheckedChange={(checked) => handleLoginChange('rememberMe', checked)}
                                            />

                                            <span className="text-muted-foreground">로그인 상태 유지</span>
                                        </label>
                                        <button
                                            type="button"
                                            className="text-primary hover:underline"
                                            onClick={handleForgotPassword}
                                        >
                                            비밀번호 찾기
                                        </button>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? '로그인 중...' : '로그인'}
                                    </Button>
                                </form>
                            </CardContent>
                        </TabsContent>

                        {/* Signup Form */}
                        <TabsContent value="signup">
                            <CardHeader className="space-y-1 pb-4">
                                <CardTitle className="text-xl text-center">회원가입</CardTitle>
                                <CardDescription className="text-center text-muted-foreground">새 계정을 만들어 시작하세요</CardDescription>
                            </CardHeader>
                            <CardContent className='px-2'>
                                <form onSubmit={handleSignup} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-name">이름</Label>
                                        <Input
                                            id="signup-name"
                                            type="text"
                                            placeholder="이름을 입력하세요"
                                            className={`h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                            value={signupData.name}
                                            onChange={(e) => handleSignupChange('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <ErrorMessage error={errors.name} />}
                                        {!errors.name && signupData.name && validateName(signupData.name) === null && <SuccessIndicator />}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">이메일</Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            placeholder="이메일을 입력하세요"
                                            className={`h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                            value={signupData.email}
                                            onChange={(e) => handleSignupChange('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <ErrorMessage error={errors.email} />}
                                        {!errors.email && signupData.email && validateEmail(signupData.email) === null && <SuccessIndicator />}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">비밀번호</Label>
                                        <div className="relative">
                                            <Input
                                                id="signup-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="비밀번호를 입력하세요"
                                                className={`h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500/20' : ''}`}
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
                                        {!errors.password && signupData.password && validatePassword(signupData.password) === null && <SuccessIndicator />}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">비밀번호 확인</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirm-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="비밀번호를 다시 입력하세요"
                                                className={`h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500/20' : ''}`}
                                                value={signupData.confirmPassword}
                                                onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <ErrorMessage error={errors.confirmPassword} />}
                                        {!errors.confirmPassword && signupData.confirmPassword && signupData.password === signupData.confirmPassword && signupData.confirmPassword.length > 0 && <SuccessIndicator />}
                                    </div>
                                    <div className="flex items-start space-x-2 text-sm">

                                        <Checkbox
                                            className='mt-1'
                                            required checked={signupData.agreeToTerms}
                                            onCheckedChange={(checked) => handleSignupChange('agreeToTerms', checked)}
                                        />
                                        <span className="text-muted-foreground leading-relaxed">
                                            <button type="button" className="text-primary hover:underline">
                                                이용약관
                                            </button>
                                            과{' '}
                                            <button type="button" className="text-primary hover:underline">
                                                개인정보처리방침
                                            </button>
                                            에 동의합니다
                                        </span>
                                    </div>
                                    {errors.agreeToTerms && <ErrorMessage error={errors.agreeToTerms} />}
                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? '가입 중...' : '회원가입'}
                                    </Button>
                                </form>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </Card>

                {/* Social Login */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-background text-muted-foreground">또는</span>
                        </div>
                    </div>
                    <div className="mt-4 space-y-3">
                        <Button
                            variant="outline"
                            className="w-full h-12 border-border hover:bg-yellow-50 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition-colors"
                            onClick={socialButtonOnClick}
                            disabled={isLoading}
                        >
                            <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3C7.03 3 3 6.14 3 10.1c0 2.52 1.65 4.74 4.1 6.1l-.95 3.48c-.09.33.25.59.55.42l4.36-2.42c.31.02.62.02.94.02 4.97 0 9-3.14 9-7.1S16.97 3 12 3z" />
                            </svg>
                            카카오로 계속하기
                        </Button>
                        <Button
                            onClick={socialButtonOnClick}
                            variant="outline"
                            className="w-full h-12 border-border hover:bg-muted/50 rounded-lg bg-transparent"
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google로 계속하기
                        </Button>
                        <Button
                            onClick={socialButtonOnClick}
                            variant="outline"
                            className="w-full h-12 border-border hover:bg-muted/50 rounded-lg bg-transparent"
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub로 계속하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}