'use client';

import { useProfile } from '@/hooks/useProfile';
import styles from './HeaderMenu.module.scss';
import { HeaderCart } from './header-cart/HeaderCart';
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/Loader';
import { LogOut } from 'lucide-react';
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal';
import Image from 'next/image';

export function HeaderMenu() {
    const { user, isLoading } = useProfile();


    return (
        <div className={styles.header_menu}>
            <HeaderCart />
            <Link href={PUBLIC_URL.explorer()}>
                <Button variant={'ghost'}>Catalog</Button>
            </Link>
            { isLoading ? (
                <Loader size='sm' />
            ) : user ? (
                <>
                    <Link href={DASHBOARD_URL.favorites()}>
                        <Button variant={'ghost'}>
                            Favorites
                        </Button>
                    </Link>
                    { user.stores.length ? (
                        <Link href={STORE_URL.home(user.stores[0].id)}>
                            <Button variant={'ghost'}>My stores</Button>
                        </Link>
                    ) : (
                        <CreateStoreModal>
                            <Button variant={'ghost'}>Create store</Button>
                        </CreateStoreModal>
                    )}

                    <Link href={DASHBOARD_URL.home()}>
                        <Image 
                            src={user.picture} 
                            alt={user.name} 
                            width={42} 
                            height={42} 
                            className={styles.avatar} 
                        />
                    </Link>
                </>
            ) : (
                <Link href={PUBLIC_URL.auth()}>
                    <Button variant={'link'}>
                        <LogOut className={styles.icon} />
                        Login
                    </Button>
                </Link>
            )}
        </div>
    )
}