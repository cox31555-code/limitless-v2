"use client";
import React from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormDropdown from "@/ui/inputs/FormDropdown";
import Title from "@/ui/insurance-quotes/title/Title";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import styles from "./components.module.css";

const CoverDetailsForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const coverType = watch("coverDetails.type");
  const period = watch("coverDetails.period");

  const handleTypeChange = (type) => {
    setValue("coverDetails.type", type);
    setValue("coverDetails.period", 1);
  };

  const handlePeriodChange = (periodValue) => {
    const numValue = parseInt(periodValue);
    if (!isNaN(numValue)) {
      setValue("coverDetails.period", numValue);
    }
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setValue("coverDetails.period", numValue, { shouldValidate: true });
      }
    }
  };

  const getPeriodOptions = () => {
    switch (coverType) {
      case "Hours":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      case "Days":
        return ["1", "2", "3", "4", "5", "6", "7", "8"];
      case "Weeks":
        return ["1", "2", "3", "4"];
      case "Months":
        return ["1", "2", "3", "6", "12"];
      default:
        return ["1", "2", "3", "4", "5", "6", "7", "8"];
    }
  };

  const getDropdownOptions = () => {
    switch (coverType) {
      case "Days":
        return Array.from({ length: 23 }, (_, i) => (i + 9).toString());
      case "Hours":
      case "Weeks":
      case "Months":
      default:
        return [];
    }
  };

  const durationLabels = {
    Hours: "Hours",
    Days: "Days",
    Weeks: "Weeks",
    Months: "Months",
  };

  const periodOptions = getPeriodOptions();
  const dropdownOptions = getDropdownOptions();
  const showDropdown = dropdownOptions.length > 0;

  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.coverDetailsWrapper}>
        <div className={styles.inputGroup}>
          <Title title="How long will you need it?" />
          <div className={styles.selectionContainer}>
            <p className={styles.label}>Select duration type</p>
            <div className={styles.durationTypeGrid}>
              <Selection1
                noDotMobile
                items={["Hours", "Days", "Weeks"]}
                selectedItem={coverType}
                setSelectedItem={handleTypeChange}
                type="checkbox"
              />
            </div>
            <div className={styles.durationValuesSection}>
              <p className={styles.durationLabel}>Select {durationLabels[coverType]}</p>
              <div className={styles.durationValuesContainer}>
                <div className={styles.gridWithDropdown}>
                  <Selection1
                    noDotMobile
                    items={periodOptions}
                    selectedItem={period?.toString()}
                    setSelectedItem={handlePeriodChange}
                  />
                  {showDropdown && (
                    <FormDropdown
                      placeholder=""
                      options={dropdownOptions}
                      value={
                        period && dropdownOptions.includes(period.toString())
                          ? period.toString()
                          : ""
                      }
                      onChange={handleDropdownChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {errors.coverDetails?.type && (
            <span className={styles.error}>
              {errors.coverDetails.type.message}
            </span>
          )}
          {errors.coverDetails?.period && (
            <span className={styles.error}>
              {errors.coverDetails.period.message}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <Title title="When would you like the cover to start?" />
          <div className={styles.dateTimeGrid}>
            <FormDataAndTime
              dateLabel="Start Date"
              type="date"
              {...register("coverDetails.startDate")}
              value={watch("coverDetails.startDate")}
              error={errors.coverDetails?.startDate}
            />
            <FormDataAndTime
              timeLabel="Start Time"
              type="time"
              {...register("coverDetails.startTime")}
              value={watch("coverDetails.startTime")}
              error={errors.coverDetails?.startTime}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetailsForm;
