import { IMonthlySales } from "@/shared/types/statistics.interface";
import type {ChartConfig} from '@/components/ui/chart'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from './MiddleStatistics.module.scss'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { formatPrice } from "@/utils/string/format-price";

const chartConfig = {
    value: {
        label: 'Incoming',
        color: '#3B82F6',
    }

} satisfies ChartConfig

interface IOverviewProps {
    data: IMonthlySales[];
}

export function Overview({ data }: IOverviewProps) {
    return <Card>
        <CardHeader className={styles.header}>
            <CardTitle>Incomes</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer className='aspect-auto h-[310px] w-full' config={chartConfig}>
                <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }} >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={
                        <ChartTooltipContent
                            indicator="line"
                            formatter={(value) =>
                                typeof value === "number" ? formatPrice(value) : String(value ?? "")
                            }
                        />
                    } />
                    <Area type="natural" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.1} />
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>;
}