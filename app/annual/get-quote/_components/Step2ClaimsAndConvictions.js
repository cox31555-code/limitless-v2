"use client";
import React, { useState } from "react";
import styles from "./step2ClaimsAndConvictions.module.css";

const Step2ClaimsAndConvictions = ({ form, claims = [], onAddClaim = () => {} }) => {
  const { register, formState: { errors }, watch } = form;
  const [expandedClaimsWhatIf, setExpandedClaimsWhatIf] = useState(false);
  const [expandedConvictionsHow, setExpandedConvictionsHow] = useState(false);

  const motorAccidentsClaims = watch("carUsage.motorAccidentsClaims");
  const drivingConvictions = watch("carUsage.drivingConvictions");

  const handleRemoveClaim = (index) => {
    const updatedClaims = claims.filter((_, i) => i !== index);
    // Update claims in parent
    // For now, we'll just use the onAddClaim context
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - Claims and convictions</h2>
      </div>

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

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedClaimsWhatIf(!expandedClaimsWhatIf)}
          >
            What if I wasn't involved?
          </button>

          {expandedClaimsWhatIf && (
            <div className={styles.expandableContent}>
              You should still declare any accidents or claims, even if you weren't directly involved or if you believe you weren't at fault. This includes any incidents reported to your insurer or other parties. It helps us assess your insurance accurately.
            </div>
          )}

          {motorAccidentsClaims === "Yes" && (
            <div className={styles.claimsSection}>
              <div className={styles.claimsHeader}>
                <h4 className={styles.claimsTitle}>Your claims</h4>
                <button
                  type="button"
                  className={styles.addClaimBtn}
                  onClick={() => onAddClaim()}
                >
                  Add claim
                </button>
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
                        <button
                          type="button"
                          className={styles.changeBtn}
                          onClick={() => onAddClaim(index)}
                        >
                          Change claim
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

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedConvictionsHow(!expandedConvictionsHow)}
          >
            How can I find out?
          </button>

          {expandedConvictionsHow && (
            <div className={styles.expandableContent}>
              You can check the DVLA website or request a driving record from your local police force. Convictions and driving-related endorsements are recorded on your driving licence and will show any points or bans. You can also check via the DVLA's online service.
            </div>
          )}

          {drivingConvictions === "Yes" && (
            <div className={styles.convictionsSection}>
              <div className={styles.convictionsHeader}>
                <h4 className={styles.convictionsTitle}>Your convictions</h4>
                <button type="button" className={styles.addConvictionBtn}>
                  Add conviction
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2ClaimsAndConvictions;
