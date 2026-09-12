import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { useMemo } from "react";

export function useGetCategories() {
    const params = useParams<{ storeId: string }>();

    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ["get categories for store dashboard", params.storeId],
        queryFn: () => categoryService.getByStoreId(params.storeId),
        enabled: !!params.storeId,
    });

    return useMemo(() => ({
        categories,
        isLoadingCategories,
    }), [categories, isLoadingCategories]);
}
