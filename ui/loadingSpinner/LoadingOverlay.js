import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./loadingOverlay.module.css";

const LoadingOverlay = ({ isVisible = true, text = "Calculating your quote" }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop}></div>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinnerBox}>
          <LoadingSpinner />
          {text && (
            <p className={styles.loadingText}>
              {text}
              <span className={styles.dots}></span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
