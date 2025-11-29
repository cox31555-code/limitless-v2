import React from "react";
import styles from "./chatToUs.module.css";
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

const ChatToUs = () => {
  return (
    <div className={styles.chatContainer}>
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
  );
};

export default ChatToUs;
