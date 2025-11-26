"use client";
import React, { useState } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "./step2LicenceRestrictions.module.css";

const Step2LicenceRestrictions = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const [expandedMedical, setExpandedMedical] = useState(false);
  const [expandedSpecialTerms, setExpandedSpecialTerms] = useState(false);
  const [expandedWhySpecialTerms, setExpandedWhySpecialTerms] = useState(false);
  const [expandedCriminal, setExpandedCriminal] = useState(false);
  const [expandedWhatSpent, setExpandedWhatSpent] = useState(false);

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
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - Licence restrictions</h2>
      </div>

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

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedMedical(!expandedMedical)}
          >
            Does the DVA need to know about my condition?
          </button>

          {expandedMedical && (
            <div className={styles.expandableContent}>
              You should inform the DVA about any medical condition that could affect your ability to drive safely. This includes conditions affecting vision, mobility, consciousness, or medication side effects. You can check the DVLA website for a full list of conditions.
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

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedSpecialTerms(!expandedSpecialTerms)}
          >
            How do I know if I've had special terms imposed?
          </button>

          {expandedSpecialTerms && (
            <div className={styles.expandableContent}>
              Special terms might include higher premiums, restrictions on cover, or exclusions added to your policy. Check your policy documents or contact your insurer for details about any terms applied to your cover.
            </div>
          )}

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedWhySpecialTerms(!expandedWhySpecialTerms)}
          >
            Why are we asking?
          </button>

          {expandedWhySpecialTerms && (
            <div className={styles.expandableContent}>
              Insurance providers use this information to assess your risk and determine appropriate pricing and cover. This helps us provide you with accurate quotes and ensure you have suitable coverage.
            </div>
          )}
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

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedCriminal(!expandedCriminal)}
          >
            How do I know if my conviction is spent?
          </button>

          {expandedCriminal && (
            <div className={styles.expandableContent}>
              A conviction is considered "spent" after a certain period, which depends on the sentence. For most offences, this is between 5-10 years. You can check the Rehabilitation of Offenders Act 1974 or contact the Disclosure and Barring Service for more information.
            </div>
          )}

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedWhatSpent(!expandedWhatSpent)}
          >
            What's an unspent conviction?
          </button>

          {expandedWhatSpent && (
            <div className={styles.expandableContent}>
              An unspent conviction means the rehabilitation period has not yet ended and is still relevant. You are legally required to disclose unspent convictions to insurers, but spent convictions do not need to be declared in most circumstances.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2LicenceRestrictions;
