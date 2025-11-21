"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

const Table = ({ title, columns, data, tableType, showViewButton = true, theme = "default" }) => {
  const router = useRouter();

  const getStatusColor = (remaining) => {
    if (remaining === "Expired" || remaining === "Unpaid") return "low";
    const days = parseInt(remaining);
    if (isNaN(days)) return "medium";
    if (days > 30) return "high";
    if (days > 7) return "medium";
    return "low";
  };

  const formatVehicleReg = (reg) => {
    if (!reg) return reg;
    return reg.replace(/^(.{4})(.{3})$/, '$1 $2');
  };

  const getMockPolicyId = (index) => {
    const mockIds = ["ANNUAL-001", "TEMP-001", "IMPOUND-001"];
    return mockIds[index % mockIds.length];
  };

  return (
    <div className={`${styles.section} ${theme === "expired" ? styles.expiredSection : ""}`}>
      <h3 className={`${styles.sectionTitle} ${theme === "expired" ? styles.expiredTitle : ""}`}>
        {title}
      </h3>
      <div className={styles.cardsGrid}>
        {data.map((row, index) => (
          <div
            key={index}
            className={`${styles.policyCard} ${theme === "expired" ? styles.expiredCard : ""}`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.policyNumberWrapper}>
                <span className={styles.label}>Vehicle Reg</span>
                <h4 className={styles.policyNumber}>
                  {formatVehicleReg(row.vehicleReg)}
                </h4>
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
                  onClick={() => router.push(`/dashboard/policy/${getMockPolicyId(index)}`)}
                >
                  View Details
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
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
