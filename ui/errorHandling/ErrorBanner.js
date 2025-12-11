"use client";

import React, { useEffect } from "react";
import { useError } from "@/contexts/ErrorContext";
import styles from "./errorBanner.module.css";

const ErrorBanner = () => {
  const { errors, removeError } = useError();

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className={styles.errorContainer}>
      {errors.map((error) => (
        <ErrorMessage key={error.id} error={error} onDismiss={() => removeError(error.id)} />
      ))}
    </div>
  );
};

const ErrorMessage = ({ error, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleRetry = () => {
    if (error.action && typeof error.action === "function") {
      error.action();
      onDismiss();
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <div className={styles.message}>
          <p className={styles.text}>{error.message}</p>
        </div>
        <div className={styles.actions}>
          {error.action && (
            <button className={styles.retryBtn} onClick={handleRetry}>
              Try Again
            </button>
          )}
          <button className={styles.closeBtn} onClick={onDismiss} aria-label="Close error">
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
