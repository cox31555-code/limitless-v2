'use client';

import styles from './documentRequestModal.module.css';

const DocumentRequestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#10b981"/>
            <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className={styles.title}>Request completed</h2>
        
        <p className={styles.description}>
          Your request has been successfully submitted. You will receive your policy documents by post within the next 3-15 working days at the address listed on your policy.
        </p>

        <p className={styles.note}>
          Please allow up to 15 working days for delivery. If you don't receive your documents within this timeframe, please contact our customer support team.
        </p>

        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DocumentRequestModal;
