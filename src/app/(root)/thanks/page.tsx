import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import styles from '../hero/Hero.module.scss'
import { PUBLIC_URL } from "@/config/url.config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: 'Thank you for your order!',
    ...NO_INDEX_PAGE
}

export default function ThanksPage() {
    return (
        <div className={styles.section}>
            <h1 className={styles.heading}>
                Thanks for your order!
            </h1>
            <p className={styles.description}>Thank you for your order! We will contact you soon. 
                You can always check your order in the personal cabinet.</p>
            <Link href={PUBLIC_URL.home()}>
                <Button variant={'primary'} size={'lg'}>To the home page <ArrowRight /></Button>
            </Link>
        </div>
    )
}