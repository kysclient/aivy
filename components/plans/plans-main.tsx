'use client'

import { useUserMealPlans } from "@/hooks/use-meal-plan";
import { NoPlans } from "../no-plans";
import { cn } from "@/lib/utils";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { MealPlan, MealPlanData } from "@/repositoires/MealPlanRepository";

export function PlansMain() {
    const {
        mealPlans,
        total,
        page,
        totalPages,
        isLoading,
        error,
        refresh: mutate,
    } = useUserMealPlans();
    console.log('mealPlans : ', mealPlans)

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "completed":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            case "generating":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20"
            case "upcoming":
                return "bg-amber-500/10 text-amber-400 border-amber-500/20"
            case "failed":
                return "bg-red-500/10 text-red-400 border-red-500/20"
            default:
                return "bg-muted/50 text-muted-foreground border-border"
        }
    }

    const getStatusText = (status?: string) => {
        switch (status) {
            case "generating":
                return "진행중"
            case "completed":
                return "완료"
            case "upcoming":
                return "예정"
            case "failed":
                return "실패"
            default:
                return "대기"
        }
    }

    return (
        <>
            {mealPlans.map((mealPlan: MealPlan) => (
                <div
                    key={mealPlan.id}
                    // onClick={() => onPlanClick?.(mealPlan)}
                    className={cn(
                        "group relative overflow-hidden border border-border/50",
                        "bg-card/50 backdrop-blur-sm",
                        "hover:bg-card hover:border-border transition-all duration-200",
                        "hover:shadow-lg hover:shadow-primary/5",
                        "cursor-pointer",
                    )}
                >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-center gap-4 p-6">
                        {/* Status indicator */}
                        <div className="flex-shrink-0">
                            <div
                                className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border",
                                    getStatusColor(mealPlan.status),
                                )}
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                {getStatusText(mealPlan.status)}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-foreground text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                                        {mealPlan.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-mono">{mealPlan.startDate}</span>
                                        </div>
                                        <div className="text-muted-foreground/60">→</div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-mono">{mealPlan.endDate}</span>
                                        </div>
                                    </div>

                                    {mealPlan.dailyCalories && (
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">평균칼로리: {mealPlan.dailyCalories}kcal</p>
                                    )}
                                </div>

                                {/* Arrow indicator */}
                                <div className="flex-shrink-0 flex items-center">
                                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom border accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            ))}
        </>
    )
}