import { authService } from "@/services/auth/auth.service";
import { IAuthForm } from "@/shared/types/auth.interface";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { DASHBOARD_URL } from "@/config/url.config";

export function useAuthForm(isRegister: boolean) {
    const router = useRouter();

    const form = useForm<IAuthForm>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['auth user'],
        mutationFn: (data: IAuthForm) => authService.main(isRegister ? 'register' : 'login', data),
        onSuccess: () => {
            form.reset();
            toast.success('You are logged in');
            router.replace(DASHBOARD_URL.home());
        },
        onError: (error) => {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error('Authorization error');
            }
        },
    })

    const onSubmit = (data: IAuthForm) => {
        mutate(data);
    }

    return { onSubmit, form, isPending }
}