"use client";
import React from "react";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import ExpandableQuestion from "@/ui/getQuote/ExpandableQuestion/ExpandableQuestion";
import styles from "./step1CarUsage.module.css";
import StepContainer from "@/ui/getQuote/StepContainer/StepContainer";
import sharedStyles from "@/ui/getQuote/shared.module.css";

const Step1CarUsage = ({ form, showMileage = true }) => {
  const { register, formState: { errors }, watch } = form;

  const purchaseDate = watch("vehicleDetails.purchaseDate");
  const haventBoughtYet = watch("vehicleDetails.haventBoughtYet");
  const usageType = watch("vehicleDetails.usageType");
  const annualMileage = watch("vehicleDetails.annualMileage");

  return (
    <StepContainer title="Car details - Car usage">
        {/* Purchase Date Section */}
        <div className={sharedStyles.stepSection}>
          <div className={sharedStyles.questionHeader}>
            <h3 className={sharedStyles.mainQuestion}>When did you buy or start to lease this car?</h3>
            <p className={sharedStyles.subText}>
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

          <ExpandableQuestion
            question="Where can I find this date?"
            answer="Your car's purchase date can be found on your purchase invoice, receipt, lease agreement, or V5 registration certificate. If you don't have this car yet, leave this blank."
          />
        </div>

        {/* Usage Type Section */}
        <div className={sharedStyles.stepSection}>
          <div className={sharedStyles.questionHeader}>
            <h3 className={sharedStyles.mainQuestion}>What do you use the car for?</h3>
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
        {showMileage && (
          <div className={sharedStyles.stepSection}>
            <div className={sharedStyles.questionHeader}>
              <h3 className={sharedStyles.mainQuestion}>What's the annual personal mileage for this car?</h3>
              <p className={sharedStyles.subText}>
                Try to be as accurate as possible. Underestimating your mileage could affect your cover or lead to increased charges.
              </p>
            </div>

            <ExpandableQuestion
              question="How can I calculate this?"
              answer="To calculate your annual mileage, multiply your daily commute by the number of working days, then add any additional personal journeys. For example, a 20-mile commute, 5 days a week, 48 weeks a year = 4,800 miles. Add leisure and family trips to get your total annual mileage."
            />

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

            <ExpandableQuestion
              question="What's personal mileage?"
              answer="Personal mileage is the total distance you drive your car for personal use each year, including commuting, shopping, socializing, and holidays. It doesn't include business mileage if you're using the car for work."
            />
          </div>
        )}
    </StepContainer>
  );
};

export default Step1CarUsage;
