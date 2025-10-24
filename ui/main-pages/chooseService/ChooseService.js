import React from "react";
import styles from "./chooseService.module.css";
import Card from "@/app/coming-soon/_components/card/Card";
import Image from "next/image";
import { features } from "@/app/coming-soon/data";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const ChooseService = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Image
          src="/svg/service.svg"
          alt="choose-service"
          width={58}
          height={58}
        />
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Choose the <span>right insurance for you</span>
        </h2>
        <p className={styles.description}>
          At <strong>Limitless Cover</strong>, we offer fast, flexible, and affordable insurance tailored to your lifestyle. Whether you're a young driver, courier, or need impound cover, we've got <strong>instant solutions</strong> for all drivers—because insurance should work your way.
        </p>
      </div>
      <div className={styles.cardsContainer}>
        {features.map((feature, index) => (
          <Card key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default ChooseService;
