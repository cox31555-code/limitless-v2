import React from "react";
import styles from "./quickLinksSection.module.css";
import Image from "next/image";
import Link from "next/link";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const QuickLinksSection = () => {
  const links = [
    {
      icon: "/svg/claim.svg",
      title: "Make a claim",
      description: "Give our claims team a call anytime on 0310 678 5557. Calls will be recorded. For Text Phone first dial 18001.",
      href: "/dashboard/submit-claim",
      linkText: "How to make a claim",
    },
    {
      icon: "/svg/guide.svg",
      title: "How-to guides",
      description: "Wondering how to manage your Allianz Online account? Our guides will help you stay in control of your cover.",
      href: "/FAQ",
      linkText: "Read our guides",
    },
    {
      icon: "/svg/video.svg",
      title: "How-to videos",
      description: "Our videos are a step-by-step guide to help you make changes in your account. Let us show you...",
      href: "/FAQ",
      linkText: "Watch our videos",
    },
    {
      icon: "/svg/faq.svg",
      title: "FAQs",
      description: "We've put together your frequently asked questions all in one place to help you stay in control of your cover...",
      href: "/FAQ",
      linkText: "FAQs",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
          Looking for something else?
        </h2>
        <div className={styles.grid}>
          {links.map((link, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image
                  src={link.icon}
                  alt={link.title}
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
                {link.title}
              </h3>
              <p className={`${styles.cardText} ${manrope.className}`}>
                {link.description}
              </p>
              <Link href={link.href} className={`${styles.cardLink} ${manrope.className}`}>
                {link.linkText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
