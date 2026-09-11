import { IMainStatistics } from "@/shared/types/statistics.interface";
import { getIcon } from "./statistics.util";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import styles from './MainStatistics.module.scss';
import CountUp from "react-countup";
import { formatPrice } from "@/utils/string/format-price";

interface IMainStatisticsItemProps {
    item: IMainStatistics;
}

export function MainStatisticsItem({ item }: IMainStatisticsItemProps) {
    const Icon = getIcon(item.id);

    return <Card className={styles.card}>
        <CardHeader className={styles.header}>
            <CardTitle>{ item.name}</CardTitle>
            <Icon className={styles.icon} />
        </CardHeader>
        <CardContent className={styles.content}>
            <h2>
                { item.id !== 1 ? 
                    (<CountUp end={item.value} />) : 
                    (<CountUp end={item.value} formattingFn={formatPrice} />)
                }
            </h2>
        </CardContent>
    </Card>;
}