import Image from "next/image";
import React from "react";
import styles from "./componentWrapper.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const getIconForTitle = (title) => {
  const titleLower = title?.toLowerCase() || "";

  if (titleLower.includes("vehicle")) {
    return "/svg/vehicle.svg";
  } else if (titleLower.includes("cover")) {
    return "/svg/quote.svg";
  } else if (titleLower.includes("personal")) {
    return "/svg/contact-details.svg";
  } else if (titleLower.includes("terms")) {
    return "/svg/check.svg";
  } else if (titleLower.includes("car usage")) {
    return "/svg/vehicle.svg";
  }

  return "/svg/insurance-quote.svg";
};

const ComponentWrapper = ({ children, title, icon, isPaymentPage = false }) => {
  const iconSrc = getIconForTitle(title);
  const isVehicleIcon = title?.toLowerCase().includes("vehicle");
  const isCoverIcon = title?.toLowerCase().includes("cover");
  const isPersonalIcon = title?.toLowerCase().includes("personal");
  const isTermsIcon = title?.toLowerCase().includes("terms");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isVehicleIcon ? (
          <div className={`${styles.icon} ${isPaymentPage ? styles.greyed : ""}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 11l1.5-4.5h11L19 11H5z" fill="white"/>
            </svg>
          </div>
        ) : isCoverIcon ? (
          <div className={`${styles.icon} ${isPaymentPage ? styles.greyed : ""}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1L3 5v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="white"/>
              <path d="M10.5 16.5l-3-3 1.41-1.41L10.5 13.68l5.59-5.59L17.5 9.5l-7 7z" fill="#0388ff"/>
            </svg>
          </div>
        ) : isPersonalIcon ? (
          <div className={`${styles.icon} ${isPaymentPage ? styles.greyed : ""}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="white"/>
              <path d="M12 14c-4 0-6 2-6 4v3c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-3c0-2-2-4-6-4z" fill="white"/>
            </svg>
          </div>
        ) : isTermsIcon ? (
          <div className={`${styles.icon} ${isPaymentPage ? styles.greyed : ""}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-8-6z" fill="white"/>
              <path d="M16 18H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V8h8v2z" fill="white"/>
            </svg>
          </div>
        ) : (
          <Image
            className={`${styles.icon} ${isPaymentPage ? styles.greyed : ""}`}
            src={iconSrc}
            alt={title || "section-icon"}
            width={icon?.width || 48}
            height={icon?.height || 48}
          />
        )}
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
};

export default ComponentWrapper;
