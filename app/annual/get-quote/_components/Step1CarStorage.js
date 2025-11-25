"use client";
import React from "react";
import styles from "./step1CarStorage.module.css";

const Step1CarStorage = ({ form }) => {
  const { register, formState: { errors }, watch } = form;
  
  const carStorageDay = watch("carUsage.keepingCarDuringDay");
  const carStorageNight = watch("carUsage.keepingCarDuringNight");

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Car details - Car storage</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Day Storage Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Where do you keep your car during the day?</h3>
          <p className={styles.subText}>
            If you leave your car in different places throughout the week, just tell us where the car's kept most of the time.
          </p>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringDay")}
                value="At home"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>At home</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringDay")}
                value="Office or factory car park"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Office or factory car park</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringDay")}
                value="Open public car park"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Open public car park</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringDay")}
                value="Secure public car park"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Secure public car park</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringDay")}
                value="Street away from home"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Street away from home</span>
            </label>
          </div>
        </div>

        {/* Night Storage Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Where do you keep your car during the night?</h3>
          <p className={styles.subText}>
            If you leave your car in different places throughout the week, just tell us where the car's kept most of the time.
          </p>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Drive"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Drive</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Street outside home"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Street outside home</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Locked garage"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Locked garage</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Unlocked garage"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Unlocked garage</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Street away from home"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Street away from home</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Locked compound"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Locked compound</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Public car park"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Public car park</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Work car park"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Work car park</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("carUsage.keepingCarDuringNight")}
                value="Private property"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Private property</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1CarStorage;
