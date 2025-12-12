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
      description: "Submit and track your insurance claims online.",
      href: "/dashboard/submit-claim",
      linkText: "Submit claim",
    },
    {
      icon: "/svg/guide.svg",
      title: "Guides",
      description: "Step-by-step instructions for managing your policy.",
      href: "/FAQ",
      linkText: "View guides",
    },
    {
      icon: "/svg/video.svg",
      title: "Video tutorials",
      description: "Watch helpful videos to get the most from your account.",
      href: "/FAQ",
      linkText: "Watch videos",
    },
    {
      icon: "/svg/faq.svg",
      title: "FAQs",
      description: "Find quick answers to your most common questions.",
      href: "/FAQ",
      linkText: "Browse FAQs",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
            Looking for something else?
          </h2>
          <p className={`${styles.sectionDescription} ${manrope.className}`}>
            Explore our helpful resources to find exactly what you need.
          </p>
        </div>

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
