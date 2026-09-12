import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { CreateColor } from "./CreateColor"

export const metadata: Metadata = {
    title: 'Create color',
    description: 'Create a new color for the store',
    ...NO_INDEX_PAGE
}

export default function CreateColorPage() {    
    return <CreateColor />
}