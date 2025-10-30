import React, { forwardRef, useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./autocomplete/autocomplete.module.css";

const FormAutocomplete = forwardRef(
  ({ label, options, placeholder = "Type or select option", error, onChange, value, disabled, inputStyle, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(() => {
      // Handle string or object values
      if (typeof value === "string") {
        return value || "";
      }
      if (value && typeof value === "object" && value.target && value.target.value) {
        return value.target.value;
      }
      return "";
    });
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
      if (value !== undefined && value !== null) {
        // Handle string or object values
        const stringValue = typeof value === "string" ? value : "";
        if (stringValue !== inputValue) {
          setInputValue(stringValue);
        }
      }
    }, [value, inputValue]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleInputChange = (e) => {
      if (disabled) return;

      const value = e.target.value;
      setInputValue(value);
      setIsOpen(true);

      // Filter options based on input
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);

      // Call onChange to update form value
      if (onChange) {
        onChange(e);
      }
    };

    const handleOptionClick = (option) => {
      if (disabled) return;

      setInputValue(option);
      setIsOpen(false);

      // Create synthetic event to trigger form update
      const syntheticEvent = {
        target: {
          name: props.name,
          value: option,
        },
      };

      if (onChange) {
        onChange(syntheticEvent);
      }
    };

    const handleInputFocus = () => {
      if (disabled) return;
      setIsOpen(true);
      setFilteredOptions(options);
    };

    return (
      <div className={styles.container} ref={containerRef}>
        {label && <p className={styles.label}>{label}</p>}
        <div className={`${styles.inputWrapper} ${error ? styles.error : ""}`}>
          <input
            ref={(e) => {
              inputRef.current = e;
              if (typeof ref === "function") {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
            }}
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            disabled={disabled}
            style={inputStyle}
            {...props}
          />
          <div className={styles.arrowContainer}>
            <Image
              src="/svg/arrow-down.svg"
              alt="arrow-down"
              width={24}
              height={24}
              className={`${styles.arrowDown} ${isOpen && !disabled ? styles.arrowUp : ""}`}
            />
          </div>
        </div>

        {isOpen && filteredOptions.length > 0 && (
          <div className={styles.dropdownOptions}>
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className={
                  inputValue === option
                    ? styles.selectedOption
                    : styles.dropdownOption
                }
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

FormAutocomplete.displayName = "FormAutocomplete";

export default FormAutocomplete;
