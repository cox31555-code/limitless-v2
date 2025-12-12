"use client";
import React from "react";
import styles from "./annualHero.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const AnnualHero = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.illustrationCard}>
          <div className={styles.gradientBackground}>
            <div className={styles.gradient1}></div>
            <div className={styles.gradient2}></div>
          </div>
          <div className={styles.illustration}>
            <svg
              className={styles.documentIcon}
              width="322"
              height="320"
              viewBox="0 0 322 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="186.661"
                height="202.734"
                fill="url(#paint0_linear)"
                fillOpacity="0.48"
              />
              <path
                d="M93.3359 79.7109H222.308L275.578 123.418V261.953H93.3359V79.7109Z"
                fill="#000822"
              />
              <path
                d="M222.244 123.389L222.242 79.3594L275.653 123.389H222.244Z"
                fill="#0388FF"
              />
              <path
                d="M116.789 133.266H178.915"
                stroke="#0388FF"
                strokeWidth="10.228"
                strokeLinecap="round"
              />
              <path
                d="M116.789 160.047H216.702"
                stroke="#0388FF"
                strokeWidth="10.228"
                strokeLinecap="round"
              />
              <ellipse
                cx="253.198"
                cy="251.298"
                rx="68.7059"
                ry="68.5558"
                fill="url(#paint1_linear)"
              />
              <path
                d="M231.883 253.244L242.248 267.427C244.759 270.863 249.911 270.79 252.324 267.286L274.514 235.062"
                stroke="#000822"
                strokeWidth="10.1463"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="93.3305"
                  y1="0"
                  x2="93.3305"
                  y2="202.734"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0388FF" stopOpacity="0" />
                  <stop offset="1" stopColor="#0388FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="137.22"
                  y1="300.838"
                  x2="273.573"
                  y2="231.755"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#0388FF" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              className={styles.carIcon}
              width="466"
              height="343"
              viewBox="0 0 466 343"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M102.2 120.691L32.0079 120.691L10.0011 156.144C3.46398 166.675 0 178.824 0 191.219V234.737C0 261.907 22.0259 283.933 49.1963 283.933L417.039 283.933C444.209 283.933 466.235 261.907 466.235 234.736V191.082C466.235 178.773 462.819 166.705 456.367 156.222L434.498 120.691L374.414 120.691H102.2Z"
                fill="#000822"
              />
              <rect
                x="23.25"
                y="225.689"
                width="104.515"
                height="116.441"
                rx="23.1319"
                fill="#000822"
              />
              <rect
                x="339.016"
                y="225.689"
                width="104.515"
                height="116.441"
                rx="23.1319"
                fill="#000822"
              />
              <path
                d="M76.4496 20.5612C82.0291 8.05482 94.4426 0 108.137 0H356.276C369.759 0 382.022 7.8108 387.721 20.0299L434.674 120.686H31.7812L76.4496 20.5612Z"
                fill="#000822"
              />
              <path
                d="M157.359 237.797H308.88"
                stroke="#0388FF"
                strokeWidth="11.566"
                strokeLinecap="round"
              />
              <ellipse
                cx="75.5"
                cy="279.189"
                rx="30"
                ry="15"
                fill="#0388FF"
              />
              <ellipse
                cx="391.016"
                cy="279.189"
                rx="30"
                ry="15"
                fill="#0388FF"
              />
            </svg>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={`${styles.label} ${manrope.className}`}>
              VEHICLE INSURANCE
            </p>
            <h1 className={`${styles.heading} ${plusJakartaSans.className}`}>
              Get annual insurance from{" "}
              <span className={styles.highlight}>just £221</span>
            </h1>
          </div>

          <div className={styles.actionsContainer}>
            <div className={styles.buttons}>
              <button
                className={`${styles.primaryBtn} ${poppins.className}`}
                onClick={() => router.push("/annual/get-quote")}
              >
                <span>Get an annual quote</span>
                <svg
                  width="29"
                  height="18"
                  viewBox="0 0 29 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.062 0.539062L27.962 7.99992L20.062 15.4608"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28 8.01758H0"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                className={`${styles.secondaryBtn} ${poppins.className}`}
                onClick={() => router.push("/retrieve-quote")}
              >
                <span>Retrieve your quote</span>
                <div className={styles.underline}></div>
              </button>
            </div>

            <p className={`${styles.disclaimer} ${poppins.className}`}>
              *20% of new customers paid £221 or less in March 2025.
            </p>
          </div>

          <div className={`${styles.trustStats} ${manrope.className}`}>
            <div className={styles.trustStat}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#0388FF"/>
                </svg>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statNumber}>1M+</p>
                <p className={styles.statLabel}>UK Drivers</p>
              </div>
            </div>

            <div className={styles.trustStat}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L15.09 8.26H23L17.55 13.25L20.16 20.26L12 15.31L3.84 20.26L6.45 13.25L1 8.26H8.91L12 1Z" fill="#0388FF"/>
                </svg>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statNumber}>Award</p>
                <p className={styles.statLabel}>Winning Service</p>
              </div>
            </div>

            <div className={styles.trustStat}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#0388FF"/>
                </svg>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statNumber}>24/7</p>
                <p className={styles.statLabel}>Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualHero;
