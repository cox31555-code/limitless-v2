"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "../page.module.css";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";
import Dropdown from "./dropdown/Dropdown";
import PolicyDocumentsSection from "./PolicyDocumentsSection";

// Lazy load heavy sections
const Booklets = dynamic(() => import("./booklets/Booklets"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const NcdInfoSection = dynamic(() => import("./NcdInfoSection"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const ReceiveDocumentsSection = dynamic(() => import("./ReceiveDocumentsSection"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const DownloadedDocumentsInfo = dynamic(() => import("./DownloadedDocumentsInfo"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const OlderDocuments = dynamic(() => import("./OlderDocuments"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

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

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <section>
          <Booklets />
        </section>
      </Suspense>

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <section>
          <NcdInfoSection />
        </section>
      </Suspense>

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <section>
          <ReceiveDocumentsSection />
        </section>
      </Suspense>

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <section>
          <DownloadedDocumentsInfo />
        </section>
      </Suspense>

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <section>
          <OlderDocuments />
        </section>
      </Suspense>

      <NeedHelpSection />
    </div>
  );
}
