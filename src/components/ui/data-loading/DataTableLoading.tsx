import { Card, CardContent } from "../card"
import { Loader } from "../Loader"
import { Skeleton } from "../skeleton"
import styles from "./DataTable.module.scss"
import { FC } from "react"

const DataTableLoading: FC = () => {
    return (
        <div>
            <div className={styles.loading}>
                <Skeleton className={styles.heading} />
                <Skeleton className={styles.search} />
                <Card className={styles.table}>
                    <CardContent>
                        <div className={styles.loader_wrapper}>
                            <Loader />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DataTableLoading;