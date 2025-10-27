import React from "react";
import styles from "./ourBenifits.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "400"],
});

const OurBenifits = ({ benifits, title, description }) => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.top}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          <p>{title}</p>
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <div className={styles.benifits}>
        {benifits.map((benifit, index) => (
          <div className={styles.benifit} key={index}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img}
                src={benifit.img.src}
                alt={benifit.img.alt}
                width={benifit.img.width}
                height={benifit.img.height}
              />
            </div>
            <h3 className={`${styles.benifitTitle} ${plusJakartaSans.className}`}>
              {benifit.title}
            </h3>
            {benifit.description && (
              <p className={styles.benifitDescription}>{benifit.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurBenifits;
