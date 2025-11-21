"use client";

import React, { useState } from "react";
import styles from "./paymentOptions.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const PaymentOptions = ({ monthlyPrice = 47.40, annualPrice = 525.65, defaultPayment = "annual" }) => {
  const [selectedPayment, setSelectedPayment] = useState(defaultPayment);

  const totalMonthly = (monthlyPrice * 12).toFixed(2);
  const monthlySavings = (totalMonthly - annualPrice).toFixed(2);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          How'd you like to pay?
        </h2>
      </div>

      <div className={styles.optionsGrid}>
        {/* Monthly Option */}
        <div
          className={`${styles.paymentCard} ${
            selectedPayment === "monthly" ? styles.paymentCardActive : ""
          }`}
          onClick={() => setSelectedPayment("monthly")}
        >
          <div className={styles.cardHeader}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Monthly
            </h3>
            <div className={styles.radioButton}>
              {selectedPayment === "monthly" && (
                <div className={styles.radioDot} />
              )}
            </div>
          </div>

          <div className={styles.priceSection}>
            <p className={`${styles.mainPrice} ${plusJakartaSans.className}`}>
              £{monthlyPrice.toFixed(2)}
            </p>
            <p className={styles.priceLabel}>/month</p>
          </div>

          <div className={styles.details}>
            <p className={styles.detailLabel}>Total paid</p>
            <p className={`${styles.detailPrice} ${plusJakartaSans.className}`}>
              £{totalMonthly}
            </p>
          </div>

          <div className={styles.savings}>
            <p className={styles.savingsLabel}>
              £{monthlySavings} more than paying annually
            </p>
          </div>
        </div>

        {/* Annual Option */}
        <div
          className={`${styles.paymentCard} ${
            selectedPayment === "annual" ? styles.paymentCardActive : ""
          }`}
          onClick={() => setSelectedPayment("annual")}
        >
          <div className={styles.cardHeader}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Annually
            </h3>
            <div className={styles.radioButton}>
              {selectedPayment === "annual" && (
                <div className={styles.radioDot} />
              )}
            </div>
          </div>

          <div className={styles.priceSection}>
            <p className={`${styles.mainPrice} ${plusJakartaSans.className}`}>
              £{annualPrice.toFixed(2)}
            </p>
            <p className={styles.priceLabel}>/year</p>
          </div>

          <div className={styles.details}>
            <p className={styles.detailLabel}>Pay once a year</p>
            <p className={`${styles.detailPrice} ${plusJakartaSans.className}`}>
              Save £{monthlySavings}
            </p>
          </div>

          <div className={styles.savings} />
        </div>
      </div>

      {/* Information Banner */}
      <div className={styles.infoBanner}>
        <div className={styles.infoIcon}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className={styles.infoText}>
          The cost of your insurance and the interest charged is spread over the year, so paying for your insurance
          <span className={styles.highlight}>monthly will cost more than if you paid annually</span>. Please check you can afford the monthly payments.
          You'll just need your bank details ready so we can set up a Direct Debit for you.
        </p>
      </div>
    </div>
  );
};

export default PaymentOptions;
