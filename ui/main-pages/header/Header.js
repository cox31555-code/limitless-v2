"use client";
import React, { useState } from "react";
import styles from "./header.module.css";
import Feature from "../../feature/Feature";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import GetQuote from "../../getQuote/getQuote";
import { useRouter } from "next/navigation";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Header = ({ subTitle, title, description, features, insuranceType = "annual" }) => {
  const router = useRouter();
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  return (
    <div className={`headerContainer ${isQuoteExpanded ? "expanded" : ""}`}>
      <div className="centeredContent">
        <Image
          src="/svg/squares-2.svg"
          alt="squares"
          width={1100}
          height={700}
          className={styles.squares}
        />

        <Image
          src="/svg/contact.svg"
          alt="contact-us"
          width={585}
          height={900}
          className={styles.contact}
        />

        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.content}>
              <p className={`${styles.subTitle} ${manrope.className}`}>
                {subTitle}
              </p>

              <div className={`${styles.title} ${plusJakartaSans.className}`}>
                {withoutLastWord}
                <div className={styles.titleSpan}>
                  {lastWord}
                  <Image
                    src="/svg/curved-border.svg"
                    alt="curved border"
                    width={393}
                    height={3}
                    className={styles.curvedBorder}
                  />
                </div>
              </div>
              <p className={`${styles.description} `}>{description}</p>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.confirmBtn}
                  onClick={() => router.push(`/${insuranceType}/get-quote`)}
                >
                  Get a Quote
                </button>
                {isMounted && (
                  <button
                    className={styles.retrieveBtn}
                    onClick={() => router.push("/retrieve-quote")}
                  >
                    Retrieve your quote
                  </button>
                )}
              </div>
            </div>
            <GetQuote onExpand={setIsQuoteExpanded} insuranceType={insuranceType} />
          </div>
          <div className={styles.features}>
            {features.map((feature) => (
              <Feature key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
