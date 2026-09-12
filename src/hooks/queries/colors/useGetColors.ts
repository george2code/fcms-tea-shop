import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { colorService } from "@/services/color.service";
import { useMemo } from "react";

export function useGetColors() {
    const params = useParams<{ storeId: string }>();

    const { data: colors, isLoading: isLoadingColors } = useQuery({
        queryKey: ["get colors for store dashboard", params.storeId],
        queryFn: () => colorService.getByStoreId(params.storeId),
        enabled: !!params.storeId,
    });

    return useMemo(() => ({
        colors,
        isLoadingColors,
    }), [colors, isLoadingColors]);
}
