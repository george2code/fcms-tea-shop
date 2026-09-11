'use client';

import { useGetStore } from "@/hooks/queries/store/useGetStore";
import { Loader } from "@/components/ui/Loader";
import styles from './Store.module.scss';
import { Heading } from "@/components/ui/Heading";
import { MainStatistics } from "./statistics/main-statistics/MainStatistics";

export function Store() {
    const { store, isLoading } = useGetStore();

    if (isLoading) {
        return <Loader />;
    }

    return <div className={styles.wrapper}>
        
        <Heading title={store?.title || ''} description={store?.description || ''} />

    <MainStatistics />
    
    
    </div>;
}
