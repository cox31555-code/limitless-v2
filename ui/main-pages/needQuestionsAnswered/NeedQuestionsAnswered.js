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

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10H16M11 5L16 10L11 15" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NeedQuestionsAnswered = () => {
  const router = useRouter();

  return (
    <div className={styles.container} suppressHydrationWarning>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Need Questions <span>Answered?</span>
      </h2>

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            Frequently Asked Questions
          </h3>
          <p className={`${styles.cardDescription} ${manrope.className}`}>
            Have questions? Check our FAQ to see if your question has already been addressed before.
          </p>
          <button 
            className={styles.cardButton}
            onClick={() => router.push('/FAQ')}
            aria-label="View FAQ"
          >
            Learn More
            <ArrowIcon />
          </button>
        </div>

        <div className={styles.card}>
          <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            Learn More About Our Services
          </h3>
          <p className={`${styles.cardDescription} ${manrope.className}`}>
            Buying insurance can be a stressful experience! Feel free to read our documentation and guides on each insurance we provide to make your decision simpler.
          </p>
          <button 
            className={styles.cardButton}
            onClick={() => router.push('/about-us')}
            aria-label="Learn more"
          >
            Learn More
            <ArrowIcon />
          </button>
        </div>

        <div className={styles.card}>
          <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            Real Human Customer Support
          </h3>
          <p className={`${styles.cardDescription} ${manrope.className}`}>
            Can't find your question? Feel free to email our support team and we will get back to you as soon as possible.
          </p>
          <button 
            className={styles.cardButton}
            onClick={() => router.push('/contact')}
            aria-label="Contact support"
          >
            Contact Us
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedQuestionsAnswered;
