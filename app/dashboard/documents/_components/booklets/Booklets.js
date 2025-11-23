"use client";

import React, { useState } from "react";
import styles from "./booklets.module.css";
import Image from "next/image";
import { downloadStaticPDF } from "@/lib/pdfDownload";

const Booklets = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadStaticPDF("Your Policy Booklet.pdf");
    setIsDownloading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/svg/document-text.svg"
          alt="booklet"
          width={32}
          height={32}
        />
        <h3 className={styles.title}>Insurance policy booklets</h3>
      </div>

      <p className={styles.description}>
        For RAC breakdown cover claims, please call{" "}
        <a href="tel:03451685586" className={styles.phoneLink}>
          0345 168 5586
        </a>
        .
      </p>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={styles.downloadButton}
      >
        <Image
          src="/svg/download.svg"
          alt="download"
          width={20}
          height={20}
        />
        <span>{isDownloading ? "Downloading..." : "Download car policy booklet"}</span>
      </button>
    </div>
  );
};

export default Booklets;
