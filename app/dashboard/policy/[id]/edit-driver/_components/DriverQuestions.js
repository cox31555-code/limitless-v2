"use client";

import React from "react";
import DashboardDropdown from "../../edit-vehicle/_components/DashboardDropdown";
import EmploymentAutocomplete from "@/app/annual/get-quote/_components/EmploymentAutocomplete";
import styles from "./driverQuestions.module.css";
import { occupationOptions, industryOptions, studentTypeOptions, licenseHeldOptions } from "@/app/temporary/get-quote/data";

const DriverQuestions = ({ form, claims, convictions, setClaims, setConvictions }) => {
  const { register, watch, setValue } = form;

  // Watch all fields
  const maritalStatus = watch("userDetails.maritalStatus");
  const ownsHome = watch("userDetails.ownsHome");
  const childrenUnder16 = watch("userDetails.childrenUnder16");
  const livedInUKSinceBirth = watch("userDetails.livedInUKSinceBirth");
  const employmentStatus = watch("userDetails.employmentStatus");
  const occupation = watch("userDetails.occupation");
  const industry = watch("userDetails.industry");
  const studentType = watch("userDetails.studentType");
  const licenseType = watch("carUsage.licenseType");
  const licenseIssueCountry = watch("carUsage.licenseIssueCountry");
  const licenseHeld = watch("carUsage.licenseHeld");
  const hasAdditionalQualifications = watch("carUsage.hasAdditionalQualifications");
  const medicalConditions = watch("carUsage.medicalConditions");
  const dvlaConditionType = watch("carUsage.dvlaConditionType");
  const insuranceCancelled = watch("carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided");
  const criminalConvictions = watch("carUsage.criminalConvictions");
  const motorAccidentsClaims = watch("carUsage.motorAccidentsClaims");
  const drivingConvictions = watch("carUsage.drivingConvictions");

  const maritalStatusOptions = ["Single", "Married", "Civil partnership", "Divorced", "Widowed"];
  const yesNoOptions = ["Yes", "No"];
  const employmentOptions = ["Employed", "Self Employed", "Retired", "Unemployed", "Student", "Houseperson"];
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
  const dvlaConditionOptions = [
    "DVLA aware - No restrictions",
    "DVLA aware - 1 year restricted Licence",
    "DVLA aware - 2 year restricted Licence",
    "DVLA aware - 3 year restricted Licence",
    "DVLA aware - 5 year restricted Licence",
    "DVLA unaware",
  ];

  const isEmployedOrSelfEmployed = ["Employed", "Self Employed"].includes(employmentStatus);
  const isStudent = employmentStatus === "Student";

  return (
    <div className={styles.questionsCard}>
      {/* Relationship Status */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>What's your relationship status?</h3>
        <DashboardDropdown
          selected={maritalStatus || ""}
          options={maritalStatusOptions}
          setSelected={(value) => setValue("userDetails.maritalStatus", value)}
          placeholder="Please select..."
        />
      </div>

      {/* Own Home */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Do you own your home?</h3>
        <DashboardDropdown
          selected={ownsHome !== undefined ? (ownsHome ? "Yes" : "No") : ""}
          options={yesNoOptions}
          setSelected={(value) => setValue("userDetails.ownsHome", value === "Yes")}
          placeholder="Please select..."
        />
      </div>

      {/* Children Under 16 */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Do you have any children under 16 living with you?</h3>
        <DashboardDropdown
          selected={childrenUnder16 !== undefined ? (childrenUnder16 ? "Yes" : "No") : ""}
          options={yesNoOptions}
          setSelected={(value) => setValue("userDetails.childrenUnder16", value === "Yes")}
          placeholder="Please select..."
        />
      </div>

      {/* Lived in UK Since Birth */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Have you lived in the UK since birth?</h3>
        <DashboardDropdown
          selected={livedInUKSinceBirth !== undefined ? (livedInUKSinceBirth ? "Yes" : "No") : ""}
          options={yesNoOptions}
          setSelected={(value) => setValue("userDetails.livedInUKSinceBirth", value === "Yes")}
          placeholder="Please select..."
        />
      </div>

      {/* Employment Status */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>What's your employment status?</h3>
        <DashboardDropdown
          selected={employmentStatus || ""}
          options={employmentOptions}
          setSelected={(value) => setValue("userDetails.employmentStatus", value)}
          placeholder="Please select..."
        />
      </div>

      {/* Occupation (if employed) */}
      {isEmployedOrSelfEmployed && (
        <>
          <div className={styles.questionGroup}>
            <h3 className={styles.questionTitle}>What do you do for a living?</h3>
            <p className={styles.questionDescription}>Start typing and choose from the list.</p>
            <EmploymentAutocomplete
              selected={occupation || ""}
              options={occupationOptions}
              setSelected={(value) => setValue("userDetails.occupation", value)}
              placeholder="Type your occupation..."
            />
          </div>

          <div className={styles.questionGroup}>
            <h3 className={styles.questionTitle}>What type of industry do you work in?</h3>
            <p className={styles.questionDescription}>Start typing and choose from the list.</p>
            <EmploymentAutocomplete
              selected={industry || ""}
              options={industryOptions}
              setSelected={(value) => setValue("userDetails.industry", value)}
              placeholder="Type your industry..."
            />
          </div>
        </>
      )}

      {/* Student Type (if student) */}
      {isStudent && (
        <div className={styles.questionGroup}>
          <h3 className={styles.questionTitle}>What type of student are you?</h3>
          <DashboardDropdown
            selected={studentType || ""}
            options={studentTypeOptions}
            setSelected={(value) => setValue("userDetails.studentType", value)}
            placeholder="Please select..."
          />
        </div>
      )}

      {/* License Type */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>What type of driving licence do you have?</h3>
        <p className={styles.questionDescription}>Choose the type of licence you'll have at the time this policy starts.</p>
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

      {/* License Issue Country */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Where was your driving licence issued?</h3>
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

      {/* License Held Duration */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>How long have you held this licence?</h3>
        <p className={styles.questionDescription}>
          Round down to the nearest full year you've held your driving licence for. So, if you passed your driving test 6 years and 11 months ago, your answer will be 6 years.
        </p>
        <DashboardDropdown
          selected={licenseHeld || ""}
          options={licenseHeldOptions}
          setSelected={(value) => setValue("carUsage.licenseHeld", value)}
          placeholder="Please select..."
        />
      </div>

      {/* Additional Qualifications */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Have you passed any additional driving qualifications?</h3>
        <p className={styles.questionDescription}>
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
      </div>

      {/* Medical Conditions */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Do you have any medical conditions or disabilities that the DVA need to know about?</h3>
        <p className={styles.questionDescription}>
          The DVA and insurance providers need to know about any medical conditions, disabilities or licence conditions that may affect your ability to drive.
        </p>
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
          <div className={styles.conditionalSection}>
            <h4 className={styles.subQuestionTitle}>Does the DVLA or DVA know about the medical condition or disability?</h4>
            <DashboardDropdown
              selected={dvlaConditionType || ""}
              options={dvlaConditionOptions}
              setSelected={(value) => setValue("carUsage.dvlaConditionType", value)}
              placeholder="Please select..."
            />
          </div>
        )}
      </div>

      {/* Insurance Cancelled */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Has an insurance provider ever declined, cancelled, or voided your policy or imposed special terms?</h3>
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

      {/* Criminal Convictions */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Have you got any unspent non-motoring-related criminal convictions?</h3>
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

      {/* Motor Accidents/Claims */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Have you had any motor accidents, claims or losses in the past 5 years, no matter who was at fault or if a claim was made?</h3>
        <p className={styles.questionDescription}>
          We need to know about any claims (including unsettled claims), accidents, or losses involving any car, van, motorbike, or other vehicle.
        </p>
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              {...register("carUsage.motorAccidentsClaims")}
              value="Yes"
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>Yes</span>
          </label>
          <label className={styles.radioOption}>
            <input
              type="radio"
              {...register("carUsage.motorAccidentsClaims")}
              value="No"
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>No</span>
          </label>
        </div>

        {motorAccidentsClaims === "Yes" && (
          <div className={styles.conditionalSection}>
            <div className={styles.listHeader}>
              <h4 className={styles.subQuestionTitle}>Your claims</h4>
              <button
                type="button"
                className={styles.addButton}
                onClick={() => {
                  // TODO: Open claim modal
                  alert("Add claim functionality - to be implemented with claim modal");
                }}
              >
                + Add claim
              </button>
            </div>

            {claims && claims.length > 0 && (
              <div className={styles.itemsList}>
                {claims.map((claim, index) => (
                  <div key={index} className={styles.itemCard}>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemDetail}>
                        <span className={styles.itemLabel}>Type:</span> {claim.incidentType}
                      </p>
                      <p className={styles.itemDetail}>
                        <span className={styles.itemLabel}>Date:</span> {claim.day}/{claim.month}/{claim.year}
                      </p>
                      {claim.damageType && (
                        <p className={styles.itemDetail}>
                          <span className={styles.itemLabel}>Damage:</span> {claim.damageType}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => {
                        const updatedClaims = claims.filter((_, i) => i !== index);
                        setClaims(updatedClaims);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Driving Convictions */}
      <div className={styles.questionGroup}>
        <h3 className={styles.questionTitle}>Have you had any driving related convictions, endorsements, penalties, disqualifications or bans in the past 5 years?</h3>
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              {...register("carUsage.drivingConvictions")}
              value="Yes"
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>Yes</span>
          </label>
          <label className={styles.radioOption}>
            <input
              type="radio"
              {...register("carUsage.drivingConvictions")}
              value="No"
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>No</span>
          </label>
        </div>

        {drivingConvictions === "Yes" && (
          <div className={styles.conditionalSection}>
            <div className={styles.listHeader}>
              <h4 className={styles.subQuestionTitle}>Your convictions</h4>
              <button
                type="button"
                className={styles.addButton}
                onClick={() => {
                  // TODO: Open conviction modal
                  alert("Add conviction functionality - to be implemented with conviction modal");
                }}
              >
                + Add conviction
              </button>
            </div>

            {convictions && convictions.length > 0 && (
              <div className={styles.itemsList}>
                {convictions.map((conviction, index) => (
                  <div key={index} className={styles.itemCard}>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemDetail}>
                        <span className={styles.itemLabel}>Date:</span> {conviction.day}/{conviction.month}/{conviction.year}
                      </p>
                      <p className={styles.itemDetail}>
                        <span className={styles.itemLabel}>Type:</span> {conviction.convictionType}
                      </p>
                      {conviction.location && (
                        <p className={styles.itemDetail}>
                          <span className={styles.itemLabel}>Location:</span> {conviction.location}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => {
                        const updatedConvictions = convictions.filter((_, i) => i !== index);
                        setConvictions(updatedConvictions);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverQuestions;
