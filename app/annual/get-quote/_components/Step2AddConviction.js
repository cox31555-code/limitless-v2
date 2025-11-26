"use client";
import React, { useState, useEffect } from "react";
import styles from "./step2AddConviction.module.css";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";

const Step2AddConviction = ({ onBack, onAddConviction, editingConviction = null }) => {
  const [formData, setFormData] = useState({
    location: "",
    convictionType: "",
    day: "",
    month: "",
    year: "",
    penaltyPoints: "",
    penaltyPointsAmount: "",
    resultedInFine: "",
    fineAmount: "",
    resultedInBan: "",
    banMonths: "",
  });

  const [errors, setErrors] = useState({});
  const [expandedConvictionType, setExpandedConvictionType] = useState(false);
  const [expandedExactDate, setExpandedExactDate] = useState(false);

  const locationOptions = ["England, Scotland or Wales (Great Britain)", "Northern Ireland"];
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
    "ZO - Other Offences",
  ];

  useEffect(() => {
    if (editingConviction) {
      setFormData(editingConviction);
    }
  }, [editingConviction]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Please select a location";
    if (!formData.convictionType) newErrors.convictionType = "Please select conviction type";
    if (!formData.day || !formData.month || !formData.year) newErrors.date = "Please enter a valid date";
    if (!formData.penaltyPoints) newErrors.penaltyPoints = "Please answer this question";
    if (!formData.resultedInFine) newErrors.resultedInFine = "Please answer this question";
    if (!formData.resultedInBan) newErrors.resultedInBan = "Please answer this question";

    // Conditional validation for penalty points
    if (formData.penaltyPoints === "Yes") {
      if (!formData.penaltyPointsAmount) newErrors.penaltyPointsAmount = "Please enter penalty points";
      if (formData.penaltyPointsAmount && (parseInt(formData.penaltyPointsAmount) < 1 || parseInt(formData.penaltyPointsAmount) > 11)) {
        newErrors.penaltyPointsAmount = "Penalty points must be between 1 and 11";
      }
    }

    // Conditional validation for fine
    if (formData.resultedInFine === "Yes") {
      if (!formData.fineAmount) newErrors.fineAmount = "Please enter fine amount";
    }

    // Conditional validation for driving ban
    if (formData.resultedInBan === "Yes") {
      if (!formData.banMonths) newErrors.banMonths = "Please enter ban duration";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onAddConviction(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Add a conviction</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Location */}
        <div className={styles.section}>
          <h3 className={styles.questionTitle}>Where did you get this conviction?</h3>
          <div className={styles.radioGroup}>
            {locationOptions.map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="location"
                  value={option}
                  checked={formData.location === option}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.location && <span className={styles.error}>{errors.location}</span>}
        </div>

        {/* Conviction Type */}
        <div className={styles.section}>
          <h3 className={styles.questionTitle}>What was the conviction type?</h3>
          <Dropdown
            label=""
            selected={formData.convictionType}
            options={convictionTypeOptions}
            setSelected={(value) => setFormData({ ...formData, convictionType: value })}
            placeholder="Please select..."
            error={errors.convictionType}
          />
          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedConvictionType(!expandedConvictionType)}
          >
            <span className={`${styles.expandableIcon} ${expandedConvictionType ? styles.expandedIcon : ''}`}>▶</span>
            How can I find out?
          </button>
          {expandedConvictionType && (
            <div className={styles.expandableContent}>
              You can check the DVLA website or request a driving record from your local police force. Convictions and driving-related endorsements are recorded on your driving licence.
            </div>
          )}
          {errors.convictionType && <span className={styles.error}>{errors.convictionType}</span>}
        </div>

        {/* Date of Conviction */}
        <div className={styles.section}>
          <h3 className={styles.questionTitle}>When did you receive the conviction?</h3>
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
          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedExactDate(!expandedExactDate)}
          >
            <span className={`${styles.expandableIcon} ${expandedExactDate ? styles.expandedIcon : ''}`}>▶</span>
            How can I find out the exact date?
          </button>
          {expandedExactDate && (
            <div className={styles.expandableContent}>
              Check your driving licence, court documents, or contact the DVLA for the exact date of your conviction.
            </div>
          )}
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>

        {/* Penalty Points */}
        <div className={styles.section}>
          <h3 className={styles.questionTitle}>Were penalty points given for this conviction?</h3>
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="penaltyPoints"
                  value={option}
                  checked={formData.penaltyPoints === option}
                  onChange={(e) => setFormData({ ...formData, penaltyPoints: e.target.value, penaltyPointsAmount: "" })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.penaltyPoints && <span className={styles.error}>{errors.penaltyPoints}</span>}

          {/* Conditional: Penalty Points Amount */}
          {formData.penaltyPoints === "Yes" && (
            <div className={styles.conditionalSection}>
              <h3 className={styles.questionTitle}>How many points did you receive for this conviction?</h3>
              <p className={styles.sectionDescription}>It'll be between 1 and 11.</p>
              <CustomTextInput
                type="text"
                placeholder="Enter number of points"
                maxLength={2}
                value={formData.penaltyPointsAmount}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length > 2) {
                    value = value.slice(0, 2);
                  }
                  setFormData({ ...formData, penaltyPointsAmount: value });
                }}
              />
              {errors.penaltyPointsAmount && <span className={styles.error}>{errors.penaltyPointsAmount}</span>}
            </div>
          )}
        </div>

        {/* Fine */}
        <div className={styles.section}>
          <h3 className={styles.questionTitle}>Did the conviction result in a fine?</h3>
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="resultedInFine"
                  value={option}
                  checked={formData.resultedInFine === option}
                  onChange={(e) => setFormData({ ...formData, resultedInFine: e.target.value, fineAmount: "" })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.resultedInFine && <span className={styles.error}>{errors.resultedInFine}</span>}

          {/* Conditional: Fine Amount */}
          {formData.resultedInFine === "Yes" && (
            <div className={styles.conditionalSection}>
              <h3 className={styles.questionTitle}>How much were you fined for this conviction?</h3>
              <CustomTextInput
                type="text"
                placeholder="Enter amount"
                value={formData.fineAmount}
                onChange={(e) => setFormData({ ...formData, fineAmount: e.target.value })}
                prefix="£"
              />
              {errors.fineAmount && <span className={styles.error}>{errors.fineAmount}</span>}
            </div>
          )}
        </div>

        {/* Driving Ban */}
        <div className={styles.section}>
          <h3 className={styles.questionTitle}>Did the conviction result in a driving ban?</h3>
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="resultedInBan"
                  value={option}
                  checked={formData.resultedInBan === option}
                  onChange={(e) => setFormData({ ...formData, resultedInBan: e.target.value, banMonths: "" })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.resultedInBan && <span className={styles.error}>{errors.resultedInBan}</span>}

          {/* Conditional: Ban Duration */}
          {formData.resultedInBan === "Yes" && (
            <div className={styles.conditionalSection}>
              <h3 className={styles.questionTitle}>How many months were you banned from driving for this conviction?</h3>
              <p className={styles.sectionDescription}>Enter the length of the ban to the nearest month. So for 5 weeks you would enter 1 month.</p>
              <CustomTextInput
                type="text"
                placeholder="Enter number of months"
                value={formData.banMonths}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");
                  setFormData({ ...formData, banMonths: value });
                }}
              />
              {errors.banMonths && <span className={styles.error}>{errors.banMonths}</span>}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            Back
          </button>
          <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
            {editingConviction ? "Update conviction" : "Add conviction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2AddConviction;
