"use client";
import React from "react";
import styles from "./quoteHeader.module.css";

const QuoteHeader = ({ currentStep = 1, totalSteps = 4, subtitle }) => {
  const stepNames = ["Car Details", "Your Details", "Your Policy", "Check Your Answers"];
  const displayName = subtitle || stepNames[currentStep - 1];

  return (
    <section className={styles.heroSection} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>Annual Car Insurance Quote</h1>
          <div className={styles.stepInfo}>
            <span className={styles.stepBadge}>Step {currentStep} of {totalSteps}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.stepName}>{displayName}</span>
          </div>
        </div>
        
        <div className={styles.trustInfo}>
          <div className={styles.trustItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Secure & encrypted</span>
          </div>
          <div className={styles.trustItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>~5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteHeader;
