"use client";
import React from "react";
import styles from "./serviceDescription.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "500"],
});
const ServiceDescription = ({ services, title, description, button, img }) => {
  const router = useRouter();
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
        />
      </div>
      <div className={styles.second}>
        <div className={styles.servicesContent}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            {withoutLastWord}{" "}
            <span className={styles.secondPart}>{lastWord}</span>
          </h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.services}>
          {services.map((service, index) => (
            <div className={styles.service} key={index}>
              <div className={styles.checkmarkWrapper}>
                <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="url(#checkGradient)" />
                  <path d="M7.5 12.5L10 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0388ff" />
                      <stop offset="100%" stopColor="#0270cc" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3
                className={`${styles.serviceTitle} ${plusJakartaSans.className}`}
              >
                {service}
              </h3>
            </div>
          ))}
        </div>
        <button
          className={styles.confirmBtn}
          onClick={() => {
            title === "Impound Vehicle Insurance"
              ? router.push("/impound/get-quote")
              : router.push("/temporary/get-quote");
          }}
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
};

export default ServiceDescription;
