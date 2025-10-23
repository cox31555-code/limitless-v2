import React from "react";
import styles from "./feature.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Feature = ({ img, title, description }) => {
  return (
    <div className={styles.container}>
      <svg className={styles.borderSvg} viewBox="0 0 400 120" preserveAspectRatio="none">
        <rect x="1" y="1" width="398" height="118" rx="12" ry="12" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        className={styles.img}
      />
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
