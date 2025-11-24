"use client";
import React from "react";
import styles from "./quoteHeader.module.css";

const QuoteHeader = ({ currentStep = 1, totalSteps = 5 }) => {
  const benefits = [
    { icon: "⚡", text: "Instant quotes" },
    { icon: "💰", text: "Competitive rates" },
    { icon: "🛡️", text: "Comprehensive cover" },
    { icon: "✓", text: "Quick & easy" }
  ];

  return (
    <section className={styles.heroSection} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.leftContent}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Get Your Annual Car Insurance Quote</h1>
            <p className={styles.subtitle}>
              Complete {totalSteps} simple steps to get your personalized quote
            </p>
          </div>
          
          <div className={styles.progressIndicator}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <span className={styles.progressText}>
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitItem}>
              <span className={styles.benefitIcon}>{benefit.icon}</span>
              <span className={styles.benefitText}>{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteHeader;
