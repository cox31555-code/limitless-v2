"use client";
import React, { useState } from "react";
import styles from "./policyDetails.module.css";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import Image from "next/image";
import Dropdown from "./Dropdown";

const PolicyDetails = ({ insurance }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);
    // Handle option selection here
    if (option === "edit") {
      // Handle edit action
    } else if (option === "cancel") {
      // Handle cancel policy action
    }
  };

  const userDetails = insurance?.userDetails || {};
  const vehicleDetails = insurance?.vehicleDetails || {};

  // Format date of birth
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  // Extract city from address
  const extractCity = (address) => {
    if (!address) return "N/A";
    const parts = address.split(",");
    return parts[parts.length - 1]?.trim() || "N/A";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Policy Details
        </h2>
        <div className={styles.actions}>
          <Image
            className={styles.icon}
            src="/svg/3-dots.svg"
            alt="edit"
            width={4}
            height={18}
            onClick={handleDropdownToggle}
            style={{ cursor: "pointer" }}
          />
          <Dropdown
            isOpen={isDropdownOpen}
            onClose={handleDropdownClose}
            onOptionClick={handleOptionClick}
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Full Name",
              value: `${userDetails.firstName || ""} ${userDetails.surname || ""}`.trim() || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Date of Birth",
              value: formatDate(userDetails.dateOfBirth),
              type: "date",
            }}
          />
        </div>

        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Email Address",
              value: userDetails.email || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Phone Number",
              value: userDetails.phone || "N/A",
            }}
          />
        </div>

        <InputWithData2
          item={{
            label: "Home Address",
            value: userDetails.address || "N/A",
          }}
        />

        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Postcode",
              value: userDetails.postCode || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "City",
              value: extractCity(userDetails.address),
            }}
          />
        </div>

        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Employment Status",
              value: userDetails.employmentStatus || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Occupation",
              value: userDetails.occupation || "N/A",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
