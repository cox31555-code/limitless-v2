'use client';

import styles from './documentRequestModal.module.css';

const DocumentRequestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  );
};

export default DocumentRequestModal;
