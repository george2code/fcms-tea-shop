import { Metadata } from "next";
import { Store } from "./Store";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
    title: 'Store management',
    ...NO_INDEX_PAGE
}

export default function StorePage() {
    return <Store />;
}