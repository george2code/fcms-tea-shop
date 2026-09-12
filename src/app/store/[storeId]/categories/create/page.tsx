import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { CreateCategory } from "./CreateCategory"

export const metadata: Metadata = {
    title: 'Create category',
    description: 'Create a new category for the store',
    ...NO_INDEX_PAGE
}

export default function CreateCategoryPage() {    
    return <CreateCategory />
}
