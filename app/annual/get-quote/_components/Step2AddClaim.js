"use client";
import React, { useState, useEffect } from "react";
import styles from "./step2AddClaim.module.css";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import ExpandableQuestion from "@/ui/getQuote/ExpandableQuestion/ExpandableQuestion";
import StepContainer from "@/ui/getQuote/StepContainer/StepContainer";
import sharedStyles from "@/ui/getQuote/shared.module.css";
import QuoteNavButtons from "./QuoteNavButtons";

const Step2AddClaim = ({ onBack, onAddClaim, editingClaim = null }) => {
  const [formData, setFormData] = useState({
    incidentType: "",
    day: "",
    month: "",
    year: "",
    damageType: "",
    mainPolicyholder: "",
    ncdAffected: "",
    whoAtFault: "",
    whoWasDriving: "",
    wereThereInjuries: "",
    theftType: "",
  });

  const [errors, setErrors] = useState({});

  const damageTypeDropdownOptions = [
    "Damaged - Amount Known",
    "No Damage",
    "Unknown",
    "Write-Off",
  ];

  const faultOptions = ["Both parties", "No other vehicle involved", "Other party", "Our Driver", "Unoccupied Vehicle"];
  const drivingOptions = ["Policyholder", "Spouse/partner", "Other named driver", "Unnamed driver"];
  const injuryOptions = ["Yes", "No"];
  const theftTypeOptions = ["Theft - Accessories", "Theft - Personal Effects", "Theft - Sound Equipment", "Theft Of Vehicle", "Theft Related Damage"];

  useEffect(() => {
    if (editingClaim) {
      setFormData(editingClaim);
    }
  }, [editingClaim]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.incidentType) newErrors.incidentType = "Please select an incident type";
    if (!formData.day || !formData.month || !formData.year) newErrors.date = "Please enter a valid date";
    if (!formData.damageType) newErrors.damageType = "Please select damage type";
    if (!formData.mainPolicyholder) newErrors.mainPolicyholder = "Please answer this question";
    if (!formData.ncdAffected) newErrors.ncdAffected = "Please answer this question";
    
    if (formData.incidentType === "Accident") {
      if (!formData.whoAtFault) newErrors.whoAtFault = "Please select who was at fault";
      if (!formData.whoWasDriving) newErrors.whoWasDriving = "Please select who was driving";
      if (!formData.wereThereInjuries) newErrors.wereThereInjuries = "Please answer this question";
    }

    if (formData.incidentType === "Theft") {
      if (!formData.theftType) newErrors.theftType = "Please select type of theft";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onAddClaim(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <StepContainer title="Add a claim">
        <div className={sharedStyles.stepSection}>
          <div className={sharedStyles.questionHeader}>
            <h3 className={sharedStyles.mainQuestion}>What type of incident was it?</h3>
          </div>
          <div className={styles.radioGroup}>
            {["Accident", "Theft", "Other"].map((type) => (
              <label key={type} className={styles.radioOption}>
                <input
                  type="radio"
                  name="incidentType"
                  value={type}
                  checked={formData.incidentType === type}
                  onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                  className={styles.radioInput}
                />
                <div className={styles.radioContent}>
                  <span className={styles.radioLabel}>{type}</span>
                  {type === "Accident" && (
                    <span className={styles.radioDescription}>This can include incidents where you weren't in the vehicle at the time</span>
                  )}
                  {type === "Theft" && (
                    <span className={styles.radioDescription}>Theft or attempted theft of items within your vehicle or of the actual vehicle itself</span>
                  )}
                  {type === "Other" && (
                    <span className={styles.radioDescription}>Claims for incidents such as storm damage or windscreen claims</span>
                  )}
                </div>
              </label>
            ))}
          </div>
          {errors.incidentType && <span className={styles.error}>{errors.incidentType}</span>}

          {formData.incidentType === "Accident" && (
            <>
              <div className={sharedStyles.stepSection} style={{ marginTop: '2rem', paddingTop: 0, borderTop: 'none' }}>
                <h3 className={sharedStyles.mainQuestion}>Who was at fault?</h3>
                <Dropdown
                  label=""
                  selected={formData.whoAtFault}
                  options={faultOptions}
                  setSelected={(value) => setFormData({ ...formData, whoAtFault: value })}
                  placeholder="Please select..."
                  error={errors.whoAtFault}
                />
                <ExpandableQuestion
                  question="How can I tell who was at fault?"
                  answer="You're considered 'at fault' if you were held liable for this claim. If your claim is unsettled, please declare that you were at fault."
                />
                {errors.whoAtFault && <span className={styles.error}>{errors.whoAtFault}</span>}
              </div>

              <div className={sharedStyles.stepSection} style={{ marginTop: '2rem', paddingTop: 0, borderTop: 'none' }}>
                <h3 className={sharedStyles.mainQuestion}>Who was driving?</h3>
                <Dropdown
                  label=""
                  selected={formData.whoWasDriving}
                  options={drivingOptions}
                  setSelected={(value) => setFormData({ ...formData, whoWasDriving: value })}
                  placeholder="Please select..."
                  error={errors.whoWasDriving}
                />
                <ExpandableQuestion
                  question="What if nobody was in the car?"
                  answer="If the car was unoccupied, then it's the person who was responsible for it at this point."
                />
                {errors.whoWasDriving && <span className={styles.error}>{errors.whoWasDriving}</span>}
              </div>

              <div className={sharedStyles.stepSection} style={{ marginTop: '2rem', paddingTop: 0, borderTop: 'none' }}>
                <h3 className={sharedStyles.mainQuestion}>Were there any injuries?</h3>
                <div className={styles.radioGroup}>
                  {injuryOptions.map((option) => (
                    <label key={option} className={styles.radioOption}>
                      <input
                        type="radio"
                        name="wereThereInjuries"
                        value={option}
                        checked={formData.wereThereInjuries === option}
                        onChange={(e) => setFormData({ ...formData, wereThereInjuries: e.target.value })}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioLabel}>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.wereThereInjuries && <span className={styles.error}>{errors.wereThereInjuries}</span>}
              </div>
            </>
          )}

          {formData.incidentType === "Theft" && (
            <div className={sharedStyles.stepSection} style={{ marginTop: '2rem', paddingTop: 0, borderTop: 'none' }}>
              <h3 className={sharedStyles.mainQuestion}>What type of theft was it?</h3>
              <Dropdown
                label=""
                selected={formData.theftType}
                options={theftTypeOptions}
                setSelected={(value) => setFormData({ ...formData, theftType: value })}
                placeholder="Please select..."
                error={errors.theftType}
              />
              {errors.theftType && <span className={styles.error}>{errors.theftType}</span>}
            </div>
          )}
        </div>

        <div className={sharedStyles.stepSection}>
          <div className={sharedStyles.questionHeader}>
            <h3 className={sharedStyles.mainQuestion}>When did the incident happen?</h3>
            <p className={sharedStyles.subText}>If you're unsure, you can check with the insurance provider you were with at the time. You can request info about your previous insurance providers within the last 7 years by visiting <a href="http://www.mib.org.uk" target="_blank" rel="noopener noreferrer" className={styles.link}>www.mib.org.uk</a>.</p>
          </div>
          <div className={styles.dateInputsWrapper}>
            <div className={styles.dateInputGroup}>
              <label className={styles.inputLabel}>Day</label>
              <CustomTextInput
                type="text"
                placeholder="DD"
                maxLength={2}
                value={formData.day}
                onChange={(e) => {
                  let day = e.target.value.replace(/[^0-9]/g, "");
                  if (day.length > 2) {
                    day = day.slice(0, 2);
                  }
                  if (day && (parseInt(day) < 1 || parseInt(day) > 31)) {
                    return;
                  }
                  setFormData({ ...formData, day });
                }}
              />
            </div>

            <div className={styles.dateInputGroup}>
              <label className={styles.inputLabel}>Month</label>
              <CustomTextInput
                type="text"
                placeholder="MM"
                maxLength={2}
                value={formData.month}
                onChange={(e) => {
                  let month = e.target.value.replace(/[^0-9]/g, "");
                  if (month.length > 2) {
                    month = month.slice(0, 2);
                  }
                  if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
                    return;
                  }
                  setFormData({ ...formData, month });
                }}
              />
            </div>

            <div className={styles.dateInputGroup}>
              <label className={styles.inputLabel}>Year</label>
              <CustomTextInput
                type="text"
                placeholder="YYYY"
                maxLength={4}
                value={formData.year}
                onChange={(e) => {
                  let year = e.target.value.replace(/[^0-9]/g, "");
                  if (year.length > 4) {
                    year = year.slice(0, 4);
                  }
                  setFormData({ ...formData, year });
                }}
              />
            </div>
          </div>
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>

        <div className={sharedStyles.stepSection}>
          <h3 className={sharedStyles.mainQuestion}>What type of damage was suffered?</h3>
          <Dropdown
            label=""
            selected={formData.damageType}
            options={damageTypeDropdownOptions}
            setSelected={(value) => setFormData({ ...formData, damageType: value })}
            placeholder="Please select..."
            error={errors.damageType}
          />
          {errors.damageType && <span className={styles.error}>{errors.damageType}</span>}
        </div>

        <div className={sharedStyles.stepSection}>
          <h3 className={sharedStyles.mainQuestion}>Was the claim made against your insurance policy?</h3>
          <p className={sharedStyles.subText}>We want to know if you were the main policyholder when the claim was made.</p>
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="mainPolicyholder"
                  value={option}
                  checked={formData.mainPolicyholder === option}
                  onChange={(e) => setFormData({ ...formData, mainPolicyholder: e.target.value })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.mainPolicyholder && <span className={styles.error}>{errors.mainPolicyholder}</span>}
        </div>

        <div className={sharedStyles.stepSection}>
          <h3 className={sharedStyles.mainQuestion}>Was the no claims discount affected?</h3>
          <p className={sharedStyles.subText}>No Claims Discount (NCD) is sometimes referred to as No Claims Bonus.</p>
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="ncdAffected"
                  value={option}
                  checked={formData.ncdAffected === option}
                  onChange={(e) => setFormData({ ...formData, ncdAffected: e.target.value })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.ncdAffected && <span className={styles.error}>{errors.ncdAffected}</span>}
        </div>
      </StepContainer>

      <QuoteNavButtons
        onBack={onBack}
        onNext={() => {
          const newErrors = validateForm();
          if (Object.keys(newErrors).length === 0) {
            onAddClaim(formData);
          } else {
            setErrors(newErrors);
          }
        }}
        backLabel="Back"
        nextLabel="Save Claim"
        currentStep={2}
        totalSteps={4}
      />
    </div>
  );
};

export default Step2AddClaim;
