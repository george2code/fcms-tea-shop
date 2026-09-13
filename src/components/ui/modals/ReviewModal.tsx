'use client';

import { useCreateReview } from "@/hooks/queries/review/useCreateReview";
import { IReviewInput } from "@/shared/types/review.interface";
import { isValidElement, PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Rating } from "react-simple-star-rating";
import { Textarea } from "../textarea";
import { Button } from "../button";

interface ReviewModalProps {
    storeId: string;
}

export function ReviewModal({ children, storeId }: PropsWithChildren<ReviewModalProps>) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<IReviewInput>({
        mode: 'onChange',
        defaultValues: {
            rating: 0,
            text: '',
        },
    });

    const { createReview, isLoadingCreate } = useCreateReview(storeId);

    const onSubmit = (data: IReviewInput) => {
        createReview(data);
        form.reset();
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                render={isValidElement(children) ? children : <button type="button">{children}</button>}
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Review</DialogTitle>
                    <DialogDescription>Add a review to the product</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="rating"
                            rules={{
                                required: 'Rating is required',
                                min: { value: 1, message: 'Rating is required' },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Rating 
                                            onClick={field.onChange} 
                                            initialValue={field.value} 
                                            SVGclassName="inline-block" 
                                            size={20} 
                                            transition
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="text"
                            rules={{
                                required: 'Text is required',
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review text</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value ?? ''} placeholder="Write your review here" disabled={isLoadingCreate} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" variant="primary" disabled={isLoadingCreate}>Add</Button>
                        </div>
                    </form>
                </Form>


                
            </DialogContent>
        </Dialog>
    )
}