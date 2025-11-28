"use client";

import Image from "next/image";
import styles from "./olderDocuments.module.css";

const documents = [
  {
    id: 1,
    title: "Your policy has been cancelled",
    date: "Wed 3 Apr, 2024",
  },
  {
    id: 2,
    title: "Thanks for renewing your policy",
    date: "Sun 10 Mar, 2024",
  },
  {
    id: 3,
    title: "It is time to renew your policy",
    date: "Sat 10 Feb, 2024",
  },
  {
    id: 4,
    title: "Your welcome pack",
    date: "Thu 9 Mar, 2023",
  },
];

export default function OlderDocuments() {
  const handleView = (docId) => {
    console.log("View document:", docId);
  };

  const handleDownload = (docId) => {
    console.log("Download document:", docId);
  };

  const handleSendByPost = (docId) => {
    console.log("Send by post:", docId);
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Older documents</h3>

      <div className={styles.emptyState}>
        <p className={styles.emptyStateMessage}>No older documents available</p>
      </div>
    </div>
  );
}
