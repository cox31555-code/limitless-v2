"use client";
import React from "react";
import styles from "./stepActions.module.css";

const StepActions = ({
  onBack,
  onNext,
  currentStep,
  totalSteps,
  isLoading = false,
  backLabel = "Back",
  nextLabel = "Next",
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  console.log("StepActions rendered:", { currentStep, totalSteps, isLastStep, nextLabel });

  return (
    <div className={styles.actionsContainer}>
      {!isFirstStep ? (
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          disabled={isLoading}
        >
          {backLabel}
        </button>
      ) : (
        <div className={styles.spacer} />
      )}

      <button
        type={isLastStep ? "submit" : "button"}
        className={styles.nextBtn}
        onClick={!isLastStep ? onNext : undefined}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isLastStep ? nextLabel : "Next"}
      </button>
    </div>
  );
};

export default StepActions;
