"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./employmentAutocomplete.module.css";

const EmploymentAutocomplete = ({ 
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
    setTimeout(() => setIsLoading(false), 300);
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
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
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

export default EmploymentAutocomplete;
