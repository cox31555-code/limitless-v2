'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cookieBanner.module.css';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleSettings = () => {
    localStorage.setItem('cookieConsent', 'settings');
    router.push('/cookies-policy');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24" fill="none" className={styles.cookieIcon}>
              <circle cx="12" cy="12" r="10" fill="#3B82F6" opacity="0.2"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#3B82F6"/>
              <circle cx="8.5" cy="10.5" r="1.5" fill="#3B82F6"/>
              <circle cx="15.5" cy="10.5" r="1.5" fill="#3B82F6"/>
              <circle cx="12" cy="15" r="1.5" fill="#3B82F6"/>
              <circle cx="9" cy="13" r="1" fill="#3B82F6"/>
              <circle cx="15" cy="13" r="1" fill="#3B82F6"/>
            </svg>
          </div>
          <p className={styles.text}>
            We use cookies to ensure that we give you the best experience on our website.{' '}
            <button onClick={handleSettings} className={styles.link}>
              Read cookies policies.
            </button>
          </p>
        </div>
        <div className={styles.actions}>
          <button
            onClick={handleSettings}
            className={styles.settingsButton}
            aria-label="Cookie Settings"
          >
            Cookie Setting
          </button>
          <button
            onClick={handleAccept}
            className={styles.acceptButton}
            aria-label="Accept All Cookies"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
