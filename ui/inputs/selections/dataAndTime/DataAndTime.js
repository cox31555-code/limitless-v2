import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./dataAndTime.module.css";
const DataAndTime = ({
  data,
  setData,
  dateLabel,
  timeLabel,
  dateKey,
  timeKey,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    data.date ? new Date(data.date) : null
  );

  // Generate time slots in 15-minute increments
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        slots.push(`${hourStr}:${minuteStr}`);
      }
    }
    return slots;
  };

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  // Check if a time slot is in the past
  const isTimeSlotPast = (timeSlot) => {
    if (!data.date) return false;
    
    const today = new Date();
    const selectedDateObj = selectedDate || new Date(data.date.split('/').reverse().join('-'));
    
    // Only disable past times if the selected date is today
    const isToday = 
      selectedDateObj.getDate() === today.getDate() &&
      selectedDateObj.getMonth() === today.getMonth() &&
      selectedDateObj.getFullYear() === today.getFullYear();
    
    if (!isToday) return false;
    
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    
    return slotTime < today;
  };

  // Close time picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTimePicker && !event.target.closest(`.${styles.inputGroup}`)) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTimePicker]);

  const handleDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return;
    }

    setSelectedDate(date);
    const formattedDate = date ? date.toLocaleDateString("en-GB") : "";
    setData({ ...data, date: formattedDate });
    setShowDatePicker(false);
    
    // Reset time if the selected time is now in the past
    if (data.time && isTimeSlotPast(data.time)) {
      setData({ ...data, date: formattedDate, time: "" });
    }
  };

  const handleDateIconClick = () => {
    setShowDatePicker(true);
  };

  const handleTimeContainerClick = () => {
    if (!data.date) {
      return; // Don't open time picker if no date is selected
    }
    setShowTimePicker(!showTimePicker);
  };

  const handleTimeSelect = (time) => {
    if (!isTimeSlotPast(time)) {
      setData({ ...data, time });
      setShowTimePicker(false);
    }
  };

  return (
    <div className={styles.container}>
      {dateLabel && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>{dateLabel}</label>
          <div className={styles.inputContainer} onClick={handleDateIconClick}>
            <input
              value={data.date || ""}
              type="text"
              placeholder="DD/MM/YYYY"
              className={styles.input}
              readOnly
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
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                calendarClassName={styles.customCalendar}
                onClickOutside={() => setShowDatePicker(false)}
                minDate={new Date()}
                filterDate={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date >= today;
                }}
              />
            </div>
          )}
        </div>
      )}
      {timeLabel && (
        <div className={styles.inputGroup}>
          <label className={styles.label}>{timeLabel}</label>
          <div
            className={`${styles.inputContainer} ${!data.date ? styles.disabled : ''}`}
            onClick={handleTimeContainerClick}
          >
            <input
              value={data.time || ""}
              type="text"
              placeholder={data.date ? "--:--" : "Select date first"}
              className={styles.input}
              readOnly
            />
            <Image
              src="/svg/arrow-down.svg"
              alt="arrow-down"
              width={24}
              height={24}
              className={`${styles.arrowDown} ${showTimePicker ? styles.arrowUp : ''}`}
            />
          </div>
          {showTimePicker && data.date && (
            <div className={styles.timePickerWrapper}>
              <div className={styles.timePickerContainer}>
                {timeSlots.map((timeSlot) => {
                  const isPast = isTimeSlotPast(timeSlot);
                  const isSelected = data.time === timeSlot;
                  return (
                    <div
                      key={timeSlot}
                      className={`${styles.timeSlot} ${
                        isPast ? styles.timeSlotDisabled : ''
                      } ${isSelected ? styles.timeSlotSelected : ''}`}
                      onClick={() => handleTimeSelect(timeSlot)}
                    >
                      {timeSlot}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataAndTime;
