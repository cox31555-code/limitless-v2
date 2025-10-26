"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

const Table = ({ title, columns, data, tableType }) => {
  const router = useRouter();

  const getStatusColor = (remaining) => {
    const days = parseInt(remaining);
    if (days > 30) return "high";
    if (days > 7) return "medium";
    return "low";
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.cardsGrid}>
        {data.map((row, index) => (
          <div key={index} className={styles.policyCard}>
            <div className={styles.cardHeader}>
              <div className={styles.policyNumberWrapper}>
                <span className={styles.label}>Policy Number</span>
                <h4 className={styles.policyNumber}>{row.policyNumber}</h4>
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
                  <span className={styles.label}>Vehicle Reg</span>
                  <p className={styles.value}>{row.vehicleReg}</p>
                </div>
              </div>
            </div>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
