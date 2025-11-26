"use client";
import React, { useState, useEffect } from "react";
import styles from "./step3AddDriverConviction.module.css";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";

const Step3AddDriverConviction = ({ onBack, onAddConviction, editingConviction = null }) => {
  const [formData, setFormData] = useState({
    location: "",
    convictionType: "",
    convictionReason: "",
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

  const convictionReasonMap = {
    "SP - Speed Limits": [
      "SP10 – Exceeding goods vehicle speed limits",
      "SP12 – Aiding and abetting SP10",
      "SP14 – Causing or permitting SP10",
      "SP16 – Inciting SP10",
      "SP20 – Exceeding speed limit for type of vehicle",
      "SP22 – Aiding and abetting SP20",
      "SP24 – Causing or permitting SP20",
      "SP26 – Inciting SP20",
      "SP30 – Exceeding statutory speed limit on a public road",
      "SP32 – Aiding and abetting SP30",
      "SP34 – Causing or permitting SP30",
      "SP36 – Inciting SP30",
      "SP40 – Exceeding passenger vehicle speed limit",
      "SP42 – Aiding and abetting SP40",
      "SP44 – Causing or permitting SP40",
      "SP46 – Inciting SP40",
      "SP50 – Exceeding speed limit on a motorway",
      "SP52 – Aiding and abetting SP50",
      "SP54 – Causing or permitting SP50",
      "SP56 – Inciting SP50",
    ],
    "CU - Construction & Uses Offences": [
      "CU10 – Using a vehicle with defective brakes",
      "CU20 – Causing/Permitting defective brakes",
      "CU30 – Using a vehicle with defective tyres",
      "CU40 – Using a vehicle with defective steering",
      "CU50 – Causing/Permitting vehicle with unsafe load",
      "CU80 – Using a hand-held mobile phone while driving",
    ],
    "TS - Traffic Direction & Signs": [
      "TS10 – Failing to comply with traffic light signals",
      "TS20 – Failing to comply with stop sign",
      "TS30 – Failing to comply with 'give way' sign",
      "TS40 – Failing to comply with direction of traffic officer",
      "TS50 – Failing to comply with traffic sign",
      "TS60 – Failing to comply with school crossing patrol",
      "TS70 – Undefined failure to obey traffic direction sign",
    ],
    "DR - Drink": [
      "DR10 – Driving with alcohol level above limit",
      "DR20 – Driving while unfit through drink",
      "DR30 – Failing to provide specimen for analysis",
      "DR40 – In charge of vehicle while alcohol level above limit",
      "DR50 – In charge while unfit through drink",
      "DR60 – Failing to provide specimen (in charge)",
      "DR70 – Failing to provide specimen (other)",
    ],
    "DG - Drugs": [
      "DG10 – Driving with drug level above limit",
      "DG20 – Driving while unfit through drugs",
      "DG30 – Failing to provide a specimen",
      "DG40 – In charge with drug level above limit",
      "DG50 – In charge while unfit through drugs",
    ],
    "IN - Insurance Offences": [
      "IN10 – Using a vehicle uninsured against third-party risks",
      "IN12 – Aiding/Permitting uninsured use",
    ],
    "LC - Licence Offences": [
      "LC20 – Driving otherwise than in accordance with a licence",
      "LC30 – Driving after making a false declaration about fitness",
      "LC40 – Driving after failing to notify disability",
      "LC50 – Driving after licence has been revoked/refused",
    ],
    "CD - Careless Driving": [
      "CD10 – Driving without due care and attention",
      "CD20 – Driving without reasonable consideration",
      "CD30 – Driving without due care AND reasonable consideration",
      "CD40 – Causing death through careless driving when unfit",
      "CD50 – Causing death by careless driving under influence",
      "CD60 – Causing death by careless driving (road rage etc.)",
      "CD70 – Causing death by careless driving while unlicensed/uninsured/unlawfully on road",
    ],
    "MS - Miscellaneous Offences": [
      "MS10 – Leaving vehicle in dangerous position",
      "MS20 – Unlawful pillion carrying",
      "MS30 – Play street offences",
      "MS40 – Driving with uncorrected defective eyesight",
      "MS50 – Motor racing on highway",
      "MS60 – Offences not covered by other codes",
      "MS70 – Driving with unfit or defective tyres",
      "MS80 – Refusing to submit to an eyesight test",
      "MS90 – Failure to give information regarding driver identity",
    ],
    "PC - Pedestrian Crossings": [
      "PC10 – Failing to stop at pedestrian crossing",
      "PC20 – Failing to give precedence at pedestrian crossing",
      "PC30 – Overtaking at/near pedestrian crossing",
    ],
    "TT - Special Code": [
      "TT99 – Disqualified under 'totting-up' (12+ points)",
    ],
    "AC - Accident Offences": [
      "AC10 – Failing to stop after an accident",
      "AC20 – Failing to give particulars after an accident",
      "AC30 – Undefined accident offence",
    ],
    "DD - Reckless & Dangerous Driving": [
      "DD10 – Driving dangerously",
      "DD20 – Attempting to drive dangerously",
      "DD40 – Dangerous driving",
      "DD60 – Manslaughter or culpable homicide while driving",
      "DD80 – Causing death by dangerous driving",
    ],
    "MW - Motorway Offences": [
      "MW10 – Contravention of special road regulations",
    ],
    "BA - Disqualified Driver": [
      "BA10 – Driving while disqualified by court",
      "BA30 – Attempting to drive while disqualified",
    ],
    "UT - Theft or Unauthorised Taking": [
      "UT20 – Taking a motor vehicle without consent",
      "UT30 – Going equipped for stealing/taking a vehicle",
      "UT50 – Aggravated vehicle taking",
    ],
    "MR - Mutual Recognition": [
      "MR09 – Disqualification from another jurisdiction",
      "MR19 – Other recognition offences",
    ],
    "ZO - Other Offences": [
      "Generic category for offences without a specific DVLA code",
    ],
  };

  useEffect(() => {
    if (editingConviction) {
      setFormData(editingConviction);
    }
  }, [editingConviction]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Please select a location";
    if (!formData.convictionType) newErrors.convictionType = "Please select conviction type";
    if (!formData.convictionReason) newErrors.convictionReason = "Please select what the conviction was for";
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
          <h3 className={styles.questionTitle}>Where did they get this conviction?</h3>
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
            setSelected={(value) => setFormData({ ...formData, convictionType: value, convictionReason: "" })}
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
              Check their driving licence, court documents, or contact the DVLA for this information. Convictions and driving-related endorsements are recorded on the driving licence.
            </div>
          )}
          {errors.convictionType && <span className={styles.error}>{errors.convictionType}</span>}

          {/* Conditional: Conviction Reason */}
          {formData.convictionType && (
            <div className={styles.conditionalSection}>
              <h3 className={styles.questionTitle}>What was the conviction for?</h3>
              <Dropdown
                label=""
                selected={formData.convictionReason}
                options={convictionReasonMap[formData.convictionType] || []}
                setSelected={(value) => setFormData({ ...formData, convictionReason: value })}
                placeholder="Please select..."
                error={errors.convictionReason}
              />
              {errors.convictionReason && <span className={styles.error}>{errors.convictionReason}</span>}
            </div>
          )}
        </div>

        {/* Date of Conviction */}
        <div className={styles.section}>
          <h3 className={styles.questionTitle}>When did they receive the conviction?</h3>
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
              Check their driving licence, court documents, or contact the DVLA for the exact date of the conviction.
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
              <h3 className={styles.questionTitle}>How many points did they receive for this conviction?</h3>
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
              <h3 className={styles.questionTitle}>How much were they fined for this conviction?</h3>
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
              <h3 className={styles.questionTitle}>How many months were they banned from driving for this conviction?</h3>
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

export default Step3AddDriverConviction;
