"use client";

import { useParams } from "next/navigation";
import styles from "../Store.module.scss"
import DataTableLoading from "@/components/ui/data-loading/DataTableLoading";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";
import { STORE_URL } from "@/config/url.config";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-loading/DataTable";
import { useGetCategories } from "@/hooks/queries/categories/useGetCategories";
import { ICategory } from "@/shared/types/category.interface";
import { formatDate } from "@/utils/date/format-date";
import { columnsCategory } from "./CategoryColumns";


export function Categories() {
    const params = useParams<{storeId: string}>();
    const { categories, isLoadingCategories } = useGetCategories();

    const formattedCategories: ICategory[] = categories ? categories.map(category => ({
        id: category.id,
        createdAt: formatDate(category.createdAt),
        title: category.title,
        description: category.description,
        storeId: category.storeId,
    })) : [];

    return (
        <div className={styles.wrapper}>
            { isLoadingCategories ? (
                <DataTableLoading />
            ) : (
                <>
                    <div className={styles.header}>
                        <Heading title={`Categories (${categories?.length})`} description='All categories of your store' />
                        <div className={styles.buttons}>
                            <Link href={STORE_URL.categoryCreate(params.storeId)}>
                                <Button variant="outline">
                                    <Plus />
                                    Create
                                </Button>
                            </Link>
                        </div>
                       
                    </div>
                    <div className={styles.table}>
                            <DataTable columns={columnsCategory} data={formattedCategories} filterKey="title" />
                    </div>
                </>
            )}
        </div>
    )
}
