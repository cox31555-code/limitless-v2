"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./policyDetailsReview.module.css";

const PolicyDetailsReview = ({ policy }) => {
  const router = useRouter();

  const handleMakeChanges = () => {
    // Navigate to edit page or initiate policy modification flow
    // For now, redirect back to policy management page
    router.push("/dashboard/policy");
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
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Vehicle Details</h3>
          <div className={styles.sectionContent}>
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
          </div>
        </div>

        {/* COVER DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cover Details</h3>
          <div className={styles.sectionContent}>
            {insuranceType === "Annual" ? (
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
            )}
          </div>
        </div>

        {/* PERSONAL DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Details</h3>
          <div className={styles.sectionContent}>
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
          </div>
        </div>

        {/* EMPLOYMENT DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Employment Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("Employment Status", userDetails?.employmentStatus)}
              {renderField("Industry", userDetails?.industry)}
              {renderField("Occupation", userDetails?.occupation)}
            </div>
          </div>
        </div>

        {/* CAR PARKING & USAGE SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Car Parking & Usage</h3>
          <div className={styles.sectionContent}>
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
          </div>
        </div>

        {/* LICENSE & CLAIMS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>License & Claims</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("License Type", carUsage?.licenseType)}
              {renderField("License Held Since", carUsage?.licenseHeld)}
              {renderField("License Number", carUsage?.licenseNumber)}
            </div>
            <div className={styles.row}>
              {renderField("No Claims Bonus", carUsage?.NCB)}
              {renderField("Voluntary Excess", carUsage?.voluntaryExcess)}
            </div>
          </div>
        </div>

        {/* DECLARATIONS SECTION */}
        {insuranceType !== "Impound" && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Declarations</h3>
            <div className={styles.sectionContent}>
              <div className={styles.row}>
                {renderField("Criminal Convictions", carUsage?.criminalConvictions)}
                {renderField("Medical Conditions", carUsage?.medicalConditions)}
                {renderField("Insurance Cancelled or Claim Refused", carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided)}
              </div>
            </div>
          </div>
        )}

        {/* OPTIONAL EXTRAS SECTION - ANNUAL ONLY */}
        {insuranceType === "Annual" && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Optional Extras</h3>
            <div className={styles.sectionContent}>
              <div className={styles.row}>
                {renderField("Courtesy Car", optionalExtras?.courtesyCar)}
                {renderField("Breakdown Cover", optionalExtras?.breakdownCover)}
                {renderField("Foreign Use Cover", optionalExtras?.foreignUseCover)}
              </div>
            </div>
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

        {/* MAKE CHANGES BUTTON */}
        <div className={styles.actionsSection}>
          <button
            className={styles.makeChangesBtn}
            onClick={handleMakeChanges}
            aria-label="Make changes to your policy"
          >
            Make Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsReview;
