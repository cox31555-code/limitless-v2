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
            <svg viewBox="0 0 24 24" fill="none" className={styles.cookieIcon} xmlns="http://www.w3.org/2000/svg">
              <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.938.005-.034.016-.134.017-.168a.998.998 0 0 0-1.254-1.006A3.002 3.002 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM8.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.5-6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#0388ff"/>
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
