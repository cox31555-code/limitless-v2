"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Table from "./table/Table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockPolicies } from "../../mockPoliciesData";

const PolicyPageClient = ({
  activePolicies,
  expiredPolicies,
  styles,
  plusJakartaSans,
}) => {
  // Prepare mock policy data for display
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
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Your Policies
        </h2>
        <div className={styles.buttonWrapper} ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={styles.button}
            aria-expanded={isDropdownOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.plusIcon}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>New Policy</span>
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
                    <circle cx="12" cy="12" r="1" />
                    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m2.12-2.12l4.24-4.24M19.78 19.78l-4.24-4.24m-2.12-2.12l-4.24-4.24M19.78 4.22l-4.24 4.24m-2.12 2.12l-4.24 4.24M23 12h-6m-6 0H5" />
                  </svg>
                </div>
                <div className={styles.optionContent}>
                  <h5>Temporary Insurance</h5>
                  <p>Short-term coverage from 1 hour to 30 days</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
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
                    <rect x="3" y="6" width="18" height="14" rx="2" />
                    <path d="M9 9h6M9 12h6M9 15h6" />
                  </svg>
                </div>
                <div className={styles.optionContent}>
                  <h5>Impound Insurance</h5>
                  <p>Protection for impounded or seized vehicles</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
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
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className={styles.optionContent}>
                  <h5>Annual Insurance</h5>
                  <p>Full year coverage for continuous protection</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {mockActivePolicies.length > 0 && (
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
        />
      )}

      {activePolicies && activePolicies.length > 0 && (
        <Table
          title="Expired/Unpaid Policies"
          tableType="inactive"
          columns={[
            "Policy Number",
            "Status",
            "Name",
            "Vehicle Reg",
            "Details",
          ]}
          data={activePolicies}
          showViewButton={false}
          theme="expired"
        />
      )}
    </>
  );
};

export default PolicyPageClient;
