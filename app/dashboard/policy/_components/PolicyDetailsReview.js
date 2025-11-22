"use client";

'use client';

import React, { useState, useEffect } from "react";
import styles from "./policyDetailsReview.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const PolicyDetailsReview = ({ policy }) => {
  const [expandedSections, setExpandedSections] = useState({
    policyDetails: true,
    carDetails: false,
    excesses: false,
    drivers: false,
    driverDetails: false,
    documents: false,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()]} ${year}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
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
    <div className={styles.container} suppressHydrationWarning>
      {/* Price Card */}
      <div className={styles.priceCard}>
        <div className={styles.priceContent}>
          <span className={styles.priceLabel}>Price</span>
          <div className={styles.priceAmount}>£{priceAmount}<span className={styles.pricePeriod}>/month*</span></div>
          <span className={styles.priceMeta}>You pay £{totalPaid} in total</span>
        </div>
      </div>

      {/* Next Instalment Info */}
      <div className={styles.instalmentInfo}>
        <div className={styles.instalmentIconWrapper}>
          <svg
            className={styles.instalmentIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <span className={styles.instalmentText}>
          Your next instalment of <strong>£47.40</strong> is due on <strong>5 Jan 2026</strong>.
        </span>
      </div>

      {/* Policy Details Section */}
      <div className={styles.expandableCard}>
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("policyDetails")}
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 12h6m-6 4h6m2-13H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2z"/>
              </svg>
            </div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Policy details
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.policyDetails ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.policyDetails && (
          <div className={styles.cardContent}>
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
            <p className={styles.disclaimer}>* includes any changes that you've made incl. Interest and Insurance Premium Tax</p>
          </div>
        )}
      </div>

      {/* Car Details Section */}
      <div className={styles.expandableCard}>
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("carDetails")}
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="17" r="2"/>
                <circle cx="15" cy="17" r="2"/>
                <path d="M5 10H1v4a1 1 0 001 1h2a1 1 0 001-1v-4z"/>
                <path d="M19 10h4v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4z"/>
                <path d="M2 7h20a1 1 0 011 1v2H1V8a1 1 0 011-1z"/>
                <path d="M3 10h18v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z"/>
              </svg>
            </div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Car details
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.carDetails ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.carDetails && (
          <div className={styles.cardContent}>
            <div className={styles.carInfoBlock}>
              <h4 className={`${styles.carTitle} ${plusJakartaSans.className}`}>
                {vehicleDetails?.make} {vehicleDetails?.model}
              </h4>
              <p className={styles.carRegistration}>({vehicleDetails?.registrationNumber})</p>
              <p className={styles.carMeta}>{vehicleDetails?.year}, {vehicleDetails?.transmission}, {vehicleDetails?.fuel}</p>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.primaryBtn}>Edit</button>
              <button className={styles.secondaryBtn}>Replace car</button>
            </div>

            <div className={styles.excessSection}>
              <h4 className={`${styles.excessTitle} ${plusJakartaSans.className}`}>
                Excesses that apply
              </h4>
              <div className={styles.excessContent}>
                <p className={styles.excessItem}>
                  <strong>Accidental damage:</strong> £850 (this includes £500 voluntary excess)
                </p>
                <p className={styles.excessItem}>
                  <strong>Fire or theft:</strong> £850 (this includes £500 voluntary excess)
                </p>
              </div>
              <p className={styles.excessNote}>
                Your total excess applies every time you claim and to every car you're claiming on.
              </p>

              <div className={styles.excessGrid}>
                <div className={styles.excessItemBlock}>
                  <h5 className={`${styles.excessSubtitle} ${plusJakartaSans.className}`}>
                    Glass-only excess costs you less
                  </h5>
                  <p className={styles.excessValue}>Glass repair excess: just £20</p>
                  <p className={styles.excessValue}>Glass replacement excess: just £95</p>
                </div>
                <div className={styles.excessItemBlock}>
                  <h5 className={`${styles.excessSubtitle} ${plusJakartaSans.className}`}>
                    Non-recommended repairer excess costs you more
                  </h5>
                  <p className={styles.excessValue}>Non-recommended repairer excess: £400</p>
                  <p className={styles.excessValueNote}>
                    This is in addition to the excesses shown above if you choose a garage not on our list of recommended repairers. This also applies to glass replacement but not glass-only repairs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drivers Section */}
      <div className={styles.expandableCard}>
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("drivers")}
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Drivers
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.drivers ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.drivers && (
          <div className={styles.cardContent}>
            <p className={styles.driverItem}>
              {userDetails?.firstName} {userDetails?.surname} <span className={styles.driverRole}>(main driver)</span>
            </p>
          </div>
        )}
      </div>

      {/* Driver Details Section */}
      <div className={styles.expandableCard}>
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("driverDetails")}
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Driver(s) details
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.driverDetails ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.driverDetails && (
          <div className={styles.cardContent}>
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
                  <span className={styles.detailValue}>{userDetails?.address}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{userDetails?.email}</span>
                </div>
              </div>
              <div className={styles.driverActionButtons}>
                <button className={styles.primaryBtn}>View</button>
                <button className={styles.secondaryBtn}>Edit details</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Policy Documents Section */}
      <div className={styles.expandableCard}>
        <button
          className={styles.cardHeader}
          onClick={() => toggleSection("documents")}
        >
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="11" x2="12" y2="17"/>
                <line x1="9" y1="14" x2="15" y2="14"/>
              </svg>
            </div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Policy documents
            </h3>
          </div>
          <svg
            className={`${styles.expandIcon} ${expandedSections.documents ? styles.expanded : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {expandedSections.documents && (
          <div className={styles.cardContent}>
            <div className={styles.documentsList}>
              <a href="#" className={styles.documentLink}>
                <svg className={styles.documentIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Allianz Online Car Insurance Document of Insurance (PDF, 797 KB)
              </a>
              <a href="#" className={styles.documentLink}>
                <svg className={styles.documentIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Allianz Online Bronze Car Insurance Product Information Document (PDF, 89 KB)
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Payment Breakdown Section */}
      <div className={styles.paymentBreakdownCard}>
        <h3 className={`${styles.breakdownTitle} ${plusJakartaSans.className}`}>
          Payment Breakdown
        </h3>
        <div className={styles.breakdownContent}>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>First payment / deposit, 40% of the annual price (£525.65)</span>
            <span className={styles.breakdownAmount}>£210.26</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>11 payments of</span>
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
            <span className={styles.breakdownLabel}>Total amount for 1 year</span>
            <span className={styles.breakdownAmount}>£568.69</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtonsContainer}>
        <button className={styles.makeClaimBtn}>Make a claim</button>
        <button className={styles.cancelPolicyBtn}>Cancel policy</button>
      </div>
    </div>
  );
};

export default PolicyDetailsReview;
