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
            >
              {/* Card Header - Status Badge & Claim Reference */}
              <div className={styles.claimCardHeader}>
                <div className={`${styles.statusBadge} ${styles[statusType]}`}>
                  {row.status || "PENDING"}
                </div>
                <div className={styles.claimRef}>{row.ref}</div>
              </div>

              {/* Claim Details */}
              <div className={styles.claimDetails}>
                <h3 className={styles.claimTitle}>Claim by {row.claimant}</h3>
                <p className={styles.claimMeta}>Filed on {formatDate(row.date)}</p>
                
                <div className={styles.claimInfoRow}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Status</span>
                    <span className={styles.infoValue}>{row.status}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Last Updated</span>
                    <span className={styles.infoValue}>{formatDate(row.pendingActions)}</span>
                  </div>
                </div>
              </div>

              {/* Claim Info */}
              <div className={styles.claimInfo}>
                <div className={styles.infoColumn}>
                  <p className={styles.infoLabel}>Estimated Resolution</p>
                  <p className={styles.infoValue}>{formatDate(row.pendingActions)}</p>
                </div>
                <div className={styles.infoColumn}>
                  <p className={styles.infoLabel}>Claim Date</p>
                  <p className={styles.infoValue}>{formatDate(row.date)}</p>
                </div>
              </div>

              {/* View Details Button */}
              <button
                className={styles.viewButton}
                onClick={() => router.push(`/dashboard/claims/${row.id}`)}
              >
                View Claim Details →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
