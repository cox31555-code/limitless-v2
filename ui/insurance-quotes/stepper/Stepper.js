import React from "react";
import styles from "./stepper.module.css";
import { Manrope } from "next/font/google";
import Image from "next/image";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Stepper = ({ currentStep = 1, totalSteps = 4, isPaymentPage = false }) => {
  const steps = [
    { title: "Vehicle Details", icon: "/svg/payment-step-1.svg" },
    { title: "Cover Details", icon: "/svg/payment-step-2.svg" },
    { title: "Personal Details", icon: "/svg/payment-step-3.svg" },
    { title: "Review Quote", icon: "/svg/payment-step-1.svg" },
  ];

  return (
    <div className={styles.stepper}>
      {steps.slice(0, totalSteps).map((step, index) => {
        const isCompleted = index < currentStep - 1;
        const isActive = index === currentStep - 1;
        const stepNumber = index + 1;

        return (
          <div key={index} className={styles.stepperContainer}>
            <div className={styles.stepperItem}>
              <div
                className={`${styles.stepperIconWrapper} ${
                  isPaymentPage ? styles.greyed : ""
                } ${isCompleted ? styles.completed : ""} ${
                  isActive ? styles.active : ""
                }`}
              >
                {step.icon ? (
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={32}
                    height={32}
                    className={styles.stepperIcon}
                  />
                ) : (
                  <span className={styles.stepNumber}>{stepNumber}</span>
                )}
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
