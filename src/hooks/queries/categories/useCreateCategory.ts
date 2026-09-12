import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import toast from "react-hot-toast";
import { STORE_URL } from "@/config/url.config";
import { AxiosError } from "axios";
import { ICategoryInput } from "@/shared/types/category.interface";
import { useMemo } from "react";

export const useCreateCategory = () => {
    const params = useParams<{ storeId: string }>();
    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
        mutationKey: ["create category"],
        mutationFn: async (data: ICategoryInput) => {
            categoryService.create(data, params.storeId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get categories for store dashboard"] });
            toast.success("Category created successfully");
            router.push(STORE_URL.categories(params.storeId));
        },
        onError: (error: AxiosError) => {
            toast.error("Failed to create category");
        },
    })

    return useMemo(() => ({
        createCategory,
        isLoadingCreate,
    }), [createCategory, isLoadingCreate]);
}
