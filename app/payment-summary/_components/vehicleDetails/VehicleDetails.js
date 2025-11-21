"use client";

import React from "react";
import styles from "./vehicleDetails.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const VehicleDetails = ({ data, carUsage, insuranceType }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getVehicleDescription = () => {
    if (!data) return "N/A";
    const parts = [];
    if (data.make) parts.push(data.make);
    if (data.model) parts.push(data.model);
    return parts.join(", ").toUpperCase();
  };

  return (
    <div className={styles.container}>
      <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
        Your car cover
      </h3>
      <div className={styles.vehicleCard}>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.carIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M8 8h8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zM6 16h12v2H6z"/>
              <circle cx="7" cy="18" r="1.2" fill="currentColor"/>
              <circle cx="17" cy="18" r="1.2" fill="currentColor"/>
              <path d="M9 8L5 5h14l-4 3"/>
              <rect x="10" y="9" width="4" height="3" fill="none"/>
            </svg>
          </div>
          <div className={styles.vehicleInfo}>
            <h3 className={`${styles.vehicleName} ${plusJakartaSans.className}`}>
              {getVehicleDescription()}
            </h3>
            <div className={styles.registrationBadge}>
              {data?.registrationNumber || "N/A"}
            </div>
            <button className={styles.editLink}>
              Edit car details
            </button>
          </div>
        </div>
      </div>

      {insuranceType === "Annual" && (
        <>
          <div className={styles.specificationSection}>
            <h4 className={styles.sectionHeading}>Vehicle Specification</h4>
            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vehicle Type</span>
                <span className={styles.specValue}>{data?.type || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Fuel Type</span>
                <span className={styles.specValue}>{data?.fuel || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Colour</span>
                <span className={styles.specValue}>{data?.colour || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Transmission</span>
                <span className={styles.specValue}>{data?.transmission || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Doors</span>
                <span className={styles.specValue}>{data?.doors || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Voluntary Excess</span>
                <span className={styles.specValue}>£{carUsage?.voluntaryExcess || "0"}</span>
              </div>
            </div>
          </div>

          <div className={styles.specificationSection}>
            <h4 className={styles.sectionHeading}>Vehicle Worth & Purchase Details</h4>
            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vehicle Worth</span>
                <span className={styles.specValue}>{data?.worth || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Purchase Date</span>
                <span className={styles.specValue}>{formatDate(data?.purchaseDate)}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Legal Owner</span>
                <span className={styles.specValue}>{data?.legalOwner || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className={styles.specificationSection}>
            <h4 className={styles.sectionHeading}>Safety & Security Features</h4>
            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Tracking Device</span>
                <span className={styles.specValue}>{data?.trackingDevice || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Alarm / Immobiliser</span>
                <span className={styles.specValue}>{data?.alarmImmobiliser || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Imported Vehicle</span>
                <span className={styles.specValue}>{data?.importedVehicle || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vehicle Modified</span>
                <span className={styles.specValue}>{data?.vehicleModified || "N/A"}</span>
              </div>
              {data?.vehicleModifications && data?.vehicleModifications.length > 0 && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Modifications</span>
                  <span className={styles.specValue}>{data?.vehicleModifications.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default VehicleDetails;
