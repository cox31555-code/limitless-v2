"use client";
import React, { useState } from "react";
import styles from "./contactNumbersAccordion.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const accordionData = [
  {
    id: 1,
    title: "Sales, Renewals, Making Changes and Payments",
    content: (
      <div className={styles.accordionContent}>
        <p className={styles.label}>Sales, Renewals & Payment Contact</p>
        <p className={styles.text}>You can contact us on <strong>0333 043 2085</strong> or web chat and one of our team will be happy to help.</p>
        <div className={styles.hours}>
          <p><strong>Mon - Fri:</strong> 8am to 8pm</p>
          <p><strong>Sat:</strong> 9am to 5pm</p>
          <p><strong>Sun:</strong> 10am to 2pm</p>
          <p><strong>Bank Holidays:</strong> 10am to 4pm</p>
        </div>
        <p className={styles.link}><u>Our Christmas & New Year Opening Hours</u></p>
        <div className={styles.hours}>
          <p><strong>Christmas Eve:</strong> 8am to 4pm</p>
          <p><strong>Christmas Day:</strong> Closed</p>
          <p><strong>Boxing Day:</strong> Closed</p>
          <p><strong>New Years Eve:</strong> 8am to 4pm</p>
          <p><strong>New Years Day:</strong> Closed</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "New Claim",
    content: (
      <div className={styles.accordionContent}>
        <p className={styles.text}>You can register your claim online via <strong>Your Account</strong>, or if you'd rather speak to us, just give us a call on <strong>0333 043 2011</strong>. We're available <strong>24/7, 365 days a year</strong>.</p>
        <p className={styles.text}>If you need to make a windscreen claim, you can book your windscreen in for <strong>repair online</strong> or give us a call on <strong>0333 043 2012</strong>.</p>
        <p className={styles.text}>If your keys have been lost, damaged or stolen, call us on <strong>0333 241 3380, 24 hours a day, 7 days a week</strong>.</p>
      </div>
    ),
  },
  {
    id: 3,
    title: "Existing Claims",
    content: (
      <div className={styles.accordionContent}>
        <p className={styles.text}>If your car's being repaired by one of our approved repairers:</p>
        <ul className={styles.list}>
          <li>We'll give you regular updates on how the repairs are progressing and when they're expected to finish.</li>
          <li>If you have any questions about your repairs, you can message us on web chat or call us on <strong>0333 043 2022 Monday to Friday between 9am and 5pm</strong>.</li>
        </ul>
        <p className={styles.text}>If you're expecting a settlement because your car can't be repaired:</p>
        <ul className={styles.list}>
          <li>We'll call you to discuss your settlement. In the meantime we'll keep you up to date by email and text.</li>
          <li>If we've already agreed an amount with you and you're waiting for your payment to arrive, please bear with us as it can take a few days for this to get to you.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    title: "WhatsApp",
    content: (
      <div className={styles.accordionContent}>
        <p className={styles.text}>You can message us on WhatsApp and one of our team will be happy to help. Scan the QR code with your phone's camera to get in touch.</p>
        <div className={styles.qrCode}>
          <svg width="120" height="120" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" fill="white"/>
            <rect x="8" y="8" width="8" height="8" fill="black"/>
            <rect x="24" y="8" width="8" height="8" fill="black"/>
            <rect x="40" y="8" width="8" height="8" fill="black"/>
            <rect x="56" y="8" width="8" height="8" fill="black"/>
            <rect x="64" y="8" width="8" height="8" fill="black"/>
            <rect x="8" y="16" width="8" height="8" fill="black"/>
            <rect x="40" y="16" width="8" height="8" fill="black"/>
            <rect x="64" y="16" width="8" height="8" fill="black"/>
            <rect x="8" y="24" width="8" height="8" fill="black"/>
            <rect x="24" y="24" width="8" height="8" fill="black"/>
            <rect x="40" y="24" width="8" height="8" fill="black"/>
            <rect x="56" y="24" width="8" height="8" fill="black"/>
            <rect x="64" y="24" width="8" height="8" fill="black"/>
            <rect x="8" y="32" width="8" height="8" fill="black"/>
            <rect x="24" y="32" width="8" height="8" fill="black"/>
            <rect x="40" y="32" width="8" height="8" fill="black"/>
            <rect x="56" y="32" width="8" height="8" fill="black"/>
            <rect x="64" y="32" width="8" height="8" fill="black"/>
            <rect x="8" y="40" width="8" height="8" fill="black"/>
            <rect x="64" y="40" width="8" height="8" fill="black"/>
            <rect x="8" y="48" width="8" height="8" fill="black"/>
            <rect x="16" y="48" width="8" height="8" fill="black"/>
            <rect x="24" y="48" width="8" height="8" fill="black"/>
            <rect x="32" y="48" width="8" height="8" fill="black"/>
            <rect x="40" y="48" width="8" height="8" fill="black"/>
            <rect x="48" y="48" width="8" height="8" fill="black"/>
            <rect x="56" y="48" width="8" height="8" fill="black"/>
            <rect x="64" y="48" width="8" height="8" fill="black"/>
            <rect x="24" y="56" width="8" height="8" fill="black"/>
            <rect x="40" y="56" width="8" height="8" fill="black"/>
            <rect x="48" y="56" width="8" height="8" fill="black"/>
            <rect x="8" y="64" width="8" height="8" fill="black"/>
            <rect x="24" y="64" width="8" height="8" fill="black"/>
            <rect x="40" y="64" width="8" height="8" fill="black"/>
            <rect x="56" y="64" width="8" height="8" fill="black"/>
            <rect x="64" y="64" width="8" height="8" fill="black"/>
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Complaints",
    content: (
      <div className={styles.accordionContent}>
        <p className={styles.text}>If you have a complaint, please contact us and we'll do our best to resolve it quickly.</p>
        <p className={styles.text}>Call us on <strong>0333 043 2020</strong> or email us at <strong>complaints@limitlesscover.co.uk</strong></p>
      </div>
    ),
  },
  {
    id: 6,
    title: "Media Enquiries",
    content: (
      <div className={styles.accordionContent}>
        <p className={styles.text}>For media enquiries and press information, please contact our media team.</p>
        <p className={styles.text}>Email: <strong>media@limitlesscover.co.uk</strong></p>
      </div>
    ),
  },
  {
    id: 7,
    title: "Accessibility",
    content: (
      <div className={styles.accordionContent}>
        <p className={styles.text}>We're committed to ensuring our services are accessible to everyone. If you need any assistance or have accessibility requirements, please let us know.</p>
        <p className={styles.text}>Contact us on <strong>0333 043 2085</strong> or email <strong>accessibility@limitlesscover.co.uk</strong></p>
      </div>
    ),
  },
];

const ContactNumbersAccordion = () => {
  const [expandedId, setExpandedId] = useState(1);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.accordionWrapper}>
          {accordionData.map((item) => (
            <div key={item.id} className={styles.accordionItem}>
              <button
                className={`${styles.accordionButton} ${expandedId === item.id ? styles.expanded : ""}`}
                onClick={() => toggleAccordion(item.id)}
              >
                <span className={`${styles.accordionTitle} ${plusJakartaSans.className}`}>
                  {item.title}
                </span>
                <span className={styles.accordionIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              {expandedId === item.id && (
                <div className={`${styles.accordionContentWrapper} ${manrope.className}`}>
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactNumbersAccordion;
