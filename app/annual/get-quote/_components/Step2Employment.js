"use client";
import React from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "./step2Employment.module.css";

const Step2Employment = ({ form }) => {
  const { watch, setValue } = form;

  const employmentStatus = watch("userDetails.employmentStatus");

  const employmentOptions = [
    "Employed",
    "Self Employed",
    "Retired",
    "Unemployed",
    "Student",
    "Houseperson",
  ];

  const handleEmploymentChange = (value) => {
    setValue("userDetails.employmentStatus", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - Your employment</h2>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>What's your employment status?</h3>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              selected={employmentStatus || ""}
              options={employmentOptions}
              setSelected={handleEmploymentChange}
              placeholder="Please select..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Employment;
