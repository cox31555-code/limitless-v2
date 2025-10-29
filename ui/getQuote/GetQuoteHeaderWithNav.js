"use client";
import React, { useState } from "react";
import styles from "./getQuoteHeaderWithNav.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const IconComponent = ({ type }) => {
  switch (type) {
    case "chevron":
      return (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "calendar":
      return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M5 1V3M11 1V3M2 5H14M13 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "clock":
      return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM8 3.5C10.4853 3.5 12.5 5.51472 12.5 8C12.5 10.4853 10.4853 12.5 8 12.5C5.51472 12.5 3.5 10.4853 3.5 8C3.5 5.51472 5.51472 3.5 8 3.5ZM8 4.5V8H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "globe":
      return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM2.5 8H13.5M8 2C6.33579 4.3431 5.3 6.97087 5.3 8C5.3 9.02913 6.33579 11.6569 8 14C9.66421 11.6569 10.7 9.02913 10.7 8C10.7 6.97087 9.66421 4.3431 8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

const GetQuoteHeaderWithNav = ({ title, currentStep, totalSteps }) => {
  const router = useRouter();

  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");

  const progressPercentage = totalSteps ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={styles.headerContainer}>
      <header className={styles.headerElement}>
        <div className={styles.headerContent}>
          <div className={styles.navigationBar}>
            <div className={styles.logoContainer}>
              <Image
                onClick={() => router.push("/")}
                className={styles.logo}
                src="/svg/logo.svg"
                alt="logo"
                width={66}
                height={66}
              />
            </div>

            <button className={styles.helpBtn} title="Get help">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                <path d="M12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill="currentColor"/>
                <circle cx="12" cy="18" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <div className={styles.titleSection}>
            <div className={styles.titleContent}>
              <h1 className={`${styles.title} ${plusJakartaSans.className}`}>
                <p>{withoutLastWord}</p>
                <span className={styles.titleSpan}>
                  {lastWord}
                </span>
              </h1>
            </div>

            {totalSteps && (
              <div className={styles.progressSection}>
                <p className={`${styles.stepLabel} ${manrope.className}`}>
                  Step {currentStep} of {totalSteps}
                </p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default GetQuoteHeaderWithNav;
