import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { colorService } from "@/services/color.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IColorInput } from "@/shared/types/color.interface";
import { useMemo } from "react";
import { STORE_URL } from "@/config/url.config";

export function useUpdateColor() {
    const params = useParams<{ storeId: string, colorId: string }>();
    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
        mutationKey: ["update color"],
        mutationFn: async (data: IColorInput) => {
            colorService.update(params.colorId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get colors for store dashboard"] });
            toast.success("Color updated successfully");
            router.push(STORE_URL.colors(params.storeId));
        },
        onError: (error: AxiosError) => {
            toast.error("Failed to update color");
        },
    })

    return useMemo(() => ({
        updateColor,
        isLoadingUpdate,
    }), [updateColor, isLoadingUpdate]);
}
