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
            <svg width="89" height="95" viewBox="0 0 89 95" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7.28125" y="69.582" width="27.5091" height="25.0818" fill="url(#paint0_linear_167_5799)" fillOpacity="0.48"/>
              <rect x="34.7891" y="58.2544" width="26.7" height="36.4091" fill="url(#paint1_linear_167_5799)" fillOpacity="0.48"/>
              <rect x="61.4922" y="7.47607" width="27.5091" height="87.3818" fill="url(#paint2_linear_167_5799)" fillOpacity="0.48"/>
              <path d="M0 7.40186H43.9265L62.0695 22.288V69.4713H0V7.40186Z" fill="#000822"/>
              <ellipse cx="48.1857" cy="21.471" rx="21.4864" ry="21.471" fill="url(#paint3_linear_167_5799)"/>
              <ellipse cx="48.1857" cy="21.471" rx="21.4864" ry="21.471" fill="url(#paint4_linear_167_5799)"/>
              <path d="M39.8242 22.164L43.4842 27.1717C44.3708 28.3848 46.1897 28.3593 47.0418 27.1218L54.877 15.7441" stroke="#000822" strokeWidth="3.58255" strokeLinecap="round"/>
              <defs>
                <linearGradient id="paint0_linear_167_5799" x1="21.0358" y1="69.582" x2="21.0358" y2="94.6638" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint1_linear_167_5799" x1="48.1391" y1="58.2544" x2="48.1391" y2="94.6635" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint2_linear_167_5799" x1="75.2467" y1="7.47607" x2="75.2467" y2="94.8579" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint3_linear_167_5799" x1="11.9156" y1="36.9865" x2="54.5831" y2="15.4007" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint4_linear_167_5799" x1="11.9156" y1="36.9865" x2="54.5831" y2="15.4007" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
              </defs>
            </svg>
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
            <svg width="89" height="95" viewBox="0 0 89 95" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="27.5091" height="25.0818" transform="matrix(1 0 0 -1 7.28125 25.2759)" fill="url(#paint0_linear_167_5844)" fillOpacity="0.48"/>
              <rect width="26.7" height="36.4091" transform="matrix(1 0 0 -1 34.7891 36.6035)" fill="url(#paint1_linear_167_5844)" fillOpacity="0.48"/>
              <rect width="27.5091" height="87.3818" transform="matrix(1 0 0 -1 61.4922 87.3818)" fill="url(#paint2_linear_167_5844)" fillOpacity="0.48"/>
              <path d="M0 87.4561H43.9265L62.0695 72.5699V25.3866H0V87.4561Z" fill="#000822"/>
              <ellipse cx="21.4864" cy="21.471" rx="21.4864" ry="21.471" transform="matrix(1 0 0 -1 26.6992 94.8579)" fill="url(#paint3_linear_167_5844)"/>
              <ellipse cx="21.4864" cy="21.471" rx="21.4864" ry="21.471" transform="matrix(1 0 0 -1 26.6992 94.8579)" fill="url(#paint4_linear_167_5844)"/>
              <path d="M41 80.9677L54.9587 67.0005" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round"/>
              <path d="M54.9582 80.9678L41 67" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round"/>
              <defs>
                <linearGradient id="paint0_linear_167_5844" x1="13.7545" y1="0" x2="13.7545" y2="25.0818" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint1_linear_167_5844" x1="13.35" y1="0" x2="13.35" y2="36.4091" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint2_linear_167_5844" x1="13.7545" y1="0" x2="13.7545" y2="87.3818" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint3_linear_167_5844" x1="-14.7836" y1="36.9865" x2="27.8838" y2="15.4007" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint4_linear_167_5844" x1="-14.7836" y1="36.9865" x2="27.8838" y2="15.4007" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
              </defs>
            </svg>
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
