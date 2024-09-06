import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Welcome to Tamalou</h1>
            <p>Your personal essential oil recipe generator for everyday aches and pains.</p>
            <div className={styles.buttons}>
                <Link href="/register" className={styles.button}>
                    Register
                </Link>
                <Link href="/login" className={styles.button}>
                    Login
                </Link>
            </div>
        </div>
    );
}
