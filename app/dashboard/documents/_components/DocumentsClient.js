"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Booklets from "./booklets/Booklets";
import Dropdown from "./dropdown/Dropdown";
import PolicyDocumentsSection from "./PolicyDocumentsSection";
import ReceiveDocumentsSection from "./ReceiveDocumentsSection";

export default function DocumentsClient({ insurances }) {
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(
    insurances.length > 0 ? insurances[0]._id : null
  );

  const handleInsuranceChange = (insuranceId) => {
    setSelectedInsuranceId(insuranceId);
  };

  // Get selected insurance
  const selectedInsurance = insurances.find(
    (ins) => ins._id === selectedInsuranceId
  );

  return (
    <div className={styles.contentWrapper}>
      <section className={styles.policiesSection}>
        <div className={styles.sectionHeaderWrapper}>
          <div className={styles.policySection}>
            <div className={styles.selectedPolicyLabel}>
              <h2 className={styles.selectedPolicyTitle}>Selected Policy</h2>
            </div>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                insurances={insurances}
                selectedInsuranceId={selectedInsuranceId}
                onInsuranceChange={handleInsuranceChange}
              />
            </div>
          </div>
          <h2 className={styles.documentsTitle}>Your documents</h2>
        </div>

        {selectedInsurance ? (
          <div className={styles.sectionsContainer}>
            <PolicyDocumentsSection selectedInsurance={selectedInsurance} />
            <ReceiveDocumentsSection />
          </div>
        ) : (
          <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
            <p>No insurance policies found.</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Please complete your insurance application to view your documents.
            </p>
          </div>
        )}
      </section>

      <section>
        <Booklets />
      </section>
    </div>
  );
}
