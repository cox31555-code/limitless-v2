import React, { useState, useEffect, useRef } from "react";
import styles from "./customTimePicker.module.css";

const CustomTimePicker = ({ selectedTime, onTimeSelect, onClose, showAbove = false, selectedDate = null, minTime = null, maxTime = null }) => {
  const [selectedHour, setSelectedHour] = useState("10");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);

  // Parse selected time on mount
  useEffect(() => {
    if (selectedTime && selectedTime.includes(":")) {
      const [hour, minute] = selectedTime.split(":");
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
  }, [selectedTime]);

  // Scroll to selected time
  useEffect(() => {
    const scrollToSelected = (ref, value, items) => {
      if (ref.current) {
        const index = items.findIndex(item => item === value);
        if (index !== -1) {
          const itemHeight = ref.current.scrollHeight / items.length;
          ref.current.scrollTop = index * itemHeight - ref.current.clientHeight / 2 + itemHeight / 2;
        }
      }
    };

    if (hourScrollRef.current && minuteScrollRef.current) {
      setTimeout(() => {
        scrollToSelected(hourScrollRef, selectedHour, generateHours());
        scrollToSelected(minuteScrollRef, selectedMinute, generateMinutes());
      }, 100);
    }
  }, [selectedHour, selectedMinute]);

  const generateHours = () => {
    const hours = [];
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    const today = new Date();
    const isToday = selectedDateObj && selectedDateObj.toDateString() === today.toDateString();

    for (let i = 0; i < 24; i++) {
      const hourStr = String(i).padStart(2, "0");
      
      // If selected date is today, only show current and future hours
      if (isToday) {
        const currentHour = today.getHours();
        if (i < currentHour) continue;
      }
      
      hours.push(hourStr);
    }
    
    return hours.length > 0 ? hours : ["00"];
  };

  const generateMinutes = () => {
    const minutes = [];
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    const today = new Date();
    const isToday = selectedDateObj && selectedDateObj.toDateString() === today.toDateString();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    for (let i = 0; i < 60; i += 15) {
      const minuteStr = String(i).padStart(2, "0");
      
      // If today and selected hour is current hour, filter past minutes
      if (isToday && parseInt(selectedHour) === currentHour) {
        if (i <= currentMinute) continue;
      }
      
      minutes.push(minuteStr);
    }
    
    return minutes.length > 0 ? minutes : ["00"];
  };

  const hours = generateHours();
  const minutes = generateMinutes();

  const handleSetNow = () => {
    const now = new Date();
    const currentHour = String(now.getHours()).padStart(2, "0");
    const currentMinute = Math.ceil(now.getMinutes() / 15) * 15;
    const roundedMinute = currentMinute >= 60 ? "00" : String(currentMinute).padStart(2, "0");
    
    setSelectedHour(currentHour);
    setSelectedMinute(roundedMinute);
  };

  const handleOk = () => {
    const timeString = `${selectedHour}:${selectedMinute}`;
    onTimeSelect(timeString);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`${styles.timePicker} ${showAbove ? styles.slideUp : ""}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Select time</h3>
      </div>

      <div className={styles.timeColumns}>
        <div className={styles.column}>
          <div className={styles.columnHeader}>Hours</div>
          <div className={styles.scrollContainer} ref={hourScrollRef}>
            {hours.map((hour) => (
              <button
                key={hour}
                type="button"
                onClick={() => setSelectedHour(hour)}
                className={`${styles.timeOption} ${
                  selectedHour === hour ? styles.timeOptionSelected : ""
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.separator}>:</div>

        <div className={styles.column}>
          <div className={styles.columnHeader}>Minutes</div>
          <div className={styles.scrollContainer} ref={minuteScrollRef}>
            {minutes.map((minute) => (
              <button
                key={minute}
                type="button"
                onClick={() => setSelectedMinute(minute)}
                className={`${styles.timeOption} ${
                  selectedMinute === minute ? styles.timeOptionSelected : ""
                }`}
              >
                {minute}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.nowButton}
          onClick={handleSetNow}
        >
          Now
        </button>
        <button
          type="button"
          className={styles.okButton}
          onClick={handleOk}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomTimePicker;
