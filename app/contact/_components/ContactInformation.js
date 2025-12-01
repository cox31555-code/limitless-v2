import React from "react";
import Link from "next/link";
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
            Still need help? Contact us
          </h2>
          <p className={`${styles.description} ${manrope.className}`}>
            Reach out to us through any of these channels and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Chat to us
            </h3>
            <p className={`${styles.cardText} ${manrope.className}`}>
              The fastest way to contact us is by live chat. Our team will be happy to help.
            </p>
            <button
              className={`${styles.button} ${manrope.className}`}
              onClick={() => {
                if (typeof window !== "undefined" && window.$crisp) {
                  window.$crisp.push(["do", "chat:open"]);
                }
              }}
            >
              Chat to us
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              WhatsApp
            </h3>
            <p className={`${styles.cardText} ${manrope.className}`}>
              Scan the QR code with your phone's camera or click below to start messaging.
            </p>
            <div className={styles.qrCode}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" fill="white"/>
                <rect x="8" y="8" width="8" height="8" fill="black"/>
                <rect x="24" y="8" width="8" height="8" fill="black"/>
                <rect x="40" y="8" width="8" height="8" fill="black"/>
                <rect x="56" y="8" width="8" height="8" fill="black"/>
                <rect x="64" y="8" width="8" height="8" fill="black"/>
                <rect x="8" y="16" width="8" height="8" fill="black"/>
                <rect x="40" y="16" width="8" height="8" fill="black"/>
                <rect x="64" y="16" width="8" height="8" fill="black"/>
                <rect x="8" y="24" width="8" height="8" fill="black"/>
                <rect x="24" y="24" width="8" height="8" fill="black"/>
                <rect x="40" y="24" width="8" height="8" fill="black"/>
                <rect x="56" y="24" width="8" height="8" fill="black"/>
                <rect x="64" y="24" width="8" height="8" fill="black"/>
                <rect x="8" y="32" width="8" height="8" fill="black"/>
                <rect x="24" y="32" width="8" height="8" fill="black"/>
                <rect x="40" y="32" width="8" height="8" fill="black"/>
                <rect x="56" y="32" width="8" height="8" fill="black"/>
                <rect x="64" y="32" width="8" height="8" fill="black"/>
                <rect x="8" y="40" width="8" height="8" fill="black"/>
                <rect x="64" y="40" width="8" height="8" fill="black"/>
                <rect x="8" y="48" width="8" height="8" fill="black"/>
                <rect x="16" y="48" width="8" height="8" fill="black"/>
                <rect x="24" y="48" width="8" height="8" fill="black"/>
                <rect x="32" y="48" width="8" height="8" fill="black"/>
                <rect x="40" y="48" width="8" height="8" fill="black"/>
                <rect x="48" y="48" width="8" height="8" fill="black"/>
                <rect x="56" y="48" width="8" height="8" fill="black"/>
                <rect x="64" y="48" width="8" height="8" fill="black"/>
                <rect x="24" y="56" width="8" height="8" fill="black"/>
                <rect x="40" y="56" width="8" height="8" fill="black"/>
                <rect x="48" y="56" width="8" height="8" fill="black"/>
                <rect x="8" y="64" width="8" height="8" fill="black"/>
                <rect x="24" y="64" width="8" height="8" fill="black"/>
                <rect x="40" y="64" width="8" height="8" fill="black"/>
                <rect x="56" y="64" width="8" height="8" fill="black"/>
                <rect x="64" y="64" width="8" height="8" fill="black"/>
              </svg>
            </div>
            <button className={`${styles.button} ${manrope.className}`}>
              Message on WhatsApp
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Give us a call
            </h3>
            <p className={`${styles.cardText} ${manrope.className}`}>
              Prefer to call? Here's our contact numbers and opening hours.
            </p>
            <Link href="/contact/contact-numbers" className={`${styles.button} ${manrope.className}`}>
              Contact numbers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
