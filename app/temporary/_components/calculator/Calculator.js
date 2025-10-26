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
  weight: ["500", "400"],
});

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
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Temporary Vehicle Insurance
            <span>Calculator</span>
          </h2>
          <p className={`${styles.subtitle} ${manrope.className}`}>
            Get an instant price estimate. Quick, simple, and transparent pricing for your temporary insurance needs.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.imageSection}>
            <Image
              src={"/svg/calc-car.svg"}
              alt="calculator"
              width={200}
              height={140}
              className={styles.image}
            />
          </div>

          <div className={styles.formSection}>
            <div className={styles.inputGroup}>
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

            <div className={styles.priceCard}>
              <div className={styles.priceInfo}>
                <span className={`${styles.priceLabel} ${manrope.className}`}>
                  Average price for {data.type.toLowerCase()}
                </span>
                <div className={styles.priceValue}>
                  <span className={`${styles.price} ${plusJakartaSans.className}`}>
                    {priceMap[data.type]}
                  </span>
                </div>
              </div>
              <p className={`${styles.note} ${manrope.className}`}>
                Based on 19,765 policies (January 2025)
              </p>
              <ConfirmBtn
                title="Get a quote"
                onClick={() => router.push("/temporary/get-quote")}
                className={styles.button}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
