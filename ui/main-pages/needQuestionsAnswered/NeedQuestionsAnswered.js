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
                <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm-2 20h4v4h-4v-4zm0-14h4v12h-4V8z" fill="#0388FF"/>
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
                <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm-3 19h2v2h-2v-2zm0-12h2v10h-2V9z" fill="#0388FF"/>
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
                <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 26c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12zm3.5-9c.83 0 1.5-.67 1.5-1.5S20.33 14 19.5 14 18 14.67 18 15.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S13.33 14 12.5 14 11 14.67 11 15.5 11.67 17 12.5 17zm3.5 6c2.33 0 4.31-1.46 5.11-3.5H10.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#0388FF"/>
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
