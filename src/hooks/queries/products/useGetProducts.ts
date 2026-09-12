import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { useMemo } from "react";

export function useGetProducts() {
    const params = useParams<{ storeId: string }>();

    const { data: products, isLoading: isLoadingProducts } = useQuery({
        queryKey: ["get products for store dashboard", params.storeId],
        queryFn: () => productService.getByStoreId(params.storeId),
        enabled: !!params.storeId,
    });

    return useMemo(() => ({
        products,
        isLoadingProducts,
    }), [products, isLoadingProducts]);
}