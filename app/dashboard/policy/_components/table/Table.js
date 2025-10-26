"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

const Table = ({ title, columns, data, tableType, showViewButton = true, theme = "default" }) => {
  const router = useRouter();

  const getStatusColor = (remaining) => {
    const days = parseInt(remaining);
    if (days > 30) return "high";
    if (days > 7) return "medium";
    return "low";
  };

  const formatVehicleReg = (reg) => {
    if (!reg) return reg;
    // Format as XXXX XXX (first 4 chars, space, last 3 chars)
    return reg.replace(/^(.{4})(.{3})$/, '$1 $2');
  };

  return (
    <div className={`${styles.section} ${theme === "expired" ? styles.expiredSection : ""}`}>
      <h3 className={`${styles.sectionTitle} ${theme === "expired" ? styles.expiredTitle : ""}`}>{title}</h3>
      <div className={styles.cardsGrid}>
        {data.map((row, index) => (
          <div key={index} className={`${styles.policyCard} ${theme === "expired" ? styles.expiredCard : ""}`}>
            <div className={styles.cardHeader}>
              <div className={styles.policyNumberWrapper}>
                <span className={styles.label}>Vehicle Reg</span>
                <h4 className={styles.policyNumber}>{formatVehicleReg(row.vehicleReg)}</h4>
              </div>
              <span className={`${styles.badge} ${styles[getStatusColor(row.remaining)]}`}>
                {row.remaining}
              </span>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Policy Holder</span>
                  <p className={styles.value}>{row.name}</p>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Policy Number</span>
                  <p className={styles.value}>{row.policyNumber}</p>
                </div>
              </div>
            </div>

            {showViewButton && (
              <div className={styles.cardFooter}>
                <button
                  className={styles.viewButton}
                  onClick={() => router.push(`/dashboard/policy/${row.id}`)}
                >
                  View Policy Details
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
