"use client";

import React, { useState } from "react";
import styles from "./personalDetails.module.css";
import CarUsage from "../carUsage/CarUsage";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const PersonalDetails = ({ data, carUsage, insuranceType, optionalExtras }) => {
  const [expandedSections, setExpandedSections] = useState({
    location: false,
    carUsageInfo: false,
    declarations: false,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatBoolValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    return value === true ? "Yes" : "No";
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className={styles.mainInfo}>
            <h3 className={`${styles.mainTitle} ${plusJakartaSans.className}`}>
              {data?.firstName} {data?.surname}
            </h3>
            <p className={styles.mainDetail}>{data?.email}</p>
            <p className={styles.mainDetail}>{data?.phone}</p>
          </div>
        </div>
      </div>

      <div className={styles.expandableSection}>
        <button
          className={styles.expandButton}
          onClick={() => toggleSection("location")}
        >
          <span className={styles.buttonText}>Vehicle Storage</span>
          <svg
            className={`${styles.expandIcon} ${expandedSections.location ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.location && (
          <div className={styles.additionalContent}>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Day Storage</span>
                <span className={styles.value}>
                  {carUsage?.keepingCarDuringDay || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Night Storage</span>
                <span className={styles.value}>
                  {carUsage?.keepingCarDuringNight || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Post Code</span>
                <span className={styles.value}>{data?.postCode || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Address</span>
                <span className={styles.value}>{data?.address || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Employment Status</span>
                <span className={styles.value}>{data?.employmentStatus || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Occupation</span>
                <span className={styles.value}>{data?.occupation || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Industry</span>
                <span className={styles.value}>{data?.industry || "N/A"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {(insuranceType === "Temp" || insuranceType === "Impound") && (
        <div className={styles.expandableSection}>
          <button
            className={styles.expandButton}
            onClick={() => toggleSection("carUsageInfo")}
          >
            <span className={styles.buttonText}>Car Usage</span>
            <svg
              className={`${styles.expandIcon} ${expandedSections.carUsageInfo ? styles.expanded : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {expandedSections.carUsageInfo && (
            <div className={styles.additionalContent}>
              <CarUsage carUsage={carUsage} />
            </div>
          )}
        </div>
      )}

      {insuranceType === "Annual" && (
        <>
          <div className={styles.expandableSection}>
            <button
              className={styles.expandButton}
              onClick={() => toggleSection("carUsageInfo")}
            >
              <span className={styles.buttonText}>Car Usage & License</span>
              <svg
                className={`${styles.expandIcon} ${expandedSections.carUsageInfo ? styles.expanded : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {expandedSections.carUsageInfo && (
              <div className={styles.additionalContent}>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>What do you use the car for?</span>
                    <span className={styles.value}>{carUsage?.usageType || "N/A"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>License Type</span>
                    <span className={styles.value}>{carUsage?.licenseType || "N/A"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>License Held Since</span>
                    <span className={styles.value}>{carUsage?.licenseHeld || "N/A"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>License Number</span>
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
                    <span className={styles.label}>Own Home</span>
                    <span className={styles.value}>{formatBoolValue(carUsage?.ownsHome)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Children Under 16</span>
                    <span className={styles.value}>{formatBoolValue(carUsage?.childrenUnder16)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Lived in UK Since Birth</span>
                    <span className={styles.value}>{formatBoolValue(carUsage?.livedInUKSinceBirth)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {(optionalExtras || carUsage?.criminalConvictions !== undefined || carUsage?.additionalDrivers?.length > 0) && (
            <div className={styles.expandableSection}>
              <button
                className={styles.expandButton}
                onClick={() => toggleSection("declarations")}
              >
                <span className={styles.buttonText}>Declarations & Extras</span>
                <svg
                  className={`${styles.expandIcon} ${expandedSections.declarations ? styles.expanded : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {expandedSections.declarations && (
                <div className={styles.additionalContent}>
                  <div className={styles.detailsGrid}>
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
                    {optionalExtras && (
                      <>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>Courtesy Car</span>
                          <span className={styles.value}>{optionalExtras?.courtesyCar ? "Yes" : "No"}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>Breakdown Cover</span>
                          <span className={styles.value}>{optionalExtras?.breakdownCover ? "Yes" : "No"}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>Foreign Use Cover</span>
                          <span className={styles.value}>{optionalExtras?.foreignUseCover ? "Yes" : "No"}</span>
                        </div>
                      </>
                    )}
                    {carUsage?.additionalDrivers && carUsage?.additionalDrivers.length > 0 && (
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Additional Drivers</span>
                        <span className={styles.value}>{carUsage.additionalDrivers.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalDetails;
