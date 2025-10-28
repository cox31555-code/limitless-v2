"use client";
import React from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import styles from "./components.module.css";

const CoverDetailsForm = ({ form }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const durationType = form.watch("coverDetails.type");
  const duration = form.watch("coverDetails.period");
  const startDate = form.watch("coverDetails.startDate");
  const startTime = form.watch("coverDetails.startTime");

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

  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.sparkCoverDetails}>
        {/* Duration Section */}
        <div className={styles.sparkSection}>
          <div className={styles.sparkSectionHeader}>
            <h2 className={styles.sparkSectionTitle}>
              How Long Will You Need It?
            </h2>
            <p className={styles.sparkSectionSubtitle}>
              Select your preferred coverage duration
            </p>
          </div>

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

            {/* Duration Value Selection */}
            <div className={styles.sparkDurationContainer}>
              <p className={styles.sparkDurationLabel}>Select Duration</p>
              <div className={styles.sparkDurationGrid}>
                {durationOptions.map((option) => (
                  <button
                    key={option}
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

                {/* Custom Dropdown for more options - only show for Days */}
                {showDropdown && (
                  <div className={styles.sparkDropdownContainer}>
                          <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={styles.sparkDropdownButton}
                          >
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
                          </button>

                          {isDropdownOpen && (
                            <div className={styles.sparkDropdownContent}>
                              {extraDurationOptions.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleDurationChange(option)}
                                  className={styles.sparkDropdownItem}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Start Date/Time Section */}
        <div className={styles.sparkSection}>
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
            <div>
              <label className={styles.sparkInputLabel}>Start Date</label>
              <div className={styles.sparkInputGroup}>
                <svg
                  className={styles.sparkInputIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={startDate || ""}
                  onChange={handleDateChange}
                  className={styles.sparkInput}
                />
              </div>
            </div>

            {/* Start Time */}
            <div>
              <label className={styles.sparkInputLabel}>Start Time</label>
              <div className={styles.sparkInputGroup}>
                <svg
                  className={styles.sparkInputIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <input
                  type="text"
                  placeholder="10:00"
                  value={startTime || ""}
                  onChange={handleTimeChange}
                  className={styles.sparkInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetailsForm;
