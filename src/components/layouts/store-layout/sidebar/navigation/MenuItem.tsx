'use client';

import Link from "next/link";
import { IMenuItem } from "./menu.interface";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from './Navigation.module.scss';

interface IMenuItemProps {
    item: IMenuItem;
}

export function MenuItem({ item }: IMenuItemProps) {
    const pathname = usePathname();

    return (
        <Link href={item.link} className={cn(styles.route, {
            [styles.active]: pathname === item.link})
        }>
            <item.icon />
            {item.value}
        </Link>
    )
}