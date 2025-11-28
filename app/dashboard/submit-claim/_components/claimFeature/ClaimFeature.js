"use client";
import React from "react";
import Image from "next/image";
import styles from "./claimFeature.module.css";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";

const ClaimFeature = ({ img, title, description, features, btnText, claimType }) => {
  const router = useRouter();
  const { showLoading } = useLoading();

  const handleClaimClick = () => {
    // Clear any existing claim data when starting a new claim
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("claimData");
    }

    showLoading();
    if (claimType === "car-insurance") {
      router.push("/dashboard/submit-claim?type=car-insurance&step=reason");
    } else if (claimType === "optional-cover") {
      router.push("/dashboard/submit-claim?type=optional-cover");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Image 
          src={img.src} 
          alt={title} 
          width={140} 
          height={140} 
          className={styles.icon}
        />
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button onClick={handleClaimClick} className={styles.button}>
          <span>{btnText}</span>
          <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClaimFeature;
