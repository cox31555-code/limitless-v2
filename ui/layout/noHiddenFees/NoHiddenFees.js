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
    <div className={styles.container} suppressHydrationWarning>
      <div className={styles.content} suppressHydrationWarning>
        <div className={`${styles.title} ${plusJakartaSans.className}`} suppressHydrationWarning>
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
