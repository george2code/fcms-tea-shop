import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IProductInput } from "@/shared/types/product.interface";
import { useMemo } from "react";

export function useUpdateProduct() {
    const params = useParams<{ productId: string }>();

    const queryClient = useQueryClient();

    const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
        mutationKey: ["update product"],
        mutationFn: async (data: IProductInput) => {
            productService.update(params.productId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get products for store dashboard"] });
            toast.success("Product updated successfully");
        },
        onError: (error: AxiosError) => {
            toast.error("Failed to update product");
        },
    })

    return useMemo(() => ({
        updateProduct,
        isLoadingUpdate,
    }), [updateProduct, isLoadingUpdate]);
}