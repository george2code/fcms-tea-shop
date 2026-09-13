import { IProduct } from "@/shared/types/product.interface";
import { formatPrice } from "@/utils/string/format-price";
import styles from './ProductInfo.module.scss';
import Link from "next/link";
import { PUBLIC_URL } from "@/config/url.config";
import { Star } from "lucide-react";
import { getReviewWordWithEnding } from "@/utils/string/get-review-word-with-ending";
import { AddToCartButton } from "./AddToCartButton";
import { FavoriteButton } from "./FavoriteButton";

export interface ProductInfoProps {
    product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {

    const rating = Math.round(
        product.reviews.reduce(
            (acc, review) => acc + review.rating, 0
        ) / product.reviews.length
    ) || 0;
    
    return (
        <div className={styles.product_info}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.price}>{formatPrice(product.price)}</div>
            <hr />
            <div className={styles.description}>{product.description}</div>
            <hr />
            <div className={styles.label}>
                <h3>Color: </h3>
                <div className={styles.color} style={{ backgroundColor: product.color.value }}></div>
            </div>
            <div className={styles.label}>
                <h3>Category: </h3>
                <Link 
                    className='text-sm' 
                    href={PUBLIC_URL.category(product.category.id)}
                >
                    {product.category.title}
                </Link>
            </div>
            <div className={styles.label}>
                <h3>Average Rating: </h3>
                <div className='text-sm'>
                    <Star /> {rating.toFixed(1)} |{' '}
                    {getReviewWordWithEnding(product.reviews.length)}
                </div>
            </div>
            <hr />
            <div className={styles.actions}>
                <AddToCartButton product={product} />
                <FavoriteButton product={product} />
            </div>
        </div>
    )
}