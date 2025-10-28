"use client";
import React from "react";
import styles from "./getQuoteHeader.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const GetQuoteHeader = ({ title, currentStep, totalSteps }) => {
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  
  const progressPercentage = totalSteps ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.centeredContent}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.titleWrapper}>
              <h1 className={`${styles.title} ${plusJakartaSans.className}`}>
                {withoutLastWord}{" "}
                <span className={styles.titleSpan}>
                  {lastWord}
                </span>
              </h1>
            </div>

            {totalSteps && (
              <div className={styles.progressSection}>
                <p className={`${styles.stepLabel} ${manrope.className}`}>
                  Step {currentStep} of {totalSteps}
                </p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuoteHeader;
