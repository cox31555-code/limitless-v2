"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./dashboardDropdown.module.css";

const DashboardDropdown = ({
  label,
  selected,
  options,
  setSelected,
  placeholder,
  error,
  disabled,
  isLoading = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Detect mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled && !isLoading) {
      if (isMobile) {
        // On mobile, trigger the hidden native select
        const nativeSelect = dropdownRef.current?.querySelector('select');
        if (nativeSelect) {
          nativeSelect.focus();
          nativeSelect.click();
        }
      } else {
        setIsOpen(!isOpen);
      }
    }
  };

  const handleNativeChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}

      {/* Hidden native select for mobile */}
      {isMobile && (
        <select
          className={styles.hiddenNativeSelect}
          value={selected || ""}
          onChange={handleNativeChange}
          disabled={disabled || isLoading}
        >
          <option value="" disabled>
            {placeholder || "Select..."}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      <div
        className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""} ${
          error ? styles.dropdownError : ""
        } ${disabled || isLoading ? styles.dropdownDisabled : ""}`}
        onClick={handleToggle}
      >
        <span className={`${styles.selected} ${!selected ? styles.placeholder : ""}`}>
          {isLoading ? "Loading..." : selected || placeholder || "Select..."}
        </span>
        <svg
          className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ""} ${isLoading ? styles.arrowIconLoading : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {isOpen && !disabled && !isLoading && !isMobile && (
          <div
            className={styles.dropdownMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.optionsList}>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.option} ${
                    selected === option ? styles.optionSelected : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span className={styles.optionText}>{option}</span>
                  {selected === option && (
                    <svg
                      className={styles.checkIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8L6.5 11.5L13 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error.message || error}</span>}
    </div>
  );
};

export default DashboardDropdown;
