"use client";
import React, { useState } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "@/app/annual/get-quote/_components/step2LicenceRestrictions.module.css";

const Step2LicenceRestrictionsHidden = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;

  const medicalConditions = watch("carUsage.medicalConditions");
  const dvlaConditionType = watch("carUsage.dvlaConditionType");
  const insuranceCancelledOrClaimRefused = watch("carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided");
  const criminalConvictions = watch("carUsage.criminalConvictions");

  const dvlaConditionOptions = [
    "DVLA aware - No restrictions",
    "DVLA aware - 1 year restricted Licence",
    "DVLA aware - 2 year restricted Licence",
    "DVLA aware - 3 year restricted Licence",
    "DVLA aware - 5 year restricted Licence",
    "DVLA unaware",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Medical Conditions Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Do you have any medical conditions or disabilities that the DVA need to know about?</h3>
            <p className={styles.subText}>
              The DVA and insurance providers need to know about any medical conditions, disabilities or licence conditions that may affect your ability to drive.
            </p>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.medicalConditions")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.medicalConditions")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>

          {medicalConditions === "Yes" && (
            <div className={styles.dropdownWrapper}>
              <h4 className={styles.subQuestion}>Does the DVLA or DVA know about the medical condition or disability?</h4>
              <Dropdown
                selected={dvlaConditionType || ""}
                options={dvlaConditionOptions}
                setSelected={(value) => {
                  setValue("carUsage.dvlaConditionType", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                placeholder="Please select..."
              />
            </div>
          )}
        </div>

        {/* Insurance History Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Has an insurance provider ever declined, cancelled, or voided your policy or imposed special terms?</h3>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>

        {/* Criminal Convictions Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Have you got any unspent non-motoring-related criminal convictions?</h3>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.criminalConvictions")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.criminalConvictions")}
                value="No"
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

export default Step2LicenceRestrictionsHidden;
