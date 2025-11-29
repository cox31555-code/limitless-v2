import React from "react";
import styles from "./emailUsSection.module.css";
import Image from "next/image";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const EmailUsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Image
                src="/svg/message.svg"
                alt="Email"
                width={40}
                height={40}
              />
            </div>
            <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
              Email us
            </h2>
            <p className={`${styles.text} ${manrope.className}`}>
              If you have any Allianz Online Car Insurance -related queries, or need to tell us about a technical difficulty, please email us at{" "}
              <a href="mailto:digitalsalesuk@allianz.com" className={styles.link}>
                digitalsalesuk@allianz.com
              </a>. We can only respond to your query if your policy number begins with PL0.
            </p>
            <p className={`${styles.text} ${manrope.className}`}>
              Email replies can take up to 24 hours during busy periods. In extreme cases, it can take a little longer.
            </p>
            <p className={`${styles.text} ${manrope.className}`}>
              Please don't email again if you're waiting for a reply, as this can delay us getting back to you.
            </p>
            <p className={`${styles.text} ${manrope.className}`}>
              As an online insurer, we always give you our best price the first time. We're not able to respond to queries about price matching or reducing your renewal price.
            </p>
            <a href="mailto:support@limitlesscover.co.uk" className={styles.button}>
              Email us
            </a>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Image
                src="/svg/complaints.svg"
                alt="Complaint"
                width={40}
                height={40}
              />
            </div>
            <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
              Make a complaint
            </h2>
            <p className={`${styles.text} ${manrope.className}`}>
              Tell us if you're not happy with our service.
            </p>
            <a href="/complaints" className={styles.button}>
              Make a complaint
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailUsSection;
