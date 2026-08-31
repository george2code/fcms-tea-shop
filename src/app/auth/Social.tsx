import { SERVER_URL } from "@/config/api.config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import styles from './Auth.module.scss';
import { FaYandex } from "react-icons/fa";

export function Social() {
    const router = useRouter();

    return (
        <div className={styles.social}>
            <Button variant='outline' onClick={() => router.push(`${SERVER_URL}/auth/google`)}>
                <FcGoogle /> 
                Continue with Google
            </Button>
            <Button variant='outline' onClick={() => router.push(`${SERVER_URL}/auth/github`)}>
                <FaYandex color='#FC3F1D' /> Continue with Yandex
            </Button>
        </div>
    )
}