"use client";

import Image from "next/image";
import DocumentActions from "./DocumentActions";
import styles from "./policyDocumentsSection.module.css";

export default function PolicyDocumentsSection({ selectedInsurance }) {
  if (!selectedInsurance) {
    return null;
  }

  const documents = [
    {
      name: "Certificate of Motor Insurance",
      pdfType: "certificate",
      dateAdded: selectedInsurance?.createdAt ? new Date(selectedInsurance.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A",
    },
    {
      name: "Policy Schedule",
      pdfType: "product-info",
      dateAdded: selectedInsurance?.createdAt ? new Date(selectedInsurance.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A",
    },
    {
      name: "Statement of Fact",
      pdfType: "statement",
      dateAdded: selectedInsurance?.createdAt ? new Date(selectedInsurance.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A",
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>Policy documents</h3>
      </div>

      <div className={styles.documentsList}>
        {documents.map((doc, index) => (
          <div key={index} className={styles.documentItem}>
            <div className={styles.documentInfo}>
              <Image
                src="/svg/pdf-doc.svg"
                alt="document"
                width={32}
                height={32}
              />
              <div className={styles.documentDetails}>
                <span className={styles.documentName}>{doc.name}</span>
                <span className={styles.dateAdded}>Date added: {doc.dateAdded}</span>
              </div>
            </div>
            <div className={styles.documentActions}>
              <DocumentActions
                insuranceId={selectedInsurance._id}
                pdfType={doc.pdfType}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
