'use client';

import { useState } from "react"
import styles from './Auth.module.scss';
import { useAuthForm } from "./useAuthForm";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AuthFields } from "./AuthFields";
import { Social } from "./Social";

export function Auth() {

    const [isRegister, setIsRegister] = useState<boolean>(false);

    const { onSubmit, form, isPending } = useAuthForm(isRegister);


    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Image 
                    src={'/images/auth.svg'} 
                    alt='TeaShop' 
                    width={100} 
                    height={100} 
                />
            </div>
            <div className={styles.right}>
                <Card className={styles.card}>
                    <CardHeader className={styles.header}>
                        <CardTitle className={styles.title}>
                            <h3>
                                { isRegister ? 'Create account' : 'Login to your account' }
                            </h3>
                        </CardTitle>
                        <CardDescription>
                            Login or register your account to continue shopping!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                                <AuthFields form={form} isPending={isPending} isRegister={isRegister} />
                                <Button type="submit" disabled={isPending}>Continue</Button>
                            </form>
                        </Form>
                        {/* Social */}
                        <Social />
                    </CardContent>
                    <CardFooter className={styles.footer}>
                        { isRegister ? 'Already have an account?' : 'Don\'t have an account?' }
                        <Button
                            type="button"
                            variant='link'
                            className={styles.link}
                            onClick={(event) => {
                                event.preventDefault();
                                setIsRegister((prev) => !prev);
                            }}
                        >
                            { isRegister ? 'Login' : 'Register' }
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}