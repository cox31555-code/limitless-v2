"use client";
import React, { useState } from "react";
import styles from "./step3DriverClaimsAndConvictions.module.css";

const Step3DriverClaimsAndConvictions = ({ driverData, onBack, onAddDriver, onAddClaim, onAddConviction, editingClaimIndex, editingConvictionIndex }) => {
  const [formData, setFormData] = useState({
    motorAccidentsClaims: "",
    drivingConvictions: "",
  });

  const [claims, setClaims] = useState([]);
  const [convictions, setConvictions] = useState([]);
  const [errors, setErrors] = useState({});
  const [expandedClaimsWhatIf, setExpandedClaimsWhatIf] = useState(false);
  const [expandedConvictionsHow, setExpandedConvictionsHow] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.motorAccidentsClaims) {
      newErrors.motorAccidentsClaims = "Please answer this question";
    }
    if (!formData.drivingConvictions) {
      newErrors.drivingConvictions = "Please answer this question";
    }
    return newErrors;
  };

  const handleAddClaimClick = () => {
    if (onAddClaim) {
      onAddClaim();
    }
  };

  const handleAddConvictionClick = () => {
    if (onAddConviction) {
      onAddConviction();
    }
  };

  const handleRemoveClaim = (index) => {
    setClaims(claims.filter((_, i) => i !== index));
  };

  const handleRemoveConviction = (index) => {
    setConvictions(convictions.filter((_, i) => i !== index));
  };

  const handleChangeClaim = (index) => {
    if (onAddClaim) {
      onAddClaim(index);
    }
  };

  const handleChangeConviction = (index) => {
    if (onAddConviction) {
      onAddConviction(index);
    }
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const completeDriverData = {
        ...driverData,
        ...formData,
        claims,
        convictions,
      };
      onAddDriver(completeDriverData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Additional drivers - Claims and convictions</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Motor Accidents and Claims Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Have they had any motor accidents, claims or losses in the past 5 years, no matter who was at fault or if a claim was made?</h3>
            <p className={styles.subText}>
              We need to know about any claims (including unsettled claims), accidents, or losses involving any car, van, motorbike, or other vehicle.
            </p>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="motorAccidentsClaims"
                value="Yes"
                checked={formData.motorAccidentsClaims === "Yes"}
                onChange={(e) => setFormData({ ...formData, motorAccidentsClaims: e.target.value })}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                name="motorAccidentsClaims"
                value="No"
                checked={formData.motorAccidentsClaims === "No"}
                onChange={(e) => setFormData({ ...formData, motorAccidentsClaims: e.target.value })}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>

          {errors.motorAccidentsClaims && <span className={styles.error}>{errors.motorAccidentsClaims}</span>}

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedClaimsWhatIf(!expandedClaimsWhatIf)}
          >
            <span className={`${styles.expandableIcon} ${expandedClaimsWhatIf ? styles.expandedIcon : ''}`}>▶</span>
            What if they weren't involved?
          </button>

          {expandedClaimsWhatIf && (
            <div className={styles.expandableContent}>
              You should still declare any accidents or claims, even if they weren't directly involved or if you believe they weren't at fault. This includes any incidents reported to an insurer or other parties. It helps us assess your insurance accurately.
            </div>
          )}

          {formData.motorAccidentsClaims === "Yes" && (
            <div className={styles.claimsSection}>
              <div className={styles.claimsHeader}>
                <h4 className={styles.claimsTitle}>Their claims</h4>
                <button
                  type="button"
                  className={styles.addClaimBtn}
                  onClick={handleAddClaimClick}
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
                          onClick={() => handleChangeClaim(index)}
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
            <h3 className={styles.mainQuestion}>Have they had any driving related convictions, endorsements, penalties, disqualifications or bans in the past 5 years?</h3>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="drivingConvictions"
                value="Yes"
                checked={formData.drivingConvictions === "Yes"}
                onChange={(e) => setFormData({ ...formData, drivingConvictions: e.target.value })}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                name="drivingConvictions"
                value="No"
                checked={formData.drivingConvictions === "No"}
                onChange={(e) => setFormData({ ...formData, drivingConvictions: e.target.value })}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>

          {errors.drivingConvictions && <span className={styles.error}>{errors.drivingConvictions}</span>}

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedConvictionsHow(!expandedConvictionsHow)}
          >
            <span className={`${styles.expandableIcon} ${expandedConvictionsHow ? styles.expandedIcon : ''}`}>▶</span>
            How can I find out?
          </button>

          {expandedConvictionsHow && (
            <div className={styles.expandableContent}>
              You can check the DVLA website or request a driving record from the local police force. Convictions and driving-related endorsements are recorded on the driving licence and will show any points or bans. You can also check via the DVLA's online service.
            </div>
          )}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          Back
        </button>
        <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
          Add Driver
        </button>
      </div>
    </div>
  );
};

export default Step3DriverClaimsAndConvictions;
