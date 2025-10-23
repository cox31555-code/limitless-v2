"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./getQuote.module.css";
import Image from "next/image";
import FormTextInput from "../inputs/FormTextInput";
import Selection1 from "../inputs/selections/selection1/Selection1";
import FormDropdown from "../inputs/FormDropdown";

const GetQuote = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [quickSelection, setQuickSelection] = useState("");
  const [customDurationType, setCustomDurationType] = useState("");
  const [customDurationValue, setCustomDurationValue] = useState("");
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

    setStep(2);
  };

  const handleDurationContinue = () => {
    setErrors({});
    const newErrors = {};

    if (!quickSelection && !customDurationValue) {
      newErrors.duration = "Please select a duration";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let durationData = {};
    if (quickSelection) {
      if (quickSelection.includes("Day")) {
        durationData = { type: "Days", value: quickSelection.split(" ")[0] };
      } else if (quickSelection.includes("Week")) {
        durationData = { type: "Weeks", value: quickSelection.split(" ")[0] };
      }
    } else if (customDurationType && customDurationValue) {
      durationData = {
        type: customDurationType,
        value: customDurationValue,
      };
    }

    const params = new URLSearchParams();
    params.set("fromQuote", "true");
    params.set("registrationNumber", registrationNumber.trim().toUpperCase());

    if (durationData.type) {
      params.set("durationType", durationData.type);
    }
    if (durationData.value) {
      params.set("durationValue", durationData.value);
    }

    router.push(`/temporary/get-quote?${params.toString()}`);
  };

  const handleDontKnowReg = () => {
    router.push("/temporary/get-quote");
  };

  const handleRegistrationChange = (e) => {
    const value = e.target.value.toUpperCase();
    setRegistrationNumber(value);
    if (errors.registrationNumber) {
      setErrors({ ...errors, registrationNumber: undefined });
    }
  };

  const goBack = () => {
    setStep(1);
    setQuickSelection("");
    setCustomDurationType("");
    setCustomDurationValue("");
    setErrors({});
  };

  return (
    <div className={styles.container}>
      {/* Step Indicator */}
      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
          <span className={styles.stepNumber}>1</span>
          <span className={styles.stepLabel}>Registration</span>
        </div>
        <div className={`${styles.stepLine} ${step >= 2 ? styles.active : ""}`} />
        <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
          <span className={styles.stepNumber}>2</span>
          <span className={styles.stepLabel}>Duration</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        {/* Step 1: Registration */}
        {step === 1 && (
          <div className={`${styles.stepContent} ${styles.fadeIn}`}>
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
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className={styles.primaryButton}
              disabled={!registrationNumber.trim()}
            >
              Continue
              <Image
                src="/svg/arrow-right.svg"
                alt="arrow"
                width={18}
                height={18}
              />
            </button>

            <button
              type="button"
              onClick={handleDontKnowReg}
              className={styles.secondaryButton}
            >
              I don't know my reg yet
            </button>
          </div>
        )}

        {/* Step 2: Duration */}
        {step === 2 && (
          <div className={`${styles.stepContent} ${styles.fadeIn}`}>
            <div className={styles.stepHeader}>
              <h3 className={styles.stepTitle}>How long do you need cover?</h3>
              <p className={styles.stepDescription}>
                Choose a preset duration or customize it
              </p>
            </div>

            {/* Quick Duration Options */}
            <div className={styles.durationSection}>
              <div className={styles.sectionLabel}>Quick Options</div>
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
              <div className={styles.sectionLabel}>Custom Duration</div>

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
                    {type}
                  </button>
                ))}
              </div>

              {/* Duration Value Selection */}
              {customDurationType && (
                <div className={`${styles.durationValueGroup} ${styles.slideIn}`}>
                  <div className={styles.valueInputRow}>
                    <Selection1
                      items={
                        customDurationType === "Days"
                          ? ["1", "2", "3", "4", "5", "6", "7"]
                          : customDurationType === "Hours"
                          ? [
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                              "12",
                            ]
                          : ["1", "2", "3", "4"]
                      }
                      selectedItem={customDurationValue}
                      setSelectedItem={(item) => {
                        setCustomDurationValue(item);
                        if (errors.duration) {
                          setErrors({ ...errors, duration: undefined });
                        }
                      }}
                    />
                    <div className={styles.moreOptionsDropdown}>
                      <FormDropdown
                        options={
                          customDurationType === "Days"
                            ? Array.from({ length: 23 }, (_, i) =>
                                (i + 8).toString()
                              )
                            : customDurationType === "Hours"
                            ? Array.from({ length: 12 }, (_, i) =>
                                (i + 13).toString()
                              )
                            : Array.from({ length: 48 }, (_, i) =>
                                (i + 5).toString()
                              )
                        }
                        placeholder="More..."
                        value={customDurationValue}
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
              <Image
                src="/svg/arrow-right.svg"
                alt="arrow"
                width={18}
                height={18}
              />
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
