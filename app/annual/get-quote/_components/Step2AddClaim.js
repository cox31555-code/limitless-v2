"use client";
import React, { useState, useEffect } from "react";
import styles from "./step2AddClaim.module.css";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";

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
  });

  const [errors, setErrors] = useState({});

  const damageTypeDropdownOptions = [
    "Windscreen damage",
    "Fire/Theft/Vandalism",
    "Accident - comprehensive",
    "Accident - part loss",
    "Glass only",
    "Water damage",
    "Attempted theft",
  ];

  const faultOptions = ["You were at fault", "The other party was at fault", "Can't say who was at fault"];
  const drivingOptions = ["Policyholder", "Spouse/partner", "Other named driver", "Unnamed driver"];
  const injuryOptions = ["Yes", "No"];

  const damageTypeOptions = [
    "Windscreen damage",
    "Fire/Theft/Vandalism",
    "Accident - comprehensive",
    "Accident - part loss",
    "Glass only",
    "Water damage",
    "Attempted theft",
  ];

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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onAddClaim(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Add a claim</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Incident Type */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What type of incident was it?</h3>
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
          </div>

          {/* Date of Incident */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>When did the incident happen?</h3>
            <p className={styles.sectionDescription}>If you're unsure, you can check with the insurance provider you were with at the time. You can request info about your previous insurance providers within the last 7 years by visiting <a href="http://www.mib.org.uk" target="_blank" rel="noopener noreferrer" className={styles.link}>www.mib.org.uk</a>.</p>
            <div className={styles.dateInputsWrapper}>
              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Day</label>
                <input
                  type="text"
                  placeholder="DD"
                  maxLength={2}
                  value={formData.day}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setFormData({ ...formData, day: val });
                  }}
                  className={styles.textInput}
                />
                {errors.day && <span className={styles.error}>{errors.day}</span>}
              </div>

              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Month</label>
                <input
                  type="text"
                  placeholder="MM"
                  maxLength={2}
                  value={formData.month}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setFormData({ ...formData, month: val });
                  }}
                  className={styles.textInput}
                />
                {errors.month && <span className={styles.error}>{errors.month}</span>}
              </div>

              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Year</label>
                <input
                  type="text"
                  placeholder="YYYY"
                  maxLength={4}
                  value={formData.year}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setFormData({ ...formData, year: val });
                  }}
                  className={styles.textInput}
                />
                {errors.year && <span className={styles.error}>{errors.year}</span>}
              </div>
            </div>
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </div>

          {/* Damage Type */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What type of damage was suffered?</h3>
            <select
              value={formData.damageType}
              onChange={(e) => setFormData({ ...formData, damageType: e.target.value })}
              className={styles.selectInput}
            >
              <option value="">Please select...</option>
              {damageTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.damageType && <span className={styles.error}>{errors.damageType}</span>}
          </div>

          {/* Main Policyholder */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Was the claim made against your insurance policy?</h3>
            <p className={styles.sectionDescription}>We want to know if you were the main policyholder when the claim was made.</p>
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

          {/* NCD Affected */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Was the no claims discount affected?</h3>
            <p className={styles.sectionDescription}>No Claims Discount (NCD) is sometimes referred to as No Claims Bonus.</p>
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

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            Back
          </button>
          <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
            {editingClaim ? "Update claim" : "Add claim"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2AddClaim;
