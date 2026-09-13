import styles from './Footer.module.scss';

export function Footer() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.footer}>
                teashop.com &copy; 2025 All rights reserved.
            </div>
        </div>
    )
}