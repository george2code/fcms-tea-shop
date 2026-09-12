import { useCreateProduct } from "@/hooks/queries/products/useCreateProduct";
import { IProduct, IProductInput } from "@/shared/types/product.interface";
import { ICategory } from "@/shared/types/category.interface";
import { IColor, IColorInput } from "@/shared/types/color.interface";
import { useUpdateProduct } from "@/hooks/queries/products/useUpdateProduct";
import { useDeleteProduct } from "@/hooks/queries/products/useDeleteProduct";
import { useForm } from "react-hook-form";
import styles from "../Store.module.scss";
import { Heading } from "@/components/ui/Heading";
import { Trash } from "lucide-react";
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/form-elements/image-upload/ImageUpload";
import { useCreateColor } from "@/hooks/queries/colors/useCreateColor";
import { useUpdateColor } from "@/hooks/queries/colors/useUpdateColor";
import { useDeleteColor } from "@/hooks/queries/colors/useDeleteColor";

interface ColorFormProps {
    color?: IColor;
}

export function ColorForm({ color }: ColorFormProps) {

    const { createColor, isLoadingCreate } = useCreateColor();
    const { updateColor, isLoadingUpdate } = useUpdateColor();
    const { deleteColor, isLoadingDelete } = useDeleteColor();

    const title = color ? "Edit color" : "Create color";
    const description = color ? "Edit the color" : "Add a new color to the store";
    const action = color ? "Save" : "Create";

    const form = useForm<IColorInput>({
        mode: "onChange",
        values: {
            name: color?.name ?? "",
            value: color?.value ?? "",
        },
    });

    const onSubmit = (data: IColorInput) => {

        if (color) {
            updateColor(data);
        } else {
            createColor(data);
        }
    };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Heading title={title} description={description} />
                { color && (
                    <ConfirmModal handleClick={() => deleteColor()} buttonPositiveText="Delete">
                        <Button size='icon' disabled={isLoadingDelete}>
                            <Trash className="size-4" />
                        </Button>
                    </ConfirmModal>
                )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                    

                    <FormField 
                        control={form.control} 
                        name="name" 
                        rules={{
                            required: 'Name is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        placeholder="Color name" 
                                        disabled={isLoadingCreate || isLoadingUpdate} 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control} 
                        name="value" 
                        rules={{
                            required: 'Value is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        placeholder="Color value" 
                                        disabled={isLoadingCreate || isLoadingUpdate} 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="py-4 px-6" disabled={isLoadingCreate || isLoadingUpdate}>{action}</Button>
                </form>
            </Form>
        </div>
    )
}