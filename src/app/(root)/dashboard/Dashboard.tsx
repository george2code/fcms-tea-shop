'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { saveTokenStorage } from "@/services/auth/auth.token.service";
import { useEffect } from "react";
import styles from './Dashboard.module.scss';
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";
import { formatDate } from "@/utils/date/format-date";
import { formatPrice } from "@/utils/string/format-price";
import { EnumOrderStatus } from "@/shared/types/order.interface";
import { useProfile } from "@/hooks/useProfile";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-loading/DataTable";
import { orderColumns } from "./OrderColumn";

export function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');

        if (!accessToken) return;

        saveTokenStorage(accessToken);
        // router.replace(DASHBOARD_URL.home());
    }, [searchParams, router]);

    const { user } = useProfile();

    const { mutate: logout } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => router.push('/auth')
    });

    if (!user) return null;

    const formattedOrders = user.orders.map(order => ({
        createdAt: formatDate(order.createdAt),
        status: order.status === EnumOrderStatus.PENDING ? 'Pending' : 'Completed',
        total: formatPrice(order.total),
    }));

    return <div className={styles.wrapper}>
        <div className={styles.header}>
            <h1>Your Orders</h1>
            <Button variant={'ghost'} size={'lg'} onClick={() => logout()}><LogOut /> Logout</Button>
        </div>

        <DataTable columns={orderColumns} data={formattedOrders} />
    </div>
}
