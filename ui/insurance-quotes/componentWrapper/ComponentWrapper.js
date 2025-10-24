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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          className={styles.icon}
          src={iconSrc}
          alt={title || "section-icon"}
          width={icon?.width || 48}
          height={icon?.height || 48}
        />
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
};

export default ComponentWrapper;
