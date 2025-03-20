import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, signOutUser } from '../firebase';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/login');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          GDG
        </Link>

        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={styles.menuIcon}></span>
        </button>

        <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
          {user ? (
            <>
              <Link href="/dashboard" className={styles.link}>
                Dashboard
              </Link>
              <Link href="/profile" className={styles.link}>
                Profile
              </Link>
              <button onClick={handleSignOut} className={styles.signOutButton}>
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.link}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 