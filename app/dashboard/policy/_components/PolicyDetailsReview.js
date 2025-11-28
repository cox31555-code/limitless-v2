"use client";

'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./policyDetailsReview.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useLoading } from "@/contexts/LoadingContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const PolicyDetailsReview = ({ policy }) => {
  const router = useRouter();
  const { showLoading } = useLoading();
  const [expandedSections, setExpandedSections] = useState({
    policyDetails: true,
    carDetails: false,
    excesses: false,
    drivers: false,
    driverDetails: false,
    documents: false,
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
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleKeyDown = (e, section) => {
    if (e.key === 'Enter' || e.key === ' ') {
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

  const vehicleDetails = policy?.vehicleDetails || {};
  const coverDetails = policy?.coverDetails || {};
  const userDetails = policy?.userDetails || {};
  const insuranceType = policy?.type || "Annual";

  // Extract price from totalPremium string if it contains format like "£649.99 for 12 months"
  const getTotalPrice = () => {
    const totalPremium = policy?.quote?.totalPremium;
    if (!totalPremium) return "—";
    if (typeof totalPremium === "string") {
      // Extract just the currency amount
      const match = totalPremium.match(/£([\d,.]+)/);
      return match ? match[1] : totalPremium;
    }
    return totalPremium;
  };

  const getMonthlyPrice = () => {
    const totalPremium = policy?.quote?.totalPremium;
    if (!totalPremium || typeof totalPremium !== "string") return "—";

    // Try to extract from format like "£649.99 for 12 months"
    if (totalPremium.includes("12 months")) {
      const match = totalPremium.match(/£([\d,.]+)/);
      if (match) {
        const total = parseFloat(match[1].replace(/,/g, ""));
        return (total / 12).toFixed(2);
      }
    } else if (totalPremium.includes("7 days")) {
      const match = totalPremium.match(/£([\d,.]+)/);
      if (match) {
        return match[1];
      }
    } else if (totalPremium.includes("30 days")) {
      const match = totalPremium.match(/£([\d,.]+)/);
      if (match) {
        return match[1];
      }
    }

    return "—";
  };

  const priceAmount = getMonthlyPrice();
  const totalPaid = getTotalPrice();

  return (
    <div className={styles.container}>
      {/* Price Card */}
      <section className={styles.priceCard} aria-labelledby="policy-price-heading">
        <div className={styles.priceContent}>
          <h2 id="policy-price-heading" className={styles.priceLabel}>Monthly Payment</h2>
          <div className={styles.priceAmount} aria-label={`${priceAmount} pounds per month`}>
            £{priceAmount}<span className={styles.pricePeriod}>/month*</span>
          </div>
          <p className={styles.priceMeta}>Total annual cost: £{totalPaid}</p>
        </div>
      </section>

      {/* Next Instalment Info */}
      <aside className={styles.instalmentInfo} role="status" aria-live="polite" aria-label="Payment reminder">
        <div className={styles.instalmentIconWrapper} aria-hidden="true">
          <svg
            className={styles.instalmentIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <p className={styles.instalmentText}>
          Next payment: <strong>£47.40</strong> due on <strong>5 January 2026</strong>
        </p>
      </aside>

      {/* Policy Details Section */}
      <section className={styles.expandableCard} aria-labelledby="policy-details-heading">
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("policyDetails")}
          onKeyDown={(e) => handleKeyDown(e, "policyDetails")}
          aria-expanded={expandedSections.policyDetails}
          aria-controls="policy-details-content"
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <line x1="10" y1="9" x2="8" y2="9"/>
              </svg>
            </div>
            <h3 id="policy-details-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Your Cover Details
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.policyDetails ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.policyDetails && (
          <div id="policy-details-content" className={styles.cardContent} role="region" aria-labelledby="policy-details-heading">
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cover start date</span>
                <span className={styles.detailValue}>{formatDate(coverDetails?.startDate)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cover expiry date</span>
                <span className={styles.detailValue}>{formatDate(coverDetails?.endDate)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cover type</span>
                <span className={styles.detailValue}>{coverDetails?.level || insuranceType}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cover level</span>
                <span className={styles.detailValue}>{coverDetails?.level || "—"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Breakdown cover</span>
                <span className={styles.detailValue}>Not included</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Protected no claim discount</span>
                <span className={styles.detailValue}>Not included</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Motor legal expenses</span>
                <span className={styles.detailValue}>Not included</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>European coverage</span>
                <span className={styles.detailValue}>Not included</span>
              </div>
            </div>

            <div className={styles.excessSection}>
              <h4 className={`${styles.excessTitle} ${plusJakartaSans.className}`}>
                Policy Excess Information
              </h4>
              <div className={styles.excessContent}>
                <p className={styles.excessItem}>
                  <strong>Accidental damage:</strong> £850 (£500 voluntary excess)
                </p>
                <p className={styles.excessItem}>
                  <strong>Fire or theft:</strong> £850 (£500 voluntary excess)
                </p>
              </div>
              <p className={styles.excessNote}>
                Your total excess applies every time you claim and to every car you're claiming on.
              </p>

              <div className={styles.excessGrid}>
                <div className={styles.excessItemBlock}>
                  <h5 className={`${styles.excessSubtitle} ${plusJakartaSans.className}`}>
                    Glass-only excess
                  </h5>
                  <p className={styles.excessValue}>Repair: £20</p>
                  <p className={styles.excessValue}>Replacement: £95</p>
                </div>
                <div className={styles.excessItemBlock}>
                  <h5 className={`${styles.excessSubtitle} ${plusJakartaSans.className}`}>
                    Non-recommended repairer
                  </h5>
                  <p className={styles.excessValue}>£400</p>
                  <p className={styles.excessValueNote}>
                    In addition to main excess. Applies to glass replacement but not repair.
                  </p>
                </div>
              </div>
            </div>

            <p className={styles.disclaimer}>* includes any changes that you've made incl. Interest and Insurance Premium Tax</p>
          </div>
        )}
      </section>

      {/* Car Details Section */}
      <section className={styles.expandableCard} aria-labelledby="car-details-heading">
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("carDetails")}
          onKeyDown={(e) => handleKeyDown(e, "carDetails")}
          aria-expanded={expandedSections.carDetails}
          aria-controls="car-details-content"
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
                <path d="M 3.3790 49.7383 L 6.1446 49.7383 C 7.8790 49.7383 9.2383 48.4023 9.2383 46.6680 L 9.2383 42.7305 C 14.4415 43.0586 21.9649 43.2930 27.9883 43.2930 C 34.0352 43.2930 41.5587 43.0586 46.7617 42.7305 L 46.7617 46.6680 C 46.7617 48.4023 48.0976 49.7383 49.8553 49.7383 L 52.6211 49.7383 C 54.3788 49.7383 55.7382 48.4023 55.7382 46.6680 L 55.7382 33.1445 C 55.7382 29.2070 54.9414 26.9805 52.7617 24.1680 L 50.7932 21.6133 C 49.9259 17.3945 48.3788 12.9648 47.5585 11.2305 C 46.3163 8.5820 43.8788 7.0117 40.7618 6.5898 C 39.1915 6.4024 34.0587 6.2617 27.9883 6.2617 C 21.9415 6.2617 16.8087 6.4258 15.2383 6.5898 C 12.1212 6.9648 9.6837 8.5820 8.4415 11.2305 C 7.6212 12.9648 6.0743 17.3945 5.2071 21.6133 L 3.2383 24.1680 C 1.0587 26.9805 .2618 29.2070 .2618 33.1445 L .2618 46.6680 C .2618 48.4023 1.6212 49.7383 3.3790 49.7383 Z M 9.9415 19.6680 C 10.5040 17.0898 11.6290 13.7383 12.4024 12.3789 C 13.0352 11.2773 13.7149 10.8086 14.9805 10.6445 C 16.7618 10.3867 20.7462 10.2461 27.9883 10.2461 C 35.2540 10.2461 39.2383 10.3398 41.0196 10.6445 C 42.2618 10.8320 42.9414 11.2773 43.5976 12.3789 C 44.3948 13.7148 45.4494 17.0898 46.0585 19.6680 C 46.2697 20.5351 45.9179 20.8633 45.0040 20.7929 C 41.1134 20.5586 36.4727 20.3008 27.9883 20.3008 C 19.5274 20.3008 14.8868 20.5586 10.9962 20.7929 C 10.0821 20.8633 9.7540 20.5351 9.9415 19.6680 Z M 10.9024 37.2227 C 8.6759 37.2227 7.0118 35.5351 7.0118 33.3320 C 7.0118 31.1055 8.6759 29.4414 10.9024 29.4414 C 13.1290 29.4414 14.7930 31.1055 14.7930 33.3320 C 14.7930 35.5351 13.1290 37.2227 10.9024 37.2227 Z M 45.0976 37.2227 C 42.8713 37.2227 41.2071 35.5351 41.2071 33.3320 C 41.2071 31.1055 42.8713 29.4414 45.0976 29.4414 C 47.3008 29.4414 48.9884 31.1055 48.9884 33.3320 C 48.9884 35.5351 47.3008 37.2227 45.0976 37.2227 Z M 21.7774 36.1445 C 20.1368 36.1445 18.9883 34.9727 18.9883 33.3320 C 18.9883 31.6680 20.1368 30.5195 21.7774 30.5195 L 34.2227 30.5195 C 35.8634 30.5195 37.0118 31.6680 37.0118 33.3320 C 37.0118 34.9727 35.8634 36.1445 34.2227 36.1445 Z"/>
              </svg>
            </div>
            <h3 id="car-details-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Vehicle Information
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.carDetails ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.carDetails && (
          <div id="car-details-content" className={styles.cardContent} role="region" aria-labelledby="car-details-heading">
            <div className={styles.carInfoBlock}>
              <h4 className={`${styles.carTitle} ${plusJakartaSans.className}`}>
                {vehicleDetails?.make} {vehicleDetails?.model}
              </h4>
              <p className={styles.carRegistration}>({vehicleDetails?.registrationNumber})</p>
              <p className={styles.carMeta}>{vehicleDetails?.year}, {vehicleDetails?.transmission}, {vehicleDetails?.fuel}</p>
            </div>

            <div className={styles.actionButtons}>
              <button
                className={styles.primaryBtn}
                aria-label="Edit vehicle details"
                onClick={() => {
                  showLoading();
                  router.push(`/dashboard/policy/${policy._id}/edit-vehicle`);
                }}
              >
                Edit Vehicle
              </button>
              <button
                className={styles.secondaryBtn}
                aria-label="Replace this vehicle with another"
                onClick={() => {
                  showLoading();
                  router.push(`/dashboard/policy/${policy._id}/replace-vehicle`);
                }}
              >
                Replace Vehicle
              </button>
            </div>

            {/* Your car section */}
            <div className={styles.vehicleSubsection}>
              <h4 className={`${styles.subsectionTitle} ${plusJakartaSans.className}`}>Your car</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Car make and model</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.make && vehicleDetails?.model ? `${vehicleDetails.make} ${vehicleDetails.model}` : null)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Alarm/Immobiliser</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.alarm)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Tracking device</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.trackingDevice)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Import</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.import)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Driver side</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.driverSide || "Right Hand")}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Seats</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.seats)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Registered keeper</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.registeredKeeper)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Legal owner</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.legalOwner)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Modifications</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.modifications || false)}</span>
                </div>
              </div>
            </div>

            {/* Car value section */}
            <div className={styles.vehicleSubsection}>
              <h4 className={`${styles.subsectionTitle} ${plusJakartaSans.className}`}>Car value</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Current vehicle market value</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.marketValue ? `£${vehicleDetails.marketValue}` : "£4560")}</span>
                </div>
              </div>
            </div>

            {/* Car usage section */}
            <div className={styles.vehicleSubsection}>
              <h4 className={`${styles.subsectionTitle} ${plusJakartaSans.className}`}>Car usage</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>When you bought the car</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.purchaseDate || "02/2025")}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Car usage</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.usage)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Annual personal mileage</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.annualMileage)}</span>
                </div>
              </div>
            </div>

            {/* Car storage section */}
            <div className={styles.vehicleSubsection}>
              <h4 className={`${styles.subsectionTitle} ${plusJakartaSans.className}`}>Car storage</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Daytime storage</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.daytimeStorage)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Nighttime storage</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.nighttimeStorage)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Car kept at home overnight</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.keptAtHomeOvernight)}</span>
                </div>
              </div>
            </div>

            {/* Other cars section */}
            <div className={styles.vehicleSubsection}>
              <h4 className={`${styles.subsectionTitle} ${plusJakartaSans.className}`}>Other cars</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Number of cars at your household</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.householdCars)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Use of any other vehicles</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.useOtherVehicles)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>What other vehicles</span>
                  <span className={styles.detailValue}>{formatValue(vehicleDetails?.otherVehicles)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Drivers Section */}
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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
          </div>
        )}
      </section>

      {/* Driver Details Section */}
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
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
            {(policy?.drivers || [{ firstName: userDetails?.firstName, surname: userDetails?.surname, ...userDetails }]).map((driver, index) => (
              <div key={index} className={styles.driverCard}>
                <h4 className={`${styles.driverName} ${plusJakartaSans.className}`}>
                  {driver?.firstName} {driver?.surname}
                </h4>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date of birth</span>
                    <span className={styles.detailValue}>{formatDate(driver?.dateOfBirth)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Claims in the last 5 years</span>
                    <span className={styles.detailValue}>None</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Criminal convictions</span>
                    <span className={styles.detailValue}>None</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Motoring convictions</span>
                    <span className={styles.detailValue}>None</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>No claim discount (NCD)</span>
                    <span className={styles.detailValue}>Not protected</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Years of no claim discount (NCD)</span>
                    <span className={styles.detailValue}>20</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Address</span>
                    <span className={styles.detailValue}>{driver?.address}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>{driver?.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Relationship status</span>
                    <span className={styles.detailValue}>{formatValue(driver?.relationshipStatus)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Homeowner</span>
                    <span className={styles.detailValue}>{formatValue(driver?.homeowner)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Children under 16 living with you</span>
                    <span className={styles.detailValue}>{formatValue(driver?.childrenUnder16)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Lived in the UK since birth</span>
                    <span className={styles.detailValue}>{formatValue(driver?.livedInUKSinceBirth)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Employment status</span>
                    <span className={styles.detailValue}>{formatValue(driver?.employmentStatus)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Licence type</span>
                    <span className={styles.detailValue}>{formatValue(driver?.licenceType)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Years licence held for</span>
                    <span className={styles.detailValue}>{formatValue(driver?.yearsLicenceHeld)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Additional driving qualifications</span>
                    <span className={styles.detailValue}>{formatValue(driver?.additionalDrivingQualifications)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>DVLA reportable conditions</span>
                    <span className={styles.detailValue}>{formatValue(driver?.dvlaReportableConditions)}</span>
                  </div>
                </div>
                <div className={styles.driverActionButtons}>
                  <button className={styles.primaryBtn} aria-label="View full driver profile">View Profile</button>
                  <button
                    className={styles.secondaryBtn}
                    aria-label="Edit driver information"
                    onClick={() => {
                      showLoading();
                      router.push(`/dashboard/policy/${policy._id}/edit-driver/${index}`);
                    }}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Policy Documents Section */}
      <section className={styles.expandableCard} aria-labelledby="documents-heading">
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("documents")}
          onKeyDown={(e) => handleKeyDown(e, "documents")}
          aria-expanded={expandedSections.documents}
          aria-controls="documents-content"
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
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
            </div>
            <h3 id="documents-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Download Documents
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.documents ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.documents && (
          <div id="documents-content" className={styles.cardContent} role="region" aria-labelledby="documents-heading">
            <div className={styles.documentsList}>
              <a href="#" className={styles.documentLink} aria-label="Download Insurance Certificate PDF, 797 kilobytes">
                <svg className={styles.documentIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Insurance Certificate <span className={styles.fileSize}>(PDF, 797 KB)</span></span>
              </a>
              <a href="#" className={styles.documentLink} aria-label="Download Product Information Document PDF, 89 kilobytes">
                <svg className={styles.documentIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Product Information Document <span className={styles.fileSize}>(PDF, 89 KB)</span></span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Payment Breakdown Section */}
      <section className={styles.paymentBreakdownCard} aria-labelledby="payment-breakdown-heading">
        <h3 id="payment-breakdown-heading" className={`${styles.breakdownTitle} ${plusJakartaSans.className}`}>
          Payment Schedule
        </h3>
        <div className={styles.breakdownContent}>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Initial deposit (40% of annual premium)</span>
            <span className={styles.breakdownAmount}>£210.26</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Monthly instalments (11 payments)</span>
            <span className={styles.breakdownAmount}>£47.40</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Interest rate</span>
            <span className={styles.breakdownAmount}>9%</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Credit representative APR</span>
            <span className={styles.breakdownAmount}>19.1% *</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Credit cost</span>
            <span className={styles.breakdownAmount}>£43.04</span>
          </div>
          <div className={`${styles.breakdownItem} ${styles.totalRow}`}>
            <span className={styles.breakdownLabel}>Total annual cost</span>
            <span className={styles.breakdownAmount}>£568.69</span>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <nav className={styles.actionButtonsContainer} aria-label="Policy actions">
        <button className={styles.makeClaimBtn} aria-label="Start a new insurance claim">Make a Claim</button>
        <button className={styles.cancelPolicyBtn} aria-label="Cancel this insurance policy">Cancel Policy</button>
      </nav>
    </div>
  );
};

export default PolicyDetailsReview;
