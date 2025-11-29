"use client";

import React, { useState } from "react";
import styles from "./policyDetailsReview.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const PolicyDetailsReview = ({ insuranceData }) => {
  const [expandedSections, setExpandedSections] = useState({
    coverDetails: false,
    vehicleInfo: true,
    drivers: false,
    driverDetails: false,
  });

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "—";
    return value;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleKeyDown = (e, section) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSection(section);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const vehicleDetails = insuranceData?.vehicleDetails || {};
  const coverDetails = insuranceData?.coverDetails || {};
  const userDetails = insuranceData?.userDetails || {};
  const carUsage = insuranceData?.carUsage || {};

  return (
    <div className={styles.container}>
      {/* Vehicle Information Section */}
      <section className={styles.expandableCard} aria-labelledby="vehicle-info-heading">
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("vehicleInfo")}
          onKeyDown={(e) => handleKeyDown(e, "vehicleInfo")}
          aria-expanded={expandedSections.vehicleInfo}
          aria-controls="vehicle-info-content"
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 56 56"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M 3.3790 49.7383 L 6.1446 49.7383 C 7.8790 49.7383 9.2383 48.4023 9.2383 46.6680 L 9.2383 42.7305 C 14.4415 43.0586 21.9649 43.2930 27.9883 43.2930 C 34.0352 43.2930 41.5587 43.0586 46.7617 42.7305 L 46.7617 46.6680 C 46.7617 48.4023 48.0976 49.7383 49.8553 49.7383 L 52.6211 49.7383 C 54.3788 49.7383 55.7382 48.4023 55.7382 46.6680 L 55.7382 33.1445 C 55.7382 29.2070 54.9414 26.9805 52.7617 24.1680 L 50.7932 21.6133 C 49.9259 17.3945 48.3788 12.9648 47.5585 11.2305 C 46.3163 8.5820 43.8788 7.0117 40.7618 6.5898 C 39.1915 6.4024 34.0587 6.2617 27.9883 6.2617 C 21.9415 6.2617 16.8087 6.4258 15.2383 6.5898 C 12.1212 6.9648 9.6837 8.5820 8.4415 11.2305 C 7.6212 12.9648 6.0743 17.3945 5.2071 21.6133 L 3.2383 24.1680 C 1.0587 26.9805 .2618 29.2070 .2618 33.1445 L .2618 46.6680 C .2618 48.4023 1.6212 49.7383 3.3790 49.7383 Z M 9.9415 19.6680 C 10.5040 17.0898 11.6290 13.7383 12.4024 12.3789 C 13.0352 11.2773 13.7149 10.8086 14.9805 10.6445 C 16.7618 10.3867 20.7462 10.2461 27.9883 10.2461 C 35.2540 10.2461 39.2383 10.3398 41.0196 10.6445 C 42.2618 10.8320 42.9414 11.2773 43.5976 12.3789 C 44.3948 13.7148 45.4494 17.0898 46.0585 19.6680 C 46.2697 20.5351 45.9179 20.8633 45.0040 20.7929 C 41.1134 20.5586 36.4727 20.3008 27.9883 20.3008 C 19.5274 20.3008 14.8868 20.5586 10.9962 20.7929 C 10.0821 20.8633 9.7540 20.5351 9.9415 19.6680 Z M 10.9024 37.2227 C 8.6759 37.2227 7.0118 35.5351 7.0118 33.3320 C 7.0118 31.1055 8.6759 29.4414 10.9024 29.4414 C 13.1290 29.4414 14.7931 31.1055 14.7931 33.3320 C 14.7931 35.5351 13.1290 37.2227 10.9024 37.2227 Z M 45.0742 37.2227 C 42.8476 37.2227 41.1835 35.5351 41.1835 33.3320 C 41.1835 31.1055 42.8476 29.4414 45.0742 29.4414 C 47.3007 29.4414 48.9648 31.1055 48.9648 33.3320 C 48.9648 35.5351 47.3007 37.2227 45.0742 37.2227 Z"/>
              </svg>
            </div>
            <h3 id="vehicle-info-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Vehicle Information
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.vehicleInfo ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.vehicleInfo && (
          <div id="vehicle-info-content" className={styles.cardContent} role="region" aria-labelledby="vehicle-info-heading">
            <div className={styles.carInfoBlock}>
              <h4 className={`${styles.carTitle} ${plusJakartaSans.className}`}>
                {vehicleDetails?.make} {vehicleDetails?.model}
              </h4>
              <p className={styles.carRegistration}>({vehicleDetails?.registrationNumber})</p>
              <p className={styles.carMeta}>{vehicleDetails?.year}, {vehicleDetails?.transmission}, {vehicleDetails?.fuel}</p>
            </div>

            <div className={styles.vehicleSubsection}>
              <h4 className={`${styles.subsectionTitle} ${plusJakartaSans.className}`}>Vehicle Details</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Make and model</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.make && vehicleDetails?.model ? `${vehicleDetails.make} ${vehicleDetails.model}` : null)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Registration number</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.registrationNumber)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Year</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.year)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Type</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.type)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Transmission</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.transmission)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Fuel</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.fuel)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Doors</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.doors)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Seats</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.seats)}</span>
                </div>
              </div>
            </div>

            <div className={styles.vehicleSubsection}>
              <h4 className={`${styles.subsectionTitle} ${plusJakartaSans.className}`}>Car Storage</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Daytime storage</span>
                  <span className={styles.detailValue}>{formatValue(carUsage?.keepingCarDuringDay)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Nighttime storage</span>
                  <span className={styles.detailValue}>{formatValue(carUsage?.keepingCarDuringNight)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Cover Details Section */}
      <section className={styles.expandableCard} aria-labelledby="cover-details-heading">
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("coverDetails")}
          onKeyDown={(e) => handleKeyDown(e, "coverDetails")}
          aria-expanded={expandedSections.coverDetails}
          aria-controls="cover-details-content"
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <h3 id="cover-details-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Your Cover Details
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.coverDetails ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.coverDetails && (
          <div id="cover-details-content" className={styles.cardContent} role="region" aria-labelledby="cover-details-heading">
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cover start date</span>
                <span className={styles.detailValue}>{formatDate(coverDetails?.startDate)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cover type</span>
                <span className={styles.detailValue}>{insuranceData?.type === "Temp" ? "Temporary" : insuranceData?.type === "Impound" ? "Impound" : "Annual"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cover level</span>
                <span className={styles.detailValue}>{formatValue(coverDetails?.level || "Comprehensive")}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Breakdown cover</span>
                <span className={styles.detailValue}>{formatValue(coverDetails?.breakdownCover || "Not included")}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Named Drivers Section */}
      <section className={styles.expandableCard} aria-labelledby="drivers-heading">
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("drivers")}
          onKeyDown={(e) => handleKeyDown(e, "drivers")}
          aria-expanded={expandedSections.drivers}
          aria-controls="drivers-content"
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 id="drivers-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Named Drivers
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.drivers ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.drivers && (
          <div id="drivers-content" className={styles.cardContent} role="region" aria-labelledby="drivers-heading">
            <p className={styles.driverItem}>
              {userDetails?.firstName} {userDetails?.surname} <span className={styles.driverRole}>(main driver)</span>
            </p>
            {carUsage?.additionalDrivers && carUsage.additionalDrivers.length > 0 && (
              carUsage.additionalDrivers.map((driver, index) => (
                <p key={index} className={styles.driverItem}>
                  {driver?.firstName} {driver?.surname} <span className={styles.driverRole}>(additional driver)</span>
                </p>
              ))
            )}
          </div>
        )}
      </section>

      {/* Driver Information Section */}
      <section className={styles.expandableCard} aria-labelledby="driver-details-heading">
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("driverDetails")}
          onKeyDown={(e) => handleKeyDown(e, "driverDetails")}
          aria-expanded={expandedSections.driverDetails}
          aria-controls="driver-details-content"
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 id="driver-details-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Driver Information
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.driverDetails ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.driverDetails && (
          <div id="driver-details-content" className={styles.cardContent} role="region" aria-labelledby="driver-details-heading">
            <div className={styles.driverCard}>
              <h4 className={`${styles.driverName} ${plusJakartaSans.className}`}>
                {userDetails?.firstName} {userDetails?.surname}
              </h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Date of birth</span>
                  <span className={styles.detailValue}>{formatDate(userDetails?.dateOfBirth)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{formatValue(userDetails?.email)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Phone</span>
                  <span className={styles.detailValue}>{formatValue(userDetails?.phone)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Address</span>
                  <span className={styles.detailValue}>{formatValue(userDetails?.address)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Postcode</span>
                  <span className={styles.detailValue}>{formatValue(userDetails?.postCode)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Employment status</span>
                  <span className={styles.detailValue}>{formatValue(userDetails?.employmentStatus)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Occupation</span>
                  <span className={styles.detailValue}>{formatValue(userDetails?.occupation)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>License type</span>
                  <span className={styles.detailValue}>{formatValue(carUsage?.licenseType)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>License held since</span>
                  <span className={styles.detailValue}>{formatValue(carUsage?.licenseHeld)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>No claims bonus</span>
                  <span className={styles.detailValue}>{formatValue(carUsage?.NCB)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PolicyDetailsReview;
