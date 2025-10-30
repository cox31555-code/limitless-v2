import React from "react";
import styles from "./whenImpound.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const WhenImpound = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/svg/contact.svg"
        alt="contact-us"
        width={585}
        height={776}
        className={styles.contact}
      />

      <div className={styles.first}>
        <div className={styles.images}>
          <Image
            className={styles.image1}
            src={"/svg/impound-1.svg"}
            alt="impound-1"
            width={917}
            height={625}
          />
        </div>
        <div className={styles.content}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            What happens when your vehicle is <span>impounded</span>
          </h2>
          <p className={styles.description}>
            {`When a vehicle is impounded, it is typically taken by the police or local authorities after being involved in a legal infraction such as driving without insurance, without tax, or being abandoned. Once the vehicle is impounded, it is held in a secure facility, and the owner loses possession until the relevant issues are resolved. This period can vary depending on the reason for the seizure and how quickly the necessary steps are taken to resolve the situation. In most cases, the vehicle is only released once the authorities are satisfied that any legal requirements are met, which may include paying fines, providing proof of insurance, or rectifying any issues that led to the impoundment. Additionally, vehicles that remain unclaimed for a specific period may be sold or disposed of according to local regulations.`}{" "}
          </p>
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.content}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            What happens when your vehicle is <span>impounded</span>
          </h2>
          <p className={`${styles.description} ${manrope.className}`}>
            {
              "If your vehicle is impounded, you must act quickly. Typically, you have 7 to 14 days to reclaim it before it may be disposed of or auctioned. Contact the police or the impound lot (you’ll usually receive a notice or can call 101 to find out where your vehicle is). You’ll need to provide valid proof of identity, vehicle ownership (V5C logbook), insurance, MOT certificate, and pay any release fees and storage charges."
            }{" "}
          </p>
          <p className={`${styles.description} ${manrope.className}`}>
            {` If your vehicle was seized due to driving without insurance or other
            offences, you’ll need to obtain valid insurance (impound insurance)
            that allows for the recovery of an impounded vehicle since standard
            policies often don’t cover this. Once you've gathered all required
            documents and payment, go to the designated pound during opening
            hours to reclaim your vehicle. If you don't want the car back, you
            may still be liable for storage or disposal fees.`}
          </p>
        </div>

        <div className={styles.images}>
          <Image
            className={styles.image2}
            src={"/svg/impound-2.svg"}
            alt="impound-2"
            width={568}
            height={635}
          />
        </div>
      </div>
    </div>
  );
};

export default WhenImpound;
