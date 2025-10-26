import React from "react";
import styles from "./stepper.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
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
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : isActive
                    ? "linear-gradient(135deg, #0388ff 0%, #0270cc 100%)"
                    : "rgba(255, 255, 255, 0.15)",
                  borderColor: isCompleted ? "#10b981" : isActive ? "#0388ff" : "rgba(255, 255, 255, 0.3)",
                  color: isCompleted || isActive ? "#fff" : "rgba(255, 255, 255, 0.7)",
                }}
              >
                {isCompleted ? (
                  <span style={{ fontSize: "1.6rem" }}>✓</span>
                ) : (
                  `${index + 1}`
                )}
              </div>
              <p
                className={`${styles.stepperTitle} ${plusJakartaSans.className}`}
                style={{
                  color: isActive ? "#fff" : "rgba(255, 255, 255, 0.7)",
                  fontWeight: isActive ? "700" : "600",
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
                    ? "linear-gradient(90deg, #10b981 0%, #059669 100%)"
                    : "rgba(255, 255, 255, 0.2)",
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
