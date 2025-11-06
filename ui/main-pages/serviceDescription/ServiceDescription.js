"use client";
import React from "react";
import styles from "./serviceDescription.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "500"],
});
const ServiceDescription = ({ services, title, description, button, img }) => {
  const router = useRouter();
  const { setIsInsuranceModalOpen } = useInsuranceModal();
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
                  <circle cx="12" cy="12" r="11" fill="#0388ff" />
                  <path d="M7.5 12.5L10 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          onClick={() => setIsInsuranceModalOpen(true)}
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
};

export default ServiceDescription;
