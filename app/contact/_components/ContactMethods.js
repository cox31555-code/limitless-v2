import React from "react";
import styles from "./contactMethods.module.css";
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

const ContactMethods = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Image
                src="/svg/phone.svg"
                alt="Phone"
                width={32}
                height={32}
              />
            </div>
            <div className={styles.content}>
              <h3 className={`${styles.label} ${plusJakartaSans.className}`}>
                Phone
              </h3>
              <a href="tel:+442080586743" className={`${styles.value} ${manrope.className}`}>
                +442080586743
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Image
                src="/svg/message.svg"
                alt="Email"
                width={32}
                height={32}
              />
            </div>
            <div className={styles.content}>
              <h3 className={`${styles.label} ${plusJakartaSans.className}`}>
                Email
              </h3>
              <a href="mailto:support@limitlesscover.co.uk" className={`${styles.value} ${manrope.className}`}>
                support@limitlesscover.co.uk
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Image
                src="/svg/location.svg"
                alt="Address"
                width={32}
                height={32}
              />
            </div>
            <div className={styles.content}>
              <h3 className={`${styles.label} ${plusJakartaSans.className}`}>
                Address
              </h3>
              <p className={`${styles.value} ${manrope.className}`}>
                Limitless Cover, 82a James Carter Road, Mildenhall, United Kingdom, IP28 7DE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
