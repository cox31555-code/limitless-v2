import React from "react";
import styles from "./serviceCovered.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});

const ServiceCovered = ({ title, description, covered, unCovered }) => {
  const words = title.split(" ");
  const lastThreeWords = words.slice(-3).join(" ");
  const withoutLastThreeWords = words.slice(0, -3).join(" ");

  const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#39FD8B" />
      <path d="M7.42969 11.9225L9.67756 14.9847C10.2259 15.7316 11.3468 15.7159 11.8739 14.9538L16.6904 7.99023" stroke="#07102D" strokeWidth="1.67832" strokeLinecap="round"/>
    </svg>
  );

  const CrossIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#FE8198" />
      <path d="M8 15.968L15.9627 8.00049" stroke="#000822" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M15.9623 15.9678L8 7.99996" stroke="#000822" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          {withoutLastThreeWords} <span>{lastThreeWords}</span>
        </h2>
        {description && (
          <p className={`${styles.subtitle} ${manrope.className}`}>
            {description}
          </p>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              {covered.title}
            </h3>
          </div>
          <div className={styles.itemsList}>
            {covered.features.map((feature, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.checkmarkIcon}>
                  <CheckIcon />
                </div>
                <p className={`${styles.itemText} ${manrope.className}`}>{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              {unCovered.title}
            </h3>
          </div>
          <div className={styles.itemsList}>
            {unCovered.features.map((feature, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.crossIcon}>
                  <CrossIcon />
                </div>
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
