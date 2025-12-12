"use client";

import React, { useState } from "react";
import styles from "./carUsage.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import { carUsageOptions } from "@/app/temporary/get-quote/data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CarUsage = ({ carUsage, isExpanded = false }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const getUsageDescription = () => {
    return carUsageOptions.find((item) => item.title === carUsage?.usageType)?.description || "N/A";
  };

  const formatBoolValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    return value === true ? "Yes" : "No";
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
              <path d="M19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
              <path d="M1 12a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8z"/>
              <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.153a1 1 0 0 0 .948.684h2.856a1 1 0 0 0 .948-.684l1.498-4.153a1 1 0 0 1 .948-.684H20a2 2 0 0 1 2 2v2H3V5z"/>
            </svg>
          </div>
          <div className={styles.mainInfo}>
            <h3 className={`${styles.mainTitle} ${plusJakartaSans.className}`}>
              {carUsage?.usageType || "Car Usage"}
            </h3>
            <p className={styles.usageDesc}>{getUsageDescription()}</p>
            <p className={styles.licenseInfo}>License: {carUsage?.licenseType || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className={styles.expandableSection}>
        <button
          className={styles.expandButton}
          onClick={handleToggle}
        >
          <span className={styles.buttonText}>Additional Details</span>
          <svg
            className={`${styles.expandIcon} ${expanded ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expanded && (
          <div className={styles.additionalContent}>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>License Type</span>
                <span className={styles.value}>{carUsage?.licenseType || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>License Held</span>
                <span className={styles.value}>{carUsage?.licenseHeld || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>License No.</span>
                <span className={styles.value}>{carUsage?.licenseNumber || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>No Claims Bonus</span>
                <span className={styles.value}>{carUsage?.NCB || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Voluntary Excess</span>
                <span className={styles.value}>£{carUsage?.voluntaryExcess || "0"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Criminal Convictions</span>
                <span className={styles.value}>{formatBoolValue(carUsage?.criminalConvictions)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Medical Conditions</span>
                <span className={styles.value}>{formatBoolValue(carUsage?.medicalConditions)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Insurance Cancelled/Refused</span>
                <span className={styles.value}>{formatBoolValue(carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarUsage;
