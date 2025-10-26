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
                    ? "rgba(16, 185, 129, 0.2)"
                    : isActive
                    ? "rgba(3, 136, 255, 0.25)"
                    : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isCompleted
                    ? "inset 0 0 0 1.5px rgba(16, 185, 129, 0.5)"
                    : isActive
                    ? "inset 0 0 0 1.5px rgba(3, 136, 255, 0.6)"
                    : "inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
                  color: isCompleted
                    ? "rgba(16, 185, 129, 0.9)"
                    : isActive
                    ? "#0388ff"
                    : "rgba(255, 255, 255, 0.6)",
                  fontWeight: isActive ? "700" : "600",
                }}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <p
                className={`${styles.stepperTitle} ${manrope.className}`}
                style={{
                  color: isActive ? "#fff" : "rgba(255, 255, 255, 0.8)",
                  fontWeight: isActive ? "600" : "500",
                }}
              >
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
