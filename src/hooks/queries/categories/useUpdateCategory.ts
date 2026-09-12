import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ICategoryInput } from "@/shared/types/category.interface";
import { useMemo } from "react";

export function useUpdateCategory() {
    const params = useParams<{ categoryId: string }>();

    const queryClient = useQueryClient();

    const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
        mutationKey: ["update category"],
        mutationFn: async (data: ICategoryInput) => {
            categoryService.update(params.categoryId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get categories for store dashboard"] });
            toast.success("Category updated successfully");
        },
        onError: (error: AxiosError) => {
            toast.error("Failed to update category");
        },
    })

    return useMemo(() => ({
        updateCategory,
        isLoadingUpdate,
    }), [updateCategory, isLoadingUpdate]);
}
