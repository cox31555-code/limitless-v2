"use client";
import React from "react";
import styles from "./quoteNavButtons.module.css";

const QuoteNavButtons = ({
  onBack,
  onNext,
  onSubmit,
  currentStep,
  vehicleSubStep,
  personalSubStep,
  totalSteps,
  isLoading = false,
  backLabel = "Back",
  nextLabel = "Next",
  disabled = false,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  // Show back button if:
  // - Not on first step, OR
  // - On step 1 but in a vehicle sub-step after registration, OR
  // - On step 2 (PERSONAL) and in a personal sub-step
  const showBackButton = !isFirstStep || (currentStep === 1 && vehicleSubStep !== "registration") || (currentStep === 2 && (personalSubStep === "household" || personalSubStep === "employment"));

  return (
    <div className={styles.navContainer}>
      <div className={styles.navContent}>
        {showBackButton && (
          <button
            type="button"
            className={styles.backBtn}
            onClick={onBack}
            disabled={isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {backLabel}
          </button>
        )}

        <button
          type="button"
          className={styles.nextBtn}
          onClick={isLastStep ? onSubmit : onNext}
          disabled={isLoading || disabled}
        >
          {isLoading ? (
            <>
              <div className={styles.spinner} />
              Loading...
            </>
          ) : (
            nextLabel
          )}
        </button>
      </div>
    </div>
  );
};

export default QuoteNavButtons;
