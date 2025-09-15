import MealPlanMain from '@/components/meal-plan/meal-plan-main'
import { MenuHeader } from '@/layouts/menu-header'

export default function Page() {
  return (
    <>
      <MenuHeader title="AI 식단생성" />
      <MealPlanMain />
    </>
  )
}
