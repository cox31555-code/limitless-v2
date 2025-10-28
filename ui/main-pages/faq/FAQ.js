"use client";
import React, { useState } from "react";
import styles from "./faq.module.css";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const faqData = [
  {
    question: "What is impound insurance?",
    answer: "Impound insurance is a specialized type of short-term car insurance required to release a vehicle from police or DVLA impound. It provides the necessary cover for you to legally collect your vehicle and drive it away from the impound facility.",
  },
  {
    question: "How do I get impound insurance?",
    answer: "Contact our team or use our online quote tool. Provide your details, the vehicle's registration, and the impound notice details. Select a 30-day policy, pay upfront, and receive instant electronic insurance certificates via email to present at the impound facility. Coverage starts immediately for same-day collection.",
  },
  {
    question: "What does impound insurance cover?",
    answer: "Impound insurance provides comprehensive cover for your impounded vehicle, including third-party liability, fire, and theft protection. It meets all legal requirements needed to retrieve your vehicle from the impound facility.",
  },
  {
    question: "Who can get impound insurance?",
    answer: "Any UK driver with a valid license can get impound insurance, regardless of age or driving history. We provide cover for all drivers aged 17+ with convictions, points, or past insurance issues. All you need is the impound notice and vehicle registration details.",
  },
  {
    question: "What happens if I don't get impound insurance?",
    answer: "Without impound insurance, you cannot legally release or drive your vehicle from the impound facility. The vehicle will remain impounded, and you'll continue to accumulate daily storage fees. Eventually, if unclaimed, the vehicle may be sold or scrapped by the authorities.",
  },
];

const FAQ = ({ customData = null }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const dataToUse = customData || faqData;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.heading} ${plusJakartaSans.className}`}>
        Frequently Asked <span className={styles.highlight}>Questions</span>
      </h2>

      <div className={styles.faqList}>
        {dataToUse.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${
              openIndex === index ? styles.faqItemOpen : ""
            }`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <span className={`${styles.questionText} ${plusJakartaSans.className}`}>
                {faq.question}
              </span>
              <div className={styles.iconWrapper}>
                {openIndex === index ? (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#0388FF" />
                    <path
                      d="M16 24.0078L32 24.0078"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#ECF0FE" />
                    <path
                      d="M23.99 16V32"
                      stroke="#0388FF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 24.0078L32 24.0078"
                      stroke="#0388FF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            </button>

            {openIndex === index && (
              <div className={styles.faqAnswer}>
                <p className={`${styles.answerText} ${poppins.className}`}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
