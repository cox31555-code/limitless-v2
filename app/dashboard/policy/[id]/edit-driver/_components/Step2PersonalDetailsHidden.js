"use client";
import React from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "@/app/annual/get-quote/_components/step2PersonalDetails.module.css";

const Step2PersonalDetailsHidden = ({ form }) => {
  const { watch, setValue } = form;
  
  const maritalStatus = watch("userDetails.maritalStatus");
  const maritalStatusOptions = ["Single", "Married", "Civil partnership", "Divorced", "Widowed"];

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
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
        </div>
      </div>
    </div>
  );
};

export default Step2PersonalDetailsHidden;
