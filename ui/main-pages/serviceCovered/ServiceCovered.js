import React from "react";
import styles from "./serviceCovered.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke="#0CA86E" strokeWidth="1.5" />
    <path d="M8 12L11 15L16 9" stroke="#0CA86E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke="#E74C3C" strokeWidth="1.5" />
    <path d="M8 8L16 16M16 8L8 16" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ServiceCovered = ({ title, description, covered, unCovered }) => {
  const words = title.split(" ");
  const lastThreeWords = words.slice(-3).join(" ");
  const withoutLastThreeWords = words.slice(0, -3).join(" ");

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          {withoutLastThreeWords}
          <span>{lastThreeWords}</span>
        </h2>
        {description && (
          <p className={`${styles.description} ${manrope.className}`}>
            {description}
          </p>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>✓</div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              {covered.title}
            </h3>
          </div>
          <div className={styles.itemsList}>
            {covered.features.map((feature, index) => (
              <div className={styles.item} key={index}>
                <CheckIcon />
                <p className={`${styles.itemText} ${manrope.className}`}>{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>✕</div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              {unCovered.title}
            </h3>
          </div>
          <div className={styles.itemsList}>
            {unCovered.features.map((feature, index) => (
              <div className={styles.item} key={index}>
                <CrossIcon />
                <p className={`${styles.itemText} ${manrope.className}`}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCovered;
