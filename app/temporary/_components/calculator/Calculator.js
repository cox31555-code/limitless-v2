"use client";
import React, { useState } from "react";
import styles from "./calculator.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import { useRouter } from "next/navigation";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const Calculator = () => {
  const [data, setData] = useState({
    type: "1 Hour",
  });
  const router = useRouter();
  const { setIsInsuranceModalOpen } = useInsuranceModal();

  const priceMap = {
    "1 Hour": "£12",
    "1 Day": "£24",
    "1 Week": "£50",
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.headerContent}>
            <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
              Temporary Vehicle
              <span>Insurance Calculator</span>
            </h2>
            <p className={`${styles.description} ${manrope.className}`}>
              Get an instant price estimate in seconds. Transparent pricing with no hidden fees.
            </p>
          </div>

          <div className={styles.carSection}>
            <Image
              src={"/svg/calc-car.svg"}
              alt="calculator"
              width={220}
              height={150}
              className={styles.carImage}
            />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.inputWrapper}>
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

            <div className={styles.priceSection}>
              <div className={styles.priceBox}>
                <p className={`${styles.priceTag} ${manrope.className}`}>
                  Average for {data.type.toLowerCase()}
                </p>
                <div className={styles.priceWrapper}>
                  <span className={`${styles.price} ${plusJakartaSans.className}`}>
                    {priceMap[data.type]}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsInsuranceModalOpen(true)}
                className={`${styles.button} ${plusJakartaSans.className}`}
              >
                <span>Get a quote</span>
              </button>
            </div>

            <p className={`${styles.disclaimer} ${manrope.className}`}>
              Based on 19,765 policies • January 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
