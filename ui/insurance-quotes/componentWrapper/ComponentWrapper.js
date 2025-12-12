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
  const titleLower = title?.toLowerCase() || "";
  const isVehicleIcon = titleLower.includes("vehicle");
  const isCoverIcon = titleLower.includes("cover");
  const isPersonalIcon = titleLower.includes("personal");
  const isTermsIcon = titleLower.includes("terms");
  const iconSrc = getIconForTitle(title);

  let iconContent = null;

  if (isCoverIcon) {
    iconContent = null;
  } else if (isPersonalIcon) {
    iconContent = null;
  } else if (isTermsIcon) {
    iconContent = null;
  } else if (titleLower.includes("optional")) {
    iconContent = null;
  } else if (titleLower.includes("declarations")) {
    iconContent = null;
  } else if (titleLower.includes("additional drivers")) {
    iconContent = null;
  } else if (titleLower.includes("car usage")) {
    iconContent = null;
  } else if (!isVehicleIcon) {
    iconContent = (
      <Image
        className={`${styles.icon} ${isPaymentPage ? styles.greyed : ""}`}
        src={iconSrc}
        alt={title || "section-icon"}
        width={icon?.width || 48}
        height={icon?.height || 48}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${isVehicleIcon ? styles.vehicleHeader : ""}`}>
        {iconContent}
        <h3 className={`${styles.title} ${isPaymentPage ? styles.greyed : ""} ${plusJakartaSans.className}`}>
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
};

export default ComponentWrapper;
