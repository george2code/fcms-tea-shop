import { useUpload } from "./useUpload";
import Image from "next/image";
import styles from "./ImageUpload.module.scss";
import { Button } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";

interface ImageUploadProps {
    isDisabled: boolean;
    onChange: (value: string[]) => void;
    value: string[];
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
    const { handleButtonClick, isUploading, fileInputRef, handleFileChange } = useUpload(onChange);
    return (
        <div>
            <div className={styles.image_container}>
                { value.map(url => (
                    <div key={url} className={styles.image_wrapper}>
                        <Image src={url} alt="Image" fill />
                    </div>
                ))}
            </div>
            <Button 
                type="button" 
                onClick={handleButtonClick} 
                disabled={isDisabled || isUploading} 
                className={cn(styles.button, {
                    'mt-4': value.length,
                })}
            >
                <ImagePlus className="size-4" />
                Load images
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple hidden />
        </div>
    )
}