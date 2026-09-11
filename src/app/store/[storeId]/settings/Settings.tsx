'use client';

import { useDeleteStore } from "@/hooks/queries/store/useDeleteStore";
import { useUpdateStore } from "@/hooks/queries/store/useUpdateStore";
import { IStoreUpdate } from "@/shared/types/store.interface";
import { useForm } from "react-hook-form";
import styles from '../Store.module.scss';
import { Heading } from "@/components/ui/Heading";
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Settings() {
    const { store, updateStore, isLoadingUpdate } = useUpdateStore();
    const { deleteStore, isLoadingDelete } = useDeleteStore();

    const form = useForm<IStoreUpdate>({
        mode: 'onChange',
        values: {
            title: store?.title || '',
            description: store?.description || '',
        },
    });

    const onSubmit = (data: IStoreUpdate) => {
        updateStore(data);
    }

    return <div className={styles.wrapper}>
        <div className={styles.header}>
            <Heading title="Settings" description="Settings of the store" />
            <ConfirmModal handleClick={() => deleteStore()} buttonPositiveText="Delete">
                <Button size="icon-lg" variant='default' disabled={isLoadingDelete}>
                    <Trash className="size-4" />
                </Button>
            </ConfirmModal>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                    <FormField 
                        control={form.control} name="title" rules={{
                            required: 'Title is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Store title" 
                                        disabled={isLoadingUpdate} 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField 
                    control={form.control} 
                    name="description" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Store description" 
                                    disabled={isLoadingUpdate} 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="py-4 px-6" disabled={isLoadingUpdate}>Save</Button>
          
            </form>
        </Form>
    </div>
}