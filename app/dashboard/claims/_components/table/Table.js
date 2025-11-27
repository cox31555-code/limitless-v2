"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

const Table = ({ title, data, claimType, showTitle = true }) => {
  const router = useRouter();

  const getStatusColor = (status) => {
    if (status === "Pending") return "pending";
    if (status === "Completed") return "completed";
    if (status === "Cancelled") return "cancelled";
    return "pending";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={styles.section}>
      {showTitle && (
        <h3 className={styles.sectionTitle}>
          {title}
        </h3>
      )}
      <div className={styles.cardsGrid}>
        {data.map((row, index) => {
          const statusType = getStatusColor(row.status);

          return (
            <div
              key={index}
              className={styles.claimCard}
              onClick={() => router.push(`/dashboard/claims/${row.id}`)}
            >
              {/* Card Header - Status Badge & Claim Reference */}
              <div className={styles.claimCardHeader}>
                <div className={styles.claimBadgeWrapper}>
                  <div className={`${styles.statusBadge} ${styles[statusType]}`}>
                    {row.status || "PENDING"}
                  </div>
                </div>
                <div className={styles.claimRefWrapper}>
                  <span className={styles.claimRefLabel}>Claim Reference</span>
                  <span className={styles.claimRef}>{row.ref}</span>
                </div>
              </div>

              {/* Claim Details */}
              <div className={styles.claimCardBody}>
                <h3 className={styles.claimTitle}>Claim by {row.claimant}</h3>
                <p className={styles.claimMeta}>Filed on {formatDate(row.date)}</p>
              </div>

              {/* Claim Info */}
              <div className={styles.claimCardInfo}>
                <div className={styles.infoColumn}>
                  <p className={styles.infoLabel}>Status</p>
                  <p className={styles.infoValue}>{row.status}</p>
                </div>
                <div className={styles.infoColumn}>
                  <p className={styles.infoLabel}>Claim Date</p>
                  <p className={styles.infoValue}>{formatDate(row.date)}</p>
                </div>
                <div className={styles.claimArrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
