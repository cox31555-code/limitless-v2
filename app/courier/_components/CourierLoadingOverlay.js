"use client";
import React, { useEffect, useState } from "react";
import styles from "./courierLoadingOverlay.module.css";

const CourierLoadingOverlay = ({ isVisible = true }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <div className={styles.logoContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2Fa5470607b0aa45bb9ec7fa562d56a817"
            alt="Limitless Cover Logo"
            className={styles.logo}
          />
          <div className={styles.pulseRing}></div>
        </div>
        <h2 className={styles.title}>Searching our trusted providers</h2>
        <p className={styles.subtitle}>This won't take long...</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourierLoadingOverlay;
