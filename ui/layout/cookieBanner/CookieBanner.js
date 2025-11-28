'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cookieBanner.module.css';
import CookiePreferencesModal from './CookiePreferencesModal';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      functional: true,
      marketing: true,
      analytics: true,
    };
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const preferences = {
      functional: true,
      marketing: false,
      analytics: false,
    };
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleCustomise = () => {
    setIsModalOpen(true);
  };

  const handleSavePreferences = (preferences) => {
    localStorage.setItem('cookieConsent', 'customised');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={styles.cookieBanner}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" className={styles.cookieIcon} xmlns="http://www.w3.org/2000/svg">
                <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.938.005-.034.016-.134.017-.168a.998.998 0 0 0-1.254-1.006A3.002 3.002 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM8.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.5-6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#0052a3"/>
              </svg>
            </div>
            <div className={styles.textContent}>
              <h3 className={styles.title}>Choose your cookie preferences</h3>
              <p className={styles.description}>
                Cookies help us make this website work better for you. Some cookies are essential for the site to function, while others let us personalise your experience. It's up to you which cookies you accept. For more details on how we use cookies to enhance your experience, you can read our{' '}
                <a href="/cookies-policy" className={styles.link}>
                  cookie policy
                </a>.
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              onClick={handleAcceptAll}
              className={styles.acceptButton}
              aria-label="Accept All Cookies"
            >
              Accept all
            </button>
            <button
              onClick={handleRejectAll}
              className={styles.rejectButton}
              aria-label="Reject All Cookies"
            >
              Reject all
            </button>
            <button
              onClick={handleCustomise}
              className={styles.customiseButton}
              aria-label="Customise Cookie Settings"
            >
              Customise
            </button>
          </div>
        </div>
      </div>

      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePreferences}
      />
    </>
  );
};

export default CookieBanner;
