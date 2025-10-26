import React from "react";
import styles from "./stepper.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Stepper = ({ steps }) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <div key={index} className={styles.stepperContainer}>
          <div
            style={{
              margin:
                index === 3
                  ? ".7rem 0 .7rem"
                  : index === 2
                  ? ".7rem 0 .7rem"
                  : index === 1
                  ? ".5rem 0 .5rem"
                  : "0",
            }}
            className={styles.stepperItem}
          >
            <Image
              className={styles.stepperItemImage}
              src={step.img.src}
              alt="stepper"
              width={step.img.width}
              height={step.img.height}
            />
            <div className={styles.stepperItemText}>
              <div className={`${styles.stepperNumber} ${manrope.className}`}>
                Step {index + 1}
              </div>
              <p
                className={`${styles.stepperTitle} ${plusJakartaSans.className}`}
              >
                {step.title}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={index < 2 ? styles.stepperLine : styles.stepperLine2}>
              {index < 2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="238"
                  height="2"
                  viewBox="0 0 238 2"
                  fill="none"
                >
                  <path
                    d="M237 1L0.999993 1.00002"
                    stroke="url(#paint0_linear_291_117)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_291_117"
                      x1="237"
                      y1="1.5"
                      x2="1"
                      y2="1.50002"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0388FF" />
                      <stop offset="1" stopColor="#0388FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="238"
                  height="2"
                  viewBox="0 0 238 2"
                  fill="none"
                >
                  <path
                    d="M1 1L237 1.00002"
                    stroke="white"
                    strokeOpacity="0.11"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
