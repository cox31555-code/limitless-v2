import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="centeredContent">
        <div className={styles.content}>
          {/* Online Self-Service Section */}
          <div className={styles.onlineServiceSection}>
            <div className={styles.serviceLeft}>
              <h2 className={`${styles.serviceTitle} ${manrope.className}`}>
                Online self-service
              </h2>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                We've made our online insurance simple, so you can get on with what matters.
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                You can do everything yourself in your{" "}
                <a href="/login" className={styles.link}>Allianz account</a>, 
                like manage, update or check your policy when it suits you.
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                If you need a hand, our website can help you do almost anything. Making changes, 
                payment issues, queries about cover – it's all there!
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                Our <a href="tel:+442080586743" className={styles.link}>phone line is only for claims</a> – 
                here's how to{" "}
                <a href="/dashboard/submit-claim" className={styles.link}>get in touch</a>{" "}
                if you're claiming on your car insurance.
              </p>
              <p className={`${styles.serviceText} ${manrope.className}`}>
                Log in to your{" "}
                <a href="/login" className={styles.link}>Allianz account</a>.
              </p>
            </div>
            <div className={styles.serviceRight}>
              <Image
                src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2Fac5cc31228544d949e987e6fdf3913a6?format=webp&width=800"
                alt="Online self-service"
                width={328}
                height={219}
                className={styles.serviceImage}
                priority
              />
            </div>
          </div>

          {/* Chat to Us Section */}
          <div className={styles.chatSection}>
            <div className={styles.chatIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className={`${styles.chatTitle} ${manrope.className}`}>
              Chat to us
            </h3>
            <p className={`${styles.chatSubtitle} ${manrope.className}`}>
              How to access our Live Chat:
            </p>
            <ul className={`${styles.chatInstructions} ${manrope.className}`}>
              <li>Click on the blue chat icon in the bottom right corner of your screen.</li>
              <li>
                If the chat button isn't visible, you may need to enable cookies. You can do this by 
                clicking the blue shield icon in the bottom left of your screen, then selecting{" "}
                <strong>'Allow All'</strong> and <strong>'Confirm My Choices'</strong>.
              </li>
            </ul>
            <p className={`${styles.chatNote} ${manrope.className}`}>
              If you're an existing customer, simply log in to your{" "}
              <a href="/login" className={styles.link}>your Allianz account</a> and you can 
              chat to us using the blue chat icon in the bottom right of your screen.
            </p>
            <div className={styles.chatHours}>
              <h4 className={`${styles.hoursTitle} ${manrope.className}`}>
                Our Live Chat opening hours are:
              </h4>
              <div className={styles.hoursList}>
                <p><strong>Monday to Friday:</strong> 8am - 6pm</p>
                <p><strong>Saturday and bank holidays:</strong> 9am - 5pm</p>
                <p><strong>Sunday:</strong> 10am - 4pm</p>
              </div>
            </div>
          </div>

          {/* Contact Options Section */}
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
                <h3 className={`${styles.infoTitle} ${manrope.className}`}>
                  Phone No:
                </h3>
                <p className={styles.infoDescription}>+442080586743</p>
              </div>
            </div>
            <div className={styles.contactOption}>
              <Image
                src="/svg/location.svg"
                alt="location"
                width={59}
                height={59}
                className={styles.icon}
              />
              <div className={styles.info}>
                <h3 className={`${styles.infoTitle} ${manrope.className}`}>
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
                alt="email"
                width={59}
                height={59}
                className={styles.icon}
              />
              <div className={styles.info}>
                <h3 className={`${styles.infoTitle} ${manrope.className}`}>
                  Email Address:
                </h3>
                <p className={styles.infoDescription}>
                  support@limitlesscover.co.uk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
