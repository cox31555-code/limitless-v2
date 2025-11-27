"use client";

import styles from "./downloadedDocumentsInfo.module.css";

export default function DownloadedDocumentsInfo() {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>How to find your downloaded documents</h3>
      <p className={styles.description}>
        You would have chosen a folder on your device that your downloaded documents are saved in. Find more information{" "}
        <a href="#" className={styles.link}>here</a>.
      </p>
    </div>
  );
}
