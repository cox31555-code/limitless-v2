"use client";
import React from "react";
import styles from "./dashboardFooter.module.css";

const DashboardFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.topContainer}>
          {/* Left: Security & Trust */}
          <div className={styles.securityBox}>
            <div className={styles.securityBadge}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2Fc65a318b451349e7a8e695f99b795110?format=webp&width=800"
                alt="Secured by Sectigo"
                className={styles.sectigoImage}
              />
            </div>
            <div className={styles.securityInfo}>
              <h3 className={styles.securityTitle}>We'll keep your details safe</h3>
              <p className={styles.securityText}>
                Our website is constantly monitored to check for harmful viruses or malware.
              </p>
            </div>
          </div>

          {/* Right: Partners */}
          <div className={styles.partnersBox}>
            <p className={styles.partnersHeading}>Proud Partner of</p>
            <div className={styles.partnersList}>
              <span className={styles.partner}>Team GB</span>
              <span className={styles.partner}>Allianz</span>
              <span className={styles.partner}>ParalympicsGB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <div className={styles.bottomContainer}>
          {/* Links */}
          <div className={styles.linksRow}>
            <a href="#complaints" className={styles.footerLink}>Complaints</a>
            <a href="#cookies" className={styles.footerLink}>Our cookie policy</a>
            <a href="#privacy" className={styles.footerLink}>Personal data rights</a>
          </div>

          {/* Disclaimer */}
          <div className={styles.disclaimerBox}>
            <p className={styles.disclaimerText}>
              This insurance is arranged, underwritten and administered by Liverpool Victoria Insurance Company Limited, which is an Allianz Group company, registered in England and Wales number 3232514. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority, register number 202965. Registered address: 57 Ladymead, Guildford, Surrey, GU1 1DB. Limitless Cover is a trading name of Liverpool Victoria Insurance Company Limited.
            </p>
          </div>

          {/* Copyright */}
          <div className={styles.copyrightRow}>
            <p className={styles.copyright}>© 2024 Limitless Cover. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
