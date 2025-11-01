"use client";

import React from "react";
import styles from "./insuranceTypeModal.module.css";
import { useRouter } from "next/navigation";

const InsuranceTypeModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleSelect = (insuranceType) => {
    onClose();
    if (insuranceType === "annual") {
      router.push("/annual/get-quote");
    } else if (insuranceType === "temporary") {
      router.push("/temporary/get-quote");
    } else if (insuranceType === "impound") {
      router.push("/impound/get-quote");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Which insurance do you need?</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <button
            className={styles.option}
            onClick={() => handleSelect("annual")}
          >
            <div className={styles.optionTitle}>Annual Insurance</div>
            <div className={styles.optionDescription}>
              Full-year coverage for your vehicle
            </div>
          </button>

          <button
            className={styles.option}
            onClick={() => handleSelect("temporary")}
          >
            <div className={styles.optionTitle}>Temporary Insurance</div>
            <div className={styles.optionDescription}>
              Coverage for hours, days, or weeks
            </div>
          </button>

          <button
            className={styles.option}
            onClick={() => handleSelect("impound")}
          >
            <div className={styles.optionTitle}>Impound Insurance</div>
            <div className={styles.optionDescription}>
              Coverage for impounded vehicles
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceTypeModal;
