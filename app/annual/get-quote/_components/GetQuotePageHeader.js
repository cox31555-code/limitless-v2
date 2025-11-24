"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./getQuotePageHeader.module.css";

const GetQuotePageHeader = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Image
            onClick={() => router.push("/")}
            src="/svg/logo.svg"
            alt="Limitless Cover"
            width={56}
            height={56}
            className={styles.logo}
          />
          <h2 className={styles.headerTitle}>Limitless Cover</h2>
        </div>

        <button
          className={styles.helpBtn}
          onClick={() => router.push("/contact")}
          aria-label="Get help"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>Need help?</span>
        </button>
      </div>
    </header>
  );
};

export default GetQuotePageHeader;
