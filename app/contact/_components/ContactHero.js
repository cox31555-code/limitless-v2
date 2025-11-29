"use client";
import React, { useState } from "react";
import styles from "./contactHero.module.css";
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

const ContactHero = () => {
  const router = useRouter();
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className={styles.headerContainer}>
      <header className={styles.headerElement}>
        <div className={styles.heroBackground}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
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

            <button
              className={styles.helpBtn}
              title="Get help"
              onClick={() => setShowHelpModal(true)}
              aria-label="Help and support"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                <path d="M12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill="currentColor"/>
                <circle cx="12" cy="18" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <div className={styles.titleSection}>
            <h1 className={`${styles.title} ${plusJakartaSans.className}`}>
              Contact <span className={styles.titleSpan}>Us</span>
            </h1>
            <p className={`${styles.subtitle} ${manrope.className}`}>
              Get in touch with our team for support, questions, or feedback
            </p>
          </div>
        </div>
      </header>

      {showHelpModal && (
        <>
          <div className={styles.helpModalOverlay} onClick={() => setShowHelpModal(false)} />
          <div className={styles.helpModalContainer}>
            <div className={styles.helpModal}>
              <button
                className={styles.helpModalCloseBtn}
                onClick={() => setShowHelpModal(false)}
                aria-label="Close help modal"
              >
                ✕
              </button>
              <h3 className={styles.helpModalTitle}>Need Help?</h3>
              <p className={styles.helpModalMessage}>
                Have questions or need support? Get in touch with our team for assistance.
              </p>
              <div className={styles.helpModalActions}>
                <a href="tel:+442080586743" className={styles.helpContactLink}>
                  Call Us: +442080586743
                </a>
                <button
                  className={styles.helpModalCloseAction}
                  onClick={() => setShowHelpModal(false)}
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

export default ContactHero;
