import React from "react";
import Link from "next/link";
import styles from "./emailUsSection.module.css";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const EmailUsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
            Get in Touch
          </h2>
          <p className={`${styles.sectionDescription} ${manrope.className}`}>
            Whether you need support or want to share feedback, we're here to help.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#0052a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
              Email us
            </h3>
            <p className={`${styles.text} ${manrope.className}`}>
              If you have any insurance-related queries or need to tell us about a technical difficulty, please email us at{" "}
              <a href="mailto:support@limitlesscover.co.uk" className={styles.link}>
                support@limitlesscover.co.uk
              </a>
            </p>
            <p className={`${styles.text} ${manrope.className}`}>
              Email replies can take up to 24 hours during busy periods. In extreme cases, it can take a little longer.
            </p>
            <p className={`${styles.text} ${manrope.className}`}>
              Please don't email again if you're waiting for a reply, as this can delay us getting back to you.
            </p>
            <Link href="/contact/email" className={`${styles.button} ${manrope.className}`}>
              Send an email
            </Link>
          </div>

          <div className={`${styles.card} ${styles.complaintCard}`}>
            <div className={styles.complaintIcon}>
              <svg width="32" height="32" viewBox="-2 0 19 19" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.032 5.286v7.276a1.112 1.112 0 0 1-1.108 1.108H8.75l-1.02 1.635a.273.273 0 0 1-.503 0l-1.02-1.635h-4.13a1.112 1.112 0 0 1-1.109-1.108V5.286a1.112 1.112 0 0 1 1.108-1.108h10.848a1.112 1.112 0 0 1 1.108 1.108zM8.206 11.34a.706.706 0 1 0-.706.705.706.706 0 0 0 .706-.705zm-1.26-1.83a.554.554 0 1 0 1.108 0V6.275a.554.554 0 1 0-1.108 0z"/>
              </svg>
            </div>
            <h3 className={`${styles.complaintTitle} ${plusJakartaSans.className}`}>
              Make a complaint
            </h3>
            <p className={`${styles.complaintText} ${manrope.className}`}>
              Tell us if you're not happy with our service. We take all feedback seriously and will work to resolve your concerns.
            </p>
            <a href="/complaints" className={`${styles.complaintButton} ${manrope.className}`}>
              Make a complaint
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailUsSection;
