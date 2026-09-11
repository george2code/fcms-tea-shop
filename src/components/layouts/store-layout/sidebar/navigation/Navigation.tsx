'use client';

import { useParams } from "next/navigation";
import { IMenuItem } from "./menu.interface";
import { STORE_URL } from "@/config/url.config";
import { Album, BarChart, FolderKanban, PaintBucket, Settings, Star } from "lucide-react";

import styles from './Navigation.module.scss';
import { MenuItem } from "./MenuItem";

export function Navigation() {

    const params = useParams<{ storeid: string }>();

    const routes: IMenuItem[] = [
        {
            icon: BarChart,
            link: STORE_URL.home(params.storeid as string),
            value: 'Statistics',
        },
        {
            icon: FolderKanban,
            link: STORE_URL.products(params.storeid as string),
            value: 'Products',
        },
        {
            icon: Album,
            link: STORE_URL.categories(params.storeid as string),
            value: 'Categories',
        },
        {
            icon: PaintBucket,
            link: STORE_URL.colors(params.storeid as string),
            value: 'Colors',
        },
        {
            icon: Star,
            link: STORE_URL.reviews(params.storeid as string),
            value: 'Reviews',
        },
        {
            icon: Settings,
            link: STORE_URL.settings(params.storeid as string),
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