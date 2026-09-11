import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ILastUsers } from "@/shared/types/statistics.interface";
import styles from './MiddleStatistics.module.scss';
import Image from "next/image";
import { formatPrice } from "@/utils/string/format-price";

interface ILastUsersProps {
    data: ILastUsers[];
}

export function LastUsers({ data }: ILastUsersProps) {
    return (
        <Card>
            <CardHeader className={styles.header}>
                <CardTitle>Last Users</CardTitle>
            </CardHeader>
            <CardContent>
                { data.length ? (
                    <div className={styles.users}>
                        {data.map((user) => (
                            <div key={user.id} className={styles.user}>
                                <Image src={user.picture} alt={user.name} width={40} height={40} />
                                <div className={styles.info}>
                                    <p className={styles.name}>{user.name}</p>
                                    <p className={styles.email}>{user.email}</p>
                                </div>
                                <p className={styles.total}>+{formatPrice(user.total)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p>This store has no customers yet</p>
                    </div>
                ) }
            </CardContent>
        </Card>
    )
}