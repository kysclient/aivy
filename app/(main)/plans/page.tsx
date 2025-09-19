import { PlansMain } from "@/components/plans/plans-main";
import { DefaultHeader } from "@/layouts/default-header";


export default function Page() {
    return (
        <>
              <DefaultHeader title="나만의 식단" />
              <PlansMain />
        </>   
    )
}