import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { reviewService } from "@/services/review.service";

export function useGetReviews() {
    const params = useParams<{ storeId: string }>();

    const { data: reviews, isLoading } = useQuery({
        queryKey: ["get reviews for store dashboard", params.storeId],
        queryFn: () => reviewService.getByStoreId(params.storeId),
    });

    return useMemo(() => ({
        reviews,
        isLoading,
    }), [reviews, isLoading]);
}
