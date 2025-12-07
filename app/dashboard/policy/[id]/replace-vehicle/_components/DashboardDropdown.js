"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, showSearch]);

  const handleToggle = () => {
    if (!disabled && !isLoading) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredOptions = showSearch && searchTerm
    ? options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div className={styles.container} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.dropdown} ${disabled ? styles.dropdownDisabled : ""} ${
          isOpen ? styles.dropdownOpen : ""
        } ${error ? styles.dropdownError : ""}`}
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <span className={selected ? styles.selectedValue : styles.placeholder}>
          {isLoading ? "Loading..." : selected || placeholder}
        </span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {error && <span className={styles.errorText}>{error}</span>}

      {isOpen && !disabled && !isLoading && (
        <div className={styles.optionsContainer}>
          {showSearch && (
            <div className={styles.searchContainer}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className={styles.options}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.option} ${
                    option === selected ? styles.optionSelected : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className={styles.noOptions}>No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDropdown;
