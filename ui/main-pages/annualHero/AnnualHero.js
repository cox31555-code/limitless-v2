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
              <span className={styles.highlight}>just £321</span>
            </h1>
          </div>

          <div className={styles.actionsContainer}>
            <div className={styles.buttons}>
              <button
                className={`${styles.primaryBtn} ${poppins.className}`}
                onClick={() => router.push("/temporary/get-quote")}
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
                onClick={() => router.push("/login")}
              >
                <span>Retrieve a saved quote</span>
                <div className={styles.underline}></div>
              </button>
            </div>

            <p className={`${styles.disclaimer} ${poppins.className}`}>
              *10% of new customers paid £321 or less in March 2025. Excludes
              YouDrive.
            </p>
          </div>

          <div className={`${styles.rating} ${manrope.className}`}>
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/df60fedf22af706a15973700dfc974608c80140e?width=48"
              alt="Google"
              width={24}
              height={24}
            />
            <div className={styles.ratingContent}>
              <div className={styles.score}>
                <span className={styles.scoreText}>5.50</span>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2967 2.63297L11.6167 5.27297C11.7967 5.64047 12.2767 5.99297 12.6817 6.06047L15.0742 6.45796C16.6042 6.71296 16.9642 7.82295 15.8617 8.91795L14.0017 10.7779C13.6867 11.0929 13.5142 11.7004 13.6117 12.1354L14.1442 14.4379C14.5642 16.2604 13.5967 16.9654 11.9842 16.0129L9.74168 14.6854C9.33668 14.4454 8.66918 14.4454 8.25668 14.6854L6.0142 16.0129C4.4092 16.9654 3.4342 16.2529 3.8542 14.4379L4.3867 12.1354C4.4842 11.7004 4.3117 11.0929 3.9967 10.7779L2.1367 8.91795C1.0417 7.82295 1.3942 6.71296 2.9242 6.45796L5.3167 6.06047C5.7142 5.99297 6.1942 5.64047 6.3742 5.27297L7.69418 2.63297C8.41418 1.20047 9.58418 1.20047 10.2967 2.63297Z"
                        fill="#000822"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <span className={styles.reviewCount}>134 Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualHero;
