import React from "react";
import styles from "./thirdPartyDetails.module.css";
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

const ThirdPartyDetails = ({ claimData }) => {
  return (
    <>
      {/* Third Party Details Section */}
      <div className={styles.container}>
        <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
          Third Party Details
        </h3>
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
        </div>
      </div>

      {/* Third Party Vehicle Section */}
      <div className={styles.container}>
        <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
          Third Party Vehicle
        </h3>
        <div className={styles.body}>
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
      </div>
    </>
  );
};

export default ThirdPartyDetails;
