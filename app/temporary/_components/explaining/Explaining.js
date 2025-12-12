"use client";
import React from "react";
import styles from "./explaining.module.css";
import { Plus_Jakarta_Sans, Poppins, Manrope } from "next/font/google";
import Image from "next/image";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const Explaining = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* First Section - What is temporary vehicle insurance */}
        <div className={styles.first}>
          <div className={styles.images}>
            <Image
              className={styles.image}
              src={"/svg/temp-car.svg"}
              alt="explaining-1"
              width={676}
              height={585.378}
              priority
            />
          </div>

          <div className={styles.content}>
            <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
              What is temporary vehicle <span>insurance?</span>
            </h3>
            <p className={`${styles.description} ${manrope.className}`}>
              Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days. Ideal for situations like borrowing a car, test-driving a new vehicle, or covering a short trip, it offers the same protection as an annual policy without the long-term commitment. With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation through our online platform.
            </p>
          </div>
        </div>

        {/* Second Section - How does temporary vehicle insurance work */}
        <div className={styles.second}>
          <div className={styles.content}>
            <h3 className={`${styles.title} ${plusJakartaSans.className} ${styles.title2}`}>
              How does temporary vehicle <span>insurance work?</span> {" "}
            </h3>
            <p className={`${styles.description} ${manrope.className}`}>
              {`Temporary vehicle insurance in the UK is a straightforward way to get short-term coverage for driving needs. To set it up, visit an insurer's website and enter details like your name, driving history, and the vehicle's registration number. Select your coverage period, from one hour to 28 days, and review the instant quote provided. After confirming your details and making payment online, the policy activates instantly, with digital documents sent via email. This fully comprehensive cover suits young drivers, couriers, or anyone needing quick insurance, including those with convictions, without long-term commitments.`}
            </p>
          </div>

          <div className={styles.featuresContainer}>
            <span className={styles.background1} />
            <span className={styles.background2} />
            <span className={styles.background3} />

            <div className={styles.features}>
              {[
                {
                  title: "Enter your vehicle registration",
                  description: "Don't know the vehicle reg? No problem, narrow down the car by make, model and variant."
                },
                {
                  title: "Let us know how long you will need it",
                  description: "Select which date you would like to start and let us know whether you need for an hour or weeks."
                },
                {
                  title: "Provide some details about yourself",
                  description: "Let us know some details to help us offer the best quote we can."
                },
                {
                  title: "Pay to get insured",
                  description: "Once paid, visit your member portal and collect your insurance documents."
                }
              ].map((item, index) => (
                <div key={index} className={styles.feature}>
                  <div className={styles.featureNumber}>{index + 1}</div>
                  <div className={styles.featureContent}>
                    <h4 className={`${styles.featureTitle} ${plusJakartaSans.className}`}>{item.title}</h4>
                    <p className={styles.featureDescription}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explaining;
