"use client";
import React, { useState } from "react";
import styles from "./step3CarOwner.module.css";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";

const Step3CarOwner = ({
  onBack = () => {},
  onNext = () => {},
  userData = null,
  additionalDrivers = [],
  carOwnerData = null,
  onAddPerson = () => {},
  insuranceType = "Annual"
}) => {
  const [formData, setFormData] = useState(carOwnerData || {
    mainDriver: "",
    isRegisteredKeeperAndOwner: "",
    registeredKeeper: "",
    registeredKeeperCompanyName: "",
    registeredKeeperOtherPerson: null,
    legalOwner: "",
    legalOwnerCompanyName: "",
    legalOwnerOtherPerson: null,
  });

  const [errors, setErrors] = useState({});
  const [expandedWhoIsKeeper, setExpandedWhoIsKeeper] = useState(false);

  // Sync carOwnerData with formData when it changes (e.g., when returning from adding a person)
  React.useEffect(() => {
    if (carOwnerData) {
      setFormData((prev) => ({
        ...prev,
        ...carOwnerData,
      }));
    }
  }, [carOwnerData]);

  const entityTypesRequiringName = ["Company", "Leased Private", "Leased Company", "Society or Club"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.isRegisteredKeeperAndOwner) newErrors.isRegisteredKeeperAndOwner = "Please answer this question";
    if (formData.isRegisteredKeeperAndOwner === "No") {
      if (!formData.registeredKeeper) newErrors.registeredKeeper = "Please select the registered keeper";
      if (entityTypesRequiringName.includes(formData.registeredKeeper) && !formData.registeredKeeperCompanyName) {
        newErrors.registeredKeeperCompanyName = "Please enter the company name";
      }
      if (formData.registeredKeeper === "Other" && !formData.registeredKeeperOtherPerson) {
        newErrors.registeredKeeperOtherPerson = "Please add a person";
      }
      if (!formData.legalOwner) newErrors.legalOwner = "Please select the legal owner";
      if (entityTypesRequiringName.includes(formData.legalOwner) && !formData.legalOwnerCompanyName) {
        newErrors.legalOwnerCompanyName = "Please enter the company name";
      }
      // Only require adding a person if "Other" is selected and it's not the registered keeper person
      const isRegisteredKeeperPersonSelected =
        formData.registeredKeeperOtherPerson &&
        formData.legalOwner === `${formData.registeredKeeperOtherPerson.title} ${formData.registeredKeeperOtherPerson.firstName} ${formData.registeredKeeperOtherPerson.lastName}`;

      if (formData.legalOwner === "Other" && !formData.legalOwnerOtherPerson) {
        newErrors.legalOwnerOtherPerson = "Please add a person";
      }
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

  // Build owner options: drivers first, added persons, then other owner types
  const ownerOptions = [
    ...driverOptions,
    ...(formData.registeredKeeperOtherPerson ? [`${formData.registeredKeeperOtherPerson.title} ${formData.registeredKeeperOtherPerson.firstName} ${formData.registeredKeeperOtherPerson.lastName}`] : []),
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
            onClick={() => setExpandedWhoIsKeeper(!expandedWhoIsKeeper)}
          >
            <span className={`${styles.expandableIcon} ${expandedWhoIsKeeper ? styles.expandedIcon : ''}`}>▼</span>
            How can I find out who this is?
          </button>

          {expandedWhoIsKeeper && (
            <div className={styles.expandableContent}>
              The registered keeper's details are shown on the V5 registration certificate. This document is held by the registered keeper of the vehicle. If you're unsure, check your V5 certificate or contact your local DVLA office.
            </div>
          )}
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
                setSelected={(value) => setFormData({ ...formData, registeredKeeper: value, registeredKeeperCompanyName: "" })}
                placeholder="Select..."
              />
              {errors.registeredKeeper && <span className={styles.error}>{errors.registeredKeeper}</span>}
            </div>

            {/* Company Name Input - Only shown for Company/Leased/Society types */}
            {entityTypesRequiringName.includes(formData.registeredKeeper) && (
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>What's the company name?</label>
                <CustomTextInput
                  type="text"
                  placeholder=""
                  value={formData.registeredKeeperCompanyName || ""}
                  onChange={(e) => setFormData({ ...formData, registeredKeeperCompanyName: e.target.value })}
                  error={errors.registeredKeeperCompanyName}
                />
                {errors.registeredKeeperCompanyName && <span className={styles.error}>{errors.registeredKeeperCompanyName}</span>}
              </div>
            )}

            {/* Other Person Section - Only shown when "Other" is selected */}
            {formData.registeredKeeper === "Other" && (
              <div className={styles.otherPersonSection}>
                <h4 className={styles.otherPersonTitle}>Registered keeper</h4>
                {formData.registeredKeeperOtherPerson ? (
                  <div className={styles.personAdded}>
                    <p className={styles.personName}>
                      {formData.registeredKeeperOtherPerson.title} {formData.registeredKeeperOtherPerson.firstName} {formData.registeredKeeperOtherPerson.lastName}
                    </p>
                    <div className={styles.personActions}>
                      <button
                        type="button"
                        className={styles.removePersonBtn}
                        onClick={() => {
                          setFormData({ ...formData, registeredKeeperOtherPerson: null, registeredKeeper: "" });
                        }}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className={styles.changePersonBtn}
                        onClick={() => onAddPerson("registeredKeeper", formData)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.addPersonBtn}
                    onClick={() => onAddPerson("registeredKeeper", formData)}
                  >
                    Add a person
                  </button>
                )}
                {errors.registeredKeeperOtherPerson && <span className={styles.error}>{errors.registeredKeeperOtherPerson}</span>}
              </div>
            )}
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
                setSelected={(value) => setFormData({ ...formData, legalOwner: value, legalOwnerCompanyName: "" })}
                placeholder="Select..."
              />
              {errors.legalOwner && <span className={styles.error}>{errors.legalOwner}</span>}
            </div>

            {/* Company Name Input - Only shown for Company/Leased/Society types */}
            {entityTypesRequiringName.includes(formData.legalOwner) && (
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>What's the company name?</label>
                <CustomTextInput
                  type="text"
                  placeholder=""
                  value={formData.legalOwnerCompanyName || ""}
                  onChange={(e) => setFormData({ ...formData, legalOwnerCompanyName: e.target.value })}
                  error={errors.legalOwnerCompanyName}
                />
                {errors.legalOwnerCompanyName && <span className={styles.error}>{errors.legalOwnerCompanyName}</span>}
              </div>
            )}

            {/* Other Person Section - Only shown when "Other" is selected */}
            {formData.legalOwner === "Other" && (
              <div className={styles.otherPersonSection}>
                <h4 className={styles.otherPersonTitle}>Legal owner</h4>
                {formData.legalOwnerOtherPerson ? (
                  <div className={styles.personAdded}>
                    <p className={styles.personName}>
                      {formData.legalOwnerOtherPerson.title} {formData.legalOwnerOtherPerson.firstName} {formData.legalOwnerOtherPerson.lastName}
                    </p>
                    <div className={styles.personActions}>
                      <button
                        type="button"
                        className={styles.removePersonBtn}
                        onClick={() => {
                          setFormData({ ...formData, legalOwnerOtherPerson: null, legalOwner: "" });
                        }}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className={styles.changePersonBtn}
                        onClick={() => onAddPerson("legalOwner", formData)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.addPersonBtn}
                    onClick={() => onAddPerson("legalOwner", formData)}
                  >
                    Add a person
                  </button>
                )}
                {errors.legalOwnerOtherPerson && <span className={styles.error}>{errors.legalOwnerOtherPerson}</span>}
              </div>
            )}

            {/* Show registered keeper person as selected in legal owner if applicable */}
            {formData.registeredKeeperOtherPerson &&
             formData.legalOwner === `${formData.registeredKeeperOtherPerson.title} ${formData.registeredKeeperOtherPerson.firstName} ${formData.registeredKeeperOtherPerson.lastName}` && (
              <div className={styles.otherPersonSection}>
                <h4 className={styles.otherPersonTitle}>Legal owner</h4>
                <div className={styles.personAdded}>
                  <p className={styles.personName}>
                    {formData.registeredKeeperOtherPerson.title} {formData.registeredKeeperOtherPerson.firstName} {formData.registeredKeeperOtherPerson.lastName}
                  </p>
                  <div className={styles.personActions}>
                    <button
                      type="button"
                      className={styles.removePersonBtn}
                      onClick={() => {
                        setFormData({ ...formData, legalOwner: "" });
                      }}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className={styles.changePersonBtn}
                      onClick={() => onAddPerson("legalOwner", formData)}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            )}
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
