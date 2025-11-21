"use client";
import React from "react";
import styles from "./dashboardFooter.module.css";

const DashboardFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section: Security & Trust */}
        <div className={styles.topSection}>
          <div className={styles.trustSection}>
            <div className={styles.trustItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2Fc65a318b451349e7a8e695f99b795110?format=webp&width=800"
                alt="Secured by Sectigo"
                className={styles.sectigo}
              />
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
            <p className={styles.partnersLabel}>Proud Partner of</p>
            <div className={styles.partnersLogos}>
              <span className={styles.partnerText}>Team GB</span>
              <span className={styles.partnerDivider}>•</span>
              <span className={styles.partnerText}>Allianz</span>
              <span className={styles.partnerDivider}>•</span>
              <span className={styles.partnerText}>ParalympicsGB</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Legal Links */}
        <div className={styles.linksSection}>
          <a href="#complaints" className={styles.legalLink}>Complaints</a>
          <span className={styles.linkDivider}>|</span>
          <a href="#cookies" className={styles.legalLink}>Our cookie policy</a>
          <span className={styles.linkDivider}>|</span>
          <a href="#privacy" className={styles.legalLink}>Personal data rights</a>
        </div>

        {/* Bottom Section: Legal Disclaimer */}
        <div className={styles.disclaimer}>
          <p className={styles.disclaimerText}>
            This insurance is arranged, underwritten and administered by Liverpool Victoria Insurance Company Limited, which is an Allianz Group company, registered in England and Wales number 3232514. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority, register number 202965. Registered address: 57 Ladymead, Guildford, Surrey, GU1 1DB. Limitless Cover is a trading name of Liverpool Victoria Insurance Company Limited.
          </p>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2024 Limitless Cover. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
