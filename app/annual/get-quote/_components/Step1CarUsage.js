"use client";
import React from "react";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import styles from "./step1CarUsage.module.css";

const Step1CarUsage = ({ form }) => {
  const { register, formState: { errors }, watch } = form;

  const purchaseDate = watch("vehicleDetails.purchaseDate");
  const haventBoughtYet = watch("vehicleDetails.haventBoughtYet");
  const usageType = watch("vehicleDetails.usageType");
  const annualMileage = watch("vehicleDetails.annualMileage");

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Car details - Car usage</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Purchase Date Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>When did you buy or start to lease this car?</h3>
            <p className={styles.subText}>
              We may fill in your car's purchase/lease date using details from an independent provider. If the date is already filled in and isn't correct, feel free to change it.
            </p>
          </div>

          <div />

          <div className={`${styles.dateInputsWrapper} ${haventBoughtYet ? styles.disabledDateInputs : ''}`}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Month</label>
              <CustomTextInput
                type="text"
                placeholder="MM"
                maxLength={2}
                value={purchaseDate ? purchaseDate.split('/')[0] : ""}
                onChange={(e) => {
                  let month = e.target.value.replace(/[^0-9]/g, '');
                  if (month.length > 2) {
                    month = month.slice(0, 2);
                  }
                  if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
                    return;
                  }
                  const year = purchaseDate ? purchaseDate.split('/')[1] : "";
                  if (month || year) {
                    form.setValue("vehicleDetails.purchaseDate", `${month}/${year}`);
                  }
                }}
                disabled={haventBoughtYet}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Year</label>
              <CustomTextInput
                type="text"
                placeholder="YYYY"
                maxLength={4}
                value={purchaseDate ? purchaseDate.split('/')[1] : ""}
                onChange={(e) => {
                  let year = e.target.value.replace(/[^0-9]/g, '');
                  if (year.length > 4) {
                    year = year.slice(0, 4);
                  }
                  const month = purchaseDate ? purchaseDate.split('/')[0] : "";
                  if (month || year) {
                    form.setValue("vehicleDetails.purchaseDate", `${month}/${year}`);
                  }
                }}
                disabled={haventBoughtYet}
              />
            </div>
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              {...register("vehicleDetails.haventBoughtYet")}
              className={styles.checkbox}
            />
            <span>I don't have this car yet</span>
          </label>

          <button type="button" className={styles.helpLink}>
            Where can I find this date?
          </button>
        </div>

        {/* Usage Type Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What do you use the car for?</h3>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("vehicleDetails.usageType")}
                value="Social use only"
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioLabel}>Social use only</span>
                <p className={styles.radioDescription}>
                  Personal use such as shopping or visiting friends and family.
                </p>
              </div>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("vehicleDetails.usageType")}
                value="Social and commuting"
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioLabel}>Social and commuting</span>
                <p className={styles.radioDescription}>
                  Personal use and driving to and from a single place of work or study.
                </p>
              </div>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("vehicleDetails.usageType")}
                value="Social, commuting and business"
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioLabel}>Social, commuting and business</span>
                <p className={styles.radioDescription}>
                  You drive to various locations for work. You can also add other drivers who use this car for business.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Annual Mileage Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>What's the annual personal mileage for this car?</h3>
          <p className={styles.subText}>
            Try to be as accurate as possible. Underestimating your mileage could affect your cover or lead to increased charges.
          </p>

          <button type="button" className={styles.helpLink}>
            How can I calculate this?
          </button>

          <div className={styles.mileageInputWrapper}>
            <CustomTextInput
              type="text"
              placeholder="1500"
              value={annualMileage || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (form.setValue) {
                  form.setValue("vehicleDetails.annualMileage", value);
                }
              }}
              suffix="miles"
            />
          </div>

          <button type="button" className={styles.helpLink}>
            What's personal mileage?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1CarUsage;
