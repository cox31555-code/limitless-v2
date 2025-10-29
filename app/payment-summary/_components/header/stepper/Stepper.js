import React from "react";
import styles from "./stepper.module.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Stepper = ({ steps, currentStep = 2, isGreyedOut = false }) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className={styles.stepperContainer}>
            <div className={styles.stepperItem}>
              {step.icon ? (
                <div className={`${styles.stepperIconWrapper} ${isGreyedOut ? styles.greyed : ""}`}>
                  <img
                    src={step.icon}
                    alt={step.title}
                    className={styles.stepperIcon}
                  />
                </div>
              ) : (
                <div
                  className={`${styles.stepperNumber} ${manrope.className}`}
                  style={{
                    background: isCompleted
                      ? "#0388ff"
                      : isActive
                      ? "rgba(3, 136, 255, 0.2)"
                      : "rgba(255, 255, 255, 0.08)",
                    boxShadow: isCompleted
                      ? "0 4px 12px rgba(3, 136, 255, 0.4)"
                      : isActive
                      ? "inset 0 0 0 2px rgba(3, 136, 255, 0.8)"
                      : "inset 0 0 0 2px rgba(255, 255, 255, 0.2)",
                    color: isCompleted
                      ? "#fff"
                      : isActive
                      ? "#0388ff"
                      : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
              )}
              <p className={`${styles.stepperTitle} ${manrope.className}`}>
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
