import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { ProductEdit } from "./ProductEdit"

export const metadata: Metadata = {
    title: 'Product details',
    description: 'View the details of a product',
    ...NO_INDEX_PAGE
}

export default function ProductEditPage() {    
    return <ProductEdit />
}     