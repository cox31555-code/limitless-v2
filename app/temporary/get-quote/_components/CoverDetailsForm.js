"use client";
import React, { useEffect, useState } from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormDateInput from "@/ui/inputs/FormDateInput";
import styles from "./components.module.css";

const CoverDetailsForm = ({ form, isImpound = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [startPolicyImmediately, setStartPolicyImmediately] = useState(false);

  const durationType = form.watch("coverDetails.type");
  const duration = form.watch("coverDetails.period");
  const startDate = form.watch("coverDetails.startDate");
  const startTime = form.watch("coverDetails.startTime");

  // Auto-select 30 Days for impound insurance on mount
  // For Temporary, no auto-selection - user must choose
  useEffect(() => {
    if (isImpound) {
      form.setValue("coverDetails.type", "Days");
      form.setValue("coverDetails.period", 30);
    }
    // For Temporary: no auto-selection
  }, [isImpound, form]);

  const handleStartImmediately = () => {
    if (!startPolicyImmediately) {
      // Set to 10 minutes in the future
      const now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      const currentDate = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().slice(0, 5);

      form.setValue("coverDetails.startDate", currentDate, { shouldValidate: true });
      form.setValue("coverDetails.startTime", currentTime, { shouldValidate: true });
    }
    setStartPolicyImmediately(!startPolicyImmediately);
  };

  // Dynamic duration options based on selected type
  const getDurationOptions = () => {
    switch (durationType) {
      case "Hours":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      case "Days":
        return [1, 2, 3, 4, 5, 6, 7, 8];
      case "Weeks":
        return [1, 2, 3, 4];
      default:
        return [1, 2, 3, 4, 5, 6, 7, 8];
    }
  };

  const getExtraDurationOptions = () => {
    switch (durationType) {
      case "Days":
        return [
          9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
          27, 28, 29, 30, 31,
        ];
      default:
        return [];
    }
  };

  const durationOptions = getDurationOptions();
  const extraDurationOptions = getExtraDurationOptions();
  const showDropdown = durationType === "Days" && extraDurationOptions.length > 0;

  const handleDurationTypeChange = (type) => {
    form.setValue("coverDetails.type", type);
    form.setValue("coverDetails.period", 1);
  };

  const handleDurationChange = (value) => {
    form.setValue("coverDetails.period", value);
    setIsDropdownOpen(false);
  };

  const handleDateChange = (e) => {
    form.setValue("coverDetails.startDate", e.target.value);
  };

  const handleTimeChange = (e) => {
    form.setValue("coverDetails.startTime", e.target.value);
  };

  const handleDateInputChange = (e) => {
    handleDateChange(e);
  };

  const handleTimeInputChange = (e) => {
    handleTimeChange(e);
  };

  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.formContent}>
        {/* Duration Section */}
        <div className={styles.formSection}>
          <div className={styles.sparkSectionHeader}>
            <h2 className={styles.sparkSectionTitle}>
              How Long Will You Need It?
            </h2>
            <p className={styles.sparkSectionSubtitle}>
              Select your preferred coverage duration
            </p>
          </div>

          {isImpound ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <button
                type="button"
                style={{
                  padding: "1rem 1.6rem",
                  borderRadius: "10px",
                  border: "1.5px solid rgba(3, 136, 255, 0.25)",
                  background: "rgba(3, 136, 255, 0.06)",
                  color: "rgba(3, 136, 255, 0.5)",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  cursor: "not-allowed",
                  opacity: 0.65,
                  minWidth: "150px",
                  textAlign: "center",
                }}
                disabled
              >
                30 Days
              </button>
              <span style={{ fontSize: "1.2rem", color: "#7a8a9d", fontWeight: "500" }}>
                (Fixed)
              </span>
            </div>
          ) : (
            <div className={styles.sparkSpaceY6}>
              {/* Duration Type Selection */}
              <div className={styles.sparkDurationTypeGrid}>
                {[
                  { key: "Hours", label: "Hours" },
                  { key: "Days", label: "Days" },
                  { key: "Weeks", label: "Weeks" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleDurationTypeChange(key)}
                    className={`${styles.sparkTypeButton} ${
                      durationType === key
                        ? styles.sparkTypeButtonActive
                        : styles.sparkTypeButtonInactive
                    }`}
                  >
                    <div
                      className={`${styles.sparkDot} ${
                        durationType === key
                          ? styles.sparkDotActive
                          : styles.sparkDotInactive
                      }`}
                    >
                      {durationType === key && (
                        <div className={styles.sparkDotInner} />
                      )}
                    </div>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Duration Value Selection - only show if a type is selected */}
              {durationType && (
              <div className={styles.sparkDurationContainer}>
                <p className={styles.sparkDurationLabel}>Select Duration</p>
                <div className={styles.sparkDurationGrid}>
                  {durationOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleDurationChange(option)}
                      className={`${styles.sparkDurationButton} ${
                        duration === option
                          ? styles.sparkDurationButtonActive
                          : styles.sparkDurationButtonInactive
                      }`}
                    >
                      {option}
                    </button>
                  ))}

                  {/* Dropdown for more options - only show for Days */}
                  {showDropdown && (
                    <>
                      {/* Native select for mobile only */}
                      <select
                        value={duration >= 9 ? duration : ""}
                        onChange={(e) => handleDurationChange(parseInt(e.target.value))}
                        className={`${styles.sparkNativeSelect} ${
                          duration >= 9 ? styles.sparkNativeSelectActive : ""
                        }`}
                      >
                        <option value="">More...</option>
                        {extraDurationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      {/* Custom dropdown for desktop only */}
                      <div className={styles.sparkDropdownContainer}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`${styles.sparkDurationButton} ${
                            duration >= 9
                              ? styles.sparkDurationButtonActive
                              : styles.sparkDurationButtonInactive
                          }`}
                        >
                          {duration >= 9 ? duration : (
                            <svg
                              className={`${styles.sparkDropdownIcon} ${
                                isDropdownOpen ? styles.sparkDropdownIconOpen : ""
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          )}
                        </button>

                        {isDropdownOpen && (
                          <div className={styles.sparkDropdownContent}>
                            {extraDurationOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleDurationChange(option)}
                                className={styles.sparkDropdownItem}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              )}
            </div>
          )}
        </div>

        {/* Start Date/Time Section */}
        <div className={styles.formSection}>
          <div className={styles.sparkSectionHeader}>
            <h2 className={styles.sparkSectionTitle}>
              When Would You Like The Cover To Start?
            </h2>
            <p className={styles.sparkSectionSubtitle}>
              Choose your coverage start date and time
            </p>
          </div>

          <div className={styles.sparkDateTimeGrid}>
            {/* Start Date */}
            <FormDateInput
              type="date"
              dateLabel="Start Date"
              name="coverDetails.startDate"
              value={startDate || ""}
              onChange={handleDateInputChange}
              allowPastDates={false}
              forceShowAbove={true}
            />

            {/* Start Time */}
            <FormDateInput
              type="time"
              timeLabel="Start Time"
              name="coverDetails.startTime"
              value={startTime || ""}
              onChange={handleTimeInputChange}
              forceShowAbove={true}
              relatedDateValue={startDate}
            />
          </div>

          <button
            type="button"
            onClick={handleStartImmediately}
            style={{
              padding: "1.4rem 1.6rem",
              background: startPolicyImmediately ? "rgba(3, 136, 255, 0.08)" : "transparent",
              border: `1.5px solid ${startPolicyImmediately ? "#0388ff" : "rgba(3, 136, 255, 0.2)"}`,
              borderRadius: "10px",
              fontSize: "1.3rem",
              fontWeight: "500",
              marginTop: "1.6rem",
              cursor: "pointer",
              transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
              color: startPolicyImmediately ? "#0388ff" : "#5a6b7d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.8rem",
            }}
            aria-pressed={startPolicyImmediately}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = startPolicyImmediately ? "#0270cc" : "rgba(3, 136, 255, 0.35)";
              e.currentTarget.style.color = startPolicyImmediately ? "#0270cc" : "#000822";
              e.currentTarget.style.backgroundColor = startPolicyImmediately ? "rgba(3, 136, 255, 0.12)" : "rgba(3, 136, 255, 0.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = startPolicyImmediately ? "#0388ff" : "rgba(3, 136, 255, 0.2)";
              e.currentTarget.style.color = startPolicyImmediately ? "#0388ff" : "#5a6b7d";
              e.currentTarget.style.backgroundColor = startPolicyImmediately ? "rgba(3, 136, 255, 0.08)" : "transparent";
            }}
          >
            {startPolicyImmediately && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            Start policy immediately
          </button>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetailsForm;
