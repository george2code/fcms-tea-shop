import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { CreateProduct } from "./CreateProduct"

export const metadata: Metadata = {
    title: 'Create product',
    description: 'Create a new product for the store',
    ...NO_INDEX_PAGE
}

export default function CreateProductPage() {    
    return <CreateProduct />
}