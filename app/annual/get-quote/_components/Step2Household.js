"use client";
import React, { useState } from "react";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import styles from "./step2Household.module.css";

const Step2Household = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  
  const houseNumber = watch("userDetails.houseNumber");
  const postcode = watch("userDetails.postcode");
  const ownsHome = watch("userDetails.ownsHome");
  const childrenUnder16 = watch("userDetails.childrenUnder16");
  const livedInUKSinceBirth = watch("userDetails.livedInUKSinceBirth");
  const [expandedWhyAsking, setExpandedWhyAsking] = useState(false);
  const [expandedManualEntry, setExpandedManualEntry] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - Your household</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Address Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>What's your address?</h3>

          <div className={styles.addressGroup}>
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>House number or name (optional)</label>
              <CustomTextInput
                type="text"
                placeholder=""
                value={houseNumber || ""}
                onChange={(e) => {
                  setValue("userDetails.houseNumber", e.target.value);
                }}
              />
            </div>

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Postcode</label>
              <CustomTextInput
                type="text"
                placeholder=""
                value={postcode || ""}
                onChange={(e) => {
                  setValue("userDetails.postcode", e.target.value);
                }}
              />
            </div>

            <button type="button" className={styles.findAddressBtn}>
              Find address
            </button>
          </div>

          <div className={styles.orDivider}>
            <span>Or</span>
          </div>

          <button 
            type="button" 
            className={styles.expandableLink}
            onClick={() => setExpandedManualEntry(!expandedManualEntry)}
          >
            Enter the full address yourself
          </button>
        </div>

        {/* Home Ownership Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Do you own your home?</h3>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.ownsHome")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.ownsHome")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>

        {/* Children Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Do any children under the age of 16 live with you?</h3>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.childrenUnder16")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.childrenUnder16")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>

          <button 
            type="button" 
            className={styles.expandableLink}
            onClick={() => setExpandedWhyAsking(!expandedWhyAsking)}
          >
            <span className={styles.expandableIcon}>
              {expandedWhyAsking ? '▼' : '▶'}
            </span>
            Why are we asking?
          </button>

          {expandedWhyAsking && (
            <p className={styles.expandableContent}>
              Insurance providers may adjust pricing based on household composition and other factors.
            </p>
          )}
        </div>

        {/* UK Residency Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Have you continuously lived in the UK since birth?</h3>
          <p className={styles.subText}>
            Insurance providers need to know how long you've lived in the UK on a continuous basis, without any breaks lasting 6 months or longer.
          </p>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.livedInUKSinceBirth")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.livedInUKSinceBirth")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Household;
