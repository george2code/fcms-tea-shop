import { Catalog } from "@/components/ui/catalog/Catalog";
import { categoryService } from "@/services/category.service";
import { productService } from "@/services/product.service";
import { Metadata } from "next";

export const revalidate = 60;

async function getProducts(id: string) {
    const products = (await productService.getByCategory(id)).slice(0, 6);
    const category = await categoryService.getById(id);

    return { products, category };
}

export async function generateMetadata({ params }: PageProps<'/category/[id]'>): Promise<Metadata> {
    const { id } = await params;
    const { category, products } = await getProducts(id);
    return {
        title: category.title,
        description: category.description,
        openGraph: {
            title: category.title,
            description: category.description,
            images: [{
                url: products[0].images[0],
                width: 1000,
                height: 1000,
                alt: category.title,
            }],
        },
    }
}

export default async function CategoryPage({ params }: PageProps<'/category/[id]'>) {
    const { id } = await params;
    const { products, category } = await getProducts(id);

    return (
        <div className='my-6'>
            <Catalog 
                title={category.title} 
                description={category.description} 
                linkTitle={`View all ${category.title} products`} 
                products={products} 
            />
        </div>
    )
}
