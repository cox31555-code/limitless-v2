"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./quoteProgressCard.module.css";

const STEPS = {
  VEHICLE: 1,
  PERSONAL: 2,
  COVER: 3,
  CHECK_ANSWERS: 4,
};

const QuoteProgressCard = ({ currentStep, vehicleSubStep, personalSubStep, coverSubStep }) => {
  // Auto-expand steps 2 and 3 (PERSONAL and COVER)
  const [expandedStep, setExpandedStep] = useState(currentStep);
  const [lineHeight, setLineHeight] = useState(0);
  const stepsListRef = useRef(null);

  // Map substeps to their corresponding keys
  const getActiveSubStepIndex = (stepNumber) => {
    if (stepNumber === STEPS.VEHICLE) {
      const subStepMap = { "registration": 0, "carValue": 1, "carUsage": 2, "carStorage": 3, "otherCars": 4 };
      return subStepMap[vehicleSubStep] ?? -1;
    }
    if (stepNumber === STEPS.PERSONAL) {
      const subStepMap = { "aboutYou": 0, "household": 1, "employment": 2, "licence": 3, "restrictions": 4, "claims": 5 };
      return subStepMap[personalSubStep] ?? -1;
    }
    if (stepNumber === STEPS.COVER) {
      const subStepMap = { "additionalDrivers": 0, "carOwner": 1, "cover": 2, "ncd": 3, "additionalProducts": 4, "contactInformation": 5 };
      return subStepMap[coverSubStep] ?? -1;
    }
    return -1;
  };

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

  // Calculate detailed progress including substeps
  const calculateOverallProgress = () => {
    let totalSubSteps = 0;
    let completedSubSteps = 0;

    steps.forEach((step) => {
      const stepSubStepsCount = step.subSteps ? step.subSteps.length : 1;
      totalSubSteps += stepSubStepsCount;

      if (step.number < currentStep) {
        // Completed steps
        completedSubSteps += stepSubStepsCount;
      } else if (step.number === currentStep) {
        // Current step - add progress based on current substep
        const activeIndex = getActiveSubStepIndex(step.number);
        if (activeIndex >= 0) {
          completedSubSteps += activeIndex + 1;
        } else {
          // If no substeps, count as 1 completed
          completedSubSteps += 1;
        }
      }
    });

    return Math.round((completedSubSteps / totalSubSteps) * 100);
  };

  const progressPercentage = calculateOverallProgress();

  // Calculate main vertical line fill percentage
  const calculateMainLineProgress = () => {
    const totalStepGaps = totalSteps - 1; // 3 gaps between 4 steps

    let progress = 0;

    steps.forEach((step, index) => {
      if (step.number < currentStep) {
        // Completed step - fill this segment 100%
        progress += (1 / totalStepGaps) * 100;
      } else if (step.number === currentStep && index < totalSteps - 1) {
        // Current step - partial fill based on substep progress
        const stepSubStepsCount = step.subSteps ? step.subSteps.length : 1;
        const activeIndex = getActiveSubStepIndex(step.number);
        const substepProgress = activeIndex >= 0 ? (activeIndex + 1) / stepSubStepsCount : 0;
        progress += (substepProgress / totalStepGaps) * 100;
      }
    });

    return Math.min(progress, 100);
  };

  const mainLineProgress = calculateMainLineProgress();

  // Calculate actual pixel height for the progress line
  useEffect(() => {
    if (stepsListRef.current) {
      const activeSubStepElement = stepsListRef.current.querySelector(`.${styles.activeSubStep}`);
      if (activeSubStepElement) {
        // Get the position of the active substep
        const activePos = activeSubStepElement.getBoundingClientRect();
        const containerPos = stepsListRef.current.getBoundingClientRect();
        const relativeTop = activePos.top - containerPos.top;
        const relativeBottom = relativeTop + activePos.height;
        // Set line height to reach the active substep plus extra padding
        const extraPadding = 12; // Extra padding on top of active substep
        setLineHeight(relativeBottom - 28 + extraPadding); // 28px is the top offset
      } else {
        // If no active substep, calculate based on progress percentage
        const containerHeight = stepsListRef.current.offsetHeight;
        const extraPadding = 12;
        setLineHeight((containerHeight - 56) * (mainLineProgress / 100) + extraPadding);
      }
    }
  }, [currentStep, vehicleSubStep, personalSubStep, coverSubStep, mainLineProgress]);

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

      <div ref={stepsListRef} className={styles.stepsList} style={{ '--line-height': `${Math.max(0, lineHeight)}px` }}>
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          // Auto-expand current step
          const isExpanded = (step.number === currentStep || expandedStep === step.number) && step.subSteps;
          const activeSubStepIndex = isActive ? getActiveSubStepIndex(step.number) : -1;

          // Calculate substep progress percentage
          let substepProgress = 0;
          if (isActive && step.subSteps && activeSubStepIndex >= 0) {
            substepProgress = ((activeSubStepIndex + 1) / step.subSteps.length) * 100;
          } else if (isCompleted) {
            substepProgress = 100;
          }
          
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

              {isExpanded && step.subSteps && (
                <ul className={styles.subStepsList}>
                  {step.subSteps.map((subStep, index) => {
                    const isActiveSubStep = isActive && activeSubStepIndex === index;
                    return (
                      <li key={index} className={`${styles.subStepItem} ${isActiveSubStep ? styles.activeSubStep : ""}`}>
                        {subStep}
                      </li>
                    );
                  })}
                </ul>
              )}

              {step.number < steps.length && (
                <div
                  className={`${styles.connector} ${(isCompleted || isActive) ? styles.connectorActive : ""}`}
                  style={{
                    '--substep-progress': `${substepProgress}%`
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuoteProgressCard;
