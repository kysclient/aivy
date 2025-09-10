"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChefHat, Target, Sparkles, ArrowRight, ArrowLeft, Heart, Clock, Users, Zap, TrendingUp, Calendar, Apple } from "lucide-react"
import { mockMealPlans } from "@/lib/mock-meal-plan"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

interface UserInfo {
    name: string
    age: string
    gender: string
    height: string
    weight: string
    activityLevel: string
    goal: string
    allergies: string[]
    excludeFoods: string[]
    targetCalories: string
    specialRequests: string
}

interface MealPlan {
    id: string
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    ingredients: string[]
    cookingTime: number
    difficulty: "Easy" | "Medium" | "Hard"
}



const steps = [
    { title: "기본 정보", icon: Users },
    { title: "목표 설정", icon: Target },
    { title: "식단 선호도", icon: Heart },
    { title: "식단 생성", icon: ChefHat },
]

export default function MealPlanMain() {
    const [currentStep, setCurrentStep] = useState(0)
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        activityLevel: "",
        goal: "",
        allergies: [],
        excludeFoods: [],
        targetCalories: "",
        specialRequests: "",
    })
    const [mealPlans, setMealPlans] = useState<any[]>([])
    const [isGenerating, setIsGenerating] = useState(false)

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const generateMealPlan = async () => {
        setIsGenerating(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('userInfo : ', userInfo)
        setMealPlans(mockMealPlans)
        setIsGenerating(false)
    }

    const addAllergy = (allergy: string) => {
        if (allergy && !userInfo.allergies.includes(allergy)) {
            setUserInfo((prev) => ({
                ...prev,
                allergies: [...prev.allergies, allergy],
            }))
        }
    }

    const removeAllergy = (allergy: string) => {
        setUserInfo((prev) => ({
            ...prev,
            allergies: prev.allergies.filter((a) => a !== allergy),
        }))
    }

    const addExcludeFood = (food: string) => {
        if (food && !userInfo.excludeFoods.includes(food)) {
            setUserInfo((prev) => ({
                ...prev,
                excludeFoods: [...prev.excludeFoods, food],
            }))
        }
    }

    const removeExcludeFood = (food: string) => {
        setUserInfo((prev) => ({
            ...prev,
            excludeFoods: prev.excludeFoods.filter((f) => f !== food),
        }))
    }

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">AI 식단 생성</h1>
                    <p className="text-muted-foreground">맞춤형 식단을 생성해보세요</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-muted/30 py-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2 px-4">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    <step.icon className="w-5 h-5" />
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`w-16 h-1 mx-2 transition-all duration-300 ${index < currentStep ? "bg-primary" : "bg-muted"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center">{steps[currentStep].title}</p>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {/* Step 0: Basic Info */}
                    {currentStep === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="w-6 h-6 text-primary" />
                                        기본 정보를 입력해주세요
                                    </CardTitle>
                                    <CardDescription>맞춤형 식단을 위해 기본 정보가 필요해요</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">이름</Label>
                                            <Input
                                                id="name"
                                                value={userInfo.name}
                                                onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
                                                placeholder="홍길동"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="age">나이</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                value={userInfo.age}
                                                onChange={(e) => setUserInfo((prev) => ({ ...prev, age: e.target.value }))}
                                                placeholder="25"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>성별</Label>
                                        <Select
                                            value={userInfo.gender}
                                            onValueChange={(value) => setUserInfo((prev) => ({ ...prev, gender: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="성별을 선택해주세요" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">남성</SelectItem>
                                                <SelectItem value="female">여성</SelectItem>
                                                <SelectItem value="other">기타</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="height">키 (cm)</Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                value={userInfo.height}
                                                onChange={(e) => setUserInfo((prev) => ({ ...prev, height: e.target.value }))}
                                                placeholder="170"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="weight">몸무게 (kg)</Label>
                                            <Input
                                                id="weight"
                                                type="number"
                                                value={userInfo.weight}
                                                onChange={(e) => setUserInfo((prev) => ({ ...prev, weight: e.target.value }))}
                                                placeholder="65"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>활동 수준</Label>
                                        <Select
                                            value={userInfo.activityLevel}
                                            onValueChange={(value) => setUserInfo((prev) => ({ ...prev, activityLevel: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="활동 수준을 선택해주세요" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sedentary">좌식 생활 (운동 거의 안함)</SelectItem>
                                                <SelectItem value="light">가벼운 활동 (주 1-3회 운동)</SelectItem>
                                                <SelectItem value="moderate">보통 활동 (주 3-5회 운동)</SelectItem>
                                                <SelectItem value="active">활발한 활동 (주 6-7회 운동)</SelectItem>
                                                <SelectItem value="very-active">매우 활발 (하루 2회 운동)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 1: Goal Setting */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-6 h-6 text-primary" />
                                        목표를 설정해주세요
                                    </CardTitle>
                                    <CardDescription>어떤 목표를 가지고 계신가요?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>목표</Label>
                                        <Select
                                            value={userInfo.goal}
                                            onValueChange={(value) => setUserInfo((prev) => ({ ...prev, goal: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="목표를 선택해주세요" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="weight-loss">체중 감량</SelectItem>
                                                <SelectItem value="weight-gain">체중 증가</SelectItem>
                                                <SelectItem value="muscle-gain">근육 증가</SelectItem>
                                                <SelectItem value="maintenance">현재 체중 유지</SelectItem>
                                                <SelectItem value="health">건강 관리</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="targetCalories">목표 일일 칼로리 (선택사항)</Label>
                                        <Input
                                            id="targetCalories"
                                            type="number"
                                            value={userInfo.targetCalories}
                                            onChange={(e) => setUserInfo((prev) => ({ ...prev, targetCalories: e.target.value }))}
                                            placeholder="2000"
                                        />
                                        <p className="text-sm text-muted-foreground">비워두시면 자동으로 계산해드려요</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="specialRequests">특별한 요청사항</Label>
                                        <Textarea
                                            id="specialRequests"
                                            value={userInfo.specialRequests}
                                            onChange={(e) => setUserInfo((prev) => ({ ...prev, specialRequests: e.target.value }))}
                                            placeholder="저염식으로 준비해주세요, 매운 음식 선호 등..."
                                            rows={3}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 2: Food Preferences */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Heart className="w-6 h-6 text-primary" />
                                        식단 선호도를 알려주세요
                                    </CardTitle>
                                    <CardDescription>알레르기나 제외하고 싶은 음식이 있나요?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label>알레르기</Label>
                                            <div className="flex gap-2 mt-2">
                                                <Input
                                                    placeholder="알레르기 추가"
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter") {
                                                            addAllergy(e.currentTarget.value)
                                                            e.currentTarget.value = ""
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                                        addAllergy(input.value)
                                                        input.value = ""
                                                    }}
                                                >
                                                    추가
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {userInfo.allergies.map((allergy, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="destructive"
                                                        className="cursor-pointer"
                                                        onClick={() => removeAllergy(allergy)}
                                                    >
                                                        {allergy} ×
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <Label>제외할 음식</Label>
                                            <div className="flex gap-2 mt-2">
                                                <Input
                                                    placeholder="제외할 음식 추가"
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter") {
                                                            addExcludeFood(e.currentTarget.value)
                                                            e.currentTarget.value = ""
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                                        addExcludeFood(input.value)
                                                        input.value = ""
                                                    }}
                                                >
                                                    추가
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {userInfo.excludeFoods.map((food, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="cursor-pointer"
                                                        onClick={() => removeExcludeFood(food)}
                                                    >
                                                        {food} ×
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 3: Meal Plan Generation */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {mealPlans.length === 0 ? (
                                <Card className="text-center py-12 bg-background">
                                    <CardContent>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Sparkles className="w-8 h-8 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2">AI 식단 생성 준비 완료!</h3>
                                                <p className="text-muted-foreground mb-6">
                                                    입력하신 정보를 바탕으로 맞춤형 식단을 생성해드릴게요
                                                </p>
                                            </div>
                                            <Button onClick={generateMealPlan} disabled={isGenerating} size="lg" className="gap-2">
                                                {isGenerating ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                        식단 생성 중...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap className="w-5 h-5" />
                                                        AI 식단 생성하기
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="space-y-8">
                                    {/* Header Section */}
                                    <div className="text-center space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="relative inline-block"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-lg blur opacity-75"></div>
                                            <h2 className="relative text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                                맞춤형 일주일 식단 완성
                                            </h2>
                                        </motion.div>
                                        <p className="text-lg text-muted-foreground">
                                            {userInfo.name}님을 위한 건강한 7일 식단이 준비되었습니다
                                        </p>

                                        {/* Weekly Summary */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6 max-w-4xl mx-auto"
                                        >
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="text-center space-y-2">
                                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                                                        <TrendingUp className="w-6 h-6 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-emerald-600">
                                                            {Math.round(mockMealPlans.reduce((acc, day) => acc + day.totalCalories, 0) / 7)}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">평균 칼로리/일</div>
                                                    </div>
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                                                        <Zap className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-blue-600">
                                                            {Math.round(mealPlans.reduce((acc, day) => acc + day.dailyNutrients.protein, 0) / 7)}g
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">평균 단백질</div>
                                                    </div>
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                                                        <Apple className="w-6 h-6 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-orange-600">
                                                            {Math.round(mealPlans.reduce((acc, day) => acc + day.dailyNutrients.carbs, 0) / 7)}g
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">평균 탄수화물</div>
                                                    </div>
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                                                        <Heart className="w-6 h-6 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-purple-600">7일</div>
                                                        <div className="text-sm text-muted-foreground">맞춤 식단</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Carousel Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="relative"
                                    >
                                        <Carousel className="w-full max-w-7xl mx-auto">
                                            <CarouselContent className="-ml-2 md:-ml-4">
                                                {mealPlans.map((dayPlan, index) => {
                                                    const dayNames = ['목요일', '금요일', '토요일', '일요일', '월요일', '화요일'];
                                                    const dayName = dayNames[index];

                                                    return (
                                                        <CarouselItem key={index} className="pl-2 basis-full">
                                                            <Card className="h-full bg-gradient-to-br from-background via-background to-muted/30 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                                                                <CardHeader className="pb-4">
                                                                    <div className="flex items-center justify-between">
                                                                        <div>
                                                                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                                                                {dayName}
                                                                            </CardTitle>
                                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                                                <Calendar className="w-4 h-4" />
                                                                                {dayPlan.date}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <div className="text-2xl font-bold text-primary">
                                                                                {dayPlan.totalCalories.toLocaleString()}
                                                                            </div>
                                                                            <div className="text-xs text-muted-foreground">kcal</div>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>

                                                                <CardContent className="space-y-4">
                                                                    {/* Daily Nutrients */}
                                                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                                                        <div className="bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-lg text-center border border-emerald-200 dark:border-emerald-800">
                                                                            <div className="text-lg font-bold text-emerald-600">{dayPlan.dailyNutrients.protein}g</div>
                                                                            <div className="text-xs text-emerald-600/80">단백질</div>
                                                                        </div>
                                                                        <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-lg text-center border border-blue-200 dark:border-blue-800">
                                                                            <div className="text-lg font-bold text-blue-600">{dayPlan.dailyNutrients.carbs}g</div>
                                                                            <div className="text-xs text-blue-600/80">탄수화물</div>
                                                                        </div>
                                                                        <div className="bg-orange-50 dark:bg-orange-950/50 p-3 rounded-lg text-center border border-orange-200 dark:border-orange-800">
                                                                            <div className="text-lg font-bold text-orange-600">{dayPlan.dailyNutrients.fat}g</div>
                                                                            <div className="text-xs text-orange-600/80">지방</div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Meals */}
                                                                    <div className="space-y-3">
                                                                        {[
                                                                            { key: 'breakfast', name: '아침', icon: '🌅', color: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800' },
                                                                            { key: 'lunch', name: '점심', icon: '☀️', color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800' },
                                                                            { key: 'dinner', name: '저녁', icon: '🌙', color: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800' },
                                                                            { key: 'snack', name: '간식', icon: '🍎', color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' }
                                                                        ].map(meal => (
                                                                            <div key={meal.key} className={`p-3 rounded-lg border ${meal.color}`}>
                                                                                <div className="flex items-center justify-between mb-2">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="text-lg">{meal.icon}</span>
                                                                                        <span className="font-semibold text-sm">{meal.name}</span>
                                                                                    </div>
                                                                                    <Badge variant="secondary" className="text-xs">
                                                                                        {dayPlan[meal.key as keyof typeof dayPlan]?.calories}kcal
                                                                                    </Badge>
                                                                                </div>
                                                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                                                    {dayPlan[meal.key as keyof typeof dayPlan]?.menu}
                                                                                </p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </CarouselItem>
                                                    );
                                                })}
                                            </CarouselContent>
                                            <CarouselPrevious className="hidden md:flex -left-12 bg-primary/10 border-primary/20 hover:bg-primary/20  z-20" />
                                            <CarouselNext className="hidden md:flex -right-12 bg-primary/10 border-primary/20 hover:bg-primary/20 z-20" />
                                        </Carousel>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <Card className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border-primary/20 backdrop-blur-sm">
                                            <CardContent className="p-8 text-center">
                                                <div className="flex items-center justify-center gap-3 mb-4">
                                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                                        <Sparkles className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                                        식단이 완성되었습니다
                                                    </h3>
                                                </div>
                                                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                                                    {userInfo.name}님의 목표인 <span className="font-semibold text-primary">{userInfo.goal === 'weight-loss' ? '체중 감량' : userInfo.goal === 'muscle-gain' ? '근육 증가' : '건강 관리'}</span>를 위한 7일 맞춤 식단입니다.
                                                    균형 잡힌 영양소로 건강한 식습관을 만들어보세요.
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                    <Button onClick={() => setCurrentStep(0)} variant="outline" size="lg" className="gap-2">
                                                        <ChefHat className="w-5 h-5" />
                                                        새로운 식단 만들기
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0} className="gap-2 bg-transparent">
                        <ArrowLeft className="w-4 h-4" />
                        이전
                    </Button>

                    {currentStep < 3 && (
                        <Button
                            onClick={handleNext}
                            disabled={
                                (currentStep === 0 &&
                                    (!userInfo.name ||
                                        !userInfo.age ||
                                        !userInfo.gender ||
                                        !userInfo.height ||
                                        !userInfo.weight ||
                                        !userInfo.activityLevel)) ||
                                (currentStep === 1 && !userInfo.goal)
                            }
                            className="gap-2"
                        >
                            다음
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
