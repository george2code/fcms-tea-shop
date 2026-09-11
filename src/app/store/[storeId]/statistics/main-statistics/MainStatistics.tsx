import { useGetStatistics } from "@/hooks/queries/statistics/useGetStatistics";
import styles from './MainStatistics.module.scss';
import { MainStatisticsItem, MainStatisticsItemSkeleton } from "./MainStatisticsItem";

const SKELETON_COUNT = 4;

export function MainStatistics() {
    const { main, isLoadingMain } = useGetStatistics();

    return <div className={styles.main}>
        {isLoadingMain ? (
            Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <MainStatisticsItemSkeleton key={index} />
            ))
        ) : main?.length ? (
            main.map((item) => (
                <MainStatisticsItem key={item.id} item={item} />
            ))
         ) : (
            <div className={styles.empty}>
                <p>No data for statistics</p>
            </div>
            )
        }
    </div>;
}