"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { User, Bell, Shield, Palette, Trash2, Download, Mail, Smartphone } from "lucide-react"

export default function SettingsMain() {
    const [notifications, setNotifications] = useState({
        mealReminders: true,
        productUpdates: false,
        healthTips: true,
        marketing: false,
    })

    const [profile, setProfile] = useState({
        name: "홍길동",
        email: "hong@example.com",
        phone: "010-1234-5678",
        language: "ko",
    })

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">설정</h1>
                    <p className="text-muted-foreground">계정 및 앱 설정을 관리하세요</p>
                </div>

                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            프로필 설정
                        </CardTitle>
                        <CardDescription>개인 정보를 관리하세요</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">이름</Label>
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">이메일</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">전화번호</Label>
                                <Input
                                    id="phone"
                                    value={profile.phone}
                                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>언어</Label>
                                <Select
                                    value={profile.language}
                                    onValueChange={(value) => setProfile((prev) => ({ ...prev, language: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ko">한국어</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="ja">日本語</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button>프로필 저장</Button>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            알림 설정
                        </CardTitle>
                        <CardDescription>받고 싶은 알림을 선택하세요</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>식사 알림</Label>
                                <p className="text-sm text-muted-foreground">식사 시간을 알려드려요</p>
                            </div>
                            <Switch
                                checked={notifications.mealReminders}
                                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, mealReminders: checked }))}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>상품 업데이트</Label>
                                <p className="text-sm text-muted-foreground">새로운 상품 소식을 받아보세요</p>
                            </div>
                            <Switch
                                checked={notifications.productUpdates}
                                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, productUpdates: checked }))}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>건강 팁</Label>
                                <p className="text-sm text-muted-foreground">유용한 건강 정보를 받아보세요</p>
                            </div>
                            <Switch
                                checked={notifications.healthTips}
                                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, healthTips: checked }))}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>마케팅 알림</Label>
                                <p className="text-sm text-muted-foreground">프로모션 및 이벤트 소식</p>
                            </div>
                            <Switch
                                checked={notifications.marketing}
                                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="w-5 h-5" />
                            화면 설정
                        </CardTitle>
                        <CardDescription>앱의 모양을 설정하세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>테마</Label>
                                <p className="text-sm text-muted-foreground">라이트/다크 모드를 선택하세요</p>
                            </div>
                            <ThemeToggle />
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy & Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            개인정보 및 보안
                        </CardTitle>
                        <CardDescription>계정 보안을 관리하세요</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                            <Mail className="w-4 h-4" />
                            비밀번호 변경
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                            <Smartphone className="w-4 h-4" />
                            2단계 인증 설정
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                            <Download className="w-4 h-4" />내 데이터 다운로드
                        </Button>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <Trash2 className="w-5 h-5" />
                            위험 구역
                        </CardTitle>
                        <CardDescription>신중하게 진행하세요</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                        >
                            <Trash2 className="w-4 h-4" />
                            모든 데이터 삭제
                        </Button>
                        <Button variant="destructive" className="w-full justify-start gap-2">
                            <Trash2 className="w-4 h-4" />
                            계정 삭제
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
