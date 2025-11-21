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
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Policy
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
          showViewButton={true}
          theme="expired"
        />
      )}
    </>
  );
};

export default PolicyPageClient;
