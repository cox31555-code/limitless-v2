"use client";
import React, { useState, useEffect } from "react";
import styles from "./convictionModal.module.css";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormTextInput from "@/ui/inputs/FormTextInput";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";

const convictionTypeOptions = [
  "SP - Speed Limits",
  "CU - Construction & Uses Offences",
  "TS - Traffic Direction & Signs",
  "DR - Drink",
  "DG - Drugs",
  "IN - Insurance Offences",
  "LC - Licence Offences",
  "CD - Careless Driving",
  "MS - Miscellaneous Offences",
  "PC - Pedestrian Crossings",
  "TT - Special Code",
  "AC - Accident Offences",
  "DD - Reckless & Dangerous Driving",
  "MW - Motorway Offences",
  "BA - Disqualified Driver",
  "UT - Theft or Unauthorised Taking",
  "MR - Mutual Recognition",
  "Z0 - Other Offences",
];

const ConvictionModal = ({ isOpen, onClose, onAdd, editingConviction = null, editingIndex = null }) => {
  const [formData, setFormData] = useState({
    location: "",
    type: "",
    day: "",
    month: "",
    year: "",
    penaltyPoints: false,
    pointsNumber: "",
    resultedInFine: false,
    fineAmount: "",
    resultedInBan: false,
    banMonths: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingConviction) {
      setFormData(editingConviction);
    } else {
      setFormData({
        location: "",
        type: "",
        day: "",
        month: "",
        year: "",
        penaltyPoints: false,
        pointsNumber: "",
        resultedInFine: false,
        fineAmount: "",
        resultedInBan: false,
        banMonths: "",
      });
    }
    setErrors({});
  }, [isOpen, editingConviction]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.type) newErrors.type = "Conviction type is required";
    if (!formData.day) newErrors.day = "Day is required";
    if (!formData.month) newErrors.month = "Month is required";
    if (!formData.year) newErrors.year = "Year is required";

    if (formData.penaltyPoints && !formData.pointsNumber) {
      newErrors.pointsNumber = "Number of points is required";
    }
    if (formData.penaltyPoints && formData.pointsNumber) {
      const points = parseInt(formData.pointsNumber);
      if (isNaN(points) || points < 1 || points > 11) {
        newErrors.pointsNumber = "Points must be between 1 and 11";
      }
    }

    if (formData.resultedInFine && !formData.fineAmount) {
      newErrors.fineAmount = "Fine amount is required";
    }
    if (formData.resultedInFine && formData.fineAmount) {
      const amount = parseFloat(formData.fineAmount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.fineAmount = "Please enter a valid amount";
      }
    }

    if (formData.resultedInBan && !formData.banMonths) {
      newErrors.banMonths = "Ban duration is required";
    }
    if (formData.resultedInBan && formData.banMonths) {
      const months = parseInt(formData.banMonths);
      if (isNaN(months) || months <= 0) {
        newErrors.banMonths = "Please enter a valid number of months";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd(formData, editingIndex);
      setFormData({
        location: "",
        type: "",
        day: "",
        month: "",
        year: "",
        penaltyPoints: false,
        pointsNumber: "",
        resultedInFine: false,
        fineAmount: "",
        resultedInBan: false,
        banMonths: "",
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{editingIndex !== null ? "Edit Driving Conviction" : "Add Driving Conviction"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formSection}>
            <label className={styles.formLabel}>Where did you get this conviction?</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="location"
                  value="GB"
                  checked={formData.location === "GB"}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                England, Scotland or Wales (Great Britain)
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="location"
                  value="NI"
                  checked={formData.location === "NI"}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                Northern Ireland
              </label>
            </div>
            {errors.location && <span className={styles.error}>{errors.location}</span>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>What was the conviction type?</label>
            <select
              className={styles.select}
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Please select...</option>
              {convictionTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.type && <span className={styles.error}>{errors.type}</span>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>When did you receive the conviction?</label>
            <div className={styles.dateInputs}>
              <input
                type="number"
                placeholder="Day"
                min="1"
                max="31"
                className={styles.dateInput}
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              />
              <input
                type="number"
                placeholder="Month"
                min="1"
                max="12"
                className={styles.dateInput}
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              />
              <input
                type="number"
                placeholder="Year"
                className={styles.dateInput}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
            </div>
            {errors.day && <span className={styles.error}>{errors.day}</span>}
            {errors.month && <span className={styles.error}>{errors.month}</span>}
            {errors.year && <span className={styles.error}>{errors.year}</span>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Were penalty points given for this conviction?</label>
            <div className={styles.yesNoGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="penaltyPoints"
                  checked={formData.penaltyPoints === true}
                  onChange={() => setFormData({ ...formData, penaltyPoints: true })}
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="penaltyPoints"
                  checked={formData.penaltyPoints === false}
                  onChange={() => setFormData({ ...formData, penaltyPoints: false, pointsNumber: "" })}
                />
                No
              </label>
            </div>
          </div>

          {formData.penaltyPoints && (
            <div className={styles.formSection}>
              <label className={styles.formLabel}>How many points did you receive for this conviction?</label>
              <p className={styles.helperText}>It'll be between 1 and 11.</p>
              <input
                type="number"
                min="1"
                max="11"
                placeholder="Enter number of points"
                className={styles.input}
                value={formData.pointsNumber}
                onChange={(e) => setFormData({ ...formData, pointsNumber: e.target.value })}
              />
              {errors.pointsNumber && <span className={styles.error}>{errors.pointsNumber}</span>}
            </div>
          )}

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Did the conviction result in a fine?</label>
            <div className={styles.yesNoGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="resultedInFine"
                  checked={formData.resultedInFine === true}
                  onChange={() => setFormData({ ...formData, resultedInFine: true })}
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="resultedInFine"
                  checked={formData.resultedInFine === false}
                  onChange={() => setFormData({ ...formData, resultedInFine: false, fineAmount: "" })}
                />
                No
              </label>
            </div>
          </div>

          {formData.resultedInFine && (
            <div className={styles.formSection}>
              <label className={styles.formLabel}>How much were you fined for this conviction?</label>
              <div className={styles.currencyInput}>
                <span className={styles.currencySymbol}>£</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={styles.input}
                  value={formData.fineAmount}
                  onChange={(e) => setFormData({ ...formData, fineAmount: e.target.value })}
                />
              </div>
              {errors.fineAmount && <span className={styles.error}>{errors.fineAmount}</span>}
            </div>
          )}

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Did the conviction result in a driving ban?</label>
            <div className={styles.yesNoGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="resultedInBan"
                  checked={formData.resultedInBan === true}
                  onChange={() => setFormData({ ...formData, resultedInBan: true })}
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="resultedInBan"
                  checked={formData.resultedInBan === false}
                  onChange={() => setFormData({ ...formData, resultedInBan: false, banMonths: "" })}
                />
                No
              </label>
            </div>
          </div>

          {formData.resultedInBan && (
            <div className={styles.formSection}>
              <label className={styles.formLabel}>How many months were you banned from driving for this conviction?</label>
              <p className={styles.helperText}>Enter the length of the ban to the nearest month. So for 5 weeks you would enter 1 month.</p>
              <input
                type="number"
                min="1"
                placeholder="Enter number of months"
                className={styles.input}
                value={formData.banMonths}
                onChange={(e) => setFormData({ ...formData, banMonths: e.target.value })}
              />
              {errors.banMonths && <span className={styles.error}>{errors.banMonths}</span>}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editingIndex !== null ? "Update Conviction" : "Add Conviction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConvictionModal;
