import { fileService } from "@/services/file.service";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import toast from "react-hot-toast";

export function useUpload(onChange: (value: string[]) => void) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutate: uploadFiles, isPending: isUploading } = useMutation({
        mutationKey: ["upload files"],
        mutationFn: (formData: FormData) => fileService.upload(formData),
        onSuccess: (data) => {
            onChange(data.map((file: any) => file.url));
        },
        onError: (error) => {
            toast.error("Failed to upload files");
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const seletectedFiles = event.target.files;
        if (seletectedFiles) {
            const fileArray = Array.from(seletectedFiles);
            const formData = new FormData();
            fileArray.forEach((file) => {
                formData.append("files", file);
            });
            uploadFiles(formData);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return useMemo(() => ({
        handleButtonClick, isUploading, fileInputRef, handleFileChange,
    }), 
    [handleButtonClick, isUploading, fileInputRef, handleFileChange]);
}