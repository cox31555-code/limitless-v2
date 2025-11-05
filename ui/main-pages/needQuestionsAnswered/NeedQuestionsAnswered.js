"use client";
import React from "react";
import styles from "./needQuestionsAnswered.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const NeedQuestionsAnswered = () => {
  const router = useRouter();

  return (
    <div className={styles.container} suppressHydrationWarning>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Need Questions <span className={styles.highlight}>Answered?</span>
          </h2>
          <p className={`${styles.subtitle} ${manrope.className}`}>
            We're here to help with everything you need to know about our insurance products and services.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 24c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm3.5-15h-7v2h7v-2zm0 4h-7v2h7v-2zm0 4h-7v2h7v-2z" fill="#000822"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Frequently Asked Questions
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Check our comprehensive FAQ section to find answers to common questions about our insurance products, coverage, and policies.
            </p>
            <button 
              className={styles.cardLink}
              onClick={() => router.push('/FAQ')}
              aria-label="View FAQ"
            >
              Explore FAQ
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6M11 7l3 3-3 3" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 2H6C3.9 2 2.1 3.9 2.1 6L2 26c0 2.1 1.9 4 4 4h20c2.1 0 4-1.9 4-4V6c0-2.1-1.9-4-4-4zm0 24H6V6h20v20zm-2-16h-4v2h4v-2zm0 4h-4v2h4v-2zm0 4h-4v2h4v-2z" fill="#000822"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Documentation & Guides
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Read our detailed guides and documentation to understand our different insurance products and make the best choice for your needs.
            </p>
            <button 
              className={styles.cardLink}
              onClick={() => router.push('/about-us')}
              aria-label="Learn more"
            >
              Read Guides
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6M11 7l3 3-3 3" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C8.27 2 2 8.27 2 16c0 2.56.64 5.04 1.76 7.2L2 30l5.8-1.76C11 29.36 13.44 30 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm0 24c-2.04 0-3.96-.44-5.72-1.24l-.4-.2-4.16 1.24 1.24-4.16-.2-.4c-.8-1.76-1.24-3.68-1.24-5.72 0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" fill="#0388FF"/>
              </svg>
            </div>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Customer Support
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Can't find what you're looking for? Get in touch with our friendly support team and we'll be happy to help you out.
            </p>
            <button 
              className={styles.cardLink}
              onClick={() => router.push('/contact')}
              aria-label="Contact support"
            >
              Contact Us
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6M11 7l3 3-3 3" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedQuestionsAnswered;
