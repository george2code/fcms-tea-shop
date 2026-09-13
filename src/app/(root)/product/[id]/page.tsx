import { productService } from "@/services/product.service";
import { Metadata } from "next";
import { Product } from "./Product";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
    const products = await productService.getAll();
    return products.map(product => ({
        id: product.id,
    }));
}

async function getProduct(id: string) {
    try {
        const product = await productService.getById(id);
        const similarProducts = await productService.getSimilar(id);

        return { product, similarProducts };
    } catch (error) {
        return notFound();
    }
}

export async function generateMetadata({ params }: PageProps<'/category/[id]'>): Promise<Metadata> {
    const { id } = await params;
    const { product } = await getProduct(id);

    return {
        title: product.title,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: [{
                url: product.images[0],
                width: 1000,
                height: 1000,
                alt: product.title,
            }],
        },
    }
}

export default async function ProductPage({ params }: PageProps<'/product/[id]'>) {
    const { id } = await params;
    const { product, similarProducts } = await getProduct(id);

    return (
        <Product id={id} initialProduct={product} similarProducts={similarProducts} />
    )
}