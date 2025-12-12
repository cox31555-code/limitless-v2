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

  const getDaysInMonth = (month, year) => {
    if (!month || !year) return 31;
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    if (monthNum === 2) {
      return (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0 ? 29 : 28;
    }
    if ([4, 6, 9, 11].includes(monthNum)) return 30;
    return 31;
  };

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

    if (!formData.day) {
      newErrors.day = "Day is required";
    } else {
      const day = parseInt(formData.day);
      if (isNaN(day) || day < 1 || day > 31) {
        newErrors.day = "Day must be between 1 and 31";
      } else if (formData.month) {
        const maxDays = getDaysInMonth(formData.month, formData.year);
        if (day > maxDays) {
          newErrors.day = `Day must be between 1 and ${maxDays} for this month`;
        }
      }
    }

    if (!formData.month) {
      newErrors.month = "Month is required";
    } else {
      const month = parseInt(formData.month);
      if (isNaN(month) || month < 1 || month > 12) {
        newErrors.month = "Month must be between 1 and 12";
      }
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    } else {
      const year = parseInt(formData.year);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1950 || year > currentYear) {
        newErrors.year = `Year must be between 1950 and ${currentYear}`;
      }
    }

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

        <div className={styles.modalForm}>
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
              <div className={styles.dateField}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="DD"
                  className={styles.dateInput}
                  value={formData.day}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setFormData({ ...formData, day: val });
                  }}
                  maxLength="2"
                />
              </div>
              <div className={styles.dateField}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  className={styles.dateInput}
                  value={formData.month}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setFormData({ ...formData, month: val });
                  }}
                  maxLength="2"
                />
              </div>
              <div className={styles.dateField}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  className={styles.dateInput}
                  value={formData.year}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setFormData({ ...formData, year: val });
                  }}
                  maxLength="4"
                />
              </div>
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
            {editingIndex !== null && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => {
                  onAdd(null, editingIndex, true);
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
                }}
              >
                Delete Conviction
              </button>
            )}
            <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
                {editingIndex !== null ? "Update Conviction" : "Add Conviction"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvictionModal;
