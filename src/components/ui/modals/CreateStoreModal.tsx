'use client';

import { useCreateStore } from "@/hooks/queries/store/useCreateStore";
import { IStoreCreate } from "@/shared/types/store.interface";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Form } from "../form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../button";

export function CreateStoreModal({ children }: { children: ReactElement }) {
    const [isOpen, setIsOpen] = useState(false)

    const {createStore, isLoadingCreate} = useCreateStore();

    const form = useForm<IStoreCreate>({
        mode: 'onChange',
    })

    const onSubmit:SubmitHandler<IStoreCreate> = data => {
        createStore(data);
        setIsOpen(false);
    }

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full">
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Store</DialogTitle>
                <DialogDescription>Create a new store to manage your products and categories.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField 
                        control={form.control} name="title" rules={{
                            required: 'Title is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Store name" disabled={isLoadingCreate} {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoadingCreate}>Create</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}