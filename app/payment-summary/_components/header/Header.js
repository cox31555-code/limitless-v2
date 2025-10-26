"use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Stepper from "./stepper/Stepper";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Header = ({ title }) => {
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  return (
    <div className="headerContainer">
      <div className="centeredContent">
        <Image
          src="/svg/squares-2.svg"
          alt="squares"
          width={1394}
          height={706}
          className={styles.squares}
        />
        <div className={styles.wrapper}>
          <div className={styles.titles}>
            <p className={`${styles.subTitle} ${manrope.className}`}>
              specialized for vehicle insurance
            </p>

            <div className={`${styles.title} ${plusJakartaSans.className}`}>
              {withoutLastWord}{" "}
              <div className={styles.titleSpan}>
                {lastWord}
                <Image
                  src="/svg/curved-border.svg"
                  alt="curved border"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </div>
            </div>
          </div>
          <Stepper
            steps={[
              {
                title: "Vehichle",
                img: {
                  src: "/svg/payment-step-1.svg",
                  alt: "step1",
                  width: 68,
                  height: 68,
                },
              },
              {
                title: "Quote",
                img: {
                  src: "/svg/payment-step-2.svg",
                  alt: "step2",
                  width: 72,
                  height: 72,
                },
              },
              {
                title: "Payment",
                img: {
                  src: "/svg/payment-step-3.svg",
                  alt: "step3",
                  width: 82,
                  height: 82,
                },
              },
              {
                title: "Confirmation",
                img: {
                  src: "/svg/payment-step-3.svg",
                  alt: "step4",
                  width: 82,
                  height: 82,
                },
              },
            ]}
          />
          <div className={styles.actions}>
            <button className={styles.payButton}>Pay Now</button>
            <button className={styles.cancelButton}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
