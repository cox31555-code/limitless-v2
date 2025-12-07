"use client";

import React from "react";
import styles from "./dashboardDropdown.module.css";

const DashboardDropdown = ({
  label,
  selected,
  options = [],
  setSelected,
  placeholder = "Select an option",
  disabled = false,
  isLoading = false,
  showSearch = false,
  error,
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value && value !== "") {
      setSelected(value);
    }
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={`${styles.dropdown} ${disabled ? styles.dropdownDisabled : ""} ${
          error ? styles.dropdownError : ""
        }`}
        value={selected || ""}
        onChange={handleChange}
        disabled={disabled || isLoading}
      >
        <option value="" disabled>
          {isLoading ? "Loading..." : placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default DashboardDropdown;
