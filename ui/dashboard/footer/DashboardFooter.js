"use client";
import React from "react";
import styles from "./dashboardFooter.module.css";

const DashboardFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Section - Trust & Partnership Info */}
        <div className={styles.topSection}>
          <div className={styles.trustSection}>
            <div className={styles.securityBadge}>
              <a
                href="https://www.sectigo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.sectigo.com/images/seals/sectigo_trust_seal_lg_2x.png"
                  alt="Secured by Sectigo"
                  className={styles.sectigoImage}
                />
              </a>
            </div>
            <div className={styles.securityInfo}>
              <h4 className={styles.securityTitle}>We'll keep your details safe</h4>
              <p className={styles.securityText}>Our website is constantly monitored to check for harmful viruses or malware.</p>
            </div>
          </div>

          <div className={styles.partnershipSection}>
            <div className={styles.partnershipLogos} />
            <p className={styles.partnershipText}>Proud Partner of Team GB and Paralympics GB</p>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className={styles.linksSection}>
          <a href="#" className={styles.footerLink}>Complaints</a>
          <span className={styles.linkSeparator}>•</span>
          <a href="#" className={styles.footerLink}>Our cookie policy</a>
          <span className={styles.linkSeparator}>•</span>
          <a href="#" className={styles.footerLink}>Personal data rights</a>
        </div>

        {/* Disclaimer Section */}
        <div className={styles.disclaimerSection}>
          <p className={styles.disclaimerText}>
            This insurance is arranged, underwritten and administered by Liverpool Victoria Insurance Company Limited, which is an Allianz Group company, registered in England and Wales under number 3192943. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority, register number 202965. Registered address: 57 Ladymead, Guildford, Surrey, GU1 1DB. Allianz Online is a trading name of Liverpool Victoria Insurance Company Limited.
          </p>
        </div>

        {/* Bottom Section - Copyright */}
        <div className={styles.bottomSection}>
          <div className={styles.copyrightSection}>
            <p className={styles.copyrightText}>© 2025 Limitless Cover | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
