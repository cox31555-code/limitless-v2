"use client";
import React, { useState } from "react";
import styles from "./quoteProgressCard.module.css";

const QuoteProgressCard = ({ currentStep }) => {
  const [expandedStep, setExpandedStep] = useState(1);
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
    },
    {
      number: 3,
      title: "Your policy",
    },
    {
      number: 4,
      title: "Check your answers",
    },
  ];

  const totalSteps = 4;
  const progressPercentage = Math.round(((currentStep - 1) / totalSteps) * 100);

  const toggleStep = (stepNumber) => {
    if (stepNumber === currentStep) {
      setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
    }
  };

  return (
    <div className={`${styles.progressCard} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.progressHeader}>
        <div className={styles.progressHeaderContent}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {!isCollapsed && <span className={styles.progressText}>{progressPercentage}% complete</span>}
        </div>
        <button
          className={styles.collapseBtn}
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

      <div className={styles.stepsList}>
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isExpanded = expandedStep === step.number && step.subSteps;
          
          return (
            <div key={step.number} className={styles.stepItem}>
              <button
                className={`${styles.stepButton} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}
                onClick={() => toggleStep(step.number)}
                disabled={!isActive}
              >
                <div className={styles.stepIcon}>
                  {isCompleted ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span className={styles.stepNumber}>{step.number}</span>
                  )}
                </div>
                <span className={styles.stepTitle}>{step.title}</span>
                {isActive && step.subSteps && (
                  <svg
                    className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ""}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              {isActive && isExpanded && step.subSteps && (
                <ul className={styles.subStepsList}>
                  {step.subSteps.map((subStep, index) => (
                    <li key={index} className={styles.subStepItem}>
                      {subStep}
                    </li>
                  ))}
                </ul>
              )}

              {step.number < steps.length && (
                <div className={`${styles.connector} ${(isCompleted || isActive) ? styles.connectorActive : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuoteProgressCard;
