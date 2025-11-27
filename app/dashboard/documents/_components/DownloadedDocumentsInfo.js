"use client";

import { useState } from "react";
import styles from "./downloadedDocumentsInfo.module.css";
import DownloadedDocumentsModal from "./DownloadedDocumentsModal";

export default function DownloadedDocumentsInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.section}>
        <h3 className={styles.title}>How to find your downloaded documents</h3>
        <p className={styles.description}>
          You would have chosen a folder on your device that your downloaded documents are saved in. Find more information{" "}
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.link}
          >
            here
          </button>.
        </p>
      </div>

      <DownloadedDocumentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
