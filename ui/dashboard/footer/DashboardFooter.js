"use client";
import React from "react";
import styles from "./dashboardFooter.module.css";

const DashboardFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Security Badge Section */}
        <div className={styles.securitySection}>
          <div className={styles.securityBadge}>
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="10" y="10" width="80" height="80" rx="10"></rect>
              <text x="50" y="60" textAnchor="middle" fontSize="36" fontWeight="bold" fill="currentColor">
                S
              </text>
            </svg>
          </div>
          <div className={styles.securityContent}>
            <h3 className={styles.securityTitle}>We'll keep your details safe</h3>
            <p className={styles.securityDescription}>
              Our website is constantly monitored to check for harmful viruses or malware.
            </p>
          </div>
        </div>

        {/* Partners Section */}
        <div className={styles.partnersSection}>
          <div className={styles.partnersLogos}>
            <div className={styles.partnerLogo}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <text x="50" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">
                  TEAM GB
                </text>
              </svg>
            </div>
            <div className={styles.allianzLogo}>Allianz</div>
            <div className={styles.paralympicsLogo}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <text x="50" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">
                  PARALYMPICS
                </text>
              </svg>
            </div>
          </div>
          <p className={styles.partnersText}>Proud Partner of Team GB and ParalympicsGB</p>
        </div>

        {/* Legal Links */}
        <div className={styles.legalLinks}>
          <a href="#complaints" className={styles.legalLink}>
            Complaints
          </a>
          <a href="#cookies" className={styles.legalLink}>
            Our cookie policy
          </a>
          <a href="#privacy" className={styles.legalLink}>
            Personal data rights
          </a>
        </div>

        {/* Legal Disclaimer */}
        <div className={styles.disclaimer}>
          <p className={styles.disclaimerText}>
            This insurance is arranged, underwritten and administered by Liverpool Victoria Insurance Company Limited, which is an Allianz Group company, registered in England and Wales number 3232514. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority, register number 202965. Registered address: 57 Ladymead, Guildford, Surrey, GU1 1DB. Limitless Cover is a trading name of Liverpool Victoria Insurance Company Limited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
