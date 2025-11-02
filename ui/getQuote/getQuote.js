"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./getQuote.module.css";
import FormTextInput from "../inputs/FormTextInput";

const GetQuote = ({ onExpand, insuranceType = "temporary" }) => {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    setErrors({});
    const newErrors = {};

    if (!registrationNumber.trim()) {
      newErrors.registrationNumber = "Please enter a registration number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onExpand) {
      onExpand(true);
    }

    const params = new URLSearchParams();
    params.set("fromQuote", "true");
    params.set("registrationNumber", registrationNumber.trim().toUpperCase());
    router.push(`/${insuranceType}/get-quote?${params.toString()}`);
  };

  const handleDontKnowReg = () => {
    router.push(`/${insuranceType}/get-quote`);
  };

  const handleRegistrationChange = (e) => {
    const value = e.target.value.toUpperCase();
    setRegistrationNumber(value);
    if (errors.registrationNumber) {
      setErrors({ ...errors, registrationNumber: undefined });
    }
  };

  const progressPercentage = 100;

  return (
    <div className={styles.container}>
      {/* Quick Quote Header */}
      <div className={styles.navigationWrapper}>
        <div className={styles.quickQuoteHeader}>
          <h2 className={styles.quickQuoteTitle}>Get Your Quote</h2>
          <p className={styles.quickQuoteSubtitle}>Enter your details to receive a personalized quote</p>
        </div>

        {/* Animated Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Single Step Content */}
      <div className={styles.contentWrapper}>
        <div className={`${styles.accordionContent} ${styles.expanded}`}>
          <div className={styles.stepHeader}>
            <h3 className={styles.stepTitle}>What's your vehicle registration?</h3>
            <p className={styles.stepDescription}>
              Enter your vehicle registration number to get started
            </p>
          </div>

          <div className={styles.regInputField}>
            <FormTextInput
              label="Registration Number"
              placeholder=""
              reg={true}
              value={registrationNumber}
              onChange={handleRegistrationChange}
              error={
                errors.registrationNumber
                  ? { message: errors.registrationNumber }
                  : null
              }
            />
            <button
              type="button"
              onClick={handleDontKnowReg}
              className={styles.secondaryButton}
            >
              I don't know my reg yet
            </button>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className={styles.primaryButton}
          >
            Continue
          </button>
        </div>
      </div>

    </div>
  );
};

export default GetQuote;
