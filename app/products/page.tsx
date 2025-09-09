import ProductsMain from "@/components/products/products-main";
import { DefaultHeader } from "@/layouts/default-header";


export default function Page() {
    return (
        <>
            <DefaultHeader title="상품추천" />
            <ProductsMain />
        </>
    )
}