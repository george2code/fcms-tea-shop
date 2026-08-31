'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { saveTokenStorage } from "@/services/auth/auth.token.service";
import { useEffect } from "react";
import { DASHBOARD_URL } from "@/config/url.config";

export function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');

        if (!accessToken) return;

        saveTokenStorage(accessToken);
        router.replace(DASHBOARD_URL.home());
    }, [searchParams, router]);

    return <div>Dashboard</div>
}
