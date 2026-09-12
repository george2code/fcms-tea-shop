import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { Colors } from "./Colors"

export const metadata: Metadata = {
    title: 'Colors',
    description: 'Colors of the store',
    ...NO_INDEX_PAGE
}

export default function ColorsPage() {    
    return <Colors />
}