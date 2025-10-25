import React, { useState, useEffect, useRef } from "react";
import styles from "./customTimePicker.module.css";

const CustomTimePicker = ({ selectedTime, onTimeSelect, onClose }) => {
  const [hours, setHours] = useState(() => {
    if (selectedTime) {
      const [h] = selectedTime.split(":");
      return h;
    }
    return "10";
  });
  const [minutes, setMinutes] = useState(() => {
    if (selectedTime) {
      const [, m] = selectedTime.split(":");
      return m;
    }
    return "00";
  });

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  useEffect(() => {
    if (selectedTime) {
      const [h, m] = selectedTime.split(":");
      setHours(h);
      setMinutes(m);
    }
  }, [selectedTime]);

  const handleSetTime = () => {
    onTimeSelect(`${hours}:${minutes}`);
    if (onClose) {
      onClose();
    }
  };

  const handleHourChange = (e) => {
    let value = e.target.value;
    if (value > 23) value = "23";
    if (value < 0) value = "0";
    value = String(parseInt(value) || 0).padStart(2, "0");
    setHours(value);
  };

  const handleMinuteChange = (e) => {
    let value = e.target.value;
    if (value > 59) value = "59";
    if (value < 0) value = "0";
    value = String(parseInt(value) || 0).padStart(2, "0");
    setMinutes(value);
  };

  const handleIncrementHour = () => {
    let newHour = parseInt(hours) + 1;
    if (newHour > 23) newHour = 0;
    const formattedHour = String(newHour).padStart(2, "0");
    setHours(formattedHour);
  };

  const handleDecrementHour = () => {
    let newHour = parseInt(hours) - 1;
    if (newHour < 0) newHour = 23;
    const formattedHour = String(newHour).padStart(2, "0");
    setHours(formattedHour);
  };

  const handleIncrementMinute = () => {
    let newMinute = parseInt(minutes) + 15;
    if (newMinute > 59) newMinute = 0;
    const formattedMinute = String(newMinute).padStart(2, "0");
    setMinutes(formattedMinute);
  };

  const handleDecrementMinute = () => {
    let newMinute = parseInt(minutes) - 15;
    if (newMinute < 0) newMinute = 45;
    const formattedMinute = String(newMinute).padStart(2, "0");
    setMinutes(formattedMinute);
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minuteOptions = ["00", "15", "30", "45"];

  return (
    <div className={styles.timePicker}>
      <div className={styles.timeInput}>
        <div className={styles.timeUnit}>
          <label className={styles.label}>Hours</label>
          <div className={styles.inputGroup}>
            <button
              type="button"
              onClick={handleDecrementHour}
              className={styles.button}
              aria-label="Decrease hour"
            >
              −
            </button>
            <input
              ref={hoursRef}
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={handleHourChange}
              className={styles.input}
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={handleIncrementHour}
              className={styles.button}
              aria-label="Increase hour"
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.separator}>:</div>

        <div className={styles.timeUnit}>
          <label className={styles.label}>Minutes</label>
          <div className={styles.inputGroup}>
            <button
              type="button"
              onClick={handleDecrementMinute}
              className={styles.button}
              aria-label="Decrease minute"
            >
              −
            </button>
            <input
              ref={minutesRef}
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={handleMinuteChange}
              className={styles.input}
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={handleIncrementMinute}
              className={styles.button}
              aria-label="Increase minute"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className={styles.presets}>
        <button
          type="button"
          onClick={() => {
            setHours("10");
            setMinutes("00");
          }}
          className={`${styles.preset} ${
            hours === "10" && minutes === "00" ? styles.presetSelected : ""
          }`}
        >
          10:00
        </button>
        <button
          type="button"
          onClick={() => {
            setHours("12");
            setMinutes("00");
          }}
          className={`${styles.preset} ${
            hours === "12" && minutes === "00" ? styles.presetSelected : ""
          }`}
        >
          12:00
        </button>
        <button
          type="button"
          onClick={() => {
            setHours("14");
            setMinutes("00");
          }}
          className={`${styles.preset} ${
            hours === "14" && minutes === "00" ? styles.presetSelected : ""
          }`}
        >
          14:00
        </button>
        <button
          type="button"
          onClick={() => {
            setHours("16");
            setMinutes("00");
          }}
          className={`${styles.preset} ${
            hours === "16" && minutes === "00" ? styles.presetSelected : ""
          }`}
        >
          16:00
        </button>
        <button
          type="button"
          onClick={() => {
            setHours("18");
            setMinutes("00");
          }}
          className={`${styles.preset} ${
            hours === "18" && minutes === "00" ? styles.presetSelected : ""
          }`}
        >
          18:00
        </button>
        <button
          type="button"
          onClick={() => {
            setHours("20");
            setMinutes("00");
          }}
          className={`${styles.preset} ${
            hours === "20" && minutes === "00" ? styles.presetSelected : ""
          }`}
        >
          20:00
        </button>
      </div>

      <button type="button" onClick={handleSetTime} className={styles.setButton}>
        Set Time
      </button>
    </div>
  );
};

export default CustomTimePicker;
