import styles from './Sidebar.module.scss';
import { Logo } from '@/components/layouts/main-layout/header/logo/Logo';
import { Navigation } from './navigation/Navigation';

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <Navigation />
        </div>
    )
}