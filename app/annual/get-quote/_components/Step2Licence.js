"use client";
import React, { useState } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import styles from "./step2Licence.module.css";
import { licenseHeldOptions, monthOptions, yearOptions } from "@/app/temporary/get-quote/data";

const Step2Licence = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const [expandedWhereToFind, setExpandedWhereToFind] = useState(false);
  const [expandedWhatDo, setExpandedWhatDo] = useState(false);

  const licenseType = watch("carUsage.licenseType");
  const licenseIssueCountry = watch("carUsage.licenseIssueCountry");
  const licenseHeld = watch("carUsage.licenseHeld");
  const hasAdditionalQualifications = watch("carUsage.hasAdditionalQualifications");
  const additionalQualificationType = watch("carUsage.additionalQualificationType");
  const qualificationMonth = watch("carUsage.qualificationMonth");
  const qualificationYear = watch("carUsage.qualificationYear");
  const licenseNumber = watch("carUsage.licenseNumber");
  const licenseNumberFirst = watch("carUsage.licenseNumberFirst");
  const licenseNumberLast = watch("carUsage.licenseNumberLast");
  const licenseNumberNI = watch("carUsage.licenseNumberNI");
  const declineShareLicenseNumber = watch("carUsage.declineShareLicenseNumber");

  const isNorthernIreland = licenseIssueCountry === "Northern Ireland";
  const isGreatBritain = licenseIssueCountry === "England, Scotland or Wales (Great Britain)";

  const nonUKLicenseTypes = [
    "Full International Licence",
    "Full EU Licence",
    "Full European non-EU Licence",
  ];

  const shouldShowLicenseNumberSection = licenseType && !nonUKLicenseTypes.includes(licenseType);

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
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - Your licence</h2>
      </div>

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

        {shouldShowLicenseNumberSection && (
          <div className={styles.section}>
            <h3 className={styles.mainQuestion}>Do you want to share your driving licence number?</h3>
            <p className={styles.subText}>
              We're unable to accept Isle of Man or Channel Islands driving licence numbers.
            </p>

            {!declineShareLicenseNumber && (
              <div className={styles.licenseImageContainer}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F78e152c1b10b432aa104583a5336f5b1?format=webp&width=800"
                  alt="UK Driving Licence"
                  className={styles.licenseImage}
                />
              </div>
            )}

            {!declineShareLicenseNumber && isGreatBritain && (
              <div className={styles.licenseNumberFields}>
                <div className={styles.licenseField}>
                  <label className={styles.licenseFieldLabel}>First 11 characters</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    maxLength="11"
                    value={licenseNumberFirst || ""}
                    onChange={(e) => {
                      setValue("carUsage.licenseNumberFirst", e.target.value);
                    }}
                    error={errors.carUsage?.licenseNumberFirst?.message}
                  />
                </div>

                <div className={styles.licenseField}>
                  <label className={styles.licenseFieldLabel}>Last 5 characters</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    maxLength="5"
                    value={licenseNumberLast || ""}
                    onChange={(e) => {
                      setValue("carUsage.licenseNumberLast", e.target.value);
                    }}
                    error={errors.carUsage?.licenseNumberLast?.message}
                  />
                </div>
              </div>
            )}

            {!declineShareLicenseNumber && isNorthernIreland && (
              <div className={styles.licenseNumberFields}>
                <div className={styles.licenseField}>
                  <label className={styles.licenseFieldLabel}>Enter your 8 digit number</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    maxLength="8"
                    value={licenseNumberNI || ""}
                    onChange={(e) => {
                      setValue("carUsage.licenseNumberNI", e.target.value);
                    }}
                    error={errors.carUsage?.licenseNumberNI?.message}
                  />
                </div>
              </div>
            )}

            <div className={styles.checkboxWrapper}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  {...register("carUsage.declineShareLicenseNumber")}
                  className={styles.checkbox}
                />
                I don't want to/can't provide this
              </label>
            </div>

            {!declineShareLicenseNumber && (
              <>
                <div className={styles.infoBox}>
                  Did you know... you may get a better deal by sharing this with insurers.
                </div>

                <button
                  type="button"
                  className={styles.expandableLink}
                  onClick={() => setExpandedWhatDo(!expandedWhatDo)}
                >
                  What do we do with this information?
                </button>

                {expandedWhatDo && (
                  <div className={styles.expandableContent}>
                    We use your driving licence information to verify your identity and driving history with the DVLA. This helps us provide you with accurate insurance quotes and ensure you're getting the best possible deal.
                  </div>
                )}
              </>
            )}
          </div>
        )}

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

export default Step2Licence;
