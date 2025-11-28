import React from "react";
import styles from "./policyDetails.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

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

  return (
    <>
      {/* Policy Information Section */}
      <div className={styles.container}>
        <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
          Policy Information
        </h3>
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
        </div>
      </div>

      {/* Incident Details Section */}
      <div className={styles.container}>
        <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
          Incident Details
        </h3>
        <div className={styles.body}>
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
      </div>

      {/* Vehicle Information Section */}
      <div className={styles.container}>
        <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
          Vehicle Information
        </h3>
        <div className={styles.body}>
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
      </div>
    </>
  );
};

export default PolicyDetails;
