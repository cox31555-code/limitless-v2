"use client";
import React, { useState, useRef, useEffect } from "react";
import Table from "./table/Table";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PolicyPageClient = ({
  activePolicies,
  expiredPolicies,
  styles,
  plusJakartaSans,
}) => {
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
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={styles.button}
          >
            <Image src="/svg/plus.svg" alt="plus" width={24} height={24} />
            <span>Create a new policy</span>
            {/* <Image
              src="/svg/arrow-down-2.svg"
              alt="dropdown"
              width={20}
              height={20}
              style={{
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            /> */}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownOption}
                onClick={() =>
                  handleOptionClick("/impound/get-quote?payment=false")
                }
              >
                <span>Impound Insurance</span>
              </div>
              <div
                className={styles.dropdownOption}
                onClick={() =>
                  handleOptionClick("/temporary/get-quote?payment=false")
                }
              >
                <span>Temporary Insurance</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {activePolicies.length > 0 && (
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
          data={activePolicies}
        />
      )}

      {expiredPolicies.length > 0 && (
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
          data={expiredPolicies}
          showViewButton={false}
        />
      )}

      {activePolicies.length === 0 && expiredPolicies.length === 0 && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "#666" }}>
            No policies found. Create your first policy to get started.
          </p>
        </div>
      )}
    </>
  );
};

export default PolicyPageClient;
