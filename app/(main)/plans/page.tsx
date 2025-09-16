import { NoPlans } from "@/components/no-plans";
import { DefaultHeader } from "@/layouts/default-header";


export default function Page() {
    return (
        <>
              <DefaultHeader title="나만의 식단" />
              <NoPlans />
        </>   
    )
}