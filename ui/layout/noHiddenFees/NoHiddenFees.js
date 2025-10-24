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
            <Image
              src="/svg/arrow-right.svg"
              alt="arrow-right"
              width={28}
              height={14}
            />
          </button>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className={styles.membersPortalBtn}
          >
            Members Portal{" "}
            <Image
              src="/svg/arrow-right.svg"
              alt="arrow-right"
              width={28}
              height={14}
            />
          </button>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <span className={styles.background1}></span>
        <span className={styles.background2}></span>
        <span className={styles.background3}></span>
        <Image
          className={styles.backgroundLogo}
          src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F3b9261c3b11e44158e58e259bf4c6d35?format=webp&width=800"
          alt="logo"
          width={300}
          height={300}
        />
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
