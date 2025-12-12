"use client";
import React from "react";
import styles from "./comprehensiveInfo.module.css";
import { Plus_Jakarta_Sans, Poppins, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});

const IllustrationSVG = () => (
  <svg width="584" height="515" viewBox="0 0 584 515" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_comprehensive)">
      <rect width="584" height="515" rx="18" fill="white" />
      <rect
        x="730.992"
        y="767.789"
        width="182.278"
        height="831.815"
        transform="rotate(135 730.992 767.789)"
        fill="url(#paint0_linear_comprehensive)"
      />
      <rect
        opacity="0.82"
        width="216.68"
        height="723.739"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 91.2188 -178.07)"
        fill="url(#paint1_linear_comprehensive)"
      />
      <path
        d="M850.875 392.644V443.264C850.875 451.922 843.857 458.94 835.199 458.94H211.677C203.02 458.94 196.002 451.922 196.002 443.264V376.824C196.002 363.836 205.11 352.628 217.823 349.972L295.268 333.791C300.927 332.608 305.951 329.383 309.382 324.731L362.493 252.721C366.925 246.711 373.949 243.164 381.416 243.164H617.947C624.493 243.164 630.743 245.893 635.193 250.695L706.025 327.127C708.952 330.285 712.69 332.579 716.831 333.758L830.957 366.261C842.745 369.618 850.875 380.387 850.875 392.644Z"
        fill="#000822"
      />
      <ellipse
        cx="58.103"
        cy="61.7566"
        rx="58.103"
        ry="61.7566"
        transform="matrix(-1 0 0 1 403.242 397.172)"
        fill="#000822"
      />
      <rect
        width="178.808"
        height="215.162"
        transform="matrix(0.977885 0.209141 -0.208652 0.97799 358.258 63.9297)"
        fill="url(#paint2_linear_comprehensive)"
      />
      <g>
        <path
          d="M292 121.836H433.935L478.022 162.147V329.371H292V121.836Z"
          fill="white"
        />
        <path
          d="M292 121.836H433.935L478.022 162.147V329.371H292V121.836Z"
          fill="url(#paint3_linear_comprehensive)"
        />
        <path
          d="M292 121.836H433.935L478.022 162.147V329.371H292V121.836Z"
          fill="url(#paint4_linear_comprehensive)"
        />
      </g>
      <path
        d="M478.023 162.144L433.992 121.906L433.993 162.144H478.023Z"
        fill="#000822"
      />
      <path
        d="M313.359 178.58L318.722 185.918C319.918 187.553 322.37 187.519 323.519 185.85L334.833 169.422"
        stroke="#000822"
        strokeWidth="6.1446"
        strokeLinecap="round"
      />
      <path
        d="M350.18 179.344H412.885"
        stroke="#000822"
        strokeWidth="6.1446"
        strokeLinecap="round"
      />
      <path
        d="M313.359 204.838L318.722 212.175C319.918 213.811 322.37 213.777 323.519 212.108L334.833 195.68"
        stroke="#000822"
        strokeWidth="6.1446"
        strokeLinecap="round"
      />
      <path
        d="M350.18 205.602H412.885"
        stroke="#000822"
        strokeWidth="6.1446"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_comprehensive"
        x1="822.131"
        y1="767.789"
        x2="822.131"
        y2="2299.28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_comprehensive"
        x1="108.34"
        y1="0"
        x2="108.34"
        y2="989.465"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_comprehensive"
        x1="52.4175"
        y1="263.627"
        x2="-4.0218"
        y2="30.0542"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_comprehensive"
        x1="228.004"
        y1="300.589"
        x2="420.459"
        y2="213.38"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.3" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_comprehensive"
        x1="228.004"
        y1="300.589"
        x2="420.459"
        y2="213.38"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.3" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
      <clipPath id="clip0_comprehensive">
        <rect width="584" height="515" rx="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ComprehensiveInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={`${styles.heading} ${plusJakartaSans.className}`}>
            What is <span className={styles.highlight}>Comprehensive?</span>
          </h2>
          <p className={`${styles.description} ${manrope.className}`}>
            Comprehensive car insurance is the highest level of protection available. It covers
            damage to your own vehicle from accidents, theft, fire, and malicious damage – plus
            full liability for damage you cause to others' vehicles and property. With comprehensive
            cover, you're protected in virtually all road scenarios, giving you complete peace of
            mind whether driving in town, on motorways, or parked up. It's the ideal choice for
            newer cars, financed vehicles, or if you want the best possible protection.
          </p>
          <button className={`${styles.readMoreBtn} ${poppins.className}`}>
            <span>Read more</span>
            <svg width="29" height="18" viewBox="0 0 29 18" fill="none">
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
        </div>

        <div className={styles.illustrationContainer}>
          <IllustrationSVG />
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveInfo;
