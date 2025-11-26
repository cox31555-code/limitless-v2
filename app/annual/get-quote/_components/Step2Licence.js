"use client";
import React, { useState } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "./step2Licence.module.css";
import { licenseHeldOptions } from "@/app/temporary/get-quote/data";

const Step2Licence = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const [expandedWhereToFind, setExpandedWhereToFind] = useState(false);

  const licenseType = watch("carUsage.licenseType");
  const licenseIssueCountry = watch("carUsage.licenseIssueCountry");
  const licenseHeld = watch("carUsage.licenseHeld");
  const hasAdditionalQualifications = watch("carUsage.hasAdditionalQualifications");

  const licenseTypeOptions = [
    "Full UK Car Licence",
    "Provisional UK Car Licence",
    "Full International Licence",
    "Full EU Licence",
    "Full European non-EU Licence",
    "Full UK Car Licence (automatic only)",
  ];

  const licenseIssueCountryOptions = [
    "England, Scotland or Wales (Great Britain)",
    "Northern Ireland",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - Your licence</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Licence Type Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>What type of driving licence do you have?</h3>
          <p className={styles.subText}>Choose the type of licence you'll have at the time this policy starts.</p>

          <div className={styles.radioGroup}>
            {licenseTypeOptions.map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  {...register("carUsage.licenseType")}
                  value={option}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Licence Issue Country Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Where was your driving licence issued?</h3>

          <div className={styles.radioGroup}>
            {licenseIssueCountryOptions.map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  {...register("carUsage.licenseIssueCountry")}
                  value={option}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Licence Held Duration Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>How long have you held this licence?</h3>
          <p className={styles.subText}>
            Round down to the nearest full year you've held your driving licence for. So, if you passed your driving test 6 years and 11 months ago, your answer will be 6 years.
          </p>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedWhereToFind(!expandedWhereToFind)}
          >
            <span className={styles.expandableIcon}>
              {expandedWhereToFind ? '▼' : '▼'}
            </span>
            Where can I find the date?
          </button>

          {expandedWhereToFind && (
            <div className={styles.expandableContent}>
              You can find the issue date on the front of your driving licence card. Look for the date in the format DD/MM/YYYY next to "Issued".
            </div>
          )}

          <div className={styles.dropdownWrapper}>
            <Dropdown
              selected={licenseHeld || ""}
              options={licenseHeldOptions}
              setSelected={(value) => {
                setValue("carUsage.licenseHeld", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              placeholder="Please select..."
            />
          </div>
        </div>

        {/* Additional Qualifications Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Have you passed any additional driving qualifications?</h3>
          <p className={styles.subText}>
            Some insurance providers may offer a discount if you have an additional driving qualification.
          </p>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.hasAdditionalQualifications")}
                value="true"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.hasAdditionalQualifications")}
                value="false"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Licence;
