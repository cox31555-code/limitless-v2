import React from "react";
import Header from "./_components/header/Header";
import styles from "./page.module.css";
import Card from "./_components/card/Card";
import { features } from "./data";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Coming Soon | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.page}>
      <span className={styles.squareLight}></span>
      <span className={styles.squareLight2}></span>
      <Header />
      <div className={`centeredContent ${styles.mailingListSection}`}>
        <div className={styles.mailingListContent}>
          <div className={`${styles.mailingTitle} ${plusJakartaSans.className}`}>
            Join our{" "}
            <div className={styles.mailingListHighlight}>
              mailing list.
              <Image
                src="/svg/curved-border.svg"
                alt="mailing list"
                width={393}
                height={3}
                className={styles.mailingCurvedBorder}
              />
            </div>
          </div>
          <p className={styles.mailingDescription}>
            This service is currently undergoing construction! Be the first to
            know when this service is live by subscribing to our newsletter.
          </p>
          <div className={styles.mailingInputContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.mailingInput}
            />
            <button className={styles.mailingSubscribeButton}>
              Subscribe
              <FaArrowRightLong className={styles.mailingArrow} />
            </button>
          </div>
        </div>
      </div>
      <div className={"centeredContent"}>
        <div className={styles.cardsContainer}>
          {features.map((feature, index) => (
            <Card key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
