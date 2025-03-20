import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
import { signInWithGoogle, onAuthStateChange } from '../firebase';
import Layout from '../components/Layout';
import styles from '../styles/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user: User | null) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, error } = await signInWithGoogle();
      
      if (error) {
        setError(error);
      } else if (user) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Welcome to GDG</h1>
          <p className={styles.subtitle}>Sign in to continue</p>

          {error && <div className={styles.error}>{error}</div>}

          <button
            className={styles.googleButton}
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className={styles.googleIcon}
                />
                Sign in with Google
              </>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
} 