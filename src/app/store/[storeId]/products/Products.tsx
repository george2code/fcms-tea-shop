"use client";

import { useGetProducts } from "@/hooks/queries/products/useGetProducts";
import { formatPrice } from "@/utils/string/format-price";
import { useParams } from "next/navigation";
import { columns, IProductColumn } from "./ProductColumns";
import styles from "../Store.module.scss"
import DataTableLoading from "@/components/ui/data-loading/DataTableLoading";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";
import { STORE_URL } from "@/config/url.config";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-loading/DataTable";
import { IProduct } from "@/shared/types/product.interface";

function toProductColumns(products: IProduct[] | undefined, storeId: string): IProductColumn[] {
    if (!Array.isArray(products)) {
        return []
    }

    return products.flatMap((product) => {
        if (!product?.id) {
            return []
        }

        return [{
            id: product.id,
            title: product.title,
            price: formatPrice(product.price ?? 0),
            category: product.category?.title ?? '',
            color: product.color?.value ?? '',
            storeId: storeId,
        }]
    })
}

export function Products() {
    const params = useParams<{storeId: string}>();
    const { products, isLoadingProducts } = useGetProducts();

    const formattedProducts = toProductColumns(products, params.storeId);

    return (
        <div className={styles.wrapper}>
            { isLoadingProducts ? (
                <DataTableLoading />
            ) : (
                <>
                    <div className={styles.header}>
                        <Heading title={`Products (${products?.length})`} description='All products of your store' />
                        <div className={styles.buttons}>
                            <Link href={STORE_URL.productCreate(params.storeId)}>
                                <Button variant="outline">
                                    <Plus />
                                    Create
                                </Button>
                            </Link>
                        </div>
                       
                    </div>
                    <div className={styles.table}>
                            <DataTable columns={columns} data={formattedProducts} filterKey="title" />
                    </div>
                </>
            )}
        </div>
    )
}