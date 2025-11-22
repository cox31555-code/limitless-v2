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
    },
    {
      name: "Policy Schedule",
      pdfType: "product-info",
    },
    {
      name: "Statement of Fact",
      pdfType: "statement",
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Image
          src="/svg/pdf.svg"
          alt="documents"
          width={32}
          height={32}
        />
        <h3 className={styles.title}>Policy documents</h3>
      </div>

      <div className={styles.documentsList}>
        {documents.map((doc, index) => (
          <div key={index} className={styles.documentItem}>
            <div className={styles.documentInfo}>
              <Image
                src="/svg/doc.svg"
                alt="document"
                width={20}
                height={20}
              />
              <span className={styles.documentName}>{doc.name}</span>
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
