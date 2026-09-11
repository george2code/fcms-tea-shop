import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { Store } from "./Store";

export const metadata: Metadata = {
    title: "Store",
    description: "Store",
    ...NO_INDEX_PAGE,
};

export default function StorePage() {
    return <Store />;
}