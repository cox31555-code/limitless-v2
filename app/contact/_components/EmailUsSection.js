import React from "react";
import styles from "./emailUsSection.module.css";
import Image from "next/image";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const EmailUsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
            Get in Touch
          </h2>
          <p className={`${styles.sectionDescription} ${manrope.className}`}>
            Whether you need support or want to share feedback, we're here to help.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Image
                src="/svg/message.svg"
                alt="Email"
                width={32}
                height={32}
              />
            </div>
            <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
              Email us
            </h3>
            <p className={`${styles.text} ${manrope.className}`}>
              If you have any insurance-related queries or need to tell us about a technical difficulty, please email us at{" "}
              <a href="mailto:support@limitlesscover.co.uk" className={styles.link}>
                support@limitlesscover.co.uk
              </a>
            </p>
            <p className={`${styles.text} ${manrope.className}`}>
              Email replies can take up to 24 hours during busy periods. In extreme cases, it can take a little longer.
            </p>
            <p className={`${styles.text} ${manrope.className}`}>
              Please don't email again if you're waiting for a reply, as this can delay us getting back to you.
            </p>
            <a href="mailto:support@limitlesscover.co.uk" className={`${styles.button} ${manrope.className}`}>
              Send an email
            </a>
          </div>

          <div className={`${styles.card} ${styles.complaintCard}`}>
            <div className={styles.complaintIcon}>
              <svg width="32" height="32" viewBox="-2 0 19 19" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.032 5.286v7.276a1.112 1.112 0 0 1-1.108 1.108H8.75l-1.02 1.635a.273.273 0 0 1-.503 0l-1.02-1.635h-4.13a1.112 1.112 0 0 1-1.109-1.108V5.286a1.112 1.112 0 0 1 1.108-1.108h10.848a1.112 1.112 0 0 1 1.108 1.108zM8.206 11.34a.706.706 0 1 0-.706.705.706.706 0 0 0 .706-.705zm-1.26-1.83a.554.554 0 1 0 1.108 0V6.275a.554.554 0 1 0-1.108 0z"/>
              </svg>
            </div>
            <h3 className={`${styles.complaintTitle} ${plusJakartaSans.className}`}>
              Make a complaint
            </h3>
            <p className={`${styles.complaintText} ${manrope.className}`}>
              Tell us if you're not happy with our service. We take all feedback seriously and will work to resolve your concerns.
            </p>
            <a href="/complaints" className={`${styles.complaintButton} ${manrope.className}`}>
              Make a complaint
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailUsSection;
