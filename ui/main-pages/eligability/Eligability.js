import React from "react";
import styles from "./eligability.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Eligability = ({ data }) => {
  const title = data.title.split(" ");
  const lastThreeWords = title.slice(-3).join(" ");
  const withoutLastThreeWords = title.slice(0, -3).join(" ");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {withoutLastThreeWords}
          <span>{lastThreeWords}</span>
        </h3>
        <p className={styles.description}>{data.description}</p>
      </div>

      <div className={styles.eligibility}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Image
              src={data.first.img.src}
              alt={data.first.title}
              width={data.first.img.width}
              height={data.first.img.height}
              className={styles.sectionIcon}
            />
            <h4 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              {data.first.title}
            </h4>
          </div>

          <div className={styles.featuresList}>
            {data.first.features.map((item, index) => (
              <div className={styles.featureItem} key={index}>
                <div className={styles.checkmark}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'none', pointerEvents: 'none' }}>
                    <path d="M17 5L8 14L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'none', strokeDasharray: 'none', strokeDashoffset: 0 }} />
                  </svg>
                </div>
                <p className={`${styles.featureText} ${manrope.className}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Image
              src={data.second.img.src}
              alt={data.second.title}
              width={data.second.img.width}
              height={data.second.img.height}
              className={styles.sectionIcon}
            />
            <h4 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              {data.second.title}
            </h4>
          </div>

          <div className={styles.featuresList}>
            {data.second.features.map((item, index) => (
              <div className={styles.featureItem} key={index}>
                <div className={styles.checkmark}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'none', pointerEvents: 'none' }}>
                    <path d="M17 5L8 14L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'none', strokeDasharray: 'none', strokeDashoffset: 0 }} />
                  </svg>
                </div>
                <p className={`${styles.featureText} ${manrope.className}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligability;
