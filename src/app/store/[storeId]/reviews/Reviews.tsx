"use client";

import { DataTable } from "@/components/ui/data-loading/DataTable";
import DataTableLoading from "@/components/ui/data-loading/DataTableLoading";
import { Heading } from "@/components/ui/Heading";
import { useGetReviews } from "@/hooks/queries/review/useGetReviews";
import { formatDate } from "@/utils/date/format-date";
import { columnsReview, IReviewColumn } from "./ReviewColumns";
import styles from "../Store.module.scss";

export function Reviews() {
    const { reviews, isLoading } = useGetReviews();

    const formattedReviews: IReviewColumn[] = reviews ? reviews.map(review => ({
        id: review.id,
        createdAt: formatDate(review.createdAt),
        rating: Array.from({ length: review.rating}).map(() => '★').join(' '),
        username: review.user.name,
    })) : [];

    // generate return table
    return (
        <div className={styles.wrapper}>
            { isLoading ? (
                <DataTableLoading />
            ) : (
                <>
                    <div className={styles.header}>
                        <Heading title={`Reviews (${reviews?.length})`} description='All reviews of your store' />
                    </div>
                    <div className={styles.table}>
                        <DataTable columns={columnsReview} data={formattedReviews} />
                    </div>
                </>
            )}
        </div>
    )
}