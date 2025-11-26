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
  coverSubStep,
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
  // - On step 2 (PERSONAL) and in any sub-step (always show back for personal), OR
  // - On step 3 (COVER) and in additional drivers substep
  const showBackButton = !isFirstStep || (currentStep === 1 && vehicleSubStep !== "registration") || (currentStep === 2) || (currentStep === 3 && coverSubStep === "additionalDrivers");

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
