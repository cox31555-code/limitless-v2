"use client";
import React, { useEffect, useRef } from "react";
import styles from "./dashboardFooter.module.css";
import { BiLogoInstagramAlt, BiLogoFacebook, BiLogoTwitter, BiLogoLinkedin } from "react-icons/bi";

const DashboardFooter = () => {
  const trustLogoRef = useRef(null);

  useEffect(() => {
    // Load Sectigo TrustLogo script
    const tlJsHost = window.location.protocol === "https:" ? "https://secure.trust-provider.com/" : "http://www.trustlogo.com/";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = tlJsHost + "trustlogo/javascript/trustlogo.js";

    script.onload = () => {
      // Execute the TrustLogo function after script loads
      if (window.TrustLogo) {
        window.TrustLogo("https://www.sectigo.com/images/seals/sectigo_trust_seal_lg_2x.png", "SECEV", "none");
      }
    };

    if (trustLogoRef.current) {
      trustLogoRef.current.appendChild(script);
    }

    return () => {
      if (trustLogoRef.current && script.parentNode === trustLogoRef.current) {
        trustLogoRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Section - Contact Info */}
        <div className={styles.topSection}>
          <div className={styles.headingSection}>
            <h2 className={styles.mainHeading}>Please feel free to get in touch with us</h2>
          </div>

          <div className={styles.contactColumnsWrapper}>
            <div className={styles.contactColumn}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h4 className={styles.contactTitle}>Our Location</h4>
                <p className={styles.contactText}>401 Broadway, 24th Floor, Orchard Cloud</p>
                <p className={styles.contactText}>View, London</p>
              </div>
            </div>

            <div className={styles.contactColumn}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h4 className={styles.contactTitle}>How Can We Help?</h4>
                <p className={styles.contactText}>info@yourdomain.com</p>
                <p className={styles.contactText}>contact@yourdomain.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Logo, Copyright, Socials */}
        <div className={styles.bottomSection}>
          <div className={styles.logoSection}>
            <img
              src="/svg/logo.svg"
              alt="Limitless Cover"
              className={styles.logoImage}
            />
          </div>

          <div className={styles.copyrightSection}>
            <p className={styles.copyrightText}>© 2025 Limitless Cover | All Rights Reserved</p>
          </div>

          <div className={styles.socialsSection}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <BiLogoFacebook size={18} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <BiLogoTwitter size={18} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <BiLogoInstagramAlt size={18} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <BiLogoLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
