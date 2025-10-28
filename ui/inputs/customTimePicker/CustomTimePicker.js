import React from "react";
import styles from "./customTimePicker.module.css";

const CustomTimePicker = ({ selectedTime, onTimeSelect, onClose }) => {
  // Generate time slots for every 30 minutes
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        slots.push(timeString);
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
    <div className={styles.timePicker}>
      <div className={styles.presets}>
        {timeSlots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => handleTimeClick(time)}
            className={`${styles.preset} ${
              selectedTime === time ? styles.presetSelected : ""
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
