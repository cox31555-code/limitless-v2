"use client";
import React, { useState } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "@/app/annual/get-quote/_components/step2Licence.module.css";
import { licenseHeldOptions, monthOptions, yearOptions } from "@/app/temporary/get-quote/data";

const Step2LicenceHidden = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const [expandedWhereToFind, setExpandedWhereToFind] = useState(false);

  const licenseType = watch("carUsage.licenseType");
  const licenseIssueCountry = watch("carUsage.licenseIssueCountry");
  const licenseHeld = watch("carUsage.licenseHeld");
  const hasAdditionalQualifications = watch("carUsage.hasAdditionalQualifications");
  const additionalQualificationType = watch("carUsage.additionalQualificationType");
  const qualificationMonth = watch("carUsage.qualificationMonth");
  const qualificationYear = watch("carUsage.qualificationYear");

  const additionalQualificationsOptions = [
    "AA Proficiency",
    "Institute of Advanced Motorists",
    "Pass Plus",
  ];

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
      <div className={styles.contentWrapper}>
        {/* Licence Type Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What type of driving licence do you have?</h3>
            <p className={styles.subText}>Choose the type of licence you'll have at the time this policy starts.</p>
          </div>

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
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Where was your driving licence issued?</h3>
          </div>

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
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>How long have you held this licence?</h3>
            <p className={styles.subText}>
              Round down to the nearest full year you've held your driving licence for. So, if you passed your driving test 6 years and 11 months ago, your answer will be 6 years.
            </p>
          </div>

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
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Have you passed any additional driving qualifications?</h3>
            <p className={styles.subText}>
              Some insurance providers may offer a discount if you have an additional driving qualification.
            </p>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.hasAdditionalQualifications")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.hasAdditionalQualifications")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>

          {hasAdditionalQualifications === "Yes" && (
            <>
              <div className={styles.qualificationSection}>
                <h4 className={styles.subQuestion}>What type of driving qualification do you have?</h4>

                <div className={styles.radioGroup}>
                  {additionalQualificationsOptions.map((option) => (
                    <label key={option} className={styles.radioOption}>
                      <input
                        type="radio"
                        {...register("carUsage.additionalQualificationType")}
                        value={option}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioLabel}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.qualificationSection}>
                <h4 className={styles.subQuestion}>When did you get this qualification?</h4>

                <div className={styles.dateFieldGroup}>
                  <div className={styles.dateField}>
                    <label className={styles.dateFieldLabel}>Month</label>
                    <Dropdown
                      selected={qualificationMonth || ""}
                      options={monthOptions}
                      setSelected={(value) => {
                        setValue("carUsage.qualificationMonth", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      placeholder="Select..."
                    />
                  </div>

                  <div className={styles.dateField}>
                    <label className={styles.dateFieldLabel}>Year</label>
                    <Dropdown
                      selected={qualificationYear || ""}
                      options={yearOptions}
                      setSelected={(value) => {
                        setValue("carUsage.qualificationYear", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      placeholder="Select..."
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2LicenceHidden;
