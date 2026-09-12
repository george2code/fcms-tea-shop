"use client";

import { useParams } from "next/navigation";
import { columnsColor } from "./ColorColumns";
import styles from "../Store.module.scss"
import DataTableLoading from "@/components/ui/data-loading/DataTableLoading";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";
import { STORE_URL } from "@/config/url.config";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-loading/DataTable";
import { useGetColors } from "@/hooks/queries/colors/useGetColors";
import { IColor } from "@/shared/types/color.interface";
import { formatDate } from "@/utils/date/format-date";


export function Colors() {
    const params = useParams<{storeId: string}>();
    const { colors, isLoadingColors } = useGetColors();

    const formattedColors: IColor[] = colors ? colors.map(color => ({
        id: color.id,
        createdAt: formatDate(color.createdAt),
        name: color.name,
        value: color.value,
        storeId: color.storeId,
    })) : [];

    return (
        <div className={styles.wrapper}>
            { isLoadingColors ? (
                <DataTableLoading />
            ) : (
                <>
                    <div className={styles.header}>
                        <Heading title={`Colors (${colors?.length})`} description='All colors of your store' />
                        <div className={styles.buttons}>
                            <Link href={STORE_URL.colorCreate(params.storeId)}>
                                <Button variant="outline">
                                    <Plus />
                                    Create
                                </Button>
                            </Link>
                        </div>
                       
                    </div>
                    <div className={styles.table}>
                            <DataTable columns={columnsColor} data={formattedColors} filterKey="name" />
                    </div>
                </>
            )}
        </div>
    )
}