import Image from "next/image";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import CustomDatePicker from "./customDatePicker/CustomDatePicker";
import CustomTimePicker from "./customTimePicker/CustomTimePicker";
import styles from "./textInput/textInput.module.css";

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
      isDateOfBirth = false,
      minDate = null,
      maxDate = null,
      forceShowAbove = false,
      defaultYear = null,
      reducedPadding = false,
      relatedDateValue = null,
      disabled = false,
      minTime = null,
      maxTime = null,
      ...props
    },
    ref
  ) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [pickerPosition, setPickerPosition] = useState({
      top: "auto",
      bottom: "auto",
      left: "auto",
      showAbove: false,
    });
    const inputContainerRef = useRef(null);
    const datePickerRef = useRef(null);
    const timePickerRef = useRef(null);

    // Detect mobile on mount and on resize
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 900);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Parse date string to Date object, handling timezone issues
    const calculatePickerPosition = () => {
      if (!inputContainerRef.current) return;

      const rect = inputContainerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const pickerHeight = 400; // Approximate height of pickers
      const pickerWidth = Math.min(320, window.innerWidth - 32); // Max 320px or viewport minus padding

      // Check if we're inside a modal by looking for overflow:auto parent
      let isInsideModal = false;
      let element = inputContainerRef.current;
      while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflow === 'auto' || style.overflow === 'scroll') {
          isInsideModal = true;
          break;
        }
        element = element.parentElement;
      }

      // Calculate optimal left position to keep picker within viewport
      let leftPos = rect.left;
      const pickerRightEdge = leftPos + pickerWidth;

      if (pickerRightEdge > window.innerWidth) {
        // Adjust left to keep picker within viewport
        leftPos = Math.max(16, window.innerWidth - pickerWidth - 16);
      }

      // For modals, position relative to input; for normal flow, position relative to viewport
      if (isInsideModal) {
        // Inside modal: use absolute positioning relative to input
        leftPos = 0; // Position from the input's left edge
        if (forceShowAbove) {
          setPickerPosition({
            top: "auto",
            bottom: `${rect.height + 12}px`,
            left: `${leftPos}px`,
            showAbove: true,
            isAbsolute: true,
          });
        } else if (spaceBelow < pickerHeight) {
          // Show above
          setPickerPosition({
            top: "auto",
            bottom: `${rect.height + 12}px`,
            left: `${leftPos}px`,
            showAbove: true,
            isAbsolute: true,
          });
        } else {
          // Show below
          setPickerPosition({
            top: `${rect.height + 12}px`,
            bottom: "auto",
            left: `${leftPos}px`,
            showAbove: false,
            isAbsolute: true,
          });
        }
      } else {
        // Normal flow: use fixed positioning
        if (forceShowAbove) {
          // Always show above when forceShowAbove is true
          setPickerPosition({
            top: "auto",
            bottom: `${window.innerHeight - rect.top + 12}px`,
            left: `${leftPos}px`,
            showAbove: true,
            isAbsolute: false,
          });
        } else if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
          // Show above
          setPickerPosition({
            top: "auto",
            bottom: `${window.innerHeight - rect.top + 12}px`,
            left: `${leftPos}px`,
            showAbove: true,
            isAbsolute: false,
          });
        } else {
          // Show below (default)
          setPickerPosition({
            top: `${rect.bottom + 12}px`,
            bottom: "auto",
            left: `${leftPos}px`,
            showAbove: false,
            isAbsolute: false,
          });
        }
      }
    };

    useEffect(() => {
      if (showDatePicker || showTimePicker) {
        calculatePickerPosition();

        const handleClickOutside = (e) => {
          // On mobile, only close when clicking the overlay
          if (isMobile) {
            const isClickOnOverlay = e.target.className && e.target.className.includes('modalOverlay');
            if (isClickOnOverlay) {
              setShowDatePicker(false);
              setShowTimePicker(false);
              document.body.style.overflow = "unset";
            }
          } else {
            // On desktop, close on click outside
            const isClickInsideInput = inputContainerRef.current && inputContainerRef.current.contains(e.target);
            const isClickInsideDatePicker = datePickerRef.current && datePickerRef.current.contains(e.target);
            const isClickInsideTimePicker = timePickerRef.current && timePickerRef.current.contains(e.target);

            if (!isClickInsideInput && !isClickInsideDatePicker && !isClickInsideTimePicker) {
              setShowDatePicker(false);
              setShowTimePicker(false);
              document.body.style.overflow = "unset";
            }
          }
        };

        window.addEventListener("scroll", calculatePickerPosition);
        window.addEventListener("resize", calculatePickerPosition);
        document.addEventListener("click", handleClickOutside);

        return () => {
          window.removeEventListener("scroll", calculatePickerPosition);
          window.removeEventListener("resize", calculatePickerPosition);
          document.removeEventListener("click", handleClickOutside);
        };
      }
    }, [showDatePicker, showTimePicker, isMobile]);

    const parseDate = (dateString) => {
      if (!dateString) return null;
      try {
        // Handle both YYYY-MM-DD and DD/MM/YYYY formats
        if (dateString.includes("/")) {
          const [day, month, year] = dateString.split("/");
          return new Date(year, month - 1, day);
        } else {
          // For YYYY-MM-DD format, create date without timezone issues
          const [year, month, day] = dateString.split("-");
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

    const openDatePicker = () => {
      // Don't open picker if disabled or on mobile (use native)
      if (disabled || isMobile) return;
      setShowDatePicker(true);
    };

    const closeDatePicker = () => {
      setShowDatePicker(false);
      document.body.style.overflow = "unset";
    };

    const openTimePicker = () => {
      // Don't open custom picker on mobile (use native)
      if (isMobile) return;
      setShowTimePicker(true);
    };

    const closeTimePicker = () => {
      setShowTimePicker(false);
      document.body.style.overflow = "unset";
    };

    // Get today's date for restrictions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date picker component
    if (type === "date") {
      const handleNativeDateChange = (e) => {
        // Convert YYYY-MM-DD to our format
        const syntheticEvent = {
          target: {
            name: name,
            value: e.target.value,
          },
        };
        if (onChange) {
          onChange(syntheticEvent);
        }
      };

      const formatDateForNative = (date) => {
        if (!date) return undefined;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      return (
        <>
          <div className={styles.formInputGroup}>
            {dateLabel && <label className={styles.formInputLabel}>{dateLabel}</label>}

            <div
              className={`${styles.formInputWrapper}`}
              ref={inputContainerRef}
            >
              {isMobile ? (
                <input
                  ref={ref}
                  name={name}
                  type="date"
                  value={value || ""}
                  onChange={handleNativeDateChange}
                  onBlur={onBlur}
                  disabled={disabled}
                  min={minDate ? formatDateForNative(minDate) : undefined}
                  max={maxDate ? formatDateForNative(maxDate) : undefined}
                  className={`${styles.formInput} ${error ? styles.formInputError : ""}`}
                  style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    colorScheme: 'dark'
                  }}
                  {...props}
                />
              ) : (
                <input
                  ref={ref}
                  name={name}
                  value={formatDateDisplay(value) || ""}
                  onChange={() => {}} // Dummy onChange to satisfy React
                  placeholder="DD/MM/YYYY"
                  className={`${styles.formInput} ${error ? styles.formInputError : ""} ${disabled ? styles.formInputDisabled : ''}`}
                  type="text"
                  readOnly
                  onClick={openDatePicker}
                  onBlur={onBlur}
                  disabled={disabled}
                  style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                  {...props}
                />
              )}
            </div>

            {error && (
              <span className={styles.formInputErrorMsg}>
                {error.message || error}
              </span>
            )}
          </div>

          {!isMobile && showDatePicker && (
            <div ref={datePickerRef} style={{
              position: pickerPosition.isAbsolute ? 'absolute' : 'fixed',
              top: pickerPosition.top !== 'auto' ? pickerPosition.top : undefined,
              bottom: pickerPosition.bottom !== 'auto' ? pickerPosition.bottom : undefined,
              left: pickerPosition.left,
              zIndex: 99999,
              pointerEvents: 'auto'
            }}>
              <CustomDatePicker
                selectedDate={parseDate(value)}
                onDateSelect={handleDateSelect}
                minDate={minDate || (allowPastDates ? null : today)}
                maxDate={maxDate}
                showAbove={pickerPosition.showAbove}
                defaultYear={defaultYear}
              />
            </div>
          )}
        </>
      );
    }

    // Time picker component
    if (type === "time") {
      const isTimeDisabled = disabled || !relatedDateValue;

      const handleTimeSelect = (timeString) => {
        if (isTimeDisabled) return;
        const syntheticEvent = {
          target: {
            name: name,
            value: timeString,
          },
        };
        if (onChange) {
          onChange(syntheticEvent);
        }
        closeTimePicker();
      };

      const handleNativeTimeChange = (e) => {
        if (isTimeDisabled) return;
        if (onChange) {
          onChange(e);
        }
      };

      return (
        <>
          <div className={styles.formInputGroup}>
            {timeLabel && <label className={styles.formInputLabel}>{timeLabel}</label>}

            <div
              className={styles.formInputWrapper}
              ref={inputContainerRef}
            >
              {isMobile ? (
                <input
                  ref={ref}
                  name={name}
                  type="time"
                  value={value || ""}
                  onChange={handleNativeTimeChange}
                  onBlur={onBlur}
                  step="900"
                  disabled={isTimeDisabled}
                  className={`${styles.formInput} ${error ? styles.formInputError : ""} ${isTimeDisabled ? styles.formInputDisabled : ''}`}
                  style={{
                    cursor: isTimeDisabled ? 'not-allowed' : 'pointer',
                    colorScheme: 'dark'
                  }}
                />
              ) : (
                <input
                  ref={ref}
                  name={name}
                  value={value || ""}
                  onChange={() => {}}
                  placeholder="--:--"
                  className={`${styles.formInput} ${error ? styles.formInputError : ""} ${isTimeDisabled ? styles.formInputDisabled : ''}`}
                  type="text"
                  readOnly
                  onClick={isTimeDisabled ? undefined : openTimePicker}
                  onBlur={onBlur}
                  disabled={isTimeDisabled}
                  style={{ cursor: isTimeDisabled ? 'not-allowed' : 'pointer' }}
                />
              )}
            </div>

            {error && (
              <span className={styles.formInputErrorMsg}>
                {error.message || error}
              </span>
            )}
          </div>

          {!isMobile && showTimePicker && !isTimeDisabled && (
            <div ref={timePickerRef} style={{
              position: pickerPosition.isAbsolute ? 'absolute' : 'fixed',
              top: pickerPosition.top !== 'auto' ? pickerPosition.top : undefined,
              bottom: pickerPosition.bottom !== 'auto' ? pickerPosition.bottom : undefined,
              left: pickerPosition.left,
              zIndex: 99999,
              pointerEvents: 'auto'
            }}>
              <CustomTimePicker
                selectedTime={value || "10:00"}
                selectedDate={relatedDateValue}
                onTimeSelect={handleTimeSelect}
                onClose={closeTimePicker}
                showAbove={pickerPosition.showAbove}
                minTime={minTime}
                maxTime={maxTime}
              />
            </div>
          )}
        </>
      );
    }

    return null;
  }
);

FormDateInput.displayName = "FormDateInput";

export default FormDateInput;
