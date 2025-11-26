"use client";
import React, { useEffect } from "react";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import styles from "./step1CarValue.module.css";

const Step1CarValue = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;

  const estimatedValue = watch("vehicleDetails.estimatedValue");
  const carValue = watch("vehicleDetails.carValue");

  // Set carValue from estimatedValue on mount
  useEffect(() => {
    if (estimatedValue && !carValue) {
      setValue("vehicleDetails.carValue", estimatedValue);
    }
  }, [estimatedValue, carValue, setValue]);

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Car details - Car value</h2>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.questionHeader}>
          <h3 className={styles.mainQuestion}>What's the current estimated value of the car?</h3>
          <p className={styles.subText}>
            We've estimated your car's current market value using an independent provider. If a value isn't shown or if it doesn't look right, feel free to change it.
          </p>
        </div>

        <div className={styles.inputSection}>
          <div className={styles.estimatedInfo}>
            <p className={styles.estimatedLabel}>
              Estimated value of <span className={styles.estimatedAmount}>£{estimatedValue || "4560"}</span>.
            </p>
          </div>

          <div className={styles.inputWrapper}>
            <CustomTextInput
              label=""
              type="text"
              inputMode="decimal"
              placeholder="4560"
              prefix="£"
              value={carValue || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.]/g, "");
                setValue("vehicleDetails.carValue", val);
              }}
              error={errors?.vehicleDetails?.carValue?.message}
            />
          </div>

          <button type="button" className={styles.helpLink}>
            Why do we ask this?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1CarValue;
