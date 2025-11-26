import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.css";
import { useDropdownManager } from "./useDropdownManager";

const Dropdown = ({ label, selected, options, setSelected, placeholder, error, disabled, showSearch = false, isLoading: externalIsLoading = false }) => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdownManager();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search with loading simulation
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      setIsSearchLoading(true);
      // Simulate loading for 300ms
      setTimeout(() => setIsSearchLoading(false), 300);
    } else {
      setIsSearchLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, closeDropdown]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, showSearch]);

  const handleSelect = (option) => {
    setSelected(option);
    closeDropdown();
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!disabled) {
      toggleDropdown();
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""} ${
          error ? styles.dropdownError : ""
        } ${disabled ? styles.dropdownDisabled : ""}`}
        onClick={handleToggle}
      >
        <span className={`${styles.selected} ${!selected ? styles.placeholder : ""}`}>
          {externalIsLoading ? "Loading..." : (selected || placeholder || "Select...")}
        </span>
        {externalIsLoading ? (
          <div className={styles.loadingSpinnerIcon}>
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

        {isOpen && !disabled && (
          <div
            className={styles.dropdownMenu}
            onClick={(e) => e.stopPropagation()}
          >
            {showSearch && (
              <div className={styles.searchWrapper}>
                {isSearchLoading ? (
                  <div className={styles.loadingIcon}>
                    <div className={styles.spinner}></div>
                  </div>
                ) : (
                  <svg
                    className={styles.searchIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11 11L14.5 14.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={`Search ${label?.toLowerCase() || "options"}...`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            <div className={styles.optionsList}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.option} ${
                      selected === option ? styles.optionSelected : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <span className={styles.optionText}>{option}</span>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No results found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error.message || error}</span>}
    </div>
  );
};

export default Dropdown;
