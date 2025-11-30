import React from "react";
import styles from "./contactInformation.module.css";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const ContactInformation = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Contact Information
          </h2>
          <p className={`${styles.description} ${manrope.className}`}>
            Reach out to us through any of these channels and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Phone
            </h3>
            <p className={`${styles.cardText} ${manrope.className}`}>
              Prefer to call? Here's our contact number and opening hours.
            </p>
            <div className={styles.info}>
              <span className={`${styles.infoValue} ${manrope.className}`}>
                +442080586743
              </span>
            </div>
            <button className={`${styles.button} ${manrope.className}`}>
              Contact numbers
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Email
            </h3>
            <p className={`${styles.cardText} ${manrope.className}`}>
              Send us an email and we'll respond as soon as possible.
            </p>
            <div className={styles.info}>
              <span className={`${styles.infoValue} ${manrope.className}`}>
                support@limitlesscover.co.uk
              </span>
            </div>
            <button className={`${styles.button} ${manrope.className}`}>
              Send an email
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Address
            </h3>
            <p className={`${styles.cardText} ${manrope.className}`}>
              Visit us or send correspondence to our office.
            </p>
            <div className={styles.info}>
              <span className={`${styles.infoValue} ${manrope.className}`}>
                Limitless Cover, 82a James Carter Road, Mildenhall, United Kingdom, IP28 7DE
              </span>
            </div>
            <button className={`${styles.button} ${manrope.className}`}>
              View on map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
