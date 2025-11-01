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

      {/* Accordion-Style Content */}
      <div className={styles.contentWrapper}>
        {/* Step 1: Registration */}
        {step === 1 && (
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
                placeholder="e.g., AB51 ABC"
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
        )}

        {/* Step 2: Duration */}
        {step === 2 && (
          <div className={`${styles.accordionContent} ${styles.expanded}`}>
            <div className={styles.stepHeader}>
              <h3 className={styles.stepTitle}>How long do you need cover?</h3>
            </div>

            {/* Quick Duration Options */}
            <div className={styles.durationSection}>
              <div className={styles.sectionLabel}>Pick your perfect duration</div>
              <div className={styles.quickOptions}>
                {["1 Day", "2 Days", "1 Week"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.quickOption} ${
                      quickSelection === option ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setQuickSelection(option);
                      setCustomDurationType("");
                      setCustomDurationValue("");
                      if (errors.duration) {
                        setErrors({ ...errors, duration: undefined });
                      }
                    }}
                  >
                    <span className={styles.optionText}>{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Duration */}
            <div className={styles.customDurationSection}>
              <div className={styles.sectionLabel}>Want something specific?</div>

              {/* Duration Type Selection */}
              <div className={styles.durationTypeGrid}>
                {["Hours", "Days", "Weeks"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.durationTypeButton} ${
                      customDurationType === type ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setCustomDurationType(type);
                      setCustomDurationValue("");
                      setQuickSelection("");
                      if (errors.duration) {
                        setErrors({ ...errors, duration: undefined });
                      }
                    }}
                  >
                    {customDurationType === type && customDurationValue && (
                      <span className={styles.selectedValue}>{customDurationValue}</span>
                    )}
                    {type}
                  </button>
                ))}
              </div>

              {/* Inline Number Selector */}
              {customDurationType && (
                <div className={styles.numberSelectorWrapper}>
                  <div className={styles.numberSelector}>
                    {(customDurationType === "Days"
                      ? ["1", "2", "3", "4", "5", "6", "7"]
                      : customDurationType === "Hours"
                      ? ["1", "2", "3", "4", "5", "6", "7"]
                      : ["1", "2", "3", "4"]
                    ).map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`${styles.numberButton} ${
                          customDurationValue === num ? styles.selectedNumber : ""
                        }`}
                        onClick={() => {
                          setCustomDurationValue(num);
                          if (errors.duration) {
                            setErrors({ ...errors, duration: undefined });
                          }
                        }}
                      >
                        {num.padStart(2, "0")}
                      </button>
                    ))}
                    <div className={styles.moreOptionsDropdown}>
                      <FormDropdown
                        options={
                          customDurationType === "Days"
                            ? Array.from({ length: 24 }, (_, i) =>
                                (i + 8).toString()
                              )
                            : customDurationType === "Hours"
                            ? Array.from({ length: 17 }, (_, i) =>
                                (i + 8).toString()
                              )
                            : Array.from({ length: 48 }, (_, i) =>
                                (i + 5).toString()
                              )
                        }
                        placeholder="More..."
                        value={customDurationValue && parseInt(customDurationValue) > (customDurationType === "Weeks" ? 4 : 7) ? customDurationValue : ""}
                        onChange={(e) => {
                          setCustomDurationValue(e.target.value);
                          if (errors.duration) {
                            setErrors({ ...errors, duration: undefined });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {errors.duration && (
              <div className={styles.errorMessage}>{errors.duration}</div>
            )}

            <button
              type="button"
              onClick={handleDurationContinue}
              className={styles.primaryButton}
              disabled={!quickSelection && !customDurationValue}
            >
              Continue
            </button>

            <button
              type="button"
              onClick={goBack}
              className={styles.secondaryButton}
            >
              Back
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default GetQuote;
