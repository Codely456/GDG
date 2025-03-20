import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import ProtectedRoute from '../components/ProtectedRoute';
import { onAuthStateChange } from '../firebase';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <ProtectedRoute>
      <Layout>
        <Navigation />
        <div className={styles.profile}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" />
              ) : (
                <div className={styles.placeholder}>
                  {user.displayName?.[0] || 'U'}
                </div>
              )}
            </div>
            <h1>{user.displayName}</h1>
            <p>{user.email}</p>
          </div>

          <div className={styles.content}>
            <div className={styles.section}>
              <h2>Profile Information</h2>
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <label>Display Name</label>
                  <p>{user.displayName}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Email Verified</label>
                  <p>{user.emailVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
} 