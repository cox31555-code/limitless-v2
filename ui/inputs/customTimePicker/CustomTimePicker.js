import React from "react";
import styles from "./customTimePicker.module.css";

const CustomTimePicker = ({ selectedTime, onTimeSelect, onClose, showAbove = false }) => {
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const handleTimeClick = (time) => {
    onTimeSelect(time);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.timePicker}>
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
