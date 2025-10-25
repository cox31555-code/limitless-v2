import Image from "next/image";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import CustomDatePicker from "./customDatePicker/CustomDatePicker";
import CustomTimePicker from "./customTimePicker/CustomTimePicker";
import styles from "./selections/dataAndTime/dataAndTime.module.css";

const FormDateInput = forwardRef(
  (
    {
      dateLabel,
      timeLabel,
      error,
      type = "date",
      name,
      onChange,
      onBlur,
      value,
      allowPastDates = false,
      ...props
    },
    ref
  ) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [pickerPosition, setPickerPosition] = useState({
      top: "auto",
      bottom: "auto",
      showAbove: false,
    });
    const inputContainerRef = useRef(null);

    // Parse date string to Date object, handling timezone issues
    const parseDate = (dateString) => {
      if (!dateString) return null;
      try {
        // Handle both YYYY-MM-DD and DD/MM/YYYY formats
        if (dateString.includes("/")) {
          const [day, month, year] = dateString.split("/");
          console.log(day, month, year);
          return new Date(year, month - 1, day);

        } else {
          // For YYYY-MM-DD format, create date without timezone issues
          const [year, month, day] = dateString.split("-");
          console.log(year, month, day);
          return new Date(year, month - 1, day);
        }
      } catch (error) {
        return null;
      }
    };

    // Format date for display (DD/MM/YYYY)
    const formatDateDisplay = (dateString) => {
      if (!dateString) return "";
      const date = parseDate(dateString);
      if (!date) return "";

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Format date for form submission (YYYY-MM-DD)
    const formatDateForSubmission = (date) => {
      if (!date) return "";
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };


    const handleDateSelect = (date) => {
      if (!date) return;

      // Check date restrictions
      if (!allowPastDates) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) {
          return; // Don't allow past dates unless explicitly allowed
        }
      }

      const formattedDate = formatDateForSubmission(date);

      // Create synthetic event for React Hook Form
      const syntheticEvent = {
        target: {
          name: name,
          value: formattedDate,
        },
      };

      if (onChange) {
        onChange(syntheticEvent);
      }
      setShowDatePicker(false);
    };

    const handleTimeContainerClick = () => {
      if (timeInputRef.current) {
        timeInputRef.current.focus();
        timeInputRef.current.click();
      }
    };

    const openDatePicker = () => setShowDatePicker(true);
    const closeDatePicker = () => setShowDatePicker(false);

    // Get today's date for restrictions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date picker component
    if (type === "date") {
      return (
        <div className={styles.container}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dateLabel}</label>

            <div className={styles.inputContainer} onClick={openDatePicker}>
              <div className={styles.iconContainer}>
                <Image
                  src="/svg/date.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                  className={styles.icon}
                />
              </div>
              <input
                ref={ref}
                name={name}
                value={formatDateDisplay(value) || ""}
                onChange={() => {}} // Dummy onChange to satisfy React
                placeholder="DD/MM/YYYY"
                className={styles.input}
                type="text"
                readOnly
                onBlur={onBlur}
                {...props}
              />
              <Image
                src="/svg/arrow-down.svg"
                alt="arrow-down"
                width={24}
                height={24}
                className={styles.arrowDown}
              />
            </div>

            {showDatePicker && (
              <div className={styles.datePickerWrapper}>
                <CustomDatePicker
                  selectedDate={parseDate(value)}
                  onDateSelect={handleDateSelect}
                  minDate={allowPastDates ? null : today}
                  maxDate={
                    allowPastDates && dateLabel === "Date of Birth"
                      ? new Date(2010, 11, 31)
                      : null
                  }
                />
              </div>
            )}

            {error && (
              <span
                className={styles.error}
                style={{
                  color: "#ef4444",
                  fontSize: "1.2rem",
                  marginTop: "0.5rem",
                }}
              >
                {error.message}
              </span>
            )}
          </div>
        </div>
      );
    }

    // Time picker component
    if (type === "time") {
      const handleTimeSelect = (timeString) => {
        const syntheticEvent = {
          target: {
            name: name,
            value: timeString,
          },
        };
        if (onChange) {
          onChange(syntheticEvent);
        }
      };

      const openTimePicker = () => setShowTimePicker(true);
      const closeTimePicker = () => setShowTimePicker(false);

      return (
        <div className={styles.container}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{timeLabel}</label>

            <div
              className={styles.inputContainer}
              onClick={openTimePicker}
            >
              <div className={styles.iconContainer}>
                <Image
                  src="/svg/time.svg"
                  alt="time"
                  width={24}
                  height={24}
                  className={styles.icon}
                />
              </div>
              <input
                ref={ref}
                name={name}
                value={value || ""}
                onChange={() => {}}
                placeholder="--:--"
                className={styles.input}
                type="text"
                readOnly
                onBlur={onBlur}
              />
              <Image
                src="/svg/arrow-down.svg"
                alt="arrow-down"
                width={24}
                height={24}
                className={styles.arrowDown}
              />
            </div>

            {showTimePicker && (
              <div className={styles.timePickerWrapper} onClick={(e) => e.stopPropagation()}>
                <CustomTimePicker
                  selectedTime={value || "10:00"}
                  onTimeSelect={(timeString) => {
                    handleTimeSelect(timeString);
                    closeTimePicker();
                  }}
                />
              </div>
            )}

            {error && (
              <span
                className={styles.error}
                style={{
                  color: "#ef4444",
                  fontSize: "1.2rem",
                  marginTop: "0.5rem",
                }}
              >
                {error.message}
              </span>
            )}
          </div>
        </div>
      );
    }

    return null;
  }
);

FormDateInput.displayName = "FormDateInput";

export default FormDateInput;
