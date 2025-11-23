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
      <span className={styles.blueBackground}></span>
      <span className={styles.blueBackground2}></span>
      <span className={styles.blueBackground3}></span>
      <div className={styles.first}>
        <h4 className={styles.title}>Insurance policy booklets</h4>
        <p className={styles.description}>
          For RAC breakdown cover claims, please call 0345 168 5586.
        </p>
      </div>
      <div
        className={styles.second}
        onClick={handleDownload}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.download}>
          {isDownloading ? (
            <div style={{ fontSize: "12px" }}>...</div>
          ) : (
            <Image
              src="/svg/download.svg"
              alt="download"
              width={20}
              height={20}
            />
          )}
        </div>

        <p className={styles.downloadText}>
          {isDownloading ? "Downloading..." : "Download car policy booklet"}
        </p>
      </div>
    </div>
  );
};

export default Booklets;
