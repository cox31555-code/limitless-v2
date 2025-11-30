"use client";
import React from "react";
import styles from "./faqPreview.module.css";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const FAQPreview = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Still looking for <span className={styles.highlight}>answers?</span>
          </h2>
          <p className={`${styles.subtitle} ${manrope.className}`}>
            We're here to help with everything you need to know about our insurance products and services.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Frequently Asked Questions
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Check our comprehensive FAQ section to find answers to common questions about our insurance products and coverage.
            </p>
            <Link href="/FAQ" className={styles.cardLink}>
              Explore FAQ
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6M11 7l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className={styles.card}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              How-to Guides
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Step-by-step guides to help you manage your policy, make updates, and get the most from your account.
            </p>
            <Link href="/FAQ" className={styles.cardLink}>
              Read Guides
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6M11 7l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className={styles.card}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Contact Support
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Can't find what you're looking for? Get in touch with our friendly support team and we'll help you out.
            </p>
            <Link href="/contact" className={styles.cardLink}>
              Contact Us
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6M11 7l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPreview;
