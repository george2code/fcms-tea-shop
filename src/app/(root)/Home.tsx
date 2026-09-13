import { IProduct } from '@/shared/types/product.interface';
import { Hero } from './hero/Hero';
import { Catalog } from '@/components/ui/catalog/Catalog';
import { PUBLIC_URL } from '@/config/url.config';

interface HomeProps {
    products: IProduct[];
}

export function Home({ products }: HomeProps) {
    return (
        <>
            <Hero />
            <Catalog 
                title="Most Popular Products" 
                description="The most popular products on the market" 
                linkTitle="View all products" 
                link={PUBLIC_URL.explorer()} 
                products={products} 
            />
        </>
    )
}