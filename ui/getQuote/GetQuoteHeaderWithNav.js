"use client";
import React, { useState } from "react";
import styles from "./getQuoteHeaderWithNav.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const GetQuoteHeaderWithNav = ({ title, subtitle, currentStep, totalSteps, hideNav = false }) => {
  const router = useRouter();
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const handleCloseModal = () => {
    setShowHelpModal(false);
  };

  // Always split title to have last word in blue
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");

  const progressPercentage = totalSteps ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={styles.headerContainer}>
      <header className={styles.headerElement}>
        <div className={styles.headerContent}>
          {!hideNav && (
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

              <button
                className={styles.helpBtn}
                title="Get help"
                onClick={handleHelpClick}
                aria-label="Help and support"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill="currentColor"/>
                  <circle cx="12" cy="18" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          )}

          <div className={styles.titleSection}>
            <div className={styles.titleContent}>
              <h1 className={`${styles.title} ${plusJakartaSans.className}`}>
                <p>{withoutLastWord}</p>
                <span className={styles.titleSpan}>
                  {lastWord}
                </span>
              </h1>
            </div>

            {subtitle ? (
              <div className={styles.progressSection}>
                <p className={`${styles.stepLabel} ${manrope.className}`}>
                  {subtitle}
                </p>
              </div>
            ) : totalSteps ? (
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
            ) : null}
          </div>
        </div>
      </header>

      {/* HELP MODAL POPUP */}
      {showHelpModal && (
        <>
          <div className={styles.helpModalOverlay} onClick={handleCloseModal} />
          <div className={styles.helpModalContainer}>
            <div className={styles.helpModal}>
              <button
                className={styles.helpModalCloseBtn}
                onClick={handleCloseModal}
                aria-label="Close help modal"
              >
                ✕
              </button>
              <h3 className={styles.helpModalTitle}>Need Help?</h3>
              <p className={styles.helpModalMessage}>
                Have questions or need support? Get in touch with our team for assistance.
              </p>
              <div className={styles.helpModalActions}>
                <a href="/contact" className={styles.helpContactLink}>
                  Contact Us
                </a>
                <button
                  className={styles.helpModalCloseAction}
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GetQuoteHeaderWithNav;
