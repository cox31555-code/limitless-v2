"use client";
import React, { useState } from "react";
import styles from "./step3CarOwnerAddPerson.module.css";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";

const Step3CarOwnerAddPerson = ({
  onBack = () => {},
  onSave = () => {},
  onRemove = () => {},
  personType = "registeredKeeper", // "registeredKeeper" or "legalOwner"
  personData = null,
  isEditing = false
}) => {
  const [formData, setFormData] = useState(personData || {
    relationship: "",
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sameAddress: "",
  });

  const [errors, setErrors] = useState({});

  const titleOptions = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];
  const relationshipOptions = ["Spouse", "Child", "Parent", "Sibling", "Friend", "Other"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.relationship) newErrors.relationship = "Please select their relationship to you";
    if (!formData.title) newErrors.title = "Please select a title";
    if (!formData.firstName) newErrors.firstName = "Please enter first name";
    if (!formData.lastName) newErrors.lastName = "Please enter last name";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Please enter date of birth";
    if (!formData.sameAddress) newErrors.sameAddress = "Please answer this question";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const getTitle = () => {
    if (personType === "registeredKeeper") {
      return "Car owner - Registered keeper";
    } else {
      return "Car owner - Legal owner";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>{getTitle()}</h2>
      </div>

      {isEditing && personData && (
        <div className={styles.personHeader}>
          <div className={styles.personHeaderInfo}>
            <p className={styles.personHeaderName}>
              {personData.title} {personData.firstName} {personData.lastName}
            </p>
          </div>
          <div className={styles.personHeaderActions}>
            <button
              type="button"
              className={styles.removePersonBtn}
              onClick={onRemove}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <div className={styles.contentWrapper}>
        {/* Relationship Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What's their relationship to you?</h3>
          </div>
          <div className={styles.fieldWrapper}>
            <Dropdown
              label=""
              selected={formData.relationship}
              options={relationshipOptions}
              setSelected={(value) => setFormData({ ...formData, relationship: value })}
              placeholder="Please select…"
            />
            {errors.relationship && <span className={styles.error}>{errors.relationship}</span>}
          </div>
        </div>

        {/* Name Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What's their name?</h3>
            <p className={styles.subText}>
              If you select 'Dr' or 'Prof' as their title, you may see fewer results. A small number of providers are still updating their systems to support these options. We're working closely with them to ensure complete availability.
            </p>
          </div>

          <div className={styles.fieldsRow}>
            <div className={styles.fieldGroup}>
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>Title</label>
                <Dropdown
                  label=""
                  selected={formData.title}
                  options={titleOptions}
                  setSelected={(value) => setFormData({ ...formData, title: value })}
                  placeholder="Select..."
                />
                {errors.title && <span className={styles.error}>{errors.title}</span>}
              </div>
            </div>

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>First name</label>
              <CustomTextInput
                type="text"
                placeholder=""
                value={formData.firstName || ""}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Last name</label>
              <CustomTextInput
                type="text"
                placeholder=""
                value={formData.lastName || ""}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>
        </div>

        {/* Date of Birth Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What's their date of birth?</h3>
          </div>

          <div className={styles.dateInputsWrapper}>
            <div className={styles.dateInputGroup}>
              <label className={styles.inputLabel}>Day</label>
              <CustomTextInput
                type="text"
                placeholder="DD"
                maxLength={2}
                value={formData.dateOfBirth ? formData.dateOfBirth.split('/')[0] : ""}
                onChange={(e) => {
                  let day = e.target.value.replace(/[^0-9]/g, '');
                  if (day.length > 2) day = day.slice(0, 2);
                  if (day && (parseInt(day) < 1 || parseInt(day) > 31)) return;
                  const parts = formData.dateOfBirth ? formData.dateOfBirth.split('/') : ['', '', ''];
                  if (day || parts[1] || parts[2]) {
                    setFormData({ ...formData, dateOfBirth: `${day}/${parts[1] || ''}/${parts[2] || ''}` });
                  }
                }}
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label className={styles.inputLabel}>Month</label>
              <CustomTextInput
                type="text"
                placeholder="MM"
                maxLength={2}
                value={formData.dateOfBirth ? formData.dateOfBirth.split('/')[1] : ""}
                onChange={(e) => {
                  let month = e.target.value.replace(/[^0-9]/g, '');
                  if (month.length > 2) month = month.slice(0, 2);
                  if (month && (parseInt(month) < 1 || parseInt(month) > 12)) return;
                  const parts = formData.dateOfBirth ? formData.dateOfBirth.split('/') : ['', '', ''];
                  if (parts[0] || month || parts[2]) {
                    setFormData({ ...formData, dateOfBirth: `${parts[0] || ''}/${month}/${parts[2] || ''}` });
                  }
                }}
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label className={styles.inputLabel}>Year</label>
              <CustomTextInput
                type="text"
                placeholder="YYYY"
                maxLength={4}
                value={formData.dateOfBirth ? formData.dateOfBirth.split('/')[2] : ""}
                onChange={(e) => {
                  let year = e.target.value.replace(/[^0-9]/g, '');
                  if (year.length > 4) year = year.slice(0, 4);
                  const parts = formData.dateOfBirth ? formData.dateOfBirth.split('/') : ['', '', ''];
                  if (parts[0] || parts[1] || year) {
                    setFormData({ ...formData, dateOfBirth: `${parts[0] || ''}/${parts[1] || ''}/${year}` });
                  }
                }}
              />
            </div>
          </div>
          {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
        </div>

        {/* Same Address Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Do you both live at the same address?</h3>
          </div>
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="sameAddress"
                  value={option}
                  checked={formData.sameAddress === option}
                  onChange={(e) => setFormData({ ...formData, sameAddress: e.target.value })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.sameAddress && <span className={styles.error}>{errors.sameAddress}</span>}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          Back
        </button>
        <button type="button" className={styles.nextBtn} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Step3CarOwnerAddPerson;
