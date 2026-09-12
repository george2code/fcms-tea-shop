import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import toast from "react-hot-toast";
import { STORE_URL } from "@/config/url.config";
import { AxiosError } from "axios";
import { IProductInput } from "@/shared/types/product.interface";
import { useMemo } from "react";

export const useCreateProduct = () => {
    const params = useParams<{ storeId: string }>();
    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
        mutationKey: ["create product"],
        mutationFn: async (data: IProductInput) => {
            productService.create(data, params.storeId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get products for store dashboard"] });
            toast.success("Product created successfully");
            router.push(STORE_URL.products(params.storeId));
        },
        onError: (error: AxiosError) => {
            toast.error("Failed to create product");
        },
    })

    return useMemo(() => ({
        createProduct,
        isLoadingCreate,
    }), [createProduct, isLoadingCreate]);
}