import { useCreateProduct } from "@/hooks/queries/products/useCreateProduct";
import { IProduct, IProductInput } from "@/shared/types/product.interface";
import { ICategory } from "@/shared/types/category.interface";
import { IColor } from "@/shared/types/color.interface";
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

interface ProductFormProps {
    product?: IProduct;
    categories: ICategory[];
    colors: IColor[];
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {

    const { createProduct, isLoadingCreate } = useCreateProduct();
    const { updateProduct, isLoadingUpdate } = useUpdateProduct();
    const { deleteProduct, isLoadingDelete } = useDeleteProduct();

    const title = product ? "Edit product" : "Create product";
    const description = product ? "Edit the product" : "Add a new product to the store";
    const action = product ? "Save" : "Create";

    const form = useForm<IProductInput>({
        mode: "onChange",
        values: {
            title: product?.title ?? "",
            description: product?.description ?? "",
            price: product?.price ?? 0,
            images: product?.images ?? [],
            categoryId: product?.category?.id ?? "",
            colorId: product?.color?.id ?? "",
        },
    });

    const onSubmit = (data: IProductInput) => {
        data.price = Number(data.price);

        if (product) {
            updateProduct(data);
        } else {
            createProduct(data);
        }
    };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Heading title={title} description={description} />
                { product && (
                    <ConfirmModal handleClick={() => deleteProduct()} buttonPositiveText="Delete">
                        <Button size='icon' disabled={isLoadingDelete}>
                            <Trash className="size-4" />
                        </Button>
                    </ConfirmModal>
                )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                    {/* Images upload */}
                    <FormField 
                        control={form.control} 
                        name="images" 
                        rules={{
                            required: 'Load at least one image',
                        }}
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        isDisabled={isLoadingCreate || isLoadingUpdate} 
                                        onChange={field.onChange} 
                                        value={field.value} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                        placeholder="Product name" 
                                        disabled={isLoadingCreate || isLoadingUpdate} 
                                        {...field} 
                                        value={field.value ?? ''} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control} 
                        name="price" 
                        rules={{
                            required: 'Price is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder="Price" 
                                        disabled={isLoadingCreate || isLoadingUpdate} 
                                        {...field} 
                                        value={field.value ?? ''} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control} 
                        name="categoryId" 
                        rules={{
                            required: 'Category is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select 
                                    disabled={isLoadingCreate || isLoadingUpdate} 
                                    onValueChange={(value) => field.onChange(value ?? "")} 
                                    value={field.value || null}
                                    items={categories.map((category) => ({
                                        value: category.id,
                                        label: category.title,
                                    }))}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Product category" />
                                        </SelectTrigger>
                                    </FormControl>
                                        <SelectContent alignItemWithTrigger={false}>
                                            <SelectGroup>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control} 
                        name="colorId" 
                        rules={{
                            required: 'Color is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <Select 
                                    disabled={isLoadingCreate || isLoadingUpdate} 
                                    onValueChange={(value) => field.onChange(value ?? "")} 
                                    value={field.value || null}
                                    items={colors.map((color) => ({
                                        value: color.id,
                                        label: color.name,
                                    }))}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Product color" />
                                        </SelectTrigger>
                                    </FormControl>
                                        <SelectContent alignItemWithTrigger={false}>
                                            <SelectGroup>
                                                {colors.map((color) => (
                                                    <SelectItem key={color.id} value={color.id}>
                                                        {color.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                </Select>
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
                                        placeholder="Store description" 
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