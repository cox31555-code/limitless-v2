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

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setDisplayMonth(new Date(year, displayMonth.getMonth()));
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setDisplayMonth(new Date(displayMonth.getFullYear(), month));
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

  const isMonthDisabled = (monthIndex) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const selectedYear = displayMonth.getFullYear();

    // For date of birth (with maxDate), allow months until the maxDate
    if (maxDate) {
      const maxYear = maxDate.getFullYear();
      const maxMonth = maxDate.getMonth();

      if (selectedYear > maxYear) return true;
      if (selectedYear === maxYear && monthIndex > maxMonth) return true;
      return false;
    }

    // Default behavior for future dates
    if (selectedYear < currentYear) return true;
    if (selectedYear === currentYear && monthIndex < currentMonth) return true;
    return false;
  };

  const isYearDisabled = (year) => {
    const today = new Date();

    // For date of birth (with maxDate), allow years up to maxDate year
    if (maxDate) {
      if (year > maxDate.getFullYear()) return true;
      return false;
    }

    // Default behavior for future dates
    if (year < today.getFullYear()) return true;
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [];
  const currentYear = new Date().getFullYear();

  // For date of birth, show years from maxDate year to current year
  if (maxDate) {
    const maxYear = maxDate.getFullYear();
    const startYear = Math.min(maxYear - 50, 1950); // Show 50 years before maxDate, but not before 1950
    for (let i = startYear; i <= currentYear; i++) {
      years.push(i);
    }
  } else {
    // Default: current year minus 5 to current year plus 10 (for future dates)
    for (let i = currentYear - 5; i <= currentYear + 10; i++) {
      years.push(i);
    }
  }

  return (
    <div className={`${styles.calendar} ${showAbove ? styles.slideUp : ""}`}>
      <div className={styles.header}>
        <button
          onClick={handlePrevMonth}
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          type="button"
        >
          <Image
            src="/svg/arrow-down.svg"
            alt="prev"
            width={18}
            height={18}
            style={{ transform: "rotate(90deg)" }}
          />
        </button>

        <div className={styles.monthYearSelector}>
          <select
            value={displayMonth.getMonth()}
            onChange={handleMonthChange}
            className={styles.select}
          >
            {monthNames.map((month, index) => {
              const isDisabled = isMonthDisabled(index);
              return !isDisabled ? (
                <option
                  key={month}
                  value={index}
                >
                  {month}
                </option>
              ) : null;
            })}
          </select>
          <select
            value={displayMonth.getFullYear()}
            onChange={handleYearChange}
            className={styles.select}
          >
            {years.map((year) => {
              const isDisabled = isYearDisabled(year);
              return !isDisabled ? (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ) : null;
            })}
          </select>
        </div>

        <button
          onClick={handleNextMonth}
          className={`${styles.navButton} ${styles.navButtonNext}`}
          type="button"
        >
          <Image
            src="/svg/arrow-down.svg"
            alt="next"
            width={18}
            height={18}
            style={{ transform: "rotate(-90deg)" }}
          />
        </button>
      </div>

      <div className={styles.daysHeader}>
        <div className={styles.dayName}>Sun</div>
        <div className={styles.dayName}>Mon</div>
        <div className={styles.dayName}>Tue</div>
        <div className={styles.dayName}>Wed</div>
        <div className={styles.dayName}>Thu</div>
        <div className={styles.dayName}>Fri</div>
        <div className={styles.dayName}>Sat</div>
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
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomDatePicker;
