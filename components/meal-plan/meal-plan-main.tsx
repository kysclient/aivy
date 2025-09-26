"use client"

import { useEffect, useState } from "react"
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
import { AiIcon } from "../icons"
import { useSocket } from "@/providers/socket-provider"
import { mealPlanRepository } from "@/repositoires/RepositoryFactory"
import TokenManager from "@/lib/token-manager"
import { MealPlan, MealPlanStatus, MealPlanStatusUpdate } from "@/repositoires/MealPlanRepository"
import { toast } from "sonner"
import { getMealPlanDates } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Progress } from "../ui/progress"
import { useGeneratingMealPlans, useMealPlan } from "@/hooks/use-meal-plan"

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
    targetCalories: number | null
    specialRequests: string
    title: string
}





const steps = [
    { title: "기본 정보", icon: Users },
    { title: "목표 설정", icon: Target },
    { title: "식단 선호도", icon: Heart },
    { title: "식단 생성", icon: AiIcon },
]

export default function MealPlanMain() {
    const {
        generatingMealPlans,
        isLoading,
        error,
        refresh,
        count
    } = useGeneratingMealPlans();

    const { connect, disconnect, isConnected, socket } = useSocket();
    const token = TokenManager.getAccessToken();
    const [progress, setProgress] = useState(0);
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [generateMealPlanId, setGenerateMealPlanId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        title: '',
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        activityLevel: "",
        goal: "",
        allergies: [],
        excludeFoods: [],
        targetCalories: null,
        specialRequests: "",
    })
    const [mealPlans, setMealPlans] = useState<MealPlan | null>(null)
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
        if (!token) {
            toast("로그인 후 이용해주세요.", {
                action: {
                    label: "로그인",
                    onClick: () => router.push('/auth'),
                },
            })
            return
        }
        setIsGenerating(true)
        const { startDate, endDate } = getMealPlanDates();
        // Simulate API call
        const bodyData = {
            ...userInfo,
            startDate,
            endDate,
            age: parseInt(userInfo.age),
            gender: userInfo.gender,
            height: parseInt(userInfo.height),
            weight: parseInt(userInfo.weight),
        }
        try {

            const response = await mealPlanRepository.generateMealPlan(bodyData)
            setMealPlans(response)
        } catch {
            toast('식단 생성에 실패했습니다. 잠시 후 다시 시도해주세요.')
            setIsGenerating(false)
        }
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

    useEffect(() => {
        if (!socket || !isConnected) return;

        const handleStatusUpdate = (data: MealPlanStatusUpdate) => {

            if (data.progress !== undefined) {
            }

            if (data.message) {
                toast.info(data.message)
            }

            switch (data.status) {
                case MealPlanStatus.GENERATING:
                    setProgress(data.progress || 0);
                    setIsGenerating(true);
                    break;

                case MealPlanStatus.COMPLETED:
                    setProgress(data.progress || 0);
                    setIsGenerating(false);
                    const { startDate, endDate } = getMealPlanDates();
                    toast("맞춤 식단이 성공적으로 생성되었습니다. 🍽️", {
                        description: `${startDate} ~ ${endDate}`,
                        action: {
                            label: "바로가기",
                            onClick: () => router.push('/plans'),
                        },
                    })
                    break;

                case MealPlanStatus.FAILED:
                    setProgress(0);
                    setIsGenerating(false);
                    toast.error('식단 생성에 실패했습니다.')
                    break;
            }
        };

        socket.on('meal-plan-status', handleStatusUpdate);

        return () => {
            socket.off('meal-plan-status', handleStatusUpdate);
        };
    }, [socket, isConnected]);


    useEffect(() => {
        if (count > 0) {
            setMealPlans(generatingMealPlans[0])
            setIsGenerating(true)
            setCurrentStep(3);
        } else {
            setMealPlans(null);
            setIsGenerating(false)
            setCurrentStep(0);
        }
    }, [count])




    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="space-y-6">


                {/* Progress Bar */}
                <div className="bg-muted/30 py-4 rounded-lg">
                    <div className="w-full flex items-center justify-between mb-2 px-4">
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
                                        className={`w-9 sm:w-16 h-1 mx-2 transition-all duration-300 ${index < currentStep ? "bg-primary" : "bg-muted"
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
                                    <div className="space-y-2">
                                        <Label>식단 제목</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={userInfo.title}
                                            onChange={(e) => setUserInfo((prev) => ({ ...prev, title: e.target.value }))}
                                            placeholder="제목을 입력하세요.."
                                        />
                                    </div>

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
                                            value={userInfo.targetCalories || 0}
                                            onChange={(e) => setUserInfo((prev) => ({ ...prev, targetCalories: parseInt(e.target.value) }))}
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
                            {isGenerating ? (
                                // 생성 중 상태
                                <Card className="text-center py-12 bg-background">
                                    <CardContent>
                                        <div className="flex flex-col items-center gap-6">
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="relative"
                                            >
                                                <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                                                    />
                                                </div>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: [0, 1.2, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                                                    className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full"
                                                />
                                            </motion.div>

                                            <div className="space-y-2">
                                                <motion.h3
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                                                >
                                                    AI가 맞춤형 식단을 생성 중입니다
                                                </motion.h3>
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="text-muted-foreground"
                                                >
                                                    {userInfo.name}님의 목표와 선호도를 분석하고 있어요
                                                </motion.p>
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="bg-muted/30 rounded-lg p-4 max-w-md"
                                            >
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                                    영양소 균형 계산 중
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200" />
                                                    개인 맞춤 메뉴 선별 중
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-500" />
                                                    30일 식단 최적화 중
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1 }}
                                                className="text-center space-y-2"
                                            >
                                                <p className="text-sm text-primary font-medium">잠시만 기다려주세요</p>
                                                <p className="text-xs text-muted-foreground">완성되면 알림으로 알려드릴게요</p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1.2 }}
                                                className="w-full"
                                            >
                                                <Progress value={progress} />
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : mealPlans ? (
                                // 식단 생성 완료 후 알림 상태
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card className="bg-background">
                                        <CardContent className="p-8 text-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.6, type: "spring" }}
                                                className="flex flex-col items-center gap-6"
                                            >
                                                <div className="relative">
                                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: 0.3 }}
                                                        >
                                                            <Sparkles className="w-8 h-8 text-white" />
                                                        </motion.div>
                                                    </div>
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: 0.5, duration: 0.8 }}
                                                        className="absolute -inset-3 bg-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-full blur-md"
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <motion.h3
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 }}
                                                        className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                                                    >
                                                        맞춤형 식단이 완성되었습니다!
                                                    </motion.h3>
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.6 }}
                                                        className="text-lg text-muted-foreground max-w-md mx-auto font-semibold"
                                                    >
                                                        {userInfo.name}님을 위한 건강한 30일 식단이 준비되었습니다
                                                    </motion.p>
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.8 }}
                                                    className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/50"
                                                >
                                                    <div className="grid grid-cols-3 gap-4 text-center">
                                                        <div>
                                                            <div className="text-2xl font-bold text-emerald-600">30일</div>
                                                            <div className="text-xs text-muted-foreground"> 맞춤 식단</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-2xl font-bold text-blue-600">{mealPlans.dailyCalories}</div>
                                                            <div className="text-xs text-muted-foreground">평균 칼로리</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-2xl font-bold text-purple-600">100%</div>
                                                            <div className="text-xs text-muted-foreground">영양 균형</div>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 1 }}
                                                    className="flex flex-col sm:flex-row gap-3"
                                                >
                                                    <Button
                                                        onClick={() => window.location.href = '/plans'}
                                                        size="lg"
                                                        className="gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                                    >
                                                        <Calendar className="w-5 h-5" />
                                                        나의 식단 보러가기
                                                    </Button>
                                                    <Button
                                                        onClick={() => setCurrentStep(0)}
                                                        variant="outline"
                                                        size="lg"
                                                        className="gap-2  backdrop-blur-sm"
                                                    >
                                                        <AiIcon size={24} />
                                                        새로운 식단 만들기
                                                    </Button>
                                                </motion.div>
                                            </motion.div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
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

                                                <Zap className="w-5 h-5" />
                                                AI 식단 생성하기

                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between">
                    {
                        !isGenerating &&
                        <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0} className="gap-2 bg-transparent">
                            <ArrowLeft className="w-4 h-4" />
                            이전
                        </Button>
                    }

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
        </div >
    )
}