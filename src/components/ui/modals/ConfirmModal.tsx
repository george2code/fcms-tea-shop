'use client';

import { isValidElement, type PropsWithChildren } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../alert-dialog";

interface ConfirmModalProps {
    buttonPositiveText: string;
    handleClick: () => void;
}

export function ConfirmModal({ children, handleClick, buttonPositiveText }: PropsWithChildren<ConfirmModalProps>) {
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={isValidElement(children) ? children : <button type="button">{children}</button>}
            />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction 
                        className='bg-blue-500 hover:bg-blue-500/90' 
                        onClick={handleClick}
                    >{buttonPositiveText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
