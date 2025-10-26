import React, { useState } from "react";
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
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17 6L8 15L3 10" stroke="#00c9ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Eligability = ({ data }) => {
  const [expandedSection, setExpandedSection] = useState("first");
  
  const title = data.title.split(" ");
  const lastThreeWords = title.slice(-3).join(" ");
  const withoutLastThreeWords = title.slice(0, -3).join(" ");

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      
      <div className={styles.header}>
        <h2 className={`${styles.mainTitle} ${plusJakartaSans.className}`}>
          {withoutLastThreeWords}
          <span>{lastThreeWords}</span>
        </h2>
        <p className={`${styles.subtitle} ${manrope.className}`}>
          {data.description}
        </p>
      </div>

      <div className={styles.content}>
        {/* First Section */}
        <div 
          className={`${styles.expandableCard} ${expandedSection === "first" ? styles.expanded : ""}`}
          onClick={() => setExpandedSection(expandedSection === "first" ? null : "first")}
        >
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.sectionBadge} style={{ background: "linear-gradient(135deg, #0CA86E 0%, #08964f 100%)" }}>
                <Image
                  src={data.first.img.src}
                  alt={data.first.title}
                  width={28}
                  height={28}
                />
              </div>
              <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
                {data.first.title}
              </h3>
            </div>
            <div className={`${styles.expandIcon} ${expandedSection === "first" ? styles.rotated : ""}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {expandedSection === "first" && (
            <div className={styles.cardContent}>
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
          )}
        </div>

        {/* Second Section */}
        <div 
          className={`${styles.expandableCard} ${expandedSection === "second" ? styles.expanded : ""}`}
          onClick={() => setExpandedSection(expandedSection === "second" ? null : "second")}
        >
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.sectionBadge} style={{ background: "linear-gradient(135deg, #0388ff 0%, #00c9ff 100%)" }}>
                <Image
                  src={data.second.img.src}
                  alt={data.second.title}
                  width={28}
                  height={28}
                />
              </div>
              <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
                {data.second.title}
              </h3>
            </div>
            <div className={`${styles.expandIcon} ${expandedSection === "second" ? styles.rotated : ""}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {expandedSection === "second" && (
            <div className={styles.cardContent}>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Eligability;
