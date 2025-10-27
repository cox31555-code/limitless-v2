import React from "react";
import styles from "./feature.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  FaClock,
  FaSun,
  FaCalendar,
  FaCalendarDays,
} from "react-icons/fa6";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const getIconComponent = (iconType) => {
  switch (iconType) {
    case "clock":
      return <FaClock className={styles.iconSymbol} />;
    case "sun":
      return <FaSun className={styles.iconSymbol} />;
    case "calendar-week":
      return <FaCalendarDays className={styles.iconSymbol} />;
    case "calendar-month":
      return <FaCalendar className={styles.iconSymbol} />;
    default:
      return null;
  }
};

const Feature = ({ img, icon, title, description, imgClassName }) => {
  return (
    <div className={styles.container}>
      <svg className={styles.borderSvg} viewBox="0 0 400 120" preserveAspectRatio="none">
        <rect x="2" y="2" width="396" height="116" rx="10" ry="10" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
      </svg>
      {icon ? (
        <div className={styles.iconContainer}>
          {getIconComponent(icon)}
        </div>
      ) : img ? (
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className={imgClassName || styles.img}
        />
      ) : null}
      <div className={`${styles.content}`}>
        <h3
          className={`${styles.title} ${plusJakartaSans.className} ${
            description ? `${styles.bold}` : ""
          }`}
        >
          {title}
        </h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

export default Feature;
