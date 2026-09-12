import { STORE_URL } from "@/config/url.config";
import { productService } from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-hot-toast";

export function useDeleteProduct() {
    const params = useParams<{ storeId: string }>();
    const router = useRouter();

    const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
        mutationKey: ['delete product'],
        mutationFn: () => productService.delete(params.storeId),
        onSuccess: () => {
            toast.success('Product deleted successfully');
            router.push(STORE_URL.products(params.storeId));
        },
        onError: (error) => {
            toast.error('Failed to delete product');
        },
    })

    return useMemo(
        () => ({ deleteProduct, isLoadingDelete }), 
        [deleteProduct, isLoadingDelete]
    );
}