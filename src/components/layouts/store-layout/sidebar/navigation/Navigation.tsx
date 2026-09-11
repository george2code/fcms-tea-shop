'use client';

import { useParams } from "next/navigation";
import { IMenuItem } from "./menu.interface";
import { STORE_URL } from "@/config/url.config";
import { Album, BarChart, FolderKanban, PaintBucket, Settings, Star } from "lucide-react";

import styles from './Navigation.module.scss';
import { MenuItem } from "./MenuItem";

export function Navigation() {

    const params = useParams<{ storeId: string }>();

    const routes: IMenuItem[] = [
        {
            icon: BarChart,
            link: STORE_URL.home(params.storeId as string),
            value: 'Statistics',
        },
        {
            icon: FolderKanban,
            link: STORE_URL.products(params.storeId as string),
            value: 'Products',
        },
        {
            icon: Album,
            link: STORE_URL.categories(params.storeId as string),
            value: 'Categories',
        },
        {
            icon: PaintBucket,
            link: STORE_URL.colors(params.storeId as string),
            value: 'Colors',
        },
        {
            icon: Star,
            link: STORE_URL.reviews(params.storeId as string),
            value: 'Reviews',
        },
        {
            icon: Settings,
            link: STORE_URL.settings(params.storeId as string),
            value: 'Settings',
        },
    ]


    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation}>
                {routes.map((route) => (
                    <MenuItem key={route.link} item={route} />
                ))}
            </div>
        </div>
    )
}