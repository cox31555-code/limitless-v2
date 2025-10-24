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

const ComponentWrapper = ({ children, title, icon }) => {
  const iconSrc = getIconForTitle(title);
  const isVehicleIcon = title?.toLowerCase().includes("vehicle");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isVehicleIcon ? (
          <div className={styles.icon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 11l1.5-4.5h11L19 11H5z" fill="white"/>
            </svg>
          </div>
        ) : (
          <Image
            className={styles.icon}
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
