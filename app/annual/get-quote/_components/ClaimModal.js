"use client";
import React, { useState, useEffect } from "react";
import styles from "./claimModal.module.css";
import FormDropdown from "@/ui/inputs/FormDropdown";

const damageTypeOptions = [
  "Windscreen damage",
  "Minor damage",
  "Moderate damage",
  "Severe damage",
  "Total loss",
];

const ClaimModal = ({ isOpen, onClose, onAdd, editingClaim = null, editingIndex = null }) => {
  const [formData, setFormData] = useState({
    incidentType: "",
    day: "",
    month: "",
    year: "",
    damageType: "",
    mainPolicyholder: "",
    ncdAffected: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingClaim) {
      setFormData(editingClaim);
    } else {
      setFormData({
        incidentType: "",
        day: "",
        month: "",
        year: "",
        damageType: "",
        mainPolicyholder: "",
        ncdAffected: "",
      });
    }
    setErrors({});
  }, [isOpen, editingClaim]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEscape = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.incidentType) newErrors.incidentType = "Incident type is required";
    if (!formData.day) newErrors.day = "Day is required";
    if (!formData.month) newErrors.month = "Month is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.damageType) newErrors.damageType = "Damage type is required";
    if (!formData.mainPolicyholder) newErrors.mainPolicyholder = "Please select if claim was against your policy";
    if (!formData.ncdAffected) newErrors.ncdAffected = "Please select if NCD was affected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (editingIndex !== null) {
        onAdd(formData, editingIndex);
      } else {
        onAdd(formData);
      }
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{editingIndex !== null ? "Edit claim" : "Add a claim"}</h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className={styles.scrollContent}>
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
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.backBtn} onClick={onClose}>
              Back
            </button>
            <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
              {editingIndex !== null ? "Update claim" : "Add claim"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;
