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

const GetQuoteHeaderWithNav = ({ title, subtitle, currentStep, totalSteps, hideNav = false, hideTitle = false }) => {
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
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
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

          {!hideTitle && (
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
          )}
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
