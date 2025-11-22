"use client";

import React, { useState } from "react";
import styles from "./policyDetailsReview.module.css";

const PolicyDetailsReview = ({ policy }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "—";
    return value;
  };

  const renderInfoItem = (label, value) => (
    <div className={styles.infoItem}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{formatValue(value)}</span>
    </div>
  );

  const vehicleDetails = policy?.vehicleDetails || {};
  const coverDetails = policy?.coverDetails || {};
  const userDetails = policy?.userDetails || {};
  const insuranceType = policy?.type || "Temporary";

  return (
    <div className={styles.reviewContainer}>
      {/* Price Card */}
      <div className={styles.priceCard}>
        <div className={styles.priceLeft}>
          <span className={styles.priceLabel}>Price</span>
          <div className={styles.priceAmount}>{policy?.quote?.totalPremium || "—"}<span className={styles.priceUnit}>/month*</span></div>
          <span className={styles.priceMeta}>You pay {policy?.quote?.totalPremium || "—"} in total</span>
        </div>
      </div>

      {/* Policy Details Section */}
      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Policy details</h3>
        <div className={styles.infoGrid}>
          {renderInfoItem("Cover start date", coverDetails?.startDate)}
          {renderInfoItem("Cover expiry date", coverDetails?.endDate)}
          {renderInfoItem("Cover type", coverDetails?.level || insuranceType)}
          {renderInfoItem("Cover level", coverDetails?.level)}
          {renderInfoItem("Breakdown cover", "Not included")}
          {renderInfoItem("Protected no claim discount", "Not included")}
          {renderInfoItem("Motor legal expenses", "Not included")}
          {renderInfoItem("Guaranteed hire car if your car's stolen, written off or being repaired", "Not included")}
        </div>
        <p className={styles.disclaimer}>* includes any changes that you've made incl. Interest and Insurance Premium Tax</p>
      </div>

      {/* Car Details Section */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Car details</h3>
          <div className={styles.actionButtons}>
            <button className={styles.primaryBtn}>Edit</button>
            <button className={styles.secondaryBtn}>Replace car</button>
          </div>
        </div>

        <div className={styles.carInfo}>
          <h4 className={styles.carTitle}>{vehicleDetails?.make} {vehicleDetails?.model}</h4>
          <p className={styles.carReg}>({vehicleDetails?.registrationNumber})</p>
          <p className={styles.carMeta}>{vehicleDetails?.year}, {vehicleDetails?.transmission}, {vehicleDetails?.fuel}</p>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.smallPrimaryBtn}>Edit</button>
          <button className={styles.smallSecondaryBtn}>Replace car</button>
        </div>

        <div className={styles.excessSection}>
          <h4 className={styles.excessTitle}>Excesses that apply</h4>
          <div className={styles.excessList}>
            <p><strong>Accidental damage:</strong> £850 (this includes £500 voluntary excess)</p>
            <p><strong>Fire or theft:</strong> £850 (this includes £500 voluntary excess)</p>
          </div>
          <p className={styles.excessNote}>Your total excess applies every time you claim and to every car you're claiming on.</p>

          <div className={styles.excessGrid}>
            <div className={styles.excessItem}>
              <h5>Glass-only excess costs you less</h5>
              <p>Glass repair excess: Just £20</p>
              <p>Glass replacement excess: Just £95</p>
            </div>
            <div className={styles.excessItem}>
              <h5>Non-recommended repairer excess costs you more</h5>
              <p>Non-recommended repairer excess: £400</p>
              <p className={styles.excessItemNote}>This is in addition to the excesses shown above if you choose a garage not on our list of recommended repairers. This also applies to glass replacement but not glass-only repairs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Drivers Section */}
      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Drivers</h3>
        <p className={styles.driverName}>{userDetails?.firstName} {userDetails?.surname} (main driver)</p>
      </div>

      {/* Driver Details Section */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Driver(s) details</h3>
        </div>
        <div className={styles.driverCard}>
          <h4 className={styles.driverName}>{userDetails?.firstName} {userDetails?.surname}</h4>
          <div className={styles.infoGrid}>
            {renderInfoItem("Date of birth", userDetails?.dateOfBirth)}
            {renderInfoItem("Claims in the last 5 years", "None")}
            {renderInfoItem("Criminal convictions", "None")}
            {renderInfoItem("Motoring convictions", "None")}
            {renderInfoItem("No claim discount (NCD)", "Not protected")}
            {renderInfoItem("Years of no claim discount (NCD)", "20")}
            {renderInfoItem("Address", userDetails?.address)}
            {renderInfoItem("Email", userDetails?.email)}
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.smallPrimaryBtn}>View</button>
            <button className={styles.smallSecondaryBtn}>Edit details</button>
          </div>
        </div>
      </div>

      {/* Policy Documents Section */}
      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Policy documents</h3>
        <div className={styles.documentsList}>
          <a href="#" className={styles.documentLink}>📎 Allianz Online Car Insurance Document of Insurance (PDF, 797 KB)</a>
          <a href="#" className={styles.documentLink}>📎 Allianz Online Bronze Car Insurance Product Information Document (PDF, 89 KB)</a>
          <a href="#" className={styles.documentLink}>🔗 Privacy and Legal Notice | Allianz Insurance</a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtonsContainer}>
        <button className={styles.makeClaimBtn}>Make a claim</button>
        <button className={styles.cancelPolicyBtn}>Cancel policy</button>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <>
          <div className={styles.modalOverlay} onClick={handleCloseModal} />
          <div className={styles.modalContainer}>
            <div className={styles.modal}>
              <button
                className={styles.closeBtn}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                ✕
              </button>
              <h3 className={styles.modalTitle}>Make Changes to Your Policy</h3>
              <p className={styles.modalMessage}>
                To make changes to your policy, please contact our support team.
              </p>
              <div className={styles.modalActions}>
                <a href="/contact" className={styles.contactLink}>
                  Contact Us
                </a>
                <button
                  className={styles.closeActionBtn}
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PolicyDetailsReview;
