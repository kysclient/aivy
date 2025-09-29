'use client'

import { useMealPlan } from "@/hooks/use-meal-plan"
import { DefaultHeader } from "@/layouts/default-header";
import { AlarmClock, Apple, Calendar, ChevronLeft, ChevronRight, Moon, Sun, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { NoPlans } from "../no-plans";
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Loading } from "../loading";
import { redirect } from "next/navigation";


interface MealPlanDetailProps {
    planId: string
}

const mealTypes = [
    { key: "breakfast", label: "아침", icon: <AlarmClock className="w-4 h-4 text-foreground" />, color: "bg-orange-100 text-orange-800" },
    { key: "lunch", label: "점심", icon: <Sun className="w-4 h-4 text-foreground" />, color: "bg-yellow-100 text-yellow-800" },
    { key: "dinner", label: "저녁", icon: <Moon className="w-4 h-4 text-foreground" />, color: "bg-blue-100 text-blue-800" },
    { key: "snack", label: "간식", icon: <Apple className="w-4 h-4 text-forground" />, color: "bg-green-50 text-green-700" },
]

export function MealPlanDetail({ planId }: MealPlanDetailProps) {
    const { mealPlan, refresh, error, isLoading, } = useMealPlan(planId);
    const mealPlanData = mealPlan?.mealPlanData?.mealPlanData || []
    const [currentDay, setCurrentDay] = useState(0)
    const currentMeal = mealPlanData[currentDay]
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const [expandedMeal, setExpandedMeal] = useState<string | null>(null)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
            weekday: "short",
        })
    }

    const toggleMealExpansion = (mealKey: string) => {
        setExpandedMeal(expandedMeal === mealKey ? null : mealKey)
    }

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return

        const selectedDateString = date.toISOString().split("T")[0]
        const dayIndex = mealPlanData.findIndex((meal) => meal.date === selectedDateString)

        if (dayIndex !== -1) {
            setCurrentDay(dayIndex) // +1 제거 (배열 인덱스는 0부터 시작)
            setIsCalendarOpen(false)
        }
        // 데이터가 없는 날짜를 선택한 경우 달력만 닫고 currentDay는 변경하지 않음
        else {
            setIsCalendarOpen(false)
        }
    }

    const isDateAvailable = (date: Date) => {
        const dateString = date.toISOString().split("T")[0]
        return mealPlanData.some((meal) => meal.date === dateString)
    }

    const getNutrientPercentage = (value: number, max: number) => {
        return Math.min((value / max) * 100, 100)
    }

    if (mealPlanData.length === 0 || !currentMeal) {
        return (
            <div className="flex justify-center items-center min-h-screen w-full">
                <Loading />
            </div>
        )
    }

    if (mealPlan?.status !== 'completed') {
        redirect('/plans')
    }

    return (
        <>
            <DefaultHeader title={mealPlan?.title || ''} />
            <div className="min-h-screen  p-4">
                <div className="space-y-6">


                    {/* Date Navigation */}
                    <Card className="rounded-xl">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
                                    disabled={currentDay === 0}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-3 text-center hover:bg-muted/50">
                                            <Calendar className="h-5 w-5 text-primary" />
                                            <div>
                                                <div className="font-semibold text-lg text-foreground">{formatDate(currentMeal.date)}</div>
                                                <div className="text-sm text-muted-foreground">Day {currentDay + 1} of {mealPlanData.length}</div>
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="center">
                                        <CalendarComponent
                                            mode="single"
                                            selected={new Date(currentMeal.date)}
                                            onSelect={handleDateSelect}
                                            disabled={(date) => !isDateAvailable(date)}
                                            className="rounded-md border-0"
                                            classNames={{
                                                disabled: "text-muted-foreground opacity-30 line-through",
                                                today: "bg-primary/10 text-primary rounded-md font-semibold"
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentDay(Math.min(mealPlanData?.length - 1, currentDay + 1))}
                                    disabled={currentDay === mealPlanData.length - 1}
                                    className="border-emerald-200 hover:bg-emerald-50"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daily Summary */}
                    <Card className="bg-gradient-to-r from-primary/5 via-transparent to-transparent rounded-xl">
                        <CardContent className="p-6 text-foreground">
                            <div className="text-center space-y-2">
                                <div className="text-3xl font-bold">{currentMeal.totalCalories.toLocaleString()}</div>
                                <div className="text-muted-forground">총 칼로리</div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="text-center">
                                    <div className="text-xl font-semibold">{currentMeal.dailyNutrients.carbs}g</div>
                                    <div className="text-muted-foreground text-sm">탄수화물</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-semibold">{currentMeal.dailyNutrients.protein}g</div>
                                    <div className="text-muted-foreground  text-sm">단백질</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-semibold">{currentMeal.dailyNutrients.fat}g</div>
                                    <div className="text-muted-foreground  text-sm">지방</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Meals */}
                    <div className="space-y-4">
                        {mealTypes.map((mealType) => {
                            const meal = currentMeal[mealType.key as keyof typeof currentMeal] as any
                            if (!meal || typeof meal !== "object" || !meal.menu) return null

                            return (
                                <Card key={mealType.key} className="hover:shadow-lg transition-shadow rounded-xl">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{mealType.icon}</span>
                                                <CardTitle className="text-lg text-foreground">{mealType.label}</CardTitle>
                                            </div>
                                            <Badge variant="secondary" className={mealType.color}>
                                                {meal.calories} kcal
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-sm leading-relaxed text-foreground font-semibold">{meal.menu}</div>

                                        {/* Nutrient bars */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-muted-foreground font-semibold">탄수화물</span>
                                                <span className="text-xs font-medium">{meal.nutrients.carbs}g</span>
                                            </div>
                                            <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 shadow-inner">
                                                <div
                                                    className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-700 shadow-sm"
                                                    style={{ width: `${getNutrientPercentage(meal.nutrients.carbs, 150)}%` }}
                                                />
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-muted-foreground font-semibold">단백질</span>
                                                <span className="text-xs font-medium">{meal.nutrients.protein}g</span>
                                            </div>
                                            <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 shadow-inner">
                                                <div
                                                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 shadow-sm"
                                                    style={{ width: `${getNutrientPercentage(meal.nutrients.protein, 80)}%` }}
                                                />
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-muted-foreground font-semibold">지방</span>
                                                <span className="text-xs font-medium">{meal.nutrients.fat}g</span>
                                            </div>
                                            <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 shadow-inner">
                                                <div
                                                    className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-700 shadow-sm"
                                                    style={{ width: `${getNutrientPercentage(meal.nutrients.fat, 40)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Progress indicator */}
                    <div className="flex justify-center space-x-1 py-4">
                        {Array.from({ length: Math.min(mealPlanData.length, 10) }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors ${index === currentDay ? "bg-emerald-500" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                        {mealPlanData.length > 10 && (
                            <span className="text-xs text-muted-foreground ml-2">+{mealPlanData.length - 10} more days</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}