import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./customDatePicker.module.css";

const CustomDatePicker = ({ selectedDate, onDateSelect, minDate, maxDate, showAbove = false, defaultYear = null }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) return selectedDate;
    if (defaultYear) return new Date(defaultYear, 0, 1);
    return new Date();
  });
  const [displayMonth, setDisplayMonth] = useState(new Date(currentMonth));

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate);
      setDisplayMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    const selectedDateObj = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );

    if (minDate && selectedDateObj < minDate) return;
    if (maxDate && selectedDateObj > maxDate) return;

    setCurrentMonth(selectedDateObj);
    onDateSelect(selectedDateObj);
  };

  const handleTodayClick = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setDisplayMonth(new Date(today));
    setCurrentMonth(today);
    onDateSelect(today);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setDisplayMonth(new Date(tomorrow));
    setCurrentMonth(tomorrow);
    onDateSelect(tomorrow);
  };

  const isDateDisabled = (day) => {
    const dateObj = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    if (minDate && dateObj < minDate) return true;
    if (maxDate && dateObj > maxDate) return true;

    // Only disable past dates if maxDate is not set (i.e., not for DOB)
    if (!maxDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isBeforeToday = dateObj < today;
      if (isBeforeToday) return true;
    }

    return false;
  };

  const isDateSelected = (day) => {
    if (!currentMonth) return false;
    return (
      day === currentMonth.getDate() &&
      displayMonth.getMonth() === currentMonth.getMonth() &&
      displayMonth.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      displayMonth.getMonth() === today.getMonth() &&
      displayMonth.getFullYear() === today.getFullYear()
    );
  };

  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDay = getFirstDayOfMonth(displayMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={`${styles.calendar} ${showAbove ? styles.slideUp : ""}`}>
      <div className={styles.header}>
        <button
          onClick={handlePrevMonth}
          className={styles.navButton}
          type="button"
          aria-label="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className={styles.monthYearDisplay}>
          {monthNames[displayMonth.getMonth()]} {displayMonth.getFullYear()}
        </div>

        <button
          onClick={handleNextMonth}
          className={styles.navButton}
          type="button"
          aria-label="Next month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className={styles.daysHeader}>
        {weekDays.map((day) => (
          <div key={day} className={styles.dayName}>{day}</div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {days.map((day, index) => (
          <button
            key={index}
            type="button"
            onClick={() => day && !isDateDisabled(day) && handleDateClick(day)}
            className={`${styles.day} ${
              day && isDateSelected(day) ? styles.selected : ""
            } ${day && isToday(day) ? styles.today : ""} ${
              day && isDateDisabled(day) ? styles.disabled : ""
            }`}
            disabled={!day || isDateDisabled(day)}
          >
            {day || ""}
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.todayButton}
          onClick={handleTodayClick}
        >
          Today
        </button>
        <button
          type="button"
          className={styles.tomorrowButton}
          onClick={handleTomorrowClick}
        >
          Tomorrow
        </button>
      </div>
    </div>
  );
};

export default CustomDatePicker;
