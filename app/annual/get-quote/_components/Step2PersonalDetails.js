"use client";
import React, { useState } from "react";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "./step2PersonalDetails.module.css";

const Step2PersonalDetails = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  
  const title = watch("userDetails.title");
  const maritalStatus = watch("userDetails.maritalStatus");
  const [expandedUnder17, setExpandedUnder17] = useState(false);

  const titleOptions = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];
  const maritalStatusOptions = ["Single", "Married", "Civil partnership", "Divorced", "Widowed"];

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - About you</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Name Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>What's your name?</h3>
          <p className={styles.subText}>
            If you select 'Dr' or 'Mx' as your title, you may see fewer results. A small number of providers are still updating their systems to support these options. We're working closely with them to ensure complete availability.
          </p>

          <div className={styles.fieldGroup}>
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Title</label>
              <Dropdown
                label=""
                selected={title}
                options={titleOptions}
                setSelected={(value) => {
                  setValue("userDetails.title", value);
                }}
                placeholder="Select..."
                disabled={false}
              />
            </div>
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>First name</label>
            <CustomTextInput
              type="text"
              placeholder=""
              value={watch("userDetails.firstName") || ""}
              onChange={(e) => {
                setValue("userDetails.firstName", e.target.value);
              }}
              error={errors?.userDetails?.firstName?.message}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Last name</label>
            <CustomTextInput
              type="text"
              placeholder=""
              value={watch("userDetails.surname") || ""}
              onChange={(e) => {
                setValue("userDetails.surname", e.target.value);
              }}
              error={errors?.userDetails?.surname?.message}
            />
          </div>
        </div>

        {/* Date of Birth Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>What's your date of birth?</h3>

          <div className={styles.dateInputsWrapper}>
            <div className={styles.dateInputGroup}>
              <label className={styles.inputLabel}>Day</label>
              <CustomTextInput
                type="text"
                placeholder="DD"
                maxLength={2}
                value={watch("userDetails.dateOfBirth") ? watch("userDetails.dateOfBirth").split('/')[0] : ""}
                onChange={(e) => {
                  let day = e.target.value.replace(/[^0-9]/g, '');
                  if (day.length > 2) {
                    day = day.slice(0, 2);
                  }
                  if (day && (parseInt(day) < 1 || parseInt(day) > 31)) {
                    return;
                  }
                  const parts = watch("userDetails.dateOfBirth") ? watch("userDetails.dateOfBirth").split('/') : ['', '', ''];
                  if (day || parts[1] || parts[2]) {
                    form.setValue("userDetails.dateOfBirth", `${day}/${parts[1] || ''}/${parts[2] || ''}`);
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
                value={watch("userDetails.dateOfBirth") ? watch("userDetails.dateOfBirth").split('/')[1] : ""}
                onChange={(e) => {
                  let month = e.target.value.replace(/[^0-9]/g, '');
                  if (month.length > 2) {
                    month = month.slice(0, 2);
                  }
                  if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
                    return;
                  }
                  const parts = watch("userDetails.dateOfBirth") ? watch("userDetails.dateOfBirth").split('/') : ['', '', ''];
                  if (parts[0] || month || parts[2]) {
                    form.setValue("userDetails.dateOfBirth", `${parts[0] || ''}/${month}/${parts[2] || ''}`);
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
                value={watch("userDetails.dateOfBirth") ? watch("userDetails.dateOfBirth").split('/')[2] : ""}
                onChange={(e) => {
                  let year = e.target.value.replace(/[^0-9]/g, '');
                  if (year.length > 4) {
                    year = year.slice(0, 4);
                  }
                  const parts = watch("userDetails.dateOfBirth") ? watch("userDetails.dateOfBirth").split('/') : ['', '', ''];
                  if (parts[0] || parts[1] || year) {
                    form.setValue("userDetails.dateOfBirth", `${parts[0] || ''}/${parts[1] || ''}/${year}`);
                  }
                }}
              />
            </div>
          </div>

          <button 
            type="button" 
            className={styles.expandableLink}
            onClick={() => setExpandedUnder17(!expandedUnder17)}
          >
            <span className={styles.expandableIcon}>
              {expandedUnder17 ? '▼' : '▶'}
            </span>
            Can I get a quote if I'm under 17?
          </button>

          {expandedUnder17 && (
            <p className={styles.expandableContent}>
              Yes, you may be able to get a quote if you're under 17. However, you won't be able to purchase a policy until you're 17 years old.
            </p>
          )}
        </div>

        {/* Relationship Status Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>What's your relationship status?</h3>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              label=""
              selected={maritalStatus}
              options={maritalStatusOptions}
              setSelected={(value) => {
                setValue("userDetails.maritalStatus", value);
              }}
              placeholder="Please select..."
              disabled={false}
            />
          </div>

          <button type="button" className={styles.helpLink}>
            Why are we asking?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2PersonalDetails;
