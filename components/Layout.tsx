import { ReactNode } from 'react';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  showVideo?: boolean;
}

export default function Layout({ children, showVideo = true }: LayoutProps) {
  return (
    <div className={styles.container}>
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.backgroundVideo}
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
      )}
      <div className={styles.overlay} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
} 