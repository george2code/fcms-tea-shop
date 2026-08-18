import { Metadata } from "next";
import { Home } from "./Home";

export const metadata: Metadata = {
    title: 'Your shopping is your business, all in one place!',
}

export default function HomePage() {
    return <Home />;
}