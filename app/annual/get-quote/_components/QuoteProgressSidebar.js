"use client";
import React from "react";
import styles from "./quoteProgressSidebar.module.css";
import { useRouter } from "next/navigation";

const QuoteProgressSidebar = ({ currentStep, currentSubStep = null }) => {
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: "Car details",
      subSteps: ["Your car", "Car value", "Car usage", "Car storage", "Other cars"],
    },
    {
      number: 2,
      title: "Your details",
      subSteps: [],
    },
    {
      number: 3,
      title: "Your policy",
      subSteps: [],
    },
    {
      number: 4,
      title: "Check your answers",
      subSteps: [],
    },
  ];

  const totalSteps = 4;
  const progressPercentage = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressText}>{Math.round(progressPercentage)}% complete</span>
            <button className={styles.collapseBtn} aria-label="Collapse">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className={styles.stepWrapper}>
                <div className={`${styles.step} ${isActive ? styles.stepActive : ""} ${isCompleted ? styles.stepCompleted : ""}`}>
                  <div className={styles.stepIcon}>
                    {isCompleted ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" fill="#0388ff"/>
                        <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : isActive ? (
                      <div className={styles.activeCircle} />
                    ) : (
                      <div className={styles.stepNumber}>{step.number}</div>
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    {isActive && step.subSteps.length > 0 && (
                      <ul className={styles.subSteps}>
                        {step.subSteps.map((subStep, subIndex) => (
                          <li 
                            key={subIndex} 
                            className={`${styles.subStep} ${currentSubStep === subIndex ? styles.subStepActive : ""}`}
                          >
                            {subStep}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`${styles.connector} ${isCompleted ? styles.connectorCompleted : ""}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.accountSection}>
          <button className={styles.accountBtn}>
            Your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteProgressSidebar;
