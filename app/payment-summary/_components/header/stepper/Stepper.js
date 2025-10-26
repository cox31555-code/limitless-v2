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
                    ? "rgba(16, 185, 129, 0.3)"
                    : isActive
                    ? "rgba(3, 136, 255, 0.4)"
                    : "rgba(255, 255, 255, 0.12)",
                  borderColor: isCompleted
                    ? "rgba(16, 185, 129, 0.6)"
                    : isActive
                    ? "rgba(3, 136, 255, 0.6)"
                    : "rgba(255, 255, 255, 0.2)",
                  color: isCompleted || isActive ? "#fff" : "rgba(255, 255, 255, 0.6)",
                  fontWeight: isActive ? "700" : "600",
                }}
              >
                {index + 1}
              </div>
              <p
                className={`${styles.stepperTitle} ${manrope.className}`}
                style={{
                  color: isActive ? "#fff" : "rgba(255, 255, 255, 0.75)",
                  fontWeight: isActive ? "600" : "500",
                }}
              >
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={isCompleted ? styles.stepperLine : styles.stepperLine2}
                style={{
                  background: isCompleted
                    ? "rgba(16, 185, 129, 0.4)"
                    : "rgba(255, 255, 255, 0.12)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
