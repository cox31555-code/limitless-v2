"use client";

import React from "react";
import styles from "./getQuoteFooterBanner.module.css";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const GetQuoteFooterBanner = () => {
  const router = useRouter();

  return (
    <div className={styles.banner} suppressHydrationWarning>
      <div className={styles.content} suppressHydrationWarning>
        <div className={styles.textContent}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`} suppressHydrationWarning>
            Need help with your quote?
          </h3>
          <p className={styles.description}>
            Our support team is here to answer any questions about your insurance coverage
          </p>
        </div>
        <button
          className={styles.contactBtn}
          onClick={() => router.push("/contact")}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default GetQuoteFooterBanner;
