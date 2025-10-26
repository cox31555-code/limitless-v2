import React from "react";
import styles from "./stepper.module.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Stepper = ({ steps, currentStep = 2 }) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className={styles.stepperContainer}>
            <div className={styles.stepperItem}>
              <div
                className={`${styles.stepperNumber} ${manrope.className}`}
                style={{
                  background: isCompleted
                    ? "rgba(16, 185, 129, 0.25)"
                    : isActive
                    ? "rgba(3, 136, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isCompleted
                    ? "inset 0 0 0 2px rgba(16, 185, 129, 0.6)"
                    : isActive
                    ? "inset 0 0 0 2px rgba(3, 136, 255, 0.8)"
                    : "inset 0 0 0 2px rgba(255, 255, 255, 0.2)",
                  color: isCompleted
                    ? "#10b981"
                    : isActive
                    ? "#0388ff"
                    : "rgba(255, 255, 255, 0.5)",
                }}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
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
