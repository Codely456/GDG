import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { signInWithGoogle, signOutUser, onAuthStateChange } from '../firebase';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, error } = await signInWithGoogle();
      
      if (error) {
        setError(error);
      } else if (user) {
        console.log('Successfully signed in:', user.displayName);
        // Here you can redirect to your dashboard or home page
      }
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await signOutUser();
      if (error) {
        setError(error);
      }
    } catch (err) {
      setError('Failed to sign out. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {user ? (
          <>
            <h1 className={styles.title}>Welcome, {user.displayName}!</h1>
            <p className={styles.subtitle}>You are signed in</p>
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className={styles.profileImage}
              />
            )}
            <button
              className={styles.googleButton}
              onClick={handleSignOut}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                'Sign Out'
              )}
            </button>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Welcome</h1>
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
          </>
        )}
      </div>
    </div>
  );
} 