import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import Navigation from '../components/Navigation';
import { onAuthStateChange } from '../firebase';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProtectedRoute>
      <Layout>
        <Navigation />
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h1>Welcome, {user?.displayName}!</h1>
            <p>This is your personalized dashboard</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Profile</h3>
              <p>Manage your account settings and preferences</p>
            </div>
            <div className={styles.card}>
              <h3>Activities</h3>
              <p>Track your recent activities and progress</p>
            </div>
            <div className={styles.card}>
              <h3>Messages</h3>
              <p>View your messages and notifications</p>
            </div>
            <div className={styles.card}>
              <h3>Settings</h3>
              <p>Configure your application settings</p>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
} 