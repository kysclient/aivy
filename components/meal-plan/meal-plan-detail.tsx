'use client'

import { useMealPlan } from "@/hooks/use-meal-plan"
import { DefaultHeader } from "@/layouts/default-header";


interface MealPlanDetailProps {
    planId: string
}

export function MealPlanDetail({ planId }: MealPlanDetailProps) {
    const { mealPlan, refresh, error, isLoading, } = useMealPlan(planId);

    console.log('meal Plan : ', mealPlan)
    return (
        <>
        <DefaultHeader title={mealPlan?.title || ''} />
        </>
    )
}