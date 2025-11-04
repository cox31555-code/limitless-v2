import React from "react";
import styles from "./customTimePicker.module.css";

const CustomTimePicker = ({ selectedTime, onTimeSelect, onClose, showAbove = false, selectedDate = null }) => {
  // Generate 15-minute increments for 24 hours
  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parse selected date if provided
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    const isToday = selectedDateObj && selectedDateObj.toDateString() === today.toDateString();

    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

        // If selected date is today, only show future times
        if (isToday) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();

          // Skip if this time is in the past
          if (hours < currentHour || (hours === currentHour && minutes <= currentMinute)) {
            continue;
          }
        }

        slots.push(timeStr);
      }
    }

    // If no future times today, start from midnight tomorrow
    if (isToday && slots.length === 0) {
      for (let hours = 0; hours < 24; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 15) {
          const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
          slots.push(timeStr);
        }
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeClick = (time) => {
    onTimeSelect(time);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`${styles.timePicker} ${showAbove ? styles.slideUp : ""}`}>
      <div className={styles.timeGrid}>
        {timeSlots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => handleTimeClick(time)}
            className={`${styles.timeSlot} ${
              selectedTime === time ? styles.timeSlotSelected : ""
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomTimePicker;
