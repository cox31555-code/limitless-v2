"use client";
import React from "react";
import styles from "./stepperProgress.module.css";

const StepperProgress = ({ currentStep, totalSteps, stepTitles }) => {
  const progressPercentage = ((currentStep) / totalSteps) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressHeader}>
        <div className={styles.stepInfo}>
          <h2 className={styles.stepTitle}>{stepTitles[currentStep - 1]}</h2>
          <p className={styles.stepCounter}>
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </div>
      
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className={styles.stepIndicators}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`${styles.stepIndicator} ${
              index + 1 <= currentStep ? styles.active : ""
            } ${index + 1 === currentStep ? styles.current : ""}`}
          >
            <span className={styles.stepNumber}>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepperProgress;
