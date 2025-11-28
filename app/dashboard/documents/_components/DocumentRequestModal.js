'use client';

import { useState, useEffect } from 'react';
import styles from './documentRequestModal.module.css';

const DocumentRequestModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Processing your request...</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Request completed</h2>

            <p className={styles.description}>
              Your request has been successfully submitted. You will receive your policy documents by post within the next 3-15 working days at the address listed on your policy.
            </p>

            <p className={styles.note}>
              If your documents don't arrive within 15 working days, please contact customer support.
            </p>

            <button onClick={onClose} className={styles.closeButton}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentRequestModal;
