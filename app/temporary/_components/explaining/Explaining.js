"use client";
import React from "react";
import styles from "./explaining.module.css";
import { Plus_Jakarta_Sans, Poppins, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const Explaining = () => {
  return (
    <div className={styles.wrapper}>
      {/* What is temporary vehicle insurance - Card */}
      <div className={styles.cardContainer}>
        {/* Gradient bars background */}
        <div className={styles.gradientBars}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>

        <div className={styles.cardContent}>
          <h2 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            What is temporary vehicle <span>insurance?</span>
          </h2>
          <p className={`${styles.cardDescription} ${manrope.className}`}>
            Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days. Ideal for situations like borrowing a car, test-driving a new vehicle, or covering a short trip, it offers the same protection as an annual policy without the long-term commitment. With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation through our online platform.
          </p>
        </div>
      </div>

      {/* How does temporary vehicle insurance work - Card */}
      <div className={styles.cardContainer}>
        {/* Gradient bars background */}
        <div className={styles.gradientBars}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>

        <div className={styles.cardContent}>
          <h2 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            How does temporary vehicle <span>insurance work?</span>
          </h2>
          <p className={`${styles.cardDescription} ${manrope.className}`}>
            Temporary vehicle insurance in the UK is a straightforward way to get short-term coverage for driving needs. To set it up, visit an insurer's website and enter details like your name, driving history, and the vehicle's registration number. Select your coverage period, from one hour to 28 days, and review the instant quote provided. After confirming your details and making payment online, the policy activates instantly, with digital documents sent via email. This fully comprehensive cover suits young drivers, couriers, or anyone needing quick insurance, including those with convictions, without long-term commitments.
          </p>

          {/* Steps */}
          <div className={styles.stepsContainer}>
            {[
              {
                number: "01",
                title: "Enter your vehicle registration",
                description: "Don't know the vehicle reg? No problem, narrow down the car by make, model and variant."
              },
              {
                number: "02",
                title: "Let us know how long you will need it",
                description: "Select which date you would like to start and let us know whether you need for an hour or weeks."
              },
              {
                number: "03",
                title: "Provide some details about yourself",
                description: "Let us know some details to help us offer the best quote we can."
              },
              {
                number: "04",
                title: "Pay to get insured",
                description: "Once paid, visit your member portal and collect your insurance documents."
              }
            ].map((step, index) => (
              <div key={index} className={styles.stepBox}>
                <div className={styles.stepBadge}>
                  <span className={`${styles.stepNumber} ${plusJakartaSans.className}`}>{step.number}</span>
                </div>
                <div className={styles.stepText}>
                  <h4 className={`${styles.stepTitle} ${plusJakartaSans.className}`}>{step.title}</h4>
                  <p className={`${styles.stepDesc} ${poppins.className}`}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explaining;
