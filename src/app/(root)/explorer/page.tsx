import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import styles from '../hero/Hero.module.scss'
import { PUBLIC_URL } from "@/config/url.config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product.service";
import { Catalog } from "@/components/ui/catalog/Catalog";
import { Explorer } from "./Explorer";

export const metadata: Metadata = {
    title: 'Prodcuts catalog',
}

export const revalidate = 60;

async function getProducts() {
    const data = (await productService.getAll()).slice(0, 6);

    return data;
}

export default async function ExplorerPage() {
    const products = await getProducts();

    return (
        <Explorer products={products} />
    )
}