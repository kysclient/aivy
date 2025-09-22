import { MealPlanDetail } from "@/components/plans/meal-plan-detail"

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const { slug } = params
    return (
        <>
            <MealPlanDetail planId={slug} />
        </>
    )
}
