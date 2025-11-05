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
                <circle cx="16" cy="16" r="8" stroke="#0388FF" strokeWidth="1.5" fill="none"/>
                <circle cx="16" cy="16" r="5" fill="none" stroke="#000822" strokeWidth="1.5"/>
                <circle cx="16" cy="12" r="1.5" fill="#0388FF"/>
                <path d="M16 16L19 20" stroke="#0388FF" strokeWidth="1.5" strokeLinecap="round"/>
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
                <path d="M8 14C8 12.9 8.9 12 10 12H22C23.1 12 24 12.9 24 14V20C24 21.1 23.1 22 22 22H10C8.9 22 8 21.1 8 20V14Z" stroke="#0388FF" strokeWidth="1.5" fill="none"/>
                <path d="M8 14L16 18L24 14" stroke="#000822" strokeWidth="1.5" fill="none"/>
                <path d="M12 16V20" stroke="#0388FF" strokeWidth="1" strokeLinecap="round"/>
                <path d="M20 16V20" stroke="#0388FF" strokeWidth="1" strokeLinecap="round"/>
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
