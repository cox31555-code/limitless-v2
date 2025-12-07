"use client";

import React, { useState } from "react";
import styles from "./driverSummaryCard.module.css";
import AddressLookupModal from "./AddressLookupModal";

const DriverSummaryCard = ({ driver, form, onAddressChange }) => {
  const { watch, setValue } = form;
  const [showAddressModal, setShowAddressModal] = useState(false);

  const firstName = watch("userDetails.firstName");
  const surname = watch("userDetails.surname");
  const dateOfBirth = watch("userDetails.dateOfBirth");
  const address = watch("userDetails.addressLine1");

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    
    // Handle DD/MM/YYYY format from the form
    if (typeof dateString === "string" && dateString.includes("/")) {
      const parts = dateString.split("/");
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const year = parseInt(parts[2]);
        const date = new Date(year, month - 1, day);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${day} ${monthNames[date.getMonth()]} ${year}`;
      }
    }
    
    // Handle YYYY-MM-DD format
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";
    
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className={styles.card}>
      {/* Info Banner */}
      <div className={styles.infoBanner}>
        <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="currentColor"/>
        </svg>
        <p className={styles.infoBannerText}>
          Heads up - to keep things simple any further changes will need to take place <strong>after</strong> this change has taken effect.
        </p>
      </div>

      {/* Driver Card */}
      <div className={styles.driverCard}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className={styles.nameArea}>
            <h3 className={styles.driverName}>
              {firstName && surname ? `${firstName} ${surname}`.toUpperCase() : "—"}
            </h3>
            <p className={styles.dateOfBirth}>
              Date of birth {formatDate(dateOfBirth)}
            </p>
          </div>
        </div>

        <div className={styles.addressSection}>
          <h4 className={styles.addressTitle}>Address</h4>
          <p className={styles.addressValue}>
            {address || "—"}
          </p>
          <button
            type="button"
            className={styles.changeAddressBtn}
            onClick={() => setShowAddressModal(true)}
          >
            Change address
          </button>
        </div>
      </div>

      <AddressLookupModal
        form={form}
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
      />
    </div>
  );
};

export default DriverSummaryCard;
