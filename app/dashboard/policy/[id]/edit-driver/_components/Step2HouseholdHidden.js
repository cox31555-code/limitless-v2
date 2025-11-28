"use client";
import React from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "@/app/annual/get-quote/_components/step2Household.module.css";

const Step2HouseholdHidden = ({ form }) => {
  const { watch, setValue } = form;

  const ownsHome = watch("userDetails.ownsHome");
  const childrenUnder16 = watch("userDetails.childrenUnder16");
  const livedInUKSinceBirth = watch("userDetails.livedInUKSinceBirth");

  const yesNoOptions = ["Yes", "No"];

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Home Ownership Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Do you own your home?</h3>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              label=""
              selected={ownsHome ? "Yes" : "No"}
              options={yesNoOptions}
              setSelected={(value) => {
                setValue("userDetails.ownsHome", value === "Yes");
              }}
              placeholder="Please select..."
              disabled={false}
            />
          </div>
        </div>

        {/* Children Under 16 Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Do you have any children under 16 living with you?</h3>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              label=""
              selected={childrenUnder16 ? "Yes" : "No"}
              options={yesNoOptions}
              setSelected={(value) => {
                setValue("userDetails.childrenUnder16", value === "Yes");
              }}
              placeholder="Please select..."
              disabled={false}
            />
          </div>
        </div>

        {/* Lived in UK Since Birth Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Have you lived in the UK since birth?</h3>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              label=""
              selected={livedInUKSinceBirth ? "Yes" : "No"}
              options={yesNoOptions}
              setSelected={(value) => {
                setValue("userDetails.livedInUKSinceBirth", value === "Yes");
              }}
              placeholder="Please select..."
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2HouseholdHidden;
