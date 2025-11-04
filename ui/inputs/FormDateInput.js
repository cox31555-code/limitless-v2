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
      isDateOfBirth = false,
      minDate = null,
      maxDate = null,
      forceShowAbove = false,
      defaultYear = null,
      reducedPadding = false,
      relatedDateValue = null,
      disabled = false,
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

      // Calculate optimal left position to keep picker within viewport
      let leftPos = rect.left;
      const pickerRightEdge = leftPos + pickerWidth;

      if (pickerRightEdge > window.innerWidth) {
        // Adjust left to keep picker within viewport
        leftPos = Math.max(16, window.innerWidth - pickerWidth - 16);
      }

      if (forceShowAbove) {
        // Always show above when forceShowAbove is true
        setPickerPosition({
          top: "auto",
          bottom: `${window.innerHeight - rect.top + 12}px`,
          left: `${leftPos}px`,
          showAbove: true,
        });
      } else if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
        // Show above
        setPickerPosition({
          top: "auto",
          bottom: `${window.innerHeight - rect.top + 12}px`,
          left: `${leftPos}px`,
          showAbove: true,
        });
      } else {
        // Show below (default)
        setPickerPosition({
          top: `${rect.bottom + 12}px`,
          bottom: "auto",
          left: `${leftPos}px`,
          showAbove: false,
        });
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

    const openDatePicker = () => {
      // Don't open picker if disabled
      if (disabled) return;
      setShowDatePicker(true);
      // Prevent body scroll when picker is open on mobile
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
    };

    const closeDatePicker = () => {
      setShowDatePicker(false);
      document.body.style.overflow = "unset";
    };

    const openTimePicker = () => {
      setShowTimePicker(true);
      // Prevent body scroll when picker is open on mobile
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
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
      return (
        <>
          <div className={styles.container}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>{dateLabel}</label>

              <div
                className={`${styles.inputContainer} ${disabled ? styles.disabled : ''}`}
                onClick={openDatePicker}
                ref={inputContainerRef}
                style={reducedPadding ? { paddingLeft: '0.6rem' } : {}}
              >
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

          {showDatePicker && isMobile && (
            <div
              className={styles.modalOverlay}
              onClick={closeDatePicker}
            />
          )}
          {showDatePicker && (
            <div className={styles.pickerContainer} ref={datePickerRef} style={{
              position: 'fixed',
              top: isMobile ? '50%' : (pickerPosition.top !== 'auto' ? pickerPosition.top : undefined),
              bottom: isMobile ? 'auto' : (pickerPosition.bottom !== 'auto' ? pickerPosition.bottom : undefined),
              left: isMobile ? '50%' : pickerPosition.left,
              right: isMobile ? 'auto' : 'auto',
              transform: isMobile ? 'translate(-50%, -50%)' : 'none',
              zIndex: 99999
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
        closeTimePicker();
      };


      return (
        <>
          <div className={styles.container}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>{timeLabel}</label>

              <div
                className={styles.inputContainer}
                onClick={openTimePicker}
                ref={inputContainerRef}
                style={reducedPadding ? { paddingLeft: '0.7rem' } : {}}
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

          {showTimePicker && isMobile && (
            <div
              className={styles.modalOverlay}
              onClick={closeTimePicker}
            />
          )}
          {showTimePicker && (
            <div className={styles.pickerContainer} ref={timePickerRef} style={{
              position: 'fixed',
              top: isMobile ? '50%' : (pickerPosition.top !== 'auto' ? pickerPosition.top : undefined),
              bottom: isMobile ? 'auto' : (pickerPosition.bottom !== 'auto' ? pickerPosition.bottom : undefined),
              left: isMobile ? '50%' : pickerPosition.left,
              right: isMobile ? 'auto' : 'auto',
              transform: isMobile ? 'translate(-50%, -50%)' : 'none',
              zIndex: 99999
            }}>
              <CustomTimePicker
                selectedTime={value || "10:00"}
                selectedDate={relatedDateValue}
                onTimeSelect={handleTimeSelect}
                onClose={closeTimePicker}
                showAbove={pickerPosition.showAbove}
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
