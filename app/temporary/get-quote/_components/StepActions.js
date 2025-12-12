"use client";
import React from "react";
import styles from "./stepActions.module.css";

const StepActions = ({
  onBack,
  onNext,
  onSubmit,
  currentStep,
  totalSteps,
  isLoading = false,
  backLabel = "Back",
  nextLabel = "Next",
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

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
        type="button"
        className={styles.nextBtn}
        onClick={isLastStep ? onSubmit : onNext}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isLastStep ? nextLabel : "Next"}
      </button>
    </div>
  );
};

export default StepActions;
