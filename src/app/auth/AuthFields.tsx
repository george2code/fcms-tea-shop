'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validEmail } from "@/shared/regext";
import { IAuthForm } from "@/shared/types/auth.interface";
import { UseFormReturn } from "react-hook-form";

interface AuthFieldsProps {
    form: UseFormReturn<IAuthForm>;
    isPending: boolean;
    isRegister?: boolean;
}

export function AuthFields({ form, isPending, isRegister = false }: AuthFieldsProps) {
    return <>
        <div>{isRegister ? 'Register' : 'Login'}</div>
        {isRegister && (
            <>
                <FormField 
                    control={form.control} name="name" rules={{
                        required: 'Name is required',
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Name" disabled={isPending} {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control} name="email" rules={{
                        required: 'Email is required',
                        pattern: {
                            value: validEmail,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Email" disabled={isPending} {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control} name="password" rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long',
                        },
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="******" disabled={isPending} {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </>



            
        )}
    </>
}