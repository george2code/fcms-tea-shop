import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { colorService } from "@/services/color.service";
import toast from "react-hot-toast";
import { STORE_URL } from "@/config/url.config";
import { AxiosError } from "axios";
import { IColorInput } from "@/shared/types/color.interface";
import { useMemo } from "react";

export const useCreateColor = () => {
    const params = useParams<{ storeId: string }>();
    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
        mutationKey: ["create color"],
        mutationFn: async (data: IColorInput) => {
            colorService.create(data, params.storeId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get colors for store dashboard"] });
            toast.success("Color created successfully");
            router.push(STORE_URL.colors(params.storeId));
        },
        onError: (error: AxiosError) => {
            toast.error("Failed to create color");
        },
    })

    return useMemo(() => ({
        createColor,
        isLoadingCreate,
    }), [createColor, isLoadingCreate]);
}
