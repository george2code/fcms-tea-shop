import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { Dashboard } from "./Dashboard"

export const metadata: Metadata = {
    title: 'Private cabinet',
    description: 'Private cabinet of the user',
    ...NO_INDEX_PAGE
}

export default function DashboardPage() {    
    return <Dashboard />
}