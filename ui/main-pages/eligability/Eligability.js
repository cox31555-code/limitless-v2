import React from "react";
import styles from "./eligability.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#0CA86E" strokeWidth="2" />
    <path d="M8 12L11 15L16 9" stroke="#0CA86E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Eligability = ({ data }) => {
  const title = data.title.split(" ");
  const lastThreeWords = title.slice(-3).join(" ");
  const withoutLastThreeWords = title.slice(0, -3).join(" ");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={`${styles.mainTitle} ${plusJakartaSans.className}`}>
          {withoutLastThreeWords}
          <span>{lastThreeWords}</span>
        </h2>
        <p className={`${styles.description} ${manrope.className}`}>
          {data.description}
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconBadge} style={{ background: "linear-gradient(135deg, rgba(12, 168, 110, 0.12) 0%, rgba(12, 168, 110, 0.06) 100%)" }}>
              <Image
                src={data.first.img.src}
                alt={data.first.title}
                width={32}
                height={32}
              />
            </div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              {data.first.title}
            </h3>
          </div>
          <div className={styles.itemsList}>
            {data.first.features.map((item, index) => (
              <div className={styles.item} key={index}>
                <CheckIcon />
                <p className={`${styles.itemText} ${manrope.className}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconBadge} style={{ background: "linear-gradient(135deg, rgba(3, 136, 255, 0.12) 0%, rgba(3, 136, 255, 0.06) 100%)" }}>
              <Image
                src={data.second.img.src}
                alt={data.second.title}
                width={32}
                height={32}
              />
            </div>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              {data.second.title}
            </h3>
          </div>
          <div className={styles.itemsList}>
            {data.second.features.map((item, index) => (
              <div className={styles.item} key={index}>
                <CheckIcon />
                <p className={`${styles.itemText} ${manrope.className}`}>
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
