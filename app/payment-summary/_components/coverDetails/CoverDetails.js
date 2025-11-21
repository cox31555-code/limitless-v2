"use client";

import React, { useState } from "react";
import styles from "./coverDetails.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CoverDetails = ({ data, insuranceType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDurationText = () => {
    if (insuranceType === "Annual") {
      return data?.level || "Comprehensive";
    } else if (insuranceType === "Impound") {
      return data?.impoundType || "N/A";
    } else {
      return (data?.period || 0) + " " + (data?.type || "Days");
    }
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
              <circle cx="12" cy="12" r="1"/>
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
            </svg>
          </div>
          <div className={styles.mainInfo}>
            <h3 className={`${styles.mainTitle} ${plusJakartaSans.className}`}>
              {insuranceType === "Annual" ? "Annual Cover" : insuranceType === "Impound" ? "Impound Cover" : "Temporary Cover"}
            </h3>
            <p className={styles.coverDuration}>{getDurationText()}</p>
            <p className={styles.startDate}>From {formatDate(data?.startDate)} at {data?.startTime || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className={styles.expandableSection}>
        <button
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={styles.buttonText}>Additional Details</span>
          <svg
            className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {isExpanded && (
          <div className={styles.additionalContent}>
            <div className={styles.detailsGrid}>
              {insuranceType === "Temp" && (
                <>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Duration</span>
                    <span className={styles.value}>{(data?.period || 0)} {data?.type || "Days"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Start Date</span>
                    <span className={styles.value}>{formatDate(data?.startDate)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Start Time</span>
                    <span className={styles.value}>{data?.startTime || "N/A"}</span>
                  </div>
                </>
              )}
              {insuranceType === "Annual" && (
                <>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Coverage Type</span>
                    <span className={styles.value}>{data?.level || "Comprehensive"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Start Date</span>
                    <span className={styles.value}>{formatDate(data?.startDate)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Start Time</span>
                    <span className={styles.value}>{data?.startTime || "N/A"}</span>
                  </div>
                </>
              )}
              {insuranceType === "Impound" && (
                <>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Insurance Type</span>
                    <span className={styles.value}>{data?.impoundType || "N/A"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Start Date</span>
                    <span className={styles.value}>{formatDate(data?.startDate)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Start Time</span>
                    <span className={styles.value}>{data?.startTime || "N/A"}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverDetails;
