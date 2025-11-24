"use client";
import React from "react";
import styles from "./quoteNavButtons.module.css";

const QuoteNavButtons = ({
  onBack,
  onNext,
  onSubmit,
  currentStep,
  totalSteps,
  isLoading = false,
  backLabel = "Back",
  nextLabel = "Continue",
  disabled = false,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={styles.navContainer}>
      <div className={styles.navContent}>
        {!isFirstStep && (
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
            isLastStep ? nextLabel : "Continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default QuoteNavButtons;
