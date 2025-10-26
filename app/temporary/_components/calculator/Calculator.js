"use client";
import React, { useState } from "react";
import styles from "./calculator.module.css";
import Image from "next/image";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const PriceIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="none" stroke="#0388FF" strokeWidth="2" />
    <path d="M16 8V24M12 10H20C21.1046 10 22 10.8954 22 12V20C22 21.1046 21.1046 22 20 22H12C10.8954 22 10 21.1046 10 20V12C10 10.8954 10.8954 10 12 10Z" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Calculator = () => {
  const [data, setData] = useState({
    type: "1 Hour",
  });
  const router = useRouter();

  const priceMap = {
    "1 Hour": "£12",
    "1 Day": "£24",
    "1 Week": "£50",
  };

  return (
    <div className={styles.container}>
      {/* Animated background elements */}
      <div className={styles.bgOrb1}></div>
      <div className={styles.bgOrb2}></div>
      <div className={styles.bgOrb3}></div>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.topSection}>
            <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
              Temporary Vehicle
              <span>Insurance Calculator</span>
            </h2>
            <p className={`${styles.subtitle} ${manrope.className}`}>
              Get your price estimate in under 2 minutes. It couldn't be simpler to get a short-term insurance policy. Buy online anytime you need it.
            </p>
          </div>

          <div className={styles.illustration}>
            <Image
              src={"/svg/calc-car.svg"}
              alt="calculator-1"
              width={180}
              height={120}
              className={styles.carImage}
            />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.selection}>
            <label className={`${styles.label} ${plusJakartaSans.className}`}>
              How long will you need it?
            </label>
            <Selection1
              style={"dark"}
              items={["1 Hour", "1 Day", "1 Week"]}
              selectedItem={data.type}
              setSelectedItem={(item) => setData({ ...data, type: item })}
              type="checkbox"
            />
          </div>

          <div className={styles.card}>
            <div className={styles.priceSection}>
              <div className={styles.priceLabel}>
                <PriceIcon />
                <span className={`${styles.priceLabelText} ${manrope.className}`}>
                  Average pricing for {data.type.toLowerCase()}
                </span>
              </div>
              <div className={styles.priceDisplay}>
                <span className={`${styles.price} ${plusJakartaSans.className}`}>
                  {priceMap[data.type]}
                </span>
              </div>
            </div>

            <p className={`${styles.disclaimer} ${manrope.className}`}>
              Prices based on average of 19,765 policies for the displayed durations (January 2025)
            </p>

            <ConfirmBtn
              title="Get a quote"
              onClick={() => {
                router.push("/temporary/get-quote");
              }}
              className={styles.button}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
