"use client";
import React, { useState } from "react";
import styles from "./step3CarOwner.module.css";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";

const Step3CarOwner = ({
  onBack = () => {},
  onNext = () => {},
  userData = null,
  additionalDrivers = [],
  carOwnerData = null
}) => {
  const [formData, setFormData] = useState(carOwnerData || {
    mainDriver: "",
    isRegisteredKeeperAndOwner: "",
    registeredKeeper: "",
    legalOwner: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mainDriver) newErrors.mainDriver = "Please select the main driver";
    if (!formData.isRegisteredKeeperAndOwner) newErrors.isRegisteredKeeperAndOwner = "Please answer this question";
    if (formData.isRegisteredKeeperAndOwner === "No") {
      if (!formData.registeredKeeper) newErrors.registeredKeeper = "Please select the registered keeper";
      if (!formData.legalOwner) newErrors.legalOwner = "Please select the legal owner";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    } else {
      setErrors(newErrors);
    }
  };

  // Build driver options: include userData (Driver 1) + additional drivers
  const driverOptions = [];
  if (userData && userData.firstName && userData.lastName) {
    driverOptions.push(`${userData.title ? userData.title + ' ' : ''}${userData.firstName} ${userData.lastName}`);
  }
  additionalDrivers.forEach((driver) => {
    if (driver.firstName && driver.lastName) {
      driverOptions.push(`${driver.title ? driver.title + ' ' : ''}${driver.firstName} ${driver.lastName}`);
    }
  });

  // Build owner options: drivers first, then other owner types
  const ownerOptions = [
    ...driverOptions,
    "Company",
    "Other",
    "Leased Private",
    "Leased Company",
    "Society or Club"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your policy - Car owner</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Main Driver Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Who's the main driver of this vehicle?</h3>
          </div>
          <div className={styles.fieldWrapper}>
            <Dropdown
              label=""
              selected={formData.mainDriver}
              options={driverOptions}
              setSelected={(value) => setFormData({ ...formData, mainDriver: value })}
              placeholder="Please select…"
            />
            {errors.mainDriver && <span className={styles.error}>{errors.mainDriver}</span>}
          </div>
        </div>

        {/* Registered Keeper and Legal Owner Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Are you (or will you be) the registered keeper and legal owner?</h3>
            <p className={styles.subText}>The registered keeper is named on the V5 certificate (you/they should have a copy).</p>
          </div>
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="isRegisteredKeeperAndOwner"
                  value={option}
                  checked={formData.isRegisteredKeeperAndOwner === option}
                  onChange={(e) => setFormData({ ...formData, isRegisteredKeeperAndOwner: e.target.value })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.isRegisteredKeeperAndOwner && <span className={styles.error}>{errors.isRegisteredKeeperAndOwner}</span>}

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => {
              // Toggle state for expandable
            }}
          >
            <span className={styles.expandableIcon}>▼</span>
            How can I find out who this is?
          </button>

          <div className={styles.expandableContent}>
            The registered keeper's details are shown on the V5 registration certificate. This document is held by the registered keeper of the vehicle. If you're unsure, check your V5 certificate or contact your local DVLA office.
          </div>
        </div>

        {/* Registered Keeper Question - Only shown when No is selected */}
        {formData.isRegisteredKeeperAndOwner === "No" && (
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Who's the registered keeper?</h3>
            </div>
            <div className={styles.fieldWrapper}>
              <Dropdown
                label=""
                selected={formData.registeredKeeper}
                options={ownerOptions}
                setSelected={(value) => setFormData({ ...formData, registeredKeeper: value })}
                placeholder="Select..."
              />
              {errors.registeredKeeper && <span className={styles.error}>{errors.registeredKeeper}</span>}
            </div>
          </div>
        )}

        {/* Legal Owner Question - Only shown when No is selected */}
        {formData.isRegisteredKeeperAndOwner === "No" && (
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Who's the legal owner?</h3>
            </div>
            <div className={styles.fieldWrapper}>
              <Dropdown
                label=""
                selected={formData.legalOwner}
                options={ownerOptions}
                setSelected={(value) => setFormData({ ...formData, legalOwner: value })}
                placeholder="Select..."
              />
              {errors.legalOwner && <span className={styles.error}>{errors.legalOwner}</span>}
            </div>
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

export default Step3CarOwner;
