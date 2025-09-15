'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000)
  }

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
          <Tabs defaultValue="login" className="w-full px-4">
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
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="이메일을 입력하세요" className="h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input id="password" type="password" placeholder="비밀번호를 입력하세요" className="h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20" required />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-muted-foreground">로그인 상태 유지</span>
                    </label>
                    <button type="button" className="text-primary hover:underline">
                      비밀번호 찾기
                    </button>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium" disabled={isLoading}>
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
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">이름</Label>
                    <Input id="signup-name" type="text" placeholder="이름을 입력하세요" className="h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">이메일</Label>
                    <Input id="signup-email" type="email" placeholder="이메일을 입력하세요" className="h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">비밀번호</Label>
                    <Input id="signup-password" type="password" placeholder="비밀번호를 입력하세요" className="h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">비밀번호 확인</Label>
                    <Input id="confirm-password" type="password" placeholder="비밀번호를 다시 입력하세요" className="h-12 rounded-lg border-border focus:ring-2 focus:ring-primary/20" required />
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" className="mt-1 rounded border-border" required />
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
                  <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium" disabled={isLoading}>
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
              onClick={() => {
                // Kakao login logic would go here
                console.log('Kakao login clicked')
              }}
            >
              <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.03 3 3 6.14 3 10.1c0 2.52 1.65 4.74 4.1 6.1l-.95 3.48c-.09.33.25.59.55.42l4.36-2.42c.31.02.62.02.94.02 4.97 0 9-3.14 9-7.1S16.97 3 12 3z" />
              </svg>
              카카오로 계속하기
            </Button>
            <Button variant="outline" className="w-full h-12 border-border hover:bg-muted/50 rounded-lg bg-transparent">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google로 계속하기
            </Button>
            <Button variant="outline" className="w-full h-12 border-border hover:bg-muted/50 rounded-lg bg-transparent">
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
