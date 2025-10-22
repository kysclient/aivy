import MealPlanMain from "@/components/v2/meal-plan/meal-plan-main";


interface PageProps {
    searchParams: {
        title?: string;
    };
}

export default async function Page({ searchParams }: PageProps) {
    const { title } = await searchParams;

    return (
        <>
        <MealPlanMain title={title} />
        </>
    );
}