"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Table from "./table/Table";
import styles from "./policyPageClient.module.css";
import { useRouter } from "next/navigation";
import { mockPolicies } from "../../mockPoliciesData";

const PolicyPageClient = ({
  activePolicies,
  expiredPolicies,
  pageStyles,
  plusJakartaSans,
}) => {
  const mockActivePolicies = useMemo(() => {
    return Object.values(mockPolicies).map(policy => ({
      id: policy._id,
      policyNumber: policy.policyNumber,
      vehicleReg: policy.vehicleDetails.registrationNumber,
      name: `${policy.userDetails.firstName} ${policy.userDetails.surname}`,
      remaining: policy.type === "Annual" ? "365 days" : (policy.type === "Temporary" ? "7 days" : "30 days"),
      type: policy.type
    }));
  }, []);

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpiredExpanded, setIsExpiredExpanded] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (path) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  const totalExpired = expiredPolicies?.length || 0;
  const totalActive = mockActivePolicies?.length || 0;

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <section className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={`${styles.pageTitle} ${plusJakartaSans.className}`}>
              Your Policy
            </h1>
            <p className={styles.headerSubtitle}>
              Manage and view all your insurance policies
            </p>
          </div>
          <div className={styles.buttonWrapper} ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={styles.createButton}
              aria-expanded={isDropdownOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.plusIcon}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Create a new policy</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${styles.chevron} ${isDropdownOpen ? styles.open : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <h4>Select Insurance Type</h4>
                  <p>Choose the type of coverage you need</p>
                </div>
                <button
                  className={styles.dropdownOption}
                  onClick={() =>
                    handleOptionClick("/temporary/get-quote?payment=false")
                  }
                >
                  <div className={styles.optionIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className={styles.optionContent}>
                    <h5>Temporary Insurance</h5>
                    <p>Short-term coverage from 1 hour to 30 days</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <button
                  className={styles.dropdownOption}
                  onClick={() =>
                    handleOptionClick("/impound/get-quote?payment=false")
                  }
                >
                  <div className={styles.optionIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="6" width="16" height="12" rx="2"></rect>
                      <path d="M7 10h10M7 14h10"></path>
                    </svg>
                  </div>
                  <div className={styles.optionContent}>
                    <h5>Impound Insurance</h5>
                    <p>Protection for impounded or seized vehicles</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <button
                  className={styles.dropdownOption}
                  onClick={() =>
                    handleOptionClick("/annual/get-quote?payment=false")
                  }
                >
                  <div className={styles.optionIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2"></path>
                    </svg>
                  </div>
                  <div className={styles.optionContent}>
                    <h5>Annual Insurance</h5>
                    <p>Full year coverage for continuous protection</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.2 3.2"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Active Policies</p>
            <p className={styles.statValue}>{totalActive}</p>
          </div>
        </div>
        {totalExpired > 0 && (
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="6" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Expired Policies</p>
              <p className={styles.statValue}>{totalExpired}</p>
            </div>
          </div>
        )}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M9 11l3 3L20 5"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Total Coverage</p>
            <p className={styles.statValue}>{totalActive + totalExpired}</p>
          </div>
        </div>
      </section>

      {/* Active Policies Section */}
      {mockActivePolicies.length > 0 && (
        <section className={styles.policiesSection}>
          <div className={styles.sectionHeaderWrapper}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Active Policies</h2>
              <span className={styles.sectionBadge}>{totalActive}</span>
            </div>
            <p className={styles.sectionDescription}>
              Your policies are currently active and providing coverage
            </p>
          </div>
          <Table
            title="Active Policies"
            tableType="active"
            columns={[
              "Policy Number",
              "Remaining",
              "Name",
              "Vehicle Reg",
              "Details",
            ]}
            data={mockActivePolicies}
            showTitle={false}
          />
        </section>
      )}

      {/* Expired Policies Expandable Section */}
      {expiredPolicies && expiredPolicies.length > 0 && (
        <section className={styles.expandableSection}>
          <button
            className={styles.expandableHeader}
            onClick={() => setIsExpiredExpanded(!isExpiredExpanded)}
            aria-expanded={isExpiredExpanded}
          >
            <div className={styles.expandableTitle}>
              <h2 className={styles.sectionTitle}>Expired Policies</h2>
              <span className={styles.expandableBadge}>{totalExpired}</span>
            </div>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className={`${styles.expandableIcon} ${isExpiredExpanded ? styles.expanded : ""}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {isExpiredExpanded && (
            <div className={styles.expandableContent}>
              <Table
                title="Expired Policies"
                tableType="inactive"
                columns={[
                  "Policy Number",
                  "Status",
                  "Name",
                  "Vehicle Reg",
                  "Details",
                ]}
                data={expiredPolicies}
                showViewButton={true}
                theme="default"
                showTitle={false}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default PolicyPageClient;
