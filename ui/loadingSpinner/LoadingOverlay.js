import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./loadingOverlay.module.css";

const LoadingOverlay = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop}></div>
      <div className={styles.spinnerContainer}>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default LoadingOverlay;
