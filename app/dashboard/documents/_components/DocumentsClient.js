"use client";

import { useState } from "react";
import styles from "../page.module.css";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";
import Booklets from "./booklets/Booklets";
import Dropdown from "./dropdown/Dropdown";
import PolicyDocumentsSection from "./PolicyDocumentsSection";
import NcdInfoSection from "./NcdInfoSection";
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
          <div className={styles.policyContainer}>
            <label className={styles.policyLabel}>Selected Policy</label>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                insurances={insurances}
                selectedInsuranceId={selectedInsuranceId}
                onInsuranceChange={handleInsuranceChange}
              />
            </div>
          </div>
          <h2 className={styles.documentsTitle}>Your Motor Insurance Documents</h2>
        </div>

        {selectedInsurance ? (
          <div className={styles.sectionsContainer}>
            <PolicyDocumentsSection selectedInsurance={selectedInsurance} />
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

      <section>
        <NcdInfoSection />
      </section>

      <section>
        <ReceiveDocumentsSection />
      </section>

      <NeedHelpSection />
    </div>
  );
}
