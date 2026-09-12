import { ICategory, ICategoryInput } from "@/shared/types/category.interface";
import { useForm } from "react-hook-form";
import styles from "../Store.module.scss";
import { Heading } from "@/components/ui/Heading";
import { Trash } from "lucide-react";
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory } from "@/hooks/queries/categories/useCreateCategory";
import { useUpdateCategory } from "@/hooks/queries/categories/useUpdateCategory";
import { useDeleteCategory } from "@/hooks/queries/categories/useDeleteCategory";

interface CategoryFormProps {
    category?: ICategory;
}

export function CategoryForm({ category }: CategoryFormProps) {

    const { createCategory, isLoadingCreate } = useCreateCategory();
    const { updateCategory, isLoadingUpdate } = useUpdateCategory();
    const { deleteCategory, isLoadingDelete } = useDeleteCategory();

    const title = category ? "Edit category" : "Create category";
    const description = category ? "Edit the category" : "Add a new category to the store";
    const action = category ? "Save" : "Create";

    const form = useForm<ICategoryInput>({
        mode: "onChange",
        values: {
            title: category?.title ?? "",
            description: category?.description ?? "",
        },
    });

    const onSubmit = (data: ICategoryInput) => {
        if (category) {
            updateCategory(data);
        } else {
            createCategory(data);
        }
    };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Heading title={title} description={description} />
                { category && (
                    <ConfirmModal handleClick={() => deleteCategory()} buttonPositiveText="Delete">
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
                        name="title" 
                        rules={{
                            required: 'Title is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        placeholder="Category title" 
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
                        name="description" 
                        rules={{
                            required: 'Description is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Category description" 
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
