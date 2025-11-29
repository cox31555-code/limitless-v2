import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

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
                    Kingdom, IP28 7DE
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

          {/* Replace Form with Self-Service & Chat Content */}
          <div className={styles.right}>
            {/* Online Self-Service */}
            <div className={styles.serviceCard}>
              <h3 className={`${styles.serviceTitle} ${plusJakartaSans.className}`}>
                Online self-service
              </h3>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                We've made our online insurance simple, so you can get on with what matters.
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                You can do everything yourself in your{" "}
                <a href="/login" className={styles.serviceLink}>Limitless account</a>, 
                like manage, update or check your policy when it suits you.
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                If you need a hand, our website can help you do almost anything. Making changes, 
                payment issues, queries about cover – it's all there!
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                Our <a href="tel:+442080586743" className={styles.serviceLink}>phone line is only for claims</a> – 
                here's how to{" "}
                <a href="/dashboard/submit-claim" className={styles.serviceLink}>get in touch</a>{" "}
                if you're claiming on your car insurance.
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                Log in to your{" "}
                <a href="/login" className={styles.serviceLink}>Limitless account</a>.
              </p>
            </div>

            {/* Chat to Us */}
            <div className={styles.chatCard}>
              <div className={styles.chatHeader}>
                <div className={styles.chatIconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className={`${styles.chatTitle} ${plusJakartaSans.className}`}>
                  Chat to us
                </h3>
              </div>

              <p className={`${styles.chatSubtitle} ${manrope.className}`}>
                How to access our Live Chat:
              </p>

              <ul className={`${styles.chatList} ${manrope.className}`}>
                <li>Click on the blue chat icon in the bottom right corner of your screen.</li>
                <li>
                  If the chat button isn't visible, you may need to enable cookies. You can do this by 
                  clicking the blue shield icon in the bottom left of your screen, then selecting{" "}
                  <strong>'Allow All'</strong> and <strong>'Confirm My Choices'</strong>.
                </li>
              </ul>

              <p className={`${styles.chatNote} ${manrope.className}`}>
                If you're an existing customer, simply log in to your{" "}
                <a href="/login" className={styles.serviceLink}>Limitless account</a> and you can 
                chat to us using the blue chat icon in the bottom right of your screen.
              </p>

              <div className={styles.hoursCard}>
                <h4 className={`${styles.hoursTitle} ${plusJakartaSans.className}`}>
                  Our Live Chat opening hours are:
                </h4>
                <div className={styles.hoursList}>
                  <p><strong>Monday to Friday:</strong> 8am - 6pm</p>
                  <p><strong>Saturday and bank holidays:</strong> 9am - 5pm</p>
                  <p><strong>Sunday:</strong> 10am - 4pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
