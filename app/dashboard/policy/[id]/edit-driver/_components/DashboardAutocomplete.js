"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./dashboardAutocomplete.module.css";

const DashboardAutocomplete = ({ 
  selected, 
  options, 
  setSelected, 
  placeholder, 
  error, 
  disabled 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selected || "");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Update input value when selected changes externally
  useEffect(() => {
    setInputValue(selected || "");
  }, [selected]);

  // Filter options based on input value
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset to selected value if clicking outside
        setInputValue(selected || "");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, selected]);

  const handleInputChange = (e) => {
    if (disabled) return;
    
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);

    // Show loading spinner
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleSelect = (option) => {
    setInputValue(option);
    setSelected(option);
    setIsOpen(false);
    setIsLoading(false);
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div
        className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""} ${
          error ? styles.dropdownError : ""
        } ${disabled ? styles.dropdownDisabled : ""}`}
      >
        <input
          ref={inputRef}
          type="text"
          className={`${styles.input} ${!inputValue ? styles.placeholder : ""}`}
          placeholder={placeholder || "Select..."}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={handleInputClick}
          disabled={disabled}
        />
        
        {isLoading ? (
          <div className={styles.loadingIcon}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <svg
            className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ""}`}
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
        )}

        {isOpen && !disabled && filteredOptions.length > 0 && (
          <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.optionsList}>
              {filteredOptions.map((option, index) => (
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

        {isOpen && !disabled && filteredOptions.length === 0 && inputValue && (
          <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.noResults}>No results found</div>
          </div>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error.message || error}</span>}
    </div>
  );
};

export default DashboardAutocomplete;
