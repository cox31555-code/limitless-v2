import React from "react";
import styles from "./contactIntro.module.css";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const ContactIntro = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Contact us
        </h2>
        <p className={`${styles.description} ${manrope.className}`}>
          Want to contact us. We have plenty of options below to help direct you to the right place!
        </p>
      </div>
    </section>
  );
};

export default ContactIntro;
