"use client";
import React, { useState } from "react";
import styles from "./step3CarOwner.module.css";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";

const Step3NoClaimsDiscount = ({
  onBack = () => {},
  onNext = () => {},
  ncdData = null
}) => {
  const [formData, setFormData] = useState(ncdData || {
    noClaimsDiscount: "",
    namedDriverExperience: "",
    ncdEarnedHow: "",
    namedDriverYears: ""
  });

  const [errors, setErrors] = useState({});
  const [expandedHowFindNCD, setExpandedHowFindNCD] = useState(false);
  const [expandedNamedDriver, setExpandedNamedDriver] = useState(false);
  const [expandedProof, setExpandedProof] = useState(false);

  const ncdOptions = [
    "No NCD",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
    "9 years",
    "10 years",
    "11 years",
    "12 years",
    "13 years",
    "14 years",
    "15 years",
    "16 years",
    "17 years",
    "18 years",
    "19 years",
    "20+"
  ];

  const namedDriverExperienceOptions = [
    "No",
    "Named driver on another car",
    "Named driver on company car including personal use",
    "Named driver on company car excluding personal use"
  ];

  const ncdEarnedHowOptions = [
    "With this vehicle or a previous vehicle",
    "With a company vehicle",
    "In another country"
  ];

  const namedDriverYearsOptions = [
    "0 years",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
    "9 years",
    "10 years",
    "11 years",
    "12 years",
    "13 years",
    "14 years",
    "15 years",
    "15+ years"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.noClaimsDiscount) newErrors.noClaimsDiscount = "Please select your NCD";

    // Only require named driver experience if "No NCD" is selected
    if (formData.noClaimsDiscount === "No NCD" && !formData.namedDriverExperience) {
      newErrors.namedDriverExperience = "Please answer this question";
    }

    // Require ncdEarnedHow if any year is selected
    if (formData.noClaimsDiscount && formData.noClaimsDiscount !== "No NCD" && !formData.ncdEarnedHow) {
      newErrors.ncdEarnedHow = "Please answer this question";
    }

    // Require namedDriverYears if one of the three named driver options is selected
    const requiresNamedDriverYears = [
      "Named driver on another car",
      "Named driver on company car including personal use",
      "Named driver on company car excluding personal use"
    ];
    if (requiresNamedDriverYears.includes(formData.namedDriverExperience) && !formData.namedDriverYears) {
      newErrors.namedDriverYears = "Please select how many years";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Clean up fields based on NCD selection
      let submitData = { ...formData };
      if (formData.noClaimsDiscount === "No NCD") {
        // Clear ncdEarnedHow and namedDriverYears when No NCD is selected
        submitData.ncdEarnedHow = "";
        submitData.namedDriverYears = "";
      } else {
        // Clear namedDriverExperience when a year is selected
        submitData.namedDriverExperience = "";
      }

      // Clear namedDriverYears if not one of the three named driver options
      const requiresNamedDriverYears = [
        "Named driver on another car",
        "Named driver on company car including personal use",
        "Named driver on company car excluding personal use"
      ];
      if (!requiresNamedDriverYears.includes(formData.namedDriverExperience)) {
        submitData.namedDriverYears = "";
      }

      onNext(submitData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your policy - Your no claims discount</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* No Claims Discount Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>How many years of no claims discount (NCD) do you have?</h3>
            <p className={styles.subText}>
              This should be the amount of NCD you'll have when this policy starts. Your NCD can't be used for more than one policy at a time, and can't be more than 2 years old.
            </p>
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedHowFindNCD(!expandedHowFindNCD)}
          >
            <span className={`${styles.expandableIcon} ${expandedHowFindNCD ? styles.expandedIcon : ''}`}>▼</span>
            How do I find out?
          </button>

          {expandedHowFindNCD && (
            <div className={styles.expandableContent}>
              Your no claims discount information should be on your previous insurance policy documents or renewal notice. If you're unsure, contact your previous insurer directly.
            </div>
          )}

          <div className={styles.fieldWrapper}>
            <Dropdown
              label=""
              selected={formData.noClaimsDiscount || ""}
              options={ncdOptions}
              setSelected={(value) => setFormData({ ...formData, noClaimsDiscount: value })}
              placeholder="Please select…"
            />
            {errors.noClaimsDiscount && <span className={styles.error}>{errors.noClaimsDiscount}</span>}
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedNamedDriver(!expandedNamedDriver)}
          >
            <span className={`${styles.expandableIcon} ${expandedNamedDriver ? styles.expandedIcon : ''}`}>▼</span>
            Can a named driver use their NCD on my policy?
          </button>

          {expandedNamedDriver && (
            <div className={styles.expandableContent}>
              No, only the main driver can use their NCD on the policy. Named drivers cannot transfer their own no claims discount to your policy.
            </div>
          )}
        </div>

        {/* Named Driver Experience Question - Show if No NCD */}
        {formData.noClaimsDiscount === "No NCD" && (
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Do you have any named driver experience?</h3>
              <p className={styles.subText}>
                In some cases, insurance providers may offer you a discount if you have named driver experience on another person's insurance policy.
              </p>
            </div>
            <div className={styles.radioGroup}>
              {namedDriverExperienceOptions.map((option) => (
                <label key={option} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="namedDriverExperience"
                    value={option}
                    checked={formData.namedDriverExperience === option}
                    onChange={(e) => setFormData({ ...formData, namedDriverExperience: e.target.value })}
                    className={styles.radioInput}
                    style={{
                      marginTop: '0.3rem',
                      flexShrink: 0,
                      width: '20px',
                      height: '20px',
                      minWidth: '20px',
                      minHeight: '20px'
                    }}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.namedDriverExperience && <span className={styles.error}>{errors.namedDriverExperience}</span>}
          </div>
        )}

        {/* How did you earn NCD Question - Show if any year is selected */}
        {formData.noClaimsDiscount && formData.noClaimsDiscount !== "No NCD" && (
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>How did you earn your no claims discount?</h3>
              <p className={styles.subText}>
                Some insurance providers will recognise NCD earned using a company vehicle or a vehicle driven outside of the UK. Please check with them before you purchase.
              </p>
            </div>

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedProof(!expandedProof)}
            >
              <span className={`${styles.expandableIcon} ${expandedProof ? styles.expandedIcon : ''}`}>▼</span>
              What proof do I need?
            </button>

            {expandedProof && (
              <div className={styles.expandableContent}>
                You'll typically need proof of your no claims discount from your previous insurer, such as a reference number, renewal document, or cancellation notice.
              </div>
            )}

            <div className={styles.radioGroup}>
              {ncdEarnedHowOptions.map((option) => (
                <label key={option} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="ncdEarnedHow"
                    value={option}
                    checked={formData.ncdEarnedHow === option}
                    onChange={(e) => setFormData({ ...formData, ncdEarnedHow: e.target.value })}
                    className={styles.radioInput}
                    style={{
                      marginTop: '0.3rem',
                      flexShrink: 0,
                      width: '20px',
                      height: '20px',
                      minWidth: '20px',
                      minHeight: '20px'
                    }}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.ncdEarnedHow && <span className={styles.error}>{errors.ncdEarnedHow}</span>}
          </div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          Back
        </button>
        <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3NoClaimsDiscount;
