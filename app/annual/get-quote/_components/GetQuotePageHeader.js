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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Need help?</span>
        </button>
      </div>
    </header>
  );
};

export default GetQuotePageHeader;
