"use client";

import React from "react";
import styles from "./noHiddenFees.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const NoHiddenFees = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={`${styles.title} ${plusJakartaSans.className}`}>
          No hidden fees
          <div className={styles.titleSpan}>
            Limitless Cover{" "}
            <Image
              src="/svg/curved-border.svg"
              alt="curved border"
              width={393}
              height={3}
              className={styles.curvedBorder}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              router.push("/temporary/get-quote");
            }}
            className={styles.getQuoteBtn}
          >
            Get a quote
          </button>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className={styles.membersPortalBtn}
          >
            <p>Members Portal</p>
          </button>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <span className={styles.background1}></span>
        <span className={styles.background2}></span>
        <span className={styles.background3}></span>
        <Image
          className={styles.backgroundLogoNew}
          src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F3b9261c3b11e44158e58e259bf4c6d35?format=webp&width=800"
          alt="logo"
          width={450}
          height={450}
          priority
        />
        <svg
          className={styles.backgroundSvg}
          width="32"
          height="42"
          viewBox="0 0 32 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.5941 22.3363L13.1343 27.9485V35.4313L11.8936 34.1862L7.99238 30.271L5.83987 28.1108L13.1346 24.8213L18.294 22.4987L28.9302 17.7033C31.6312 16.4812 32.2832 12.9251 30.1884 10.8228L20.7119 1.31207C17.9186 -1.49119 13.1343 0.49532 13.1343 4.45706V10.4457L0.0337826 16.3533V22.0233L5.19318 19.7008L16.874 14.4419L18.3283 13.7875V8.10588L18.2937 8.1231V6.20606L25.5941 13.5325L22.3564 14.992L22.3624 15.0036L8.55211 21.2413L8.54057 21.2182L2.50402 23.9404C2.40018 23.9867 2.30196 24.033 2.20966 24.0853C0.951468 24.7687 0.195605 25.9851 0.0340784 27.2822C-0.121828 28.5217 0.253293 29.8305 1.2402 30.8209L10.7221 40.331C13.5154 43.1342 18.2937 41.1477 18.2937 37.1803V31.2959L25.5941 28.0063L31.4286 25.3827V19.7011L25.5941 22.3363Z"
            fill="white"
          />
        </svg>
        <Image
          className={styles.image}
          src="/svg/no-hidden-fee.svg"
          alt="no-hidden-fees"
          width={495}
          height={339}
        />
      </div>
    </div>
  );
};

export default NoHiddenFees;
