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

  const handleClose = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  const handlePolicyClick = () => {
    router.push('/cookies-policy');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.content}>
        <p className={styles.text}>
          This website uses cookies to ensure you get the best experience on our website.
        </p>
        <div className={styles.actions}>
          <button
            onClick={handlePolicyClick}
            className={styles.policyButton}
            aria-label="View Cookie Policy"
          >
            Cookie Policies
          </button>
          <button
            onClick={handleAccept}
            className={styles.acceptButton}
            aria-label="Accept Cookies"
          >
            Accept Cookies
          </button>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close Cookie Banner"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
