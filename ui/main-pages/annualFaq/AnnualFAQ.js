"use client";
import React, { useState } from "react";
import styles from "../faq/faq.module.css";
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
    question: "What is annual car insurance?",
    answer: "Annual car insurance is a twelve-month comprehensive or third-party insurance policy that covers your vehicle throughout the year. It provides continuous protection against accidents, theft, fire, and third-party damage, with a fixed premium paid annually or in monthly installments.",
  },
  {
    question: "Why choose annual insurance over short-term cover?",
    answer: "Annual insurance offers better value for money with lower daily costs compared to short-term policies. It provides continuous protection, flexibility, and the opportunity to earn a No Claims Bonus. Annual policies also simplify your insurance management with just one annual renewal instead of multiple short-term arrangements.",
  },
  {
    question: "How much does annual car insurance cost?",
    answer: "Annual car insurance costs depend on factors like your age, driving history, vehicle type, and desired cover level. Our policies start from as little as 80p per day, with options for everyone from learner drivers to those with convictions. Get a quote online instantly to see your personalized pricing.",
  },
  {
    question: "Can I get annual insurance with a bad driving record?",
    answer: "Yes! We specialize in providing annual car insurance for drivers with convictions, points, or previous insurance issues. We consider all motoring convictions and offer competitive rates tailored to your circumstances. Simply provide your details during the quote process, and we'll show you available options.",
  },
  {
    question: "What does annual comprehensive cover include?",
    answer: "Comprehensive annual insurance covers accidental damage, theft, vandalism, fire, third-party liability, legal protection, and uninsured driver protection. It's the most complete level of cover available, protecting both your vehicle and others in case of an accident.",
  },
];

const AnnualFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.heading} ${plusJakartaSans.className}`}>
        Frequently Asked <span className={styles.highlight}>Questions</span>
      </h2>

      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
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

export default AnnualFAQ;
