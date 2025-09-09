import MealPlanMain from "@/components/meal-plan/meal-plan-main";
import { DefaultHeader } from "@/layouts/default-header";


export default function Page() {
    return (
        <>
            <DefaultHeader title="AI 식단생성" />
            <MealPlanMain />
        </>
    )
}