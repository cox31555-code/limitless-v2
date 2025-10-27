"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Table from "./table/Table";
import Booklets from "./booklets/Booklets";
import Dropdown from "./dropdown/Dropdown";
import DownloadButton from "./DownloadButton";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
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

  // Format data for table - 3 documents per insurance
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    } catch (e) {
      return "—";
    }
  };

  const tableData = selectedInsurance
    ? [
        {
          document: "Certificate of Motor Insurance",
          documentNumber: formatDate(selectedInsurance.createdAt),
          documentType: (
            <DownloadButton
              insuranceId={selectedInsurance._id}
              pdfType="certificate"
              label="Download"
            />
          ),
        },
        {
          document: "Policy Schedule",
          documentNumber: formatDate(selectedInsurance.createdAt),
          documentType: (
            <DownloadButton
              insuranceId={selectedInsurance._id}
              pdfType="product-info"
              label="Download"
            />
          ),
        },
        {
          document: "Statement of Fact",
          documentNumber: formatDate(selectedInsurance.createdAt),
          documentType: (
            <DownloadButton
              insuranceId={selectedInsurance._id}
              pdfType="statement"
              label="Download"
            />
          ),
        },
      ]
    : [];

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Policy documents
        </h3>
        <Dropdown
          insurances={insurances}
          selectedInsuranceId={selectedInsuranceId}
          onInsuranceChange={handleInsuranceChange}
        />
      </div>

      {tableData.length > 0 ? (
        <Table
          title="Policy documents"
          columns={["Policy Number", "Document number", "Document type"]}
          data={tableData}
        />
      ) : (
        <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
          <p>No insurance policies found.</p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>
            Please complete your insurance application to view your documents.
          </p>
        </div>
      )}

      <Booklets />
    </div>
  );
}
