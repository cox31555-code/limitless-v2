'use client';

import { useState } from 'react';
import styles from './cookiePreferencesModal.module.css';

const CookiePreferencesModal = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    functional: true,
    marketing: false,
    analytics: false,
  });

  if (!isOpen) return null;

  const handleToggle = (type) => {
    if (type === 'functional') return; // Functional cookies cannot be toggled off
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleRejectAll = () => {
    const rejected = {
      functional: true,
      marketing: false,
      analytics: false,
    };
    onSave(rejected);
    onClose();
  };

  const handleAcceptAll = () => {
    const accepted = {
      functional: true,
      marketing: true,
      analytics: true,
    };
    onSave(accepted);
    onClose();
  };

  const handleSaveSettings = () => {
    onSave(preferences);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Manage cookies</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            Cookies and other identifiers are used to improve your experience on websites and apps. Some information retrieved from your device may be shared with our analytics partners. You can manage your preferences below and change your consent at any time.{' '}
            <a href="/cookies-policy" className={styles.link}>
              Learn more.
            </a>
          </p>

          <div className={styles.cookieSection}>
            <div className={styles.cookieHeader}>
              <div className={styles.cookieInfo}>
                <h3 className={styles.cookieTitle}>Functional cookies</h3>
                <p className={styles.cookieDescription}>
                  These cookies are essential for the site to function and cannot be toggled off. They assist with security, user authentication, customer support, and other vital operations.
                </p>
              </div>
              <div className={styles.toggleWrapper}>
                <div className={`${styles.toggle} ${styles.toggleDisabled}`}>
                  <div className={styles.toggleSlider}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cookieSection}>
            <div className={styles.cookieHeader}>
              <div className={styles.cookieInfo}>
                <h3 className={styles.cookieTitle}>Marketing cookies</h3>
                <p className={styles.cookieDescription}>
                  These cookies help us measure the effectiveness of our marketing campaigns. To help deliver these campaigns, they may be shared with our third-party marketing partners.
                </p>
              </div>
              <div className={styles.toggleWrapper}>
                <button
                  onClick={() => handleToggle('marketing')}
                  className={`${styles.toggle} ${preferences.marketing ? styles.toggleActive : ''}`}
                  aria-label="Toggle marketing cookies"
                >
                  <div className={styles.toggleSlider}></div>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.cookieSection}>
            <div className={styles.cookieHeader}>
              <div className={styles.cookieInfo}>
                <h3 className={styles.cookieTitle}>Analytics cookies</h3>
                <p className={styles.cookieDescription}>
                  These cookies help us understand how visitors interact with our site. They allow us to measure traffic and improve site performance.
                </p>
              </div>
              <div className={styles.toggleWrapper}>
                <button
                  onClick={() => handleToggle('analytics')}
                  className={`${styles.toggle} ${preferences.analytics ? styles.toggleActive : ''}`}
                  aria-label="Toggle analytics cookies"
                >
                  <div className={styles.toggleSlider}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={handleRejectAll} className={styles.rejectButton}>
            Reject all
          </button>
          <button onClick={handleAcceptAll} className={styles.acceptButton}>
            Accept all
          </button>
          <button onClick={handleSaveSettings} className={styles.saveButton}>
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
