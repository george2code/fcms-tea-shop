import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { CategoryEdit } from "./CategoryEdit"

export const metadata: Metadata = {
    title: 'Category details',
    description: 'View the details of a category',
    ...NO_INDEX_PAGE
}

export default function CategoryEditPage() {    
    return <CategoryEdit />
}
