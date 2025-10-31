import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaArrowRightLong } from "react-icons/fa6";
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Header = () => {
  return (
    <div className="headerContainer">
      <div className="centeredContent">
        <div className={styles.container}>
          <div className={styles.content}>
            <button className={`${styles.commingSoon} ${manrope.className}`}>
              Coming Soon
            </button>

            <div className={`${styles.title} ${plusJakartaSans.className}`}>
              Join our{" "}
              <div className={styles.mailingList}>
                mailing list.
                <Image
                  src="/svg/curved-border.svg"
                  alt="mailing list"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </div>
            </div>
            <p className={`${styles.description} `}>
              This service is currently undergoing construction! Be the first to
              know when this service is live by subscribing to our newsletter.
            </p>
            <div className={styles.inputContainer}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.input}
              />
              <button className={styles.subscribeButton}>
                Subscribe
                <FaArrowRightLong className={styles.arrow} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
