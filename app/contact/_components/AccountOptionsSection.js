import React from "react";
import styles from "./accountOptionsSection.module.css";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const AccountOptionsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              My Account
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              The quickest and easiest way to view and manage your policy is online in My Account.
            </p>
            <ul className={`${styles.featureList} ${manrope.className}`}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Get instant access to your documents
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Renew your policy and access your renewal quote
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Make a change and update your details
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Upload your proof of No Claims Bonus
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.authContent}>
              <Link href="/login" className={`${styles.registerButton} ${manrope.className}`}>
                Register
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/login" className={`${styles.loginButton} ${manrope.className}`}>
                Login
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/dashboard" className={`${styles.helpLink} ${manrope.className}`}>
                My Account help
              </Link>
              <Link href="/dashboard" className={`${styles.policyButton} ${manrope.className}`}>
                Need help with your Swinton Go! policy?
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className={`${styles.card} ${styles.helpCard}`}>
            <div className={styles.iconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Help Centre
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Visit our help centre for frequently asked questions and how-tos, and get the answer you need
            </p>
            <Link href="/FAQ" className={`${styles.helpButton} ${manrope.className}`}>
              Help Centre
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountOptionsSection;
