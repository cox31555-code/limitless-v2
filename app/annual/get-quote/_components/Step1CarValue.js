"use client";
import React from "react";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import styles from "./step1CarValue.module.css";

const Step1CarValue = ({ form }) => {
  const { register, formState: { errors }, watch } = form;
  
  const estimatedValue = watch("vehicleDetails.estimatedValue");

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Car details - Car value</h2>
      </div>

      <div className={styles.header}>
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
            type="number"
            placeholder="4560"
            prefix="£"
            {...register("vehicleDetails.carValue")}
            error={errors?.vehicleDetails?.carValue?.message}
          />
        </div>

        <button type="button" className={styles.helpLink}>
          Why do we ask this?
        </button>
      </div>
    </div>
  );
};

export default Step1CarValue;
