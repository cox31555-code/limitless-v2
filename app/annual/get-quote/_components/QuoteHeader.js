"use client";
import React from "react";
import styles from "./quoteHeader.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const QuoteHeader = ({ title = "Annual Car Insurance" }) => {
  const router = useRouter();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.leftSection}>
          <Image
            src="/svg/logo.svg"
            alt="Limitless Cover"
            width={56}
            height={56}
            className={styles.logo}
            onClick={() => router.push("/")}
          />
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>

        <div className={styles.rightSection}>
          <button 
            className={styles.helpBtn}
            onClick={() => router.push("/contact")}
            aria-label="Get help"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Need help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteHeader;
