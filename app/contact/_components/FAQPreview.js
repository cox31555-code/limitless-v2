"use client";
import React, { useState } from "react";
import styles from "./faqPreview.module.css";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const FAQPreview = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer: "We aim to respond to all emails within 24 hours during business days. For urgent matters, please call our phone line.",
    },
    {
      question: "What information should I include in my email?",
      answer: "Please include your policy number (if applicable), a clear description of your query, and any relevant details that will help us assist you faster.",
    },
    {
      question: "Can I manage my policy online?",
      answer: "Yes! Log in to your Limitless account to manage, update, or check your policy anytime. Most changes can be made instantly through your dashboard.",
    },
    {
      question: "How do I make a claim?",
      answer: "For claims, please call our dedicated claims line. This ensures you receive immediate assistance from our specialized claims team.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Frequently asked questions
        </h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ""}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={manrope.className}>{faq.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={openIndex === index ? styles.rotated : ""}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className={`${styles.faqAnswer} ${manrope.className}`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.viewAllWrapper}>
          <Link href="/FAQ" className={`${styles.viewAllButton} ${manrope.className}`}>
            View all FAQs
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.75 13.5L11.25 9L6.75 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;
