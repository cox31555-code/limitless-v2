import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import Form from "../form/Form";
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Header = () => {
  return (
    <div className="headerContainer">
      <div className="centeredContent">
        <div className={styles.content}>
          <Image
            src="/svg/contact.svg"
            alt="contact-us"
            width={585}
            height={776}
            className={styles.contact}
          />

          <div className={styles.left}>
            <div className={styles.headers}>
              <h4 className={`${styles.subTitle} ${manrope.className}`}>
                SPECIALIZED FOR VEHICLE INSURANCE
              </h4>
              <h2 className={`${styles.title} ${manrope.className}`}>
                Contact Us
                <Image
                  src="/svg/curved-border.svg"
                  alt="mailing list"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </h2>
            </div>
            <div className={styles.formMobile}>
              <Form />
            </div>

            <div className={styles.contactOptions}>
              <div className={styles.contactOption}>
                <Image
                  src="/svg/phone.svg"
                  alt="phone"
                  width={59}
                  height={59}
                  className={styles.icon}
                />
                <div className={styles.info}>
                  <h3
                    className={`${styles.infoTitle} ${plusJakartaSans.className}`}
                  >
                    Phone No:
                  </h3>
                  <p className={styles.infoDescription}>+442080586743</p>
                </div>
              </div>
              <div className={styles.contactOption}>
                <Image
                  src="/svg/location.svg"
                  alt="phone"
                  width={59}
                  height={59}
                  className={styles.icon}
                />
                <div className={styles.info}>
                  <h3
                    className={`${styles.infoTitle} ${plusJakartaSans.className}`}
                  >
                    Physical Address:
                  </h3>
                  <p className={styles.infoDescription}>
                    Limitless Cover, 82a James Carter Road, Mildenhall, United
                    Kingdom, IP28 7DE
                  </p>
                </div>
              </div>
              <div className={styles.contactOption}>
                <Image
                  src="/svg/message.svg"
                  alt="phone"
                  width={59}
                  height={59}
                  className={styles.icon}
                />
                <div className={styles.info}>
                  <h3
                    className={`${styles.infoTitle} ${plusJakartaSans.className}`}
                  >
                    Email Address:
                  </h3>
                  <p className={styles.infoDescription}>
                    support@limitlesscover.co.uk
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
