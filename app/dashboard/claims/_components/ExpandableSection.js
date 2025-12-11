'use client';

import React, { useState } from "react";
import styles from "./expandableSection.module.css";

const ExpandableSection = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.tile} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
        <div className={styles.iconContainer}>
          <svg
            className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;
