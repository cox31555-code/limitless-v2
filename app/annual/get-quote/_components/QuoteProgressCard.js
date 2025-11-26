"use client";
import React, { useState } from "react";
import styles from "./quoteProgressCard.module.css";

const STEPS = {
  VEHICLE: 1,
  PERSONAL: 2,
  COVER: 3,
  CHECK_ANSWERS: 4,
};

const QuoteProgressCard = ({ currentStep, vehicleSubStep, personalSubStep, coverSubStep }) => {
  const [expandedStep, setExpandedStep] = useState(currentStep);

  const steps = [
    {
      number: STEPS.VEHICLE,
      title: "Car details",
      subSteps: ["Your car", "Car value", "Car usage", "Car storage", "Other cars"],
    },
    {
      number: STEPS.PERSONAL,
      title: "Your details",
      subSteps: ["About you", "Your household", "Your employment", "Your licence", "Licence restrictions", "Claims and convictions"],
    },
    {
      number: STEPS.COVER,
      title: "Your policy",
      subSteps: ["Additional drivers", "Car owner", "Cover details", "No claims discount", "Additional products", "Contact information"],
    },
    {
      number: STEPS.CHECK_ANSWERS,
      title: "Check your answers",
    },
  ];

  const totalSteps = steps.length;
  const progressPercentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  const toggleStep = (stepNumber) => {
    if (stepNumber === currentStep) {
      setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
    }
  };

  return (
    <div className={styles.progressCard}>
      <div className={styles.progressHeader}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className={styles.progressText}>{progressPercentage}% complete</span>
      </div>

      <div className={styles.stepsList}>
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isExpanded = expandedStep === step.number && step.subSteps;
          
          return (
            <div key={step.number} className={styles.stepItem}>
              <div className={`${styles.stepButton} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}>
                <button
                  className={styles.stepButtonContent}
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
                </button>
                {isActive && step.subSteps && (
                  <button
                    className={styles.stepExpandBtn}
                    onClick={() => toggleStep(step.number)}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                )}
              </div>

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
