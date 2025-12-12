'use client';

import React from "react";
import ExpandableSection from "../ExpandableSection";
import styles from "./thirdPartyDetails.module.css";

const ReadOnlyField = ({ label, value }) => (
  <div className={styles.readOnlyField}>
    <label className={styles.fieldLabel}>{label}</label>
    <div className={styles.fieldValue}>{value || "Not provided"}</div>
  </div>
);

const ThirdPartyDetails = ({ claimData }) => {
  return (
    <>
      {/* Third Party Details & Vehicle Section */}
      <ExpandableSection title="Third Party Details & Vehicle">
        <div className={styles.body}>
          <div className={styles.row}>
            <ReadOnlyField
              label="Third party name*"
              value={claimData?.name}
            />
            <ReadOnlyField
              label="Third party phone number*"
              value={claimData?.phone || "Not provided"}
            />
          </div>

          <div className={styles.row}>
            <ReadOnlyField
              label="Third party postcode*"
              value={claimData?.postcode || "Not provided"}
            />
            <ReadOnlyField
              label="Third party address*"
              value={claimData?.address || "Not provided"}
            />
          </div>

          <ReadOnlyField
            label="Third party vehicle registration number*"
            value={claimData?.registrationNumber}
          />

          <div className={styles.row}>
            <ReadOnlyField
              label="Third party vehicle make*"
              value={claimData?.make || "Not provided"}
            />
            <ReadOnlyField
              label="Third party vehicle model*"
              value={claimData?.model || "Not provided"}
            />
          </div>

          <ReadOnlyField
            label="Tell us about any damage to the third party vehicle*"
            value={claimData?.damage || "Not provided"}
          />
        </div>
      </ExpandableSection>
    </>
  );
};

export default ThirdPartyDetails;
