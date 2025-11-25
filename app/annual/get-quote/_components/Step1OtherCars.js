"use client";
import React, { useState } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "./step1OtherCars.module.css";

const Step1OtherCars = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  
  const [householdCarsCount, setHouseholdCarsCount] = useState("");
  const otherVehicles = watch("carUsage.otherVehicles");

  const carCountOptions = ["1", "2", "3", "4", "5"];

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Car details - Other cars</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Household Cars Count Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>How many cars are kept at your household (including this one)?</h3>
          <p className={styles.subText}>
            Exclude motorbikes, vans, and commercial vehicles.
          </p>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              label=""
              selected={householdCarsCount}
              options={carCountOptions}
              setSelected={(value) => {
                setHouseholdCarsCount(value);
                setValue("carUsage.otherVehiclesType", value);
              }}
              placeholder="Please select..."
              disabled={false}
            />
          </div>
        </div>

        {/* Other Vehicles Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Do you use any other vehicles?</h3>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.otherVehicles")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.otherVehicles")}
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

export default Step1OtherCars;
