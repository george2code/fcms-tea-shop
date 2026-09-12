import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { ColorEdit } from "./ColorEdit"

export const metadata: Metadata = {
    title: 'Color details',
    description: 'View the details of a color',
    ...NO_INDEX_PAGE
}

export default function ColorEditPage() {    
    return <ColorEdit />
}     