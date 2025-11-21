"use client";

import React from "react";
import styles from "./quoteHeader.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const QuoteHeader = ({ priceAmount = "49.99", userName = "there", insuranceType = "Temporary Insurance" }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <h2 className={`${styles.greeting} ${plusJakartaSans.className}`}>
          Hi {userName},
        </h2>
        <p className={styles.subtitle}>here's your {insuranceType.toLowerCase()}</p>
      </div>

      <div className={styles.priceDisplay}>
        <p className={`${styles.price} ${plusJakartaSans.className}`}>
          £{priceAmount}
        </p>
        <p className={styles.priceLabel}>/month</p>
      </div>

      <p className={styles.disclaimer}>
        All figures include Interest and Insurance Premium Tax
      </p>
    </div>
  );
};

export default QuoteHeader;
