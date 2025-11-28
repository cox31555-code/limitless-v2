'use client';

import React from "react";
import ExpandableSection from "../ExpandableSection";
import styles from "./policyDetails.module.css";

const ReadOnlyField = ({ label, value }) => (
  <div className={styles.readOnlyField}>
    <label className={styles.fieldLabel}>{label}</label>
    <div className={styles.fieldValue}>{value || "Not provided"}</div>
  </div>
);

const PolicyDetails = ({ claimData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatClaimReason = (reason) => {
    if (!reason) return "Not provided";
    return reason
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      {/* Claim Type & Incident Details Section */}
      <ExpandableSection title="Claim Type & Incident Details" defaultOpen={true}>
        <div className={styles.body}>
          <ReadOnlyField
            label="Claim reason*"
            value={formatClaimReason(claimData?.claimreason)}
          />

          <ReadOnlyField
            label="Incident description*"
            value={claimData?.claimDetails?.incidentDescription}
          />

          <div className={styles.row}>
            <ReadOnlyField
              label="Date of incident (Or estimate the date)*"
              value={formatDate(claimData?.claimDetails?.incidentDate)}
            />
            <ReadOnlyField
              label="Do you take responsibility for the incident?*"
              value={claimData?.claimDetails?.responsible ? "Yes" : "No"}
            />
          </div>

          <ReadOnlyField
            label="If not, please give details"
            value={claimData?.claimDetails?.detailsIfNotResponsible}
          />
        </div>
      </ExpandableSection>

      {/* Policy & Vehicle Information Section */}
      <ExpandableSection title="Policy & Vehicle Information">
        <div className={styles.body}>
          <ReadOnlyField
            label="Enter your policy no.*"
            value={claimData?.policyNumber || "DEV-POL-001"}
          />

          <div className={styles.row}>
            <ReadOnlyField
              label="Policyholder first name*"
              value={claimData?.claimDetails?.placeHolderFirstName}
            />
            <ReadOnlyField
              label="Policyholder last name*"
              value={claimData?.claimDetails?.placeHolderLastName}
            />
          </div>

          <div className={styles.row}>
            <ReadOnlyField
              label="Your name (if you are not the policyholder)"
              value={claimData?.claimDetails?.claimentsName}
            />
            <ReadOnlyField
              label="Email address"
              value={claimData?.claimDetails?.emailAddress}
            />
          </div>

          <div className={styles.row}>
            <ReadOnlyField
              label="Where is the vehicle currently?*"
              value={claimData?.claimDetails?.vehicleLocation}
            />
            <ReadOnlyField
              label="Is the vehicle drivable?*"
              value={claimData?.claimDetails?.drivable || "Not provided"}
            />
          </div>
        </div>
      </ExpandableSection>
    </>
  );
};

export default PolicyDetails;
