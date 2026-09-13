import { Metadata } from "next";
import { Home } from "./Home";
import { productService } from "@/services/product.service";

export const metadata: Metadata = {
    title: 'Your shopping is your business, all in one place!',
}

export const revalidate = 60;

async function getProducts() {
    const data = (await productService.getMostPopular()).slice(0, 6);

    return data;
}

export default async function HomePage() {
    const products = await getProducts();

    return <Home products={products} />;
}