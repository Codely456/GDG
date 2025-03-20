import { ReactNode, useState, useEffect } from 'react';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  showVideo?: boolean;
}

export default function Layout({ children, showVideo = true }: LayoutProps) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className={`${styles.container} ${videoError ? styles.gradientBg : ''}`}>
      {showVideo && !videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.backgroundVideo}
          onError={() => setVideoError(true)}
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