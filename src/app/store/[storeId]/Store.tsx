'use client';

import { useGetStore } from "@/hooks/queries/store/useGetStore";
import { Loader } from "@/components/ui/Loader";

export function Store() {
    const { store, isLoading } = useGetStore();

    if (isLoading) {
        return <Loader />;
    }

    return <div>"{store?.title}" Store</div>;
}
