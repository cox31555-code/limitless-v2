"use client";
import React, { useState } from "react";
import styles from "./quoteProgressSidebar.module.css";
import { useRouter } from "next/navigation";

const QuoteProgressSidebar = ({ currentStep, currentSubStep = null }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
      <div className={styles.sidebarContent}>
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            {!isCollapsed && <span className={styles.progressText}>{Math.round(progressPercentage)}% complete</span>}
            <div className={styles.controlBtns}>
              <button
                className={styles.controlBtn}
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? "Expand" : "Collapse"}
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                {isCollapsed ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
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
            const isNextStepCompleted = currentStep > step.number + 1;

            return (
              <div key={step.number} className={styles.stepWrapper}>
                <div className={`${styles.step} ${isActive ? styles.stepActive : ""} ${isCompleted ? styles.stepCompleted : ""}`}>
                  <div className={styles.stepIcon}>
                    {isCompleted ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" fill="#0388ff"/>
                        <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <div className={`${styles.connector} ${isCompleted || isActive ? styles.connectorCompleted : ""}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuoteProgressSidebar;
