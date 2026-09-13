import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import { Favorites } from "./Favorites"

export const metadata: Metadata = {
    title: 'Favorites',
    description: 'Favorites of the user',
    ...NO_INDEX_PAGE
}

export default function FavoritesPage() {    
    return <Favorites />
}