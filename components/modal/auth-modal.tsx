'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AuthModal() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">로그인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isLoginView ? (
          <Card className="border-0">
            <CardHeader>
              <CardTitle>로그인</CardTitle>
              <CardDescription>서비스를 이용하시려면 로그인해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <Button variant="link" size="sm" onClick={toggleView} className="p-0">
                계정이 없으신가요? 회원가입
              </Button>
              <Button type="submit">로그인</Button>
            </DialogFooter>
          </Card>
        ) : (
          <Card className="border-0">
            <CardHeader>
              <CardTitle>회원가입</CardTitle>
              <CardDescription>기본 정보를 입력하여 계정을 생성하세요.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">이름</Label>
                <Input id="username" placeholder="홍길동" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <Button variant="link" size="sm" onClick={toggleView} className="p-0">
                이미 계정이 있으신가요? 로그인
              </Button>
              <Button type="submit">회원가입</Button>
            </DialogFooter>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
