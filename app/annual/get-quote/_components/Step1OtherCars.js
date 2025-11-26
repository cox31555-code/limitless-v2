"use client";
import React from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "./step1OtherCars.module.css";

const Step1OtherCars = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;

  const householdCarsCount = watch("carUsage.householdCarsCount");
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
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>How many cars are kept at your household (including this one)?</h3>
            <p className={styles.subText}>
              Exclude motorbikes, vans, and commercial vehicles.
            </p>
          </div>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              label=""
              selected={householdCarsCount}
              options={carCountOptions}
              setSelected={(value) => {
                setValue("carUsage.householdCarsCount", value);
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

          {otherVehicles === "Yes" && (
            <div className={styles.conditionalSection}>
              <h3 className={styles.mainQuestion}>What other vehicles do you have use of?</h3>
              <p className={styles.subText}>
                Select the most applicable option.
              </p>

              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    {...register("carUsage.otherVehiclesType")}
                    value="Own another car or van"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>Own another car or van</span>
                </label>

                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    {...register("carUsage.otherVehiclesType")}
                    value="Have use of another car"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>Have use of another car</span>
                </label>

                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    {...register("carUsage.otherVehiclesType")}
                    value="Company car (including personal use)"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>Company car (including personal use)</span>
                </label>

                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    {...register("carUsage.otherVehiclesType")}
                    value="Company car (excluding personal use)"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>Company car (excluding personal use)</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1OtherCars;
