import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { colorService } from "@/services/color.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IColorInput } from "@/shared/types/color.interface";
import { useMemo } from "react";

export function useUpdateColor() {
    const params = useParams<{ colorId: string }>();

    const queryClient = useQueryClient();

    const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
        mutationKey: ["update color"],
        mutationFn: async (data: IColorInput) => {
            colorService.update(params.colorId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get colors for store dashboard"] });
            toast.success("Color updated successfully");
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
