"use client";
import React, { useState } from "react";
import styles from "@/app/annual/get-quote/_components/step2ClaimsAndConvictions.module.css";

const Step2ClaimsAndConvictionsHidden = ({ form, claims = [], convictions = [], setClaims = () => {}, setConvictions = () => {} }) => {
  const { register, formState: { errors }, watch } = form;
  const [expandedClaimsWhatIf, setExpandedClaimsWhatIf] = useState(false);
  const [expandedConvictionsHow, setExpandedConvictionsHow] = useState(false);

  const motorAccidentsClaims = watch("carUsage.motorAccidentsClaims");
  const drivingConvictions = watch("carUsage.drivingConvictions");

  const handleRemoveClaim = (index) => {
    const updatedClaims = claims.filter((_, i) => i !== index);
    setClaims(updatedClaims);
  };

  const handleRemoveConviction = (index) => {
    const updatedConvictions = convictions.filter((_, i) => i !== index);
    setConvictions(updatedConvictions);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Motor Accidents and Claims Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Have you had any motor accidents, claims or losses in the past 5 years, no matter who was at fault or if a claim was made?</h3>
            <p className={styles.subText}>
              We need to know about any claims (including unsettled claims), accidents, or losses involving any car, van, motorbike, or other vehicle.
            </p>
          </div>

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
            <div className={styles.claimsSection}>
              <div className={styles.claimsHeader}>
                <h4 className={styles.claimsTitle}>Your claims</h4>
              </div>

              {claims.length > 0 && (
                <div className={styles.claimsList}>
                  {claims.map((claim, index) => (
                    <div key={index} className={styles.claimCard}>
                      <div className={styles.claimInfo}>
                        <p className={styles.claimDetail}>
                          <span className={styles.claimLabel}>Type:</span> {claim.incidentType}
                        </p>
                        <p className={styles.claimDetail}>
                          <span className={styles.claimLabel}>Date:</span> {claim.day}/{claim.month}/{claim.year}
                        </p>
                        <p className={styles.claimDetail}>
                          <span className={styles.claimLabel}>Damage:</span> {claim.damageType}
                        </p>
                      </div>
                      <div className={styles.claimActions}>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => handleRemoveClaim(index)}
                        >
                          Remove claim
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Driving Convictions Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Have you had any driving related convictions, endorsements, penalties, disqualifications or bans in the past 5 years?</h3>
          </div>

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
            <div className={styles.convictionsSection}>
              <div className={styles.convictionsHeader}>
                <h4 className={styles.convictionsTitle}>Your convictions</h4>
              </div>

              {convictions.length > 0 && (
                <div className={styles.convictionsList}>
                  {convictions.map((conviction, index) => (
                    <div key={index} className={styles.convictionCard}>
                      <div className={styles.convictionInfo}>
                        <p className={styles.convictionDetail}>
                          <span className={styles.convictionLabel}>Date:</span> {conviction.day}/{conviction.month}/{conviction.year}
                        </p>
                        <p className={styles.convictionDetail}>
                          <span className={styles.convictionLabel}>Type:</span> {conviction.convictionType}
                        </p>
                        <p className={styles.convictionDetail}>
                          <span className={styles.convictionLabel}>Location:</span> {conviction.location}
                        </p>
                      </div>
                      <div className={styles.convictionActions}>
                        <button
                          type="button"
                          className={styles.removeConvictionBtn}
                          onClick={() => handleRemoveConviction(index)}
                        >
                          Remove conviction
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2ClaimsAndConvictionsHidden;
