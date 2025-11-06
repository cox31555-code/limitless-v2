"use client";

import React, { useState } from "react";
import styles from "./policyDetailsReview.module.css";

const PolicyDetailsReview = ({ policy }) => {
  const [showModal, setShowModal] = useState(false);

  const handleMakeChanges = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "N/A";
    return value;
  };

  const renderField = (label, value) => (
    <div className={styles.field}>
      <label>{label}</label>
      <p>{formatValue(value)}</p>
    </div>
  );

  const renderSectionWithButton = (title, children) => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <button
          className={styles.sectionMakeChangesBtn}
          onClick={handleMakeChanges}
          aria-label={`Make changes to ${title}`}
        >
          Make Changes
        </button>
      </div>
      <div className={styles.sectionContent}>
        {children}
      </div>
    </div>
  );

  const vehicleDetails = policy?.vehicleDetails || {};
  const coverDetails = policy?.coverDetails || {};
  const userDetails = policy?.userDetails || {};
  const carUsage = policy?.carUsage || {};
  const optionalExtras = policy?.optionalExtras || {};
  const insuranceType = policy?.type || "Temporary";

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewTitle}>Policy Details</h2>

      <div className={styles.reviewSections}>
        {/* VEHICLE DETAILS SECTION */}
        {renderSectionWithButton("Vehicle Details", <>
          <div className={styles.row}>
            {renderField("Registration", vehicleDetails?.registrationNumber)}
            {renderField("Make", vehicleDetails?.make)}
            {renderField("Model", vehicleDetails?.model)}
          </div>
          <div className={styles.row}>
            {renderField("Year", vehicleDetails?.year)}
            {renderField("Type", vehicleDetails?.type)}
            {renderField("Colour", vehicleDetails?.colour)}
          </div>
          <div className={styles.row}>
            {renderField("Fuel Type", vehicleDetails?.fuel)}
            {renderField("Transmission", vehicleDetails?.transmission)}
            {renderField("Doors", vehicleDetails?.doors)}
          </div>
          {vehicleDetails?.worth && (
            <div className={styles.row}>
              {renderField("Value", vehicleDetails?.worth)}
            </div>
          )}

          {/* ANNUAL-SPECIFIC VEHICLE FIELDS */}
          {insuranceType === "Annual" && (
            <>
              <div className={styles.row}>
                {renderField("Tracking Device", vehicleDetails?.trackingDevice)}
                {renderField("Alarm/Immobiliser", vehicleDetails?.alarmImmobiliser)}
                {renderField("Imported Vehicle", vehicleDetails?.importedVehicle)}
              </div>
              <div className={styles.row}>
                {renderField("Vehicle Modified", vehicleDetails?.vehicleModified)}
                {vehicleDetails?.vehicleModifications && vehicleDetails.vehicleModifications.length > 0 &&
                  renderField("Modifications", vehicleDetails.vehicleModifications.join(", "))}
                {renderField("Purchase Date", vehicleDetails?.purchaseDate)}
              </div>
              <div className={styles.row}>
                {renderField("Legal Owner", vehicleDetails?.legalOwner)}
                {renderField("Owner", vehicleDetails?.owner)}
                {renderField("Registered Keeper", vehicleDetails?.registeredKeeper)}
              </div>
            </>
          )}
        </>)}

        {/* COVER DETAILS SECTION */}
        {renderSectionWithButton("Cover Details",
          insuranceType === "Annual" ? (
            <div className={styles.row}>
              {renderField("Cover Level", coverDetails?.level)}
              {renderField("Start Date", coverDetails?.startDate)}
            </div>
          ) : (
            <div className={styles.row}>
              {renderField("Duration", `${coverDetails?.period || "N/A"} ${coverDetails?.type || ""}`)}
              {renderField("Start Date", coverDetails?.startDate)}
              {renderField("Start Time", coverDetails?.startTime)}
            </div>
          )
        )}

        {/* PERSONAL DETAILS SECTION */}
        {renderSectionWithButton("Personal Details", <>
          <div className={styles.row}>
            {renderField("First Name", userDetails?.firstName)}
            {renderField("Surname", userDetails?.surname)}
            {renderField("Date of Birth", userDetails?.dateOfBirth)}
          </div>
          <div className={styles.row}>
            {renderField("Email", userDetails?.email)}
            {renderField("Phone", userDetails?.phone)}
            {renderField("Postcode", userDetails?.postCode)}
          </div>
          <div className={styles.row}>
            {renderField("Address", userDetails?.address)}
          </div>
        </>)}

        {/* EMPLOYMENT DETAILS SECTION */}
        {renderSectionWithButton("Employment Details",
          <div className={styles.row}>
            {renderField("Employment Status", userDetails?.employmentStatus)}
            {renderField("Industry", userDetails?.industry)}
            {renderField("Occupation", userDetails?.occupation)}
          </div>
        )}

        {/* CAR PARKING & USAGE SECTION */}
        {renderSectionWithButton("Car Parking & Usage", <>
          <div className={styles.row}>
            {renderField("Keeping Car During Day", carUsage?.keepingCarDuringDay)}
            {renderField("Keeping Car During Night", carUsage?.keepingCarDuringNight)}
            {renderField("What Do You Use Car For", carUsage?.usageType)}
          </div>

          {/* ANNUAL-SPECIFIC CAR USAGE */}
          {insuranceType === "Annual" && (
            <>
              <div className={styles.row}>
                {renderField("Own Other Vehicles", carUsage?.otherVehicles)}
                {carUsage?.otherVehicles === "Yes" && renderField("Other Vehicles Type", carUsage?.otherVehiclesType)}
                {renderField("Additional Qualifications", carUsage?.hasAdditionalQualifications)}
              </div>
              {carUsage?.hasAdditionalQualifications === "Yes" && (
                <div className={styles.row}>
                  {renderField("Qualification Type", carUsage?.additionalQualificationType)}
                  {renderField("Month/Year", `${carUsage?.qualificationMonth || "N/A"} ${carUsage?.qualificationYear || ""}`)}
                </div>
              )}
            </>
          )}
        </>)}

        {/* LICENSE & CLAIMS SECTION */}
        {renderSectionWithButton("License & Claims", <>
          <div className={styles.row}>
            {renderField("License Type", carUsage?.licenseType)}
            {renderField("License Held Since", carUsage?.licenseHeld)}
            {renderField("License Number", carUsage?.licenseNumber)}
          </div>
          <div className={styles.row}>
            {renderField("No Claims Bonus", carUsage?.NCB)}
            {renderField("Voluntary Excess", carUsage?.voluntaryExcess)}
          </div>
        </>)}

        {/* DECLARATIONS SECTION */}
        {insuranceType !== "Impound" && renderSectionWithButton("Declarations",
          <div className={styles.row}>
            {renderField("Criminal Convictions", carUsage?.criminalConvictions)}
            {renderField("Medical Conditions", carUsage?.medicalConditions)}
            {renderField("Insurance Cancelled or Claim Refused", carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided)}
          </div>
        )}

        {/* OPTIONAL EXTRAS SECTION - ANNUAL ONLY */}
        {insuranceType === "Annual" && renderSectionWithButton("Optional Extras",
          <div className={styles.row}>
            {renderField("Courtesy Car", optionalExtras?.courtesyCar)}
            {renderField("Breakdown Cover", optionalExtras?.breakdownCover)}
            {renderField("Foreign Use Cover", optionalExtras?.foreignUseCover)}
          </div>
        )}

        {/* PREMIUM SUMMARY */}
        <div className={styles.premiumSection}>
          <div className={styles.premiumContent}>
            <div>
              <h4 className={styles.premiumLabel}>Total Premium</h4>
              <p className={styles.premiumAmount}>{policy?.quote?.totalPremium}</p>
            </div>
            <div>
              <h4 className={styles.premiumLabel}>Status</h4>
              <p className={styles.premiumStatus}>{policy?.quote?.paid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT MODAL POPUP */}
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
