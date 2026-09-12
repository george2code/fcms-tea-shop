import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { Products } from "./Products"

export const metadata: Metadata = {
    title: 'Products',
    description: 'Products of the store',
    ...NO_INDEX_PAGE
}

export default function ProductsPage() {    
    return <Products />
}