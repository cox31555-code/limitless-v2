import React from "react";
import styles from "./coverLevel.module.css";

const CoverLevel = ({ data, insuranceType }) => {
  const getInsuranceTypeName = () => {
    if (!insuranceType) return "N/A";
    if (insuranceType === "Temp") return "Temporary Insurance";
    if (insuranceType === "Impound") return "Impound Insurance";
    return insuranceType;
  };

  const features =
    insuranceType === "Temp"
      ? [
          "Instant documents",
          "Uninsured driver promise",
          "European cover",
          "Protected no claims",
          "Loss, theft, fire or vandalism cover",
          "Legal liability cover",
        ]
      : [
          "Instant documents",
          "Uninsured driver promise",
          "Protected no claims",
          "Loss, theft, fire or vandalism cover",
          "Legal liability cover",
          "Impound Release",
        ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Current Level of Cover</h3>
      </div>

      <div className={styles.coverTypeSection}>
        <span className={styles.coverTypeLabel}>Type of Insurance</span>
        <span className={styles.coverTypeName}>{getInsuranceTypeName()}</span>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceContent}>
          <span className={styles.priceLabel}>Total Premium</span>
          <span className={styles.priceValue}>{`£${data?.priceAmount}`}</span>
          <span className={styles.priceNote}>Including all fees and taxes</span>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h4 className={styles.featuresTitle}>What's Included</h4>
        <div className={styles.featuresList}>
          {features.map((feature, index) => (
            <div className={styles.featureItem} key={index}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#0388ff"/>
              </svg>
              <span className={styles.featureText}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverLevel;
