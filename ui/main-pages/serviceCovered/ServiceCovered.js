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
          <div className={styles.iconWrapper}>
            <div className={styles.iconBackground}>
              <div className={styles.bar1}></div>
              <div className={styles.bar2}></div>
              <div className={styles.bar3}></div>
              <svg className={styles.iconBase} width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H43.9265L62.0695 14.8862V62.0695H0V0Z" fill="#000822"/>
              </svg>
              <svg className={styles.iconCheck} width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="21.4864" cy="21.471" rx="21.4864" ry="21.471" fill="url(#paint0_linear_check)"/>
                <ellipse cx="21.4864" cy="21.471" rx="21.4864" ry="21.471" fill="url(#paint1_linear_check)"/>
                <path d="M13.125 22.164L16.785 27.1717C17.6716 28.3848 19.4904 28.3593 20.3426 27.1218L28.1778 15.7441" stroke="#000822" strokeWidth="3.58255" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear_check" x1="-14.7836" y1="36.9865" x2="27.8838" y2="15.4007" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.3"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_check" x1="-14.7836" y1="36.9865" x2="27.8838" y2="15.4007" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.3"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            {covered.title}
          </h3>
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
          <div className={styles.iconWrapper}>
            <div className={styles.iconBackground}>
              <div className={styles.barUncovered1}></div>
              <div className={styles.barUncovered2}></div>
              <div className={styles.barUncovered3}></div>
              <svg className={styles.iconBase} width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 62.0695H43.9265L62.0695 47.1833V0H0V62.0695Z" fill="#000822"/>
              </svg>
              <svg className={styles.iconCross} width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="21.4864" cy="21.471" rx="21.4864" ry="21.471" transform="matrix(1 0 0 -1 0 42.942)" fill="url(#paint0_linear_cross)"/>
                <ellipse cx="21.4864" cy="21.471" rx="21.4864" ry="21.471" transform="matrix(1 0 0 -1 0 42.942)" fill="url(#paint1_linear_cross)"/>
                <path d="M14.3008 29.0518L28.2595 15.0846" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round"/>
                <path d="M28.259 29.0518L14.3008 15.084" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear_cross" x1="-14.7836" y1="36.9865" x2="27.8838" y2="15.4007" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.3"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_cross" x1="-14.7836" y1="36.9865" x2="27.8838" y2="15.4007" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.3"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            {unCovered.title}
          </h3>
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
