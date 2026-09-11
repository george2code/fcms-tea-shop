import { storeService } from "@/services/store.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useGetStore() {
    const params = useParams<{ storeId: string }>();

    const { data: store, isLoading } = useQuery({
        queryKey: ['store', params.storeId],
        queryFn: () => storeService.getById(params.storeId),
        enabled: !!params.storeId,
    });

    return useMemo(() => ({ store, isLoading }), [store, isLoading]);
}
